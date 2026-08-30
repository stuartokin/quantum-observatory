#!/usr/bin/env node
/**
 * Gate 2 — performance budget.
 *
 * Measured GZIPPED, because that is what a visitor on a train downloads.
 *
 * The buckets answer different questions, and keeping them apart is the whole
 * point: one combined number would show the application appearing to bloat
 * every time a research agent did its job, which is the wrong signal entirely.
 *
 *   app       the entry chunk — downloaded and executed before anything can
 *             appear. If this grows, someone added code.
 *   deferred  chunks loaded on demand. Real bytes, charged only to the readers
 *             who open the thing.
 *   docs      the project's own documents, imported as ?raw strings and
 *             rendered by Help. They grow with the project rather than the
 *             application. Help is lazy, so nobody pays for these unless they
 *             open it.
 *   data      the board itself, fetched as JSON. Grows as agents fill the
 *             board, which is the point.
 *   news      headlines, fetched as JSON. Grows fastest of anything here — a
 *             backfill month adds dozens — and is the least needed at first
 *             paint. Its own bucket, so the newsroom doing its job does not
 *             quietly slow the board for everyone.
 *   css       stylesheets.
 *
 * ---------------------------------------------------------------------------
 * HISTORY, KEPT BECAUSE EVERY ONE OF THESE WAS LEARNED THE EXPENSIVE WAY
 * ---------------------------------------------------------------------------
 *
 * `app` was raised 80 → 92 on 8 Aug 2026, accounted for line by line, because
 * "it grew a bit" is how a budget becomes decoration. Then REDUCED to 88 on
 * 10 Aug when front-matter and js-yaml left the browser: a measured 13.8 KB
 * saving, 97.5 → 83.7. The ceiling had first been set to 80 from an estimate
 * of "about 30 KB", which was wrong by more than twice, and the build then
 * failed on a number nobody had measured.
 *
 *   A ceiling that only ever moves upward is a record of surrender.
 *   A ceiling set from an estimate is not a measurement either.
 *
 * Help was then lazy-loaded and the figure went UP — because this script
 * counted every chunk as "app". Splitting code cannot reduce a total; it
 * reduces what is fetched before first paint. The buckets were rewritten to
 * measure that instead, which is what a performance budget was always for.
 *
 * Then the app grew again and the cause was not the application at all:
 * /content/news/ and /content/forecasts/ were missing from the chunk matcher,
 * so every headline the newsroom wrote was landing in the entry chunk. The
 * tell was the content chunk staying byte-identical between builds while the
 * app climbed. If a figure rises after an agent run rather than after a code
 * change, look at the matcher before looking at the code.
 *
 * ---------------------------------------------------------------------------
 * 0.49.0 — CONTENT IS FETCHED, SO THIS MEASURES SOMETHING ELSE NOW
 * ---------------------------------------------------------------------------
 *
 * The `content` and `news` JavaScript chunks are gone. Content is emitted as
 * JSON assets by plugins/contentJson.ts and fetched at runtime, which is what
 * AGENT-PLAN.md §11a and DESIGN-LOG.md both said to do when content outgrew
 * bundling — and specifically said to do *instead of* raising the ceiling.
 *
 * **The new ceilings are not the old ones relaxed.** They are measured from
 * the 0.49.0 build, and they measure a different thing: bytes fetched as data
 * after the shell is up, rather than bytes parsed and executed as code before
 * anything can render. That distinction is the entire justification for the
 * numbers being different, and it is the same distinction drawn in 0.1.4 when
 * the budget moved from raw to gzipped — the limit was not raised to make a
 * failure go away, the measurement changed to a truer one.
 *
 * Measured by this script at 0.49.0 — not read off Vite's build output, which
 * gzips at a different level and reports slightly smaller numbers. The ceiling
 * has to be set from the same measurement that enforces it.
 *
 *   app        75.1  ceiling 88   (unchanged; +1.5 on 0.48.11 because
 *                                  _scales.json moved into the entry chunk
 *                                  when the content chunk stopped existing)
 *   deferred   18.3  ceiling 60   (unchanged)
 *   docs       50.0  ceiling 65   (new bucket; was inside content's 220)
 *   data      109.9  ceiling 150  (new bucket)
 *   news       73.4  ceiling 100  (new bucket)
 *   css         6.3  ceiling 20   (unchanged)
 *
 * Before first paint, which is the comparison that matters:
 *
 *   0.48.11   374.8 KB gzipped, all of it JavaScript to parse and execute
 *             (app 73.6 + content 188.8 + news 106.1 + css 6.3). The project
 *             documents were inside that content chunk, and a manual chunk
 *             containing anything statically imported is fetched eagerly — so
 *             every visitor downloaded DESIGN-LOG.md whether or not they ever
 *             opened Help.
 *   0.49.0    264.6 KB gzipped (75.1 code + 183.2 data + 6.3 css), with the
 *             50.0 KB of documents moved behind Help where they belong.
 *
 * **110.2 KB less before anything renders**, and 183.2 KB of the remainder is
 * now JSON rather than JavaScript — fetched in parallel, cached independently
 * of code, and parsed without the engine treating it as a program. A Monday
 * agent run no longer invalidates the application bundle for every reader.
 *
 * **These ceilings are deliberately tight enough to fail when the Q-Day
 * datasets land** (see QDAY-PLAN.md — roughly 75–90 KB gzipped of vendor,
 * organisation and threat records). That failure is wanted: it forces the
 * question rather than letting the number drift. The first lever when it
 * happens is not this file — it is deferring `news`, which is 40% of the
 * fetched bytes and is shown a fortnight at a time. `store.ts` is shaped to
 * make that a change to one function.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const DIST = 'dist'
const ASSETS = join(DIST, 'assets')
const DATA = join(DIST, 'content-data')
const KB = 1024

const BUDGET = {
  app: 88 * KB,
  // Enforced on the LARGEST deferred chunk, not their sum. See BIGGEST_WINS.
  deferred: 40 * KB,
  docs: 65 * KB,
  data: 150 * KB,
  news: 100 * KB,
  css: 20 * KB,
}

const gz = (path) => gzipSync(readFileSync(path), { level: 9 }).length

const assets = existsSync(ASSETS) ? readdirSync(ASSETS) : []
const dataFiles = existsSync(DATA) ? readdirSync(DATA).filter((f) => f.endsWith('.json')) : []

const js = assets.filter((f) => f.endsWith('.js'))
const css = assets.filter((f) => f.endsWith('.css'))
const isEntry = (f) => f.startsWith('index-')
const isDocs = (f) => f.startsWith('docs-')

/**
 * A lazy component brings its own stylesheet, and that stylesheet is fetched
 * with the chunk rather than at first paint.
 *
 * Counting every `.css` file as entry CSS made the before-first-paint total
 * 2.4 KB pessimistic the moment Q-Day arrived with its own — which is the same
 * misfiled-bucket mistake this script has already made twice, once with the
 * news chunk and once by counting every chunk as `app`. Async CSS belongs with
 * the deferred bytes it travels with.
 */
const isEntryCss = (f) => f.startsWith('index-')

/** Path-resolved so the two directories can be measured together. */
const groups = {
  app: js.filter(isEntry).map((f) => join(ASSETS, f)),
  deferred: [
    ...js.filter((f) => !isEntry(f) && !isDocs(f)),
    ...css.filter((f) => !isEntryCss(f)),
  ].map((f) => join(ASSETS, f)),
  docs: js.filter(isDocs).map((f) => join(ASSETS, f)),
  data: dataFiles.filter((f) => f !== 'news.json').map((f) => join(DATA, f)),
  news: dataFiles.filter((f) => f === 'news.json').map((f) => join(DATA, f)),
  css: css.filter(isEntryCss).map((f) => join(ASSETS, f)),
}

const fail = []
console.log('Performance budget (gzipped):')

/**
 * Name every file, not just the totals.
 *
 * A chunk that lands in the wrong bucket is invisible in a summary — the news
 * chunk was counted as deferred for a build, and the only symptom was a number
 * being wrong by 48 KB. Listing what went where costs four lines of output and
 * makes a misfiled chunk obvious.
 */
for (const [name, list] of Object.entries(groups)) {
  if (list.length) console.log(`  ${name}: ${list.map((p) => p.split('/').pop()).join(', ')}`)
}
console.log()

/**
 * THE DEFERRED BUCKET IS JUDGED ON ITS LARGEST CHUNK, NOT ITS TOTAL.
 *
 * Every other bucket is something a reader downloads *all of*, so a sum is the
 * right measure. Deferred chunks are alternatives: you open Q-Day, or Help, or
 * the news archive. Nobody fetches every one, and summing them charges a reader
 * for bytes they will never receive.
 *
 * That made the ceiling punish the wrong thing. Adding a second independent
 * lazy feature moved the number even when nothing existing grew, so the only
 * way to stay inside it was to stop adding features — which is not what a
 * performance budget is for.
 *
 * The largest chunk is what the unluckiest reader actually pays, and it still
 * catches real bloat: if the Q-Day chunk doubles, this fails. The total is
 * still printed, because knowing what the build weighs is worth something; it
 * is just not the thing to fail on.
 */
const BIGGEST_WINS = new Set(['deferred'])

const measured = {}
for (const [name, list] of Object.entries(groups)) {
  const sizes = list.map((p) => gz(p))
  const total = sizes.reduce((t, n) => t + n, 0)
  const bytes = BIGGEST_WINS.has(name) ? Math.max(0, ...sizes) : total
  measured[name] = bytes
  const limit = BUDGET[name]
  const pct = Math.round((bytes / limit) * 100)
  const flag = bytes > limit ? 'FAIL' : 'ok'
  const suffix = BIGGEST_WINS.has(name)
    ? `  largest of ${list.length}; ${(total / KB).toFixed(1)} KB in total`
    : ''
  console.log(
    `  ${name.padEnd(8)} ${(bytes / KB).toFixed(1).padStart(7)} KB / ${(limit / KB).toFixed(0).padStart(3)} KB  ${String(pct).padStart(3)}%  ${flag}${suffix}`,
  )
  if (bytes > limit) fail.push(`${name} over by ${((bytes - limit) / KB).toFixed(1)} KB gzipped`)
}

/**
 * The number that actually matters, stated plainly.
 *
 * Every bucket above answers "is this part growing". None of them answers
 * "how long before a reader sees the board", which is the question the budget
 * exists for. Docs and deferred chunks are excluded because nobody downloads
 * them until they ask for something — which is also why deferred is judged on
 * its largest chunk rather than its total.
 */
const firstPaint = measured.app + measured.css + measured.data + measured.news
console.log(
  `\n  Before first paint: ${(firstPaint / KB).toFixed(1)} KB gzipped ` +
    `(${(measured.app / KB).toFixed(1)} code, ${((measured.data + measured.news) / KB).toFixed(1)} data, ` +
    `${(measured.css / KB).toFixed(1)} css)`,
)

if (groups.data.length === 0) {
  console.log(
    '\n  Note: no content-data/*.json emitted. Check plugins/contentJson.ts is\n' +
      '  registered in vite.config.ts — the board will fetch nothing and show the\n' +
      '  load-failure screen.',
  )
}

/**
 * When data fails, say what is in it.
 *
 * "Content is too big" is not actionable; "news is two fifths of it and only a
 * fortnight is shown" tells you what to do. Measured from the emitted JSON, so
 * these are the real served bytes rather than a proxy for them.
 */
if (fail.some((f) => f.startsWith('data') || f.startsWith('news'))) {
  console.error('\nWhat is in the fetched data:')
  for (const f of dataFiles
    .map((f) => ({ f, b: gz(join(DATA, f)) }))
    .sort((a, b) => b.b - a.b)) {
    console.error(`  ${f.f.replace('.json', '').padEnd(10)} ${(f.b / KB).toFixed(1).padStart(6)} KB gzipped`)
  }
  console.error(
    '\nBefore raising a ceiling: is all of this needed at first paint? News is\n' +
      'shown a fortnight at a time and the archive is opened rarely, so deferring\n' +
      'it out of the initial load is the first lever — see loadContent() in\n' +
      'src/content/store.ts, which is shaped to make that a one-function change.',
  )
}

if (fail.length) {
  console.error('\nBudget exceeded:\n' + fail.map((f) => '  - ' + f).join('\n'))
  if (fail.some((f) => f.startsWith('app'))) {
    console.error(
      '\nApplication code grew. Something was added — a dependency, or a large\n' +
        'component. Find out what before raising this number.',
    )
  }
  process.exit(1)
}
console.log('Within budget.')
