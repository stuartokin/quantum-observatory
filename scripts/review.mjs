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
const DIR = 'content/frontier'
const today = new Date().toISOString().slice(0, 10)

if (!['mark-reviewed', 'veto'].includes(action)) {
  console.error(`Unknown action "${action}". Use mark-reviewed or veto.`)
  process.exit(2)
}

const wanted = idsRaw
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

if (action === 'veto' && wanted.length === 0) {
  console.error('Veto needs explicit ids. Refusing to veto everything by accident.')
  process.exit(2)
}

const files = readdirSync(DIR).filter((f) => f.endsWith('.md'))
const changed = []
const skipped = []

for (const f of files) {
  const path = join(DIR, f)
  let text = readFileSync(path, 'utf8')
  const id = (text.match(/^id:\s*(\S+)$/m) || [])[1]
  if (!id) continue
  if (wanted.length && !wanted.includes(id)) continue

  const state = (text.match(/^\s*state:\s*(\S+)$/m) || [])[1]

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
