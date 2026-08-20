import { useEffect, useRef, useState } from 'react'

/**
 * THE DOCK — ONE COMPONENT, BOTH SURFACES.
 *
 * The board and the Q-Day Observatory used to have separate bars, on the
 * reasoning that one manages windows and the other navigates pages. That is a
 * real difference and it was the wrong conclusion: both are *a list of panels,
 * click one to bring it forward*, and a reader moving between the two surfaces
 * should not have to learn a second set of manners to do the same thing.
 *
 * So there is one dock, and the difference lives in the item rather than in
 * the bar. Four kinds:
 *
 * - **`window`** — the board's frames. Shows *presence*: an open window
 *   disappears from the dock, because a window on screen is already its own
 *   control and listing it twice leaves the reader deciding which is
 *   authoritative. The dock shrinks as you open things and grows as you put
 *   them away, which is what a dock is for.
 * - **`section`** — the Observatory's pages. Shows *selection*: always
 *   present, exactly one lit. Rendered as a real link, so a section can be
 *   opened in a new tab, bookmarked and shared.
 * - **`nav`** — the other surface. **Always the leading item, on both**, with
 *   a divider after it. That single fixed position is what makes two surfaces
 *   read as one product: wherever you are, the way out is in the same place.
 * - **`action`** — Reset and the like. Neither a place nor a panel.
 *
 * The two selection models coexist without a legend because they show
 * different things and both are visible at once: a `window` item is a thing
 * you can put away, a `section` item is a thing you are looking at.
 */

export interface ToolbarButton {
  key: string
  label: string
  icon?: string
  /** True when the thing this opens is currently on screen, or is the
   *  section being read. */
  active?: boolean
  /**
   * `window` hides itself while its window is open. `section` never hides and
   * is a link. `nav` leaves for the other surface. `action` does neither.
   * Defaults to `action`.
   */
  kind?: 'window' | 'section' | 'nav' | 'action'
  /** Makes the item a real anchor. Sections and nav should have one. */
  href?: string
  onClick?: () => void
  /** A rule in the bar rather than a control. Nothing else on it is read. */
  divider?: boolean
}

const FALLBACK_ICON = (label: string) =>
  label.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()

const MIN_W = 120

export function Toolbar({
  buttons,
  accent,
  resetSignal,
}: {
  buttons: ToolbarButton[]
  accent: string
  resetSignal?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const move = useRef<{ ox: number; oy: number; x: number; y: number; moved: boolean } | null>(null)
  const size = useRef<{ ox: number; w: number } | null>(null)

  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [width, setWidth] = useState<number | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [viewport, setViewport] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  )

  useEffect(() => {
    const onResize = () => setViewport(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /** Labels below a chosen width become icons only. Derived, never measured. */
  const compact = (width ?? Infinity) < 420 || viewport < 700

  useEffect(() => {
    if (resetSignal === undefined) return
    setPos(null)
    setWidth(null)
    setCollapsed(false)
    const el = ref.current
    if (el) {
      el.style.cssText = ''
    }
  }, [resetSignal])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = ref.current
      if (!el) return

      if (size.current) {
        const w = Math.max(
          MIN_W,
          Math.min(window.innerWidth - 24, size.current.w + (e.clientX - size.current.ox) * 2),
        )
        el.style.width = `${w}px`
        el.style.height = ''
        setWidth(w)
        return
      }

      const d = move.current
      if (!d) return
      if (Math.hypot(e.clientX - d.ox, e.clientY - d.oy) > 3) d.moved = true
      // The dock is centred by opposing anchors; setting one without clearing
      // the other stretches it across the page.
      el.style.right = 'auto'
      el.style.bottom = 'auto'
      el.style.margin = '0'
      el.style.height = ''
      el.style.left = `${Math.max(4, Math.min(window.innerWidth - 120, d.x + e.clientX - d.ox))}px`
      el.style.top = `${Math.max(4, Math.min(window.innerHeight - 60, d.y + e.clientY - d.oy))}px`
      el.style.transform = 'none'
    }

    const onUp = () => {
      const el = ref.current
      if (size.current) {
        size.current = null
        return
      }
      const d = move.current
      move.current = null
      if (!d || !el) return
      if (d.moved) setPos({ x: parseFloat(el.style.left), y: parseFloat(el.style.top) })
      else setCollapsed((c) => !c)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  const beginMove = (e: React.PointerEvent) => {
    e.preventDefault()
    const el = ref.current!
    const r = el.getBoundingClientRect()
    el.style.width = `${r.width}px`
    el.style.right = 'auto'
    el.style.bottom = 'auto'
    el.style.margin = '0'
    el.style.left = `${r.left}px`
    el.style.top = `${r.top}px`
    el.style.transform = 'none'
    move.current = { ox: e.clientX, oy: e.clientY, x: r.left, y: r.top, moved: false }
  }

  const beginResize = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const el = ref.current!
    const r = el.getBoundingClientRect()
    el.style.right = 'auto'
    el.style.margin = '0'
    size.current = { ox: e.clientX, w: r.width }
  }

  // A window that is open is not in the dock. Everything else is — a section
  // in particular, since the set of sections is the map of the subject and
  // hiding the one you are reading would make that map change as you read it.
  const withoutOpenWindows = buttons.filter((b) => !(b.kind === 'window' && b.active))
  // A divider with nothing after it is a rule against the edge of the bar.
  const shown = withoutOpenWindows.filter(
    (b, i) => !b.divider || withoutOpenWindows.slice(i + 1).some((x) => !x.divider),
  )

  const style: React.CSSProperties = {
    ...(pos ? { left: pos.x, top: pos.y, transform: 'none' } : {}),
    ...(width ? { width } : {}),
  }

  return (
    <div
      ref={ref}
      className="dock"
      data-collapsed={collapsed || undefined}
      data-compact={compact || undefined}
      style={style}
    >
      <span
        className="frame__grip"
        onPointerDown={beginMove}
        title={collapsed ? 'Click to show, drag to move' : 'Click to collapse, drag to move'}
        aria-label={collapsed ? 'Show the dock' : 'Collapse the dock'}
        role="button"
      />

      {!collapsed &&
        shown.map((b) => {
          if (b.divider) return <span key={b.key} className="dock__rule" aria-hidden="true" />

          const inner = (
            <>
              <span className="dock__icon" aria-hidden="true">
                {b.icon ?? FALLBACK_ICON(b.label)}
              </span>
              {!compact && <span className="dock__label">{b.label}</span>}
            </>
          )
          const kind = b.kind ?? 'action'
          const common = {
            className: 'dock__item',
            'data-kind': kind,
            title: b.label,
            style: b.active ? { color: accent } : undefined,
          }

          /**
           * A section is an anchor, not a button.
           *
           * It addresses a page that has a URL, so middle-click, open-in-new-
           * tab and copy-link-address all have to work — a tab bar built from
           * buttons quietly takes those away, and a reader who wants two
           * sections side by side in two browser tabs is doing exactly what
           * this board is for.
           */
          return b.href ? (
            <a
              key={b.key}
              {...common}
              href={b.href}
              aria-current={kind === 'section' && b.active ? 'page' : undefined}
              onClick={b.onClick}
            >
              {inner}
            </a>
          ) : (
            <button key={b.key} {...common} onClick={b.onClick} aria-pressed={b.active}>
              {inner}
            </button>
          )
        })}

      {!collapsed && shown.length === 0 && (
        <span className="dock__empty">Everything is open</span>
      )}

      {!collapsed && (
        <span
          className="toolbar__resize"
          onPointerDown={beginResize}
          title="Drag to set the width. Height follows the rows."
          aria-hidden="true"
        />
      )}
    </div>
  )
}
