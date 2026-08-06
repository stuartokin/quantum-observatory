import { useEffect, useRef, useState } from 'react'
import { useSite } from '../store/useSite'
import { worlds } from '../worlds'

/**
 * The document route is permanent and always one tap away. It is not a
 * fallback — it is the other half of the site.
 *
 * The bar hides while scrolling down and returns on scroll up, so it stops
 * covering the text it sits over. App behaviour, not web behaviour.
 */
export function RendererToggle() {
  const renderer = useSite((s) => s.renderer)
  const world = useSite((s) => s.world)
  const setRenderer = useSite((s) => s.setRenderer)
  const setWorld = useSite((s) => s.setWorld)

  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    if (renderer === 'world') {
      setHidden(false)
      return
    }
    const onScroll = () => {
      const y = window.scrollY
      const dy = y - lastY.current
      if (Math.abs(dy) > 6) {
        setHidden(dy > 0 && y > 120)
        lastY.current = y
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [renderer])

  return (
    <nav className="toggle-bar app-chrome" data-hidden={hidden} aria-label="View">
      <button aria-pressed={renderer === 'board'} onClick={() => setRenderer('board')}>
        Board
      </button>
      <button aria-pressed={renderer === 'document'} onClick={() => setRenderer('document')}>
        Read
      </button>
      {worlds.map((w) => (
        <button
          key={w.id}
          aria-pressed={renderer === 'world' && world === w.id}
          onClick={() => { setWorld(w.id); setRenderer('world') }}
          title={w.blurb}
        >
          {w.label}
        </button>
      ))}
    </nav>
  )
}
