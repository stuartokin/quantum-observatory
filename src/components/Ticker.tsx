import { useEffect, useMemo, useRef, useState } from 'react'
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


/**
 * The archive.
 *
 * A ticker is for what is happening; this is for what happened. Grouped by
 * month and collapsed, because a flat list of a year's headlines is a wall
 * rather than a record — the month is the unit people actually think in when
 * they ask when something changed.
 */
export function NewsArchive({
  items,
  colour,
  onOpen,
  onTicker,
}: {
  items: NewsItem[]
  colour: string
  onOpen: (n: NewsItem) => void
  onTicker: () => void
}) {
  const months = useMemo(() => {
    const by = new Map<string, NewsItem[]>()
    for (const n of items) {
      const key = n.date.slice(0, 7)
      if (!by.has(key)) by.set(key, [])
      by.get(key)!.push(n)
    }
    return [...by.entries()].sort((a, b) => b[0].localeCompare(a[0]))
  }, [items])

  const [open, setOpen] = useState<Set<string>>(
    () => new Set(months.length ? [months[0][0]] : []),
  )

  const label = (key: string) =>
    new Date(key + '-01').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  if (items.length === 0) {
    return (
      <p className="label" style={{ lineHeight: 1.6 }}>
        No headlines yet. The newsroom agent gathers them daily, validates each
        before publishing, and links it to the research behind it.
      </p>
    )
  }

  return (
    <div className="archive">
      <div className="archive__bar">
        <span className="label">
          {items.length} headline{items.length > 1 ? 's' : ''} · {months.length} month
          {months.length > 1 ? 's' : ''}
        </span>
        <button onClick={onTicker} title="Back to the rolling view">Rolling</button>
      </div>

      {months.map(([key, list]) => {
        const isOpen = open.has(key)
        return (
          <section key={key} className="archive__month" data-open={isOpen || undefined}>
            <button
              className="archive__head"
              aria-expanded={isOpen}
              onClick={() =>
                setOpen((s) => {
                  const n = new Set(s)
                  n.has(key) ? n.delete(key) : n.add(key)
                  return n
                })
              }
            >
              <span className="archive__caret">{isOpen ? '▾' : '▸'}</span>
              {label(key)}
              <em>{list.length}</em>
            </button>

            {isOpen && (
              <ul className="archive__list">
                {list.map((n) => (
                  <li key={n.id} data-sig={n.significance}>
                    <button onClick={() => onOpen(n)}>
                      <span className="archive__date">{n.date.slice(8)}</span>
                      <span className="archive__headline">{n.headline}</span>
                      <span className="archive__meta">
                        {n.significance === 'headline' && (
                          <em style={{ color: colour }}>headline · </em>
                        )}
                        {n.validation?.status}
                        {n.establishedBy?.length
                          ? ` · ${n.establishedBy.length} linked`
                          : ''}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
      })}
    </div>
  )
}
