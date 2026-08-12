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

const ARC_START = 205
const ARC_END = 335

const HUES: Record<string, number> = Object.fromEntries(
  (CONSTELLATIONS as readonly string[]).map((c: string, i: number) => [
    c,
    ARC_START + (i / Math.max(1, CONSTELLATIONS.length - 1)) * (ARC_END - ARC_START),
  ]),
)

export function constellationHue(id?: string): number {
  return HUES[id ?? ''] ?? 268
}

/**
 * Neighbouring hues are only about sixteen degrees apart, which is not much to
 * tell two adjacent lanes by. Alternating lightness along the arc doubles the
 * separation without leaving the family or implying a ranking.
 */
function lightnessFor(id?: string): number {
  const i = (CONSTELLATIONS as readonly string[]).indexOf(id ?? '')
  return i % 2 === 0 ? 74 : 63
}

export function constellationColour(id?: string, alpha = 1): string {
  const h = constellationHue(id)
  const l = lightnessFor(id)
  return alpha >= 1 ? `hsl(${h} 88% ${l}%)` : `hsl(${h} 88% ${l}% / ${alpha})`
}

/** Dimmer variant for unsourced bodies, which should read as cold. */
export function constellationMuted(id?: string, alpha = 1): string {
  const h = constellationHue(id)
  return alpha >= 1 ? `hsl(${h} 22% 62%)` : `hsl(${h} 22% 62% / ${alpha})`
}

export const CONSTELLATION_COLOURS = Object.fromEntries(
  (CONSTELLATIONS as readonly string[]).map((c: string) => [c, constellationColour(c)]),
) as Record<string, string>

/* ---------------------------------------------------------------- */

/**
 * SUPERGROUPS.
 *
 * Nine lanes is more than a reader can hold at a glance, and at low zoom the
 * names collide anyway. Five is legible, and the grouping is not arbitrary:
 *
 * Cryptography exists because PQC and migration are neither computing nor
 * applications — they are the response to the threat, and folding them into
 * either misdescribes them.
 */
export const SUPERGROUPS = [
  'computing',
  'cryptography',
  'communications',
  'sensing',
  'applications',
] as const
export type Supergroup = (typeof SUPERGROUPS)[number]

export const SUPERGROUP_LABEL: Record<Supergroup, string> = {
  computing: 'Computing',
  cryptography: 'Cryptography',
  communications: 'Communications',
  sensing: 'Sensing',
  applications: 'Applications',
}

const OF: Record<string, Supergroup> = {
  architectures: 'computing',
  'error-correction': 'computing',
  algorithms: 'computing',
  enabling: 'computing',
  pqc: 'cryptography',
  migration: 'cryptography',
  communications: 'communications',
  sensing: 'sensing',
  applications: 'applications',
}

export const supergroupOf = (constellation?: string): Supergroup =>
  OF[constellation ?? ''] ?? 'computing'

/**
 * A supergroup's colour is the middle of its members' hues, so it reads as the
 * family they belong to rather than as a sixth colour competing with them.
 */
export function supergroupColour(g: Supergroup, alpha = 1): string {
  const members = Object.entries(OF)
    .filter(([, s]) => s === g)
    .map(([c]) => constellationHue(c))
  const h = members.reduce((a, b) => a + b, 0) / (members.length || 1)
  return alpha >= 1 ? `hsl(${h} 84% 70%)` : `hsl(${h} 84% 70% / ${alpha})`
}

/** Where a supergroup sits on the horizontal axis: the mean of its members. */
export function supergroupHome(
  g: Supergroup,
  homeOf: (c: string) => number,
): number {
  const members = Object.entries(OF).filter(([, s]) => s === g).map(([c]) => c)
  return members.reduce((a, c) => a + homeOf(c), 0) / (members.length || 1)
}
