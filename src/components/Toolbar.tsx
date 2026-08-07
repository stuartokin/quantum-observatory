import { useEffect, useRef, useState } from 'react'

/**
 * The single toolbar. Moveable and hideable — nothing more. It does not resize
 * and does not change shape; a control bar that needs configuring is a control
 * bar in the way.
 *
 * The drag runs through the DOM and commits to state once on release, so
 * moving it never re-renders the canvas beneath.
 */

export interface ToolbarButton {
  key: string
  label: string
  active?: boolean
  onClick: () => void
}

export function Toolbar({ buttons, accent }: { buttons: ToolbarButton[]; accent: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<{ ox: number; oy: number; x: number; y: number } | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current
      const el = ref.current
      if (!d || !el) return
      el.style.left = `${Math.max(4, Math.min(window.innerWidth - 120, d.x + e.clientX - d.ox))}px`
      el.style.top = `${Math.max(4, Math.min(window.innerHeight - 44, d.y + e.clientY - d.oy))}px`
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

  const style = pos ? { left: pos.x, top: pos.y, transform: 'none' } : undefined

  if (hidden) {
    return (
      <div ref={ref} className="toolbar toolbar--hidden" style={style}>
        <span className="frame__grip" onPointerDown={begin} title="Drag" aria-hidden="true" />
        <button onClick={() => setHidden(false)} title="Show toolbar" aria-label="Show toolbar">
          ▸
        </button>
      </div>
    )
  }

  return (
    <div ref={ref} className="toolbar" style={style}>
      <span className="frame__grip" onPointerDown={begin} title="Drag" aria-hidden="true" />
      {buttons.map((b) => (
        <button
          key={b.key}
          onClick={b.onClick}
          aria-pressed={b.active}
          style={b.active ? { color: accent } : undefined}
        >
          {b.label}
        </button>
      ))}
      <button
        className="toolbar__hide"
        onClick={() => setHidden(true)}
        title="Hide toolbar"
        aria-label="Hide toolbar"
      >
        ×
      </button>
    </div>
  )
}
