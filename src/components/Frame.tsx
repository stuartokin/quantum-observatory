import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * A moveable, resizeable panel.
 *
 * Drags are driven straight through the DOM and only committed to React state
 * on release. Calling setState on every pointermove re-rendered the tree and
 * forced a full canvas redraw per pixel — which is why dragging felt like it
 * was fighting you.
 */

export interface FrameState {
  x: number
  y: number
  w: number
  h: number
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
        el.style.width = `${Math.max(210, Math.min(window.innerWidth - d.s.x - 8, d.s.w + dx))}px`
        el.style.height = `${Math.max(130, Math.min(window.innerHeight - d.s.y - 8, d.s.h + dy))}px`
      }
    }

    const up = () => {
      const d = drag.current
      const el = ref.current
      drag.current = null
      setActive(false)
      if (!d || !el) return
      // Commit once, at the end.
      onChange({
        ...d.s,
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
        w: parseFloat(el.style.width),
        h: parseFloat(el.style.height),
      })
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
    const el = ref.current!
    // Seed inline styles so the drag has something to move.
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
      onPointerDown={onFocus}
      style={{
        zIndex: z,
        left: state.x,
        top: state.y,
        width: state.w,
        height: state.h,
        borderColor: accent,
      }}
    >
      <header className="frame__bar" onPointerDown={begin('move')}>
        <span className="frame__grip" aria-hidden="true" />
        <span className="frame__title">{title}</span>
        {onDock && (
          <button
            className="frame__btn"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onDock}
            aria-label="Minimise to toolbar"
            title="Minimise to toolbar"
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

      <div className="frame__body">{children}</div>
      <span className="frame__resize" onPointerDown={begin('resize')} aria-hidden="true" />
    </section>
  )
}
