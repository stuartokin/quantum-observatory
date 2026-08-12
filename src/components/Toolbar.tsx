import { useEffect, useRef, useState } from 'react'

/**
 * THE DOCK.
 *
 * It lists what is put away, not everything that exists. A window on screen is
 * its own control — you can see it, move it, close it — so repeating it here
 * said the same thing twice and left the reader to work out which of the two
 * was authoritative.
 *
 * So an open window disappears from the dock, and docking one brings it back.
 * The dock shrinks as you open things and grows as you put them away, which is
 * what a dock is for.
 *
 * Actions that are not windows — Reset, and the headline overlay — stay
 * permanently, since there is nowhere else for them to live.
 */

export interface ToolbarButton {
  key: string
  label: string
  icon?: string
  /** True when the thing this opens is currently on screen. */
  active?: boolean
  /** A window control: hidden from the dock while its window is open. */
  isWindow?: boolean
  onClick: () => void
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

  // A window that is open is not in the dock. Everything else is.
  const shown = buttons.filter((b) => !(b.isWindow && b.active))

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
        shown.map((b) => (
          <button
            key={b.key}
            className="dock__item"
            onClick={b.onClick}
            aria-pressed={b.active}
            title={b.label}
            style={b.active ? { color: accent } : undefined}
          >
            <span className="dock__icon" aria-hidden="true">
              {b.icon ?? FALLBACK_ICON(b.label)}
            </span>
            {!compact && <span className="dock__label">{b.label}</span>}
          </button>
        ))}

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
