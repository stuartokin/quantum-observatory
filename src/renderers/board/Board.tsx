import { useEffect, useMemo, useRef, useState } from 'react'
import { allFrontier } from '../../content/frontier'
import type { FrontierItem, Readiness } from '../../content/frontierTypes'
import { PILLAR_SPECTRUM } from '../../worlds/types'
import {
  LEVELS,
  CONSTELLATIONS,
  CONSTELLATION_LABEL,
  layout,
  isSourced,
  glyphFor,
  type Node,
  type Glyph,
} from './tower'
import scales from '../../../content/frontier/_scales.json'
import { VERSION } from '../../version'
import { Frame, type FrameState } from '../../components/Frame'

/**
 * THE READINESS TOWER.
 *
 * x = constellation, y = readiness. Canvas 2D with a pan/zoom transform.
 *
 * Two rules that keep it honest:
 *   - Only the transform and the attention pulse change between frames.
 *     Everything else — positions, labels, links — is computed once. Recomputing
 *     label collisions per frame is what made the earlier board judder.
 *   - Unsourced items are hollow. Visible, because the shape of the field
 *     should be honest; hollow, because they are not claims.
 */

const PILLAR: FrontierItem['pillar'] = 'quantum'
type Scale = { label: string; levels: Record<Readiness, string> }
const SCALES = scales as unknown as Record<string, Scale | undefined>

type Offsets = Record<string, { dx: number; dy: number }>

export function Board() {
  const colour = PILLAR_SPECTRUM[PILLAR].colour

  const [selected, setSelected] = useState<string | null>(null)
  const [offsets, setOffsets] = useState<Offsets>({})
  const [view, setView] = useState({ k: 1, tx: 0, ty: 0 })

  const [cons, setCons] = useState<string[]>([...CONSTELLATIONS])
  const [levels, setLevels] = useState<Readiness[]>([...LEVELS])
  const [actorFilter, setActorFilter] = useState<string | null>(null)
  const [sourcedOnly, setSourcedOnly] = useState(false)

  const [frames, setFrames] = useState<Record<string, FrameState>>({
    filters: { x: 16, y: 96, w: 250, h: 400 },
    actors: { x: 16, y: 512, w: 250, h: 220 },
    detail: { x: 0, y: 0, w: 380, h: 460, hidden: true },
  })
  const setFrame = (k: string) => (s: FrameState) =>
    setFrames((f) => ({ ...f, [k]: s }))

  const pool = useMemo(
    () => allFrontier.filter((i) => i.pillar === PILLAR && i.status !== 'archived'),
    [],
  )

  const actors = useMemo(() => {
    const m = new Map<string, number>()
    for (const i of pool) for (const a of i.actors ?? []) m.set(a, (m.get(a) ?? 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1])
  }, [pool])

  const visible = useMemo(
    () =>
      pool.filter(
        (i) =>
          cons.includes(i.constellation ?? '') &&
          levels.includes(i.readiness) &&
          (!actorFilter || (i.actors ?? []).includes(actorFilter)) &&
          (!sourcedOnly || isSourced(i)),
      ),
    [pool, cons, levels, actorFilter, sourcedOnly],
  )

  const nodes = useMemo(
    () => layout(visible, { constellations: CONSTELLATIONS, offsets }),
    [visible, offsets],
  )

  const item = selected ? pool.find((i) => i.id === selected) ?? null : null

  useEffect(() => {
    if (item) {
      setFrames((f) => ({
        ...f,
        detail: {
          ...f.detail,
          hidden: false,
          x: f.detail.x || Math.max(16, window.innerWidth - 400),
          y: f.detail.y || 96,
        },
      }))
    }
  }, [item])

  const moved = useMemo(
    () => visible.filter((i) => i.moved?.on).length,
    [visible],
  )

  return (
    <main className="board">
      <header className="board-head">
        <div className="board-title">
          <span className="label">Horizon Q · quantum galaxy</span>
          <h2>The frontier, by how close it is to real</h2>
        </div>
        <div className="board-stats">
          <span>
            <b>{visible.length}</b> of {pool.length} shown
          </span>
          <span>
            <b>{visible.filter(isSourced).length}</b> sourced
          </span>
          {moved > 0 && <span className="board-stats__move"><b>{moved}</b> moved recently</span>}
        </div>
      </header>

      <Tower
        nodes={nodes}
        colour={colour}
        selected={selected}
        onSelect={setSelected}
        view={view}
        setView={setView}
        offsets={offsets}
        setOffsets={setOffsets}
        activeCons={cons}
      />

      <Frame title="Filters" state={frames.filters} onChange={setFrame('filters')} accent={colour}>
        <fieldset>
          <legend>Constellations</legend>
          {CONSTELLATIONS.map((c) => (
            <label key={c}>
              <input
                type="checkbox"
                checked={cons.includes(c)}
                onChange={() =>
                  setCons((v) => (v.includes(c) ? v.filter((x) => x !== c) : [...v, c]))
                }
              />
              {CONSTELLATION_LABEL[c]}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Readiness</legend>
          {LEVELS.map((l) => (
            <label key={l}>
              <input
                type="checkbox"
                checked={levels.includes(l)}
                onChange={() =>
                  setLevels((v) => (v.includes(l) ? v.filter((x) => x !== l) : [...v, l]))
                }
              />
              {l}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Evidence</legend>
          <label>
            <input
              type="checkbox"
              checked={sourcedOnly}
              onChange={() => setSourcedOnly((v) => !v)}
            />
            Sourced only
          </label>
        </fieldset>
        <button className="frame__reset" onClick={() => setView({ k: 1, tx: 0, ty: 0 })}>
          Reset view
        </button>
      </Frame>

      <Frame title="Actors" state={frames.actors} onChange={setFrame('actors')} accent={colour}>
        <ul className="actor-list">
          {actors.map(([a, n]) => (
            <li key={a}>
              <button
                aria-pressed={actorFilter === a}
                onClick={() => setActorFilter(actorFilter === a ? null : a)}
              >
                <GlyphMark glyph={glyphFor(a)} colour={colour} />
                <span>{a}</span>
                <em>{n}</em>
              </button>
            </li>
          ))}
          {actors.length === 0 && <li className="label">No actors recorded yet.</li>}
        </ul>
      </Frame>

      {item && (
        <Frame
          title="Detail"
          state={frames.detail}
          onChange={setFrame('detail')}
          onClose={() => setSelected(null)}
          accent={colour}
        >
          <Detail item={item} definition={SCALES[item.pillar]?.levels[item.readiness]} />
        </Frame>
      )}

      <p className="board-foot">
        Filled glyphs carry a verified primary source; hollow ones are topics with
        no source yet. Scroll to zoom, drag to pan, drag a constellation name to
        move it. <span className="version">v{VERSION}</span>
      </p>
    </main>
  )
}

/* ---------------------------------------------------------------- */

function GlyphMark({ glyph, colour }: { glyph: Glyph; colour: string }) {
  return (
    <svg width="12" height="12" viewBox="-6 -6 12 12" aria-hidden="true">
      <g fill="none" stroke={colour} strokeWidth="1.4">
        {glyph === 'circle' && <circle r="4" />}
        {glyph === 'square' && <rect x="-3.6" y="-3.6" width="7.2" height="7.2" />}
        {glyph === 'triangle' && <polygon points="0,-4.4 4,3 -4,3" />}
        {glyph === 'diamond' && <polygon points="0,-4.6 4.2,0 0,4.6 -4.2,0" />}
        {glyph === 'pentagon' && <polygon points="0,-4.4 4.2,-1.4 2.6,3.6 -2.6,3.6 -4.2,-1.4" />}
        {glyph === 'hexagon' && <polygon points="4.2,0 2.1,3.6 -2.1,3.6 -4.2,0 -2.1,-3.6 2.1,-3.6" />}
        {glyph === 'cross' && <path d="M-4,-4 L4,4 M4,-4 L-4,4" />}
      </g>
    </svg>
  )
}

function drawGlyph(g: CanvasRenderingContext2D, glyph: Glyph, x: number, y: number, r: number) {
  g.beginPath()
  const poly = (n: number, rot = -Math.PI / 2) => {
    for (let i = 0; i < n; i++) {
      const a = rot + (i * 2 * Math.PI) / n
      const px = x + Math.cos(a) * r
      const py = y + Math.sin(a) * r
      i === 0 ? g.moveTo(px, py) : g.lineTo(px, py)
    }
    g.closePath()
  }
  switch (glyph) {
    case 'circle': g.arc(x, y, r, 0, Math.PI * 2); break
    case 'square': g.rect(x - r * 0.85, y - r * 0.85, r * 1.7, r * 1.7); break
    case 'triangle': poly(3); break
    case 'diamond': poly(4); break
    case 'pentagon': poly(5); break
    case 'hexagon': poly(6, 0); break
    case 'cross':
      g.moveTo(x - r, y - r); g.lineTo(x + r, y + r)
      g.moveTo(x + r, y - r); g.lineTo(x - r, y + r)
      break
  }
}

function Tower({
  nodes,
  colour,
  selected,
  onSelect,
  view,
  setView,
  offsets,
  setOffsets,
  activeCons,
}: {
  nodes: Node[]
  colour: string
  selected: string | null
  onSelect: (id: string | null) => void
  view: { k: number; tx: number; ty: number }
  setView: (v: { k: number; tx: number; ty: number }) => void
  offsets: Offsets
  setOffsets: (o: Offsets) => void
  activeCons: string[]
  }) {
  const cv = useRef<HTMLCanvasElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const drag = useRef<
    | { kind: 'pan'; x: number; y: number; tx: number; ty: number }
    | { kind: 'con'; con: string; x: number; y: number; dx: number; dy: number }
    | null
  >(null)
  const pinch = useRef<{ d: number; k: number } | null>(null)

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes])
  const links = useMemo(() => {
    const out: { a: Node; b: Node; cross: boolean }[] = []
    for (const it of allFrontier) {
      const a = byId.get(it.id)
      if (!a) continue
      for (const l of it.links ?? []) {
        const b = byId.get(l.to)
        if (b && a.id < b.id) out.push({ a, b, cross: a.constellation !== b.constellation })
      }
    }
    return out
  }, [byId])

  useEffect(() => {
    if (!wrap.current) return
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height }),
    )
    ro.observe(wrap.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const c = cv.current
    if (!c || size.w < 10 || size.h < 10) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = Math.round(size.w * dpr)
    c.height = Math.round(size.h * dpr)
    const g = c.getContext('2d')!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const PAD = 108
    const W = size.w
    const H = size.h
    const X = (x: number) => PAD + (x * (W - PAD - 16) + view.tx) * view.k
    const Y = (y: number) => 8 + (y * (H - 40) + view.ty) * view.k

    let raf = 0
    const t0 = performance.now()

    const draw = (now: number) => {
      const t = (now - t0) / 1000
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.clearRect(0, 0, W, H)

      // Readiness bands
      g.font = '10px ui-monospace, monospace'
      LEVELS.forEach((lvl, i) => {
        const y = Y(i / LEVELS.length)
        g.strokeStyle = 'rgba(255,255,255,0.06)'
        g.beginPath()
        g.moveTo(0, y)
        g.lineTo(W, y)
        g.stroke()
        g.fillStyle = 'rgba(134,151,176,0.9)'
        g.fillText(lvl.toUpperCase(), 8, y + 14)
      })

      // Constellation lanes and draggable names
      const laneW = 1 / CONSTELLATIONS.length
      CONSTELLATIONS.forEach((c, i) => {
        if (!activeCons.includes(c)) return
        const off = offsets[c] ?? { dx: 0, dy: 0 }
        const cx = X((i + 0.5) * laneW + off.dx)
        g.strokeStyle = 'rgba(255,255,255,0.035)'
        g.beginPath()
        g.moveTo(X(i * laneW + off.dx), 0)
        g.lineTo(X(i * laneW + off.dx), H)
        g.stroke()
        g.fillStyle = colour
        g.globalAlpha = 0.75
        g.font = '10px ui-monospace, monospace'
        const label = CONSTELLATION_LABEL[c].toUpperCase()
        g.fillText(label, cx - g.measureText(label).width / 2, 18)
        g.globalAlpha = 1
      })

      // Links: solid within a constellation, dashed across
      for (const { a, b, cross } of links) {
        g.strokeStyle = colour
        g.globalAlpha = cross ? 0.16 : 0.28
        g.lineWidth = 1
        g.setLineDash(cross ? [3, 4] : [])
        g.beginPath()
        g.moveTo(X(a.x), Y(a.y))
        g.lineTo(X(b.x), Y(b.y))
        g.stroke()
      }
      g.setLineDash([])
      g.globalAlpha = 1

      // Nodes
      for (const n of nodes) {
        const px = X(n.x)
        const py = Y(n.y)
        const sel = selected === n.id
        const r = n.radius * Math.min(1.6, Math.max(0.8, view.k)) * (sel ? 1.5 : 1)

        // Attention: a slow expanding ring on new or recently moved items. The
        // board tells you where to look rather than daring you to guess.
        if (n.attention > 0.02 && !reduced) {
          const phase = (t * 0.5 + n.x * 3) % 1
          g.globalAlpha = (1 - phase) * 0.5 * n.attention
          g.strokeStyle = colour
          g.lineWidth = 1.4
          g.beginPath()
          g.arc(px, py, r + phase * 22, 0, Math.PI * 2)
          g.stroke()
        }

        g.lineWidth = 1.4
        if (n.sourced) {
          g.globalAlpha = 0.45 + n.weight * 0.5
          g.fillStyle = colour
          drawGlyph(g, n.glyph, px, py, r)
          n.glyph === 'cross' ? g.stroke() : g.fill()
        } else {
          g.globalAlpha = 0.45
          g.strokeStyle = colour
          drawGlyph(g, n.glyph, px, py, r)
          g.stroke()
        }

        if (sel) {
          g.globalAlpha = 1
          g.strokeStyle = colour
          g.beginPath()
          g.arc(px, py, r + 9, 0, Math.PI * 2)
          g.stroke()
        }

        // Labels: precomputed offsets, so nothing jumps between frames.
        if (view.k > 0.85 || sel || n.attention > 0.3) {
          g.globalAlpha = sel ? 1 : n.sourced ? 0.82 : 0.42
          g.fillStyle = n.sourced ? '#E6EDF7' : '#8697B0'
          g.fillText(n.sourced ? n.label : n.label + '  ·  UNSOURCED', X(n.lx), Y(n.ly))
        }
      }
      g.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [size, nodes, links, colour, selected, view, offsets, activeCons])

  /* ---- interaction ---- */

  const toWorld = (cx: number, cy: number) => {
    const r = cv.current!.getBoundingClientRect()
    const PAD = 108
    return {
      x: ((cx - r.left - PAD) / view.k - view.tx) / (r.width - PAD - 16),
      y: ((cy - r.top - 8) / view.k - view.ty) / (r.height - 40),
    }
  }

  function onWheel(e: React.WheelEvent) {
    const k = Math.min(4, Math.max(0.6, view.k * (e.deltaY < 0 ? 1.12 : 0.89)))
    setView({ ...view, k })
  }

  function onPointerDown(e: React.PointerEvent) {
    const r = cv.current!.getBoundingClientRect()
    // Dragging a constellation name moves that constellation.
    if (e.clientY - r.top < 26) {
      const w = toWorld(e.clientX, e.clientY)
      const idx = Math.floor(w.x * CONSTELLATIONS.length)
      const con = CONSTELLATIONS[Math.max(0, Math.min(CONSTELLATIONS.length - 1, idx))]
      const off = offsets[con] ?? { dx: 0, dy: 0 }
      drag.current = { kind: 'con', con, x: e.clientX, y: e.clientY, dx: off.dx, dy: off.dy }
    } else {
      drag.current = { kind: 'pan', x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty }
    }
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current
    if (!d) return
    const r = cv.current!.getBoundingClientRect()
    if (d.kind === 'pan') {
      setView({ ...view, tx: d.tx + (e.clientX - d.x) / view.k, ty: d.ty + (e.clientY - d.y) / view.k })
    } else {
      setOffsets({
        ...offsets,
        [d.con]: {
          dx: d.dx + (e.clientX - d.x) / view.k / (r.width - 124),
          dy: d.dy + (e.clientY - d.y) / view.k / (r.height - 40),
        },
      })
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    const d = drag.current
    drag.current = null
    if (!d) return
    const movedFar = Math.hypot(e.clientX - d.x, e.clientY - d.y) > 4
    if (movedFar || d.kind === 'con') return

    const w = toWorld(e.clientX, e.clientY)
    let best: { id: string; d: number } | null = null
    for (const n of nodes) {
      const dd = Math.hypot(n.x - w.x, (n.y - w.y) * 0.6)
      if (!best || dd < best.d) best = { id: n.id, d: dd }
    }
    onSelect(best && best.d < 0.03 ? best.id : null)
  }

  function onTouchMove(e: React.TouchEvent) {
    if (e.touches.length !== 2) return
    const [a, b] = [e.touches[0], e.touches[1]]
    const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
    if (!pinch.current) {
      pinch.current = { d, k: view.k }
      return
    }
    setView({ ...view, k: Math.min(4, Math.max(0.6, (pinch.current.k * d) / pinch.current.d)) })
  }

  return (
    <div className="tower" ref={wrap}>
      <canvas
        ref={cv}
        style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onTouchMove={onTouchMove}
        onTouchEnd={() => (pinch.current = null)}
      />
    </div>
  )
}

/* ---------------------------------------------------------------- */

function Detail({ item, definition }: { item: FrontierItem; definition?: string }) {
  const colour = PILLAR_SPECTRUM[item.pillar].colour
  const needsSource = item.evidence.claim.startsWith('NEEDS PRIMARY SOURCE')

  return (
    <div className="detail">
      <div className="meta">
        <span className="badge" style={{ color: colour, borderColor: colour }}>
          {item.readiness}
        </span>
        <span className="badge">{item.constellation}</span>
        {needsSource ? (
          <span className="badge" data-conf="low">unsourced</span>
        ) : (
          <span className="badge" data-conf={item.confidence}>confidence {item.confidence}</span>
        )}
      </div>

      <h3>{item.title}</h3>
      {item.summary && <p>{item.summary}</p>}
      {definition && (
        <p className="readiness-def">
          <strong>{item.readiness}</strong> in this field means: {definition}
        </p>
      )}

      {item.metrics && item.metrics.length > 0 && (
        <dl className="metrics">
          {item.metrics.map((m) => (
            <div key={m.name}>
              <dt>{m.name}</dt>
              <dd>
                {m.value}
                {m.unit ?? ''}
                {m.note && <em> — {m.note}</em>}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {item.actors && item.actors.length > 0 && (
        <p className="actors">
          <span className="label">Demonstrated by</span> {item.actors.join(' · ')}
        </p>
      )}

      <div className="evidence">
        <span className="label">Evidence</span>
        {needsSource ? (
          <p className="evidence--missing">
            No primary source yet. This topic sits on the board so the shape of the
            field is honest, but nothing is claimed about its readiness.
          </p>
        ) : (
          <>
            <p>{item.evidence.claim}</p>
            {item.evidence.sources.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">
                <span className="src-role">{s.role}</span>
                {s.identifier ?? s.title ?? new URL(s.url).hostname}
              </a>
            ))}
            <span className="label">Verified {item.evidence.verified}</span>
          </>
        )}
      </div>
    </div>
  )
}
