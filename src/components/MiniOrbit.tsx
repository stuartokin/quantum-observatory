import { useEffect, useMemo, useRef } from 'react'
import { allFrontier } from '../content/frontier'
import type { FrontierItem } from '../content/frontierTypes'
import { LEVELS } from '../renderers/board/tower'
import { drawBody } from '../renderers/board/glyphs'
import { DEFAULT_CAMERA, project, ringPosition } from '../renderers/board/orbit3d'
import type { NewsEntry } from '../renderers/board/news'

/**
 * A small, live, rotating view of whichever constellation has changed most.
 *
 * Not a thumbnail and not a chart: the same orbital geometry as the main view,
 * turning slowly, so the panel reads as a window onto the same sky rather than
 * a summary of it. Clicking opens that constellation full size.
 */
export function MiniOrbit({
  constellation,
  colour,
  highlight,
  onOpen,
}: {
  constellation: string
  colour: string
  /** Ids to draw brighter — the things that actually changed. */
  highlight: Set<string>
  onOpen: () => void
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const wrap = useRef<HTMLDivElement>(null)

  const members = useMemo(
    () =>
      allFrontier.filter(
        (i) => i.constellation === constellation && i.status !== 'archived',
      ),
    [constellation],
  )

  const rings = useMemo(() => {
    const byLevel = new Map<number, FrontierItem[]>()
    for (const m of members) {
      const lvl = Math.max(0, LEVELS.indexOf(m.readiness))
      if (!byLevel.has(lvl)) byLevel.set(lvl, [])
      byLevel.get(lvl)!.push(m)
    }
    const out: { id: string; angle: number; radius: number; lift: number; sourced: boolean }[] = []
    for (const [lvl, group] of byLevel) {
      const radius = 0.3 + (lvl / (LEVELS.length - 1)) * 1.0
      group.forEach((m, i) => {
        out.push({
          id: m.id,
          angle: (i / group.length) * Math.PI * 2 + lvl * 0.6,
          radius,
          lift: (lvl - (LEVELS.length - 1) / 2) * 0.06,
          sourced:
            m.status === 'published' && !m.evidence.claim.startsWith('NEEDS PRIMARY SOURCE'),
        })
      })
    }
    return out
  }, [members])

  useEffect(() => {
    const cv = ref.current
    const box = wrap.current
    if (!cv || !box) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let yaw = 0
    let last = performance.now()

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!reduced) yaw += 0.12 * dt

      const r = box.getBoundingClientRect()
      const W = Math.max(80, r.width)
      const H = Math.max(80, r.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
        cv.width = Math.round(W * dpr)
        cv.height = Math.round(H * dpr)
      }
      const g = cv.getContext('2d')!
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.clearRect(0, 0, W, H)

      const cam = { ...DEFAULT_CAMERA, yaw, dist: 3.1 }
      const X = (x: number) => x * W
      const Y = (y: number) => y * H

      // Rings first, faintly, so the structure reads even at this size.
      g.strokeStyle = colour
      g.lineWidth = 1
      for (let i = 0; i < LEVELS.length; i++) {
        const radius = 0.3 + (i / (LEVELS.length - 1)) * 1.0
        g.globalAlpha = 0.09
        g.beginPath()
        for (let k = 0; k <= 60; k++) {
          const a = (k / 60) * Math.PI * 2
          const q = project(ringPosition(a, radius, 0), cam, 0.3)
          k === 0 ? g.moveTo(X(q.sx), Y(q.sy)) : g.lineTo(X(q.sx), Y(q.sy))
        }
        g.stroke()
      }

      // Bodies, painted back to front.
      const drawn = rings
        .map((n) => ({ n, q: project(ringPosition(n.angle, n.radius, n.lift), cam, 0.3) }))
        .sort((a, b) => b.q.depth - a.q.depth)

      for (const { n, q } of drawn) {
        const hot = highlight.has(n.id)
        const r = (hot ? 4.2 : 2.6) * Math.max(0.5, Math.min(1.5, q.scale))
        g.globalAlpha = (hot ? 1 : 0.45) * Math.max(0.35, Math.min(1, q.scale))
        g.shadowColor = colour
        g.shadowBlur = hot ? 12 : 4
        drawBody(g, hot ? 'star' : 'pulsar', X(q.sx), Y(q.sy), r, colour, n.sourced)
        g.shadowBlur = 0
      }
      g.globalAlpha = 1

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [rings, colour, highlight])

  return (
    <div className="mini" ref={wrap} onClick={onOpen} title="Open this constellation">
      <canvas ref={ref} />
      <span className="mini__label">{constellation.replace('-', ' ')}</span>
      <span className="mini__hint">Open →</span>
    </div>
  )
}

/** Which constellation deserves the panel: the one with the heaviest change. */
export function mostChanged(entries: NewsEntry[]): string | null {
  const weights = new Map<string, number>()
  for (const e of entries) {
    if (!e.constellation) continue
    weights.set(e.constellation, (weights.get(e.constellation) ?? 0) + e.weight)
  }
  const best = [...weights.entries()].sort((a, b) => b[1] - a[1])[0]
  return best ? best[0] : null
}
