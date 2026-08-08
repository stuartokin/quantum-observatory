import { useEffect, useMemo, useRef, useState } from 'react'
import { allFrontier } from '../../content/frontier'
import { items as articles } from '../../content/loader'
import type { FrontierItem, Readiness } from '../../content/frontierTypes'
import { PILLAR_SPECTRUM } from '../../palette'
import { constellationColour, constellationMuted } from '../../constellationPalette'
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
import { layoutTimeline, yearFraction, GUTTER, dateOf } from './timeline'
import {
  DEFAULT_CAMERA,
  clampCamera,
  project,
  ringPosition,
  type Camera,
} from './orbit3d'
import scales from '../../../content/frontier/_scales.json'
import { VERSION } from '../../version'
import { Frame, defaultLayout, type FrameState } from '../../components/Frame'
import { News, Teaser, QDayBar, QDayPanel } from '../../components/Panels'
import { MiniOrbit, mostChanged } from '../../components/MiniOrbit'
import { buildNews, headlines } from './news'
import { forecastFor, type Forecast } from '../../content/forecast'
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
  const [timeline, setTimeline] = useState(false)
  const [cam, setCam] = useState<Camera>(DEFAULT_CAMERA)
  const [focusCon, setFocusCon] = useState<string | null>(null)
  const [statsOpen, setStatsOpen] = useState(false)
  /** Years excluded from view. Filtering time frees space in both views. */
  const [hiddenYears, setHiddenYears] = useState<Set<number>>(new Set())
  const [showLegend, setShowLegend] = useState(true)
  /** Below roughly 13 inches the figures move behind an icon rather than going. */
  const [narrow, setNarrow] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 1180 : false,
  )
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 1180)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const [cons, setCons] = useState<string[]>([...CONSTELLATIONS])
  const [levels, setLevels] = useState<Readiness[]>([...LEVELS])
  const [actorFilter, setActorFilter] = useState<string | null>(null)
  const [sourcedOnly, setSourcedOnly] = useState(false)

  // The opening workspace: galaxy dominant, teaser and news beside it on a
  // wide screen, everything else in the toolbar until asked for.
  const [frames, setFrames] = useState<Record<string, FrameState>>(() =>
    defaultLayout(window.innerWidth, window.innerHeight),
  )
  const setFrame = (k: string) => (s: FrameState) => setFrames((f) => ({ ...f, [k]: s }))
  const openQDay = () => {
    setFrames((f) => ({ ...f, qday: { ...f.qday, docked: false } }))
    setOrder((o) => [...o.filter((x) => x !== 'qday'), 'qday'])
  }
  const dock = (k: string) => () => setFrames((f) => ({ ...f, [k]: { ...f[k], docked: true } }))
  const [order, setOrder] = useState<string[]>([
    'galaxy', 'teaser', 'news', 'filters', 'actors', 'help', 'qday', 'detail',
  ])
  const raise = (k: string) => () => setOrder((o) => [...o.filter((x) => x !== k), k])
  const zOf = (k: string) => 30 + order.indexOf(k)

  const toggle = (k: string) => () => {
    setFrames((f) => ({ ...f, [k]: { ...f[k], docked: !f[k].docked } }))
    // Opening a window behind everything else is the same as not opening it.
    setOrder((o) => [...o.filter((x) => x !== k), k])
  }

  /** Canvases inside frames need telling when their box changed. */
  const [resizeTick, setResizeTick] = useState(0)
  const bump = () => setResizeTick((n) => n + 1)

  /** Stacking order. Last in the list is nearest the reader. */

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
          (() => {
            if (hiddenYears.size === 0) return true
            const d = dateOf(i)
            // Undated items are never hidden by a year filter — they have no
            // year to disagree with, and dropping them would quietly shrink
            // the board without saying so.
            return !d || !hiddenYears.has(d.getFullYear())
          })() &&
          cons.includes(i.constellation ?? '') &&
          levels.includes(i.readiness) &&
          (!actorFilter || (i.actors ?? []).includes(actorFilter)) &&
          (!sourcedOnly || isSourced(i)),
      ),
    [pool, cons, levels, actorFilter, sourcedOnly, hiddenYears],
  )

  const nodes = useMemo(() => layout(visible, { offsets: {} as Offsets }), [visible])
  const item = selected ? pool.find((i) => i.id === selected) ?? null : null
  /** Every year the board has evidence for, ascending. */
  const years = useMemo(() => {
    const set = new Set<number>()
    for (const i of pool) {
      const d = dateOf(i)
      if (d) set.add(d.getFullYear())
    }
    return [...set].sort((a, b) => a - b)
  }, [pool])

  const news = useMemo(() => buildNews(pool), [pool])
  const teaserEntries = useMemo(() => headlines(news), [news])
  const changedCon = useMemo(() => mostChanged(teaserEntries), [teaserEntries])
  const changedIds = useMemo(() => new Set(teaserEntries.map((e) => e.id)), [teaserEntries])
  const forecast = useMemo(() => forecastFor(galaxy), [galaxy])
  const moved = useMemo(() => visible.filter((i) => i.moved?.on).length, [visible])

  /**
   * Review debt, shown rather than hidden. Agents publish without a human gate,
   * so the board has to be honest about how much of it nobody has read.
   */
  const debt = useMemo(() => {
    const unreviewed = pool.filter((i) => i.review?.state === 'agent-merged').length
    const dates = pool
      .map((i) => (i.review?.state === 'reviewed' ? i.review.on : undefined))
      .filter((d): d is string => Boolean(d))
      .sort()
    const last = dates.length ? dates[dates.length - 1] : undefined
    const weeks = last
      ? Math.floor((Date.now() - new Date(last).getTime()) / 6.048e8)
      : undefined
    return { unreviewed, last, weeks }
  }, [pool])

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
      ? [{ key: 'back', icon: '←', label: '← Galaxy', onClick: leaveOrbit }]
      : []),
    {
      key: 'timeline',
      icon: timeline ? '✦' : '◷',
      label: timeline ? 'Galaxy view' : 'Timeline',
      active: timeline,
      onClick: () => {
        setTimeline((v) => !v)
        setMode('tower')
        setFocusCon(null)
        setView({ k: 1, tx: 0, ty: 0 })
      },
    },
    { key: 'filters', icon: '⌗', label: 'Filters', active: !frames.filters.docked, onClick: toggle('filters') },
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
    { key: 'news', icon: '◰', label: 'News', active: !frames.news.docked, onClick: toggle('news') },
    { key: 'teaser', icon: '△', label: 'Changed', active: !frames.teaser.docked, onClick: toggle('teaser') },
    { key: 'help', icon: '?', label: 'Help', active: !frames.help.docked, onClick: toggle('help') },
    {
      key: 'reset',
      icon: '⟲',
      label: 'Reset',
      onClick: () => {
        setView({ k: 1, tx: 0, ty: 0 })
        setFrames(defaultLayout(window.innerWidth, window.innerHeight))
        bump()
      },
    },
  ]

  return (
    <main className="board">
      {/*
        Layout inline, not in CSS.

        The right-hand side vanished because the title block could not shrink:
        a flex item defaults to min-width auto, so a long h2 grew past the
        header and pushed the figures off the edge entirely. Three CSS attempts
        failed to reach it, so the constraints live here where nothing can
        override them.
      */}
      <header
        className="board-head"
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          minHeight: 52,
          overflow: 'visible',
        }}
      >
        <div
          className="board-title"
          style={{
            display: 'flex',
            // nowrap matters: the older stylesheet wraps this, which dropped
            // the title onto a second line and clipped it against the header.
            flexWrap: 'nowrap',
            alignItems: 'baseline',
            gap: 10,
            minWidth: 0,
            flex: '1 1 0',
            overflow: 'hidden',
          }}
        >
          <span className="wordmark" style={{ flex: '0 0 auto' }}>Horizon Q</span>
          <select
            className="galaxy-picker"
            value={galaxy}
            onChange={(e) => {
              setGalaxy(e.target.value as FrontierItem['pillar'])
              leaveOrbit()
              setSelected(null)
            }}
            style={{ color: colour, flex: '0 0 auto' }}
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
          {/* Truncates to nothing rather than wrapping. With the Q-Day bar and
              the figures both present, this is the element that must give. */}
          <h2
            onDoubleClick={openQDay}
            title="Double-click for the Q-Day forecast"
            style={{
              cursor: 'pointer',
              flex: '1 1 0',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              lineHeight: 1.2,
            }}
          >
            {timeline
              ? 'When the evidence landed'
              : mode === 'orbit' && focusCon
                ? CONSTELLATION_LABEL[focusCon]
                : 'The frontier, by how close it is to real'}
          </h2>
        </div>

        {/*
          Inline styles here, deliberately.

          These figures disappeared twice behind stylesheet rules I could not
          see — an @import is evaluated before the rest of the importing file,
          so a bare `.board-stats` elsewhere wins on order however specific the
          replacement. Inline styles beat every stylesheet rule, so the numbers
          that say how much of this board nobody has checked cannot silently
          vanish again.
        */}
        <div
          className="board-right"
          style={{ display: 'flex', alignItems: 'center', gap: 12, flex: '0 0 auto', position: 'relative' }}
        >
          <QDayBar forecast={forecast} colour={colour} onOpen={openQDay} />

          {narrow && (
            <button
              className="board-stats__toggle"
              onClick={() => setStatsOpen((v) => !v)}
              aria-expanded={statsOpen}
              aria-label="Board statistics"
              title="Board statistics"
              style={{
                display: 'block',
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: 'transparent',
                border: '1px solid var(--hairline)',
                color: statsOpen ? colour : 'var(--ink-faint)',
                cursor: 'pointer',
                fontFamily: 'var(--mono)',
                fontSize: '0.72rem',
                fontStyle: 'italic',
              }}
            >
              i
            </button>
          )}

          {(!narrow || statsOpen) && (
            <div
              className="board-stats"
              style={{
                display: 'flex',
                flexDirection: narrow ? 'column' : 'row',
                alignItems: narrow ? 'flex-end' : 'baseline',
                flexWrap: narrow ? 'wrap' : 'nowrap',
                whiteSpace: 'nowrap',
                gap: narrow ? 5 : 14,
                fontFamily: 'var(--mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                ...(narrow
                  ? {
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 10px)',
                      padding: '10px 16px',
                      background: 'var(--ground-panel)',
                      border: '1px solid var(--hairline)',
                      borderRadius: 2,
                      boxShadow: '0 10px 36px rgb(0 0 0 / 0.6)',
                      zIndex: 80,
                      whiteSpace: 'nowrap',
                    }
                  : {}),
              }}
            >
              <span><b>{visible.length}</b> of {pool.length}</span>
              <span><b>{visible.filter(isSourced).length}</b> sourced</span>
              {moved > 0 && <span className="board-stats__move"><b>{moved}</b> moved</span>}
              {debt.unreviewed > 0 && (
                <span className="board-stats__unreviewed"><b>{debt.unreviewed}</b> unreviewed</span>
              )}
              {debt.weeks !== undefined && (
                <span className={debt.weeks >= 8 ? 'board-stats__stale' : undefined}>
                  reviewed <b>{debt.weeks}w</b> ago
                </span>
              )}
              <span style={{ opacity: 0.5 }}>v{VERSION}</span>
            </div>
          )}
        </div>
      </header>

      <Frame
        title={timeline ? 'Timeline' : mode === 'orbit' && focusCon ? CONSTELLATION_LABEL[focusCon] : 'Galaxy'}
        state={frames.galaxy}
        onChange={setFrame('galaxy')}
        accent={colour}
        z={zOf('galaxy')}
        onFocus={raise('galaxy')}
        onResized={bump}
        minWidth={360}
        minHeight={260}
        flush
      >
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
          resizeTick={resizeTick}
          forecast={forecast}
          showLegend={showLegend}
          onToggleLegend={() => setShowLegend((v) => !v)}
          pool={pool}
        />
      </Frame>

      <Frame
        title="What changed"
        state={frames.teaser}
        onChange={setFrame('teaser')}
        onDock={dock('teaser')}
        accent={colour}
        z={zOf('teaser')}
        onFocus={raise('teaser')}
      >
        {changedCon && (
          <MiniOrbit
            constellation={changedCon}
            colour={colour}
            highlight={changedIds}
            onOpen={() => { setTimeline(false); enterOrbit(changedCon) }}
          />
        )}
        <Teaser
          entries={teaserEntries}
          colour={colour}
          onSelect={setSelected}
          onJump={(c) => { setTimeline(false); enterOrbit(c) }}
        />
      </Frame>

      <Frame
        title="News"
        state={frames.news}
        onChange={setFrame('news')}
        onDock={dock('news')}
        accent={colour}
        z={zOf('news')}
        onFocus={raise('news')}
      >
        <News weeks={news} colour={colour} onSelect={setSelected} />
      </Frame>

      <Frame
        title="Q-Day forecast"
        state={frames.qday}
        onChange={setFrame('qday')}
        onDock={dock('qday')}
        accent={colour}
        z={zOf('qday')}
        onFocus={raise('qday')}
      >
        <QDayPanel forecast={forecast} colour={colour} />
      </Frame>

      <Frame
        title="Filters"
        state={frames.filters}
        onChange={setFrame('filters')}
        onDock={dock('filters')}
        accent={colour}
        z={zOf('filters')}
        onFocus={raise('filters')}
      >
        <FilterSection
          label="Constellations"
          all={CONSTELLATIONS as unknown as string[]}
          selected={cons}
          onChange={setCons}
          swatch={(c) => constellationColour(c)}
          render={(c) => CONSTELLATION_LABEL[c]}
        />

        <FilterSection
          label="Readiness"
          all={LEVELS as unknown as string[]}
          selected={levels}
          onChange={(next) => setLevels(next as Readiness[])}
          render={(l) => l}
        />

        <section className="filter-group">
          <header>
            <span className="label">Evidence</span>
          </header>
          <ul className="filter-list">
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={sourcedOnly}
                  onChange={() => setSourcedOnly((v) => !v)}
                />
                <span style={{ opacity: sourcedOnly ? 1 : 0.45 }}>Sourced only</span>
              </label>
            </li>
          </ul>
          <p className="filter-group__note">
            Hides the hollow bodies — topics on the board with no evidence
            attached yet.
          </p>
        </section>

        <FilterSection
          label="Years"
          all={years.map(String)}
          selected={years.filter((y) => !hiddenYears.has(y)).map(String)}
          onChange={(next) => {
            const keep = new Set(next.map(Number))
            setHiddenYears(new Set(years.filter((y) => !keep.has(y))))
          }}
          render={(y) => y}
          note="Undated items are never hidden by a year filter."
        />
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
                <GlyphMark glyph={glyphFor(a)} colour={colour} />
                <span>{a}</span>
                <em>{n}</em>
              </button>
            </li>
          ))}
          {actors.length === 0 && <li className="label">No actors recorded yet.</li>}
        </ul>
        <p className="filter-group__note">
          Every body on the board is a development, not an organisation. The
          <em> shape</em> tells you who demonstrated it; the <em>colour</em> tells
          you which constellation it belongs to. Click a name to show only its work.
        </p>
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
  resizeTick,
  forecast,
  showLegend,
  onToggleLegend,
  pool,
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
  resizeTick: number
  forecast?: Forecast
  showLegend: boolean
  onToggleLegend: () => void
  pool: FrontierItem[]
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
  /**
   * Bodies the reader has dragged. They no longer stay where they were put —
   * each decays back into its orbit over about eight seconds, so the system
   * returns to a truthful arrangement without anyone having to reset it.
   */
  const manual = useRef(new Map<string, { x: number; y: number; releasedAt: number }>())
  /**
   * Auto-rotation pauses while the reader is interacting, then resumes.
   *
   * performance.now(), NOT Date.now(). The draw loop is given a performance
   * timestamp, and mixing the two epochs made every idle comparison come out
   * around minus 1.7 trillion — so the easing term was permanently zero and
   * nothing ever turned.
   */
  const idleSince = useRef(performance.now())
  /**
   * Accumulated drift, kept OUT of React state.
   *
   * Setting camera state each frame re-ran the effect, cancelled the animation
   * frame and started a new one — sixty times a second, fighting itself. The
   * spin is added to the camera at projection time instead, and only folded
   * back into state when the reader takes hold of it.
   */
  const spin = useRef(0)
  /** Perspective scale per node while in orbit — drives size and depth fade. */
  const depthOf = useRef(new Map<string, { scale: number; depth: number }>())
  /** Live timeline projection, so hit testing uses the same maths as drawing. */
  const tlProject = useRef<{ TX: (x: number) => number; TY: (y: number) => number } | null>(null)
  /** The legend button's box, so a click can find it. */
  const legendButton = useRef<{ x: number; y: number; s: number } | null>(null)
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

  /** Ids nobody has read. Marked on the board, not only in the detail panel. */
  const unreviewed = useMemo(
    () =>
      new Set(
        allFrontier.filter((i) => i.review?.state === 'agent-merged').map((i) => i.id),
      ),
    [],
  )

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

  /**
   * Only accept a genuinely different box.
   *
   * A fresh object every observation re-renders on sub-pixel jitter, and a
   * component that re-renders whenever it is observed is one small mistake away
   * from an update loop.
   */
  /**
   * The zoom level at which the whole board is inside the frame.
   *
   * Below this there is nothing more to reveal, so it becomes the floor —
   * which is also what removes the need to scroll at all.
   */
  const fitScale = useMemo(() => {
    if (nodes.length === 0) return 0.35
    const xs = nodes.map((n) => n.x)
    const ys = nodes.map((n) => n.y)
    const w = Math.max(0.12, Math.max(...xs) - Math.min(...xs))
    const h = Math.max(0.12, Math.max(...ys) - Math.min(...ys))
    return Math.max(0.18, Math.min(1, Math.min(1 / w, 1 / h) * 0.82))
  }, [nodes])

  const applySize = (w: number, h: number) =>
    setSize((s) => (Math.abs(s.w - w) < 0.5 && Math.abs(s.h - h) < 0.5 ? s : { w, h }))

  useEffect(() => {
    if (!wrap.current) return
    const ro = new ResizeObserver(([e]) => applySize(e.contentRect.width, e.contentRect.height))
    ro.observe(wrap.current)
    return () => ro.disconnect()
  }, [])

  // A frame resize changes the box without the observer always firing in time.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const r = el.getBoundingClientRect()
    applySize(r.width, r.height)
  }, [resizeTick])

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

      // Slow drift around the tilt axis. Barely perceptible frame to frame,
      // clearly moved if you look away and back.
      if (mode === 'orbit' && !reduced && !camDrag.current && !nodeDrag.current) {
        const idleFor = (now - idleSince.current) / 1000
        const ease = Math.min(1, Math.max(0, (idleFor - 1.5) / 2.5))
        spin.current += 0.09 * dt * ease
      }
      const liveCam = { ...cam, yaw: cam.yaw + spin.current }

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

        // The Q-Day range, drawn on the time axis it actually refers to. A
        // forecast shown beside a timeline is a number; drawn on it, it is a
        // claim you can see against the evidence.
        if (forecast?.estimates) {
          const { aggressive, conservative, central } = forecast.estimates
          const lo = aggressive ?? central
          const hi = conservative ?? central
          if (lo && hi) {
            const x1 = TX(yearFraction(lo, tl.from, tl.to))
            const x2 = TX(yearFraction(hi, tl.from, tl.to))
            g.globalAlpha = 0.07
            g.fillStyle = colour
            g.fillRect(x1, 24, Math.max(2, x2 - x1), H - 30)
            g.globalAlpha = 0.5
            g.strokeStyle = colour
            g.setLineDash([3, 4])
            for (const x of [x1, x2]) {
              g.beginPath()
              g.moveTo(x, 24)
              g.lineTo(x, H - 6)
              g.stroke()
            }
            g.setLineDash([])
            g.fillStyle = colour
            const tag = `Q-DAY ${lo}–${hi}${forecast.state === 'agent-estimate' ? ' · AGENT' : ''}`
            g.fillText(tag, x1 + 5, H - 12)
            g.globalAlpha = 1
          }
        }

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

        /**
         * How many labels this plot can carry.
         *
         * The previous formula gave (W × H) / 5000, which on a normal frame is
         * over two hundred — a budget larger than the number of marks, and so
         * no budget at all. What actually constrains a timeline is rows of text
         * against height, plus a little for width, and the honest number is
         * about a dozen at rest rather than fifty.
         */
        const labelBudget = Math.max(
          4,
          Math.min(
            26,
            Math.round((H / 95 + W / 420) * Math.min(2.6, Math.max(0.75, v.k * 0.85))),
          ),
        )

        const ordered = [...tl.marks].sort(
          (a, b) =>
            Number(a.id === selected) - Number(b.id === selected) ||
            Number(a.id === hoverRef.current) - Number(b.id === hoverRef.current) ||
            a.importance - b.importance,
        )
        // Labels are claimed most-important-first, so the budget goes to the
        // marks worth reading rather than whichever happened to be drawn first.
        const labelOrder = [...ordered].reverse()
        const labelRank = new Map(labelOrder.map((m, i) => [m.id, i]))
        const dim = selected !== null
        const placed: { x: number; y: number; w: number }[] = []

        for (const m of ordered) {
          const px = TX(m.x)
          const py = TY(m.y)
          if (px < AXIS - 20 || px > W + 20) continue
          const sel = selected === m.id
          const hov = hoverRef.current === m.id

          // The item first: everything below is derived from it.
          const item = pool.find((i) => i.id === m.id)

          // Same hue system as the galaxy, so a body is recognisably the same
          // body in both views.
          const tint = m.sourced
            ? constellationColour(item?.constellation)
            : constellationMuted(item?.constellation)

          /**
           * Size from evidence and priority, which are discrete and genuinely
           * spread, rather than from the blended importance score — that
           * clusters most sourced items above 0.7, so everything came out the
           * same size. Range is roughly 3px to 13px.
           */
          const evidenceWeight =
            { E5: 1, E4: 0.82, E3: 0.6, E2: 0.42, E1: 0.24, E0: 0.12 }[
              item?.evidence?.level ?? 'E1'
            ] ?? 0.24
          const priorityWeight =
            { P0: 1, P1: 0.78, P2: 0.5, P3: 0.28, P4: 0.14 }[item?.priority ?? 'P3'] ?? 0.28
          const weight = evidenceWeight * 0.55 + priorityWeight * 0.45
          const rr = (3 + weight * 10) * (sel ? 1.5 : hov ? 1.2 : 1)

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
          g.globalAlpha = (dim && !sel ? 0.25 : 1) * (0.45 + m.importance * 0.55)
          g.shadowColor = tint
          g.shadowBlur = 3 + m.importance * 20
          // The same celestial shapes as the galaxy, so a body is recognisable
          // across both views. A field of identical discs tells you only where
          // things are, never what they are.
          drawBody(g, item?.actors?.[0] ? glyphFor(item.actors[0]) : 'star', px, py, rr, tint, m.sourced)
          g.shadowBlur = 0

          // A ring for the things that would change an assumption.
          if (item?.priority === 'P0' || item?.priority === 'P1') {
            g.globalAlpha = dim && !sel ? 0.2 : 0.55
            g.strokeStyle = tint
            g.lineWidth = 1
            g.beginPath()
            g.arc(px, py, rr + 4.5, 0, Math.PI * 2)
            g.stroke()
          }

          if (unreviewed.has(m.id)) {
            g.globalAlpha = 0.75
            g.strokeStyle = '#FFB020'
            g.lineWidth = 1
            g.setLineDash([2, 3])
            g.beginPath()
            g.arc(px, py, rr + 5, 0, Math.PI * 2)
            g.stroke()
            g.setLineDash([])
          }

          if (sel || hov) {
            g.globalAlpha = 1
            g.strokeStyle = tint
            g.lineWidth = 1.4
            g.beginPath()
            g.arc(px, py, rr + 8, 0, Math.PI * 2)
            g.stroke()
          }

          // Labels: capped by how much room there is, not only by merit.
          //
          // A threshold alone was useless here — most sourced items score
          // above 0.7, so "only the important ones" meant almost all of them.
          // The cap rises as you zoom, so detail arrives when asked for.
          const wantLabel =
            sel || hov || ((labelRank.get(m.id) ?? 999) < labelBudget && m.importance > 0.35)
          if (wantLabel) {
            const text = m.label
            const tw = g.measureText(text).width
            let lx = px + rr + 7
            if (lx + tw > W - 6) lx = px - rr - 7 - tw
            lx = Math.max(AXIS + 4, lx)
            let ly = py + 4
            let guard = 0
            // Four nudges, not twelve. A label pushed sixty pixels from its own
            // mark has stopped labelling anything and is just more text.
            while (
              guard++ < 4 &&
              placed.some(
                (o) => Math.abs(o.y - ly) < 14 && !(lx + tw < o.x - 4 || lx > o.x + o.w + 4),
              )
            ) {
              ly += 14
            }
            if (guard < 4 || sel || hov) {
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

        // Category key, tucked behind a small button in the corner. The nine
        // names take up real estate that the plot needs more than they do, so
        // it is closed until asked for — and the button stays visible so it is
        // findable without hunting through a toolbar.
        {
          // Bottom left. The plot crowds toward the recent years on the right,
          // and the early years are mostly empty — so the space is there.
          const size = 22
          const bx = AXIS + 10
          const by = H - size - 12
          legendButton.current = { x: bx, y: by, s: size }

          g.globalAlpha = 0.92
          g.fillStyle = '#0B1220'
          g.beginPath()
          g.roundRect(bx, by, size, size, 3)
          g.fill()
          g.globalAlpha = showLegend ? 0.95 : 0.6
          g.strokeStyle = colour
          g.lineWidth = 1.2
          g.stroke()

          // Three dots in the categories' own colours: the key, in miniature.
          const sample = CONSTELLATIONS.filter((c) => activeCons.includes(c))
          ;[0, 1, 2].forEach((i) => {
            const c = sample[Math.floor((i * sample.length) / 3)] ?? sample[0]
            if (!c) return
            g.fillStyle = constellationColour(c)
            g.beginPath()
            g.arc(bx + 5 + i * 4.5, by + size / 2, 1.8, 0, Math.PI * 2)
            g.fill()
          })
          g.globalAlpha = 1

          if (showLegend) {
            const entries = CONSTELLATIONS.filter((c) => activeCons.includes(c))
            const lh = 14
            const boxW = 138
            const boxH = entries.length * lh + 14
            const lx = bx
            const ly = by - boxH - 6
            g.globalAlpha = 0.94
            g.fillStyle = '#0B1220'
            g.beginPath()
            g.roundRect(lx, ly, boxW, boxH, 3)
            g.fill()
            g.globalAlpha = 0.3
            g.strokeStyle = '#8697B0'
            g.stroke()
            entries.forEach((c, i) => {
              const y = ly + 15 + i * lh
              g.globalAlpha = 1
              g.fillStyle = constellationColour(c)
              g.beginPath()
              g.arc(lx + 13, y - 3.5, 3.4, 0, Math.PI * 2)
              g.fill()
              g.fillStyle = '#A9B6C9'
              g.fillText(CONSTELLATION_LABEL[c], lx + 24, y)
            })
            g.globalAlpha = 1
          }
        }

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
      // Release held bodies gradually rather than snapping them back.
      for (const [id, held] of manual.current) {
        if (nodeDrag.current?.id === id) continue
        const heldFor = (Date.now() - held.releasedAt) / 1000
        if (heldFor > 8) manual.current.delete(id)
      }

      for (const n of nodes) {
        const held = manual.current.get(n.id)
        const ring = orbit3d.get(n.id)
        let projected: { x: number; y: number } | null = null
        if (mode === 'orbit' && ring && !held) {
          const q = project(ringPosition(ring.angle, ring.radius, ring.lift), liveCam)
          depthOf.current.set(n.id, { scale: q.scale, depth: q.depth })
          projected = { x: q.sx, y: q.sy }
        }
        const home = projected ?? targets.get(n.id) ?? { x: n.x, y: n.y }
        let tgt = home
        if (held) {
          if (nodeDrag.current?.id === n.id) {
            tgt = held
          } else {
            // Ease from where it was dropped back toward its orbit.
            const t01 = Math.min(1, (Date.now() - held.releasedAt) / 8000)
            const k = t01 * t01 * (3 - 2 * t01) // smoothstep
            tgt = { x: held.x + (home.x - held.x) * k, y: held.y + (home.y - held.y) * k }
          }
        }
        const a = anim.current.get(n.id) ?? { x: n.x, y: n.y }
        const speed =
          nodeDrag.current?.id === n.id ? 1 : held ? 0.25 : projected ? 1 : reduced ? 1 : 0.09
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

        // Q-Day on the galaxy. There is no time axis here, so it is a caption
        // rather than a band — but the figure belongs on every view, not only
        // the one where it can be drawn to scale.
        if (forecast?.estimates) {
          const { aggressive, conservative } = forecast.estimates
          if (aggressive && conservative) {
            const txt = `Q-DAY ${aggressive}–${conservative}${forecast.state === 'agent-estimate' ? ' · AGENT ESTIMATE' : ''}`
            g.globalAlpha = 0.55
            g.fillStyle = colour
            g.fillText(txt, 8, H - 10)
            g.globalAlpha = 1
          }
        }

        // Category names fade out as you zoom in — at close range they clutter
        // exactly the thing you are trying to read.
        const zoomFade = Math.max(0, Math.min(1, (1.7 - v.k) / 0.5))
        if (zoomFade > 0.02) {
          // Nine names across a narrow frame will not fit on one line, and
          // running them together is worse than showing fewer. Stagger onto two
          // rows, truncate to the lane, and drop any that still collide.
          const laneW = (W - PAD) / CONSTELLATIONS.length
          const placedNames: { x: number; w: number; row: number }[] = []
          CONSTELLATIONS.forEach((c, i) => {
            if (!activeCons.includes(c)) return
            const cx = X(CONSTELLATION_HOME[c] ?? 0.5)
            if (cx < PAD - 40 || cx > W + 40) return

            let label = CONSTELLATION_LABEL[c].toUpperCase()
            let tw = g.measureText(label).width
            const budget = laneW * 1.7
            while (tw > budget && label.length > 4) {
              label = label.slice(0, -2)
              tw = g.measureText(label + '…').width
            }
            if (label !== CONSTELLATION_LABEL[c].toUpperCase()) label += '…'
            tw = g.measureText(label).width

            const row = i % 2
            const x = cx - tw / 2
            const clash = placedNames.some(
              (o) => o.row === row && !(x + tw < o.x - 6 || x > o.x + o.w + 6),
            )
            if (clash) return
            placedNames.push({ x, w: tw, row })

            g.fillStyle = constellationColour(c)
            g.globalAlpha = (row === 0 ? 0.9 : 0.65) * zoomFade
            g.fillText(label, Math.max(4, x), 18 + row * 13)
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
            const q = project(ringPosition(a, radius, 0), liveCam)
            const sx = X(q.sx)
            const sy = Y(q.sy)
            if (k === 0) g.moveTo(sx, sy)
            else g.lineTo(sx, sy)
          }
          g.stroke()

          const q = project(ringPosition(Math.PI, radius, 0), liveCam)
          const txt = lvl.toUpperCase()
          const w = g.measureText(txt).width
          g.globalAlpha = 0.9
          g.fillStyle = '#070B14'
          g.fillRect(X(q.sx) - w - 9, Y(q.sy) - 15, w + 8, 14)
          g.globalAlpha = 1
          g.fillStyle = 'rgba(134,151,176,0.9)'
          g.fillText(txt, X(q.sx) - w - 5, Y(q.sy) - 5)
        })

        const c0 = project({ x: 0, y: 0, z: 0 }, liveCam)
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
      // With little room, only the highest-ranked items keep a label.
      const roomy = W * H > 520000
      const labelFloor = roomy ? 2 : 2.8
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
        // Hue carries the constellation and nothing else.
        //
        // Actor used to shift the hue by up to 34 degrees, but adjacent
        // constellations are only 14 apart — so the tint scrambled the very
        // association the colour was there to make. Actor is carried by the
        // glyph shape, which was always the better channel for it.
        const bodyColour = n.sourced
          ? constellationColour(n.constellation)
          : constellationMuted(n.constellation)
        // Derive the glyph from the actor here rather than trusting whatever
        // was baked into the node — otherwise the shape on the board and the
        // shape in the Actors panel are computed by different routes and drift
        // apart, which is exactly what "the icons are mixed up" looks like.
        const glyph = n.actor ? glyphFor(n.actor) : n.glyph
        drawBody(g, glyph, px, py, r, bodyColour, n.sourced)
        g.shadowBlur = 0

        // Unreviewed items carry a dashed ring wherever they appear. The label
        // in the panel is not enough — someone scanning the board must be able
        // to see which bodies nobody has checked.
        if (unreviewed.has(n.id)) {
          g.globalAlpha = 0.75 * fade
          g.strokeStyle = '#FFB020'
          g.lineWidth = 1
          g.setLineDash([2, 3])
          g.beginPath()
          g.arc(px, py, r + 5, 0, Math.PI * 2)
          g.stroke()
          g.setLineDash([])
        }

        if (sel || hov) {
          g.globalAlpha = 1
          g.strokeStyle = colour
          g.lineWidth = sel ? 1.6 : 1
          g.beginPath()
          g.arc(px, py, r + 10, 0, Math.PI * 2)
          g.stroke()
        }

        // How many labels the frame can carry, rather than how many items
        // deserve one. Thirty-three sourced items in a narrow panel is a wall
        // of text; the same board full-screen can carry them all.
        const capacity = Math.max(4, Math.floor((W * H) / 26000))
        const inFocus = mode === 'orbit' && n.constellation === focusCon
        const earns =
          n.attention > 0.15 ||
          (n.sourced && n.rank >= labelFloor) ||
          v.k > 2.2
        const showLabel = sel || hov || inFocus || earns
        if (showLabel && off > 0.5 && (labelQueue.length < capacity || sel || hov || inFocus)) {
          labelQueue.push({ n, px, py, top: sel || hov })
        }
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
  }, [size, nodes, links, targets, colour, selected, view, activeCons, mode, focusCon, tl, cam, orbit3d, unreviewed, forecast, showLegend, pool, fitScale])

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
    idleSince.current = performance.now()
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
    idleSince.current = performance.now()

    // The legend button takes the pointer before anything else.
    const lb = legendButton.current
    if (tl && lb) {
      const r = cv.current!.getBoundingClientRect()
      const px = e.clientX - r.left
      const py = e.clientY - r.top
      if (px > lb.x - 3 && px < lb.x + lb.s + 3 && py > lb.y - 3 && py < lb.y + lb.s + 3) {
        onToggleLegend()
        return
      }
    }

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
      // Fold the accumulated drift into the camera before dragging, so
      // grabbing it does not snap back to where the spin started.
      const yawNow = cam.yaw + spin.current
      spin.current = 0
      setCam({ ...cam, yaw: yawNow })
      camDrag.current = {
        x: e.clientX,
        y: e.clientY,
        yaw: yawNow,
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
        releasedAt: Date.now() + 1e9, // held while dragging; set properly on release
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
    idleSince.current = performance.now()
    if (nd) {
      const held = manual.current.get(nd.id)
      if (held) held.releasedAt = Date.now()
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

  useEffect(() => {
    manual.current.clear()
    spin.current = 0
    idleSince.current = performance.now()
  }, [mode, focusCon])

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
        <div>
          <dt><GlyphMark glyph="comet" colour={colour} /></dt>
          <dd>
            Shape is the organisation behind it. Colour is the constellation.
            Nothing on the board represents an organisation itself — every body
            is a development.
          </dd>
        </div>
      </dl>

      <p>
        A <strong>dashed amber ring</strong> means a research agent published
        that entry and no human has read it yet. Its sources are real, but
        nobody has confirmed the judgement. Open it to see when it was
        published and by which agent.
      </p>

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

/** Human-readable age, so nobody has to subtract dates in their head. */
function ago(date?: string): string {
  if (!date) return 'unknown'
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 864e5)
  if (days < 1) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 31) return `${days} days ago`
  if (days < 365) return `${Math.round(days / 30.44)} months ago`
  return `${(days / 365).toFixed(1)} years ago`
}

/**
 * One filter group with its own select-all and select-none.
 *
 * Shared controls across three groups meant clearing constellations also
 * cleared readiness and years, which is never what anybody wants.
 */
function FilterSection({
  label,
  all,
  selected,
  onChange,
  render,
  swatch,
  note,
}: {
  label: string
  all: string[]
  selected: string[]
  onChange: (next: string[]) => void
  render: (v: string) => string
  swatch?: (v: string) => string
  note?: string
}) {
  if (all.length === 0) return null
  const none = selected.length === 0
  const every = selected.length === all.length

  return (
    <section className="filter-group">
      <header>
        <span className="label">{label}</span>
        <span className="filter-group__actions">
          <button onClick={() => onChange([...all])} disabled={every}>All</button>
          <button onClick={() => onChange([])} disabled={none}>None</button>
        </span>
      </header>

      <ul className="filter-list">
        {all.map((v) => {
          const on = selected.includes(v)
          return (
            <li key={v}>
              <label>
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() =>
                    onChange(on ? selected.filter((x) => x !== v) : [...selected, v])
                  }
                />
                {swatch && (
                  <span
                    className="filter-swatch"
                    style={{ background: swatch(v), opacity: on ? 1 : 0.25 }}
                    aria-hidden="true"
                  />
                )}
                <span style={{ opacity: on ? 1 : 0.45 }}>{render(v)}</span>
              </label>
            </li>
          )
        })}
      </ul>

      {note && <p className="filter-group__note">{note}</p>}
    </section>
  )
}

function Detail({ item, definition }: { item: FrontierItem; definition?: string }) {
  const colour = PILLAR_SPECTRUM[item.pillar].colour
  const needsSource = item.evidence.claim.startsWith('NEEDS PRIMARY SOURCE')
  const rev = item.review

  return (
    <div className="detail">
      <div className="meta">
        <span className="badge" style={{ color: colour, borderColor: colour }}>{item.readiness}</span>
        <span className="badge">{item.constellation}</span>
        {item.evidence.level && <span className="badge">{item.evidence.level}</span>}
        {item.priority && <span className="badge">{item.priority}</span>}
        {needsSource && <span className="badge" data-conf="low">unsourced</span>}
      </div>

      {/* Provenance first, before any claim. The reader should know who stands
          behind this before they read what it says. */}
      <div style={{ marginTop: 'var(--gap-s)' }}>
        {rev?.state === 'agent-merged' ? (
          <span className="prov prov--agent">
            <span className="prov__dot" />
            Agent-merged — not yet reviewed
          </span>
        ) : rev?.state === 'vetoed' ? (
          <span className="prov prov--vetoed">
            <span className="prov__dot" />
            Vetoed
          </span>
        ) : (
          <span className="prov">
            <span className="prov__dot" />
            Reviewed {ago(rev?.on)}
          </span>
        )}
      </div>

      {rev?.state === 'agent-merged' && (
        <p className="prov-note">
          <strong>Published by the {rev.agent ?? 'research'} agent</strong>{' '}
          {ago(rev.agentMergedOn)}, without human review. The sources below are
          real and were checked by the agent, but nobody has yet read this entry
          and confirmed it. Weigh it accordingly.
        </p>
      )}

      <h3>{item.title}</h3>
      {item.summary && <p>{item.summary}</p>}
      <div className="plain">
        <span className="label">In plain English</span>
        {item.plain && <p className="plain__what">{item.plain}</p>}
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

      {typeof item.qdayImpact === 'number' && item.qdayImpact !== 0 && (
        <div className="plain">
          <span className="label">
            Q-Day impact {item.qdayImpact > 0 ? `+${item.qdayImpact}` : item.qdayImpact}
          </span>
          {item.qdayReasoning && <p>{item.qdayReasoning}</p>}
        </div>
      )}

      {item.actors && item.actors.length > 0 && (
        <p className="actors">
          <span className="label">Demonstrated by</span> {item.actors.join(' · ')}
          {item.country?.length ? ` · ${item.country.join(', ')}` : ''}
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
