import type { FrontierItem, Metric, Source } from '../../content/frontierTypes'

/**
 * READING NUMBERS OUT OF A SCHEMA THAT STORES THEM AS TEXT.
 *
 * `metrics[].value` is a string, deliberately — "<1000000", "28-49", ">99",
 * "~1000" and "tens" are all things a source actually says, and forcing them
 * into a number field would either lose the qualifier or invent a precision
 * nobody claimed.
 *
 * That is the right call for the content model and it means anything wanting
 * to compute has to parse. The rule here: **a value that cannot be read
 * confidently is not guessed at, it is refused and reported.** Everything the
 * derivation drops comes back in `excluded`, with a reason, and is shown on
 * the page. A model that quietly ignores the data it cannot handle is a model
 * that looks more complete than it is.
 */
export type Bound = 'exact' | 'atMost' | 'atLeast' | 'approx' | 'range'

export interface Numeric {
  /** The figure to compute with. For a range, the midpoint. */
  n: number
  bound: Bound
  /** Present only for a range. */
  lo?: number
  hi?: number
  /** The original string, so the page can show what the source actually said. */
  raw: string
}

const CLEAN = /[,\s_]/g

export function parseNumeric(raw: unknown): Numeric | null {
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    return { n: raw, bound: 'exact', raw: String(raw) }
  }
  if (typeof raw !== 'string') return null
  const s = raw.trim()
  if (!s) return null
  const t = s.replace(CLEAN, '')

  // "28-49" — a stated range. Not an en-dash minus; both dash forms appear.
  const range = t.match(/^(\d+(?:\.\d+)?)[-–—](\d+(?:\.\d+)?)$/)
  if (range) {
    const lo = Number(range[1])
    const hi = Number(range[2])
    if (Number.isFinite(lo) && Number.isFinite(hi)) {
      return { n: (lo + hi) / 2, bound: 'range', lo, hi, raw: s }
    }
  }

  const m = t.match(/^([<>≤≥~≈]?)(\d+(?:\.\d+)?)(%?)$/)
  if (!m) return null
  const n = Number(m[2])
  if (!Number.isFinite(n)) return null
  const bound: Bound =
    m[1] === '<' || m[1] === '≤' ? 'atMost'
    : m[1] === '>' || m[1] === '≥' ? 'atLeast'
    : m[1] === '~' || m[1] === '≈' ? 'approx'
    : 'exact'
  return { n, bound, raw: s }
}

/**
 * Identifiers as they are actually written in this repo's notes: `arXiv:2505.15917`,
 * `ePrint 2026/280`, `IACR eprint 2026/280`, a bare DOI.
 */
const ID_PATTERN =
  /(arxiv:\s*\d{4}\.\d{4,5}(?:v\d+)?|(?:iacr\s+)?eprint\s+\d{4}\/\d+|10\.\d{4,}\/[^\s,;)]+)/gi

const normaliseId = (s: string): string => s.toLowerCase().replace(/[^a-z0-9./]/g, '')

export function identifiersIn(text: string | undefined): string[] {
  if (!text) return []
  return [...text.matchAll(ID_PATTERN)].map((m) => normaliseId(m[0]))
}

/**
 * DATE A METRIC BY THE SOURCE ITS NOTE NAMES.
 *
 * This is the join the whole requirement trend rests on, so it is worth being
 * explicit about what it does and does not claim.
 *
 * A metric has no date of its own — the schema dates the *item*
 * (`evidence.verified`), which is when the board last checked it, not when the
 * result happened. Using that would collapse every figure onto the week an
 * agent last ran and destroy exactly the signal being looked for.
 *
 * But a metric's note almost always names the paper it came from
 * ("Gidney 2025 (arXiv:2505.15917)"), and that paper is in `evidence.sources`
 * with a real publication date. Matching the two gives each figure the date
 * its *result* carries rather than the date the board noticed it.
 *
 * When no identifier in the note matches a source, the metric is refused. It
 * is not dated from the item, and it is not guessed.
 */
export function dateForMetric(
  item: FrontierItem,
  metric: Metric,
): { date: string; source: Source } | null {
  const wanted = identifiersIn(metric.note)
  if (wanted.length === 0) return null
  const sources = item.evidence?.sources ?? []
  for (const source of sources) {
    const own = normaliseId(source.identifier ?? source.doi ?? '')
    if (!own || !source.date) continue
    if (wanted.some((w) => own.includes(w) || w.includes(own))) {
      return { date: source.date, source }
    }
  }
  return null
}

/** Year as a number, or null. Dates in this repo are `YYYY-MM-DD` after the
 *  build-time normalisation, but a hand-edit could leave something else. */
export function yearOf(date: string | undefined): number | null {
  if (!date) return null
  const y = Number(String(date).slice(0, 4))
  return Number.isInteger(y) && y > 1900 && y < 2200 ? y : null
}

/** Fractional year, so two results four months apart are not the same point. */
export function decimalYear(date: string): number | null {
  const t = Date.parse(date)
  if (Number.isNaN(t)) return null
  const d = new Date(t)
  const start = Date.UTC(d.getUTCFullYear(), 0, 1)
  const end = Date.UTC(d.getUTCFullYear() + 1, 0, 1)
  return d.getUTCFullYear() + (t - start) / (end - start)
}
