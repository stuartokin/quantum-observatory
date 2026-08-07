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
import { layoutTimeline, yearFraction, GUTTER } from './timeline'
import {
  DEFAULT_CAMERA,
  clampCamera,
  project,
  ringPosition,
  type Camera,
} from './orbit3d'
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

/**
 * Each actor gets a hue shifted from the galaxy's own line, so who did the work
 * is legible at a glance. Shift only — everything stays recognisably one galaxy.
 */
function shiftHue(hex: string, deg: number): string {
  const n = parseInt(hex.slice(1), 16)
  let r = ((n >> 16) & 255) / 255
  let g = ((n >> 8) & 255) / 255
  let b = (n & 255) / 255
  const mx = Math.max(r, g, b)
  const mn = Math.min(r, g, b)
  let h = 0
  const l = (mx + mn) / 2
  const d = mx - mn
  const sat = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  if (d !== 0) {
    if (mx === r) h = ((g - b) / d) % 6
    else if (mx === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
  }
  h = (h * 60 + deg + 360) % 360
  const c = (1 - Math.abs(2 * l - 1)) * sat
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  const seg = Math.floor(h / 60)
  const t: [number, number, number] =
    seg === 0 ? [c, x, 0] : seg === 1 ? [x, c, 0] : seg === 2 ? [0, c, x]
    : seg === 3 ? [0, x, c] : seg === 4 ? [x, 0, c] : [c, 0, x]
  const f = (v: number) => Math.round((v + m) * 255)
  return `#${[f(t[0]), f(t[1]), f(t[2])].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

function actorHash(a: string): number {
  let h = 2166136261
  for (let i = 0; i < a.length; i++) { h ^= a.charCodeAt(i); h = Math.imul(h, 16777619) }
  return (h >>> 0) % 1000 / 1000
}

/** ±34 degrees around the galaxy hue. Distinct, never a different galaxy. */
export function actorColour(base: string, actor?: string): string {
  if (!actor) return base
  return shiftHue(base, (actorHash(actor) - 0.5) * 68)
}
type Mode = 'tower' | 'orbit'

export function Board() {
  const [galaxy, setGalaxy] = useState<FrontierItem['pillar']>('quantum')
  const colour = PILLAR_SPECTRUM[galaxy].colour

  const [selected, setSelected] = useState<string | null>(null)
  const [view, setView] = useState({ k: 1, tx: 0, ty: 0 })
  const [mode, setMode] = useState<Mode>('tower')
  const [timeline, setTimeline] = useState(false)
  const [cam, setCam] = useState<Camera>(DEFAULT_CAMERA)
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
    setCam(DEFAULT_CAMERA)
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
    {
      key: 'timeline',
      label: timeline ? 'Galaxy view' : 'Timeline',
      active: timeline,
      onClick: () => {
        setTimeline((v) => !v)
        setMode('tower')
        setFocusCon(null)
        setView({ k: 1, tx: 0, ty: 0 })
      },
    },
    { key: 'filters', label: 'Filters', active: !frames.filters.docked, onClick: toggle('filters') },
    ...(timeline
      ? []
      : [
          {
            key: 'actors',
            label: 'Actors',
            active: !frames.actors.docked,
            onClick: toggle('actors'),
          },
        ]),
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
            {timeline
              ? 'When the evidence landed'
              : mode === 'orbit' && focusCon
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
        timeline={timeline}
        cam={cam}
        setCam={setCam}
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

      {!timeline && (
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
                <GlyphMark glyph={glyphFor(a)} colour={actorColour(colour, a)} />
                <span>{a}</span>
                <em>{n}</em>
              </button>
            </li>
          ))}
          {actors.length === 0 && <li className="label">No actors recorded yet.</li>}
        </ul>
      </Frame>
      )}

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
  timeline,
  cam,
  setCam,
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
  timeline: boolean
  cam: Camera
  setCam: (c: Camera) => void
}) {
  const cv = useRef<HTMLCanvasElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [hover, setHover] = useState<string | null>(null)
  const hoverRef = useRef<string | null>(null)
  hoverRef.current = hover

  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null)
  const pinch = useRef<{ d: number; k: number; angle: number; roll: number } | null>(null)
  /** Camera drag while in orbit: horizontal is yaw, vertical is pitch. */
  const camDrag = useRef<{ x: number; y: number; yaw: number; pitch: number; roll: number; rollMode: boolean } | null>(null)
  const cur = useRef({ ...view })

  /** Animated positions. Nodes ease between tower and orbit rather than jumping. */
  const anim = useRef(new Map<string, { x: number; y: number }>())
  /** Bodies the reader has moved by hand. These win over any computed target,
   *  so rearranging to read a label is never undone by the layout. */
  const manual = useRef(new Map<string, { x: number; y: number }>())
  /** Perspective scale per node while in orbit — drives size and depth fade. */
  const depthOf = useRef(new Map<string, { scale: number; depth: number }>())
  /** Live timeline projection, so hit testing uses the same maths as drawing. */
  const tlProject = useRef<{ TX: (x: number) => number; TY: (y: number) => number } | null>(null)
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

  const tl = useMemo(
    () =>
      timeline
        ? layoutTimeline(
            nodes
              .map((n) => allFrontier.find((i) => i.id === n.id))
              .filter((i): i is NonNullable<typeof i> => Boolean(i)),
            {
              sourced: (i) =>
                i.status === 'published' && !i.evidence.claim.startsWith('NEEDS PRIMARY SOURCE'),
              attention: (i) => byId.get(i.id)?.attention ?? 0,
            },
          )
        : null,
    [timeline, nodes, byId],
  )

  /** Orbit members as 3D ring positions, so the camera can move around them. */
  const orbit3d = useMemo(() => {
    const m = new Map<string, { angle: number; radius: number; lift: number }>()
    if (mode !== 'orbit' || !focusCon) return m
    const members = nodes.filter((n) => n.constellation === focusCon)
    const byLevel = new Map<number, Node[]>()
    for (const n of members) {
      if (!byLevel.has(n.level)) byLevel.set(n.level, [])
      byLevel.get(n.level)!.push(n)
    }
    for (const [lvl, group] of byLevel) {
      const radius = 0.28 + (lvl / (LEVELS.length - 1)) * 1.05
      group.forEach((n, i) => {
        m.set(n.id, {
          angle: (i / group.length) * Math.PI * 2 + lvl * 0.6,
          radius,
          lift: (lvl - (LEVELS.length - 1) / 2) * 0.06,
        })
      })
    }
    return m
  }, [nodes, mode, focusCon])

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

      // ---------------- TIMELINE ----------------
      if (tl) {
        const AXIS = 104          // reserved for readiness names; marks never enter
        const R = 18
        const TX = (x: number) => AXIS + (x * (W - AXIS - R) + v.tx) * v.k
        const TY = (y: number) => 40 + (y * (H - 78) + v.ty) * v.k
        tlProject.current = { TX, TY }

        g.font = '11px ui-monospace, monospace'

        // Year gridlines first, so nothing is drawn over a mark.
        for (const yr of tl.years) {
          const fx = TX(yearFraction(yr, tl.from, tl.to))
          if (fx < AXIS || fx > W) continue
          g.strokeStyle = 'rgba(255,255,255,0.05)'
          g.beginPath()
          g.moveTo(fx, 24)
          g.lineTo(fx, H - 6)
          g.stroke()
          g.fillStyle = 'rgba(134,151,176,0.75)'
          g.fillText(String(yr), fx + 5, 20)
        }

        LEVELS.forEach((lvl, i) => {
          const y = TY((i + 0.5) / LEVELS.length)
          g.strokeStyle = 'rgba(255,255,255,0.04)'
          g.beginPath()
          g.moveTo(AXIS, y)
          g.lineTo(W, y)
          g.stroke()
        })

        // Undated gutter, inside the plot so its marks stay visible and clickable.
        const gEdge = TX(GUTTER - 0.008)
        if (tl.undated > 0) {
          g.strokeStyle = 'rgba(255,255,255,0.07)'
          g.setLineDash([2, 4])
          g.beginPath()
          g.moveTo(gEdge, 24)
          g.lineTo(gEdge, H - 6)
          g.stroke()
          g.setLineDash([])
          g.fillStyle = 'rgba(134,151,176,0.7)'
          g.fillText(`NO DATED SOURCE · ${tl.undated}`, AXIS + 4, 20)
        }

        const ordered = [...tl.marks].sort(
          (a, b) =>
            Number(a.id === selected) - Number(b.id === selected) ||
            Number(a.id === hoverRef.current) - Number(b.id === hoverRef.current) ||
            a.importance - b.importance,
        )
        const dim = selected !== null
        const placed: { x: number; y: number; w: number }[] = []

        for (const m of ordered) {
          const px = TX(m.x)
          const py = TY(m.y)
          if (px < AXIS - 20 || px > W + 20) continue
          const sel = selected === m.id
          const hov = hoverRef.current === m.id
          const rr = m.r * (sel ? 1.5 : hov ? 1.2 : 1)
          const tint = actorColour(colour, undefined)

          if (m.attention > 0.02 && !reduced) {
            const ph = (t * 0.45 + m.x * 5) % 1
            g.globalAlpha = (1 - ph) * 0.5 * m.attention
            g.strokeStyle = tint
            g.lineWidth = 1.4
            g.beginPath()
            g.arc(px, py, rr + ph * 22, 0, Math.PI * 2)
            g.stroke()
          }

          // Importance reads as size, brightness and glow together.
          g.globalAlpha = (dim && !sel ? 0.25 : 1) * (0.4 + m.importance * 0.6)
          g.shadowColor = tint
          g.shadowBlur = 4 + m.importance * 16
          g.fillStyle = m.sourced ? tint : 'rgba(120,132,158,0.95)'
          g.beginPath()
          g.arc(px, py, rr, 0, Math.PI * 2)
          g.fill()
          g.shadowBlur = 0

          if (sel || hov) {
            g.globalAlpha = 1
            g.strokeStyle = tint
            g.lineWidth = 1.4
            g.beginPath()
            g.arc(px, py, rr + 8, 0, Math.PI * 2)
            g.stroke()
          }

          // Labels: the most important first, and only where there is room.
          const wantLabel = sel || hov || m.importance > 0.55
          if (wantLabel) {
            const text = m.label
            const tw = g.measureText(text).width
            let lx = px + rr + 7
            if (lx + tw > W - 6) lx = px - rr - 7 - tw
            lx = Math.max(AXIS + 4, lx)
            let ly = py + 4
            let guard = 0
            while (
              guard++ < 12 &&
              placed.some(
                (o) => Math.abs(o.y - ly) < 14 && !(lx + tw < o.x - 4 || lx > o.x + o.w + 4),
              )
            ) {
              ly += 14
            }
            if (guard < 12 || sel || hov) {
              placed.push({ x: lx, y: ly, w: tw })
              if (sel || hov) {
                g.globalAlpha = 0.92
                g.fillStyle = '#0D1421'
                g.beginPath()
                g.roundRect(lx - 5, ly - 11, tw + 10, 16, 2)
                g.fill()
                g.globalAlpha = 0.5
                g.strokeStyle = tint
                g.lineWidth = 1
                g.stroke()
              }
              g.globalAlpha = sel || hov ? 1 : dim ? 0.3 : 0.4 + m.importance * 0.55
              g.fillStyle = sel || hov || m.sourced ? '#E6EDF7' : '#8697B0'
              g.fillText(text, lx, ly)
            }
          }
        }

        // Readiness names last, on an opaque strip, so no label can cross them.
        g.globalAlpha = 1
        g.fillStyle = '#070B14'
        g.fillRect(0, 0, AXIS - 2, H)
        LEVELS.forEach((lvl, i) => {
          const y = TY((i + 0.5) / LEVELS.length)
          g.fillStyle = 'rgba(134,151,176,0.9)'
          g.fillText(lvl.toUpperCase(), 8, y + 4)
        })
        g.globalAlpha = 1
        raf = requestAnimationFrame(safeDraw)
        return
      }


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
        const ring = orbit3d.get(n.id)
        let projected: { x: number; y: number } | null = null
        if (mode === 'orbit' && ring && !held) {
          const q = project(ringPosition(ring.angle, ring.radius, ring.lift), cam)
          depthOf.current.set(n.id, { scale: q.scale, depth: q.depth })
          projected = { x: q.sx, y: q.sy }
        }
        const tgt = held ?? projected ?? targets.get(n.id) ?? { x: n.x, y: n.y }
        const a = anim.current.get(n.id) ?? { x: n.x, y: n.y }
        const speed = nodeDrag.current?.id === n.id || projected ? 1 : reduced ? 1 : 0.09
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
        // ---------------- ORBIT, IN THREE DIMENSIONS ----------------
        // Rings are projected circles, so they tilt with the camera.
        LEVELS.forEach((lvl, i) => {
          const radius = 0.28 + (i / (LEVELS.length - 1)) * 1.05
          g.strokeStyle = 'rgba(255,255,255,0.05)'
          g.lineWidth = 1
          g.beginPath()
          for (let k = 0; k <= 72; k++) {
            const a = (k / 72) * Math.PI * 2
            const q = project(ringPosition(a, radius, 0), cam)
            const sx = X(q.sx)
            const sy = Y(q.sy)
            if (k === 0) g.moveTo(sx, sy)
            else g.lineTo(sx, sy)
          }
          g.stroke()

          const q = project(ringPosition(Math.PI, radius, 0), cam)
          const txt = lvl.toUpperCase()
          const w = g.measureText(txt).width
          g.globalAlpha = 0.9
          g.fillStyle = '#070B14'
          g.fillRect(X(q.sx) - w - 9, Y(q.sy) - 15, w + 8, 14)
          g.globalAlpha = 1
          g.fillStyle = 'rgba(134,151,176,0.9)'
          g.fillText(txt, X(q.sx) - w - 5, Y(q.sy) - 5)
        })

        const c0 = project({ x: 0, y: 0, z: 0 }, cam)
        g.globalAlpha = 0.55
        g.fillStyle = colour
        g.beginPath()
        g.arc(X(c0.sx), Y(c0.sy), 4, 0, Math.PI * 2)
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

      // In orbit, paint far bodies first so nearer ones occlude them.
      const ordered = [...nodes].sort((a, b) => {
        if (mode === 'orbit') {
          const da = depthOf.current.get(a.id)?.depth ?? 0
          const db = depthOf.current.get(b.id)?.depth ?? 0
          if (da !== db) return db - da
        }
        return (
          Number(a.id === selected) - Number(b.id === selected) ||
          Number(a.id === hoverRef.current) - Number(b.id === hoverRef.current) ||
          a.rank - b.rank
        )
      })
      const dimmed = selected !== null
      const labelQueue: { n: Node; px: number; py: number; top: boolean }[] = []

      for (const n of ordered) {
        const sel = selected === n.id
        const hov = hoverRef.current === n.id
        const p = at(n)
        const bob = reduced ? 0 : Math.sin(t * 0.25 + n.phase) * 1.4
        const px = X(p.x)
        const py = Y(p.y) + bob
        const persp = mode === 'orbit' ? depthOf.current.get(n.id)?.scale ?? 1 : 1
        const r =
          n.radius *
          Math.min(1.5, Math.max(0.85, v.k)) *
          (sel ? 1.6 : hov ? 1.25 : 1) *
          Math.max(0.45, Math.min(1.7, persp))

        if (n.attention > 0.02 && !reduced) {
          const ph = (t * 0.45 + n.phase) % 1
          g.globalAlpha = (1 - ph) * 0.55 * n.attention
          g.strokeStyle = colour
          g.lineWidth = 1.5
          g.beginPath()
          g.arc(px, py, r + ph * 26, 0, Math.PI * 2)
          g.stroke()
        }

        // Bodies further from the camera dim — most of the depth cue.
        const depthFade = mode === 'orbit' ? Math.max(0.35, Math.min(1, persp)) : 1
        const off = (mode === 'orbit' && n.constellation !== focusCon ? 0.12 : 1) * depthFade
        const fade = (dimmed && !sel ? 0.3 : 1) * off
        g.shadowColor = colour
        g.shadowBlur = n.sourced ? 16 + n.weight * 12 : 5
        g.globalAlpha = (n.sourced ? 0.85 + n.weight * 0.15 : 0.42) * fade
        drawBody(g, n.glyph, px, py, r, actorColour(colour, n.actor), n.sourced)
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
  }, [size, nodes, links, targets, colour, selected, view, activeCons, mode, focusCon, tl, cam, orbit3d])

  const toWorld = (cx: number, cy: number) => {
    const r = cv.current!.getBoundingClientRect()
    return {
      x: ((cx - r.left - 108) / cur.current.k - cur.current.tx) / (r.width - 124),
      y: ((cy - r.top - 10) / cur.current.k - cur.current.ty) / (r.height - 30),
    }
  }

  const nearestMark = (cx: number, cy: number): { id: string; d: number } | null => {
    if (!tl || !tlProject.current) return null
    const r = cv.current!.getBoundingClientRect()
    const { TX, TY } = tlProject.current
    let best: { id: string; d: number } | null = null
    for (const m of tl.marks) {
      const d = Math.hypot(TX(m.x) - (cx - r.left), TY(m.y) - (cy - r.top))
      if (!best || d < best.d) best = { id: m.id, d }
    }
    return best
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
    if (mode === 'orbit') {
      setCam(clampCamera({ ...cam, dist: cam.dist * (e.deltaY < 0 ? 0.9 : 1.11) }))
      return
    }
    const r = cv.current!.getBoundingClientRect()
    const cx = e.clientX - r.left - 108
    const cy = e.clientY - r.top - 10
    const k = Math.min(5, Math.max(0.5, view.k * (e.deltaY < 0 ? 1.15 : 0.87)))
    setView({ k, tx: view.tx + cx / k - cx / view.k, ty: view.ty + cy / k - cy / view.k })
  }

  function onPointerDown(e: React.PointerEvent) {
    if (tl) {
      // Timeline pans only; marks are selected on release.
      drag.current = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty }
      ;(e.target as Element).setPointerCapture?.(e.pointerId)
      return
    }
    const best = nearest(e.clientX, e.clientY)
    if (best && best.d < 0.028) {
      const p = anim.current.get(best.n.id) ?? { x: best.n.x, y: best.n.y }
      nodeDrag.current = { id: best.n.id, ox: e.clientX, oy: e.clientY, sx: p.x, sy: p.y }
    } else if (mode === 'orbit') {
      // Empty space in orbit rotates the camera. Shift or right-button rolls.
      camDrag.current = {
        x: e.clientX,
        y: e.clientY,
        yaw: cam.yaw,
        pitch: cam.pitch,
        roll: cam.roll,
        rollMode: e.shiftKey || e.button === 2,
      }
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
    const cd = camDrag.current
    if (cd) {
      const dx = (e.clientX - cd.x) / 260
      const dy = (e.clientY - cd.y) / 260
      setCam(
        clampCamera(
          cd.rollMode
            ? { ...cam, roll: cd.roll + dx * 1.6 }
            : { ...cam, yaw: cd.yaw + dx * 1.8, pitch: cd.pitch - dy * 1.4 },
        ),
      )
      return
    }
    const d = drag.current
    if (!d) {
      if (tl) {
        const bm = nearestMark(e.clientX, e.clientY)
        const id = bm && bm.d < 16 ? bm.id : null
        if (id !== hoverRef.current) setHover(id)
        return
      }
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
    if (camDrag.current) {
      const moved = Math.hypot(e.clientX - camDrag.current.x, e.clientY - camDrag.current.y)
      camDrag.current = null
      if (moved > 4) return
    }
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
    if (tl) {
      const bm = nearestMark(e.clientX, e.clientY)
      onSelect(bm && bm.d < 18 ? bm.id : null)
      return
    }
    const best = nearest(e.clientX, e.clientY)
    onSelect(best && best.d < 0.03 ? best.n.id : null)
  }

  useEffect(() => { manual.current.clear() }, [mode, focusCon])

  function onDoubleClick(e: React.MouseEvent) {
    if (tl) return
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
    const angle = Math.atan2(b.clientY - a.clientY, b.clientX - a.clientX)
    const r = cv.current!.getBoundingClientRect()
    const mx = (a.clientX + b.clientX) / 2 - r.left - 108
    const my = (a.clientY + b.clientY) / 2 - r.top - 10

    if (!pinch.current) {
      pinch.current = { d, k: view.k, angle, roll: cam.roll }
      return
    }

    if (mode === 'orbit') {
      // Pinch dollies the camera; twisting two fingers rolls it.
      let twist = angle - pinch.current.angle
      while (twist > Math.PI) twist -= Math.PI * 2
      while (twist < -Math.PI) twist += Math.PI * 2
      setCam(
        clampCamera({
          ...cam,
          dist: (cam.dist * pinch.current.d) / Math.max(1, d),
          roll: pinch.current.roll + twist,
        }),
      )
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
        onContextMenu={(e) => e.preventDefault()}
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
        Hover to name · click to open · drag a body to move it · double-click a
        constellation to enter its orbit · scroll or pinch to zoom · drag to pan
      </p>
      <p>
        <strong>In orbit:</strong> drag empty space to rotate · shift-drag or
        right-drag to roll · two-finger twist to roll on touch · scroll or pinch
        to move the camera closer
      </p>
      <p>
        <strong>Timeline:</strong> the horizontal axis is when the evidence was
        published, not when a file was written. Items with no dated source sit in
        the undated gutter rather than being given a position they have not earned.
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

/**
 * Plain English, derived rather than authored — so it is right for every item
 * without 56 hand-written paragraphs going stale. Says what the readiness and
 * confidence actually mean for someone planning around this.
 */
const PLAIN_READINESS: Record<string, string> = {
  emerging:
    'Someone has proposed this. Nobody independent has reproduced it. Treat it as a possibility to watch, not something to plan around.',
  experimental:
    'It has worked in a lab, at least once, outside the group that proposed it. It is a long way from anything you could buy or deploy.',
  demonstrated:
    'It works at a scale that means something, or a standard now exists for it. Real, but not yet something most organisations have.',
  adopted:
    'It is shipping in named products, or sits on a published roadmap with dates. If this matters to you, it is time to plan.',
  mainstream:
    'This is the default. The interesting question is no longer who has it, but who does not.',
}

const PLAIN_CONFIDENCE: Record<string, string> = {
  high: 'Backed by a peer-reviewed paper or a formal standard, checked recently.',
  medium: 'Backed by a preprint or a supplier\u2019s own technical announcement, or the check is getting old.',
  low: 'One source, contested, or the evidence has not been re-checked in a year. Verify before relying on it.',
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
      <div className="plain">
        <span className="label">What this means</span>
        <p>{PLAIN_READINESS[item.readiness]}</p>
        {definition && (
          <p className="plain__test">
            <strong>The test used here:</strong> {definition}
          </p>
        )}
        <p className="plain__conf">
          {needsSource
            ? 'No source has been attached yet, so nothing is being claimed about how real this is. It is on the board so the shape of the field is honest.'
            : PLAIN_CONFIDENCE[item.confidence]}
        </p>
      </div>

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
