import type { FrontierItem, Readiness } from '../../content/frontierTypes'

/**
 * TOWER LAYOUT
 *
 * x = constellation lane, spread across the full width.
 * y = readiness, top to bottom. New things arrive at the top and settle.
 *
 * No funnel: the width is used for structure (which constellation) rather than
 * for decoration (how speculative). Readiness is already carried by y — having
 * it narrow the x axis too was pretty and redundant.
 *
 * Pure and deterministic. Same input, same sky, every build.
 */

export const LEVELS: Readiness[] = [
  'emerging',
  'experimental',
  'demonstrated',
  'adopted',
  'mainstream',
]

export const CONSTELLATIONS = [
  'architectures',
  'error-correction',
  'algorithms',
  'enabling',
  'applications',
  'pqc',
  'migration',
  'communications',
  'sensing',
] as const

export const CONSTELLATION_LABEL: Record<string, string> = {
  architectures: 'Architectures',
  'error-correction': 'Error correction',
  algorithms: 'Algorithms',
  enabling: 'Enabling stack',
  pqc: 'PQC algorithms',
  migration: 'Migration',
  communications: 'Communications',
  sensing: 'Sensing',
}

/**
 * Actor glyphs, drawn from the sky rather than from a shape palette. A form
 * per organisation, so influence is readable without a legend lookup.
 */
export const GLYPHS = [
  'star',      // classic five-point
  'ringed',    // a disc with a ring
  'binary',    // two bodies
  'nova',      // burst of rays
  'crescent',
  'cluster',   // three small bodies
  'comet',     // body with a tail
  'pulsar',    // body with concentric rings
] as const
export type Glyph = (typeof GLYPHS)[number]

export interface Node {
  id: string
  x: number
  y: number
  /** Readiness band index. Orbit rings are keyed on this. */
  level: number
  radius: number
  weight: number
  glyph: Glyph
  actor?: string
  constellation: string
  sourced: boolean
  /** 0–1. Drives the attention pulse. New or recently moved items only. */
  attention: number
  /** Label offset in world units, computed once so labels never jitter. */
  lx: number
  ly: number
  /** Higher wins the space when labels compete. */
  rank: number
  /** Deterministic phase so ambient drift is smooth but not synchronised. */
  phase: number
  label: string
}

export function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 100000) / 100000
}

export function glyphFor(actor?: string): Glyph {
  if (!actor) return 'star'
  return GLYPHS[Math.floor(hash(actor) * GLYPHS.length)]
}

export const isSourced = (i: FrontierItem) =>
  i.status === 'published' && !i.evidence.claim.startsWith('NEEDS PRIMARY SOURCE')

/**
 * Attention must be EARNED. The first version gave it to anything recently
 * added, which meant all 56 items pulsed at once — the same as nothing pulsing.
 *
 * Only two things earn it: a change of readiness level, or an agent proposal
 * you have not yet acknowledged.
 */
function attentionFor(i: FrontierItem, now: Date): number {
  const days = (d?: string) =>
    d ? (now.getTime() - new Date(d).getTime()) / 86_400_000 : Infinity
  if (i.moved?.on) return Math.max(0, 1 - days(i.moved.on) / 90)
  if (i.origin === 'agent') return Math.max(0, 1 - days(i.added) / 30)
  return 0
}

export interface LayoutOpts {
  /** Kept for callers that pass the active set; positions come from
   *  CONSTELLATION_HOME, so layout no longer reads it. */
  constellations?: readonly string[]
  offsets?: Record<string, { dx: number; dy: number }>
  now?: Date
}

/** Where each constellation sits. Organic positions, not a rigid grid — a
 *  spreadsheet of columns is what made the first version read as a chart. */
export const CONSTELLATION_HOME: Record<string, number> = {
  architectures: 0.10,
  'error-correction': 0.235,
  enabling: 0.365,
  algorithms: 0.49,
  pqc: 0.625,
  migration: 0.745,
  communications: 0.865,
  sensing: 0.965,
}

export function layout(items: FrontierItem[], opts: LayoutOpts): Node[] {
  const offsets = opts.offsets ?? {}
  const now = opts.now ?? new Date()

  const nodes: Node[] = items.map((item) => {
    const con = item.constellation ?? ''
    const level = Math.max(0, LEVELS.indexOf(item.readiness))
    const off = offsets[con] ?? { dx: 0, dy: 0 }

    // Scatter on a disc around the constellation's home, so members form a
    // shape rather than a column. Deterministic per id.
    const a = hash(item.id + 'a') * Math.PI * 2
    const rad = Math.sqrt(hash(item.id + 'r')) * 0.052
    const home = CONSTELLATION_HOME[con] ?? 0.5
    const x = home + Math.cos(a) * rad + off.dx
    const y = (level + 0.28 + Math.sin(a) * rad * 2.4 + hash(item.id + 'y') * 0.44) / LEVELS.length + off.dy

    const sourced = isSourced(item)
    const weight =
      item.confidence === 'high' ? 1 : item.confidence === 'medium' ? 0.65 : 0.35

    return {
      id: item.id,
      x,
      y,
      level,
      radius: 5.5 + weight * 6.5,
      weight,
      glyph: glyphFor(item.actors?.[0]),
      actor: item.actors?.[0],
      constellation: item.constellation ?? '',
      sourced,
      attention: attentionFor(item, now),
      lx: 0,
      ly: 0,
      rank: 0,
      phase: hash(item.id + 'p') * Math.PI * 2,
      label: item.title.length > 34 ? item.title.slice(0, 33) + '…' : item.title,
    }
  })

  // Separate overlapping nodes. Stays within the readiness band, because
  // readiness is data — the jitter is not allowed to change what is claimed.
  const MIN = 0.016
  for (let pass = 0; pass < 60; pass++) {
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const p = nodes[a]
        const q = nodes[b]
        let dx = q.x - p.x
        let dy = (q.y - p.y) * 1.6 // vertical space is scarcer
        let d = Math.hypot(dx, dy)
        if (d >= MIN) continue
        if (d < 1e-6) {
          dx = hash(p.id + q.id) - 0.5 || 0.001
          d = Math.abs(dx)
        }
        const push = (MIN - d) / 2 / d
        p.x -= dx * push
        q.x += dx * push
        p.y -= dy * push * 0.25
        q.y += dy * push * 0.25
      }
    }
  }

  // Label placement, computed ONCE. Recomputing per frame is what made the
  // earlier board judder — labels leapt between collision slots as points drifted.
  // Rank decides which labels survive at low zoom. Sourced and moving items
  // earn a label; unsourced ones are glyphs until you zoom or hover.
  for (const n of nodes) {
    n.rank = (n.sourced ? 2 : 0) + (n.attention > 0.1 ? 2 : 0) + n.weight
  }

  const placed: { x: number; y: number; w: number }[] = []
  const CH = 0.0052 // approximate world width of one character
  const LH = 0.019
  for (const n of [...nodes].sort((a, b) => b.rank - a.rank || a.y - b.y)) {
    const w = n.label.length * CH + (n.sourced ? 0 : 0.06)
    let lx = n.x + 0.012
    if (lx + w > 0.995) lx = n.x - 0.012 - w
    lx = Math.max(0.005, Math.min(1 - w - 0.005, lx))
    let ly = n.y + 0.004
    let guard = 0
    while (
      guard++ < 30 &&
      placed.some(
        (o) => Math.abs(o.y - ly) < LH && !(lx + w < o.x - 0.004 || lx > o.x + o.w + 0.004),
      )
    ) {
      ly += LH
    }
    placed.push({ x: lx, y: ly, w })
    n.lx = lx
    n.ly = ly
  }

  return nodes
}

export function census(items: FrontierItem[]): Record<Readiness, number> {
  const out = Object.fromEntries(LEVELS.map((l) => [l, 0])) as Record<Readiness, number>
  for (const i of items) out[i.readiness]++
  return out
}
