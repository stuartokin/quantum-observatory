import type { FrontierItem } from '../../content/frontierTypes'
import { LEVELS, levelIndex } from './tower'

/**
 * TIMELINE
 *
 * x = when the evidence was published. y = readiness, the same axis the galaxy
 * uses, so switching view never changes what is being claimed.
 *
 * `added` is deliberately NOT used: that is the date the file was written, not
 * the date anything happened. Only real source dates place a mark on the axis;
 * everything else sits in an undated gutter and says so.
 */

/** How a date was arrived at, in words a reader can act on. */
export const PRECISION_NOTE: Record<DatePrecision, string> = {
  exact: 'the source states this date',
  moved: 'estimated from when the readiness last changed',
  verified: 'estimated from when the evidence was last checked — the work existed by then, so this is a latest-possible date',
  added: 'estimated from when this reached the board, which is the weakest of the available signals',
  none: 'no date could be established',
}

/** Fraction of the plot width reserved for undated items, on the left. */
export const GUTTER = 0.11

/**
 * When the evidence landed, and how confident we are of that.
 *
 * This used to consider only `sources[].date` and `moved.on`, so an item whose
 * source carries no date field fell into the undated gutter — even when the
 * board plainly knew roughly when the work happened. FIPS 206 sat there while
 * its own claim said the initial public draft was submitted in August 2025.
 *
 * The gutter should hold items the board genuinely cannot place, not items
 * whose date is recorded in a different field. So: fall back through what is
 * known, and say which rung was used.
 *
 *   exact      a source states its own date
 *   moved      the readiness change is dated
 *   verified   somebody checked the evidence on a known day: the work existed
 *              by then, so this is a latest-possible date rather than a guess
 *   added      the item reached the board, which is weaker still
 *
 * Anything below `exact` is an estimate and the board marks it as one. An
 * estimate labelled as such is more useful than a blank; an estimate presented
 * as fact is worse than either.
 */
export type DatePrecision = 'exact' | 'moved' | 'verified' | 'added' | 'none'

const parse = (d?: string): Date | null => {
  if (!d) return null
  // A bare year means "some time that year", so place it mid-year rather than
  // on 1 January, which would read as a precise date nobody asserted.
  const t = /^\d{4}$/.test(d) ? new Date(`${d}-06-30`) : new Date(d)
  return isNaN(t.getTime()) ? null : t
}

export function datedOf(item: FrontierItem): { date: Date | null; precision: DatePrecision } {
  const sourceDates = (item.evidence?.sources ?? [])
    .map((s) => parse(s.date))
    .filter((d): d is Date => d !== null)
  if (sourceDates.length) {
    return {
      date: new Date(Math.min(...sourceDates.map((d) => d.getTime()))),
      precision: 'exact',
    }
  }

  const moved = parse(item.moved?.on)
  if (moved) return { date: moved, precision: 'moved' }

  const verified = parse(item.evidence?.verified)
  if (verified) return { date: verified, precision: 'verified' }

  const added = parse(item.added)
  if (added) return { date: added, precision: 'added' }

  return { date: null, precision: 'none' }
}

export function dateOf(item: FrontierItem): Date | null {
  return datedOf(item).date
}

export interface Mark {
  id: string
  x: number
  y: number
  r: number
  dated: boolean
  /** How the date was arrived at. Anything but 'exact' is an estimate. */
  precision: DatePrecision
  sourced: boolean
  weight: number
  /** 0–1. Drives size, brightness and whether a label is kept. */
  importance: number
  attention: number
  label: string
  date: Date | null
}

export interface TimelineLayout {
  marks: Mark[]
  from: Date
  to: Date
  years: number[]
  undated: number
}

export function layoutTimeline(
  items: FrontierItem[],
  opts: { sourced: (i: FrontierItem) => boolean; attention: (i: FrontierItem) => number },
): TimelineLayout {
  const resolved = items.map(datedOf)
  const dates = resolved.map((r) => r.date)
  const known = dates.filter((d): d is Date => d !== null)

  const now = new Date()
  const first = known.length
    ? new Date(Math.min(...known.map((d) => d.getTime())))
    : new Date(now.getFullYear() - 3, 0, 1)

  const pad = (now.getTime() - first.getTime()) * 0.05
  const lo = first.getTime() - pad
  const hi = now.getTime() + pad

  const years: number[] = []
  for (let y = new Date(lo).getFullYear(); y <= new Date(hi).getFullYear(); y++) years.push(y)

  const marks: Mark[] = items.map((item, i) => {
    const d = dates[i]
    const prec = resolved[i].precision
    const level = levelIndex(item.readiness)
    const weight = item.confidence === 'high' ? 1 : item.confidence === 'medium' ? 0.65 : 0.35
    const src = opts.sourced(item)
    const att = opts.attention(item)

    // Importance drives size, brightness and label priority. Evidence counts
    // for most of it: a sourced claim is worth more than an unsourced topic.
    const importance = Math.min(
      1,
      (src ? 0.5 : 0) + weight * 0.3 + att * 0.25 + (item.metrics?.length ? 0.15 : 0),
    )

    return {
      id: item.id,
      // Dated marks live to the right of the gutter.
      x: d ? GUTTER + ((d.getTime() - lo) / (hi - lo)) * (1 - GUTTER) : -1,
      y: (level + 0.5) / LEVELS.length,
      r: 3 + importance * 8,
      dated: d !== null,
      precision: prec,
      sourced: src,
      weight,
      importance,
      attention: att,
      label: item.title.length > 36 ? item.title.slice(0, 35) + '…' : item.title,
      date: d,
    }
  })

  // Undated items: packed into the gutter in columns, inside the plot so they
  // are visible and clickable rather than pushed off the left edge.
  const un = marks.filter((m) => !m.dated)
  const perBand = new Map<number, number>()
  for (const m of un) {
    const band = Math.round(m.y * LEVELS.length)
    const n = perBand.get(band) ?? 0
    perBand.set(band, n + 1)
    m.x = 0.012 + (n % 4) * 0.024
    m.y += (Math.floor(n / 4) % 3) * 0.024 - 0.024
  }

  // Dated marks: nudge coincident ones apart within their band.
  const seen = new Map<string, number>()
  for (const m of marks.filter((x) => x.dated)) {
    const key = `${Math.round(m.x * 70)}:${Math.round(m.y * 100)}`
    const n = seen.get(key) ?? 0
    seen.set(key, n + 1)
    m.y += (n % 4) * 0.024 - 0.036
  }

  return { marks, from: new Date(lo), to: new Date(hi), years, undated: un.length }
}

/**
 * `year` may carry a fractional part — Board.tsx computes one deliberately
 * so a headline lands within its year rather than always at 1 January, which
 * is the whole point of aligning it by month. `new Date(year, 0, 1)`
 * truncates a non-integer year argument (`new Date(2026.5, 0, 1)` is
 * `2026-01-01`, not halfway through 2026), which silently discarded that
 * precision and stacked every headline in a year at the same x. Interpolate
 * between the year's start and the next year's start instead.
 */
export function yearFraction(year: number, from: Date, to: Date): number {
  const y0 = Math.floor(year)
  const frac = year - y0
  const start = new Date(y0, 0, 1).getTime()
  const end = new Date(y0 + 1, 0, 1).getTime()
  const t = start + (end - start) * frac
  return GUTTER + ((t - from.getTime()) / (to.getTime() - from.getTime())) * (1 - GUTTER)
}
