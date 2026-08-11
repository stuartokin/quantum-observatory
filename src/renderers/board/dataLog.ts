import type { FrontierItem } from '../../content/frontierTypes'
import type { NewsItem } from '../../content/newsTypes'

/**
 * WHAT CHANGED IN THE DATA, BY DATE.
 *
 * The version history says what changed in the software. This says what changed
 * in the content — which for a board whose whole claim is that it tracks a
 * moving field is the more important of the two.
 *
 * Derived, never authored. Every entry comes from a date already recorded on an
 * item, so it cannot disagree with what the board holds and cannot go stale
 * while somebody forgets to update it.
 */

export interface DataChange {
  date: string
  kind: 'added' | 'sourced' | 'moved' | 'checked' | 'reviewed' | 'vetoed' | 'headline'
  id: string
  title: string
  detail: string
  by: 'human' | 'agent'
  agent?: string
}

export interface DataDay {
  date: string
  changes: DataChange[]
}

const isSourced = (i: FrontierItem) =>
  i.status === 'published' && !i.evidence.claim.startsWith('NEEDS PRIMARY SOURCE')

export function buildDataLog(items: FrontierItem[], news: NewsItem[]): DataDay[] {
  const all: DataChange[] = []

  for (const i of items) {
    const rev = i.review
    const base = { id: i.id, title: i.title }

    if (i.added) {
      all.push({
        ...base,
        date: i.added,
        kind: 'added',
        detail: `Added to ${i.constellation}`,
        by: i.origin === 'agent' ? 'agent' : 'human',
        agent: rev?.agent,
      })
    }

    if (i.moved?.on) {
      all.push({
        ...base,
        date: i.moved.on,
        kind: 'moved',
        detail: `Readiness ${i.moved.from ?? 'unknown'} → ${i.readiness}`,
        by: rev?.state === 'reviewed' ? 'human' : 'agent',
        agent: rev?.agent,
      })
    }

    if (isSourced(i) && rev?.agentMergedOn) {
      all.push({
        ...base,
        date: rev.agentMergedOn,
        kind: 'sourced',
        detail: `Evidence attached at ${i.evidence?.level ?? 'unrated'}`,
        by: 'agent',
        agent: rev.agent,
      })
    }

    if (rev?.reviewedOn) {
      all.push({
        ...base,
        date: rev.reviewedOn,
        kind: 'checked',
        detail: rev.note ? 'Checked against its sources — corrected' : 'Checked against its sources',
        by: 'agent',
        agent: rev.agent ?? 'reviewer',
      })
    }

    if (rev?.state === 'reviewed' && rev.on) {
      all.push({
        ...base,
        date: rev.on,
        kind: 'reviewed',
        detail: 'Confirmed by a person',
        by: 'human',
      })
    }

    if (rev?.state === 'vetoed' && rev.on) {
      all.push({
        ...base,
        date: rev.on,
        kind: 'vetoed',
        detail: rev.note ?? 'Removed from the board',
        by: 'human',
      })
    }
  }

  for (const n of news) {
    all.push({
      id: n.id,
      title: n.headline,
      date: n.added ?? n.date,
      kind: 'headline',
      detail: `Headline recorded · ${n.validation?.status ?? 'unvalidated'}`,
      by: 'agent',
      agent: n.review?.agent ?? 'newsroom',
    })
  }

  const byDay = new Map<string, DataChange[]>()
  for (const c of all) {
    if (!c.date) continue
    if (!byDay.has(c.date)) byDay.set(c.date, [])
    byDay.get(c.date)!.push(c)
  }

  return [...byDay.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([date, changes]) => ({ date, changes }))
}

/** The most recent date anything changed. What "last updated" actually means. */
export function lastDataChange(log: DataDay[]): string | null {
  return log[0]?.date ?? null
}
