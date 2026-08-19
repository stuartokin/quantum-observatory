import { useMemo } from 'react'
import { frontier } from '../../content/frontier'
import { allNews } from '../../content/newsroom'
import type { Forecast } from '../../content/forecast'
import { derive, type Derivation, type RequirementPoint, type SeriesPoint } from '../derive'

/**
 * TRENDS — what the board's own evidence says about Q-Day.
 *
 * The research prototype drew one chart here: a log-scale extrapolation of
 * IBM's roadmap crossing a fixed requirement line, labelled "Q-Day ≈ 2036".
 * This draws something different on purpose, and the difference is the point.
 *
 *   - The requirement line is not fixed. It has fallen an order of magnitude
 *     in eight months, and that is the strongest, least-known thing on the
 *     board.
 *   - Capability is drawn as dated marks and never joined into a line. The
 *     dates are real now — news items carry structured measurements, and a
 *     news item records when the thing happened — but a line through them
 *     would still be wrong until a group of points shares one platform and one
 *     qualifier. The vertical distance to the requirement is the gap.
 *   - Nothing is extrapolated forward. The only evidence here that maps to
 *     calendar years is an expert survey, and it is shown as what it is.
 */

const REQUIRED = 'var(--qd-chart-required)'
const DEMONSTRATED = 'var(--qd-chart-demonstrated)'

const fmtNum = (n: number) =>
  n >= 1e6 ? `${n / 1e6}M` : n >= 1e3 ? `${n / 1e3}k` : String(n)

/* ---------------------------------------------------------------- the chart */

interface Plot {
  kind: 'physical' | 'logical'
  required: RequirementPoint[]
  /**
   * Dated measurements from news, not the frontier snapshot.
   *
   * The snapshot used to be plotted here and it was misleading: every mark sat
   * at its item's most recent source date, so five figures from five years of
   * work bunched into a few weeks of 2026. These carry the date the result
   * actually happened.
   */
  demonstrated: SeriesPoint[]
}

/**
 * One chart per kind of qubit, never both on one axis.
 *
 * Physical and logical qubits are different measures three orders of magnitude
 * apart. Putting them on one y-scale would be the dual-axis mistake wearing a
 * disguise — the reader would compare two heights that are not comparable.
 */
function GapChart({ plot }: { plot: Plot }) {
  const W = 560
  const H = 240
  const PAD = { t: 18, r: 96, b: 30, l: 52 }

  const all = [
    ...plot.required.map((p) => ({ x: p.year, y: p.value.n })),
    ...plot.demonstrated.map((p) => ({ x: p.year, y: p.value })),
  ]
  if (all.length < 2) return null

  const xs = all.map((a) => a.x)
  const x0 = Math.floor(Math.min(...xs)) - 0.3
  const x1 = Math.ceil(Math.max(...xs)) + 0.3
  const logs = all.map((a) => Math.log10(a.y))
  const y0 = Math.floor(Math.min(...logs)) - 0.3
  const y1 = Math.ceil(Math.max(...logs)) + 0.3

  const X = (v: number) => PAD.l + ((v - x0) / (x1 - x0)) * (W - PAD.l - PAD.r)
  const Y = (v: number) => PAD.t + (1 - (Math.log10(v) - y0) / (y1 - y0)) * (H - PAD.t - PAD.b)

  const decades: number[] = []
  for (let e = Math.ceil(y0); e <= Math.floor(y1); e++) decades.push(10 ** e)
  const years: number[] = []
  for (let y = Math.ceil(x0); y <= Math.floor(x1); y++) years.push(y)

  /**
   * One path per cryptographic target, never one through all of them.
   *
   * The first version joined every required point of a kind into a single
   * line, which drew RSA-2048's <1,000,000 and <100,000 continuing straight
   * into ECC-256's 26,000 as though one requirement had fallen to the other.
   * They are different problems with different answers; only successive
   * estimates *of the same target* are a trend. A target with one point gets a
   * mark and no line, because one point is not a direction.
   */
  const byTarget = new Map<string, RequirementPoint[]>()
  for (const p of plot.required) {
    const list = byTarget.get(p.target)
    if (list) list.push(p)
    else byTarget.set(p.target, [p])
  }

  /**
   * Labels alternate above and below along each line.
   *
   * The first attempt measured the distance to the previously placed label and
   * moved on a clash. It read as more careful and it did not work: 1,193 and
   * <1,200 are four weeks and seven qubits apart, and the two labels printed
   * as "11931200". Alternating by index cannot fail that way — successive
   * points are never on the same side, whatever the spacing turns out to be.
   */
  const labelY = (y: number, i: number): number => (i % 2 === 0 ? y - 11 : y + 19)

  return (
    <figure className="qd-chart">
      <figcaption>
        {plot.kind === 'physical' ? 'Physical qubits' : 'Logical qubits'} — required against
        demonstrated
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${plot.kind} qubits required against demonstrated, log scale`}>
        {decades.map((d) => (
          <g key={d}>
            <line x1={PAD.l} x2={W - PAD.r} y1={Y(d)} y2={Y(d)} className="qd-chart__grid" />
            <text x={PAD.l - 8} y={Y(d) + 3} className="qd-chart__ytick">
              {fmtNum(d)}
            </text>
          </g>
        ))}
        {years.map((y) => (
          <text key={y} x={X(y)} y={H - 10} className="qd-chart__xtick">
            {y}
          </text>
        ))}

        {/* The requirement, falling — one line per target, each direct-labelled
            so the reader never has to work out which is which from colour. */}
        {[...byTarget.entries()].map(([target, pts]) => {
          const last = pts[pts.length - 1]
          return (
            <g key={target}>
              {pts.length > 1 && (
                <path
                  d={pts.map((p, i) => `${i ? 'L' : 'M'}${X(p.year)},${Y(p.value.n)}`).join(' ')}
                  fill="none"
                  stroke={REQUIRED}
                  strokeWidth={2}
                />
              )}
              {pts.map((p, i) => (
                <g key={`${p.itemId}-${p.metricName}-${p.date}`}>
                  <circle cx={X(p.year)} cy={Y(p.value.n)} r={5} fill={REQUIRED} stroke="var(--ground)" strokeWidth={2}>
                    <title>{`${p.value.raw} ${p.unit} — ${p.target}, ${p.date}\n${p.sourceTitle ?? p.itemId}`}</title>
                  </circle>
                  <text
                    x={X(p.year)}
                    y={labelY(Y(p.value.n), i)}
                    className="qd-chart__label"
                    textAnchor="middle"
                  >
                    {p.value.raw}
                  </text>
                </g>
              ))}
              {/* Opposite side to the last value label, so the series name and
                  the number it sits beside never occupy the same line. */}
              <text
                x={X(last.year) + 10}
                y={labelY(Y(last.value.n), pts.length)}
                className="qd-chart__series"
              >
                {target}
              </text>
            </g>
          )
        })}

        {/* Demonstrated. Marks, never a line: these points are dated properly
            but they are not all the same measurement — an array of trapped
            atoms and a processor operated below threshold sit on this axis
            together. `capabilitySeries()` decides where a rate is defensible;
            the chart never implies one. */}
        {plot.demonstrated.map((p) => (
          <g key={`${p.newsId}-${p.value}`}>
            <rect
              x={X(p.year) - 5}
              y={Y(p.value) - 5}
              width={10}
              height={10}
              fill={DEMONSTRATED}
              stroke="var(--ground)"
              strokeWidth={2}
            >
              <title>{`${p.value} — ${p.qualifier ?? 'demonstrated'}, ${p.date}\n${p.headline}`}</title>
            </rect>
            {/* Beside the mark, not above or below it. Centred labels were
                being clipped by neighbouring marks where two results land at
                a similar count a few weeks apart — 448 rendered as "148". */}
            <text x={X(p.year) + 9} y={Y(p.value) + 4} className="qd-chart__label">
              {p.value.toLocaleString('en-GB')}
            </text>
          </g>
        ))}
      </svg>
      <div className="qd-legend">
        <span>
          <i style={{ background: REQUIRED }} /> Required, as published
        </span>
        <span>
          <i style={{ background: DEMONSTRATED }} className="qd-legend__sq" /> Demonstrated
        </span>
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------- panel */

export function Trends({ forecast }: { forecast?: Forecast }) {
  const d: Derivation = useMemo(() => derive(frontier, forecast, allNews), [forecast])

  const plots: Plot[] = (['physical', 'logical'] as const)
    .map((kind) => ({
      kind,
      required: d.requirement.points.filter((p) => p.kind === kind),
      demonstrated: d.capability.series
        .filter((sr) => sr.kind === `${kind}-qubits`)
        .flatMap((sr) => sr.points),
    }))
    .filter((p) => p.required.length > 0)

  const headline = d.requirement.collapses.slice().sort((a, b) => b.orders - a.orders)[0]

  return (
    <div className="qd-trends">
      <p className="qd-trends__lede">
        Everything here is computed from the board's own items when the page loads. Nothing
        is extrapolated forward, and no vendor roadmap contributes — the board's standing
        rule is that a roadmap is a commercial statement and scores zero.
      </p>

      {headline && (
        <section className="qd-stat">
          <p className="qd-stat__label">The bar is falling</p>
          <p className="qd-stat__value">
            {headline.orders.toFixed(1)} orders of magnitude
          </p>
          <p className="qd-stat__note">
            {headline.target} {headline.kind} qubits: {headline.from.value.raw} →{' '}
            {headline.to.value.raw} in {headline.years.toFixed(1)} years, between{' '}
            {headline.from.date} and {headline.to.date}. Algorithmic improvement has moved
            the requirement faster than any hardware has moved toward it.
          </p>
        </section>
      )}

      <div className="qd-charts">
        {plots.map((p) => (
          <GapChart key={p.kind} plot={p} />
        ))}
      </div>

      {d.capability.series.length > 0 && (
        <section className="qd-series">
          <h3>Capability over time, by platform</h3>
          <p className="qd-note">
            Dated from news, where an event records the figure it reported — the only place
            on the board that can carry a history, because an item holds the current best
            value and overwrites its own. Platforms are kept apart: counts on different
            hardware are not points on one curve.
          </p>
          <ul className="qd-series__list">
            {d.capability.series.map((sr) => (
              <li key={`${sr.kind}-${sr.modality}`}>
                <p className="qd-series__head">
                  <b>{sr.modality.replace('-', ' ')}</b> · {sr.kind.replace('-', ' ')} ·{' '}
                  {sr.points.length} point{sr.points.length === 1 ? '' : 's'}
                  {sr.doublingMonths !== null && (
                    <span className="qd-series__rate">
                      doubling every ~{sr.doublingMonths.toFixed(0)} months
                    </span>
                  )}
                </p>
                {sr.rateWithheld && <p className="qd-series__withheld">No rate — {sr.rateWithheld}</p>}
                <ol className="qd-series__points">
                  {sr.points.map((p) => (
                    <li key={`${p.newsId}-${p.value}`}>
                      <span>{p.date}</span>
                      <b>{p.value.toLocaleString('en-GB')}</b>
                      <i>{p.qualifier ?? '—'}</i>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
          <p className="qd-note">
            Seven measurements so far, on six events. Every one is a figure the board had
            already verified elsewhere, so this is transcription rather than new research —
            the newsroom fills the rest as it works. A rate needs three points sharing one
            qualifier and showing growth; nothing clears that yet, and the page says so
            rather than drawing a line through whatever is there.
          </p>
        </section>
      )}

      {d.capability.gaps.length > 0 && (
        <section className="qd-gaps">
          <h3>The distance still to cover</h3>
          <ul>
            {d.capability.gaps.map((g) => (
              <li key={g.kind}>
                <b>{g.orders.toFixed(2)} orders</b> of magnitude in {g.kind} qubits — the most
                favourable demonstrated figure ({g.demonstrated.value.raw},{' '}
                <i>{g.demonstrated.metricName}</i>, {g.demonstrated.date}) against the lowest
                published requirement ({g.required.value.raw}, {g.required.target},{' '}
                {g.required.date}).
              </li>
            ))}
          </ul>
          <p className="qd-note">
            Quoted from the best possible reading on both sides. Where two demonstrations
            differ in strength — error-detected against error-corrected on the same device —
            the larger is used and named, because nothing structured separates them.
          </p>
        </section>
      )}

      {d.probability && (
        <section className="qd-prob">
          <h3>The only evidence that maps to years</h3>
          <ul>
            {d.probability.bands.map((b) => (
              <li key={b.withinYears}>
                <b>
                  {b.lowPct}–{b.highPct}%
                </b>{' '}
                within {b.withinYears} years → <b>{b.year}</b>
              </li>
            ))}
          </ul>
          <p className="qd-note">
            Expert elicitation, evidence level {d.probability.evidenceLevel ?? '—'}. An opinion
            survey, not a measurement, and it is the only thing on this board that turns into a
            calendar year at all — which is why it sets the window and the hardware figures do
            not.{' '}
            {d.probability.sourceUrl && (
              <a href={d.probability.sourceUrl} target="_blank" rel="noreferrer">
                {d.probability.sourceTitle ?? 'source'} ↗
              </a>
            )}
          </p>
          {d.window?.caveat && <p className="qd-note qd-note--warn">{d.window.caveat}</p>}
        </section>
      )}

      <section className={d.comparison.consistent ? 'qd-verdict qd-verdict--ok' : 'qd-verdict qd-verdict--exposed'}>
        <p className="qd-verdict__head">
          {d.window
            ? `Derived window ${d.window.from}–${d.window.to} · asserted ${d.comparison.asserted.aggressive ?? '?'}–${d.comparison.asserted.conservative ?? '?'}`
            : 'No window could be derived'}
        </p>
        {d.comparison.notes.map((n) => (
          <p className="qd-verdict__detail" key={n}>
            {n}
          </p>
        ))}
      </section>

      {d.impact.entries.length > 0 && (
        <section className="qd-impact">
          <h3>What has been pushing, and which way</h3>
          <p className="qd-note">
            Each item on the board carries a Q-Day impact from −3 to +3, set with reasoning
            under the board's own rules. The net is a <b>direction, not a number of years</b> —
            +{d.impact.net} does not mean {d.impact.net} years. What it answers is the question
            no countdown does: what would have to change for the estimate to move.
          </p>
          <ul className="qd-impact__list">
            {d.impact.entries.map((e) => (
              <li key={e.id}>
                <span className="qd-impact__bar">
                  <i
                    data-dir={e.impact > 0 ? 'closer' : 'further'}
                    style={{ width: `${(Math.abs(e.impact) / 3) * 100}%` }}
                  />
                </span>
                <span className="qd-impact__score" data-dir={e.impact > 0 ? 'closer' : 'further'}>
                  {e.impact > 0 ? '+' : ''}
                  {e.impact}
                </span>
                <span className="qd-impact__title">{e.title}</span>
                {e.reasoning && <p className="qd-impact__why">{e.reasoning}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {d.excluded.length > 0 && (
        <section className="qd-excluded">
          <h3>Refused</h3>
          <p className="qd-note">
            Figures the derivation would not guess at. A model that quietly drops what it
            cannot read looks more complete than it is.
          </p>
          <ul>
            {d.excluded.map((e) => (
              <li key={`${e.itemId}-${e.metricName}`}>
                <b>{e.itemId}</b> · {e.metricName}
                <span>{e.reason}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="qd-trends__from">
        Derived from {d.sourcedFrom.length} items: {d.sourcedFrom.join(', ')}
      </p>
    </div>
  )
}
