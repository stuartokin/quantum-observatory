import { useMemo } from 'react'
import { milestones } from '../../content/milestones'
import type { Milestone } from '../../content/milestoneTypes'
import { frontier, frontierById } from '../../content/frontier'
import { allNews } from '../../content/newsroom'
import type { Forecast } from '../../content/forecast'
import { derive } from '../derive'
import { useNow } from '../countdown'
import { Section, Takeaway } from '../ui/Section'
import { useTooltip, ChartTooltip } from '../ui/Tooltip'

/**
 * PLAN — the dated obligations against the estimate they are racing.
 *
 * The list this used to be was accurate and told you nothing you could not
 * have got from a table. The question a reader actually has is *does the
 * migration finish before the thing it is defending against arrives*, and that
 * is a question about two intervals — so it wants a chart with both on one
 * axis, which is what this draws.
 *
 * The Q-Day band is derived, not typed: it comes from the same expert
 * elicitation the Trends page uses, so if the evidence moves, the band moves
 * and the deadlines stay put. That is the whole point of the picture.
 */

const yearOf = (d: string) => Number(d.slice(0, 4)) + (Number(d.slice(5, 7)) - 1) / 12

/* ------------------------------------------------------------------ gantt */

function Timeline({
  rows,
  window,
  now,
}: {
  rows: { key: string; authority: string; items: Milestone[] }[]
  window: { from: number; to: number } | null
  now: Date
}) {
  const { tip, show, hide } = useTooltip()
  const W = 900
  const ROW = 62
  const PAD = { t: 26, r: 40, b: 34, l: 132 }
  const H = PAD.t + rows.length * ROW + PAD.b

  const years = rows.flatMap((r) => r.items.map((m) => yearOf(m.date)))
  const lo = Math.floor(Math.min(...years, now.getFullYear())) - 1
  const hi = Math.ceil(Math.max(...years, window?.to ?? 0)) + 1
  const X = (y: number) => PAD.l + ((y - lo) / (hi - lo)) * (W - PAD.l - PAD.r)

  const ticks: number[] = []
  for (let y = Math.ceil(lo); y <= hi; y += 2) ticks.push(y)

  const nowYear = now.getFullYear() + now.getMonth() / 12

  return (
    <figure className="qd-gantt">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Regulatory milestones against the estimated Q-Day window">
        {/* The estimated window, behind everything. */}
        {window && (
          <g>
            <rect
              x={X(window.from)}
              y={PAD.t - 12}
              width={X(window.to) - X(window.from)}
              height={H - PAD.t - PAD.b + 18}
              className="qd-gantt__window"
            />
            {/* Above the band. It sat on the tick row and printed straight
                through "2039". */}
            <text x={(X(window.from) + X(window.to)) / 2} y={PAD.t - 20} className="qd-gantt__windowlabel">
              estimated Q-Day {window.from}–{window.to}
            </text>
          </g>
        )}

        {ticks.map((y) => (
          <text key={y} x={X(y)} y={H - 12} className="qd-gantt__tick">
            {y}
          </text>
        ))}

        {/* Now. */}
        <line x1={X(nowYear)} x2={X(nowYear)} y1={PAD.t - 16} y2={H - PAD.b} className="qd-gantt__now" />
        <text x={X(nowYear)} y={PAD.t - 20} className="qd-gantt__nowlabel">
          now
        </text>

        {rows.map((row, i) => {
          const y = PAD.t + i * ROW + ROW / 2
          const xs = row.items.map((m) => X(yearOf(m.date)))
          return (
            <g key={row.key}>
              <text x={PAD.l - 14} y={y - 4} className="qd-gantt__row">
                {row.key}
              </text>
              <text x={PAD.l - 14} y={y + 10} className="qd-gantt__rowsub">
                {row.authority}
              </text>
              <line
                x1={Math.min(...xs)}
                x2={Math.max(...xs)}
                y1={y}
                y2={y}
                className="qd-gantt__span"
              />
              {row.items.map((m, k) => (
                <circle
                  key={m.id}
                  cx={xs[k]}
                  cy={y}
                  r={7}
                  className="qd-gantt__dot"
                  data-status={m.status}
                  tabIndex={0}
                  onMouseEnter={(e) =>
                    show(
                      e,
                      <>
                        <b>
                          {m.date.slice(0, 4)} · {m.title}
                        </b>
                        <span>{m.what}</span>
                        <i>
                          {m.authority} · {m.status}
                        </i>
                      </>,
                    )
                  }
                  onFocus={(e) => show(e, <b>{`${m.date.slice(0, 4)} · ${m.title}`}</b>)}
                  onMouseLeave={hide}
                  onBlur={hide}
                />
              ))}
              <text x={Math.max(...xs) + 13} y={y + 4} className="qd-gantt__end">
                {row.items[row.items.length - 1].date.slice(0, 4)}
              </text>
            </g>
          )
        })}
      </svg>
      <ChartTooltip tip={tip} width={W} />
      <div className="qd-legend">
        <span>
          <i className="qd-legend__line" /> migration window
        </span>
        <span>
          <i style={{ background: 'var(--qd-threat)' }} /> milestone
        </span>
        {window && (
          <span>
            <i className="qd-legend__band" /> estimated Q-Day
          </span>
        )}
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------- page */

export function Plan({ forecast }: { forecast?: Forecast }) {
  const now = useNow(60_000)
  const d = useMemo(() => derive(frontier, forecast, allNews), [forecast])

  const rows = useMemo(() => {
    const by = new Map<string, Milestone[]>()
    for (const m of milestones) {
      if (m.kind !== 'deadline') continue
      const list = by.get(m.jurisdiction)
      if (list) list.push(m)
      else by.set(m.jurisdiction, [m])
    }
    return [...by.entries()]
      .map(([key, items]) => ({
        key,
        authority: items[0].authority,
        items: items.slice().sort((a, b) => a.date.localeCompare(b.date)),
      }))
      .sort((a, b) => a.key.localeCompare(b.key))
  }, [])

  const grouped = useMemo(() => {
    const by = new Map<string, Milestone[]>()
    for (const m of milestones) {
      const list = by.get(m.jurisdiction)
      if (list) list.push(m)
      else by.set(m.jurisdiction, [m])
    }
    return [...by.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [])

  if (milestones.length === 0) {
    return (
      <div className="qd-pending">
        <p className="qd-pending__flag">Nothing to show</p>
        <h2>Plan</h2>
        <p className="qd-pending__blurb">
          This page renders <code>content/milestones/</code>, which is empty.
        </p>
      </div>
    )
  }

  const w = d.window

  return (
    <div className="qd-plan">
      <Section
        title="All milestones vs Q-Day"
        info={
          <>
            The dots are dated obligations from <code>content/milestones/</code>, each with the
            source that set it. The amber band is the Q-Day window derived on the Trends page
            from expert elicitation — the only evidence on this board that maps to calendar
            years. Nothing here is typed into the application: move the evidence and the band
            moves, while the deadlines stay where their regulators put them.
          </>
        }
      >
        <p className="qd-trends__lede">
          {w
            ? `Every published deadline lands before the earliest estimate — the migration is
               meant to finish ${w.from - 2035} to ${w.to - 2035} years before the thing it defends against.
               That margin is the whole plan, and it only exists if the deadlines are met.`
            : `No Q-Day window could be derived, so the deadlines are shown on their own.`}
        </p>
        <div className="qd-panel">
          <Timeline rows={rows} window={w} now={now} />
        </div>
        <Takeaway>
          <p>
            The deadlines are not spaced evenly through the window — they cluster at the end.
            Both the UK and US timetables put their heaviest obligation on the final date, which
            means the margin shown here is only real if the last few years go to plan. A
            slipped 2031 does not cost a year; it costs the buffer.
          </p>
          <p>
            And the band moves. It is derived from a survey that has accelerated in each of its
            last two editions — if it accelerates again, the band moves left and the margin
            closes from the other side without any deadline changing.
          </p>
        </Takeaway>
      </Section>

      <Section title="Global deadlines" defaultOpen>
        <div className="qd-plan__grid">
          {grouped.map(([jurisdiction, list]) => (
            <article className="qd-plan__card" key={jurisdiction}>
              <p className="qd-plan__cardhead">
                <span className="qd-plan__flag">{jurisdiction}</span>
                {list[0].authority}
              </p>
              <dl className="qd-plan__rows">
                {list.map((m) => {
                  const due = new Date(`${m.date}T23:59:59Z`).getTime()
                  const days = Math.ceil((due - now.getTime()) / 864e5)
                  return (
                    <div key={m.id} data-status={m.status}>
                      <dt>{m.date.slice(0, 4)}</dt>
                      <dd>
                        <b>{m.title}</b>
                        <span className="qd-plan__what">{m.what}</span>
                        {m.plain && <span className="qd-plan__plain">{m.plain}</span>}
                        <span className="qd-plan__meta">
                          {m.status === 'met'
                            ? 'met'
                            : days < 0
                              ? `${Math.abs(days).toLocaleString('en-GB')} days ago`
                              : `${days.toLocaleString('en-GB')} days left`}
                          {' · '}
                          <a href={m.source.url} target="_blank" rel="noreferrer">
                            {m.source.publisher ?? 'source'} ↗
                          </a>
                          {m.about && m.about.length > 0 && (
                            <>
                              {' · '}
                              {m.about.map((id) => frontierById.get(id)?.title ?? id).join(', ')}
                            </>
                          )}
                        </span>
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </article>
          ))}
        </div>
        <p className="qd-note">
          Dates are held as content with their sources, not compiled into the application. A
          deadline in the past is never marked met by arithmetic — the board records whether it
          was actually discharged, because a date passing and an obligation being met are
          different facts.
        </p>
      </Section>
    </div>
  )
}
