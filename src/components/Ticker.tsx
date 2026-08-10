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
}: {
  items: NewsItem[]
  colour: string
  onOpen: (n: NewsItem) => void
}) {
  const track = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const offset = useRef(0)
  const paused = useRef(false)
  const [showState, setShowState] = useState(false)

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
    setShowState(true)
    offset.current += dir * -260
  }

  if (items.length === 0) {
    return (
      <div className="strip strip--empty">
        <span className="strip__label">Headlines</span>
        <span className="strip__none">
          Nothing yet — the newsroom agent gathers daily, validates before
          publishing, and links each item to the research behind it.
        </span>
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
        setShowState(true)
      }}
      onPointerLeave={() => {
        paused.current = false
        setShowState(false)
      }}
    >
      <span className="strip__label" style={{ color: colour }}>
        Headlines
      </span>

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

      <div className="strip__controls" data-active={showState || undefined}>
        <button onClick={() => nudge(-1)} aria-label="Back">‹</button>
        <button onClick={() => nudge(1)} aria-label="Forward">›</button>
      </div>
    </div>
  )
}

function ago(date?: string): string {
  if (!date) return ''
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 864e5)
  if (days < 1) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 31) return `${days} days ago`
  return `${Math.round(days / 30.44)} months ago`
}

/** The full item, opened from the ticker. */
export function NewsDetail({ item, colour }: { item: NewsItem; colour: string }) {
  const v = item.validation
  return (
    <div className="news-detail">
      <span className="label">
        {item.date} · {ago(item.date)}
        {item.significance === 'headline' && ' · headline'}
      </span>
      <h3 style={{ color: colour }}>{item.headline}</h3>
      <p>{item.plain}</p>

      <span className="label">Why this is believed</span>
      <p className={v?.status === 'verified' ? 'prov' : 'prov prov--agent'}>
        <span className="prov__dot" />
        {v?.status}
      </p>
      <ul className="news-detail__checks">
        {(v?.checks ?? []).map((c, k) => (
          <li key={k}>{c}</li>
        ))}
      </ul>
      {v?.note && <p className="prov-note">{v.note}</p>}

      <span className="label">Source</span>
      <ul className="news-detail__links">
        <li>
          <a href={item.source.url} target="_blank" rel="noopener noreferrer">
            {item.source.title ?? item.source.url}
          </a>
          <em> · {item.source.kind}</em>
          {item.source.publisher && <em> · {item.source.publisher}</em>}
        </li>
        {(item.corroboration ?? []).map((c, k) => (
          <li key={k}>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              {c.publisher ?? c.url}
            </a>
            <em> · corroborating</em>
          </li>
        ))}
      </ul>

      {item.establishedBy?.length ? (
        <>
          <span className="label">The research behind it</span>
          <p className="prov-note">
            An announcement is usually the visible end of work published earlier.
            These are the papers this rests on.
          </p>
          <ul className="news-detail__links">
            {item.establishedBy.map((e, k) => (
              <li key={k}>
                <a href={e.url} target="_blank" rel="noopener noreferrer">
                  {e.title ?? e.url}
                </a>
                {e.relation && <em> · {e.relation}</em>}
                {e.publisher && <em> · {e.publisher}</em>}
                {e.date && <em> · {e.date}</em>}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {item.about?.length ? (
        <>
          <span className="label">On the board</span>
          <p className="news-detail__about">{item.about.join(' · ')}</p>
        </>
      ) : null}
    </div>
  )
}
