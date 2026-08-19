#!/usr/bin/env node
/**
 * GENERIC AGENT RUNNER
 *
 * Every agent is a folder under /agents containing agent.json and prompt.md.
 * Adding an agent is adding a folder — never editing this file, and never
 * writing a new workflow.
 *
 * The runner deliberately does very little thinking of its own. It assembles
 * context, calls the model with web search enabled, writes whatever files come
 * back into the agent's declared write_scope, and stops. Judgement lives in
 * prompt.md where a human can read it.
 *
 * Usage: node scripts/run-agent.mjs <agent-name>
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { execSync } from 'node:child_process'
import {
  extractJson,
  explainJsonFailure,
  normaliseFile,
  checkFile,
  schemaForPath,
  schemaConstFor,
  collectionsFor,
  limitsFor,
  limitsTable,
  applyFields,
  collectionDirFor,
} from './agent-io.mjs'
import { readQueue, writeQueue, takeFor, returnFailed } from './queue.mjs'

/**
 * Focus picked up from the issues themselves.
 *
 * A line anywhere in an open issue or its comments:
 *
 *     /focus sourcer: check whether Luo arXiv:2607.13816 misquotes Chevignard
 *
 * addresses the next run of that agent. It means the instruction can be written
 * where the finding is, at the moment it is noticed, rather than remembered
 * until somebody is next in the Actions tab — which is where instructions go to
 * be forgotten.
 *
 * The workflow's own focus field still wins if it is filled in.
 */
function focusFromIssues(agent) {
  try {
    const raw = execSync('gh issue list --state open --limit 20 --json number,title,body,comments', {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: ['pipe', 'pipe', 'ignore'],
    })
    const issues = JSON.parse(raw)
    const found = []
    // One instruction per run. More than one is several runs' work reported in
    // a single summary, which cannot be judged.
    const CAP = 1
    const opener = new RegExp(`^\\s*/focus\\s+${agent}\\s*:\\s*(.*)$`, 'i')

    for (const i of issues) {
      const bodies = [
        i.body ?? '',
        ...(i.comments ?? [])
          .map((c) => c.body ?? '')
          /**
           * A bot quoting an instruction is not a person giving one.
           *
           * The steward lists what it queued so a person can read it before it
           * runs. Those lines are real /focus instructions in an issue comment,
           * so this function picked all six up and the agent attempted them in
           * one run — the display of the queue became a second, uncontrolled
           * copy of it.
           *
           * The queue is the only place a queued instruction is taken from.
           */
          .filter((b) => !/^Resolved this pass|^Queue entries for|queued instruction/im.test(b)),
      ]
      for (const b of bodies) {
        const lines = b.split('\n')
        for (let n = 0; n < lines.length; n++) {
          const m = lines[n].match(opener)
          if (!m) continue
          // An instruction runs until a blank line or the next /focus, so it
          // can be written across several lines like anything else.
          const parts = [m[1].trim()]
          let k = n + 1
          while (k < lines.length && lines[k].trim() && !/^\s*\/focus\s/i.test(lines[k])) {
            parts.push(lines[k].trim())
            k++
          }
          const text = parts.join(' ').trim()
          // The same instruction often appears twice — once in the issue body
          // and once in a comment quoting it. Doing it twice is at best waste.
          if (!found.some((f) => f.endsWith(text))) {
            found.push(`(from issue #${i.number}) ${text}`)
          }
          n = k - 1
        }
      }
    }
    if (found.length > CAP) {
      console.log(
        `  ${found.length} instructions found in the issues; taking the first. ` +
          `The rest stay for later runs.`,
      )
    }
    return found.slice(0, CAP)
  } catch {
    // No gh, no token, or no issues. Not a failure — just no focus.
    return []
  }
}

const agent = process.argv[2]
if (!agent) {
  console.error('Usage: run-agent.mjs <agent-name>')
  process.exit(2)
}

const dir = `agents/${agent}`
if (!existsSync(`${dir}/agent.json`)) {
  console.error(`No such agent: ${agent}`)
  process.exit(2)
}

const cfg = JSON.parse(readFileSync(`${dir}/agent.json`, 'utf8'))
const prompt = readFileSync(`${dir}/prompt.md`, 'utf8')

/**
 * Some agents have their own runner.
 *
 * The steward reads issues and writes precedents, which this script knows
 * nothing about — and being handed to it produced a TypeError on a missing
 * write_scope rather than anything a person could act on. An agent that says
 * which runner it needs should be sent there.
 */
if (cfg.runner && cfg.runner !== 'generic') {
  console.error(
    `${agent} has its own runner: scripts/${cfg.runner}.mjs\n` +
      `Run it from Actions → ${cfg.runner[0].toUpperCase()}${cfg.runner.slice(1)}, ` +
      `not from Actions → Agents.`,
  )
  process.exit(1)
}

if (!Array.isArray(cfg.write_scope)) {
  console.error(
    `${agent}/agent.json has no write_scope. Every agent must declare where it ` +
      `may write, and a missing one is a configuration error rather than ` +
      `permission to write anywhere.`,
  )
  process.exit(2)
}

if (!cfg.enabled) {
  console.log(`${agent} is disabled. Nothing to do.`)
  console.log(`Set "enabled": true in ${dir}/agent.json to allow it to run.`)
  process.exit(0)
}

if (cfg.everyWeeks === 0) {
  console.log(`${agent} is a campaign agent — never scheduled, run by hand only.`)
}

const KEY = process.env.ANTHROPIC_API_KEY
if (!KEY) {
  console.error('ANTHROPIC_API_KEY is not set. Add it to repository secrets.')
  process.exit(2)
}

/* ---------- context ---------- */

/**
 * The full text of every item, for agents that revise rather than add.
 *
 * The compact index below is enough to avoid duplicating a topic. It is not
 * enough to review one: an agent asked whether a source supports a claim had
 * never been shown the claim, and said so twice in its own summary before
 * anyone noticed. It also explains why its first run went hunting for new
 * topics — given nothing to check, it found something else to do.
 */
function fullItems() {
  const out = []
  for (const f of readdirSync('content/frontier').filter((x) => x.endsWith('.md'))) {
    out.push(`--- ${f} ---\n${readFileSync(join('content/frontier', f), 'utf8')}`)
  }
  return out.join('\n\n')
}

/**
 * WHICH ITEMS ARE NEARLY FULL.
 *
 * Every capped field is validated before a file is written, and an agent must
 * return the whole file — so one overflow discards everything, including the
 * parts that were right. Three runs on this board have been lost that way, on
 * three different fields, each time after the research was already done.
 *
 * The limits are knowable before the run. Telling an agent which items have no
 * room, and in which field, turns a discovered failure into a constraint it can
 * write to.
 */
function tightFields() {
  /**
   * Read from the frontier schema, not typed here.
   *
   * This map was the fourth hand-written copy of limits that the schemas
   * already state, and the other three each destroyed a run when they drifted.
   * A copy that only feeds a warning is the most dangerous kind: it goes wrong
   * silently, and the warning it stops giving is the one that would have
   * caught the drift.
   */
  const LIMITS = Object.fromEntries(
    limitsFor('content/schema/frontier.schema.json')
      .filter(([, lim]) => lim.endsWith('characters'))
      .map(([field, lim]) => [field, Number.parseInt(lim, 10)]),
  )
  const HEADROOM = 150

  const rows = []
  for (const f of readdirSync('content/frontier').filter((x) => x.endsWith('.md'))) {
    const raw = readFileSync(join('content/frontier', f), 'utf8')
    const id = f.replace(/\.md$/, '')
    const tight = []

    const scalar = (key, limit) => {
      const m = raw.match(new RegExp(`^${key}: (?:'((?:[^']|'')*)'|(.+))$`, 'm'))
      if (!m) return
      const len = (m[1] ?? m[2] ?? '').length
      if (limit - len < HEADROOM) tight.push(`${key} ${len}/${limit}`)
    }
    for (const k of ['title', 'summary', 'plain', 'qdayReasoning', 'novelty']) {
      scalar(k, LIMITS[k])
    }

    const nested = (re, field, label = field) => {
      const limit = LIMITS[field]
      if (!limit) return
      for (const [i, m] of [...raw.matchAll(re)].entries()) {
        if (limit - m[1].length < HEADROOM) {
          tight.push(`${label.replace('[]', `[${i}]`)} ${m[1].length}/${limit}`)
        }
      }
    }
    nested(/^  claim: '((?:[^']|'')*)'/gm, 'evidence.claim')
    nested(/^  note: '((?:[^']|'')*)'/gm, 'review.note')
    nested(/^      note: '((?:[^']|'')*)'/gm, 'evidence.sources[].note', 'sources[].note')

    if (tight.length) rows.push(`${id} — ${tight.join(', ')}`)
  }
  return rows
}

/** The existing board, compact. An agent that cannot see it will duplicate it. */
function existingItems() {
  const out = []
  for (const f of readdirSync('content/frontier').filter((x) => x.endsWith('.md'))) {
    const raw = readFileSync(join('content/frontier', f), 'utf8')
    const fm = raw.match(/^---\n([\s\S]*?)\n---/)
    if (!fm) continue
    const get = (k) => (fm[1].match(new RegExp(`^${k}: (.*)$`, 'm')) || [])[1]
    out.push({
      id: get('id'),
      title: (get('title') || '').replace(/^'|'$/g, ''),
      constellation: get('constellation'),
      readiness: get('readiness'),
      level: (fm[1].match(/^  level: (\S+)$/m) || [])[1],
      verified: (fm[1].match(/^  verified: '(\S+)'$/m) || [])[1],
    })
  }
  return out
}

/**
 * Headlines already published.
 *
 * The newsroom was shown the frontier board and never its own back catalogue,
 * so every run started from nothing and had no way to avoid repeating itself.
 * Nineteen items across eighteen months looked like caution; some of it was
 * the same ground being covered twice and rejected.
 */
function existingNews() {
  const dir = 'content/news'
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => {
      const raw = readFileSync(join(dir, f), 'utf8')
      const date = (raw.match(/^date:\s*'?([\d-]+)'?$/m) || [])[1] ?? ''
      const headline = (raw.match(/^headline:\s*'?(.+?)'?$/m) || [])[1] ?? ''
      const about = (raw.match(/^about:\n((?:\s+- .*\n)+)/m) || [])[1] ?? ''
      return {
        id: f.replace(/\.md$/, ''),
        date,
        headline,
        about: about.split('\n').map((l) => l.replace(/^\s*-\s*/, '').trim()).filter(Boolean),
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

const items = existingItems()
const existingIds = new Set(items.map((i) => i.id))

/**
 * One instruction per run, from one place.
 *
 * The queue is authoritative when it holds something for this agent. Issue
 * comments are the fallback — and only then, because the steward's summary
 * quotes the instructions it queued, so reading both sources gave this agent
 * nine instructions in a single run and it attempted all nine.
 *
 * A run that does nine jobs writes one summary covering nine jobs, which is
 * useless for judging any of them.
 */
const { head: queueHead, entries: queueEntries } = readQueue()
const {
  next: queued,
  stale: staleQueued,
  remaining: queueRemaining,
} = takeFor(agent, queueEntries)

if (staleQueued.length) {
  for (const e of staleQueued) {
    const why = (e.attempts ?? 0) >= 2 ? 'failed twice' : 'older than 21 days'
    console.log(`  dropped (${why}): ${e.title}`)
  }
}

/**
 * A focus run writes fewer files, whatever the standing budget says.
 *
 * Asked to confirm a single preprint, a run that also rewrote four question
 * files spent its whole output budget and returned nothing — the research done,
 * the answer truncated mid-file, the work lost. Three times on one instruction.
 *
 * A focused job is a small job. The budget should say so before the model has
 * to infer it.
 */
const focus = process.env.AGENT_FOCUS
  ? [process.env.AGENT_FOCUS]
  : queued
    ? [queued.focus]
    : focusFromIssues(agent)

if (queued) {
  console.log(`  from the queue: ${queued.title} (${queued.source})`)
}

/** Two files on a focused job; the standing budget otherwise. */
const focusCap = focus.length ? 2 : (cfg.budget?.proposals ?? 6)
if (focus.length) {
  console.log(`  focus: ${focus.length} instruction(s)`)
  for (const f of focus) console.log('    ' + f.slice(0, 100))
}
/**
 * The schema an agent is shown must be the one it writes against.
 *
 * Every agent was handed the frontier schema regardless of its write scope, so
 * the newsroom — which writes news — produced frontier-shaped files with a
 * `title` field and `schema: frontier/v1`. It was following the specification
 * it had been given.
 */
/**
 * Show every schema the agent may write against, not one guessed from a
 * hard-coded check. Scout writes both frontier items and questions; being
 * shown only the first is why it wrote questions in the shape of items.
 */
/**
 * A patch agent sends only the fields it is changing, applied to the file
 * already on disk, rather than a whole file every time. Set this on an
 * agent that only ever revises what already exists — sourcer, verifier,
 * reviewer — never on one that also creates new files, since a file that
 * does not exist yet has nothing to patch.
 */
const patchMode = cfg.writeMode === 'patch'

const writable = collectionsFor(cfg.write_scope ?? [])
const schemas = (writable.length ? writable : [{ schema: 'content/schema/frontier.schema.json', name: 'frontier' }])
  .filter((c) => existsSync(c.schema))
const writesNews = writable.some((c) => c.name === 'news')
const schema = schemas
  .map((c) => `## ${c.name} — for files under content/${c.name}/\n\n\`\`\`json\n${readFileSync(c.schema, 'utf8')}\n\`\`\``)
  .join('\n\n')
/**
 * The limits, pulled out of those schemas and shown as a table.
 *
 * They are already in the JSON above, and being in the JSON above has not been
 * enough: they sit on the fifth line of the third nested object, and an agent
 * reading a brief that states a number believes the brief. Three runs died
 * that way — a milestone `plain` written to the frontier's 1600, and a
 * measurement `qualifier` written to 94 against a limit of 60 that no prompt
 * mentioned.
 *
 * So they are computed, never typed. A prompt that restates one of these
 * numbers is a prompt that will eventually contradict the thing enforcing it.
 */
const limits = limitsTable(schemas)
const priorNews = writesNews ? existingNews() : []
const scales = readFileSync('content/frontier/_scales.json', 'utf8')
// Shared across every agent, so changing it changes all four at once.
const sources = existsSync('agents/_sources.md')
  ? readFileSync('agents/_sources.md', 'utf8')
  : ''
// Precedents. Read before anything is escalated, so a question answered once is
// never put to a person twice.
const decisions = existsSync('agents/_decisions.md')
  ? readFileSync('agents/_decisions.md', 'utf8')
  : ''

const context = `
${
  cfg.existingIdsOnly
    ? `# The board in full — ${items.length} items

You revise what is here. Every field of every item follows, so you can check a
claim against its own sources rather than guessing from a summary.

${fullItems()}

${
  tightFields().length
    ? `# Items with no room left

These are at or near a character limit. Any addition tips them over, and a file
that fails validation is discarded whole — the research done, the answer lost.

${tightFields().map((r) => `- ${r}`).join('\n')}

**On these, replace rather than append.** review.note is a log and old passes
that changed nothing can go. A claim already at its limit says everything it
needs to; put a new finding in a source note instead. If what you must say does
not fit, say less in the front matter and more in the body.${
  patchMode
    ? ' Send just that field — you do not need to resend the rest of the item to change one line.'
    : ''
}
`
    : ''
}
# Index
`
    : writesNews
      ? `# Headlines already published — ${priorNews.length}

Do not write any of these again. Check by subject, not by wording: the same
result reported twice with different phrasing is still the same result.

${
  priorNews.length
    ? priorNews.map((n) => `- ${n.date} · ${n.id} · ${n.headline}`).join('\n')
    : '(none yet)'
}

Coverage by month, so you can see where the gaps are:

${
  priorNews.length
    ? Object.entries(
        priorNews.reduce((acc, n) => {
          const m = n.date.slice(0, 7)
          acc[m] = (acc[m] ?? 0) + 1
          return acc
        }, {}),
      )
        .sort()
        .map(([m, c]) => `- ${m}: ${c}`)
        .join('\n')
    : '(nothing yet — every month is a gap)'
}

# The board these headlines attach to`
      : `# Existing board — ${items.length} items`
}

Read this before proposing anything. Adding something already present is the
most common way an agent wastes a reviewer's time.

${items.map((i) => `- ${i.id} | ${i.constellation} | ${i.readiness} | ${i.level} | verified ${i.verified} | ${i.title}`).join('\n')}

# Schema every file must satisfy

\`\`\`json
${schema}
\`\`\`

# Field limits — these exact numbers, read from the schemas above

**A file that exceeds one of these is discarded before it is written, and the
whole run can be lost with it.** These are computed from the schemas at run
time, so they are correct even where your brief is not: **if your brief states
a different number, this table wins and the brief is wrong.** Say so in your
summary if you spot one.

They differ by collection. \`plain\` is not the same length everywhere. Count
your two or three longest fields before you return — including fields inside
arrays, which is where every overrun so far has happened.

${limits}

# Readiness definitions

\`\`\`json
${scales}
\`\`\`

# Source register

${sources || '(none)'}

# Decisions already made

Read this before escalating anything. If the answer is here, apply it and say
you did — do not spend a person's attention on a question they have settled.

${decisions || '(none)'}

# Today

${new Date().toISOString().slice(0, 10)}
${
  focus.length
    ? `
# Focus for this run

A person asked for this specifically.

**If it names something specific, do that and nothing else this run.** They
asked for one thing; three things means reviewing two they did not request. Put
anything else you notice in your summary instead.

If it plainly invites breadth — sweep a month, work a constellation — then it is
the whole job and you do as much as the budget allows.

Either way, say what you found, even if the answer is that nothing needed
changing.

${focus.map((f) => `> ${f}`).join('\n>\n')}

Everything below still applies. If the focus and your usual priorities conflict,
the focus wins for this run only.
`
    : ''
}

# Output contract

Reply with a single JSON object and nothing else — no prose, no markdown fences:

{
  "summary": "one paragraph, read weekly — make it worth reading",
  "checklist": { "question": "answer", ... },
  "couldNotSource": [ { "id": "...", "why": "what you searched, what you rejected", "focus": "/focus <agent>: the exact instruction that would resolve this" } ],
  "badlyFramed": [ { "id": "...", "why": "why this asks the wrong question" } ],
  "applicationCandidates": [ { "what": "...", "source": "url" } ],
  "escalations": [ { "what": "...", "why": "what is wrong and what decision is needed" } ],
  "worthScout": [ { "what": "...", "source": "url", "focus": "/focus <agent>: the exact instruction to run next" } ],
  "rejected": [ { "what": "...", "why": "..." } ],
  "files": [ ${
    patchMode
      ? `{ "path": "content/frontier/_inbox/<id>.md", "fields": { "<field>": <new value>, ... } }`
      : `{ "path": "content/frontier/_inbox/<id>.md", "content": "<full file>" }`
  } ]
}
${
  patchMode
    ? // A plain-quoted array joined with newlines, not a nested template
      // literal — check-order.mjs tracks template nesting by counting raw
      // backticks per line, and a multi-line backtick block nested inside
      // this one's ${} broke that count for everything after it in the file.
      [
        '',
        'Each entry in **files** names an item already on the board and the fields you',
        'are changing on it — nothing else. **Do not send "content".** You are not',
        'writing a file; you are applying a small change to one that already exists,',
        'and the runner reads the current file and merges your fields into it.',
        '',
        'A field name is a dotted path into the item: "evidence.claim", "review.note",',
        '"qdayImpact", "actors". Send only what changed. Everything you do not name is',
        'left exactly as it is on the board now — you do not repeat a title or a',
        'metric you are not touching, and you should not.',
        '',
        'A few things that follow from that:',
        '',
        '- **"evidence.sources" replaces the whole sources array.** There is no way to',
        '  add one source to the list that is already there — send the complete list',
        '  you want, including the sources that were already correct.',
        '- To edit the body text below the front matter, send a field named "body"',
        '  with the complete replacement text.',
        "- Values are plain JSON — a string, a number, an array, an object. You are",
        '  not writing YAML by hand, and none of the usual rules about quoting a',
        "  colon or escaping an apostrophe apply here: write `Shor's algorithm`",
        '  exactly like that, as an ordinary JSON string, and the runner encodes it',
        '  correctly.',
        '- Sending `null` for a field removes it rather than setting it to nothing.',
        '- A field name that is not part of the schema, or an id that is not on the',
        '  board, is rejected before anything is written — the same as an invalid',
        '  full file always was.',
        '',
      ].join('\n')
    : ''
}
The lists matter as much as the files. couldNotSource and badlyFramed tell the
reviewer where the board is weak, which is not visible from the items that
worked. Return them even when empty.

The source register is at agents/_sources.md — work it in tier order before
searching freely.

Every path must sit inside: ${cfg.write_scope.join(', ')}
Maximum files this run: ${focusCap}${
  patchMode
    ? ''
    : (() => {
        /*
         * Warn when the budget cannot fit in the output ceiling.
         *
         * An agent returning whole files has a hard arithmetic limit: items on this
         * board average around 6,000 characters, and an output ceiling of N tokens
         * holds roughly N * 3.6 / 6000 of them alongside a summary. A budget above
         * that cannot be met, and the failure mode is total — the run writes
         * nothing, so every check it did is lost.
         *
         * The reviewer was configured for twelve and attempted fourteen. Patch
         * agents are exempt: a patch is a handful of fields, not a whole item,
         * and this arithmetic was never calibrated for that shape.
         */
        const avg = items.length
          ? readdirSync('content/frontier')
              .filter((f) => f.endsWith('.md'))
              .reduce((t, f) => t + readFileSync(join('content/frontier', f), 'utf8').length, 0) /
            items.length
          : 6000
        // Half the ceiling, not most of it. The observed failure came at fourteen
        // items where the arithmetic said twelve would fit — so twelve was the edge,
        // and a ceiling with no headroom is one an agent falls off.
        const fits = Math.floor(((cfg.maxTokens ?? 32000) * 3.6 * 0.5) / avg)
        return focusCap > fits
          ? `\n\n**Your budget of ${focusCap} does not fit your output limit.** Items here ` +
            `average ${Math.round(avg)} characters and you must return each in full, so ` +
            `about ${fits} is the most that can be written alongside a summary. Return ` +
            `${fits} properly formed rather than ${focusCap} truncated: a run that ` +
            `exceeds the limit writes nothing at all.`
          : ''
      })()
}${
  cfg.existingIdsOnly
    ? '\n\nYou may ONLY write files whose id already appears in the board list above.\nA file with any other id is rejected. You are not here to add topics.'
    : ''
}

You have ${cfg.budget?.searches ?? 25} searches. **Reaching the JSON matters more
than one more search.** A conclusion you did not write down is worth nothing —
a run that spent its whole budget establishing that a paper cannot be sourced,
and then ran out before saying so, produced no record of that finding at all.
It has happened on this board.

So: when you have searched enough to answer, stop searching and answer. If you
cannot answer, say that in the JSON — an entry under \`couldNotSource\`
naming what you looked for, where you looked and what you found instead is a
complete and useful result. It is not a failure and it does not need files.

**Never end a message mid-investigation.** If you find yourself writing "let me
make one final search", you are already past the point where you should have
returned what you have.

Do your research first. Then reply with the JSON object and nothing after it.
Do not narrate your reasoning in the final message — your output budget is
finite and prose spends it. If you are running short, return fewer files
properly formed rather than many truncated.
If you found nothing worth proposing, return an empty files array and say so in
the summary. A run that reports nothing is a valid run.
`

/* ---------- call ---------- */

const body = {
  model: cfg.model,
  max_tokens: cfg.maxTokens ?? 32000,
  system: prompt,
  messages: [{ role: 'user', content: context }],
  tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: cfg.budget?.searches ?? 25 }],
  // Streaming, not because we display tokens as they arrive, but because
  // Node's built-in fetch gives up if response headers take more than five
  // minutes. A research run with 45 searches routinely exceeds that. Streaming
  // returns headers immediately, so the timeout cannot fire — and it lets the
  // log show progress rather than five silent minutes.
  stream: true,
}

/**
 * Call the model, retrying when the service is busy.
 *
 * An `overloaded_error` arriving mid-stream used to end the run — thirteen
 * searches of real work discarded because a server was briefly busy. It is not
 * a failure of the request, so it should not be a failure of the run.
 *
 * Retries are whole-request: the stream cannot be resumed, and a partial
 * response is worse than none.
 */
async function callModel(attempt = 1) {
  const MAX = 4

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    const busy = res.status === 429 || res.status === 529 || res.status >= 500
    if (busy && attempt < MAX) {
      const wait = Math.round(2 ** attempt * 5)
      console.log(`\n  ${res.status} from the API. Waiting ${wait}s, attempt ${attempt + 1}/${MAX}.`)
      await new Promise((r) => setTimeout(r, wait * 1000))
      return callModel(attempt + 1)
    }
    console.error(`API error ${res.status}: ${text}`)
    process.exit(1)
  }

  const blocks = []
  let current = null
  let stopReason = null
  let searches = 0
  let lastTick = Date.now()
  let buffer = ''
  const decoder = new TextDecoder()

  for await (const chunk of res.body) {
    buffer += decoder.decode(chunk, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      if (!line.startsWith('data:')) continue
      const payload = line.slice(5).trim()
      if (!payload || payload === '[DONE]') continue

      let ev
      try {
        ev = JSON.parse(payload)
      } catch {
        continue
      }

      switch (ev.type) {
        case 'content_block_start':
          if (ev.content_block?.type === 'text') current = ''
          else if (ev.content_block?.type === 'server_tool_use') {
            searches++
            process.stdout.write(`\r  searching… ${searches}`)
          }
          break

        case 'content_block_delta':
          if (ev.delta?.type === 'text_delta' && current !== null) {
            current += ev.delta.text
            if (Date.now() - lastTick > 15000) {
              lastTick = Date.now()
              process.stdout.write(`\r  writing… ${current.length} chars, ${searches} searches`)
            }
          }
          break

        case 'content_block_stop':
          if (current !== null) {
            blocks.push(current)
            current = null
          }
          break

        case 'message_delta':
          if (ev.delta?.stop_reason) stopReason = ev.delta.stop_reason
          break

        case 'error': {
          const kind = ev.error?.type ?? 'unknown'
          const transient = kind === 'overloaded_error' || kind === 'api_error'
          if (transient && attempt < MAX) {
            const wait = Math.round(2 ** attempt * 5)
            console.log(
              `\n  Stream ended: ${kind}. Waiting ${wait}s and starting again, ` +
                `attempt ${attempt + 1}/${MAX}.`,
            )
            await new Promise((r) => setTimeout(r, wait * 1000))
            return callModel(attempt + 1)
          }
          console.error(`\nStream error: ${JSON.stringify(ev.error)}`)
          process.exit(1)
        }
      }
    }
  }
  if (current !== null) blocks.push(current)

  return { blocks, stopReason, searches }
}

const { blocks, stopReason, searches } = await callModel()
console.log(`\n  ${searches} search(es), ${blocks.length} text block(s)`)


mkdirSync('.agent-run', { recursive: true })

writeFileSync('.agent-run/raw.json', JSON.stringify({ stopReason, searches, blocks }, null, 2))

if (stopReason === 'max_tokens' && queued) {
  const back = returnFailed(queued, queueRemaining, queueHead)
  console.error(
    `\nThe entry stays queued: "${queued.title}" (attempt ${back.attempts} of 2).`,
  )
}

if (stopReason === 'max_tokens') {
  console.error(
    'The agent hit its output limit before finishing. Nothing was written.\n' +
      `Lower "budget.proposals" in ${dir}/agent.json, or raise "maxTokens".\n` +
      'Its research is preserved in .agent-run/raw.json.',
  )
  console.error('\nLast 2000 characters of output:\n')
  console.error((blocks.at(-1) ?? '').slice(-2000))
  process.exit(1)
}

const text = blocks.join('\n').trim()

/* ---------- write ---------- */

/**
 * The entry is spent once the model has answered usefully.
 *
 * Not before: a run truncated at its output limit, or one that returned
 * nothing parseable, has produced no work and should be tried again. Not
 * after the files are validated either — a run that searched properly and
 * found nothing has still done the looking, and repeating it weekly would be
 * a loop rather than diligence.
 *
 * The line is a usable answer, which is what this is.
 */
const out = extractJson(blocks)
if (out && (queued || staleQueued.length)) {
  writeQueue(queueRemaining, queueHead)
  if (queued) console.log(`  queue: took "${queued.title}"; ${queueRemaining.length} left`)
}
if (!out) {
  /**
   * A run that reached a conclusion and not the JSON still found something.
   *
   * The reasoning is in the response — which paper was ruled out, which near
   * miss was found, what could not be established. Exiting with only a stack
   * trace throws that away and the queue entry is spent either way, so the
   * work is simply lost.
   *
   * Write it where the workflow will put it in the issue. It is not a summary
   * the agent chose to give, and it is labelled as such, but a reader deciding
   * whether to requeue the job needs it.
   */
  mkdirSync('.agent-run', { recursive: true })

  /*
   * The closing paragraphs, plus anything naming an identifier.
   *
   * Four paragraphs catches the conclusion but drops the near misses, and those
   * are the actionable part: a run that could not source its target but found a
   * related preprint has given a reader the next lead. Pull those lines out
   * separately rather than hoping they fall inside the window.
   */
  const paras = text.trim().split(/\n\n+/)
  const tail = paras.slice(-4).join('\n\n').slice(-2000)
  const ids = [
    ...new Set(
      (text.match(/(?:arxiv:\s?\d{4}\.\d{4,5}|10\.\d{4,}\/[^\s"')]+|s4\d{4}-\d{3}-\d{5}-\d)/gi) ?? [])
        .map((x) => x.replace(/\s/g, '')),
    ),
  ].slice(0, 12)
  writeFileSync(
    '.agent-run/pr-body.md',
    `**${agent} did not return a usable answer.**\n\n` +
      `It ran ${searches} search(es) and stopped before producing the JSON object ` +
      `the runner needs, so nothing was written and no summary was composed. ` +
      `Below is the end of what it was saying, salvaged from the raw response — ` +
      `not a report the agent chose to give, but the reasoning is usually the ` +
      `useful part.\n\n` +
      (queued
        ? `The queued instruction was **${queued.title}**. It has been spent. ` +
          `Requeue it only if the text below suggests the job is answerable as ` +
          `written.\n\n`
        : '') +
      (ids.length
        ? `**Identifiers it mentioned**, which may be worth following up:\n` +
          ids.map((i) => `- \`${i}\``).join('\n') +
          '\n\n'
        : '') +
      `---\n\n${tail}\n`,
  )
  writeFileSync('.agent-run/count.txt', '0')

  console.error('No parseable JSON object found in the response.')
  console.error(`  why: ${explainJsonFailure(blocks)}`)
  console.error('The tail of the reasoning has been written to .agent-run/pr-body.md')
  console.error('so it reaches the issue rather than only this log.\n')
  console.error('Last 3000 characters:\n')
  console.error(text.slice(-3000))
  process.exit(1)
}

const inScope = (p) =>
  cfg.write_scope.some((s) => {
    const rx = new RegExp('^' + s.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '§').replace(/\*/g, '[^/]*').replace(/§/g, '.*') + '$')
    return rx.test(p)
  })

const files = (out.files ?? []).slice(0, focusCap)
const written = []
const rejected = []

for (const f of files) {
  if (!inScope(f.path)) {
    // CI would catch this too. Failing here is cheaper and names the agent
    // rather than the pull request.
    console.error(`REFUSED: ${f.path} is outside ${agent}'s write_scope`)
    process.exit(1)
  }

  const hasFields = f.fields && typeof f.fields === 'object' && !Array.isArray(f.fields)
  const hasContent = typeof f.content === 'string'

  if (hasFields && hasContent) {
    rejected.push({ path: f.path, reason: 'file has both "content" and "fields" — send exactly one', head: '' })
    continue
  }
  if (!hasFields && !hasContent) {
    rejected.push({ path: f.path, reason: 'file has neither "content" nor "fields"', head: '' })
    continue
  }
  if (hasContent && patchMode) {
    // The whole point of a patch agent is that it never needs to reconstruct
    // fields it isn't touching. A content return here is the old failure
    // mode arriving anyway, so it is refused rather than accepted.
    rejected.push({
      path: f.path,
      reason: `${agent} edits existing items only — send "fields", not "content"`,
      head: f.content.slice(0, 240),
    })
    continue
  }

  /**
   * A patch is applied to the item as it stands on the board right now, not
   * to whatever the agent believes is there. The id comes from the
   * filename — the inbox is where a proposal is staged, not where the live
   * file lives, so the file being patched is read from the collection's own
   * directory.
   */
  let rawContent
  if (hasFields) {
    const id = f.path.split('/').pop().replace(/\.md$/, '')
    const livePath = `${collectionDirFor(f.path)}${id}.md`
    if (!existsSync(livePath)) {
      rejected.push({
        path: f.path,
        reason: `no existing file at ${livePath} to patch — "${id}" is not on the board`,
        head: JSON.stringify(f.fields).slice(0, 240),
      })
      continue
    }
    try {
      rawContent = applyFields(readFileSync(livePath, 'utf8'), f.fields)
    } catch (e) {
      rejected.push({
        path: f.path,
        reason: `could not apply fields: ${e.message}`,
        head: JSON.stringify(f.fields).slice(0, 240),
      })
      continue
    }
  } else {
    rawContent = f.content
  }

  /**
   * Restore identity fields the agent left to the filename.
   *
   * Writing `2026-08-10-something.md` and omitting `id` is a reasonable
   * instinct — the filename does carry the identity — but the schema requires
   * the field and the validator already enforces that the two agree. Deriving
   * it is a repair, not a guess.
   */
  const withIdentity = (text, path) => {
    const base = path.split('/').pop().replace(/\.md$/, '')
    // Asked of the schema that governs this path, not listed here. A hand-
    // written list of collections lived at this line for two releases and
    // defaulted anything it did not recognise to frontier/v1 — which is how
    // four scout runs researched four milestones and wrote none of them.
    const collection = schemaConstFor(path)
    const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!fm) return text
    let head = fm[1]
    // A declared schema that disagrees with the folder is wrong about the
    // folder, not the other way round.
    if (/^schema:/m.test(head)) head = head.replace(/^schema:.*$/m, `schema: ${collection}`)
    else head = `schema: ${collection}\n${head}`
    // The filename is the identity. An id that disagrees with it would fail
    // validation later for no useful reason, so make them agree here.
    if (/^id:/m.test(head)) head = head.replace(/^id:.*$/m, `id: ${base}`)
    else head = head.replace(/^(schema:.*\n)/, `$1id: ${base}\n`)
    return text.replace(fm[1], head)
  }

  /**
   * normaliseFile repairs whole-file agent output — stray code fences, an
   * unclosed front-matter delimiter, an unquoted colon anywhere in the
   * document. All of that is a model formatting its own from-scratch
   * output; none of it applies to a patch, whose text came out of
   * `applyFields`, which already re-serialised only the blocks it touched
   * through js-yaml and left everything else as the original, already-valid
   * bytes. Running normaliseFile's colon-quoting scan over the whole
   * document anyway would requote scalars in blocks the patch never
   * touched, the same "diff touches fields nobody named" problem the patch
   * mechanism exists to prevent — one layer up, at the file level instead
   * of the field level.
   */
  const content = withIdentity(hasFields ? rawContent : normaliseFile(rawContent), f.path)
  // Validate against the schema that actually governs this collection.
  const check = checkFile(content, schemaForPath(f.path))

  /**
   * Some agents may only revise what is already on the board.
   *
   * The reviewer exists to check existing entries. On its first run it wrote
   * four brand-new topics instead — a scope failure the prompt asked it to
   * avoid and could not prevent. An instruction is a request; this is a rule.
   */
  /**
   * A collection with a fixed membership may not grow.
   *
   * The twelve questions are twelve. Asked to populate them, Scout wrote six
   * new files alongside the existing ones — leaving eighteen, of which twelve
   * were empty placeholders. The instruction said populate; nothing enforced
   * that "the twelve files" meant the ones already there.
   */
  const fixed = (cfg.fixedCollections ?? []).find((c) => f.path.includes(`/${c}/`))
  if (check.ok && fixed) {
    const dir = `content/${fixed}`
    const known = existsSync(dir)
      ? readdirSync(dir).filter((x) => x.endsWith('.md')).map((x) => x.replace(/\.md$/, ''))
      : []
    if (!known.includes(check.id)) {
      rejected.push({
        path: f.path,
        reason:
          `"${check.id}" is not one of the existing ${fixed}. This collection has a ` +
          `fixed membership — update a file that is already there. Known: ${known.join(', ')}`,
        head: content.slice(0, 240),
      })
      continue
    }
  }

  if (check.ok && cfg.existingIdsOnly && !existingIds.has(check.id)) {
    rejected.push({
      path: f.path,
      reason: `"${check.id}" is not on the board. ${agent} may only revise existing items, never add topics.`,
      head: content.slice(0, 240),
    })
    continue
  }

  if (!check.ok) {
    rejected.push({ path: f.path, reason: check.reason, head: content.slice(0, 240) })
    continue
  }

  mkdirSync(dirname(f.path), { recursive: true })
  writeFileSync(f.path, content)
  written.push(f.path)
}

if (rejected.length) {
  console.error(`\n${rejected.length} file(s) rejected before writing:\n`)
  for (const r of rejected) {
    console.error(`  ${r.path}\n    reason: ${r.reason}`)
    console.error(`    starts: ${JSON.stringify(r.head.slice(0, 160))}\n`)
  }
  // A partial run is fine. Losing every good file because one was malformed
  // is not, so carry on with whatever was valid.
  if (written.length === 0) {
    console.error('Nothing valid was produced. See .agent-run/raw.json.')
    /**
     * The entry goes back on the queue.
     *
     * It was spent earlier, on the rule that a usable answer spends it — and
     * that rule is right for a run which searched properly and found nothing,
     * because repeating that weekly is a loop rather than diligence.
     *
     * This is not that run. Every file was rejected on its way to disk, which
     * means the agent *did* find something: it searched, it read the source,
     * it wrote the record, and a formatting fault threw all of it away. Three
     * consecutive runs were lost that way — Australia's ASD deadline twice —
     * each time spending the entry that would have caused it to be tried
     * again. The research is in .agent-run/raw.json and nowhere else.
     *
     * So: nothing written and something rejected returns the entry, up to the
     * same two attempts a truncated run gets. A job that fails this way twice
     * is a job with a real problem in it, and should stop rather than cycle.
     */
    if (queued) {
      const back = returnFailed(queued, queueRemaining, queueHead)
      console.error(
        `\nThe entry stays queued: "${queued.title}" (attempt ${back.attempts} of 2).\n` +
          'Every file was rejected, so the looking was done and the result lost —\n' +
          'that is worth retrying, unlike a run which searched and found nothing.',
      )
    }
    process.exit(1)
  }
  console.error(`Continuing with the ${written.length} valid file(s).\n`)
}

/** Render any list the agent returned, whatever it chose to call the fields. */
/** The ready-to-paste instruction attached to a suggestion, if the agent gave one. */
const focusBlock = (r) =>
  r && typeof r === 'object' && typeof r.focus === 'string' && r.focus.trim()
    ? `\n\n  \`\`\`\n  ${r.focus.trim().replace(/\n/g, '\n  ')}\n  \`\`\``
    : ''

function section(title, rows, render) {
  if (!rows || rows.length === 0) return []
  return ['', `## ${title}`, ...rows.map(render)]
}

/**
 * The agent writes its summary before the runner has rejected anything, so a
 * run that claimed five items and delivered three reads as if all five landed.
 * That is misleading in the one artefact reviewed weekly, so correct it in
 * place rather than leaving the two accounts to disagree.
 */
const mismatch =
  rejected.length > 0
    ? [
        '',
        `> **Correction:** the summary below was written before validation. ` +
          `**${written.length} of ${files.length}** proposed files were written; ` +
          `${rejected.length} were discarded and are listed at the end. Any count ` +
          `in the summary refers to what was attempted, not to what is on the board.`,
        '',
      ]
    : []

const pr = [
  written.length === 0
    ? `**Nothing changed.**${rejected.length ? ` ${rejected.length} file(s) discarded.` : ''} ` +
      `A run that changes nothing is a result, not a failure — the summary below is the output.`
    : `**${written.length} item(s) published${rejected.length ? `, ${rejected.length} discarded` : ''}.**`,
  ...mismatch,
  '',
  out.summary ?? '',
  '',
  '## Checklist',
  ...Object.entries(out.checklist ?? {}).map(([q, a]) => `- **${q}** — ${a}`),

  // The agent's own reasoning. What it could not evidence, and what it thinks
  // is badly framed, is frequently worth more than what it managed to source —
  // and it used to be discarded entirely.
  /**
   * A suggestion arrives with the instruction that acts on it.
   *
   * These sections are read by somebody who then has to write a focus line. Made
   * to compose it from prose, they will not — the suggestion sits in the issue
   * for a fortnight and the lead goes cold. So the agent supplies the exact
   * text, and it is rendered as a fenced block ready to paste.
   */
  ...section('Could not source', out.couldNotSource ?? out.could_not_source, (r) =>
    typeof r === 'string'
      ? `- ${r}`
      : `- **${r.id ?? r.what}** — ${r.why ?? r.reason}` + focusBlock(r),
  ),
  ...section('Badly framed', out.badlyFramed ?? out.badly_framed, (r) =>
    typeof r === 'string' ? `- ${r}` : `- **${r.id ?? r.what}** — ${r.why ?? r.reason}`,
  ),
  ...section('Application candidates', out.applicationCandidates ?? out.application_candidates, (r) =>
    typeof r === 'string'
      ? `- ${r}`
      : `- **${r.what ?? r.title}** — ${r.source ?? r.why ?? ''}` + focusBlock(r),
  ),
  ...section(
    'Needs you',
    (out.escalations ?? out.needsYou ?? []).slice(0, 3),
    (r) => (typeof r === 'string' ? `- ${r}` : `- **${r.what ?? r.id}** — ${r.why ?? r.decision}`),
  ),
  ...((out.escalations ?? out.needsYou ?? []).length > 3
    ? [
        `_${(out.escalations ?? out.needsYou).length - 3} further item(s) qualified and were ` +
          `suppressed to keep the escalation list to three. See the run record._`,
      ]
    : []),
  ...(focus.length
    ? ['', '## Focus', ...focus.map((f) => `- ${f}`)]
    : []),
  ...section('Worth Scout\'s attention', out.worthScout, (r) =>
    typeof r === 'string'
      ? `- ${r}`
      : `- **${r.what}** — ${r.source ?? r.why ?? ''}` + focusBlock(r),
  ),
  ...section('Considered and rejected', out.rejected, (r) =>
    typeof r === 'string' ? `- ${r}` : `- **${r.what}** — ${r.why}`,
  ),

  '',
  `## Files (${written.length})`,
  ...written.map((p) => `- \`${p}\``),
  ...(rejected.length
    ? ['', `## Discarded before writing (${rejected.length})`,
       ...rejected.map((r) => `- \`${r.path}\` — ${r.reason}`)]
    : []),
  '',
  '',
  `_Published by the ${agent} agent, without human review. ` +
    `${written.length} item(s) on the board._`,
].join('\n')

mkdirSync('.agent-run', { recursive: true })
writeFileSync('.agent-run/pr-body.md', pr)
writeFileSync('.agent-run/count.txt', String(written.length))
// Exactly what this agent wrote. The provenance gate uses this rather than a
// git diff: a shallow clone has no merge base, and falling back to "check
// everything" made the gate blame the agent for files a human had reviewed
// months earlier.
writeFileSync('.agent-run/written.txt', written.join('\n'))

console.log(`${agent}: ${written.length} file(s) proposed`)
for (const p of written) console.log('  ' + p)
