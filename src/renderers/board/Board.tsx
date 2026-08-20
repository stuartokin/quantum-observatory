import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { lazyWithReload } from '../../components/lazyWithReload'
import { allFrontier } from '../../content/frontier'
import type { FrontierItem, Readiness } from '../../content/frontierTypes'
import { PILLAR_SPECTRUM } from '../../palette'
import {
  constellationColour,
  constellationMuted,
  supergroupOf,
  supergroupColour,
  supergroupHome,
  SUPERGROUPS,
  SUPERGROUP_LABEL,
  type Supergroup,
} from '../../constellationPalette'
import { formatBuildTime } from '../../buildInfo'
import {
  LEVELS,
  CONSTELLATIONS,
  CONSTELLATION_LABEL,
  CONSTELLATION_HOME,
  layout,
  isSourced,
  type Node,
} from './tower'
// glyphFor comes from here, not from tower.
//
// tower exports its own, and Board was importing that one — so rewriting the
// glyph rules in this module changed nothing on screen. Two functions with one
// name is a trap; there is now only one.
import {
  drawBody,
  glyphFor,
  glyphForType,
  actorType,
  ACTOR_TYPES,
  ACTOR_TYPE_LABEL,
  type ActorType,
} from './glyphs'
import { layoutTimeline, yearFraction, GUTTER, dateOf, datedOf, PRECISION_NOTE } from './timeline'
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
import { News, Teaser, QDayBar } from '../../components/Panels'
import { goToQDay, hrefFor, takeHelpRequest } from '../../qday/route'
import { MiniOrbit, mostChanged } from '../../components/MiniOrbit'
import { Ticker } from '../../components/Ticker'
import { questionsFor } from '../../content/questions'
import { GlyphMark } from '../../components/GlyphMark'

/**
 * Loaded when the panel is opened, not before.
 *
 * Help carries the markdown renderer and every document in the project. Most
 * readers never open it, and it was costing everyone the download.
 */
const Help = lazyWithReload('Help', () => import('../../components/Help'))
const NewsArchive = lazyWithReload('NewsArchive', () => import('../../components/NewsArchive'))
const NewsDetail = lazyWithReload('NewsDetail', () => import('../../components/NewsDetail'))
const Questions = lazyWithReload('Questions', () => import('../../components/Questions'))
const Key = lazyWithReload('Key', () => import('../../components/Key'))
import { recentNews, newsFor, newsAbout, allNews } from '../../content/newsroom'
import type { NewsItem } from '../../content/newsTypes'
import { buildNews, headlines } from './news'
import { forecastFor, type Forecast } from '../../content/forecast'
import { Toolbar, type ToolbarButton } from '../../components/Toolbar'
import { AppMenu } from '../../components/AppMenu'

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
  const [cam, setCam] = useState<Camera>(DEFAULT_CAMERA)
  const [focusCon, setFocusCon] = useState<string | null>(null)
  const [statsOpen, setStatsOpen] = useState(false)
  /** Years excluded from view. Filtering time frees space in both views. */
  const [hiddenYears, setHiddenYears] = useState<Set<number>>(new Set())
  /** The key starts closed. It is reference, and the plot is the point. */
  /** The item under the pointer, so the frame bar can name who is behind it. */
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  /** Kinds of organisation to show. Empty is meaningless, so null means all. */
  const [orgTypes, setOrgTypes] = useState<ActorType[] | null>(null)

  /**
   * Honing: show one field, one readiness band, or one year.
   *
   * Clicking a label means "only this", not "hide this". A reader clicking
   * Cryptography wants to see cryptography — one gesture rather than unticking
   * eight boxes. Clicking the same label again clears it.
   *
   * These sit alongside the checkbox filters rather than replacing them, and
   * the panel reflects them: two sources of truth about what is shown, with no
   * way to tell which is authoritative, is the fault the year toggle had.
   */
  const [onlyGroup, setOnlyGroup] = useState<Supergroup | null>(null)
  const [onlyLevel, setOnlyLevel] = useState<string | null>(null)
  const [onlyYear, setOnlyYear] = useState<number | null>(null)

  /**
   * One place that decides what a clicked label does.
   *
   * Clicking the same label again clears it; anything else replaces it. Two
   * hones of the same kind at once is not a thing a reader can mean.
   */
  const hone = (kind: 'group' | 'level' | 'year', value: string) => {
    if (kind === 'group') setOnlyGroup((c) => (c === value ? null : (value as Supergroup)))
    else if (kind === 'level') setOnlyLevel((c) => (c === value ? null : value))
    else {
      const yr = Number(value)
      setOnlyYear((c) => (c === yr ? null : yr))
    }
  }
  const [openNews, setOpenNews] = useState<NewsItem | null>(null)
  /** Headlines are off by default — there will eventually be a great many. */
  const [showNewsOverlay, setShowNewsOverlay] = useState(false)
  /** The timeline has its own camera; sharing one made each view jump. */
  const [tlView, setTlView] = useState({ k: 1, tx: 0, ty: 0 })


  /** The constellation window has its own camera too. */
  const [orbitView, setOrbitView] = useState({ k: 1, tx: 0, ty: 0 })
  /**
   * The last two years, as a camera position rather than a filter.
   *
   * Filtering the items changed the axis range under them, so a body moved to a
   * different year when the window changed and zooming out could not recover
   * the years that had been removed. Every item is always present; the view
   * simply starts framed on the recent end.
   */
  /** Strip across the page, or a window with the whole history. */
  const [headlineMode, setHeadlineMode] = useState<'ticker' | 'archive'>('ticker')

  /**
   * The two views want opposite shapes — a ticker is one row across the page,
   * an archive is a column. Switching resizes the window rather than leaving
   * the reader to do it, and returns it to the strip when they switch back.
   */
  const setHeadlineView = (mode: 'ticker' | 'archive') => {
    setHeadlineMode(mode)
    setFrames((f) => ({
      ...f,
      headlines:
        mode === 'ticker'
          ? { ...f.headlines, x: 12, y: 74, w: window.innerWidth - 24, h: 34, docked: false }
          : {
              ...f.headlines,
              x: Math.max(12, Math.round(window.innerWidth * 0.06)),
              y: 96,
              w: Math.min(620, window.innerWidth - 40),
              h: Math.min(620, window.innerHeight - 190),
              docked: false,
            },
    }))
    setOrder((o) => [...o.filter((x) => x !== 'headlines'), 'headlines'])
  }
  /**
   * The figures live behind the icon at every width now.
   *
   * Shown inline they took most of the header, squeezed the title to
   * "The frontier, b…" and still collided with the Q-Day bar. They are
   * reference, consulted occasionally; the title is what the page is.
   */
  const narrow = true

  const [cons, setCons] = useState<string[]>([...CONSTELLATIONS])
  const [levels, setLevels] = useState<Readiness[]>([...LEVELS])
  /**
   * Actors are a multi-select filter now, alongside the others, rather than a
   * separate window with click-one-at-a-time behaviour. Empty means all — the
   * same convention every other section uses.
   */
  const [actorsOn, setActorsOn] = useState<string[] | null>(null)
  const [sourcedOnly, setSourcedOnly] = useState(false)

  // The opening workspace: galaxy dominant, teaser and news beside it on a
  // wide screen, everything else in the toolbar until asked for.
  const [frames, setFrames] = useState<Record<string, FrameState>>(() =>
    defaultLayout(window.innerWidth, window.innerHeight),
  )
  const setFrame = (k: string) => (s: FrameState) => setFrames((f) => ({ ...f, [k]: s }))
  const openHeadline = (n: NewsItem) => {
    setOpenNews(n)
    setFrames((f) => ({ ...f, newsitem: { ...f.newsitem, docked: false } }))
    setOrder((o) => [...o.filter((x) => x !== 'newsitem'), 'newsitem'])
  }
  const dock = (k: string) => () => setFrames((f) => ({ ...f, [k]: { ...f[k], docked: true } }))
  const [order, setOrder] = useState<string[]>([
    'galaxy', 'constellation', 'timeline', 'questions', 'key', 'teaser', 'news', 'headlines', 'newsitem',
    'filters', 'help', 'detail',
  ])
  const raise = (k: string) => () => setOrder((o) => [...o.filter((x) => x !== k), k])
  const zOf = (k: string) => 30 + order.indexOf(k)

  /**
   * Bring a window back where it can be seen.
   *
   * A frame keeps its last position while docked, and that position may now be
   * off screen, behind something, or beyond a window that has since been
   * resized. Opening something and not finding it reads as the click having
   * failed.
   */

  const intoView = (st: FrameState): FrameState => {
    const W = window.innerWidth
    const H = window.innerHeight
    const w = Math.min(st.w, W - 16)
    const x = Math.max(8, Math.min(W - w - 8, st.x))
    const y = Math.max(64, Math.min(H - 160, st.y))
    // Height from the CLAMPED y, not the original. Using the old value gave a
    // frame near the bottom a height that ran off the screen, so it opened
    // underneath whatever was already there and looked like it had not opened.
    const h = Math.max(120, Math.min(st.h, H - y - 24))
    return { ...st, x, y, w, h }
  }

  /**
   * Open a window in its own slot.
   *
   * Every path that reveals a docked frame goes through here, so they cannot
   * drift apart — the key, the constellation, the detail panel and the dock
   * all place a window the same way.
   */
  const openFrame = (k: string) =>
    setFrames((f) => {
      const home = defaultLayout(window.innerWidth, window.innerHeight)[k]
      return {
        ...f,
        [k]: { ...(home ?? intoView(f[k])), docked: false, maximised: false, restore: undefined },
      }
    })

  /**
   * One key, shared by every plot.
   *
   * Asking for it from a second window brings the existing one forward rather
   * than opening another — there is only one visual grammar, so there is only
   * one key.
   */
  const showKey = () => {
    if (frames.key.docked) openFrame('key')
    setOrder((o) => [...o.filter((x) => x !== 'key'), 'key'])
  }


  /**
   * Opening a docked window puts it back in its own slot.
   *
   * Restoring the last position sounds respectful and is not: while a window
   * is docked the layout moves on around it, so the stored box is stale by
   * definition and can land underneath something that has since been opened.
   * What Changed kept reappearing behind Journals for exactly this reason.
   *
   * The default layout is the one place that knows where each window belongs
   * relative to the others, so re-opening asks it rather than guessing.
   */
  const toggle = (k: string) => () => {
    setFrames((f) => {
      if (!f[k].docked) return { ...f, [k]: { ...f[k], docked: true } }
      const home = defaultLayout(window.innerWidth, window.innerHeight)[k]
      return {
        ...f,
        [k]: {
          ...(home ?? intoView(f[k])),
          docked: false,
          maximised: false,
          restore: undefined,
        },
      }
    })
    // Opening a window behind everything else is the same as not opening it.
    setOrder((o) => [...o.filter((x) => x !== k), k])
  }


  /** Canvases inside frames need telling when their box changed. */
  const [resizeTick, setResizeTick] = useState(0)
  const bump = () => setResizeTick((n) => n + 1)
  /** Reset puts the toolbar back too, not only the frames. */
  const [resetTick, setResetTick] = useState(0)

  /** Stacking order. Last in the list is nearest the reader. */

  const pool = useMemo(
    () => allFrontier.filter((i) => i.pillar === galaxy && i.status !== 'archived'),
    [galaxy],
  )

  /** Actors by how much of the board they account for, most prolific first. */
  const actorCounts = useMemo(() => {
    const m = new Map<string, number>()
    for (const i of pool) for (const a of i.actors ?? []) m.set(a, (m.get(a) ?? 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  }, [pool])

  const actors = useMemo(() => actorCounts.map(([name]) => name), [actorCounts])

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
          (!actorsOn || (i.actors ?? []).some((a) => actorsOn.includes(a))) &&
          // An item with no actor recorded is never hidden by this: the filter
          // asks who did the work, and silence is not an answer to disagree
          // with.
          (!orgTypes ||
            (i.actors ?? []).length === 0 ||
            (i.actors ?? []).some((a) => orgTypes.includes(actorType(a)))) &&
          (!sourcedOnly || isSourced(i)) &&
          // Honing, from a clicked label. Narrower than the checkboxes and
          // applied on top of them, so a hone never reveals something a filter
          // has hidden.
          (!onlyGroup || supergroupOf(i.constellation) === onlyGroup) &&
          (!onlyLevel || i.readiness === onlyLevel) &&
          (() => {
            if (!onlyYear) return true
            const d = dateOf(i)
            // An undated item cannot be shown to belong to a year, so honing on
            // one excludes it — unlike the year checkboxes, which keep undated
            // items because hiding them would shrink the board silently. Here
            // the reader has asked for one year specifically.
            return d ? d.getFullYear() === onlyYear : false
          })(),
      ),
    [pool, cons, levels, actorsOn, sourcedOnly, hiddenYears, orgTypes, onlyGroup, onlyLevel, onlyYear],
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
  const headlines14 = useMemo(() => recentNews(galaxy, 14), [galaxy])
  const allHeadlines = useMemo(() => newsFor(galaxy), [galaxy])

  /** What the ticker is showing, and what is behind it. */
  /**
   * Who is behind the body under the pointer.
   *
   * This lived only inside the key, which is closed by default — so the answer
   * to "who did this" required opening a panel first. It belongs where the eye
   * already is.
   */
  const hoveredActor = useMemo(() => {
    if (!hoveredId) return null
    const it = pool.find((i) => i.id === hoveredId)
    const name = it?.actors?.[0]
    return name ? { name, type: actorType(name) } : null
  }, [hoveredId, pool])

  const headlineSpan = useMemo(() => {
    const span = (list: typeof allHeadlines) => {
      if (list.length === 0) return null
      const dates = list.map((n) => n.date).sort()
      return { from: dates[0], to: dates[dates.length - 1] }
    }
    return {
      rolling: { count: headlines14.length, ...(span(headlines14) ?? {}) },
      all: { count: allHeadlines.length, ...(span(allHeadlines) ?? {}) },
      linked: allHeadlines.filter((n) => n.establishedBy?.length).length,
      verified: allHeadlines.filter((n) => n.validation?.status === 'verified').length,
    }
  }, [headlines14, allHeadlines])

  const [headlineInfo, setHeadlineInfo] = useState(false)
  /**
   * Why this constellation, behind the title.
   *
   * It was a line of prose above the plot, which pushed the constellation out
   * of the panel — the explanation crowding out the thing it explains. The
   * title says which one; clicking it says why.
   */
  const [teaserWhy, setTeaserWhy] = useState(false)

  /**
   * Resizing chooses the view.
   *
   * Drag the window past a couple of rows and it becomes the archive; pull it
   * back down to a strip and it rolls again. Only the mode changes here — the
   * size is already whatever the reader just made it, and setting it again
   * would fight them.
   */
  useEffect(() => {
    const h = frames.headlines.h
    if (h > 90 && headlineMode === 'ticker') setHeadlineMode('archive')
    else if (h <= 90 && headlineMode === 'archive') setHeadlineMode('ticker')
  }, [frames.headlines.h, headlineMode])
  const changedIds = useMemo(() => new Set(teaserEntries.map((e) => e.id)), [teaserEntries])
  const forecast = useMemo(() => forecastFor(galaxy), [galaxy])
  const questions = useMemo(() => questionsFor(galaxy), [galaxy])
  const moved = useMemo(() => visible.filter((i) => i.moved?.on).length, [visible])

  /**
   * Review debt, shown rather than hidden. Agents publish without a human gate,
   * so the board has to be honest about how much of it nobody has read.
   */
  const debt = useMemo(() => {
    /**
     * Two different questions, and showing only one of them was misleading.
     *
     * `unreviewed` is how much no person has read. A reviewer agent can never
     * reduce it, because a machine checking a machine is not review — which
     * made the figure look stuck while the reviewer was working steadily.
     *
     * `checked` is how much a machine has at least been through. That is the
     * number that moves when the reviewer runs, and it belongs on screen.
     */
    const unchecked = pool.filter((i) => i.review?.state === 'agent-merged').length
    const checked = pool.filter((i) => i.review?.state === 'agent-reviewed').length
    const unreviewed = unchecked + checked
    const dates = pool
      .map((i) => (i.review?.state === 'reviewed' ? i.review.on : undefined))
      .filter((d): d is string => Boolean(d))
      .sort()
    const last = dates.length ? dates[dates.length - 1] : undefined
    const weeks = last
      ? Math.floor((Date.now() - new Date(last).getTime()) / 6.048e8)
      : undefined
    return { unreviewed, unchecked, checked, last, weeks }
  }, [pool])

  /**
   * Arriving from the Observatory's menu, with Help asked for.
   *
   * The flag is read once and cleared, so a later return to the board does not
   * reopen it. Nothing about this reaches the URL — a shared link should not
   * carry somebody else's open help panel.
   */
  useEffect(() => {
    if (!takeHelpRequest()) return
    setFrames((f) => ({ ...f, help: { ...f.help, docked: false } }))
  }, [])

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

  /**
   * A constellation opens in its own window.
   *
   * It used to take over the galaxy frame, so looking at one meant losing the
   * other — and the galaxy is the thing a reader navigates from. Two windows,
   * both open, is what they were asking for by clicking.
   */
  function enterOrbit(con: string) {
    setFocusCon(con)
    setMode('orbit')
    openFrame('constellation')
    setOrder((o) => [...o.filter((x) => x !== 'constellation'), 'constellation'])
    setCam(DEFAULT_CAMERA)
    setView({ k: 1, tx: 0, ty: 0 })
  }
  function leaveOrbit() {
    setMode('tower')
    setFocusCon(null)
    setFrames((f) => ({ ...f, constellation: { ...f.constellation, docked: true } }))
    setView({ k: 1, tx: 0, ty: 0 })
  }

  const buttons: ToolbarButton[] = [
    /**
     * The other surface, first, with a rule after it.
     *
     * The Observatory's dock opens with "Board" in exactly this slot. That
     * fixed leading position is the thing that makes two surfaces read as one
     * product: wherever you are, the way out is in the same place, and the
     * divider says the rest of the bar is about where you already are.
     *
     * It is `nav`, not a window — it has no docked state because it is not a
     * panel, it is somewhere you go. The href is real so it can be opened in
     * a second tab.
     */
    { key: 'qday', kind: 'nav', icon: 'Q', label: 'Q-Day', href: hrefFor('clocks') },
    { key: 'rule', divider: true, label: '' },
    ...(mode === 'orbit'
      ? [{ key: 'back', kind: 'nav' as const, icon: '←', label: '← Galaxy', onClick: leaveOrbit }]
      : []),
    { key: 'galaxy', icon: '✦', label: 'Galaxy', active: !frames.galaxy.docked,
      kind: 'window', onClick: toggle('galaxy') },
    {
      key: 'timeline',
      icon: '◷',
      label: 'Timeline',
      active: !frames.timeline.docked,
      kind: 'window',
      onClick: toggle('timeline'),
    },
    {
      key: 'questions',
      icon: '⁇',
      label: 'Questions',
      active: !frames.questions.docked,
      kind: 'window',
      onClick: toggle('questions'),
    },
    { key: 'filters', icon: '⌗', label: 'Filters', active: !frames.filters.docked,
      kind: 'window', onClick: toggle('filters') },
    { key: 'news', icon: '◰', label: 'Journals', active: !frames.news.docked,
      kind: 'window', onClick: toggle('news') },
    {
      key: 'headlines',
      icon: '⌁',
      label: 'Headlines',
      active: !frames.headlines.docked,
      kind: 'window',
      onClick: toggle('headlines'),
    },
    { key: 'teaser', icon: '△', label: 'Changed', active: !frames.teaser.docked,
      kind: 'window', onClick: toggle('teaser') },
    { key: 'help', icon: '?', label: 'Help', active: !frames.help.docked,
      kind: 'window', onClick: toggle('help') },
    {
      key: 'reset',
      icon: '⟲',
      label: 'Reset',
      onClick: () => {
        setView({ k: 1, tx: 0, ty: 0 })
        setFrames(defaultLayout(window.innerWidth, window.innerHeight))
        setResetTick((n) => n + 1)
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
        className="board-head app-head"
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
          <QDayBar forecast={forecast} colour={colour} onOpen={() => goToQDay()} />

          {/*
            The same three dots the Observatory has, in the same corner. It is
            an entry point rather than an owner: "Help" opens the help *window*
            that already exists here — moveable, resizable, parked beside the
            galaxy while you read — instead of a second panel that would have
            to be kept in step with it.
          */}
          <AppMenu
            items={[
              {
                key: 'help',
                label: 'Help & documentation',
                hint: 'Opens as a window you can move and keep open',
                onClick: () => setFrames((f) => ({ ...f, help: { ...f.help, docked: false } })),
              },
              {
                key: 'stats',
                label: 'Board statistics',
                hint: `v${VERSION} · what is sourced, what nobody has read`,
                onClick: () => setStatsOpen((v) => !v),
              },
              {
                key: 'reset',
                label: 'Reset the layout',
                hint: 'Every window back where it started, and the view re-centred',
                onClick: () => {
                  setView({ k: 1, tx: 0, ty: 0 })
                  setFrames(defaultLayout(window.innerWidth, window.innerHeight))
                  setResetTick((n) => n + 1)
                  bump()
                },
              },
            ]}
          />

          {(
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

          {statsOpen && (
            <div
              className="board-stats"
              style={{
                display: 'flex',
                flexDirection: narrow ? 'column' : 'row',
                alignItems: narrow ? 'flex-end' : 'baseline',
                flexWrap: narrow ? 'wrap' : 'nowrap',
                whiteSpace: 'nowrap',
                gap: narrow ? 5 : 12,
                minWidth: 0,
                flex: '0 1 auto',
                overflow: 'hidden',
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
                <span
                  className="board-stats__unreviewed"
                  title="Nobody has read these. The figure in brackets has at least been checked by the reviewer agent against its own sources."
                >
                  <b>{debt.unreviewed}</b> unreviewed
                  {debt.checked > 0 && <> ({debt.checked} checked)</>}
                </span>
              )}
              {debt.weeks !== undefined && (
                <span className={debt.weeks >= 8 ? 'board-stats__stale' : undefined}>
                  reviewed <b>{debt.weeks}w</b> ago
                </span>
              )}
              <span title={`Site built ${formatBuildTime()}`}>
                built <b>{formatBuildTime().replace(/,.*/, '')}</b>
              </span>
              <span style={{ opacity: 0.5 }}>v{VERSION}</span>
            </div>
          )}
        </div>
      </header>

      {/* Full width, under the header. A ticker in a panel is a list; across
          the page it is a wire, which is what it is for. */}
      <Frame
        title="Galaxy"
        state={frames.galaxy}
        onChange={setFrame('galaxy')}
        onDock={dock('galaxy')}
        accent={colour}
        z={zOf('galaxy')}
        onFocus={raise('galaxy')}
        onResized={bump}
        minWidth={360}
        minHeight={260}
        flush
        action={
          <>
            {hoveredActor && (
              <span className="frame__hovered">
                {hoveredActor.name} · {ACTOR_TYPE_LABEL[hoveredActor.type]}
              </span>
            )}
            <button
              className="frame__mode"
              onClick={showKey}
            >
              Key
            </button>
          </>
        }
      >
        <Sky
          onlyGroup={onlyGroup}
          onlyLevel={onlyLevel}
          onlyYear={onlyYear}
          onHone={hone}
          onHover={setHoveredId}
          nodes={nodes}
          colour={colour}
          selected={selected}
          onSelect={setSelected}
          view={view}
          setView={setView}
          activeCons={cons}
          mode="tower"
          focusCon={null}
          onEnterOrbit={enterOrbit}
          onLeaveOrbit={leaveOrbit}
          timeline={false}
          cam={cam}
          setCam={setCam}
          resizeTick={resizeTick}
          forecast={forecast}
          pool={pool}
          newsOverlay={showNewsOverlay}
          onOpenNews={openHeadline}
        />
      </Frame>

      {focusCon && (
        <Frame
          title={CONSTELLATION_LABEL[focusCon]}
          state={frames.constellation}
          onChange={setFrame('constellation')}
          onDock={leaveOrbit}
          onClose={leaveOrbit}
          accent={constellationColour(focusCon)}
          z={zOf('constellation')}
          onFocus={raise('constellation')}
          onResized={bump}
          minWidth={320}
          minHeight={240}
          flush
          action={
            <button
              className="frame__mode"
              onClick={showKey}
            >
              Key
            </button>
          }
        >
          <Sky
            onlyGroup={onlyGroup}
            onlyLevel={onlyLevel}
            onlyYear={onlyYear}
            onHone={hone}
            onHover={setHoveredId}
            nodes={nodes}
            colour={colour}
            selected={selected}
            onSelect={setSelected}
            view={orbitView}
            setView={setOrbitView}
            activeCons={cons}
            mode="orbit"
            focusCon={focusCon}
            onEnterOrbit={enterOrbit}
            onLeaveOrbit={leaveOrbit}
            timeline={false}
            cam={cam}
            setCam={setCam}
            resizeTick={resizeTick}
            forecast={forecast}
              pool={pool}
            newsOverlay={showNewsOverlay}
            onOpenNews={openHeadline}
          />
        </Frame>
      )}

      <Frame
        title="Timeline"
        state={frames.timeline}
        onChange={setFrame('timeline')}
        onDock={dock('timeline')}
        accent={colour}
        z={zOf('timeline')}
        onFocus={raise('timeline')}
        onResized={bump}
        minWidth={360}
        minHeight={220}
        flush
      >
        <Sky
          onlyGroup={onlyGroup}
          onlyLevel={onlyLevel}
          onlyYear={onlyYear}
          onHone={hone}
          onHover={setHoveredId}
          nodes={nodes}
          colour={colour}
          selected={selected}
          onSelect={setSelected}
          view={tlView}
          setView={setTlView}
          activeCons={cons}
          mode="tower"
          focusCon={null}
          onEnterOrbit={() => {}}
          onLeaveOrbit={() => {}}
          timeline
          cam={cam}
          setCam={setCam}
          resizeTick={resizeTick}
          forecast={forecast}
          pool={pool}
          newsOverlay={showNewsOverlay}
          onOpenNews={openHeadline}
        />
      </Frame>

      <Frame
        title="Key"
        state={frames.key}
        onChange={setFrame('key')}
        onClose={() => setFrames((f) => ({ ...f, key: { ...f.key, docked: true } }))}
        accent={colour}
        z={zOf('key')}
        onFocus={raise('key')}
        noMaximise
      >
        <Suspense fallback={<p className="label">Loading…</p>}>
          <Key activeCons={cons} colour={colour} hovered={hoveredActor} />
        </Suspense>
      </Frame>

      <Frame
        title="The twelve questions"
        state={frames.questions}
        onChange={setFrame('questions')}
        onDock={dock('questions')}
        accent={colour}
        z={zOf('questions')}
        onFocus={raise('questions')}
        flush
      >
        <Suspense fallback={<p className="label">Loading…</p>}>
          <Questions
            questions={questions}
            items={pool}
            news={allNews}
            colour={colour}
            onSelect={(id) => {
              setSelected(id)
              setFrames((f) => ({ ...f, detail: { ...f.detail, docked: false } }))
              setOrder((o) => [...o.filter((x) => x !== 'detail'), 'detail'])
            }}
            onOpenNews={(id) => {
              const n = allNews.find((x) => x.id === id)
              if (n) openHeadline(n)
            }}
          />
        </Suspense>
      </Frame>

      <Frame
        title={changedCon ? `What changed — ${CONSTELLATION_LABEL[changedCon.id]}` : 'What changed'}
        state={frames.teaser}
        onChange={setFrame('teaser')}
        onDock={dock('teaser')}
        accent={colour}
        z={zOf('teaser')}
        onFocus={raise('teaser')}
        onInfo={
          changedCon
            ? () => {
                setHeadlineInfo(false)
                setTeaserWhy((v) => !v)
                raise('teaser')()
              }
            : undefined
        }
        info={
          teaserWhy && changedCon ? (
            <div className="headline-info">
              <p>
                <strong>{CONSTELLATION_LABEL[changedCon.id]}</strong> is shown because it
                has {changedCon.reason}.
              </p>
              <p className="prov-note">
                The constellation with the heaviest change over the fortnight, weighted
                so a readiness move counts for more than a new source. Click any body to
                open it; click the name to enter the constellation.
              </p>
            </div>
          ) : undefined
        }
      >
        {changedCon && (
          <MiniOrbit
            constellation={changedCon.id}
            colour={colour}
            highlight={changedIds}
            onOpen={() => enterOrbit(changedCon.id)}
          />
        )}
        <Teaser
          entries={teaserEntries}
          colour={colour}
          onSelect={(id) => {
            // Open the detail panel, not merely highlight the body. A list of
            // changes whose entries do not take you to the change is a
            // notification, not a way in.
            setSelected(id)
            openFrame('detail')
            setOrder((o) => [...o.filter((x) => x !== 'detail'), 'detail'])
          }}
          onJump={(c) => enterOrbit(c)}
        />
      </Frame>

      <Frame
        title="Journals"
        state={frames.news}
        onChange={setFrame('news')}
        onDock={dock('news')}
        accent={colour}
        z={zOf('news')}
        onFocus={raise('news')}
      >
        <News weeks={news} colour={colour} onSelect={setSelected} />
      </Frame>

      {/* One window, two views. Moveable, resizable, minimisable in either —
          and the mode is remembered, which is the first step toward saving a
          layout per reader. */}
      <Frame
        title={headlineMode === 'ticker' ? 'Headlines' : 'Headlines by month'}
        state={frames.headlines}
        onChange={setFrame('headlines')}
        onDock={dock('headlines')}
        accent={colour}
        z={zOf('headlines')}
        onFocus={raise('headlines')}
        minWidth={280}
        // Both views shrink to a strip. A floor of 200 in the month view meant
        // it could never be dragged small enough to turn back into a ticker,
        // which is the gesture that is supposed to do it.
        minHeight={34}
        barOnly={headlineMode === 'ticker' && !frames.headlines.maximised}
        // A ticker filling the screen would be one line in a great deal of
        // nothing. Maximising asks for more, so it gets the archive.
        onMaximise={() => setHeadlineView('archive')}
        onInfo={() => {
          setTeaserWhy(false)
          setHeadlineInfo((v) => !v)
          raise('headlines')()
        }}
        action={
          headlineMode === 'archive' ? (
            <button className="frame__mode" onClick={() => setHeadlineView('ticker')}>
              Rolling
            </button>
          ) : undefined
        }
        info={
          headlineInfo ? (
            <div className="headline-info">
              <p>
                <strong>{headlineSpan.rolling.count}</strong> in the rolling view
                {headlineSpan.rolling.from && (
                  <> — the last fortnight, {headlineSpan.rolling.from} to {headlineSpan.rolling.to}</>
                )}
                .
              </p>
              <p>
                <strong>{headlineSpan.all.count}</strong> held in total
                {headlineSpan.all.from && (
                  <> — {headlineSpan.all.from} to {headlineSpan.all.to}</>
                )}
                . Switch to the month view to read them.
              </p>
              <p className="prov-note">
                {headlineSpan.verified} verified against a primary source or an
                independent report; {headlineSpan.linked} traced back to the
                research behind them. Anything not verified says so on the item.
              </p>
            </div>
          ) : undefined
        }
        bar={
          headlineMode === 'ticker' ? (
            <Ticker
              items={headlines14}
              colour={colour}
              onOpen={openHeadline}
              onArchive={() => setHeadlineView('archive')}
            />
          ) : undefined
        }
      >
        {headlineMode === 'archive' && (
          <Suspense fallback={<p className="label">Loading…</p>}>
            <NewsArchive
              items={allHeadlines}
              colour={colour}
              onOpen={openHeadline}
            />
          </Suspense>
        )}
      </Frame>

      {openNews && (
        <Frame
          title="Headline"
          state={frames.newsitem}
          onChange={setFrame('newsitem')}
          onClose={() => setOpenNews(null)}
          accent={colour}
          z={zOf('newsitem')}
          onFocus={raise('newsitem')}
          scrollKey={openNews.id}
        >
          <Suspense fallback={<p className="label">Loading…</p>}>
            <NewsDetail item={openNews} colour={colour} />
          </Suspense>
        </Frame>
      )}

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

        {/* Honing, shown as a section so the panel and the board agree. A
            reader who clicks a label and then opens Filters must find the same
            state described, or neither is trustworthy. */}
        <section className="filter-group">
          <header>
            <span className="label">Showing only</span>
            {(onlyGroup || onlyLevel || onlyYear) && (
              <button
                className="filter-group__clear"
                onClick={() => {
                  setOnlyGroup(null)
                  setOnlyLevel(null)
                  setOnlyYear(null)
                }}
              >
                Clear
              </button>
            )}
          </header>

          <ul className="hone">
            {SUPERGROUPS.map((gp) => (
              <li key={gp}>
                <button
                  data-on={onlyGroup === gp || undefined}
                  onClick={() => setOnlyGroup((c) => (c === gp ? null : gp))}
                  style={onlyGroup === gp ? { color: supergroupColour(gp) } : undefined}
                >
                  {SUPERGROUP_LABEL[gp]}
                </button>
              </li>
            ))}
          </ul>

          <ul className="hone hone--levels">
            {LEVELS.map((lvl) => (
              <li key={lvl}>
                <button
                  data-on={onlyLevel === lvl || undefined}
                  onClick={() => setOnlyLevel((c) => (c === lvl ? null : lvl))}
                  style={onlyLevel === lvl ? { color: colour } : undefined}
                >
                  {lvl}
                </button>
              </li>
            ))}
          </ul>

          <p className="filter-group__note">
            One field, one readiness band, one year. Clicking a label on the
            board does the same thing — and clicking it again clears it. This
            narrows whatever the filters below already allow; it never brings
            back something they have hidden.
            {onlyYear ? ` Currently also showing only ${onlyYear}.` : ''}
          </p>
        </section>

        <FilterSection
          label="Kind of organisation"
          all={ACTOR_TYPES as unknown as string[]}
          selected={(orgTypes ?? ACTOR_TYPES) as unknown as string[]}
          onChange={(next) =>
            setOrgTypes(
              next.length === ACTOR_TYPES.length ? null : (next as ActorType[]),
            )
          }
          mark={(t) => <GlyphMark glyph={glyphForType(t as ActorType)} colour={colour} />}
          render={(t) => ACTOR_TYPE_LABEL[t as ActorType]}
          note="Shape on the board says what kind of organisation is behind a result. A national laboratory, a university, a standards body and a company carry different weight, and the evidence rules already say so."
        />

        <FilterSection
          label="Actors"
          all={actors}
          selected={actorsOn ?? actors}
          onChange={(next) => setActorsOn(next.length === actors.length ? null : next)}
          mark={(a) => <GlyphMark glyph={glyphFor(a)} colour={colour} />}
          render={(a) => {
            const n = actorCounts.find(([name]) => name === a)?.[1] ?? 0
            return n > 1 ? `${a} · ${n}` : a
          }}
          note="Shape is the organisation; colour is the constellation. Every body on the board is a development, never an organisation."
        />

        <section className="filter-group">
          <header>
            <span className="label">Headlines</span>
          </header>
          <ul className="filter-list">
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={showNewsOverlay}
                  onChange={() => setShowNewsOverlay((v) => !v)}
                />
                <span style={{ opacity: showNewsOverlay ? 1 : 0.45 }}>
                  Show on the board
                </span>
              </label>
            </li>
          </ul>
          <p className="filter-group__note">
            Draws each headline as a small satellite orbiting the item it bears
            on. Off by default — there will eventually be far more headlines
            than items, and a board showing every announcement is a news reader
            rather than a map.
          </p>
        </section>

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

      <Frame
        title="Help"
        state={frames.help}
        onChange={setFrame('help')}
        onDock={dock('help')}
        accent={colour}
        z={zOf('help')}
        onFocus={raise('help')}
      >
        <Suspense fallback={<p className="label">Loading…</p>}>
          <Help colour={colour} pool={pool} />
        </Suspense>
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
          scrollKey={item.id}
        >
          <Detail item={item} definition={SCALES[item.pillar]?.levels[item.readiness]} />
        </Frame>
      )}

      {/* Teal, not the galaxy's colour. The dock is chrome, and chrome that
          changes hue with context is how one product starts reading as three.
          The galaxy accent still drives every mark on the canvas. */}
      <Toolbar buttons={buttons} accent="var(--qd-defence)" resetSignal={resetTick} />
    </main>
  )
}

/* ---------------------------------------------------------------- */


/* ---------------------------------------------------------------- */

function Sky({
  onlyGroup,
  onlyLevel,
  onlyYear,
  onHone,
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
  onHover,
  pool,
  newsOverlay,
  onOpenNews,
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
  onHover: (id: string | null) => void
  pool: FrontierItem[]
  newsOverlay: boolean
  onOpenNews: (n: NewsItem) => void
  /**
   * Honing state, owned by Board and passed down.
   *
   * Sky draws the labels and knows where they landed, so it must know which is
   * active to mark it — but the filtering happens in Board, so Board owns the
   * state. One owner, one direction of travel.
   */
  onlyGroup: Supergroup | null
  onlyLevel: string | null
  onlyYear: number | null
  onHone: (kind: 'group' | 'level' | 'year', value: string) => void
}) {
  const cv = useRef<HTMLCanvasElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [hover, setHover] = useState<string | null>(null)
  const hoverRef = useRef<string | null>(null)
  hoverRef.current = hover
  useEffect(() => onHover(hover), [hover, onHover])

  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null)
  const pinch = useRef<{ d: number; k: number; angle: number; roll: number } | null>(null)
  /** Camera drag while in orbit: horizontal is yaw, vertical is pitch. */
  const camDrag = useRef<{ x: number; y: number; yaw: number; pitch: number; roll: number; rollMode: boolean } | null>(null)
  const cur = useRef({ ...view })

  /** Animated positions. Nodes ease between tower and orbit rather than jumping. */
  const anim = useRef(new Map<string, { x: number; y: number }>())

  /**
   * Bodies currently making an entrance, and which kind.
   *
   * A moved item travels from the band it left; a new one fades up where it
   * belongs. Both are cleared once the entrance is done, so the effect happens
   * on arrival and never again — a body that pulsed forever would be
   * decoration rather than a signal.
   */
  const entering = useRef(
    new Map<string, { kind: 'moved' | 'demoted' | 'new'; at: number }>(),
  )
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
  const nodeDrag = useRef<{ id: string; ox: number; oy: number; sx: number; sy: number } | null>(null)

  /** Starfield, in screen space so it reads as depth behind the board. */
  /**
   * Nebula columns, one per readiness band, drifting down behind the stars.
   *
   * The bands already carry colour in the labels; this gives them presence
   * without adding a channel. Very low alpha and slow — the test is that a
   * reader notices the board feels deep and cannot say why, not that they see
   * clouds.
   *
   * Behind the starfield, which is itself behind everything that means
   * anything. Atmosphere must never compete with data.
   */
  /**
   * One nebula column per supergroup, sitting under its own lane.
   *
   * The columns are the board's horizontal grammar — Computing, Applications,
   * Cryptography, Communications, Sensing — so the atmosphere follows them
   * rather than inventing a second organisation. Each column drifts downward
   * behind the stars, which are themselves behind everything that means
   * anything.
   *
   * The first version keyed these on readiness bands and then coloured them
   * from the constellation list, which indexes differently — so it drew
   * arbitrary hues at an alpha low enough to be invisible. Nobody saw it and
   * nothing was lost, which is the only good thing about that bug.
   */
  const nebula = useRef(
    SUPERGROUPS.flatMap((gp, i) =>
      Array.from({ length: 3 }, () => ({
        group: gp,
        // Anchored near the lane's own x, wandering only a little, so the
        // column reads as belonging to it.
        x: 0,
        drift: (Math.random() - 0.5) * 0.10,
        y: Math.random() * 1.4 - 0.2,
        v: 0.005 + Math.random() * 0.010,
        w: 0.09 + Math.random() * 0.10,
        h: 0.28 + Math.random() * 0.30,
        // Deliberately generous. This was invisible twice; better to see it and
        // dial it back than to guess again at a number nobody can check.
        a: 0.10 + Math.random() * 0.08,
        seed: i,
      })),
    ),
  )

  const stars = useRef(
    Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 0.012 + Math.random() * 0.03, // full descent in roughly 30–80 seconds
      r: 0.4 + Math.random() * 1.1,
      a: 0.08 + Math.random() * 0.22,
    })),
  )

  /**
   * Forget where a body was once it is filtered out.
   *
   * Without this the easing remembers it, and a body brought back by clearing
   * a filter simply reappears where it left off — no entrance, no sense of the
   * board rearranging. Pruning also stops the map growing with every item that
   * has ever been shown.
   */
  useEffect(() => {
    const live = new Set(nodes.map((n) => n.id))
    for (const id of anim.current.keys()) {
      if (!live.has(id)) anim.current.delete(id)
    }
  }, [nodes])

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes])
  /** Items, not nodes. Prominence asks about moved, added and priority. */
  const itemById = useMemo(() => new Map(pool.map((i) => [i.id, i])), [pool])

  /** Where the headline satellites landed, so a click can find one. */
  const newsHits = useRef<{ x: number; y: number; r: number; item: NewsItem }[]>([])

  /**
   * Clickable label regions, recorded while drawing.
   *
   * The labels are canvas text, so there is nothing to attach a handler to.
   * Recording the box each one occupied as it is drawn is the only way to make
   * it clickable, and it keeps the hit area exactly where the reader sees the
   * word rather than somewhere derived a second time.
   */
  const labelHits = useRef<
    { x: number; y: number; w: number; h: number; kind: 'group' | 'level' | 'year'; value: string }[]
  >([])

  /** Ids nobody has read. Marked on the board, not only in the detail panel. */
  const unreviewed = useMemo(
    () =>
      new Set(
        allFrontier
          .filter((i) => i.review?.state === 'agent-merged' || i.review?.state === 'agent-reviewed')
          .map((i) => i.id),
      ),
    [],
  )

  const tl = useMemo(
    () =>
      timeline
        ? layoutTimeline(
            // The year window, not every node — otherwise the axis still spans
            // fifteen years and the filter does nothing visible.
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

      /**
       * LEVEL OF DETAIL.
       *
       * Zoom decides how much of the selected set is drawn prominently. It
       * never decides what is *in* the set — that is the filters' job, and a
       * zoom level that brought back something a reader filtered out, or hid
       * something they filtered in, would be lying about what they asked for.
       *
       * Nothing is ever hidden. Demoted items draw as small dim dots: still
       * there, still hoverable, still clickable, still counted. A reader who
       * cannot see something is told it does not exist; a reader who sees it
       * small is told it is there and quiet. Only one of those is true.
       */
      const detail: 0 | 1 | 2 = v.k < 1.35 ? 0 : v.k < 2.4 ? 1 : 2

      /** Full size and a label, or a dim dot. */
      const prominent = (n: (typeof nodes)[number]) => {
        if (detail === 2) return true
        const item = itemById.get(n.id)
        const moved = item?.moved?.on
          ? (Date.now() - new Date(item.moved.on).getTime()) / 864e5 < 120
          : false
        const fresh = item?.added
          ? (Date.now() - new Date(item.added).getTime()) / 864e5 < 45
          : false
        const priority = item?.priority === 'P0' || item?.priority === 'P1'
        // Level 1 adds P1 and anything with real attention; level 0 is the
        // shortest possible list — what moved, what is new, and the handful of
        // P0 items that carry weight.
        if (detail === 1) return moved || fresh || priority || n.attention > 0.45
        return moved || fresh || (item?.priority === 'P0' && n.attention > 0.6)
      }
      const X = (x: number) => PAD + (x * (W - PAD - 16) + v.tx) * v.k
      const Y = (y: number) => 10 + (y * (H - 30) + v.ty) * v.k

      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.clearRect(0, 0, W, H)
      // Rebuilt every frame, so a label that moved or vanished cannot leave a
      // stale hit region behind it.
      labelHits.current = []

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
          const only = onlyYear === yr
          g.fillStyle = only ? colour : onlyYear ? 'rgba(134,151,176,0.35)' : 'rgba(134,151,176,0.75)'
          const text = String(yr)
          g.fillText(text, fx + 5, 20)
          const tw = g.measureText(text).width
          if (only) g.fillRect(fx + 5, 24, tw, 1)
          labelHits.current.push({ x: fx + 1, y: 6, w: tw + 8, h: 18, kind: 'year', value: text })
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

        const newsMarks: { x: number; y: number; r: number; item: NewsItem }[] = []

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
            { E5: 1, E4: 0.82, E3: 0.6, E2: 0.42, E1: 0.24, E0: 0.12, unrated: 0.18 }[
              item?.evidence?.level ?? 'unrated'
            ] ?? 0.18
          const priorityWeight =
            { P0: 1, P1: 0.78, P2: 0.5, P3: 0.28, P4: 0.14 }[item?.priority ?? 'P3'] ?? 0.28
          const weight = evidenceWeight * 0.55 + priorityWeight * 0.45
          const rr = (3 + weight * 10) * (sel ? 1.5 : hov ? 1.2 : 1)

          // Same rule as the galaxy: what moved, what is new, what carries
          // weight. Everything else is a dim dot until you zoom in.
          const tlMoved = item?.moved?.on
            ? (Date.now() - new Date(item.moved.on).getTime()) / 864e5 < 120
            : false
          const tlFresh = item?.added
            ? (Date.now() - new Date(item.added).getTime()) / 864e5 < 45
            : false
          const tlProminent =
            v.k > 2.2 ||
            sel ||
            hov ||
            tlMoved ||
            tlFresh ||
            item?.priority === 'P0' ||
            (v.k > 1.4 && item?.priority === 'P1')

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
          // An estimated date gets a horizontal whisker: the board is saying
          // "about here", which is true, rather than placing it precisely and
          // implying a certainty nobody asserted.
          if (m.precision !== 'exact' && m.dated && tlProminent) {
            g.globalAlpha = 0.3
            g.strokeStyle = tint
            g.lineWidth = 1
            g.setLineDash([2, 3])
            g.beginPath()
            g.moveTo(px - rr - 8, py)
            g.lineTo(px + rr + 8, py)
            g.stroke()
            g.setLineDash([])
          }

          if (tlProminent) {
            g.globalAlpha = (dim && !sel ? 0.25 : 0.45 + m.importance * 0.55)
            drawBody(g, item?.actors?.[0] ? glyphFor(item.actors[0]) : 'star', px, py, rr, tint, m.sourced)
          } else {
            g.globalAlpha = (dim && !sel ? 0.2 : 0.35) * 1
            g.fillStyle = tint
            g.beginPath()
            g.arc(px, py, Math.max(1.5, rr * 0.28), 0, Math.PI * 2)
            g.fill()
          }
          g.shadowBlur = 0

          /**
           * Headlines, placed at their own date rather than beside their item.
           *
           * The timeline has a real horizontal axis, so a headline can sit
           * where it actually happened. Zoomed in far enough that months are
           * distinguishable, that spreads them out on its own — several
           * announcements about one item stop stacking and start reading as a
           * sequence.
           */
          if (newsOverlay && item) {
            const attached = newsAbout(item.id)
            attached.forEach((n, k) => {
              // yearFraction takes a year, and a headline needs a position
              // within one — which is the whole point of aligning by month.
              const d = new Date(n.date)
              const fractionalYear =
                d.getFullYear() + (d.getMonth() + (d.getDate() - 1) / 31) / 12
              const nf = yearFraction(fractionalYear, tl.from, tl.to)
              const nx = TX(nf)
              if (nx < AXIS || nx > W) return
              const big = n.significance === 'headline'
              // Below the mark when they share a date, so they never hide it.
              const spread = v.k > 2 ? 0 : k * 3
              const ny = py + rr + 7 + spread
              g.globalAlpha = (big ? 0.95 : 0.5) * (dim && !sel ? 0.3 : 1)
              g.fillStyle = big ? '#FFB020' : '#8697B0'
              if (big) {
                g.shadowColor = '#FFB020'
                g.shadowBlur = 6
              }
              g.beginPath()
              g.arc(nx, ny, big ? 3.2 : 1.8, 0, Math.PI * 2)
              g.fill()
              g.shadowBlur = 0
              // A thread back to the item it bears on, once there is room.
              if (v.k > 1.6 && Math.abs(nx - px) > 6) {
                g.globalAlpha = 0.18
                g.strokeStyle = big ? '#FFB020' : '#8697B0'
                g.lineWidth = 0.8
                g.beginPath()
                g.moveTo(px, py)
                g.lineTo(nx, ny)
                g.stroke()
              }
              newsMarks.push({ x: nx, y: ny, r: (big ? 3.2 : 1.8) + 4, item: n })
            })
            g.globalAlpha = 1
          }

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
            sel ||
            hov ||
            (tlProminent &&
              (labelRank.get(m.id) ?? 999) < labelBudget &&
              m.importance > 0.35)
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
          const only = onlyLevel === lvl
          g.fillStyle = only
            ? colour
            : onlyLevel
              ? 'rgba(134,151,176,0.4)'
              : 'rgba(134,151,176,0.9)'
          const text = lvl.toUpperCase()
          g.fillText(text, 8, y + 4)
          const tw = g.measureText(text).width
          if (only) g.fillRect(8, y + 8, tw, 1)
          labelHits.current.push({ x: 4, y: y - 10, w: Math.max(tw + 8, 90), h: 20, kind: 'level', value: lvl })
        })
        g.globalAlpha = 1

        newsHits.current = newsMarks


        raf = requestAnimationFrame(safeDraw)
        return
      }


      /**
       * Nebula first: behind the stars, which are behind everything that means
       * anything.
       *
       * Drawn even when motion is reduced — a soft colour field is not motion,
       * and hiding it there would remove depth from the readers who most need
       * the board to be calm. Only its drift is suppressed.
       */
      {
        for (const c of nebula.current) {
          if (!reduced) {
            c.y += c.v * dt
            if (c.y > 1.35) {
              c.y = -0.35
              c.drift = (Math.random() - 0.5) * 0.10
            }
          }
          // The lane's own position, so the column tracks its supergroup even
          // as the view is panned and zoomed.
          const home = supergroupHome(c.group, (con) => CONSTELLATION_HOME[con] ?? 0.5)
          const cx = X(home + c.drift)
          const cy = c.y * H
          const rx = c.w * W
          const ry = c.h * H
          if (cx < -rx || cx > W + rx) continue

          /*
           * The gradient is created inside the transform, not outside it.
           *
           * A canvas gradient is resolved against the matrix in force when it
           * is filled, not when it is made. Creating one at screen coordinates
           * and then translating to that same point put its centre at twice
           * the offset — off screen — so every fill drew the transparent end
           * and the whole layer was invisible.
           */
          g.save()
          g.translate(cx, cy)
          g.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry))

          const R = Math.max(rx, ry)
          const grad = g.createRadialGradient(0, 0, 0, 0, 0, R)
          grad.addColorStop(0, supergroupColour(c.group))
          grad.addColorStop(1, 'rgba(0,0,0,0)')

          g.globalAlpha =
            c.a * Math.min(1, (1.35 - c.y) * 1.6) * Math.min(1, (c.y + 0.35) * 1.6)
          g.fillStyle = grad
          g.beginPath()
          g.arc(0, 0, R, 0, Math.PI * 2)
          g.fill()
          g.restore()
        }
        g.globalAlpha = 1
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
        /**
         * Only what changed moves.
         *
         * The first version gave every body an entrance, so eighty-seven of
         * them flew in at once and the motion pointed at nothing. Movement is a
         * way of directing the eye, and directing it everywhere is the same as
         * not directing it at all.
         *
         * So: a body that moved readiness in the last 120 days travels from
         * where it used to sit, which is the movement actually being reported.
         * A body added in the last 45 days fades up in place. Everything else
         * is simply drawn where it belongs, with no entrance at all.
         */
        if (!anim.current.has(n.id)) {
          const item = itemById.get(n.id)
          const movedOn = item?.moved?.on
          const recentlyMoved =
            movedOn && (Date.now() - new Date(movedOn).getTime()) / 864e5 < 120
          const from = item?.moved?.from

          /*
           * A demotion looks different from a promotion.
           *
           * The axis runs emerging at the top to mainstream at the bottom, so
           * progress travels downward and a body that rises has been corrected
           * to a less mature readiness. That is the more consequential news —
           * the board saying it was wrong — and it should not be told in the
           * same visual language as an advance.
           */
          if (recentlyMoved && from && LEVELS.includes(from as never)) {
            // Start on the band it left, at its own x, and travel to the new
            // one. The path is the readiness change, drawn.
            const fromRow = LEVELS.indexOf(from as never)
            anim.current.set(n.id, {
              x: n.x,
              y: (fromRow + 0.5) / LEVELS.length,
            })
            const toRow = LEVELS.indexOf(n.level as never)
            entering.current.set(n.id, {
              kind: toRow < fromRow ? 'demoted' : 'moved',
              at: performance.now(),
            })
          } else {
            const addedOn = item?.added
            const isNew =
              addedOn && (Date.now() - new Date(addedOn).getTime()) / 864e5 < 45
            anim.current.set(n.id, { x: n.x, y: n.y })
            if (isNew) entering.current.set(n.id, { kind: 'new', at: performance.now() })
          }
        }

        const a = anim.current.get(n.id) ?? { x: n.x, y: n.y }
        const enter = entering.current.get(n.id)
        const speed =
          nodeDrag.current?.id === n.id
            ? 1
            : held
              ? 0.25
              : projected
                ? 1
                : reduced
                  ? 1
                  : // A body travelling from the band it left moves slowly, so the
                    // journey can be followed. Everything else settles as before.
                    enter?.kind === 'moved' || enter?.kind === 'demoted'
                    ? 0.022
                    : 0.09

        // The entrance is over once it has arrived, or after eight seconds —
        // whichever comes first, so nothing pulses indefinitely.
        if (enter) {
          const arrived = Math.hypot(tgt.x - a.x, tgt.y - a.y) < 0.004
          if (arrived || performance.now() - enter.at > 8000) entering.current.delete(n.id)
        }
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
          const only = onlyLevel === lvl
          g.fillStyle = only ? colour : onlyLevel ? 'rgba(134,151,176,0.3)' : 'rgba(134,151,176,0.85)'
          const text = lvl.toUpperCase()
          g.fillText(text, 8, y + 15)
          const tw = g.measureText(text).width
          if (only) g.fillRect(8, y + 19, tw, 1)
          labelHits.current.push({ x: 4, y: y + 3, w: Math.max(tw + 8, 100), h: 20, kind: 'level', value: lvl })
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

        // Category names live in a reserved band with its own backing.
        //
        // Staggering onto two rows was not enough: item labels are drawn in the
        // same region, so a body near the top printed straight over the
        // category names. A band nothing else may enter is the only
        // arrangement that holds at every width.
        // At the widest level the nine names collide and say less than five
        // would. The band is the same; what fills it changes with zoom.
        if (detail === 0) {
          const active = SUPERGROUPS.filter((gp) =>
            CONSTELLATIONS.some((c) => activeCons.includes(c) && supergroupOf(c) === gp),
          )
          g.globalAlpha = 1
          const backing = g.createLinearGradient(0, 0, 0, 42)
          backing.addColorStop(0, 'rgba(7,11,20,0.96)')
          backing.addColorStop(0.7, 'rgba(7,11,20,0.86)')
          backing.addColorStop(1, 'rgba(7,11,20,0)')
          g.fillStyle = backing
          g.fillRect(0, 0, W, 42)

          active.forEach((gp) => {
            const home = supergroupHome(gp, (c) => CONSTELLATION_HOME[c] ?? 0.5)
            const cx = X(home)
            const label = SUPERGROUP_LABEL[gp].toUpperCase()
            const tw = g.measureText(label).width
            const x = Math.max(4, Math.min(W - tw - 4, cx - tw / 2))
            const only = onlyGroup === gp
            g.fillStyle = supergroupColour(gp)
            g.globalAlpha = onlyGroup && !only ? 0.35 : 0.95
            g.fillText(label, x, 16)
            // Underline the one being shown alone, so the board says what it
            // is doing rather than leaving the reader to infer it.
            if (only) {
              g.fillRect(x, 20, tw, 1)
            }
            labelHits.current.push({ x: x - 4, y: 2, w: tw + 8, h: 20, kind: 'group', value: gp })
          })
          g.globalAlpha = 1
        }

        const zoomFade = detail === 0 ? 0 : Math.max(0, Math.min(1, (2.6 - v.k) / 0.6))
        if (zoomFade > 0.02) {
          const active = CONSTELLATIONS.filter((c) => activeCons.includes(c))
          const laneW = (W - PAD) / Math.max(1, active.length)
          const placedNames: { x: number; w: number; row: number }[] = []

          g.globalAlpha = zoomFade
          const backing = g.createLinearGradient(0, 0, 0, 42)
          backing.addColorStop(0, 'rgba(7,11,20,0.96)')
          backing.addColorStop(0.7, 'rgba(7,11,20,0.86)')
          backing.addColorStop(1, 'rgba(7,11,20,0)')
          g.fillStyle = backing
          g.fillRect(0, 0, W, 42)

          active.forEach((c, i) => {
            const cx = X(CONSTELLATION_HOME[c] ?? 0.5)
            if (cx < -60 || cx > W + 60) return

            let label = CONSTELLATION_LABEL[c].toUpperCase()
            const budget = laneW * 1.5
            if (g.measureText(label).width > budget) {
              while (label.length > 4 && g.measureText(label + '…').width > budget) {
                label = label.slice(0, -1)
              }
              label += '…'
            }
            const tw = g.measureText(label).width

            const row = i % 2
            const x = Math.max(3, Math.min(W - tw - 3, cx - tw / 2))
            const clash = placedNames.some(
              (o) => o.row === row && !(x + tw < o.x - 10 || x > o.x + o.w + 10),
            )
            if (clash) return
            placedNames.push({ x, w: tw, row })

            g.fillStyle = constellationColour(c)
            g.globalAlpha = (row === 0 ? 0.95 : 0.7) * zoomFade
            g.fillText(label, x, 14 + row * 13)
          })
          g.globalAlpha = 1
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

      // Links appear when zoomed in, and only between bodies drawn prominently.
      // Sixty faint lines behind sixty dim dots is texture; a dozen between the
      // things a reader is looking at is information.
      for (const { a, b, cross: cr } of detail === 0 ? [] : links) {
        // a and b are nodes, not ids — no lookup needed.
        if (detail === 1 && !(prominent(a) && prominent(b))) continue
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
      /**
       * Headlines as satellites.
       *
       * A news item is not a development, so it never becomes a body — it
       * orbits the item it bears on, small and dim. Off by default, because
       * there will eventually be far more headlines than items and a board
       * showing every announcement is a news reader rather than a map.
       */
      const newsMarks: { x: number; y: number; r: number; item: NewsItem }[] = []


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
        const isProminent = prominent(n) || sel || hov

        /**
         * A new item fades up where it belongs.
         *
         * No travel — it did not come from anywhere, and inventing a journey
         * would be a small lie about what happened. It simply was not here
         * before and now is, over about two seconds.
         */
        const ent = entering.current.get(n.id)
        const enterFade =
          ent?.kind === 'new' ? Math.min(1, (performance.now() - ent.at) / 2000) : 1
        // The glow rises with it, so the arrival is visible on a dim body too.
        const enterGlow = ent?.kind === 'new' ? 1 + (1 - enterFade) * 14 : 1

        /*
         * A demoted body drags a faint trail back to where it was.
         *
         * Rising already reads as odd on an axis where progress descends, and
         * that oddness is doing useful work — but the trail says which
         * direction the claim moved, which the position alone does not.
         */
        if (ent?.kind === 'demoted' && isProminent) {
          const item = itemById.get(n.id)
          const fromRow = LEVELS.indexOf((item?.moved?.from ?? '') as never)
          if (fromRow >= 0) {
            const fy = Y((fromRow + 0.5) / LEVELS.length)
            g.globalAlpha = 0.22 * fade
            g.strokeStyle = colour
            g.lineWidth = 1
            g.setLineDash([2, 4])
            g.beginPath()
            g.moveTo(px, py)
            g.lineTo(px, fy)
            g.stroke()
            g.setLineDash([])
          }
        }

        g.shadowColor = colour
        g.shadowBlur = (isProminent ? (n.sourced ? 16 + n.weight * 12 : 5) : 0) * enterGlow
        g.globalAlpha =
          (isProminent ? (n.sourced ? 0.85 + n.weight * 0.15 : 0.42) : 0.3) * fade * enterFade
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
        if (isProminent) {
          drawBody(g, glyph, px, py, r, bodyColour, n.sourced)
        } else {
          // A dim dot. Small enough to recede, large enough to hit — the
          // hit radius below is unchanged, so a demoted body is exactly as
          // clickable as a prominent one.
          g.fillStyle = bodyColour
          g.beginPath()
          g.arc(px, py, Math.max(1.6, r * 0.3), 0, Math.PI * 2)
          g.fill()
        }
        g.shadowBlur = 0

        // Unreviewed items carry a dashed ring wherever they appear. The label
        // in the panel is not enough — someone scanning the board must be able
        // to see which bodies nobody has checked.
        if (unreviewed.has(n.id) && isProminent) {
          g.globalAlpha = 0.75 * fade
          g.strokeStyle = '#FFB020'
          g.lineWidth = 1
          g.setLineDash([2, 3])
          g.beginPath()
          g.arc(px, py, r + 5, 0, Math.PI * 2)
          g.stroke()
          g.setLineDash([])
        }

        if (newsOverlay) {
          const attached = newsAbout(n.id)
          attached.slice(0, 6).forEach((item, k) => {
            const big = item.significance === 'headline'
            const ang = -0.6 + k * 0.7
            const orbit = r + (big ? 13 : 10)
            const nx = px + Math.cos(ang) * orbit
            const ny = py + Math.sin(ang) * orbit * 0.7
            const nr = big ? 3.4 : 1.9
            g.globalAlpha = (big ? 0.95 : 0.5) * fade
            g.fillStyle = big ? '#FFB020' : '#8697B0'
            if (big) {
              g.shadowColor = '#FFB020'
              g.shadowBlur = 7
            }
            g.beginPath()
            g.arc(nx, ny, nr, 0, Math.PI * 2)
            g.fill()
            g.shadowBlur = 0
            newsMarks.push({ x: nx, y: ny, r: nr + 4, item })
          })
          g.globalAlpha = 1
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
        const showLabel = (sel || hov || inFocus || earns) && isProminent
        // Nothing may print into the constellation band at the top.
        const clearOfBand = py > 46 || sel || hov
        if (
          showLabel &&
          off > 0.5 &&
          clearOfBand &&
          (labelQueue.length < capacity || sel || hov || inFocus)
        ) {
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

      newsHits.current = newsMarks
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
  }, [size, nodes, links, targets, colour, selected, view, activeCons, mode, focusCon, tl, cam, orbit3d, unreviewed, forecast, pool, fitScale, newsOverlay, itemById, onlyGroup, onlyLevel, onlyYear])

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
    const k = Math.min(5, Math.max(fitScale, view.k * (e.deltaY < 0 ? 1.15 : 0.87)))
    setView({ k, tx: view.tx + cx / k - cx / view.k, ty: view.ty + cy / k - cy / view.k })
  }

  function onPointerDown(e: React.PointerEvent) {
    idleSince.current = performance.now()

    /**
     * A label takes the pointer before anything else.
     *
     * The labels sit over the plot, so a click on one would otherwise fall
     * through to whatever body happens to be behind it — and the reader would
     * get a detail panel when they asked to hone.
     */
    {
      const r = cv.current!.getBoundingClientRect()
      const px = e.clientX - r.left
      const py = e.clientY - r.top
      const hit = labelHits.current.find(
        (l) => px >= l.x && px <= l.x + l.w && py >= l.y && py <= l.y + l.h,
      )
      if (hit) {
        // Clicking the same label again clears it. Anything else replaces it —
        // two hones of the same kind at once is not a thing a reader can mean.
        onHone(hit.kind, hit.value)
        return
      }
    }

    // A headline satellite takes the pointer before the body it orbits.
    if (newsOverlay && newsHits.current.length) {
      const r = cv.current!.getBoundingClientRect()
      const px = e.clientX - r.left
      const py = e.clientY - r.top
      const hit = newsHits.current.find((m) => Math.hypot(m.x - px, m.y - py) < m.r)
      if (hit) {
        onOpenNews(hit.item)
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

    const k = Math.min(5, Math.max(fitScale, (pinch.current.k * d) / pinch.current.d))
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
  mark,
  note,
}: {
  label: string
  all: string[]
  selected: string[]
  onChange: (next: string[]) => void
  render: (v: string) => string
  swatch?: (v: string) => string
  /** An arbitrary mark before the label — a glyph, say, rather than a dot. */
  mark?: (v: string) => React.ReactNode
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
                {mark && (
                  <span className="filter-mark" style={{ opacity: on ? 1 : 0.3 }}>
                    {mark(v)}
                  </span>
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

/**
 * A date a person reads, not a date a machine sorts by.
 *
 * "27 July 2026" in a panel meant for reading; ISO stays in the front matter
 * where it belongs. The month is spelled out because 07/06 is ambiguous across
 * the Atlantic and this board has readers on both sides of it.
 */
function longDate(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d
  if (isNaN(date.getTime())) return 'an unknown date'
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function Detail({ item, definition }: { item: FrontierItem; definition?: string }) {
  const colour = PILLAR_SPECTRUM[item.pillar].colour
  const needsSource = item.evidence.claim.startsWith('NEEDS PRIMARY SOURCE')
  const rev = item.review

  /**
   * The provenance explanation, closed by default.
   *
   * Declared here rather than in Board: this is the component that shows it,
   * and state belongs with the thing that uses it. Putting it a level up is how
   * the honing controls ended up out of scope.
   *
   * Closed each time a different item is opened — an explanation left expanded
   * from the previous entry is describing the wrong one.
   */
  const [provOpen, setProvOpen] = useState(false)
  useEffect(() => setProvOpen(false), [item.id])

  return (
    <div className="detail">
      <div className="meta">
        <span className="badge" style={{ color: colour, borderColor: colour }}>{item.readiness}</span>
        <span className="badge">{item.constellation}</span>
        {(() => {
          const { date, precision } = datedOf(item)
          if (!date) return null
          return (
            <span
              className="badge"
              title={PRECISION_NOTE[precision]}
              data-estimated={precision !== 'exact' ? '' : undefined}
            >
              {precision === 'exact' ? '' : 'about '}
              {longDate(date)}
            </span>
          )
        })()}
        {item.evidence.level && (
          <span className="badge" title={
            item.evidence.level === 'unrated'
              ? 'No evidence attached yet. This says nothing about the development itself.'
              : undefined
          }>
            {item.evidence.level}
          </span>
        )}
        {item.priority && <span className="badge">{item.priority}</span>}
        {needsSource && <span className="badge" data-conf="low">unsourced</span>}
      </div>

      {/**
        * Provenance is a badge, and the explanation is behind it.
        *
        * The reader should know who stands behind an entry before they read
        * what it says — but four lines of caveat above a two-line title buries
        * the thing they came for. The badge carries the state; clicking it
        * carries the reasoning.
        */}
      <div className="prov-row">
        <button
          className={
            rev?.state === 'agent-merged'
              ? 'prov prov--agent prov--button'
              : rev?.state === 'agent-reviewed'
                ? 'prov prov--checked prov--button'
                : rev?.state === 'vetoed'
                  ? 'prov prov--vetoed prov--button'
                  : 'prov prov--button'
          }
          onClick={() => setProvOpen((v) => !v)}
          aria-expanded={provOpen}
          title="What this means"
        >
          <span className="prov__dot" />
          {rev?.state === 'agent-merged'
            ? 'Agent-merged — not yet reviewed'
            : rev?.state === 'agent-reviewed'
              ? 'Agent-checked — not read by a person'
              : rev?.state === 'vetoed'
                ? 'Vetoed'
                : `Reviewed ${ago(rev?.on)}`}
          <span className="prov__caret">{provOpen ? '▾' : '▸'}</span>
        </button>
      </div>

      {provOpen && rev?.state === 'agent-reviewed' && (
        <p className="prov-note">
          <strong>Checked by the reviewer agent</strong> {ago(rev.reviewedOn)}: sources
          opened, claim compared against them, evidence level tested against the
          source type. That is a second machine pass, not a human reading it —
          the reviewer can only ever make an entry more cautious, never more
          confident.
          {rev.note ? ` ${rev.note}` : ''}
        </p>
      )}

      {provOpen && rev?.state === 'agent-merged' && (
        <p className="prov-note">
          <strong>Published by the {rev.agent ?? 'research'} agent</strong>{' '}
          {ago(rev.agentMergedOn)}, without human review. The sources below are
          real and were checked by the agent, but nobody has yet read this entry
          and confirmed it. Weigh it accordingly.
        </p>
      )}

      {provOpen && rev?.state === 'reviewed' && (
        <p className="prov-note">
          A person has read this entry and confirmed it{rev.on ? ` on ${longDate(rev.on)}` : ''}.
          {rev.note ? ` ${rev.note}` : ''}
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
