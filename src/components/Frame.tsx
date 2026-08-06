import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * A moveable, resizeable panel. Deliberately minimal — no library, no window
 * manager, just pointer events and clamping to the viewport so a frame can
 * never be dragged somewhere it cannot be dragged back from.
 */

export interface FrameState {
  x: number
  y: number
  w: number
  h: number
  collapsed?: boolean
  hidden?: boolean
}

export function Frame({
  title,
  state,
  onChange,
  onClose,
  children,
  accent,
}: {
  title: string
  state: FrameState
  onChange: (s: FrameState) => void
  onClose?: () => void
  children: ReactNode
  accent?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<{ mode: 'move' | 'resize'; ox: number; oy: number; s: FrameState } | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current
      if (!d) return
      const dx = e.clientX - d.ox
      const dy = e.clientY - d.oy
      if (d.mode === 'move') {
        onChange({
          ...d.s,
          x: Math.max(4, Math.min(window.innerWidth - 80, d.s.x + dx)),
          y: Math.max(4, Math.min(window.innerHeight - 44, d.s.y + dy)),
        })
      } else {
        onChange({
          ...d.s,
          w: Math.max(200, Math.min(window.innerWidth - d.s.x - 8, d.s.w + dx)),
          h: Math.max(120, Math.min(window.innerHeight - d.s.y - 8, d.s.h + dy)),
        })
      }
    }
    const up = () => {
      drag.current = null
      setActive(false)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [onChange])

  const begin = (mode: 'move' | 'resize') => (e: React.PointerEvent) => {
    e.preventDefault()
    drag.current = { mode, ox: e.clientX, oy: e.clientY, s: state }
    setActive(true)
  }

  if (state.hidden) return null

  return (
    <section
      ref={ref}
      className="frame"
      data-active={active}
      style={{
        left: state.x,
        top: state.y,
        width: state.w,
        height: state.collapsed ? undefined : state.h,
        borderColor: accent,
      }}
    >
      <header className="frame__bar" onPointerDown={begin('move')}>
        <span className="frame__grip" aria-hidden="true" />
        <span className="frame__title">{title}</span>
        <button
          className="frame__btn"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onChange({ ...state, collapsed: !state.collapsed })}
          aria-label={state.collapsed ? 'Expand' : 'Collapse'}
        >
          {state.collapsed ? '▸' : '▾'}
        </button>
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

      {!state.collapsed && (
        <>
          <div className="frame__body">{children}</div>
          <span className="frame__resize" onPointerDown={begin('resize')} aria-hidden="true" />
        </>
      )}
    </section>
  )
}
