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

/**
 * app     Raised from 80 to 92 KB on 8 Aug 2026, for v0.19–v0.20.
 *
 *         Accounted for, because "it grew a bit" is how a budget becomes
 *         decoration. No dependency was added. The growth is five new modules
 *         and a much larger board component:
 *
 *           Panels.tsx           news, teaser, Q-Day bar and panel
 *           MiniOrbit.tsx        the live rotating constellation
 *           news.ts              weekly change history derived from the board
 *           forecast.ts          the Q-Day object and its loader
 *           constellationPalette per-constellation hues
 *           Board.tsx            filters, year filter, timeline legend,
 *                                scrollbar, zoom-to-fit, provenance rendering
 *
 *         THE NEXT INCREASE SHOULD NOT BE A NUMBER.
 *
 *         About 30 KB gzipped of this is js-yaml, pulled in by front-matter to
 *         parse content in the browser. Every visitor downloads a YAML parser
 *         to read files that were fixed at build time. Moving that parse into
 *         a Vite plugin would cut roughly a third of the application bundle —
 *         far more than any future raise would concede. Do that instead.
 *
 * content The frontier items. Grows as agents fill the board, which is the
 *         point, so the ceiling is generous. At ~200 items it should move to a
 *         JSON file fetched at runtime rather than bundled.
 */
const BUDGET = {
  app: 92 * KB,
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
  if (fail.some((f) => f.startsWith('content'))) {
    console.error(
      '\nContent has outgrown build-time bundling. The fix is to emit it as a\n' +
        'JSON file fetched at runtime, not to raise the ceiling. See AGENT-PLAN.md.',
    )
  }
  if (fail.some((f) => f.startsWith('app'))) {
    console.error(
      '\nApplication code grew. Something was added — a dependency, or a large\n' +
        'component. Find out what before raising this number.',
    )
  }
  process.exit(1)
}
console.log('Within budget.')
