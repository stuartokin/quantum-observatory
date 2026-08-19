import type { FrontierItem } from '../../content/frontierTypes'
import type { Forecast } from '../../content/forecast'
import { parseNumeric, dateForMetric, decimalYear, yearOf, type Numeric } from './parse'

/**
 * DERIVING THE Q-DAY POSITION FROM THE BOARD'S OWN EVIDENCE.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS DELIBERATELY DOES NOT DO, AND WHY
 * ---------------------------------------------------------------------------
 *
 * It does not compute a crossing point between rising capability and a falling
 * requirement, which is what the original plan for this phase described and
 * what the research prototype draws.
 *
 * Two independent reasons, and they agree:
 *
 * 1. **There is no capability time series to fit.** Every qubit-count metric
 *    on the architecture and error-correction items is dated within a
 *    fortnight of August 2026 — that is `evidence.verified`, the date the
 *    board last *checked* the figure, not the date the result happened. The
 *    board records each item's current best value and never its history. A
 *    trend fitted to points that share one x is not a trend.
 *
 * 2. **The only way to get a forward capability curve is a vendor roadmap**,
 *    and `agents/_decisions.md` already settles that: *"A vendor roadmap never
 *    moves a Q-Day score. It is a commercial statement about a product. Record
 *    it as E2, score 0."* The research prototype's one genuinely computed
 *    number extrapolates IBM's published roadmap. This board is not allowed to.
 *
 * So the derivation reasons from what is actually evidenced, and says plainly
 * where each part comes from:
 *
 *   REQUIREMENT   a real dated series — how far the bar has fallen, and how
 *                 fast. This is the strongest thing the board holds and the
 *                 least widely understood.
 *   CAPABILITY    a dated snapshot, expressed as the distance still to cover.
 *                 A gap, not a trajectory.
 *   PROBABILITY   expert elicitation, the only evidence on the board that maps
 *                 to calendar years at all. It is what sets the window.
 *   IMPACT        the qdayImpact ledger: which items have pushed the estimate,
 *                 in which direction, with the board's own reasoning.
 *
 * Everything refused along the way is collected in `excluded` and rendered.
 * A model that silently drops what it cannot parse looks more complete than
 * it is.
 */

export interface RequirementPoint {
  itemId: string
  metricName: string
  value: Numeric
  unit: string
  /** 'physical' or 'logical' qubits. */
  kind: 'physical' | 'logical'
  /** RSA-2048, ECC-256 — whichever the metric names. */
  target: string
  date: string
  year: number
  sourceTitle?: string
  sourceUrl?: string
  evidenceLevel?: string
}

export interface Collapse {
  kind: 'physical' | 'logical'
  target: string
  from: RequirementPoint
  to: RequirementPoint
  /** Base-10 orders of magnitude removed between the two. */
  orders: number
  years: number
  ordersPerYear: number
}

export interface CapabilityPoint {
  itemId: string
  title: string
  metricName: string
  value: Numeric
  kind: 'physical' | 'logical'
  /** The ITEM's most recent source date, not the metric's own. Hardware items
   *  cite per item; only the cryptanalysis items cite per metric. Weaker
   *  provenance, so it is named rather than presented as the same thing. */
  date?: string
  evidenceLevel?: string
}

export interface Gap {
  kind: 'physical' | 'logical'
  /** The MOST FAVOURABLE demonstrated figure of this kind — the largest. Where
   *  two demonstrations differ in strength (94 error-detected logical qubits
   *  against 48 error-corrected on the same device), the larger wins and the
   *  page shows both, because the distinction is in the metric's name and
   *  nothing structured separates them. A gap quoted from the best possible
   *  reading is a best case, and is labelled as one. */
  demonstrated: CapabilityPoint
  /** The LOWEST published requirement — the most favourable bar anyone has
   *  argued for. Same principle from the other side. */
  required: RequirementPoint
  orders: number
}

export interface ProbabilityBand {
  withinYears: number
  lowPct: number
  highPct: number
  /** Year the band lands on, given the anchor. */
  year: number
}

export interface Probability {
  itemId: string
  bands: ProbabilityBand[]
  anchorDate: string
  anchorYear: number
  sourceTitle?: string
  sourceUrl?: string
  evidenceLevel?: string
  /** The survey edition may pre-date the record the board holds. Stated, not
   *  silently resolved. */
  alternativeAnchorYear: number | null
}

export interface ImpactEntry {
  id: string
  title: string
  impact: number
  reasoning?: string
  evidenceLevel?: string
}

export interface ImpactLedger {
  entries: ImpactEntry[]
  /** Sum of impacts. Direction, not magnitude — see the note in `impact()`. */
  net: number
  up: number
  down: number
}

export interface Excluded {
  itemId: string
  metricName: string
  reason: string
}

export interface DerivedWindow {
  from: number
  to: number
  basis: string
  caveat?: string
}

export interface Comparison {
  asserted: { aggressive?: number; central?: number; conservative?: number }
  derived: DerivedWindow | null
  /** True when every asserted axis sits inside the derived window. */
  consistent: boolean
  notes: string[]
}

export interface Derivation {
  requirement: { points: RequirementPoint[]; collapses: Collapse[] }
  capability: { points: CapabilityPoint[]; gaps: Gap[] }
  probability: Probability | null
  impact: ImpactLedger
  window: DerivedWindow | null
  comparison: Comparison
  excluded: Excluded[]
  /** Ids of every item that contributed, so the page can link back. */
  sourcedFrom: string[]
}

/* ------------------------------------------------------------------ helpers */

const kindOf = (unit: string | undefined, name: string): 'physical' | 'logical' | null => {
  const s = `${unit ?? ''} ${name}`.toLowerCase()
  if (s.includes('logical')) return 'logical'
  if (s.includes('physical') || s.includes('atom') || /\bqubits?\b/.test(s)) return 'physical'
  return null
}

/** The cryptographic target a requirement metric names. Read from the metric's
 *  own name rather than inferred, so an unrecognised one is refused. */
const targetOf = (name: string): string | null => {
  const s = name.toLowerCase()
  if (s.includes('rsa')) return 'RSA-2048'
  if (s.includes('ecc') || s.includes('ecdlp') || s.includes('p-256') || s.includes('secp256k1'))
    return 'ECC-256'
  return null
}

const orders = (from: number, to: number): number => Math.log10(from) - Math.log10(to)

/* -------------------------------------------------------------- requirement */

/**
 * Items with `cluster: cryptanalysis` are the ones that say how much machine a
 * break would take. Classifying by cluster rather than by picking ids means a
 * fourth cryptanalysis item is included the day it is added; classifying by
 * cluster rather than by parsing names means nothing depends on wording.
 */
function requirement(items: FrontierItem[], excluded: Excluded[]) {
  const points: RequirementPoint[] = []

  for (const item of items) {
    if (item.cluster !== 'cryptanalysis') continue
    for (const metric of item.metrics ?? []) {
      const kind = kindOf(metric.unit, metric.name)
      const target = targetOf(metric.name)
      const value = parseNumeric(metric.value)
      const dated = dateForMetric(item, metric)

      if (!kind || !target) continue // not a requirement figure; not an error
      if (!value) {
        excluded.push({
          itemId: item.id,
          metricName: metric.name,
          reason: `value "${metric.value}" is not a number this can read`,
        })
        continue
      }
      if (!dated) {
        excluded.push({
          itemId: item.id,
          metricName: metric.name,
          reason: 'no identifier in the note matches a dated source, so it cannot be placed in time',
        })
        continue
      }
      const year = decimalYear(dated.date)
      if (year === null) {
        excluded.push({ itemId: item.id, metricName: metric.name, reason: `source date "${dated.date}" is unreadable` })
        continue
      }
      points.push({
        itemId: item.id,
        metricName: metric.name,
        value,
        unit: metric.unit ?? '',
        kind,
        target,
        date: dated.date,
        year,
        sourceTitle: dated.source.title,
        sourceUrl: dated.source.url,
        evidenceLevel: item.evidence?.level,
      })
    }
  }

  /**
   * The same figure appears on more than one item — `<1000000` physical qubits
   * for RSA-2048 is on both `algo-resource-estimation` and `algo-shor`. Keep
   * one per (target, kind, value, date) so the trend is not weighted by how
   * many items happen to cite the same paper.
   */
  const seen = new Set<string>()
  const deduped = points.filter((p) => {
    const key = `${p.target}|${p.kind}|${p.value.n}|${p.date}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  deduped.sort((a, b) => a.year - b.year)

  /** Earliest to latest within each (target, kind) — the fall actually
   *  recorded, not a fitted line through points that do not warrant one. */
  const collapses: Collapse[] = []
  const groups = new Map<string, RequirementPoint[]>()
  for (const p of deduped) {
    const key = `${p.target}|${p.kind}`
    const list = groups.get(key)
    if (list) list.push(p)
    else groups.set(key, [p])
  }
  for (const list of groups.values()) {
    if (list.length < 2) continue
    const from = list[0]
    const to = list[list.length - 1]
    const years = to.year - from.year
    const o = orders(from.value.n, to.value.n)
    if (!(years > 0) || !Number.isFinite(o) || o <= 0) continue
    collapses.push({
      kind: from.kind,
      target: from.target,
      from,
      to,
      orders: o,
      years,
      ordersPerYear: o / years,
    })
  }

  return { points: deduped, collapses }
}

/* --------------------------------------------------------------- capability */

/**
 * The best demonstrated figure of each kind, today. A snapshot with dates on
 * it, never a trajectory.
 *
 * `atLeast` and `approx` values are read; a bare count is read. What is
 * refused is anything unparseable, and — importantly — the figure is marked
 * when the item carries no source for it at all. `arch-superconducting`
 * records IBM's Nighthawk count from a vendor statement with nothing in
 * `evidence.sources`; that is exactly the kind of number the board's own
 * precedent says must not carry weight, so it is kept visible and flagged
 * rather than dropped or silently used.
 */
/**
 * A count unit, tested on the unit rather than on the metric's prose.
 *
 * The first version tested the name too and excluded anything containing
 * "error" — which threw away "Logical qubits in demonstration
 * (error-corrected)", the single most relevant capability figure on the whole
 * board, while letting through "Logical vs physical qubit lifetime = 2.4
 * times" as though 2.4 were a number of qubits. Testing the controlled field
 * and leaving the prose alone fixes both.
 */
const COUNT_UNIT = /^(physical |logical |neutral )?(qubits?|atoms?)$/

function isCountMetric(unit: string | undefined, name: string): boolean {
  const u = (unit ?? '').trim().toLowerCase()
  // "qubits per cell", "physical qubits per logical qubit", "logical qubits
  // per block" are code parameters and ratios, not counts of a machine.
  if (/\bper\b/.test(`${u} ${name.toLowerCase()}`)) return false
  if (u) return COUNT_UNIT.test(u)
  // A few items leave the unit empty and put it in the name ("Nighthawk qubits").
  return /\bqubits?\b/.test(name.toLowerCase())
}

function capability(items: FrontierItem[], excluded: Excluded[]): CapabilityPoint[] {
  const points: CapabilityPoint[] = []
  for (const item of items) {
    if (item.constellation !== 'architectures' && item.constellation !== 'error-correction') continue
    if (item.status !== 'published') continue
    /**
     * Annealers are excluded, and this is a judgement worth stating.
     * `arch-annealing` reports 5,000 qubits — more than any gate-model device
     * on the board — but an annealer cannot run Shor's algorithm at all, so
     * counting it as progress toward a cryptographically relevant machine
     * would be the exact apples-to-oranges the board's own precedent warns
     * about: *"The claim must state the phenomenon replicated, not the
     * number."*
     */
    if (item.cluster === 'analogue') continue

    for (const metric of item.metrics ?? []) {
      if (!isCountMetric(metric.unit, metric.name)) continue
      const kind = kindOf(metric.unit, metric.name)
      if (!kind) continue
      const value = parseNumeric(metric.value)
      if (!value) {
        excluded.push({ itemId: item.id, metricName: metric.name, reason: `value "${metric.value}" is not a number this can read` })
        continue
      }
      /**
       * Dated by the item, not by the metric. Hardware items cite one paper
       * for the whole item; only the cryptanalysis items name a source per
       * figure. Refusing undated capability metrics the way the requirement
       * trend does would empty this entirely — so the weaker provenance is
       * used and labelled, rather than pretended away or thrown out.
       */
      const dated = (item.evidence?.sources ?? [])
        .filter((s) => s.date)
        .sort((a, b) => String(b.date).localeCompare(String(a.date)))[0]
      if (!dated) {
        excluded.push({ itemId: item.id, metricName: metric.name, reason: 'the item carries no dated source' })
        continue
      }
      points.push({
        itemId: item.id,
        title: item.title,
        metricName: metric.name,
        value,
        kind,
        date: dated.date,
        evidenceLevel: item.evidence?.level,
      })
    }
  }
  return points.sort((a, b) => b.value.n - a.value.n)
}

function gaps(caps: CapabilityPoint[], reqs: RequirementPoint[]): Gap[] {
  const out: Gap[] = []
  for (const kind of ['logical', 'physical'] as const) {
    const best = caps.filter((c) => c.kind === kind).sort((a, b) => b.value.n - a.value.n)[0]
    const need = reqs
      .filter((r) => r.kind === kind)
      .sort((a, b) => a.value.n - b.value.n)[0]
    if (!best || !need) continue
    const o = orders(need.value.n, best.value.n)
    if (!Number.isFinite(o)) continue
    out.push({ kind, demonstrated: best, required: need, orders: o })
  }
  return out
}

/* -------------------------------------------------------------- probability */

/**
 * Expert elicitation is the only evidence on this board that maps to calendar
 * years, so it is what sets the window. It is E3 and it is an opinion survey,
 * which the page says.
 *
 * The anchor is the date of the source the board actually holds, not a year
 * parsed out of prose. That is conservative by up to a year — a survey
 * published as the "2025 report" and recorded here at 2026-04-22 would give a
 * window one year later than the respondents meant. Rather than resolve that
 * by scraping a title, both anchors are reported and the difference is stated.
 */
function probability(items: FrontierItem[]): Probability | null {
  const item = items.find((i) => i.id === 'crqc')
  if (!item) return null

  const bandsRaw: { withinYears: number; value: Numeric }[] = []
  for (const metric of item.metrics ?? []) {
    if (!/percent/i.test(metric.unit ?? '')) continue
    const within = metric.name.match(/within\s+(\d+)\s+year/i)
    const value = parseNumeric(metric.value)
    if (!within || !value || value.lo === undefined || value.hi === undefined) continue
    bandsRaw.push({ withinYears: Number(within[1]), value })
  }
  if (bandsRaw.length === 0) return null

  // The most recent dated source on the item is the record being anchored to.
  const dated = (item.evidence?.sources ?? [])
    .filter((s) => s.date)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))[0]
  if (!dated?.date) return null
  const anchorYear = yearOf(dated.date)
  if (anchorYear === null) return null

  // A source titled "... Report 2025" recorded in 2026 was conducted earlier.
  const titleYear = dated.title?.match(/\b(20\d{2})\b/)?.[1]
  const altYear = titleYear && Number(titleYear) !== anchorYear ? Number(titleYear) : null

  return {
    itemId: item.id,
    bands: bandsRaw
      .sort((a, b) => a.withinYears - b.withinYears)
      .map((b) => ({
        withinYears: b.withinYears,
        lowPct: b.value.lo as number,
        highPct: b.value.hi as number,
        year: anchorYear + b.withinYears,
      })),
    anchorDate: dated.date,
    anchorYear,
    sourceTitle: dated.title,
    sourceUrl: dated.url,
    evidenceLevel: item.evidence?.level,
    alternativeAnchorYear: altYear,
  }
}

/* ------------------------------------------------------------------ impact */

/**
 * The ledger of what has actually moved the estimate.
 *
 * `qdayImpact` runs −3..+3 and is set per item with reasoning, by agents under
 * the board's own rules. Summing it produces a direction, not a date, and the
 * page says so — a net of +7 does not mean seven years. What it is good for is
 * the question no other tracker answers: *what would have to change for this
 * to move*, answered by naming the items that are currently pushing.
 */
function impact(items: FrontierItem[]): ImpactLedger {
  const entries: ImpactEntry[] = items
    .filter((i) => i.status === 'published' && typeof i.qdayImpact === 'number' && i.qdayImpact !== 0)
    .map((i) => ({
      id: i.id,
      title: i.title,
      impact: i.qdayImpact as number,
      reasoning: i.qdayReasoning,
      evidenceLevel: i.evidence?.level,
    }))
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact) || a.title.localeCompare(b.title))

  const up = entries.filter((e) => e.impact > 0).reduce((t, e) => t + e.impact, 0)
  const down = entries.filter((e) => e.impact < 0).reduce((t, e) => t + e.impact, 0)
  return { entries, net: up + down, up, down }
}

/* ------------------------------------------------------------------ derive */

export function derive(items: FrontierItem[], forecast?: Forecast): Derivation {
  const excluded: Excluded[] = []
  const req = requirement(items, excluded)
  const capPoints = capability(items, excluded)
  const prob = probability(items)

  const window: DerivedWindow | null = prob
    ? {
        from: prob.bands[0]?.year ?? prob.anchorYear,
        to: prob.bands[prob.bands.length - 1]?.year ?? prob.anchorYear,
        basis: `Expert elicitation on ${prob.itemId}: ${prob.bands
          .map((b) => `${b.lowPct}–${b.highPct}% within ${b.withinYears} years`)
          .join('; ')}. Anchored to ${prob.anchorDate}, the date of the record the board holds.`,
        caveat:
          prob.alternativeAnchorYear !== null
            ? `The source is titled for ${prob.alternativeAnchorYear} but recorded here at ${prob.anchorDate}. Anchoring to the survey year instead would move this window to ${prob.alternativeAnchorYear + (prob.bands[0]?.withinYears ?? 0)}–${prob.alternativeAnchorYear + (prob.bands[prob.bands.length - 1]?.withinYears ?? 0)}.`
            : undefined,
      }
    : null

  const asserted = {
    aggressive: forecast?.estimates?.aggressive,
    central: forecast?.estimates?.central,
    conservative: forecast?.estimates?.conservative,
  }

  const notes: string[] = []
  let consistent = true
  if (window) {
    for (const [name, year] of Object.entries(asserted)) {
      if (typeof year !== 'number') continue
      if (year < window.from || year > window.to) {
        consistent = false
        notes.push(
          `The asserted ${name} axis (${year}) sits outside the evidence-anchored window ${window.from}–${window.to}.`,
        )
      }
    }
    if (consistent) {
      notes.push(
        `Every asserted axis sits inside the evidence-anchored window ${window.from}–${window.to}. The board's stated range is consistent with the only evidence it holds that maps to calendar years.`,
      )
    }
  } else {
    notes.push('No evidence on the board maps to calendar years, so no window could be derived.')
  }

  const sourcedFrom = [
    ...new Set([
      ...req.points.map((p) => p.itemId),
      ...capPoints.map((p) => p.itemId),
      ...(prob ? [prob.itemId] : []),
    ]),
  ].sort()

  return {
    requirement: req,
    capability: { points: capPoints, gaps: gaps(capPoints, req.points) },
    probability: prob,
    impact: impact(items),
    window,
    comparison: { asserted, derived: window, consistent, notes },
    excluded,
    sourcedFrom,
  }
}
