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
import { readQueue, writeQueue } from './queue.mjs'

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

const boardFiles = readdirSync('content/frontier').filter((f) => f.endsWith('.md'))

const board = boardFiles
  .map((f) => `--- ${f} ---\n${readFileSync(join('content/frontier', f), 'utf8')}`)
  .join('\n\n')

/**
 * The current state of every item, on one line each.
 *
 * The full files are already in context, but state buried in a hundred YAML
 * blocks is easy to skim past — and an issue comment describing an item is
 * vivid, recent-sounding prose. Six consecutive runs reported three items as
 * still draft after they had been published, because the thread said so and
 * nothing contradicted it loudly enough.
 *
 * This table is the contradiction.
 */
const stateTable = boardFiles
  .map((f) => {
    const raw = readFileSync(join('content/frontier', f), 'utf8')
    const get = (k) => (raw.match(new RegExp(`^${k}:\\s*(\\S+)`, 'm')) || [])[1] ?? '?'
    const state = (raw.match(/^\s{2}state:\s*(\S+)/m) || [])[1] ?? '?'
    return `${f.replace(/\.md$/, '').padEnd(38)} ${get('status').padEnd(10)} ${get('readiness').padEnd(13)} ${state}`
  })
  .join('\n')

const decisions = existsSync('agents/_decisions.md')
  ? readFileSync('agents/_decisions.md', 'utf8')
  : ''
const schema = readFileSync('content/schema/frontier.schema.json', 'utf8')

const context = `
# Precedents — settled, apply them

${decisions}

# Open issues

${issueText}

# The board as it stands right now

**This is the truth about the board. An issue comment is not.**

A thread describes what was true when it was written. Where a comment says an
item needs publishing and this table says it is published, the table wins: the
comment is stale, and your job is to say so and close it. Six consecutive runs
repeated the same three publish requests after a person had already actioned
them, because each run read the previous comment rather than the file.

Check here before repeating anything an issue asks for.

\`\`\`
id                                     status     readiness     review
${stateTable}
\`\`\`

## The board in full

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
  "queue": [
    {
      "title": "short description of the job",
      "agent": "scout",
      "source": "issue #85",
      "focus": "/focus scout: the exact instruction, as one string"
    }
  ],
  "issueComments": [ { "number": 21, "body": "what you resolved and what remains" } ],
  "close": [ 21 ],
  "needsHuman": [ { "what": "...", "decision": "what has to be decided" } ]
}

Limits for this run: ${cfg.budget?.proposals ?? 8} files, ${cfg.budget?.decisions ?? 5} decisions, ${cfg.budget?.queue ?? 6} queued instructions.

Queued instructions go in the \`queue\` array above and nowhere else. Writing them
into your summary looks like queuing them and is not — the file is what the
agents read, and prose in an issue comment reaches nobody.
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
    } else if (ev.type === 'error') {
      // Transient, and not worth losing the run over. The steward runs on a
      // trigger, so the simplest recovery is to let the next event start it.
      console.error(`\nStream error: ${JSON.stringify(ev.error)}`)
      console.error('If this is overloaded_error, re-run the workflow.')
      process.exit(1)
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
/**
 * The queue, written as a file rather than described in prose.
 *
 * The first version asked the steward to write agents/_queue.md itself. It
 * dutifully composed six perfectly good entries — into its summary, where no
 * agent reads them. Structured output written by this script is the difference
 * between an instruction that runs and one that reads as though it will.
 */
/**
 * Only these agents exist, and they do different jobs.
 *
 * A job sent to the wrong one is not merely inefficient — scout cannot see the
 * contents of an existing item, so asked to attach a source it will confirm the
 * source, decline to invent a file it cannot read, and escalate. Correct, and
 * six runs were spent on one instruction that way.
 */
const AGENTS = ['scout', 'sourcer', 'verifier', 'reviewer', 'newsroom']

const queued = (out.queue ?? []).slice(0, cfg.budget?.queue ?? 6)
if (queued.length) {
  const today = new Date().toISOString().slice(0, 10)
  const { head, entries } = readQueue()
  const already = new Set(entries.map((e) => e.title.toLowerCase()))
  const fresh = queued
    .filter((q) => {
      if (!q.agent || !q.focus) return false
      if (!AGENTS.includes(q.agent)) {
        console.log(`  skipped: "${q.title}" names agent "${q.agent}", which does not exist`)
        return false
      }
      return !already.has(String(q.title ?? '').toLowerCase())
    })
    .map((q) => ({
      title: q.title ?? q.focus.slice(0, 60),
      agent: q.agent,
      added: today,
      source: q.source ?? '',
      focus: q.focus,
    }))
  if (fresh.length) {
    writeQueue([...entries, ...fresh], head)
    console.log(`  queued ${fresh.length} instruction(s):`)
    for (const f of fresh) console.log(`    ${f.agent}: ${f.title}`)
  }
  if (fresh.length < queued.length) {
    console.log(`  ${queued.length - fresh.length} already queued or incomplete, skipped`)
  }
}

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
