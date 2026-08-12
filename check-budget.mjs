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
 *         REDUCED to 88 KB on 10 Aug 2026, from 106.
 *
 *         front-matter and js-yaml are gone from the browser. Content is
 *         parsed at build time by plugins/frontmatter.ts, which is where it
 *         always belonged — the files cannot change once the site is built, so
 *         neither can the result of parsing them. Every visitor had been
 *         downloading a YAML parser to read them anyway.
 *
 *         Measured saving: 13.8 KB gzipped, 97.5 to 83.7. The ceiling was first
 *         set to 80 on an estimate of "about 30 KB", which was wrong by more
 *         than twice, and the build then failed on a number nobody had
 *         measured. 88 is the measured figure plus a little room.
 *
 *         Two lessons, both cheap to forget:
 *         a ceiling that only ever moves upward is a record of surrender;
 *         a ceiling set from an estimate is not a measurement either.
 *
 *         Help was then lazy-loaded, and the figure went UP — because this
 *         script counted every chunk as "app". Splitting code cannot reduce a
 *         total; it reduces what is fetched before first paint. The buckets
 *         below were rewritten to measure that instead, which is what a
 *         performance budget was always for.
 *
 *         Then the app grew again, and the cause was not the application at
 *         all: /content/news/ and /content/forecasts/ were missing from the
 *         chunk matcher in vite.config.ts, so every headline the newsroom wrote
 *         was landing in the entry chunk. The tell was the content chunk
 *         staying byte-identical between builds while the app climbed.
 *
 *         If this figure rises after an agent run rather than after a code
 *         change, look at the chunk matcher before looking at the code.
 *
 *         The news archive and the headline detail view were split out too:
 *         the ticker is on screen from the first paint, those two are not shown
 *         until a reader asks. Splitting them was worth more than raising this
 *         number by the 0.2 KB it was over.
 *
 * deferred Chunks loaded on demand. Real bytes, charged only to the readers who
 *         open the thing. Generous, but not unbounded: everything deferred is
 *         still a download for somebody.
 *
 * news    Headlines. Grows fastest of anything here — a backfill month adds
 *         dozens — and is barely needed at first paint. Its own chunk, so the
 *         newsroom doing its job does not slow the board for everyone.
 *
 * content The frontier items. Grows as agents fill the board, which is the
 *         point, so the ceiling is generous. At ~200 items it should move to a
 *         JSON file fetched at runtime rather than bundled.
 */
const BUDGET = {
  app: 88 * KB,
  deferred: 60 * KB,
  content: 220 * KB,
  news: 120 * KB,
  css: 20 * KB,
}

const gz = (file) => gzipSync(readFileSync(join(ASSETS, file)), { level: 9 }).length

const files = readdirSync(ASSETS)
const js = files.filter((f) => f.endsWith('.js'))
/**
 * Three buckets, because they answer different questions.
 *
 *   app       the entry chunk — what every visitor downloads before seeing
 *             anything. This is the number that matters.
 *   deferred  chunks loaded on demand. Real bytes, but only for the readers
 *             who ask for them.
 *   content   the board itself, which grows as agents do their job.
 *
 * The old script measured all JavaScript as "app", so splitting Help into its
 * own chunk made the figure go UP — the same bytes plus the overhead of the
 * split. A budget that punishes code-splitting is measuring the wrong thing:
 * the point of a performance budget is time to first paint, not total bytes on
 * the server.
 */
const isContent = (f) => f.startsWith('content-')
const isNews = (f) => f.startsWith('news-')
const isEntry = (f) => f.startsWith('index-')

const groups = {
  app: js.filter((f) => isEntry(f)),
  deferred: js.filter((f) => !isEntry(f) && !isContent(f) && !isNews(f)),
  content: js.filter(isContent),
  news: js.filter(isNews),
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

/**
 * When content fails, say what is in it.
 *
 * "Content is too big" is not actionable; "news is two thirds of it and only a
 * fortnight is shown at load" tells you what to do. The counts come from the
 * source tree rather than the bundle, so they are approximate — but the ratio
 * is what matters for deciding where to cut.
 */
if (fail.some((f) => f.startsWith('content'))) {
  const { readdirSync, statSync } = await import('node:fs')
  const { join } = await import('node:path')
  const raw = (dir) => {
    try {
      return readdirSync(dir)
        .filter((f) => f.endsWith('.md'))
        .reduce((t, f) => t + statSync(join(dir, f)).size, 0)
    } catch {
      return 0
    }
  }
  const parts = {
    frontier: raw('content/frontier'),
    news: raw('content/news'),
    articles: raw('content/items'),
  }
  const total = Object.values(parts).reduce((a, b) => a + b, 0) || 1
  console.error('\nWhat is in the content chunk, by source size:')
  for (const [name, bytes] of Object.entries(parts).sort((a, b) => b[1] - a[1])) {
    if (!bytes) continue
    console.error(
      `  ${name.padEnd(9)} ${(bytes / KB).toFixed(0).padStart(4)} KB raw  ` +
        `${String(Math.round((bytes / total) * 100)).padStart(3)}%`,
    )
  }
  console.error(
    '\nBefore raising the ceiling: is all of this needed at first paint? News is\n' +
      'shown a fortnight at a time and the archive is opened rarely, so it is the\n' +
      'first candidate for loading on demand rather than up front.',
  )
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
