import { useEffect, useRef, useState } from 'react'

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

export function Toolbar({
  buttons,
  accent,
  resetSignal,
}: {
  buttons: ToolbarButton[]
  accent: string
  /** Changes when Reset is pressed. Puts the bar back where it started. */
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

  /**
   * Words or icons, decided from the width you set — nothing measured.
   *
   * The previous version measured the rendered rows and set state from a
   * layout effect, which could oscillate: too many rows, switch to icons,
   * buttons shrink, now one row with room, switch back to words, too many rows
   * again. That is React error #185, and no amount of hysteresis truly closes
   * it, because the thing being measured is changed by the measurement.
   *
   * A threshold on the width the reader chose cannot feed back into itself.
   */
  const compact = (width ?? Infinity) < 560 || viewport < 760

  /**
   * Reset puts it back.
   *
   * A window that has been dragged somewhere unhelpful should have a way home
   * that does not require working out what went wrong. Clearing position and
   * width returns it to the centre at its natural size.
   */
  useEffect(() => {
    if (resetSignal === undefined) return
    setPos(null)
    setWidth(null)
    setCollapsed(false)
    const el = ref.current
    if (el) {
      el.style.left = ''
      el.style.top = ''
      el.style.right = ''
      el.style.bottom = ''
      el.style.margin = ''
      el.style.width = ''
      el.style.height = ''
      el.style.transform = ''
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
        // Width only. Height comes from the content, and anything that sets it
        // turns a toolbar into a blob.
        el.style.width = `${w}px`
        el.style.height = ''
        // Commit live, not on release. Committing at pointerup meant the bar
        // only became icons after you let go, which reads as it not working.
        setWidth(w)
        return
      }

      const d = move.current
      if (!d) return
      if (Math.hypot(e.clientX - d.ox, e.clientY - d.oy) > 3) d.moved = true
      /**
       * Clear the opposite anchors before setting these.
       *
       * The bar is centred by being pinned to both left and right with auto
       * margins. Setting `left` while `right` is still pinned leaves it
       * stretched between the two — so grabbing it to move made it fill the
       * page, which looked like a resize bug and was an anchoring one.
       */
      el.style.right = 'auto'
      el.style.bottom = 'auto'
      el.style.margin = '0'
      el.style.height = ''
      el.style.left = `${Math.max(4, Math.min(window.innerWidth - 120, d.x + e.clientX - d.ox))}px`
      el.style.top = `${Math.max(4, Math.min(window.innerHeight - 52, d.y + e.clientY - d.oy))}px`
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
    // Pin the current size before switching anchors, so nothing reflows at the
    // moment the drag starts.
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
          title="Drag to set the width. Height follows the rows."
          aria-hidden="true"
        />
      )}
    </div>
  )
}
