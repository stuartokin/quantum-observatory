import type { FrontierItem, Confidence } from './frontierTypes'

const files = import.meta.glob('/content/frontier/*.md', {
  query: '?parsed',
  import: 'default',
  eager: true,
}) as Record<string, { attributes: Record<string, unknown>; body: string }>

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

export const allFrontier: FrontierItem[] = Object.entries(files)
  .map(([path, mod]) => {
    const item = mod.attributes as unknown as FrontierItem
    // A malformed file must not take the board down — name it and carry on.
    if (!item?.id || !item.evidence?.verified) {
      console.warn('Skipping malformed frontier file:', path)
      return null
    }
    return { ...item, confidence: decayed(item.confidence, item.evidence.verified) }
  })
  .filter((i): i is FrontierItem => i !== null)

export const frontier: FrontierItem[] = allFrontier.filter((i) => i.status === 'published')
export const frontierById = new Map(allFrontier.map((i) => [i.id, i]))
