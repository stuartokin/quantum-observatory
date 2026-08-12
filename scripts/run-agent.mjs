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
  normaliseFile,
  checkFile,
  schemaForPath,
  collectionsFor,
} from './agent-io.mjs'

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
    const opener = new RegExp(`^\\s*/focus\\s+${agent}\\s*:\\s*(.*)$`, 'i')

    for (const i of issues) {
      const bodies = [i.body ?? '', ...(i.comments ?? []).map((c) => c.body ?? '')]
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
    return found
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

// The workflow field wins; otherwise take anything addressed to this agent in
// the open issues.
const focus = process.env.AGENT_FOCUS
  ? [process.env.AGENT_FOCUS]
  : focusFromIssues(agent)
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
const writable = collectionsFor(cfg.write_scope ?? [])
const schemas = (writable.length ? writable : [{ schema: 'content/schema/frontier.schema.json', name: 'frontier' }])
  .filter((c) => existsSync(c.schema))
const writesNews = writable.some((c) => c.name === 'news')
const schema = schemas
  .map((c) => `## ${c.name} — for files under content/${c.name}/\n\n\`\`\`json\n${readFileSync(c.schema, 'utf8')}\n\`\`\``)
  .join('\n\n')
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
  "couldNotSource": [ { "id": "...", "why": "what you searched, what you rejected" } ],
  "badlyFramed": [ { "id": "...", "why": "why this asks the wrong question" } ],
  "applicationCandidates": [ { "what": "...", "source": "url" } ],
  "escalations": [ { "what": "...", "why": "what is wrong and what decision is needed" } ],
  "worthScout": [ { "what": "...", "source": "url" } ],
  "rejected": [ { "what": "...", "why": "..." } ],
  "files": [ { "path": "content/frontier/_inbox/<id>.md", "content": "<full file>" } ]
}

The lists matter as much as the files. couldNotSource and badlyFramed tell the
reviewer where the board is weak, which is not visible from the items that
worked. Return them even when empty.

The source register is at agents/_sources.md — work it in tier order before
searching freely.

Every path must sit inside: ${cfg.write_scope.join(', ')}
Maximum files this run: ${cfg.budget?.proposals ?? 6}${
  cfg.existingIdsOnly
    ? '\n\nYou may ONLY write files whose id already appears in the board list above.\nA file with any other id is rejected. You are not here to add topics.'
    : ''
}

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

const out = extractJson(blocks)
if (!out) {
  console.error('No parseable JSON object found in the response.')
  console.error('Full response saved to .agent-run/raw.json\n')
  console.error('Last 3000 characters:\n')
  console.error(text.slice(-3000))
  process.exit(1)
}

const inScope = (p) =>
  cfg.write_scope.some((s) => {
    const rx = new RegExp('^' + s.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '§').replace(/\*/g, '[^/]*').replace(/§/g, '.*') + '$')
    return rx.test(p)
  })

const files = (out.files ?? []).slice(0, cfg.budget?.proposals ?? 6)
const written = []
const rejected = []

for (const f of files) {
  if (!inScope(f.path)) {
    // CI would catch this too. Failing here is cheaper and names the agent
    // rather than the pull request.
    console.error(`REFUSED: ${f.path} is outside ${agent}'s write_scope`)
    process.exit(1)
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
    const collection = path.includes('/news/')
      ? 'news/v1'
      : path.includes('/questions/')
        ? 'question/v1'
        : path.includes('/forecasts/')
          ? 'forecast/v1'
          : 'frontier/v1'
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

  const content = withIdentity(normaliseFile(f.content), f.path)
  // Validate against the schema that actually governs this collection.
  const check = checkFile(content, schemaForPath(f.path))

  /**
   * Some agents may only revise what is already on the board.
   *
   * The reviewer exists to check existing entries. On its first run it wrote
   * four brand-new topics instead — a scope failure the prompt asked it to
   * avoid and could not prevent. An instruction is a request; this is a rule.
   */
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
    process.exit(1)
  }
  console.error(`Continuing with the ${written.length} valid file(s).\n`)
}

/** Render any list the agent returned, whatever it chose to call the fields. */
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
  ...section('Could not source', out.couldNotSource ?? out.could_not_source, (r) =>
    typeof r === 'string' ? `- ${r}` : `- **${r.id ?? r.what}** — ${r.why ?? r.reason}`,
  ),
  ...section('Badly framed', out.badlyFramed ?? out.badly_framed, (r) =>
    typeof r === 'string' ? `- ${r}` : `- **${r.id ?? r.what}** — ${r.why ?? r.reason}`,
  ),
  ...section('Application candidates', out.applicationCandidates ?? out.application_candidates, (r) =>
    typeof r === 'string' ? `- ${r}` : `- **${r.what ?? r.title}** — ${r.source ?? r.why ?? ''}`,
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
    typeof r === 'string' ? `- ${r}` : `- **${r.what}** — ${r.source ?? r.why ?? ''}`,
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
