import type { FrontierItem } from '../../content/frontierTypes'

/**
 * NEWS, DERIVED
 *
 * Not a separate content type. The board already records everything that would
 * go into a news feed — when an item moved readiness level, when it was first
 * sourced, when an agent published it, when its evidence was last verified. A
 * second store written by hand would drift out of step with the first within
 * weeks and quietly start lying.
 *
 * So: read the board, group by the week the change happened, and let the most
 * consequential change float to the top.
 */

export type NewsKind = 'moved' | 'sourced' | 'agent' | 'reviewed' | 'vetoed'

export interface NewsEntry {
  id: string
  title: string
  kind: NewsKind
  date: string
  /** One line, written for someone scanning rather than reading. */
  line: string
  constellation?: string
  /** 0–1. Drives ordering and whether it appears in the teaser. */
  weight: number
  readiness: string
  level?: string
  priority?: string
  qdayImpact?: number
}

export interface NewsWeek {
  /** Monday of the week, ISO. */
  start: string
  label: string
  entries: NewsEntry[]
}

const KIND_WEIGHT: Record<NewsKind, number> = {
  moved: 0.55,
  sourced: 0.3,
  agent: 0.2,
  reviewed: 0.05,
  vetoed: 0.5,
}

const PRIORITY_WEIGHT: Record<string, number> = { P0: 0.4, P1: 0.28, P2: 0.15, P3: 0.05, P4: 0 }

function mondayOf(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const day = (d.getUTCDay() + 6) % 7 // Monday = 0
  d.setUTCDate(d.getUTCDate() - day)
  return d.toISOString().slice(0, 10)
}

function weekLabel(startIso: string, now = new Date()): string {
  const start = new Date(startIso)
  const weeks = Math.floor((now.getTime() - start.getTime()) / 6.048e8)
  if (weeks <= 0) return 'This week'
  if (weeks === 1) return 'Last week'
  if (weeks < 5) return `${weeks} weeks ago`
  return start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

const isSourced = (i: FrontierItem) =>
  i.status === 'published' && !i.evidence.claim.startsWith('NEEDS PRIMARY SOURCE')

function entriesFor(item: FrontierItem): NewsEntry[] {
  const out: NewsEntry[] = []
  const base = {
    id: item.id,
    title: item.title,
    constellation: item.constellation,
    readiness: item.readiness,
    level: item.evidence?.level,
    priority: item.priority,
    qdayImpact: item.qdayImpact,
  }
  const boost =
    (PRIORITY_WEIGHT[item.priority ?? 'P3'] ?? 0) +
    (item.qdayImpact ? Math.abs(item.qdayImpact) * 0.1 : 0)

  // A readiness change is the most consequential thing that can happen here.
  if (item.moved?.on) {
    out.push({
      ...base,
      kind: 'moved',
      date: item.moved.on,
      line: `Moved from ${item.moved.from ?? 'unknown'} to ${item.readiness}`,
      weight: Math.min(1, KIND_WEIGHT.moved + boost),
    })
  }

  if (item.review?.state === 'vetoed' && item.review.on) {
    out.push({
      ...base,
      kind: 'vetoed',
      date: item.review.on,
      line: item.review.note ? `Vetoed — ${item.review.note}` : 'Vetoed and removed from the board',
      weight: Math.min(1, KIND_WEIGHT.vetoed + boost),
    })
  }

  // First evidence attached is a real event: a hollow body became a claim.
  if (isSourced(item) && item.evidence.verified) {
    const agentPublished = item.review?.state === 'agent-merged'
    out.push({
      ...base,
      kind: agentPublished ? 'agent' : 'sourced',
      date: item.review?.agentMergedOn ?? item.evidence.verified,
      line: agentPublished
        ? `Published by the ${item.review?.agent ?? 'research'} agent at ${item.evidence.level ?? 'unrated'} — not yet reviewed`
        : `Evidence attached at ${item.evidence.level ?? 'unrated'}`,
      weight: Math.min(1, (agentPublished ? KIND_WEIGHT.agent : KIND_WEIGHT.sourced) + boost),
    })
  }

  return out
}

export function buildNews(items: FrontierItem[], now = new Date()): NewsWeek[] {
  const all = items.flatMap(entriesFor).filter((e) => e.date)

  const byWeek = new Map<string, NewsEntry[]>()
  for (const e of all) {
    const wk = mondayOf(e.date)
    if (!wk) continue
    if (!byWeek.has(wk)) byWeek.set(wk, [])
    byWeek.get(wk)!.push(e)
  }

  return [...byWeek.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([start, entries]) => ({
      start,
      label: weekLabel(start, now),
      entries: entries.sort((a, b) => b.weight - a.weight || b.date.localeCompare(a.date)),
    }))
}

/**
 * What deserves interrupting someone for. Deliberately strict — a teaser that
 * shows everything shows nothing, and this is the panel meant to be glanced at
 * rather than read.
 */
export function headlines(weeks: NewsWeek[], limit = 6): NewsEntry[] {
  const recent = weeks.slice(0, 2).flatMap((w) => w.entries)
  return recent
    .filter((e) => e.kind === 'moved' || e.kind === 'vetoed' || e.weight >= 0.5)
    .slice(0, limit)
}
