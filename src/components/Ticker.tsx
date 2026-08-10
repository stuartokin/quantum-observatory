import { useEffect, useRef, useState } from 'react'
import type { NewsItem } from '../content/newsTypes'

/**
 * A slow ticker.
 *
 * It moves on its own so the panel is alive without demanding attention, and
 * stops the moment you touch it — an automatic scroll you cannot arrest is a
 * way of losing something you were reading. Forward and back step one item.
 *
 * Headline items are marked; everything else is deliberately quiet.
 */
/**
 * A ticker across the full width of the page.
 *
 * The transform is written straight to the DOM from an animation frame and
 * never through React state. Sixty state updates a second would re-render the
 * board beneath it — the same mistake that made the constellation rotation
 * fight itself, and worth not repeating one component later.
 *
 * The content is rendered twice so the loop is seamless: when the first copy
 * has scrolled fully out, the offset resets by exactly its width and nothing
 * appears to move.
 */
export function Ticker({
  items,
  colour,
  onOpen,
  onArchive,
}: {
  items: NewsItem[]
  colour: string
  onOpen: (n: NewsItem) => void
  /** Swap the rolling view for the month archive. */
  onArchive: () => void
}) {
  const track = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const offset = useRef(0)
  const paused = useRef(false)
  /** True while the reader is in charge of it — hover or an explicit step. */
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (items.length === 0) return
    let raf = 0
    let last = performance.now()

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const el = inner.current
      if (el) {
        if (!paused.current) offset.current -= 34 * dt // pixels per second
        const half = el.scrollWidth / 2
        if (half > 0 && -offset.current >= half) offset.current += half
        if (offset.current > 0) offset.current -= half
        el.style.transform = `translateX(${offset.current}px)`
      }
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [items.length])

  /** Step by roughly one item, so the controls feel like paging not scrubbing. */
  const nudge = (dir: number) => {
    paused.current = true
    setHeld(true)
    offset.current += dir * -260
  }

  if (items.length === 0) {
    return (
      <div className="strip strip--empty">
        <span className="strip__none">
          Nothing yet — the newsroom agent gathers daily, validates before
          publishing, and links each item to the research behind it.
        </span>
        <div className="strip__controls" data-active>
          <button onClick={onArchive} title="By month">☰</button>
        </div>
      </div>
    )
  }

  const row = [...items, ...items]

  return (
    <div
      className="strip"
      ref={track}
      onPointerEnter={() => {
        paused.current = true
        setHeld(true)
      }}
      onPointerLeave={() => {
        paused.current = false
        setHeld(false)
      }}
      data-held={held || undefined}
    >
      <div className="strip__window">
        <div className="strip__inner" ref={inner}>
          {row.map((n, k) => (
            <button
              key={`${n.id}-${k}`}
              className="strip__item"
              data-sig={n.significance}
              onClick={() => onOpen(n)}
              title={n.plain}
            >
              <span className="strip__date">{n.date}</span>
              {n.significance === 'headline' && (
                <span className="strip__flag" style={{ background: colour }} />
              )}
              <span className="strip__headline">{n.headline}</span>
              {n.validation?.status !== 'verified' && (
                <span className="strip__caveat">{n.validation?.status}</span>
              )}
              {n.establishedBy?.length ? (
                <span className="strip__linked">
                  {n.establishedBy.length} paper{n.establishedBy.length > 1 ? 's' : ''}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="strip__controls" data-active={held || undefined}>
        <button onClick={() => nudge(-1)} aria-label="Back">‹</button>
        <button onClick={() => nudge(1)} aria-label="Forward">›</button>
        <button onClick={onArchive} title="By month">☰</button>
      </div>
    </div>
  )
}
