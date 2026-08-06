import fm from 'front-matter'
import type { FrontierItem, Confidence } from './frontierTypes'

const files = import.meta.glob('/content/frontier/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function normalise(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (Array.isArray(value)) return value.map(normalise)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, normalise(v)]),
    )
  }
  return value
}

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
  .map(([path, raw]) => {
    try {
      const { attributes } = fm<Record<string, unknown>>(raw)
      const item = normalise(attributes) as FrontierItem
      if (!item?.id || !item.evidence?.verified) {
        console.warn('Skipping malformed frontier file:', path)
        return null
      }
      return { ...item, confidence: decayed(item.confidence, item.evidence.verified) }
    } catch (e) {
      // One bad file must not take the board down — name it and carry on.
      console.warn('Failed to parse frontier file:', path, e)
      return null
    }
  })
  .filter((i): i is FrontierItem => i !== null)

export const frontier: FrontierItem[] = allFrontier.filter((i) => i.status === 'published')
export const frontierById = new Map(allFrontier.map((i) => [i.id, i]))
