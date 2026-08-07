import type { FrontierItem } from '../../content/frontierTypes'
import { LEVELS } from './tower'

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

/** Fraction of the plot width reserved for undated items, on the left. */
export const GUTTER = 0.11

export function dateOf(item: FrontierItem): Date | null {
  const candidates: string[] = []
  for (const s of item.evidence?.sources ?? []) if (s.date) candidates.push(s.date)
  if (item.moved?.on) candidates.push(item.moved.on)
  if (!candidates.length) return null

  const parsed = candidates
    .map((d) => (/^\d{4}$/.test(d) ? new Date(`${d}-06-30`) : new Date(d)))
    .filter((d) => !isNaN(d.getTime()))
  if (!parsed.length) return null
  return new Date(Math.min(...parsed.map((d) => d.getTime())))
}

export interface Mark {
  id: string
  x: number
  y: number
  r: number
  dated: boolean
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
  const dates = items.map(dateOf)
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
    const level = Math.max(0, LEVELS.indexOf(item.readiness))
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

export function yearFraction(year: number, from: Date, to: Date): number {
  const t = new Date(year, 0, 1).getTime()
  return GUTTER + ((t - from.getTime()) / (to.getTime() - from.getTime())) * (1 - GUTTER)
}
