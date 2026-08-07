import { useEffect, useRef, useState } from 'react'

/**
 * The board's own toolbar. Draggable, and the home for minimised frames.
 *
 * Same rule as Frame: the drag runs through the DOM, and state is committed
 * once on release.
 */

export function BoardToolbar({
  docked,
  onRestore,
  onResetView,
  accent,
}: {
  docked: { key: string; label: string }[]
  onRestore: (key: string) => void
  onResetView: () => void
  accent: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<{ ox: number; oy: number; x: number; y: number } | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [legend, setLegend] = useState(false)

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current
      const el = ref.current
      if (!d || !el) return
      el.style.left = `${Math.max(4, Math.min(window.innerWidth - 120, d.x + e.clientX - d.ox))}px`
      el.style.top = `${Math.max(4, Math.min(window.innerHeight - 40, d.y + e.clientY - d.oy))}px`
      el.style.transform = 'none'
    }
    const up = () => {
      const d = drag.current
      const el = ref.current
      drag.current = null
      if (d && el) setPos({ x: parseFloat(el.style.left), y: parseFloat(el.style.top) })
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
    drag.current = { ox: e.clientX, oy: e.clientY, x: r.left, y: r.top }
  }

  return (
    <div
      ref={ref}
      className="board-toolbar"
      style={pos ? { left: pos.x, top: pos.y, transform: 'none' } : undefined}
    >
      <span className="frame__grip" onPointerDown={begin} aria-hidden="true" />

      {docked.map((d) => (
        <button key={d.key} onClick={() => onRestore(d.key)} title={`Show ${d.label}`}>
          {d.label}
        </button>
      ))}

      <button onClick={onResetView} title="Reset zoom and position">Reset</button>

      <button
        className="board-toolbar__info"
        aria-pressed={legend}
        onClick={() => setLegend((v) => !v)}
        aria-label="What the glyphs mean"
        title="What the glyphs mean"
        style={{ color: legend ? accent : undefined }}
      >
        i
      </button>

      {legend && (
        <div className="board-legend">
          <p>
            <strong>Filled glyph</strong> — carries a verified primary source.
          </p>
          <p>
            <strong>Hollow glyph</strong> — a topic on the frontier with no source
            yet. Visible so the shape of the field is honest, but not a claim.
          </p>
          <p>
            <strong>Shape</strong> — the organisation that demonstrated it.
          </p>
          <p>
            <strong>Pulsing ring</strong> — changed readiness level recently, or an
            agent proposal you have not acknowledged.
          </p>
          <p className="label">
            Hover to name · double-click a constellation to pull it out · scroll or
            pinch to zoom · drag to pan
          </p>
        </div>
      )}
    </div>
  )
}
