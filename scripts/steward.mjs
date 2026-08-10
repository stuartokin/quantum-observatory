#!/usr/bin/env node
/**
 * THE STEWARD
 *
 * Runs when an issue moves, not on a schedule. Reads the open issues, resolves
 * what the precedents already cover, and leaves only what genuinely needs a
 * person.
 *
 * It differs from the other agents in two ways that matter:
 *
 *   1. It reads GitHub issues, not just the board.
 *   2. It can add to agents/_decisions.md — the precedents file — which is the
 *      only way the system stops asking the same question every week.
 *
 * That second capability is the risky one, so it is deliberately narrow: the
 * agent returns decision *entries*, and this script appends them under a
 * heading that marks them as machine-proposed. It never rewrites the file, so
 * an existing precedent cannot be quietly altered or removed.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { extractJson, normaliseFile, checkFile, schemaForPath } from './agent-io.mjs'

const DIR = 'agents/steward'
const cfg = JSON.parse(readFileSync(`${DIR}/agent.json`, 'utf8'))
const prompt = readFileSync(`${DIR}/prompt.md`, 'utf8')

if (!cfg.enabled) {
  console.log('steward is disabled. Set "enabled": true in agents/steward/agent.json.')
  process.exit(0)
}

const KEY = process.env.ANTHROPIC_API_KEY
if (!KEY) {
  console.error('ANTHROPIC_API_KEY is not set.')
  process.exit(2)
}

/* ---------- context ---------- */

const gh = (args) => execSync(`gh ${args}`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 })

let issues = []
try {
  issues = JSON.parse(gh('issue list --state open --limit 20 --json number,title,body,comments'))
} catch (e) {
  console.error('Could not read issues:', String(e.message).split('\n')[0])
  process.exit(1)
}

if (issues.length === 0) {
  console.log('No open issues. Nothing to steward.')
  process.exit(0)
}

// Newest comments matter most; older ones are usually already actioned.
const issueText = issues
  .slice(0, cfg.budget?.issues ?? 3)
  .map((i) => {
    const comments = (i.comments ?? [])
      .slice(-4)
      .map((c) => `### comment by ${c.author?.login ?? 'unknown'}\n\n${c.body}`)
      .join('\n\n')
    return `## Issue #${i.number} — ${i.title}\n\n${i.body ?? ''}\n\n${comments}`
  })
  .join('\n\n---\n\n')

const board = readdirSync('content/frontier')
  .filter((f) => f.endsWith('.md'))
  .map((f) => `--- ${f} ---\n${readFileSync(join('content/frontier', f), 'utf8')}`)
  .join('\n\n')

const decisions = existsSync('agents/_decisions.md')
  ? readFileSync('agents/_decisions.md', 'utf8')
  : ''
const schema = readFileSync('content/schema/frontier.schema.json', 'utf8')

const context = `
# Precedents — settled, apply them

${decisions}

# Open issues

${issueText}

# The board in full

${board}

# Schema

\`\`\`json
${schema}
\`\`\`

# Today

${new Date().toISOString().slice(0, 10)}

# Output contract

Reply with a single JSON object and nothing else:

{
  "summary": "what you resolved and what you left, for someone with four minutes",
  "files": [ { "path": "content/frontier/_inbox/<id>.md", "content": "<full file>" } ],
  "decisions": [
    { "heading": "Evidence levels", "rule": "...", "reasoning": "one line", "after": "what prompted it" }
  ],
  "issueComments": [ { "number": 21, "body": "what you resolved and what remains" } ],
  "close": [ 21 ],
  "needsHuman": [ { "what": "...", "decision": "what has to be decided" } ]
}

Limits for this run: ${cfg.budget?.proposals ?? 8} files, ${cfg.budget?.decisions ?? 5} decisions.
Every file path must sit inside content/frontier/_inbox/.
Only close an issue where nothing remains for a person.
`

/* ---------- call ---------- */

const res = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'x-api-key': KEY,
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify({
    model: cfg.model,
    max_tokens: cfg.maxTokens ?? 32000,
    system: prompt,
    messages: [{ role: 'user', content: context }],
    tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: cfg.budget?.searches ?? 20 }],
    stream: true,
  }),
})

if (!res.ok) {
  console.error(`API error ${res.status}: ${await res.text()}`)
  process.exit(1)
}

const blocks = []
let current = null
let stopReason = null
let searches = 0
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
    if (ev.type === 'content_block_start') {
      if (ev.content_block?.type === 'text') current = ''
      else if (ev.content_block?.type === 'server_tool_use') {
        searches++
        process.stdout.write(`\r  searching… ${searches}`)
      }
    } else if (ev.type === 'content_block_delta') {
      if (ev.delta?.type === 'text_delta' && current !== null) current += ev.delta.text
    } else if (ev.type === 'content_block_stop') {
      if (current !== null) {
        blocks.push(current)
        current = null
      }
    } else if (ev.type === 'message_delta' && ev.delta?.stop_reason) {
      stopReason = ev.delta.stop_reason
    }
  }
}
if (current !== null) blocks.push(current)
console.log(`\n  ${searches} search(es), ${blocks.length} block(s)`)

mkdirSync('.agent-run', { recursive: true })
writeFileSync('.agent-run/raw.json', JSON.stringify({ stopReason, searches, blocks }, null, 2))

if (stopReason === 'max_tokens') {
  console.error('Hit the output limit. Lower budget.issues or budget.proposals.')
  process.exit(1)
}

const out = extractJson(blocks)
if (!out) {
  console.error('No parseable JSON found. See .agent-run/raw.json')
  process.exit(1)
}

/* ---------- act ---------- */

const written = []
const refused = []

for (const f of (out.files ?? []).slice(0, cfg.budget?.proposals ?? 8)) {
  if (!f.path?.startsWith('content/frontier/_inbox/')) {
    refused.push(`${f.path} — outside the inbox`)
    continue
  }
  const content = normaliseFile(f.content)
  const check = checkFile(content, schemaForPath(f.path))
  if (!check.ok) {
    refused.push(`${f.path} — ${check.reason}`)
    continue
  }
  mkdirSync('content/frontier/_inbox', { recursive: true })
  writeFileSync(f.path, content)
  written.push(f.path)
}

/**
 * Precedents are appended, never rewritten.
 *
 * The agent returns entries; this adds them under a heading that says a machine
 * proposed them. An existing precedent therefore cannot be altered or quietly
 * dropped by an agent — only added to, visibly, in a commit.
 */
const added = (out.decisions ?? []).slice(0, cfg.budget?.decisions ?? 5)
if (added.length) {
  const today = new Date().toISOString().slice(0, 10)
  const block = [
    '',
    `## Proposed by the steward, ${today}`,
    '',
    'Added by an agent applying existing precedent to a new case. Move these up',
    'into the sections above once you have read them — or delete them if wrong.',
    '',
    ...added.flatMap((d) => [
      `**${d.rule}**`,
      '',
      d.reasoning ?? '',
      '',
      `*Proposed ${today}${d.after ? `, after ${d.after}` : ''}. Not yet confirmed by a person.*`,
      '',
    ]),
  ].join('\n')
  writeFileSync('agents/_decisions.md', decisions.trimEnd() + '\n' + block)
}

writeFileSync('.agent-run/count.txt', String(written.length))
writeFileSync('.agent-run/written.txt', written.join('\n'))
writeFileSync(
  '.agent-run/actions.json',
  JSON.stringify(
    {
      summary: out.summary ?? '',
      issueComments: out.issueComments ?? [],
      close: out.close ?? [],
      needsHuman: (out.needsHuman ?? []).slice(0, 3),
      decisionsAdded: added.length,
      refused,
    },
    null,
    2,
  ),
)

console.log(`steward: ${written.length} file(s), ${added.length} precedent(s) proposed`)
for (const p of written) console.log('  ' + p)
if (refused.length) {
  console.log('\nRefused:')
  for (const r of refused) console.log('  ' + r)
}
