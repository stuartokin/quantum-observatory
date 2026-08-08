#!/usr/bin/env node
/**
 * Confirm or veto agent output.
 *
 * The publish-first model only works if reviewing is genuinely easy. Editing
 * `review.state` by hand across a dozen markdown files is not easy, so it
 * becomes something you stop doing — and then the board fills with entries
 * labelled unreviewed forever.
 *
 * Usage:
 *   node scripts/review.mjs mark-reviewed              # everything unreviewed
 *   node scripts/review.mjs mark-reviewed id1,id2      # named items
 *   node scripts/review.mjs veto id1,id2 "reason"      # revert to unsourced
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const [action, idsRaw = '', note = ''] = process.argv.slice(2)

/**
 * ALL is required for a bulk operation. It used to be that leaving the ids
 * field blank meant "everything", which marked 41 unread items as human-reviewed
 * in a single click — asserting exactly the thing the provenance system exists
 * to protect. A destructive default with no undo is a bad default.
 */
const BULK = 'ALL'
const DIR = 'content/frontier'
const today = new Date().toISOString().slice(0, 10)

if (!['mark-reviewed', 'veto', 'restore'].includes(action)) {
  console.error(`Unknown action "${action}". Use mark-reviewed, veto or restore.`)
  process.exit(2)
}

const bulkRequested = idsRaw.trim().toUpperCase() === 'ALL'

// ALL is a mode, not an id. Treating it as one made it match nothing.
const wanted = bulkRequested
  ? []
  : idsRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

const bulk = bulkRequested

if (action === 'veto' && (wanted.length === 0 || bulk)) {
  console.error('Veto needs explicit ids. It is never applied in bulk.')
  process.exit(2)
}

if (action === 'mark-reviewed' && wanted.length === 0 && !bulk) {
  console.error(
    'Nothing named.\n\n' +
      'Marking an item reviewed asserts that a person has read it. To confirm\n' +
      'everything at once, type ALL in the ids field — deliberately, not by\n' +
      'leaving it blank.\n\n' +
      'Otherwise give ids, comma separated.',
  )
  process.exit(2)
}

if (action === 'restore' && wanted.length === 0 && !bulk) {
  console.error('Restore needs ids, or ALL to restore every agent-written item.')
  process.exit(2)
}

const files = readdirSync(DIR).filter((f) => f.endsWith('.md'))

if (bulk && action === 'mark-reviewed') {
  console.log('Bulk confirmation requested. Every unreviewed item will be marked')
  console.log('as read by a human. This is a claim about you, not about the board.\n')
}
const changed = []
const skipped = []

for (const f of files) {
  const path = join(DIR, f)
  let text = readFileSync(path, 'utf8')
  const id = (text.match(/^id:\s*(\S+)$/m) || [])[1]
  if (!id) continue
  if (wanted.length && !wanted.includes(id)) continue

  const state = (text.match(/^\s*state:\s*(\S+)$/m) || [])[1]

  /**
   * Put an item back to the state the agent left it in.
   *
   * Anything an agent wrote carries agentMergedOn. If it is now marked
   * reviewed but nobody actually read it, this undoes that — the only
   * recovery for a bulk confirmation made by accident, since a commit
   * straight to main has no Revert button.
   */
  if (action === 'restore') {
    const merged = (text.match(/^\s*agentMergedOn:\s*'([^']+)'$/m) || [])[1]
    const agent = (text.match(/^\s*agent:\s*(\S+)$/m) || [])[1]
    if (!merged) {
      if (wanted.includes(id)) skipped.push(`${id} — no agentMergedOn; not agent-written`)
      continue
    }
    if (state === 'agent-merged') {
      if (wanted.includes(id)) skipped.push(`${id} — already agent-merged`)
      continue
    }
    const block = [
      'review:',
      '  state: agent-merged',
      '  by: agent',
      `  agentMergedOn: '${merged}'`,
      ...(agent ? [`  agent: ${agent}`] : []),
      ...(note ? [`  note: '${note.replace(/'/g, "''")}'`] : []),
      '',
    ].join('\n')
    text = text.replace(/^review:\n(?:[ ]{2}.*\n)*/m, block)
    writeFileSync(path, text)
    changed.push(id)
    continue
  }

  if (action === 'mark-reviewed') {
    if (state !== 'agent-merged') {
      if (wanted.includes(id)) skipped.push(`${id} — already ${state}`)
      continue
    }
    // Keep agentMergedOn. The history of who published it and when stays
    // legible after review; overwriting it would erase the provenance trail.
    const merged = (text.match(/^\s*agentMergedOn:\s*'([^']+)'$/m) || [])[1]
    const agent = (text.match(/^\s*agent:\s*(\S+)$/m) || [])[1]
    const block = [
      'review:',
      '  state: reviewed',
      '  by: human',
      `  'on': '${today}'`,
      ...(merged ? [`  agentMergedOn: '${merged}'`] : []),
      ...(agent ? [`  agent: ${agent}`] : []),
      ...(note ? [`  note: '${note.replace(/'/g, "''")}'`] : []),
      '',
    ].join('\n')
    text = text.replace(/^review:\n(?:[ ]{2}.*\n)*/m, block)
    writeFileSync(path, text)
    changed.push(id)
    continue
  }

  // Veto. Record it rather than deleting — a reverted claim is part of the
  // record, and an item that silently vanishes teaches the reader nothing.
  if (state !== 'agent-merged') {
    skipped.push(`${id} — is ${state}, not agent-merged`)
    continue
  }
  const block = [
    'review:',
    '  state: vetoed',
    '  by: human',
    `  'on': '${today}'`,
    ...(note ? [`  note: '${note.replace(/'/g, "''")}'`] : []),
    '',
  ].join('\n')
  text = text.replace(/^review:\n(?:[ ]{2}.*\n)*/m, block)
  // A vetoed item leaves the board but stays in the repository.
  text = text.replace(/^status:\s*published$/m, 'status: archived')
  writeFileSync(path, text)
  changed.push(id)
}

for (const id of wanted) {
  if (!changed.includes(id) && !skipped.some((s) => s.startsWith(id))) {
    skipped.push(`${id} — no such item`)
  }
}

console.log(`${action}: ${changed.length} item(s)`)
for (const id of changed) console.log('  ' + id)
if (skipped.length) {
  console.log('\nSkipped:')
  for (const s of skipped) console.log('  ' + s)
}
if (changed.length === 0) {
  console.log('\nNothing to do.')
}
