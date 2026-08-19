import { useId, useState, type ReactNode } from 'react'

/**
 * A COLLAPSIBLE SECTION, WITH ITS METHODOLOGY ONE TAP AWAY.
 *
 * Borrowed wholesale from the research prototype, which handles density better
 * than the flat stacks this surface shipped with: a small-caps monospace rule
 * across the page, a chevron, and everything below it foldable. On a page with
 * six analyses on it, being able to shut four of them is the difference
 * between a reference and a wall.
 *
 * The `info` slot is the other half of that idea. Every section here is
 * computed from board content, and how it was computed belongs *next to the
 * result* rather than in a footnote nobody reaches — but not in front of it
 * either. A button that opens the working is the right weight.
 */
export function Section({
  title,
  info,
  defaultOpen = true,
  children,
}: {
  title: string
  info?: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  const [showInfo, setShowInfo] = useState(false)
  const id = useId()

  return (
    <section className="qd-section">
      <div className="qd-section__bar">
        <button
          className="qd-section__head"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{title}</span>
          <svg className="qd-chev" viewBox="0 0 24 24" aria-hidden="true" data-open={open || undefined}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {info && (
          <button
            className="qd-section__info"
            aria-expanded={showInfo}
            aria-label="How this is worked out"
            onClick={() => setShowInfo((v) => !v)}
          >
            i
          </button>
        )}
      </div>
      {info && showInfo && <div className="qd-section__method">{info}</div>}
      <div id={id} hidden={!open}>
        {children}
      </div>
    </section>
  )
}

/**
 * The "Key takeaway" button under a chart.
 *
 * A chart that needs a paragraph to be understood is usually a bad chart, but
 * a chart whose *implication* is worth stating is common — and the implication
 * is exactly the thing a reader should be able to disagree with, so it is
 * shown as a claim rather than woven into the caption as fact.
 */
export function Takeaway({ label = 'Key takeaway', children }: { label?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="qd-takeaway">
      <button className="qd-disc" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {label}
        <svg className="qd-chev" viewBox="0 0 24 24" aria-hidden="true" data-open={open || undefined}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="qd-takeaway__body">{children}</div>}
    </div>
  )
}
