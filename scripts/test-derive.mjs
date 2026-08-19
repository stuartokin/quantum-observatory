#!/usr/bin/env node
/**
 * Self-test for the Q-Day derivation.
 *
 * The derivation decides what the board's headline figure means, so the parts
 * that can be got quietly wrong are tested against fixtures rather than
 * against live content — live content changes weekly, and a test that changes
 * its answer when an agent runs is not a test.
 *
 * Every case here is one this actually got wrong on the way to working:
 *
 *   - "2.4 times" read as a count of logical qubits, because the filter tested
 *     the metric's prose and "qubit" appears in "Logical vs physical qubit
 *     lifetime".
 *   - "Logical qubits in demonstration (error-corrected)" — the single most
 *     relevant capability figure on the board — thrown away, because the same
 *     filter excluded anything containing "error".
 *   - An annealer's 5,000 qubits counted as progress toward breaking RSA.
 *   - A requirement figure dated from `evidence.verified` (when the board last
 *     looked) rather than from the paper it came from, which collapses the
 *     whole trend onto one week.
 */
import { build } from 'esbuild'

const bundled = await build({
  entryPoints: ['src/qday/derive/index.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  logLevel: 'silent',
})
const mod = await import(
  'data:text/javascript;base64,' + Buffer.from(bundled.outputFiles[0].text).toString('base64')
)
const { derive } = mod

let pass = 0
let fail = 0
const t = (label, ok) => {
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label}`)
  ok ? pass++ : fail++
}

const item = (over) => ({
  schema: 'frontier/v1',
  status: 'published',
  confidence: 'medium',
  review: { state: 'agent-reviewed' },
  evidence: { claim: 'c', verified: '2026-08-18', level: 'E4', sources: [] },
  metrics: [],
  ...over,
})

/* ------------------------------------------------------------ requirement */

const reqItem = item({
  id: 'algo-x',
  title: 'Resource estimation',
  constellation: 'algorithms',
  cluster: 'cryptanalysis',
  readiness: 'emerging',
  pillar: 'quantum',
  metrics: [
    { name: 'Physical qubits to factor RSA-2048', value: '<1000000', unit: 'physical qubits', note: 'Gidney 2025 (arXiv:2505.15917).' },
    { name: 'Physical qubits to factor RSA-2048 (qLDPC)', value: '<100000', unit: 'physical qubits', note: 'Webster 2026 (arXiv:2602.11457).' },
    { name: 'Reduction vs 2019 estimate', value: '20', unit: 'times fewer qubits', note: 'no identifier here' },
    // A genuine requirement figure — names RSA, counts qubits — whose note
    // cites a paper the item does not carry as a source. This is the real
    // case: `algo-shor` quotes Gidney's RSA figure but lists other sources.
    { name: 'Physical qubits for RSA-2048 (cited, not sourced here)', value: '<900000', unit: 'physical qubits', note: 'quoted from arXiv:9999.99999, not in this item' },
    { name: 'Logical qubits for ECC-256', value: '1193', unit: 'logical qubits', note: 'Chevignard EUROCRYPT 2026 (ePrint 2026/280).' },
  ],
  evidence: {
    claim: 'c', verified: '2026-08-18', level: 'E3',
    sources: [
      { url: 'u1', role: 'preprint', identifier: 'arXiv:2505.15917', date: '2025-05-21' },
      { url: 'u2', role: 'corroborating', identifier: 'arXiv:2602.11457', date: '2026-02-12' },
      { url: 'u3', role: 'corroborating', identifier: 'ePrint 2026/280', date: '2026-03-01' },
    ],
  },
})

const d1 = derive([reqItem], undefined)
t('a requirement metric is dated by the paper its note names, not by evidence.verified',
  d1.requirement.points.length === 3 &&
    d1.requirement.points[0].date === '2025-05-21' &&
    d1.requirement.points[1].date === '2026-02-12' &&
    d1.requirement.points.every((p) => p.date !== '2026-08-18'))
t('  the collapse is measured between first and last, in orders of magnitude',
  d1.requirement.collapses.length === 1 &&
    Math.abs(d1.requirement.collapses[0].orders - 1) < 1e-9)
t('  a metric with no identifier in its note is refused, not dated from the item',
  d1.excluded.some((e) => /cannot be placed in time/.test(e.reason)))
t('  "<1000000" is read as a number without losing that it is an upper bound',
  d1.requirement.points[0].value.n === 1000000 && d1.requirement.points[0].value.bound === 'atMost')

/* ------------------------------------------------------------- capability */

const caps = [
  item({
    id: 'qec-scale', title: 'Logical qubit scaling', constellation: 'error-correction',
    cluster: 'codes', readiness: 'experimental', pillar: 'quantum',
    metrics: [
      { name: 'Logical qubits in demonstration (error-corrected)', value: '48', unit: 'logical qubits' },
      { name: 'Logical qubits in demonstration (error-detected)', value: '94', unit: 'logical qubits' },
      { name: 'Physical qubits', value: '98', unit: 'physical qubits' },
    ],
    evidence: { claim: 'c', verified: '2026-08-11', level: 'E3', sources: [{ url: 'u', role: 'preprint', date: '2026-02-25' }] },
  }),
  item({
    id: 'qec-thresh', title: 'Threshold', constellation: 'error-correction',
    cluster: 'surface-code', readiness: 'demonstrated', pillar: 'quantum',
    metrics: [{ name: 'Logical vs physical qubit lifetime', value: '2.4', unit: 'times' }],
    evidence: { claim: 'c', verified: '2026-08-11', level: 'E4', sources: [{ url: 'u', role: 'primary', date: '2026-01-01' }] },
  }),
  item({
    id: 'arch-anneal', title: 'Annealing', constellation: 'architectures',
    cluster: 'analogue', readiness: 'adopted', pillar: 'quantum',
    metrics: [{ name: 'qubits (Advantage2)', value: '5000', unit: 'physical qubits' }],
    evidence: { claim: 'c', verified: '2026-08-09', level: 'E4', sources: [{ url: 'u', role: 'primary', date: '2026-01-01' }] },
  }),
  item({
    id: 'qec-overhead', title: 'Surface code', constellation: 'error-correction',
    readiness: 'emerging', pillar: 'quantum',
    metrics: [{ name: 'Typical overhead', value: '~1000', unit: 'physical qubits per logical qubit' }],
    evidence: { claim: 'c', verified: '2026-08-11', level: 'E1', sources: [{ url: 'u', role: 'primary', date: '2026-01-01' }] },
  }),
]

const d2 = derive([reqItem, ...caps], undefined)
const ids = d2.capability.points.map((p) => `${p.itemId}:${p.value.n}`)

t('an error-CORRECTED logical qubit count is kept', ids.includes('qec-scale:48'))
t('  a "times" ratio is not read as a count of qubits', !ids.some((s) => s.startsWith('qec-thresh')))
t('  an annealer is excluded — it cannot run Shor at any size', !ids.some((s) => s.startsWith('arch-anneal')))
t('  a "per logical qubit" overhead is not a count of a machine', !ids.some((s) => s.startsWith('qec-overhead')))
t('  the gap quotes the most favourable demonstrated figure and names it',
  d2.capability.gaps.some((g) => g.kind === 'logical' && g.demonstrated.value.n === 94 && /error-detected/.test(g.demonstrated.metricName)))

/* ------------------------------------------------------------ probability */

const crqc = item({
  id: 'crqc', title: 'CRQC', constellation: 'algorithms', cluster: 'cryptanalysis',
  readiness: 'emerging', pillar: 'quantum',
  metrics: [
    { name: 'Expert survey probability of CRQC within 10 years', value: '28-49', unit: 'percent' },
    { name: 'Expert survey probability of CRQC within 15 years', value: '51-70', unit: 'percent' },
  ],
  evidence: {
    claim: 'c', verified: '2026-08-08', level: 'E3',
    sources: [{ url: 'u', role: 'corroborating', title: 'Quantum Threat Timeline Report 2025', date: '2026-04-22' }],
  },
})

const d3 = derive([crqc], { schema: 'forecast/v1', id: 'q-day', pillar: 'quantum', title: 'Q-Day', question: 'q', state: 'human-set', estimates: { aggressive: 2036, central: 2038, conservative: 2041 } })

t('a percentage range is read as a band, not a single number',
  d3.probability?.bands?.[0]?.lowPct === 28 && d3.probability?.bands?.[0]?.highPct === 49)
t('  the window is anchored to the date of the record the board holds',
  d3.window?.from === 2036 && d3.window?.to === 2041)
t('  the survey edition pre-dating that record is stated, not silently resolved',
  d3.probability?.alternativeAnchorYear === 2025 && /2035–2040/.test(d3.window?.caveat ?? ''))
t('  an asserted range inside the derived window reads as consistent',
  d3.comparison.consistent === true)

const d4 = derive([crqc], { schema: 'forecast/v1', id: 'q-day', pillar: 'quantum', title: 'Q-Day', question: 'q', state: 'human-set', estimates: { aggressive: 2030, central: 2038, conservative: 2041 } })
t('  an asserted axis outside it does not, and says which one',
  d4.comparison.consistent === false && d4.comparison.notes.some((n) => n.includes('2030')))

/* ----------------------------------------------------------------- impact */

const d5 = derive(
  [
    item({ id: 'a', title: 'A', qdayImpact: 3, readiness: 'emerging', pillar: 'quantum', constellation: 'algorithms' }),
    item({ id: 'b', title: 'B', qdayImpact: -1, readiness: 'emerging', pillar: 'quantum', constellation: 'migration' }),
    item({ id: 'c', title: 'C', qdayImpact: 0, readiness: 'emerging', pillar: 'quantum', constellation: 'pqc' }),
    item({ id: 'd', title: 'D', qdayImpact: 2, status: 'draft', readiness: 'emerging', pillar: 'quantum', constellation: 'pqc' }),
  ],
  undefined,
)
t('the impact ledger counts published items with a non-zero score, and no others',
  d5.impact.entries.length === 2 && d5.impact.net === 2 && d5.impact.up === 3 && d5.impact.down === -1)

/* ------------------------------------------------------------------ empty */

const d6 = derive([], undefined)
t('an empty board derives nothing rather than inventing a window',
  d6.window === null && d6.requirement.points.length === 0 && d6.comparison.consistent === true)

console.log(`\n  ${pass} passed, ${fail} failed`)
if (fail) process.exit(1)
