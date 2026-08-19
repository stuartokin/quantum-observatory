import { useEffect, useRef, useState } from 'react'

/**
 * A CITATION YOU CAN OPEN RATHER THAN ONLY FOLLOW.
 *
 * A bare link out is the cheapest way to cite something and the least useful:
 * it takes the reader off the page to find out whether the source is worth
 * leaving the page for. Everything this board knows about a source — its
 * title, publisher, date, identifier, what role it plays in the claim, when
 * the board last checked it — is already held, and none of it was on screen.
 *
 * So a reference opens a panel first and leaves second. The link is still
 * there; it is just no longer the only thing.
 */
export interface RefSource {
  url: string
  title?: string
  publisher?: string
  date?: string
  identifier?: string
  doi?: string
  role?: string
  note?: string
  /** When the board last checked this, where it knows. */
  accessed?: string
  /** Evidence level of the item this source backs, where there is one. */
  level?: string
  /** Whether anyone has checked the claim against this source. */
  reviewNote?: string
}

export function SourceRef({ source, label }: { source: RefSource; label?: string }) {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLSpanElement>(null)

  /**
   * Close on outside click and on Escape. A panel that can only be closed by
   * finding its own toggle again is a panel readers leave open.
   *
   * **The Escape listener runs in the capture phase and stops propagation**,
   * and that is not tidiness. The Q-Day surface also closes on Escape, back to
   * the board — so the first version of this had pressing Escape to dismiss a
   * citation throw the reader out of the Observatory entirely. Both listeners
   * sit on `document`, and this one is added later (the panel mounts on open),
   * so in the bubble phase the surface would win. Capturing first is what
   * makes the innermost thing close, which is what Escape means.
   */
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey, { capture: true })
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey, { capture: true })
    }
  }, [open])

  const name = label ?? source.title ?? source.publisher ?? source.identifier ?? 'source'

  return (
    <span className="qd-ref" ref={box}>
      <button className="qd-ref__btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {name}
      </button>
      {open && (
        <span className="qd-ref__panel" role="dialog" aria-label={`Source: ${name}`}>
          <span className="qd-ref__title">{source.title ?? name}</span>
          <span className="qd-ref__meta">
            {[source.publisher, source.date, source.role].filter(Boolean).join(' · ')}
          </span>
          {(source.identifier || source.doi) && (
            <span className="qd-ref__id">{source.identifier ?? source.doi}</span>
          )}
          {source.level && (
            <span className="qd-ref__level">Evidence level {source.level}</span>
          )}
          {source.note && <span className="qd-ref__note">{source.note}</span>}
          {source.reviewNote && <span className="qd-ref__check">Checked: {source.reviewNote}</span>}
          {source.accessed && <span className="qd-ref__meta">Board last checked {source.accessed}</span>}
          <a href={source.url} target="_blank" rel="noreferrer" className="qd-ref__out">
            Open the source ↗
          </a>
          <span className="qd-ref__url">{source.url.replace(/^https?:\/\//, '').slice(0, 68)}</span>
        </span>
      )}
    </span>
  )
}
