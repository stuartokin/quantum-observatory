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
import { extractJson, normaliseFile, checkFile } from './agent-io.mjs'

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

const items = existingItems()
const schema = readFileSync('content/schema/frontier.schema.json', 'utf8')
const scales = readFileSync('content/frontier/_scales.json', 'utf8')

const context = `
# Existing board — ${items.length} items

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

# Today

${new Date().toISOString().slice(0, 10)}

# Output contract

Reply with a single JSON object and nothing else — no prose, no markdown fences:

{
  "summary": "one paragraph, read weekly — make it worth reading",
  "checklist": { "question": "answer", ... },
  "couldNotSource": [ { "id": "...", "why": "what you searched, what you rejected" } ],
  "badlyFramed": [ { "id": "...", "why": "why this asks the wrong question" } ],
  "applicationCandidates": [ { "what": "...", "source": "url" } ],
  "rejected": [ { "what": "...", "why": "..." } ],
  "files": [ { "path": "content/frontier/_inbox/<id>.md", "content": "<full file>" } ]
}

The lists matter as much as the files. couldNotSource and badlyFramed tell the
reviewer where the board is weak, which is not visible from the items that
worked. Return them even when empty.

Every path must sit inside: ${cfg.write_scope.join(', ')}
Maximum files this run: ${cfg.budget?.proposals ?? 6}

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
  console.error(`API error ${res.status}: ${await res.text()}`)
  process.exit(1)
}

/* ---------- read the stream ---------- */

const blocks = []
let current = null
let stopReason = null
let searches = 0
let lastTick = Date.now()

const decoder = new TextDecoder()
let buffer = ''

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
          // Something on the log every 15 seconds, so a long run does not look
          // like a hung one.
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

      case 'error':
        console.error('\nStream error:', JSON.stringify(ev.error))
        process.exit(1)
    }
  }
}
if (current !== null) blocks.push(current)
console.log(`\n  ${searches} search(es), ${blocks.length} text block(s)`)

// Keep everything. When something goes wrong the raw output is the only
// evidence of what the agent actually did, and losing it costs a rerun.
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

  const content = normaliseFile(f.content)
  const check = checkFile(content)
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
  `**${written.length} item(s) published${rejected.length ? `, ${rejected.length} discarded` : ''}.**`,
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
