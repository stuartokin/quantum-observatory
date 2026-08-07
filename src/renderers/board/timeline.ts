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

  const pad = (now.getTime() - first.getTime()) * 0.06
  const lo = first.getTime() - pad
  const hi = now.getTime() + pad

  const years: number[] = []
  for (let y = new Date(lo).getFullYear(); y <= new Date(hi).getFullYear(); y++) years.push(y)

  const marks: Mark[] = items.map((item, i) => {
    const d = dates[i]
    const level = Math.max(0, LEVELS.indexOf(item.readiness))
    const weight = item.confidence === 'high' ? 1 : item.confidence === 'medium' ? 0.65 : 0.35
    const src = opts.sourced(item)
    return {
      id: item.id,
      x: d ? (d.getTime() - lo) / (hi - lo) : -1,
      y: (level + 0.5) / LEVELS.length,
      r: 3.5 + weight * 6 + (src ? 1.5 : 0),
      dated: d !== null,
      sourced: src,
      weight,
      attention: opts.attention(item),
      label: item.title.length > 34 ? item.title.slice(0, 33) + '…' : item.title,
      date: d,
    }
  })

  // Spread coincident marks within their band so they stay legible.
  const seen = new Map<string, number>()
  for (const m of marks) {
    const key = `${Math.round(m.x * 90)}:${m.y.toFixed(3)}`
    const n = seen.get(key) ?? 0
    seen.set(key, n + 1)
    m.y += (n % 5) * 0.021 - 0.042
  }

  // Undated marks share a gutter on the left.
  const un = marks.filter((m) => !m.dated)
  un.forEach((m, i) => {
    m.x = -0.055 - (i % 3) * 0.02
  })

  return { marks, from: new Date(lo), to: new Date(hi), years, undated: un.length }
}

export function yearFraction(year: number, from: Date, to: Date): number {
  const t = new Date(year, 0, 1).getTime()
  return (t - from.getTime()) / (to.getTime() - from.getTime())
}
