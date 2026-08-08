import { useEffect, useRef, useState } from 'react'

/**
 * The single toolbar.
 *
 * Every function is always reachable. When the bar is narrow it wraps onto
 * more rows, and when it is narrower still it drops to icons — but nothing is
 * ever hidden behind an overflow menu, because a control you cannot find is a
 * control you do not have.
 *
 * The grip does double duty: drag to move, click to collapse and click again
 * to restore. One affordance instead of two buttons.
 */

export interface ToolbarButton {
  key: string
  label: string
  /** One or two characters shown when the bar is too narrow for words. */
  icon?: string
  active?: boolean
  onClick: () => void
}

const FALLBACK_ICON = (label: string) => label.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()

export function Toolbar({ buttons, accent }: { buttons: ToolbarButton[]; accent: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<{ ox: number; oy: number; x: number; y: number; moved: boolean } | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [compact, setCompact] = useState(false)

  /**
   * Words while they fit; icons when they do not.
   *
   * Measured from the rendered height rather than guessed from the viewport:
   * a wrapping toolbar keeps its offsetWidth inside the bounds, so comparing
   * widths never detected the overflow. If the bar needs more than two rows,
   * or the viewport is genuinely small, drop to icons.
   */
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const check = () => {
      if (collapsed) return
      const row = 42
      const rows = Math.round(el.offsetHeight / row)
      if (!compact && (rows > 2 || window.innerWidth < 760)) setCompact(true)
      // Only go back to words if there is comfortably room, so it cannot
      // oscillate between the two on a borderline width.
      else if (compact && rows <= 1 && window.innerWidth > 900) setCompact(false)
    }

    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    window.addEventListener('resize', check)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', check)
    }
  }, [buttons.length, compact, collapsed])

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current
      const el = ref.current
      if (!d || !el) return
      if (Math.hypot(e.clientX - d.ox, e.clientY - d.oy) > 3) d.moved = true
      el.style.left = `${Math.max(4, Math.min(window.innerWidth - 90, d.x + e.clientX - d.ox))}px`
      el.style.top = `${Math.max(4, Math.min(window.innerHeight - 44, d.y + e.clientY - d.oy))}px`
      el.style.transform = 'none'
    }
    const up = () => {
      const d = drag.current
      const el = ref.current
      drag.current = null
      if (!d || !el) return
      if (d.moved) setPos({ x: parseFloat(el.style.left), y: parseFloat(el.style.top) })
      // A click that never became a drag is a collapse.
      else setCollapsed((c) => !c)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  const begin = (e: React.PointerEvent) => {
    e.preventDefault()
    const el = ref.current!
    const r = el.getBoundingClientRect()
    el.style.left = `${r.left}px`
    el.style.top = `${r.top}px`
    el.style.transform = 'none'
    drag.current = { ox: e.clientX, oy: e.clientY, x: r.left, y: r.top, moved: false }
  }

  const style = pos ? { left: pos.x, top: pos.y, transform: 'none' } : undefined

  return (
    <div
      ref={ref}
      className="toolbar"
      data-collapsed={collapsed || undefined}
      data-compact={compact || undefined}
      style={style}
    >
      <span
        className="frame__grip"
        onPointerDown={begin}
        title={collapsed ? 'Click to show, drag to move' : 'Click to collapse, drag to move'}
        aria-label={collapsed ? 'Show toolbar' : 'Collapse toolbar'}
        role="button"
      />
      {!collapsed &&
        buttons.map((b) => (
          <button
            key={b.key}
            onClick={b.onClick}
            aria-pressed={b.active}
            title={b.label}
            style={b.active ? { color: accent } : undefined}
          >
            {compact ? (b.icon ?? FALLBACK_ICON(b.label)) : b.label}
          </button>
        ))}
    </div>
  )
}
