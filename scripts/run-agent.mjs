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
  "summary": "one paragraph for the pull request description",
  "checklist": { "question": "answer", ... },
  "rejected": [ { "what": "...", "why": "..." } ],
  "files": [ { "path": "content/frontier/_inbox/<id>.md", "content": "<full file>" } ]
}

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

const data = await res.json()

// Keep the whole response. When something goes wrong the raw output is the
// only evidence of what the agent actually did, and losing it costs a rerun.
mkdirSync('.agent-run', { recursive: true })
writeFileSync('.agent-run/raw.json', JSON.stringify(data, null, 2))

const blocks = data.content.filter((b) => b.type === 'text').map((b) => b.text)

if (data.stop_reason === 'max_tokens') {
  console.error(
    'The agent hit its output limit before finishing. Nothing was written.\n' +
      `Lower "budget.proposals" in ${dir}/agent.json, or raise "maxTokens".\n` +
      'Its research is preserved in .agent-run/raw.json.',
  )
  console.error('\nLast 2000 characters of output:\n')
  console.error((blocks.at(-1) ?? '').slice(-2000))
  process.exit(1)
}

/**
 * With web search on, the response is a running commentary interleaved with
 * tool calls, and the JSON arrives at the end. Joining every text block glues
 * the narration onto the answer and nothing parses — so take the last complete
 * JSON object in the response instead.
 */
function extractJson(chunks) {
  for (const chunk of [...chunks].reverse()) {
    const cleaned = chunk.replace(/```(?:json)?/g, '').trim()
    const start = cleaned.indexOf('{')
    const end = cleaned.lastIndexOf('}')
    if (start === -1 || end <= start) continue
    const candidate = cleaned.slice(start, end + 1)
    try {
      return JSON.parse(candidate)
    } catch {
      /* try the next block */
    }
  }
  return null
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

/**
 * Models wrap file contents in markdown fences, add a heading above the front
 * matter, or leave stray whitespace. None of that is misbehaviour worth failing
 * a run over — it is formatting. Normalise it here rather than letting a broken
 * file reach the repository.
 */
function normaliseFile(raw) {
  let t = String(raw ?? '')
  t = t.replace(/^\uFEFF/, '')
  // Strip an outer code fence if the whole file is wrapped in one.
  const fence = t.match(/^\s*```[a-zA-Z]*\n([\s\S]*?)\n```\s*$/)
  if (fence) t = fence[1]
  // Drop anything before the front matter opener.
  const start = t.indexOf('---')
  if (start > 0 && !t.slice(0, start).includes('---')) t = t.slice(start)
  t = t.trimStart()
  if (!t.endsWith('\n')) t += '\n'
  return t
}

/** Front matter must be present and parseable before anything is written. */
function frontMatterOf(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return { ok: false, reason: 'no front matter' }
  const fm = m[1]
  const id = (fm.match(/^id:\s*(\S+)$/m) || [])[1]
  if (!id) return { ok: false, reason: 'no id field' }
  if (!/^review:/m.test(fm)) return { ok: false, reason: 'no review block' }
  if (/^\s*state:\s*reviewed/m.test(fm))
    return { ok: false, reason: 'claims review.state: reviewed — agents may not' }
  return { ok: true, id }
}

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
  const check = frontMatterOf(content)
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

const pr = [
  out.summary ?? '',
  '',
  '## Checklist',
  ...Object.entries(out.checklist ?? {}).map(([q, a]) => `- **${q}** — ${a}`),
  '',
  '## Considered and rejected',
  ...(out.rejected ?? []).map((r) => `- **${r.what}** — ${r.why}`),
  '',
  `## Files (${written.length})`,
  ...written.map((p) => `- \`${p}\``),
  ...(rejected.length
    ? ['', `## Rejected before writing (${rejected.length})`,
       ...rejected.map((r) => `- \`${r.path}\` — ${r.reason}`)]
    : []),
  '',
  `_Proposed by the ${agent} agent. Nothing here is published until merged._`,
].join('\n')

mkdirSync('.agent-run', { recursive: true })
writeFileSync('.agent-run/pr-body.md', pr)
writeFileSync('.agent-run/count.txt', String(written.length))

console.log(`${agent}: ${written.length} file(s) proposed`)
for (const p of written) console.log('  ' + p)
