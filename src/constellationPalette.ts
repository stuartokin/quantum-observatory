import { CONSTELLATIONS } from './renderers/board/tower'

/**
 * A hue per constellation, spread across a deliberately narrow arc.
 *
 * The temptation with nine categories is nine unrelated colours, which turns a
 * sky into a pie chart. Instead the arc runs from blue-violet to magenta —
 * wide enough that two adjacent constellations are plainly different, narrow
 * enough that the board still reads as one galaxy with one identity.
 *
 * Saturation and lightness are held constant so no category shouts louder than
 * another. Importance is carried by size and brightness, never by hue.
 */

const ARC_START = 214
const ARC_END = 326

const HUES: Record<string, number> = Object.fromEntries(
  (CONSTELLATIONS as readonly string[]).map((c: string, i: number) => [
    c,
    ARC_START + (i / Math.max(1, CONSTELLATIONS.length - 1)) * (ARC_END - ARC_START),
  ]),
)

export function constellationHue(id?: string): number {
  return HUES[id ?? ''] ?? 268
}

export function constellationColour(id?: string, alpha = 1): string {
  const h = constellationHue(id)
  return alpha >= 1 ? `hsl(${h} 88% 72%)` : `hsl(${h} 88% 72% / ${alpha})`
}

/** Dimmer variant for unsourced bodies, which should read as cold. */
export function constellationMuted(id?: string, alpha = 1): string {
  const h = constellationHue(id)
  return alpha >= 1 ? `hsl(${h} 22% 62%)` : `hsl(${h} 22% 62% / ${alpha})`
}

export const CONSTELLATION_COLOURS = Object.fromEntries(
  (CONSTELLATIONS as readonly string[]).map((c: string) => [c, constellationColour(c)]),
) as Record<string, string>
