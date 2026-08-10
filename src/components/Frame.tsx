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
 *   minimised   collapsed to its title bar, still on screen
 *   docked      gone from the workspace, recoverable from the toolbar
 */

export interface FrameState {
  x: number
  y: number
  w: number
  h: number
  minimised?: boolean
  docked?: boolean
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
}) {
  const ref = useRef<HTMLElement>(null)
  const drag = useRef<{ mode: 'move' | 'resize'; ox: number; oy: number; s: FrameState } | null>(null)
  const [active, setActive] = useState(false)

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

  if (state.docked) return null

  return (
    <section
      ref={ref}
      className="frame"
      data-active={active}
      data-minimised={state.minimised || undefined}
      onPointerDown={onFocus}
      style={{
        zIndex: z,
        left: state.x,
        top: state.y,
        width: state.w,
        height: state.minimised ? undefined : state.h,
        borderColor: accent,
      }}
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
        <button
          className="frame__btn"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => {
            onChange({ ...state, minimised: !state.minimised })
            requestAnimationFrame(() => onResized?.())
          }}
          aria-label={state.minimised ? 'Expand' : 'Minimise'}
          title={state.minimised ? 'Expand' : 'Minimise'}
        >
          {state.minimised ? '▸' : '▾'}
        </button>
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

      {!state.minimised && !barOnly && (
        <>
          <div className={flush ? 'frame__body frame__body--flush' : 'frame__body'}>
            {children}
          </div>
          <span className="frame__resize" onPointerDown={begin('resize')} aria-hidden="true" />
        </>
      )}
      {info && <div className="frame__info">{info}</div>}

      {!state.minimised && barOnly && (
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
    galaxy: { x: pad, y: top, w: mainW, h: mainH },
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
