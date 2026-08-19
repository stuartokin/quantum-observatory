import { useState, type ReactNode } from 'react'
import { frontierById } from '../../content/frontier'

/**
 * THE CARD THAT EXPLAINS ITSELF.
 *
 * The research prototype gives every figure the same three-part drawer —
 * *plain terms*, *how it works*, *source* — and that is the single best idea
 * in it. It is also, almost exactly, this board's evidence model:
 *
 *     their "PLAIN TERMS"   →  the item's `plain` field
 *     their "HOW IT WORKS"  →  the item's `evidence.claim`
 *     their source link     →  `evidence.sources[0]`
 *     (no equivalent)       →  `evidence.level`, and whether a human reviewed it
 *
 * So the prototype hand-writes that prose per card and this can read it. Every
 * drawer below is filled from the item it names, which means it cannot drift
 * from the board, it improves when an agent improves the item, and a card
 * whose item loses its sourcing visibly loses its sourcing.
 *
 * That last point is why `BoardFigure` takes an item id rather than strings.
 * A card that could be given arbitrary prose would eventually be given some.
 */

const LEVEL_LABEL: Record<string, string> = {
  E5: 'independently replicated',
  E4: 'peer-reviewed experiment',
  E3: 'preprint',
  E2: 'vendor statement',
  E1: 'theoretical',
  E0: 'speculative',
  unrated: 'no source attached',
}

export function BoardFigure({
  itemId,
  title,
  headline,
  badge,
  meter,
  extra,
}: {
  /** The frontier item this figure is drawn from. */
  itemId: string
  /** Overrides the item's own title where the card needs a shorter one. */
  title?: string
  /** The number, in the reader's face. */
  headline: ReactNode
  /** A short pill — "8.9× more needed". */
  badge?: ReactNode
  /** 0–1. A hint of scale, never a completion percentage. */
  meter?: number
  /** Anything the caller wants above the drawer. */
  extra?: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const item = frontierById.get(itemId)

  const level = item?.evidence?.level
  const source = item?.evidence?.sources?.[0]
  const reviewed = item?.review?.state === 'reviewed'

  return (
    <article className="qd-fig" data-open={open || undefined}>
      <div className="qd-fig__top">
        <h3>{title ?? item?.title ?? itemId}</h3>
        {badge && <span className="qd-fig__badge">{badge}</span>}
      </div>

      <p className="qd-fig__headline">{headline}</p>

      {typeof meter === 'number' && (
        <div
          className="qd-fig__meter"
          role="img"
          aria-label={`${Math.round(Math.min(1, Math.max(0, meter)) * 100)} per cent of the way, on a log scale`}
        >
          <i style={{ width: `${Math.min(1, Math.max(0, meter)) * 100}%` }} />
        </div>
      )}

      {extra}

      {!item ? (
        <p className="qd-fig__missing">
          No item called <code>{itemId}</code> on the board, so this card has nothing behind it.
        </p>
      ) : (
        <>
          <button className="qd-fig__toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? 'Hide' : 'Tap for'} plain terms, the claim &amp; the source
            <svg className="qd-chev" viewBox="0 0 24 24" aria-hidden="true" data-open={open || undefined}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {open && (
            <div className="qd-fig__drawer">
              {item.plain && (
                <>
                  <p className="qd-fig__label">In plain terms</p>
                  <p className="qd-fig__plain">{item.plain}</p>
                </>
              )}

              <p className="qd-fig__label">
                What the evidence says
                {level && (
                  <span className="qd-fig__level" data-level={level}>
                    {level} · {LEVEL_LABEL[level] ?? level}
                  </span>
                )}
                {reviewed ? (
                  <span className="qd-fig__review">human-reviewed</span>
                ) : (
                  <span className="qd-fig__review qd-fig__review--agent">agent, unreviewed</span>
                )}
              </p>
              <p className="qd-fig__claim">{item.evidence?.claim}</p>

              {source && (
                <p className="qd-fig__source">
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title ?? source.publisher ?? source.identifier ?? 'source'} ↗
                  </a>
                  {source.date && <span> · {source.date}</span>}
                  {item.evidence?.verified && <span> · checked {item.evidence.verified}</span>}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </article>
  )
}

/** The same shell where there is no single item behind it — a derived figure. */
export function DerivedFigure({
  title,
  headline,
  badge,
  children,
  drawer,
}: {
  title: string
  headline: ReactNode
  badge?: ReactNode
  children?: ReactNode
  drawer?: ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <article className="qd-fig" data-open={open || undefined}>
      <div className="qd-fig__top">
        <h3>{title}</h3>
        {badge && <span className="qd-fig__badge">{badge}</span>}
      </div>
      <p className="qd-fig__headline">{headline}</p>
      {children}
      {drawer && (
        <>
          <button className="qd-fig__toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? 'Hide' : 'Tap for'} how this is worked out
            <svg className="qd-chev" viewBox="0 0 24 24" aria-hidden="true" data-open={open || undefined}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {open && <div className="qd-fig__drawer">{drawer}</div>}
        </>
      )}
    </article>
  )
}
