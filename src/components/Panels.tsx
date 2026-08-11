import { useEffect, useMemo, useState } from 'react'
import type { NewsEntry, NewsWeek } from '../renderers/board/news'
import type { Forecast } from '../content/forecast'

/* ---------------------------------------------------------------- */

const KIND_LABEL: Record<string, string> = {
  added: 'added',
  moved: 'moved',
  sourced: 'sourced',
  agent: 'agent',
  reviewed: 'reviewed',
  vetoed: 'vetoed',
}

function Entry({
  e,
  colour,
  onSelect,
}: {
  e: NewsEntry
  colour: string
  onSelect: (id: string) => void
}) {
  return (
    <li className="news__item" data-kind={e.kind}>
      <button onClick={() => onSelect(e.id)}>
        <span className="news__kind" style={{ color: e.kind === 'moved' ? colour : undefined }}>
          {KIND_LABEL[e.kind]}
        </span>
        <span className="news__title">{e.title}</span>
        <span className="news__line">{e.line}</span>
        <span className="news__meta">
          {e.constellation}
          {e.level ? ` · ${e.level}` : ''}
          {e.priority ? ` · ${e.priority}` : ''}
          {typeof e.qdayImpact === 'number' && e.qdayImpact !== 0
            ? ` · Q-Day ${e.qdayImpact > 0 ? '+' : ''}${e.qdayImpact}`
            : ''}
        </span>
      </button>
    </li>
  )
}

/**
 * What changed, by week. Everything here is derived from the board, so it
 * cannot disagree with what the board shows — which a hand-written feed
 * eventually would.
 */
export function News({
  weeks,
  colour,
  onSelect,
}: {
  weeks: NewsWeek[]
  colour: string
  onSelect: (id: string) => void
}) {
  if (weeks.length === 0) {
    return <p className="label">Nothing has changed yet.</p>
  }

  return (
    <div className="news">
      {weeks.map((w) => (
        <section key={w.start} className="news__week">
          <h4>
            {w.label}
            <em>{w.entries.length}</em>
          </h4>
          <ul>
            {w.entries.map((e) => (
              <Entry key={`${e.id}-${e.kind}-${e.date}`} e={e} colour={colour} onSelect={onSelect} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------- */

/**
 * The glance panel. Only readiness changes and high-weight items, and only from
 * the last fortnight — a teaser showing everything is a list, not a teaser.
 */
export function Teaser({
  entries,
  colour,
  onSelect,
  onJump,
}: {
  entries: NewsEntry[]
  colour: string
  onSelect: (id: string) => void
  onJump: (constellation: string) => void
}) {
  if (entries.length === 0) {
    return (
      <p className="label" style={{ lineHeight: 1.6 }}>
        Nothing has moved recently. When an item changes readiness level, or an
        agent publishes something significant, it appears here.
      </p>
    )
  }

  return (
    <ul className="teaser">
      {entries.map((e) => (
        <li key={`${e.id}-${e.kind}`}>
          <button onClick={() => onSelect(e.id)}>
            <span className="teaser__dot" style={{ background: colour }} />
            <span className="teaser__title">{e.title}</span>
            <span className="teaser__line">{e.line}</span>
          </button>
          {e.constellation && (
            <button
              className="teaser__jump"
              onClick={() => onJump(e.constellation!)}
              title={`Open the ${e.constellation} constellation`}
            >
              →
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}

/* ---------------------------------------------------------------- */

function ago(date?: string): string {
  if (!date) return 'never'
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 864e5)
  if (days < 1) return 'today'
  if (days < 31) return `${days}d ago`
  if (days < 365) return `${Math.round(days / 30.44)}mo ago`
  return `${(days / 365).toFixed(1)}y ago`
}

/**
 * The forecast, shown wherever the board is shown.
 *
 * Never a bare number: the range, its state, and when a human last looked.
 * A recent agent move against an old review date is visibly a number nobody
 * has checked, and the reader can weigh that themselves.
 */
export function QDayBar({
  forecast,
  colour,
  onOpen,
}: {
  forecast?: Forecast
  colour: string
  onOpen: () => void
}) {
  /**
   * The bar sheds detail as the header narrows.
   *
   * It sat beside six statistics with neither able to shrink, so on a normal
   * screen the two ran into each other. The range is the part worth keeping;
   * the central estimate and the review age are available in the panel.
   */
  const [wide, setWide] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1600 : false,
  )
  useEffect(() => {
    const onResize = () => setWide(window.innerWidth >= 1600)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!forecast) return null
  const { earliest, aggressive, central, conservative } = forecast.estimates
  const agentSet = forecast.state === 'agent-estimate'

  return (
    <button className="qday" onClick={onOpen} data-agent={agentSet || undefined}>
      <span className="qday__label">Q-Day</span>
      <span className="qday__range" style={{ color: colour }}>
        {aggressive ?? earliest}–{conservative ?? central}
      </span>
      {wide && central && <span className="qday__central">central {central}</span>}
      {wide && (
        <span className="qday__state">
          {agentSet ? 'Agent estimate, not yet reviewed' : 'Reviewed'}
          {' · '}
          {ago(forecast.lastHumanReview ?? forecast.on)}
        </span>
      )}
      {!wide && agentSet && <span className="qday__state">agent</span>}
    </button>
  )
}

export function QDayPanel({ forecast, colour }: { forecast?: Forecast; colour: string }) {
  const log = useMemo(() => [...(forecast?.log ?? [])].reverse(), [forecast])
  if (!forecast) return <p className="label">No forecast recorded.</p>

  const e = forecast.estimates
  const rows: [string, number | undefined][] = [
    ['Earliest plausible', e.earliest],
    ['Aggressive', e.aggressive],
    ['Central', e.central],
    ['Conservative', e.conservative],
  ]

  return (
    <div className="qday-panel">
      <p className="qday-panel__q">{forecast.question}</p>

      <dl className="metrics">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd style={label === 'Central' ? { color: colour } : undefined}>{value ?? '—'}</dd>
          </div>
        ))}
      </dl>

      <p className={forecast.state === 'agent-estimate' ? 'prov prov--agent' : 'prov'}>
        <span className="prov__dot" />
        {forecast.state === 'agent-estimate' ? 'Agent estimate, not yet reviewed' : 'Human-set'}
      </p>
      <p className="label" style={{ marginTop: 8 }}>
        Last human review {ago(forecast.lastHumanReview)}
      </p>

      {forecast.note && <p className="prov-note">{forecast.note}</p>}

      <span className="label" style={{ display: 'block', marginTop: 16 }}>
        Change history
      </span>
      <ul className="qday-log">
        {log.map((l) => (
          <li key={l.date + l.to}>
            <strong>{l.date}</strong> {l.from} → {l.to}
            <em>{l.by === 'agent' ? ` (${l.agent ?? 'agent'})` : ' (human)'}</em>
            <span>{l.evidence}</span>
            {l.assumption && <span className="qday-log__assumption">{l.assumption}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
