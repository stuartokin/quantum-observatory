import type { FrontierItem, Confidence } from './frontierTypes'
import type { ContentRecord } from './collections'

/**
 * CONFIDENCE DECAY.
 *
 * Ratings age whether or not anyone updates them. A 2024 assessment of error
 * correction genuinely is less trustworthy now, so the board says so rather
 * than pretending the last human to look is still right.
 *
 * Applied at read time, never written back — the file records what was
 * asserted, the board shows what it is now worth.
 */
export function decayed(stated: Confidence, verified: string, now = new Date()): Confidence {
  const months = (now.getTime() - new Date(verified).getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  if (months >= 12) return 'low'
  if (months >= 6) return stated === 'high' ? 'medium' : 'low'
  return stated
}

/**
 * `let`, not `const`, because content is fetched — see `store.ts` for the full
 * reasoning. These are live bindings: `hydrateFrontier` reassigns them once
 * before React mounts, and every importer sees the result. Deriving from them
 * at module scope anywhere would capture the empty array instead.
 */
export let allFrontier: FrontierItem[] = []
export let frontier: FrontierItem[] = []
export let frontierById: Map<string, FrontierItem> = new Map()

export function hydrateFrontier(records: ContentRecord[]): void {
  allFrontier = records
    .map(({ path, attributes }) => {
      const item = attributes as unknown as FrontierItem
      // A malformed file must not take the board down — name it and carry on.
      if (!item?.id || !item.evidence?.verified) {
        console.warn('Skipping malformed frontier file:', path)
        return null
      }
      return { ...item, confidence: decayed(item.confidence, item.evidence.verified) }
    })
    .filter((i): i is FrontierItem => i !== null)

  frontier = allFrontier.filter((i) => i.status === 'published')
  frontierById = new Map(allFrontier.map((i) => [i.id, i]))
}
