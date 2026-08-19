#!/usr/bin/env node
/**
 * Gate — the Q-Day derivation, run against real content.
 *
 * The derivation is TypeScript in `src/qday/derive/`, because the Trends page
 * renders it. This gate runs *that same code* rather than a second copy: the
 * module is bundled with esbuild (already a Vite dependency) and imported. A
 * gate that reimplements what it is checking is a gate that can agree with
 * itself while both halves are wrong — which is precisely how this repo ended
 * up with `glyphFor` in two modules and the board importing the older one.
 *
 * What this does NOT do is fail the build on a divergence between the derived
 * window and the asserted forecast. A divergence is a finding, not a defect;
 * making new evidence break the deploy would teach everyone to stop adding it.
 * It prints, and it writes a proposal for a person.
 */
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import yaml from 'js-yaml'
import { build } from 'esbuild'

const KB = 1024

/* Same normalisation the content pipeline applies: YAML turns an unquoted
 * 2026-05-14 into a Date, and every downstream string comparison then fails. */
function normalise(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (Array.isArray(value)) return value.map(normalise)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, normalise(v)]))
  }
  return value
}

function load(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => {
      const raw = readFileSync(join(dir, f), 'utf8')
      const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
      return m ? normalise(yaml.load(m[1])) : null
    })
    .filter(Boolean)
}

const bundled = await build({
  entryPoints: ['src/qday/derive/index.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  logLevel: 'silent',
})
const code = bundled.outputFiles[0].text
const { derive } = await import(
  'data:text/javascript;base64,' + Buffer.from(code).toString('base64')
)

const items = load('content/frontier')
const forecast = load('content/forecasts').find((f) => f.id === 'q-day')
const news = load('content/news')
const d = derive(items, forecast, news)

const n = (x, dp = 2) => Number(x).toFixed(dp)

console.log('Q-Day derivation:\n')

console.log(`  Requirement — ${d.requirement.points.length} dated figures`)
for (const p of d.requirement.points) {
  console.log(
    `    ${p.date}  ${String(p.value.raw).padStart(9)} ${p.kind.padEnd(8)} ${p.target.padEnd(9)} ${p.itemId}`,
  )
}
for (const c of d.requirement.collapses) {
  console.log(
    `    → ${c.target} ${c.kind}: ${c.from.value.raw} → ${c.to.value.raw}, ` +
      `${n(c.orders)} orders in ${n(c.years, 1)} years (${n(c.ordersPerYear)}/yr)`,
  )
}

console.log(`\n  Capability — ${d.capability.points.length} counts, best by kind`)
for (const g of d.capability.gaps) {
  console.log(
    `    ${g.kind.padEnd(8)} demonstrated ${g.demonstrated.value.raw} (${g.demonstrated.itemId})` +
      ` vs required ${g.required.value.raw} — gap ${n(g.orders)} orders`,
  )
}
console.log('    all counts, most favourable first:')
d.capability.points.forEach((p) =>
  console.log(`      ${String(p.value.raw).padStart(7)} ${p.kind.padEnd(8)} ${String(p.date).padEnd(11)} ${p.itemId.padEnd(30)} ${p.metricName}`),
)

console.log(`\n  Capability series — ${d.capability.series.length} group(s) from dated news measurements`)
for (const g of d.capability.series) {
  console.log(
    `    ${g.kind.padEnd(15)} ${g.modality.padEnd(15)} ${g.points.length} pt(s)  ` +
      (g.doublingMonths ? `doubling ~${g.doublingMonths.toFixed(0)} months` : `no rate: ${g.rateWithheld}`),
  )
  g.points.forEach((p) => console.log(`      ${p.date}  ${String(p.value).padStart(6)}  ${p.qualifier ?? ''}`))
}

if (d.probability) {
  console.log(`\n  Probability — ${d.probability.itemId}, anchored ${d.probability.anchorDate}`)
  d.probability.bands.forEach((b) =>
    console.log(`    ${b.lowPct}–${b.highPct}% within ${b.withinYears} years → ${b.year}`),
  )
}

console.log(`\n  Impact ledger — net ${d.impact.net > 0 ? '+' : ''}${d.impact.net} across ${d.impact.entries.length} items (up +${d.impact.up}, down ${d.impact.down})`)
d.impact.entries.slice(0, 5).forEach((e) =>
  console.log(`    ${e.impact > 0 ? '+' : ''}${e.impact}  ${e.id}`),
)

if (d.window) {
  console.log(`\n  Derived window: ${d.window.from}–${d.window.to}`)
  if (d.window.caveat) console.log(`    caveat: ${d.window.caveat}`)
}
console.log(
  `  Asserted:       ${d.comparison.asserted.aggressive ?? '?'}–${d.comparison.asserted.conservative ?? '?'} (central ${d.comparison.asserted.central ?? '?'})`,
)
d.comparison.notes.forEach((t) => console.log(`    ${t}`))

if (d.excluded.length) {
  console.log(`\n  Refused — ${d.excluded.length} metric(s) the derivation would not guess at:`)
  d.excluded.forEach((e) => console.log(`    ${e.itemId} · ${e.metricName}\n      ${e.reason}`))
}

/**
 * A proposal, not an edit.
 *
 * `agents/_decisions.md`: an agent may move the forecast, but it is stamped
 * `agent-estimate` and only a human can un-stamp it — one axis at a time, a
 * two-year cap, evidence required. So this writes a file for the weekly issue
 * to carry, and never touches `content/forecasts/q-day.md`.
 */
if (!d.comparison.consistent && d.window) {
  mkdirSync('.agent-run', { recursive: true })
  const body =
    `## Q-Day forecast — derived window differs from the asserted one\n\n` +
    `Derived from board evidence: **${d.window.from}–${d.window.to}**\n\n` +
    `Asserted in \`content/forecasts/q-day.md\`: aggressive ${d.comparison.asserted.aggressive ?? '?'}, ` +
    `central ${d.comparison.asserted.central ?? '?'}, conservative ${d.comparison.asserted.conservative ?? '?'}\n\n` +
    `**Basis.** ${d.window.basis}\n\n` +
    (d.window.caveat ? `**Caveat.** ${d.window.caveat}\n\n` : '') +
    d.comparison.notes.map((t) => `- ${t}`).join('\n') +
    `\n\nThis is a proposal. Nothing has been changed. Moving the forecast is a ` +
    `human decision: one axis at a time, a two-year cap on any single move, ` +
    `evidence required — see \`agents/_decisions.md\`.\n`
  writeFileSync('.agent-run/qday-proposal.md', body)
  console.log('\n  Divergence recorded to .agent-run/qday-proposal.md for the weekly issue.')
}

/* The only hard failure: the derivation produced nothing at all, which means
 * the content it depends on has moved or the classification has broken. */
if (d.requirement.points.length === 0 && !d.probability) {
  console.error(
    '\nThe derivation found neither a dated requirement figure nor a probability band.\n' +
      'Either content/frontier lost its cryptanalysis cluster, or the metric/source\n' +
      'join in src/qday/derive/parse.ts has stopped matching. Look there before\n' +
      'assuming the board changed.',
  )
  process.exit(1)
}

console.log(`\nDerivation OK — ${d.sourcedFrom.length} items contributed, ${(Buffer.byteLength(code) / KB).toFixed(0)} KB of derivation code.`)
