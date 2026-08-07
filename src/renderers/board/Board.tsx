import { useEffect, useMemo, useRef, useState } from 'react'
import { allFrontier } from '../../content/frontier'
import { items as articles } from '../../content/loader'
import type { FrontierItem, Readiness } from '../../content/frontierTypes'
import { PILLAR_SPECTRUM } from '../../palette'
import {
  LEVELS,
  CONSTELLATIONS,
  CONSTELLATION_LABEL,
  CONSTELLATION_HOME,
  layout,
  isSourced,
  glyphFor,
  type Node,
  type Glyph,
} from './tower'
import { drawBody, drawGlyph } from './glyphs'
import scales from '../../../content/frontier/_scales.json'
import { VERSION } from '../../version'
import { Frame, type FrameState } from '../../components/Frame'
import { Toolbar } from '../../components/Toolbar'

/** Galaxies. Only quantum has data; the rest are declared so the switch exists
 *  and the shape of the eventual map is honest. */
const GALAXIES: { id: FrontierItem['pillar']; label: string }[] = [
  { id: 'quantum', label: 'Quantum' },
  { id: 'cyber', label: 'Cyber' },
  { id: 'ai', label: 'AI' },
  { id: 'materials', label: 'Materials' },
  { id: 'energy', label: 'Energy' },
]
type Scale = { label: string; levels: Record<Readiness, string> }
const SCALES = scales as unknown as Record<string, Scale | undefined>
type Offsets = Record<string, { dx: number; dy: number }>
type Mode = 'tower' | 'orbit'

export function Board() {
  const [galaxy, setGalaxy] = useState<FrontierItem['pillar']>('quantum')
  const colour = PILLAR_SPECTRUM[galaxy].colour

  const [selected, setSelected] = useState<string | null>(null)
  const [view, setView] = useState({ k: 1, tx: 0, ty: 0 })
  const [mode, setMode] = useState<Mode>('tower')
  const [focusCon, setFocusCon] = useState<string | null>(null)

  const [cons, setCons] = useState<string[]>([...CONSTELLATIONS])
  const [levels, setLevels] = useState<Readiness[]>([...LEVELS])
  const [actorFilter, setActorFilter] = useState<string | null>(null)
  const [sourcedOnly, setSourcedOnly] = useState(false)

  // Windows start minimised — the board should be the first thing you see.
  const [frames, setFrames] = useState<Record<string, FrameState>>({
    filters: { x: 16, y: 90, w: 260, h: 430, docked: true },
    actors: { x: 292, y: 90, w: 260, h: 300, docked: true },
    help: { x: 60, y: 110, w: 460, h: 480, docked: true },
    detail: { x: 0, y: 0, w: 400, h: 470, docked: true },
  })
  const setFrame = (k: string) => (s: FrameState) => setFrames((f) => ({ ...f, [k]: s }))
  const dock = (k: string) => () => setFrames((f) => ({ ...f, [k]: { ...f[k], docked: true } }))
  const toggle = (k: string) => () =>
    setFrames((f) => ({ ...f, [k]: { ...f[k], docked: !f[k].docked } }))

  const [order, setOrder] = useState<string[]>(['filters', 'actors', 'help', 'detail'])
  const raise = (k: string) => () => setOrder((o) => [...o.filter((x) => x !== k), k])
  const zOf = (k: string) => 30 + order.indexOf(k)

  const pool = useMemo(
    () => allFrontier.filter((i) => i.pillar === galaxy && i.status !== 'archived'),
    [galaxy],
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

  const nodes = useMemo(() => layout(visible, { offsets: {} as Offsets }), [visible])
  const item = selected ? pool.find((i) => i.id === selected) ?? null : null
  const moved = useMemo(() => visible.filter((i) => i.moved?.on).length, [visible])

  useEffect(() => {
    if (item) {
      raise('detail')()
      setFrames((f) => ({
        ...f,
        detail: {
          ...f.detail,
          docked: false,
          x: f.detail.x || Math.max(16, window.innerWidth - 424),
          y: f.detail.y || 92,
        },
      }))
    }
  }, [item])

  function enterOrbit(con: string) {
    setFocusCon(con)
    setMode('orbit')
    setView({ k: 1, tx: 0, ty: 0 })
  }
  function leaveOrbit() {
    setMode('tower')
    setFocusCon(null)
    setView({ k: 1, tx: 0, ty: 0 })
  }

  const buttons = [
    ...(mode === 'orbit'
      ? [{ key: 'back', label: '← Galaxy', onClick: leaveOrbit }]
      : []),
    { key: 'filters', label: 'Filters', active: !frames.filters.docked, onClick: toggle('filters') },
    { key: 'actors', label: 'Actors', active: !frames.actors.docked, onClick: toggle('actors') },
    { key: 'help', label: 'Help', active: !frames.help.docked, onClick: toggle('help') },
    { key: 'reset', label: 'Reset', onClick: () => setView({ k: 1, tx: 0, ty: 0 }) },
  ]

  const allOn = cons.length === CONSTELLATIONS.length && levels.length === LEVELS.length

  return (
    <main className="board">
      <header className="board-head">
        <div className="board-title">
          <span className="wordmark">Horizon Q</span>
          <span className="board-title__sep">·</span>
          <select
            className="galaxy-picker"
            value={galaxy}
            onChange={(e) => {
              setGalaxy(e.target.value as FrontierItem['pillar'])
              leaveOrbit()
              setSelected(null)
            }}
            style={{ color: colour }}
            aria-label="Galaxy"
          >
            {GALAXIES.map((g) => {
              const n = allFrontier.filter((i) => i.pillar === g.id).length
              return (
                <option key={g.id} value={g.id} disabled={n === 0}>
                  {g.label}{n === 0 ? ' — empty' : ` (${n})`}
                </option>
              )
            })}
          </select>
          <span className="board-title__sep">·</span>
          <h2>
            {mode === 'orbit' && focusCon
              ? CONSTELLATION_LABEL[focusCon]
              : 'The frontier, by how close it is to real'}
          </h2>
        </div>
        <div className="board-stats">
          <span><b>{visible.length}</b> of {pool.length}</span>
          <span><b>{visible.filter(isSourced).length}</b> sourced</span>
          {moved > 0 && <span className="board-stats__move"><b>{moved}</b> moved</span>}
          <span className="board-stats__ver">v{VERSION}</span>
        </div>
      </header>

      <Sky
        nodes={nodes}
        colour={colour}
        selected={selected}
        onSelect={setSelected}
        view={view}
        setView={setView}
        activeCons={cons}
        mode={mode}
        focusCon={focusCon}
        onEnterOrbit={enterOrbit}
        onLeaveOrbit={leaveOrbit}
      />

      <Frame
        title="Filters"
        state={frames.filters}
        onChange={setFrame('filters')}
        onDock={dock('filters')}
        accent={colour}
        z={zOf('filters')}
        onFocus={raise('filters')}
      >
        <button
          className="frame__reset"
          onClick={() => {
            if (allOn) { setCons([]); setLevels([]) }
            else { setCons([...CONSTELLATIONS]); setLevels([...LEVELS]) }
          }}
        >
          {allOn ? 'Select none' : 'Select all'}
        </button>

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
            <input type="checkbox" checked={sourcedOnly} onChange={() => setSourcedOnly((v) => !v)} />
            Sourced only
          </label>
        </fieldset>
      </Frame>

      <Frame
        title="Actors"
        state={frames.actors}
        onChange={setFrame('actors')}
        onDock={dock('actors')}
        accent={colour}
        z={zOf('actors')}
        onFocus={raise('actors')}
      >
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

      <Frame
        title="Help"
        state={frames.help}
        onChange={setFrame('help')}
        onDock={dock('help')}
        accent={colour}
        z={zOf('help')}
        onFocus={raise('help')}
      >
        <Help colour={colour} />
      </Frame>

      {item && (
        <Frame
          title="Detail"
          state={frames.detail}
          onChange={setFrame('detail')}
          onDock={dock('detail')}
          onClose={() => setSelected(null)}
          accent={colour}
          z={zOf('detail')}
          onFocus={raise('detail')}
        >
          <Detail item={item} definition={SCALES[item.pillar]?.levels[item.readiness]} />
        </Frame>
      )}

      <Toolbar buttons={buttons} accent={colour} />
    </main>
  )
}

/* ---------------------------------------------------------------- */

function GlyphMark({ glyph, colour }: { glyph: Glyph; colour: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = 20 * dpr
    c.height = 20 * dpr
    const g = c.getContext('2d')!
    g.setTransform(dpr, 0, 0, dpr, 0, 0)
    g.lineWidth = 1.1
    drawGlyph(g, glyph, 10, 10, 5, colour)
  }, [glyph, colour])
  return <canvas ref={ref} style={{ width: 20, height: 20, flex: '0 0 auto' }} aria-hidden="true" />
}

/* ---------------------------------------------------------------- */

function Sky({
  nodes,
  colour,
  selected,
  onSelect,
  view,
  setView,
  activeCons,
  mode,
  focusCon,
  onEnterOrbit,
  onLeaveOrbit,
}: {
  nodes: Node[]
  colour: string
  selected: string | null
  onSelect: (id: string | null) => void
  view: { k: number; tx: number; ty: number }
  setView: (v: { k: number; tx: number; ty: number }) => void
  activeCons: string[]
  mode: Mode
  focusCon: string | null
  onEnterOrbit: (con: string) => void
  onLeaveOrbit: () => void
}) {
  const cv = useRef<HTMLCanvasElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [hover, setHover] = useState<string | null>(null)
  const hoverRef = useRef<string | null>(null)
  hoverRef.current = hover

  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null)
  const pinch = useRef<{ d: number; k: number } | null>(null)
  const cur = useRef({ ...view })

  /** Animated positions. Nodes ease between tower and orbit rather than jumping. */
  const anim = useRef(new Map<string, { x: number; y: number }>())
  /** Bodies the reader has moved by hand. These win over any computed target,
   *  so rearranging to read a label is never undone by the layout. */
  const manual = useRef(new Map<string, { x: number; y: number }>())
  const nodeDrag = useRef<{ id: string; ox: number; oy: number; sx: number; sy: number } | null>(null)

  /** Starfield, in screen space so it reads as depth behind the board. */
  const stars = useRef(
    Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 0.012 + Math.random() * 0.03, // full descent in roughly 30–80 seconds
      r: 0.4 + Math.random() * 1.1,
      a: 0.08 + Math.random() * 0.22,
    })),
  )

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


  /**
   * Orbit targets. Members of the focused constellation arrange in rings around
   * a centre, ring radius set by readiness — so the readiness reading survives
   * the change of metaphor rather than being thrown away.
   */
  const targets = useMemo(() => {
    const t = new Map<string, { x: number; y: number }>()
    if (mode === 'tower' || !focusCon) {
      for (const n of nodes) t.set(n.id, { x: n.x, y: n.y })
      return t
    }
    const members = nodes.filter((n) => n.constellation === focusCon)
    const byLevel = new Map<number, Node[]>()
    for (const n of members) {
      if (!byLevel.has(n.level)) byLevel.set(n.level, [])
      byLevel.get(n.level)!.push(n)
    }
    for (const [lvl, group] of byLevel) {
      const radius = 0.075 + (lvl / (LEVELS.length - 1)) * 0.33
      group.forEach((n, i) => {
        const a = (i / group.length) * Math.PI * 2 + lvl * 0.7
        t.set(n.id, { x: 0.5 + Math.cos(a) * radius, y: 0.5 + Math.sin(a) * radius * 0.82 })
      })
    }
    // Everything else drifts off to the edge and fades.
    for (const n of nodes) if (!t.has(n.id)) t.set(n.id, { x: n.x < 0.5 ? -0.25 : 1.25, y: n.y })
    return t
  }, [nodes, mode, focusCon])

  useEffect(() => {
    if (!wrap.current) return
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }))
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
    let raf = 0
    const t0 = performance.now()
    let last = t0

    const draw = (now: number) => {
      const t = (now - t0) / 1000
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      const e = reduced ? 1 : 0.16
      cur.current.k += (view.k - cur.current.k) * e
      cur.current.tx += (view.tx - cur.current.tx) * e
      cur.current.ty += (view.ty - cur.current.ty) * e
      const v = cur.current
      const X = (x: number) => PAD + (x * (W - PAD - 16) + v.tx) * v.k
      const Y = (y: number) => 10 + (y * (H - 30) + v.ty) * v.k

      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.clearRect(0, 0, W, H)

      // Starfield, screen space, descending. Atmosphere — never data.
      if (!reduced) {
        g.fillStyle = colour
        for (const s of stars.current) {
          s.y += s.v * dt
          if (s.y > 1.03) {
            s.y = -0.03
            s.x = Math.random()
          }
          g.globalAlpha = s.a * Math.min(1, s.y * 8) * Math.min(1, (1 - s.y) * 8)
          g.beginPath()
          g.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
          g.fill()
        }
        g.globalAlpha = 1
      }

      // Ease every node toward its target — this is the tower/orbit transition.
      for (const n of nodes) {
        const held = manual.current.get(n.id)
        const tgt = held ?? targets.get(n.id) ?? { x: n.x, y: n.y }
        const a = anim.current.get(n.id) ?? { x: n.x, y: n.y }
        const speed = nodeDrag.current?.id === n.id ? 1 : reduced ? 1 : 0.09
        a.x += (tgt.x - a.x) * speed
        a.y += (tgt.y - a.y) * speed
        anim.current.set(n.id, a)
      }
      const at = (n: Node) => anim.current.get(n.id) ?? { x: n.x, y: n.y }

      g.font = '11px ui-monospace, monospace'
      g.textBaseline = 'alphabetic'

      if (mode === 'tower') {
        LEVELS.forEach((lvl, i) => {
          const y = Y(i / LEVELS.length)
          g.strokeStyle = 'rgba(255,255,255,0.05)'
          g.beginPath()
          g.moveTo(0, y)
          g.lineTo(W, y)
          g.stroke()
          g.fillStyle = 'rgba(134,151,176,0.85)'
          g.fillText(lvl.toUpperCase(), 8, y + 15)
        })

        // Category names fade out as you zoom in — at close range they clutter
        // exactly the thing you are trying to read.
        const zoomFade = Math.max(0, Math.min(1, (1.7 - v.k) / 0.5))
        if (zoomFade > 0.02) {
          CONSTELLATIONS.forEach((c) => {
            if (!activeCons.includes(c)) return
            const cx = X(CONSTELLATION_HOME[c] ?? 0.5)
            g.fillStyle = colour
            g.globalAlpha = 0.8 * zoomFade
            const label = CONSTELLATION_LABEL[c].toUpperCase()
            g.fillText(label, cx - g.measureText(label).width / 2, 22)
            g.globalAlpha = 1
          })
        }
      } else {
        // Orbit: readiness becomes concentric rings, so the reading survives.
        // Rings, with their names on a single lower-left spoke rather than
        // stacked through the centre where the bodies are.
        LEVELS.forEach((lvl, i) => {
          const radius = 0.075 + (i / (LEVELS.length - 1)) * 0.33
          const rx = Math.abs(X(0.5 + radius) - X(0.5))
          const ry = Math.abs(Y(0.5 + radius * 0.82) - Y(0.5))
          g.strokeStyle = 'rgba(255,255,255,0.055)'
          g.beginPath()
          g.ellipse(X(0.5), Y(0.5), rx, ry, 0, 0, Math.PI * 2)
          g.stroke()

          const lx = X(0.5) - rx
          const ly = Y(0.5) - 6
          const txt = lvl.toUpperCase()
          const w = g.measureText(txt).width
          g.globalAlpha = 0.9
          g.fillStyle = '#070B14'
          g.fillRect(lx - 3, ly - 10, w + 6, 14)
          g.globalAlpha = 1
          g.fillStyle = 'rgba(134,151,176,0.9)'
          g.fillText(txt, lx, ly)
        })
        g.globalAlpha = 0.5
        g.fillStyle = colour
        g.beginPath()
        g.arc(X(0.5), Y(0.5), 4, 0, Math.PI * 2)
        g.fill()
        g.globalAlpha = 1
      }

      for (const { a, b, cross: cr } of links) {
        const pa = at(a)
        const pb = at(b)
        g.strokeStyle = colour
        g.globalAlpha = cr ? 0.14 : 0.26
        g.lineWidth = 1
        g.setLineDash(cr ? [3, 4] : [])
        g.beginPath()
        g.moveTo(X(pa.x), Y(pa.y))
        g.lineTo(X(pb.x), Y(pb.y))
        g.stroke()
      }
      g.setLineDash([])
      g.globalAlpha = 1

      const ordered = [...nodes].sort(
        (a, b) =>
          Number(a.id === selected) - Number(b.id === selected) ||
          Number(a.id === hoverRef.current) - Number(b.id === hoverRef.current) ||
          a.rank - b.rank,
      )
      const dimmed = selected !== null
      const labelQueue: { n: Node; px: number; py: number; top: boolean }[] = []

      for (const n of ordered) {
        const sel = selected === n.id
        const hov = hoverRef.current === n.id
        const p = at(n)
        const bob = reduced ? 0 : Math.sin(t * 0.25 + n.phase) * 1.4
        const px = X(p.x)
        const py = Y(p.y) + bob
        const r = n.radius * Math.min(1.5, Math.max(0.85, v.k)) * (sel ? 1.6 : hov ? 1.25 : 1)

        if (n.attention > 0.02 && !reduced) {
          const ph = (t * 0.45 + n.phase) % 1
          g.globalAlpha = (1 - ph) * 0.55 * n.attention
          g.strokeStyle = colour
          g.lineWidth = 1.5
          g.beginPath()
          g.arc(px, py, r + ph * 26, 0, Math.PI * 2)
          g.stroke()
        }

        const off = mode === 'orbit' && n.constellation !== focusCon ? 0.12 : 1
        const fade = (dimmed && !sel ? 0.3 : 1) * off
        g.shadowColor = colour
        g.shadowBlur = n.sourced ? 16 + n.weight * 12 : 5
        g.globalAlpha = (n.sourced ? 0.85 + n.weight * 0.15 : 0.42) * fade
        drawBody(g, n.glyph, px, py, r, colour, n.sourced)
        g.shadowBlur = 0

        if (sel || hov) {
          g.globalAlpha = 1
          g.strokeStyle = colour
          g.lineWidth = sel ? 1.6 : 1
          g.beginPath()
          g.arc(px, py, r + 10, 0, Math.PI * 2)
          g.stroke()
        }

        const earns = n.attention > 0.1 || n.sourced
        const showLabel =
          sel || hov || (mode === 'orbit' && n.constellation === focusCon) || earns || v.k > 2.2
        if (showLabel && off > 0.5) labelQueue.push({ n, px, py, top: sel || hov })
      }
      g.globalAlpha = 1

      for (const { n, px, py, top } of labelQueue) {
        const text = n.sourced ? n.label : n.label + ' · unsourced'
        const lx = top || mode === 'orbit' ? px + 14 : X(n.lx)
        const ly = top || mode === 'orbit' ? py + 4 : Y(n.ly)
        const w = g.measureText(text).width
        if (top) {
          g.globalAlpha = 0.92
          g.fillStyle = '#0D1421'
          g.beginPath()
          g.roundRect(lx - 5, ly - 11, w + 10, 16, 2)
          g.fill()
          g.globalAlpha = 0.5
          g.strokeStyle = colour
          g.lineWidth = 1
          g.stroke()
        }
        g.globalAlpha = top ? 1 : dimmed ? 0.3 : n.sourced ? 0.92 : 0.5
        g.fillStyle = top || n.sourced ? '#E6EDF7' : '#8697B0'
        g.fillText(text, lx, ly)
      }
      g.globalAlpha = 1

      raf = requestAnimationFrame(safeDraw)
    }

    // A throw inside requestAnimationFrame never reaches a React error
    // boundary — it just stops the loop and leaves a half-drawn frame. Report
    // it loudly and stop, rather than failing silently.
    const safeDraw = (now: number) => {
      try {
        draw(now)
      } catch (err) {
        console.error('Board render failed:', err)
        cancelAnimationFrame(raf)
      }
    }

    raf = requestAnimationFrame(safeDraw)
    return () => cancelAnimationFrame(raf)
  }, [size, nodes, links, targets, colour, selected, view, activeCons, mode, focusCon])

  const toWorld = (cx: number, cy: number) => {
    const r = cv.current!.getBoundingClientRect()
    return {
      x: ((cx - r.left - 108) / cur.current.k - cur.current.tx) / (r.width - 124),
      y: ((cy - r.top - 10) / cur.current.k - cur.current.ty) / (r.height - 30),
    }
  }

  const nearest = (cx: number, cy: number) => {
    const w = toWorld(cx, cy)
    let best: { n: Node; d: number } | null = null
    for (const n of nodes) {
      const p = anim.current.get(n.id) ?? { x: n.x, y: n.y }
      const d = Math.hypot(p.x - w.x, (p.y - w.y) * 0.55)
      if (!best || d < best.d) best = { n, d }
    }
    return best
  }

  function onWheel(e: React.WheelEvent) {
    const r = cv.current!.getBoundingClientRect()
    const cx = e.clientX - r.left - 108
    const cy = e.clientY - r.top - 10
    const k = Math.min(5, Math.max(0.5, view.k * (e.deltaY < 0 ? 1.15 : 0.87)))
    setView({ k, tx: view.tx + cx / k - cx / view.k, ty: view.ty + cy / k - cy / view.k })
  }

  function onPointerDown(e: React.PointerEvent) {
    const best = nearest(e.clientX, e.clientY)
    if (best && best.d < 0.028) {
      const p = anim.current.get(best.n.id) ?? { x: best.n.x, y: best.n.y }
      nodeDrag.current = { id: best.n.id, ox: e.clientX, oy: e.clientY, sx: p.x, sy: p.y }
    } else {
      drag.current = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty }
    }
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    const nd = nodeDrag.current
    if (nd) {
      const r = cv.current!.getBoundingClientRect()
      manual.current.set(nd.id, {
        x: nd.sx + (e.clientX - nd.ox) / cur.current.k / (r.width - 124),
        y: nd.sy + (e.clientY - nd.oy) / cur.current.k / (r.height - 30),
      })
      return
    }
    const d = drag.current
    if (!d) {
      const best = nearest(e.clientX, e.clientY)
      const id = best && best.d < 0.022 ? best.n.id : null
      if (id !== hoverRef.current) setHover(id)
      return
    }
    setView({
      k: view.k,
      tx: d.tx + (e.clientX - d.x) / view.k,
      ty: d.ty + (e.clientY - d.y) / view.k,
    })
  }

  function onPointerUp(e: React.PointerEvent) {
    const nd = nodeDrag.current
    nodeDrag.current = null
    if (nd) {
      // A tap rather than a drag: select it, and do not pin it.
      if (Math.hypot(e.clientX - nd.ox, e.clientY - nd.oy) < 4) {
        manual.current.delete(nd.id)
        onSelect(nd.id)
      }
      return
    }
    const d = drag.current
    drag.current = null
    if (!d || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 4) return
    const best = nearest(e.clientX, e.clientY)
    onSelect(best && best.d < 0.03 ? best.n.id : null)
  }

  useEffect(() => { manual.current.clear() }, [mode, focusCon])

  function onDoubleClick(e: React.MouseEvent) {
    const best = nearest(e.clientX, e.clientY)
    if (mode === 'orbit' || !best || best.d > 0.09) return onLeaveOrbit()
    onEnterOrbit(best.n.constellation)
  }

  function onTouchMove(e: React.TouchEvent) {
    if (e.touches.length !== 2) return
    e.preventDefault()
    drag.current = null
    const [a, b] = [e.touches[0], e.touches[1]]
    const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
    const r = cv.current!.getBoundingClientRect()
    const mx = (a.clientX + b.clientX) / 2 - r.left - 108
    const my = (a.clientY + b.clientY) / 2 - r.top - 10
    if (!pinch.current) {
      pinch.current = { d, k: view.k }
      return
    }
    const k = Math.min(5, Math.max(0.5, (pinch.current.k * d) / pinch.current.d))
    setView({ k, tx: view.tx + mx / k - mx / view.k, ty: view.ty + my / k - my / view.k })
  }

  return (
    <div className="tower" ref={wrap}>
      <canvas
        ref={cv}
        style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
        onWheel={onWheel}
        onDoubleClick={onDoubleClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => setHover(null)}
        onTouchMove={onTouchMove}
        onTouchEnd={() => (pinch.current = null)}
      />
    </div>
  )
}

/* ---------------------------------------------------------------- */

function Help({ colour }: { colour: string }) {
  return (
    <div className="help">
      <p>
        A map of how close developments in quantum computing, post-quantum
        cryptography, communications and sensing are to being real. Position is
        readiness, not date.
      </p>

      <dl className="help-key">
        <div><dt><GlyphMark glyph="star" colour={colour} /></dt><dd>Filled — carries a verified primary source</dd></div>
        <div><dt><GlyphMark glyph="pulsar" colour={colour} /></dt><dd>Hollow — a topic with no source yet. Not a claim</dd></div>
        <div><dt><GlyphMark glyph="comet" colour={colour} /></dt><dd>The shape is the organisation behind it</dd></div>
      </dl>

      <p className="label">Controls</p>
      <p>
        Hover to name · click to open · double-click a constellation to enter its
        orbit · scroll or pinch to zoom · drag to pan
      </p>

      <p className="label">Elsewhere</p>
      <ul className="help-links">
        {articles.map((a) => (
          <li key={a.id}>
            {a.url ? (
              <a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a>
            ) : (
              a.title
            )}
          </li>
        ))}
      </ul>

      <p className="disclaimer">
        Written in a personal capacity. Views expressed here are my own and do not
        represent the position of Ofgem or any organisation I advise.
      </p>
    </div>
  )
}

function Detail({ item, definition }: { item: FrontierItem; definition?: string }) {
  const colour = PILLAR_SPECTRUM[item.pillar].colour
  const needsSource = item.evidence.claim.startsWith('NEEDS PRIMARY SOURCE')

  return (
    <div className="detail">
      <div className="meta">
        <span className="badge" style={{ color: colour, borderColor: colour }}>{item.readiness}</span>
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
              <dd>{m.value}{m.unit ?? ''}{m.note && <em> — {m.note}</em>}</dd>
            </div>
          ))}
        </dl>
      )}

      {item.actors && item.actors.length > 0 && (
        <p className="actors"><span className="label">Demonstrated by</span> {item.actors.join(' · ')}</p>
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
                {s.identifier ?? s.title ?? s.url}
              </a>
            ))}
            <span className="label">Verified {item.evidence.verified}</span>
          </>
        )}
      </div>
    </div>
  )
}
