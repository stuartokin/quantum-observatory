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
export function Ticker({
  items,
  colour,
  onOpen,
}: {
  items: NewsItem[]
  colour: string
  onOpen: (n: NewsItem) => void
}) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<number>()

  useEffect(() => {
    if (paused || items.length < 2) return
    timer.current = window.setInterval(() => setI((n) => (n + 1) % items.length), 7000)
    return () => window.clearInterval(timer.current)
  }, [paused, items.length])

  useEffect(() => setI(0), [items.length])

  if (items.length === 0) {
    return (
      <p className="label" style={{ lineHeight: 1.6 }}>
        Nothing yet. The newsroom agent gathers headlines daily, validates them
        before publishing, and links each to the research behind it.
      </p>
    )
  }

  const n = items[Math.min(i, items.length - 1)]
  const step = (d: number) => {
    setPaused(true)
    setI((x) => (x + d + items.length) % items.length)
  }

  return (
    <div
      className="ticker"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="ticker__bar">
        <button onClick={() => step(-1)} aria-label="Previous">‹</button>
        <span className="ticker__count">
          {Math.min(i + 1, items.length)}/{items.length}
        </span>
        <button onClick={() => step(1)} aria-label="Next">›</button>
        <span className="ticker__state">{paused ? 'paused' : 'rolling'}</span>
      </div>

      <button className="ticker__item" onClick={() => onOpen(n)} data-sig={n.significance}>
        <span className="ticker__meta">
          {n.date}
          {n.significance === 'headline' && (
            <em style={{ color: colour }}> · headline</em>
          )}
          {n.validation?.status !== 'verified' && (
            <em className="ticker__caveat"> · {n.validation?.status}</em>
          )}
        </span>
        <span className="ticker__headline">{n.headline}</span>
        <span className="ticker__plain">{n.plain}</span>
        {n.establishedBy?.length ? (
          <span className="ticker__linked">
            {n.establishedBy.length} linked paper{n.establishedBy.length > 1 ? 's' : ''}
          </span>
        ) : null}
      </button>
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
