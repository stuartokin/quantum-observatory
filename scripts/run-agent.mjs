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
If you found nothing worth proposing, return an empty files array and say so in
the summary. A run that reports nothing is a valid run.
`

/* ---------- call ---------- */

const body = {
  model: cfg.model,
  max_tokens: 16000,
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
const text = data.content
  .filter((b) => b.type === 'text')
  .map((b) => b.text)
  .join('\n')
  .trim()

/* ---------- write ---------- */

let out
try {
  out = JSON.parse(text.replace(/^```(?:json)?\n?|```$/g, '').trim())
} catch (e) {
  console.error('Agent did not return parseable JSON. Raw output follows.\n')
  console.error(text.slice(0, 4000))
  process.exit(1)
}

const inScope = (p) =>
  cfg.write_scope.some((s) => {
    const rx = new RegExp('^' + s.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '§').replace(/\*/g, '[^/]*').replace(/§/g, '.*') + '$')
    return rx.test(p)
  })

const files = (out.files ?? []).slice(0, cfg.budget?.proposals ?? 6)
const written = []

for (const f of files) {
  if (!inScope(f.path)) {
    // The scope gate in CI would catch this too. Failing here is cheaper and
    // names the agent rather than the pull request.
    console.error(`REFUSED: ${f.path} is outside ${agent}'s write_scope`)
    process.exit(1)
  }
  mkdirSync(dirname(f.path), { recursive: true })
  writeFileSync(f.path, f.content)
  written.push(f.path)
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
  '',
  `_Proposed by the ${agent} agent. Nothing here is published until merged._`,
].join('\n')

mkdirSync('.agent-run', { recursive: true })
writeFileSync('.agent-run/pr-body.md', pr)
writeFileSync('.agent-run/count.txt', String(written.length))

console.log(`${agent}: ${written.length} file(s) proposed`)
for (const p of written) console.log('  ' + p)
