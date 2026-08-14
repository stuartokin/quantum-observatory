import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * A moveable, resizeable, minimisable panel.
 *
 * Drags run through the DOM and commit to React state once on release. Calling
 * setState on every pointermove re-renders the tree and forces a full canvas
 * repaint per pixel, which is why dragging used to feel like it was fighting
 * you.
 *
 * Three states, deliberately distinct:
 *   open        normal
 *   maximised   filling the workspace, remembering where it came from
 *   docked      put away, and named in the dock so it can be brought back
 *
 * There was a fourth — collapsed to its own title bar — which did much the
 * same as docking while leaving a stub on screen. Two ways to put something
 * away is one too many.
 */

export interface FrameState {
  x: number
  y: number
  w: number
  h: number
  docked?: boolean
  /**
   * Filling the workspace. The previous box is kept so restore returns it
   * exactly where it was rather than to a default — a window that forgets
   * where it lived is one you have to arrange twice.
   */
  maximised?: boolean
  restore?: { x: number; y: number; w: number; h: number }
}

export function Frame({
  title,
  state,
  onChange,
  onDock,
  onClose,
  children,
  accent,
  z,
  onFocus,
  /** Frames holding a canvas need to know when their box changed. */
  onResized,
  minWidth = 220,
  minHeight = 140,
  flush,
  bar,
  barOnly,
  onInfo,
  info,
  action,
  scrollKey,
  onMaximise,
  noMaximise,
}: {
  title: string
  state: FrameState
  onChange: (s: FrameState) => void
  onDock?: () => void
  onClose?: () => void
  children: ReactNode
  accent?: string
  z?: number
  onFocus?: () => void
  onResized?: () => void
  minWidth?: number
  minHeight?: number
  /** Canvas frames own their whole box: no padding, no scrollbars. */
  flush?: boolean
  /**
   * Content rendered inside the title bar itself, between the name and the
   * window buttons. A ticker in a body below its own title bar wastes a row on
   * a panel whose whole purpose is to be one line.
   */
  bar?: ReactNode
  /** With a bar and no body, the frame is just that line. */
  barOnly?: boolean
  /** An `i` button in the title bar, and what it reveals. */
  onInfo?: () => void
  info?: ReactNode
  /** A control that belongs in the title bar rather than the body. */
  action?: ReactNode
  /** Called when the frame is maximised, for anything that should change with it. */
  onMaximise?: () => void
  /** Reference panels have nothing to gain from filling the screen. */
  noMaximise?: boolean
  /**
   * Change this and the body scrolls back to the top.
   *
   * Reading halfway down one item and clicking another left the panel where it
   * was, so the new entry opened in the middle of itself. The content changed;
   * the scroll position should not have survived it.
   */
  scrollKey?: string | null
}) {
  const ref = useRef<HTMLElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const drag = useRef<{ mode: 'move' | 'resize'; ox: number; oy: number; s: FrameState } | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (body.current) body.current.scrollTop = 0
  }, [scrollKey])

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current
      const el = ref.current
      if (!d || !el) return
      const dx = e.clientX - d.ox
      const dy = e.clientY - d.oy
      if (d.mode === 'move') {
        el.style.left = `${Math.max(4, Math.min(window.innerWidth - 90, d.s.x + dx))}px`
        el.style.top = `${Math.max(4, Math.min(window.innerHeight - 44, d.s.y + dy))}px`
      } else {
        el.style.width = `${Math.max(minWidth, Math.min(window.innerWidth - d.s.x - 8, d.s.w + dx))}px`
        el.style.height = `${Math.max(minHeight, Math.min(window.innerHeight - d.s.y - 8, d.s.h + dy))}px`
        onResized?.()
      }
    }

    const up = () => {
      const d = drag.current
      const el = ref.current
      drag.current = null
      setActive(false)
      if (!d || !el) return
      onChange({
        ...d.s,
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
        w: parseFloat(el.style.width),
        h: parseFloat(el.style.height),
      })
      onResized?.()
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [onChange, onResized, minWidth, minHeight])

  const begin = (mode: 'move' | 'resize') => (e: React.PointerEvent) => {
    // Dragging a maximised frame would move something pinned to the viewport.
    if (state.maximised) return
    e.preventDefault()
    const el = ref.current!
    el.style.left = `${state.x}px`
    el.style.top = `${state.y}px`
    el.style.width = `${state.w}px`
    el.style.height = `${state.h}px`
    drag.current = { mode, ox: e.clientX, oy: e.clientY, s: state }
    setActive(true)
    onFocus?.()
  }

  const toggleMaximise = () => {
    if (state.maximised) {
      const r = state.restore
      onChange({
        ...state,
        maximised: false,
        ...(r ?? {}),
        restore: undefined,
      })
    } else {
      onChange({
        ...state,
        maximised: true,
        restore: { x: state.x, y: state.y, w: state.w, h: state.h },
      })
      onMaximise?.()
    }
    requestAnimationFrame(() => onResized?.())
  }

  if (state.docked) return null

  /*
   * data-info exists so the stylesheet can let this frame overflow. The info
   * panel hangs below the title bar, outside the frame's own box, and a frame
   * that clips its overflow swallows it — which is why clicking the title
   * appeared to do nothing at all.
   */
  return (
    <section
      ref={ref}
      className="frame"
      data-active={active}
      data-info={info ? '' : undefined}
      onPointerDown={onFocus}
      data-maximised={state.maximised || undefined}
      style={
        state.maximised
          ? { zIndex: info ? 900 : z, borderColor: accent }
          : {
              /**
               * A frame showing its info panel comes to the very top.
               *
               * The panel hangs below the title bar, outside the frame's own
               * box, so a neighbouring window painted straight over it — the
               * explanation appeared to open behind whatever sat underneath.
               * Raising the whole frame is simpler than trying to raise a child
               * out of its parent's stacking context, which is not possible
               * once a transform or z-index is involved.
               */
              zIndex: info ? 900 : z,
              left: state.x,
              top: state.y,
              width: state.w,
              height: state.h,
              borderColor: accent,
            }
      }
    >
      <header className="frame__bar" onPointerDown={begin('move')}>
        <span className="frame__grip" aria-hidden="true" />
        {onInfo ? (
          <button
            className="frame__title frame__title--button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onInfo}
            title="What is in this panel"
          >
            {title}
          </button>
        ) : (
          <span className="frame__title">{title}</span>
        )}
        {action && (
          <span className="frame__action" onPointerDown={(e) => e.stopPropagation()}>
            {action}
          </span>
        )}
        {bar && (
          <div className="frame__inline" onPointerDown={(e) => e.stopPropagation()}>
            {bar}
          </div>
        )}
        {!noMaximise && (
        <button
          className="frame__btn"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={toggleMaximise}
          aria-pressed={state.maximised}
          aria-label={state.maximised ? 'Restore' : 'Maximise'}
          title={state.maximised ? 'Restore' : 'Fill the workspace'}
        >
          {state.maximised ? '❐' : '□'}
        </button>
        )}
        {onDock && (
          <button
            className="frame__btn"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onDock}
            aria-label="Send to toolbar"
            title="Send to toolbar"
          >
            –
          </button>
        )}
        {onClose && (
          <button
            className="frame__btn"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
      </header>

      {!barOnly && (
        <>
          <div
            ref={body}
            className={flush ? 'frame__body frame__body--flush' : 'frame__body'}
          >
            {children}
          </div>
          <span className="frame__resize" onPointerDown={begin('resize')} aria-hidden="true" />
        </>
      )}
      {info && <div className="frame__info">{info}</div>}

      {barOnly && (
        <span className="frame__resize frame__resize--bar" onPointerDown={begin('resize')} aria-hidden="true" />
      )}
    </section>
  )
}

/**
 * Opening layout for a wide screen: the galaxy dominant on the left, a teaser
 * of what changed and the news beneath it on the right. Below 1100px the extra
 * frames start docked — three panels on a laptop screen is two too many.
 */
export function defaultLayout(w: number, h: number): Record<string, FrameState> {
  const wide = w >= 1100
  const pad = 12
  // The headlines window opens across the top, so the workspace starts below
  // it. Docking it does not reclaim the space — a layout that reflows when a
  // panel closes moves everything the reader had arranged.
  const strip = 74
  const top = strip + 42
  const rightW = wide ? Math.min(400, Math.round(w * 0.28)) : 320
  const mainW = wide ? w - rightW - pad * 3 : w - pad * 2
  const mainH = h - top - pad - 62

  return {
    /**
     * Galaxy and timeline are separate windows.
     *
     * They answer different questions — how close is this, and when did the
     * evidence land — and a toggle between them forced a choice that nobody
     * needed to make. The timeline starts docked so the opening view is not
     * three plots at once.
     */
    galaxy: { x: pad, y: top, w: mainW, h: mainH },
    timeline: {
      x: pad + 40,
      y: top + 40,
      w: Math.max(520, mainW - 80),
      h: Math.max(320, mainH - 80),
      docked: true,
    },
    /** Opens when you enter a constellation, offset so the galaxy stays visible. */
    constellation: {
      x: wide ? Math.round(w * 0.30) : pad,
      y: top + 30,
      w: Math.min(680, w - pad * 2),
      h: Math.min(520, h - top - 120),
      docked: true,
    },
    key: {
      x: pad,
      y: top + 60,
      w: 280,
      h: Math.min(520, h - top - 140),
      docked: true,
    },
    questions: {
      x: wide ? Math.round(w * 0.18) : pad,
      y: top + 20,
      w: Math.min(760, w - pad * 2),
      h: Math.min(640, h - top - 100),
      docked: true,
    },
    teaser: {
      x: wide ? mainW + pad * 2 : 60,
      y: top,
      w: rightW,
      h: Math.round(mainH * 0.42),
      docked: !wide,
    },
    news: {
      x: wide ? mainW + pad * 2 : 90,
      y: wide ? top + Math.round(mainH * 0.42) + pad : 120,
      w: rightW,
      h: mainH - Math.round(mainH * 0.42) - pad,
      docked: !wide,
    },
    // Headlines sits under the news column on a wide screen and is docked
    // below that — three panels plus a ticker is too much for a laptop.
    /**
     * Open at the top, full width, from the first paint.
     *
     * A ticker wants width and almost no height, and it belongs where a wire
     * belongs — across the top, read at a glance before anything else. It is
     * still a window: move it, resize it, dock it, switch it to the month view.
     */
    /**
     * Full width again.
     *
     * It was narrowed to stop it opening behind other windows, but that was
     * treating the symptom — un-docking now raises and clamps into view, which
     * fixes it properly. A ticker with half the width truncates every headline
     * mid-sentence, which is the one thing it must not do.
     */
    headlines: {
      x: pad,
      y: strip,
      w: w - pad * 2,
      h: 34,
      docked: false,
    },
    newsitem: { x: Math.max(16, w - 460), y: 120, w: 430, h: 520, docked: true },
    filters: { x: 24, y: 110, w: 288, h: Math.min(620, h - 190), docked: true },
    help: { x: 70, y: 96, w: 520, h: Math.min(700, h - 160), docked: true },
    detail: { x: Math.max(16, w - 424), y: 96, w: 400, h: 470, docked: true },
    qday: { x: 24, y: top + 16, w: 380, h: Math.max(360, h - top - 120), docked: true },
  }
}
