import type { Milestone } from './milestoneTypes'
import type { ContentRecord } from './collections'

/**
 * `let`, not `const` — content is fetched and hydrated once before React
 * mounts. See `store.ts`. Never derive from these at module scope.
 */
export let milestones: Milestone[] = []

export function hydrateMilestones(records: ContentRecord[]): void {
  milestones = records
    .map(({ path, attributes }) => {
      const m = attributes as unknown as Milestone
      if (!m?.id || !m.date || !m.source?.url) {
        console.warn('Skipping malformed milestone file:', path)
        return null
      }
      return m
    })
    .filter((m): m is Milestone => m !== null)
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** The next deadline that has not been met, for a jurisdiction. */
export const nextDeadline = (jurisdiction: string, now = new Date()): Milestone | undefined =>
  milestones.find(
    (m) =>
      m.jurisdiction === jurisdiction &&
      m.kind === 'deadline' &&
      m.status === 'upcoming' &&
      new Date(m.date).getTime() > now.getTime(),
  )
