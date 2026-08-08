#!/usr/bin/env node
/**
 * Gate 2 — performance budget.
 *
 * Measured GZIPPED, because that is what a visitor on a train downloads.
 *
 * Two budgets, deliberately:
 *
 *   app     — React plus the canvas board. Should stay roughly flat no matter
 *             how large the board gets. If this grows, someone added code.
 *   content — the frontier items themselves. Grows as agents fill the board,
 *             which is the whole point, so it gets a generous ceiling.
 *
 * One combined number would show the application appearing to bloat every time
 * a research agent did its job, which is the wrong signal entirely.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const ASSETS = 'dist/assets'
const KB = 1024

const BUDGET = {
  app: 95 * KB,
  content: 220 * KB,
  css: 20 * KB,
}

const gz = (file) => gzipSync(readFileSync(join(ASSETS, file)), { level: 9 }).length

const files = readdirSync(ASSETS)
const js = files.filter((f) => f.endsWith('.js'))
const isContent = (f) => f.startsWith('content-')

const groups = {
  app: js.filter((f) => !isContent(f)),
  content: js.filter(isContent),
  css: files.filter((f) => f.endsWith('.css')),
}

const fail = []
console.log('Performance budget (gzipped):')

for (const [name, list] of Object.entries(groups)) {
  const bytes = list.reduce((t, f) => t + gz(f), 0)
  const limit = BUDGET[name]
  const pct = Math.round((bytes / limit) * 100)
  const flag = bytes > limit ? 'FAIL' : 'ok'
  console.log(
    `  ${name.padEnd(8)} ${(bytes / KB).toFixed(1).padStart(7)} KB / ${(limit / KB).toFixed(0).padStart(3)} KB  ${String(pct).padStart(3)}%  ${flag}`,
  )
  if (bytes > limit) fail.push(`${name} over by ${((bytes - limit) / KB).toFixed(1)} KB gzipped`)
}

if (groups.content.length === 0) {
  console.log('\n  Note: no separate content chunk. Check manualChunks in vite.config.ts.')
}

if (fail.length) {
  console.error('\nBudget exceeded:\n' + fail.map((f) => '  - ' + f).join('\n'))
  console.error(
    '\nIf "content" is over, the board has outgrown build-time bundling.\n' +
      'The fix is to emit content as a JSON file fetched at runtime, not to\n' +
      'raise the ceiling — see AGENT-PLAN.md.',
  )
  process.exit(1)
}
console.log('Within budget.')
