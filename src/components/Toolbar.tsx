import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * The single toolbar — a small window rather than a bar.
 *
 * You size it with the grip on the bottom-right corner, and it reflows to fit:
 * wrapping onto more rows, then dropping to icons when words no longer fit.
 * Two attempts at detecting that automatically were both wrong in different
 * ways, so the width is now yours to set and the layout simply obeys it.
 *
 * Nothing is ever hidden behind an overflow menu. A control you cannot find is
 * a control you do not have.
 *
 * The grip on the left does double duty: drag to move, click to collapse.
 */

export interface ToolbarButton {
  key: string
  label: string
  /** Shown when the chosen width is too narrow for words. */
  icon?: string
  active?: boolean
  onClick: () => void
}

const FALLBACK_ICON = (label: string) =>
  label.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()

const MIN_W = 132
const MAX_ROWS = 2

export function Toolbar({ buttons, accent }: { buttons: ToolbarButton[]; accent: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const move = useRef<{ ox: number; oy: number; x: number; y: number; moved: boolean } | null>(null)
  const size = useRef<{ ox: number; w: number } | null>(null)

  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [width, setWidth] = useState<number | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [compact, setCompact] = useState(false)

  /**
   * Words if they fit in the width you chose, icons if they do not.
   *
   * Counted from the buttons themselves — how many distinct vertical positions
   * they occupy — rather than inferred from the container height. Dividing
   * height by an assumed row height was wrong twice: padding and gaps made the
   * estimate drift, so a genuinely overflowing bar reported two rows and never
   * switched.
   */
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || collapsed) return

    const measure = () => {
      const btns = Array.from(el.querySelectorAll('button'))
      if (btns.length === 0) return
      const rows = new Set(btns.map((b) => (b as HTMLElement).offsetTop)).size

      // A hard floor as well as the row test. Below this width words cannot
      // fit whatever the wrapping does, and relying on the row count alone
      // meant a narrow bar could sit at two rows of truncated labels forever.
      const w = width ?? el.offsetWidth
      if (!compact && (rows > MAX_ROWS || w < 460)) setCompact(true)
      // Returning to words needs clear room, so it cannot flicker at a
      // borderline width: only when everything already fits on one line.
      else if (compact && rows === 1 && w > 620) {
        const natural = btns.reduce((t, b) => t + (b as HTMLElement).offsetWidth, 0)
        if (natural * 1.9 < w) setCompact(false)
      }
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width, compact, collapsed, buttons.length])

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
        return
      }

      const d = move.current
      if (!d) return
      if (Math.hypot(e.clientX - d.ox, e.clientY - d.oy) > 3) d.moved = true
      el.style.left = `${Math.max(4, Math.min(window.innerWidth - 90, d.x + e.clientX - d.ox))}px`
      el.style.top = `${Math.max(4, Math.min(window.innerHeight - 44, d.y + e.clientY - d.oy))}px`
      el.style.transform = 'none'
    }

    const onUp = () => {
      const el = ref.current
      if (size.current && el) {
        setWidth(parseFloat(el.style.width))
        size.current = null
        return
      }
      const d = move.current
      move.current = null
      if (!d || !el) return
      if (d.moved) setPos({ x: parseFloat(el.style.left), y: parseFloat(el.style.top) })
      else setCollapsed((c) => !c) // a click that never became a drag
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
    el.style.left = `${r.left}px`
    el.style.top = `${r.top}px`
    el.style.transform = 'none'
    move.current = { ox: e.clientX, oy: e.clientY, x: r.left, y: r.top, moved: false }
  }

  const beginResize = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const el = ref.current!
    size.current = { ox: e.clientX, w: el.getBoundingClientRect().width }
  }

  const style: React.CSSProperties = {
    ...(pos ? { left: pos.x, top: pos.y, transform: 'none' } : {}),
    ...(width ? { width } : {}),
  }

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
        onPointerDown={beginMove}
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

      {!collapsed && (
        <span
          className="toolbar__resize"
          onPointerDown={beginResize}
          title="Drag to resize"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
