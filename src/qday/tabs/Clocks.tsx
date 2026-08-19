import { useMemo, useState } from 'react'
import type { Forecast } from '../../content/forecast'
import { scenariosFrom, yearsTo, type ScenarioId } from '../scenarios'
import { NCSC_DEADLINE } from '../deadlines'
import { parts, useNow } from '../countdown'

const dateFmt = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

const pad = (n: number) => String(n).padStart(2, '0')

function Countdown({ to, now, tone }: { to: Date; now: Date; tone: 'threat' | 'defence' }) {
  const p = parts(to.getTime() - now.getTime())
  const passed = to.getTime() - now.getTime() <= 0
  if (passed) {
    return (
      <p className="qd-clock__passed">
        This date has passed. The countdown is not the story any more.
      </p>
    )
  }
  return (
    <div className="qd-clock__units" data-tone={tone}>
      {[
        { v: p.d.toLocaleString('en-GB'), l: 'days' },
        { v: pad(p.h), l: 'hrs' },
        { v: pad(p.m), l: 'min' },
        { v: pad(p.s), l: 'sec' },
      ].map((u) => (
        <div className="qd-unit" key={u.l}>
          <span className="qd-unit__v">{u.v}</span>
          <span className="qd-unit__l">{u.l}</span>
        </div>
      ))}
    </div>
  )
}

export function Clocks({ forecast }: { forecast?: Forecast }) {
  const now = useNow()
  const scenarios = useMemo(() => scenariosFrom(forecast), [forecast])
  const [chosen, setChosen] = useState<ScenarioId>('central')
  const [why, setWhy] = useState(false)

  /**
   * Mosca's two inputs. X is how long the data must stay secret; Y is how long
   * migrating will take. Both are the reader's to assert — this board has no
   * way to know either, and pretending to default them from evidence would be
   * the kind of invented number it exists to avoid. They start at values that
   * are common rather than recommended.
   */
  const [x, setX] = useState(10)
  const [y, setY] = useState(5)

  const scenario = scenarios.find((s) => s.id === chosen) ?? scenarios[0]

  if (!forecast || !scenario) {
    return (
      <div className="qd-pending">
        <p className="qd-pending__flag">No forecast on the board</p>
        <h2>Clocks</h2>
        <p className="qd-pending__blurb">
          These countdowns are read from <code>content/forecasts/q-day.md</code>. That
          file is missing or has no estimates, so there is nothing honest to count to.
        </p>
      </div>
    )
  }

  const ncsc = NCSC_DEADLINE
  const gapDays = Math.round((scenario.date.getTime() - ncsc.date.getTime()) / 864e5)
  const gapYears = gapDays / 365
  const headroom = gapDays >= 0

  /**
   * The two dates can effectively coincide, and rounding hides it.
   *
   * The aggressive scenario is 1 January 2036 against a deadline of 31
   * December 2035 — one second of headroom, which `toFixed(1)` renders as
   * "+0.0 yr" beside a note saying Q-Day falls *after* the deadline. Both
   * true, and together they read as a rendering fault rather than as the
   * finding they actually are: in that scenario there is no margin at all.
   * Six weeks either way is inside the precision of a year-granular estimate,
   * so it is called what it is.
   */
  const coincide = Math.abs(gapDays) < 45

  const z = yearsTo(scenario, now)
  const need = x + y
  const exposed = need > z
  const over = need - z

  const agentSet = forecast.state === 'agent-estimate'

  return (
    <div className="qd-clocks">
      {/* ---------------------------------------------------------------- */}
      <section className="qd-clocks__row">
        <article className="qd-clock qd-clock--threat">
          <p className="qd-clock__kind">Capability · estimated Q-Day</p>
          <p className="qd-clock__scenario">{scenario.label}</p>
          <p className="qd-clock__date">{dateFmt(scenario.date)}</p>
          <Countdown to={scenario.date} now={now} tone="threat" />
        </article>

        <article
          className={
            coincide
              ? 'qd-headroom qd-headroom--none'
              : headroom
                ? 'qd-headroom qd-headroom--pos'
                : 'qd-headroom qd-headroom--neg'
          }
        >
          <p className="qd-headroom__label">Headroom</p>
          <p className="qd-headroom__value">
            {coincide ? 'none' : `${headroom ? '+' : ''}${gapYears.toFixed(1)} yr`}
          </p>
          <p className="qd-headroom__note">
            {coincide
              ? `Q-Day and the ${ncsc.year} deadline effectively coincide. There is no margin in this scenario — finishing on time is the best case.`
              : headroom
                ? `Q-Day falls after the ${ncsc.year} deadline — if that deadline is met.`
                : `Q-Day falls BEFORE migration is due to complete.`}
          </p>
        </article>

        <article className="qd-clock qd-clock--defence">
          <p className="qd-clock__kind">Defence · NCSC {ncsc.year}</p>
          <p className="qd-clock__scenario">{ncsc.title}</p>
          <p className="qd-clock__date">{dateFmt(ncsc.date)}</p>
          <Countdown to={ncsc.date} now={now} tone="defence" />
          <p className="qd-clock__src">
            <a href={ncsc.href} target="_blank" rel="noreferrer">
              {ncsc.srcLabel} ↗
            </a>{' '}
            · not yet held as data on the board
          </p>
        </article>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="qd-scen">
        <div className="qd-scen__pills" role="group" aria-label="Q-Day scenario">
          {scenarios.map((s) => (
            <button
              key={s.id}
              className="qd-pill"
              aria-pressed={s.id === chosen}
              onClick={() => setChosen(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="qd-scen__z">
          Z ≈ <b>{z} years</b> — this scenario puts Q-Day at <b>{scenario.year}</b>
        </p>
        <button className="qd-disc" aria-expanded={why} onClick={() => setWhy((v) => !v)}>
          Why this date? {why ? '▲' : '▼'}
        </button>
      </section>

      {why && (
        <section className="qd-why">
          <p className="qd-why__desc">{scenario.description}</p>

          {/*
            The provenance is the point, not a footnote. Every other number on
            this board says where it came from and whether a person has looked
            at it; the headline figure of the whole section cannot be the one
            exception.
          */}
          <dl className="qd-why__prov">
            <div>
              <dt>State</dt>
              <dd className={agentSet ? 'prov prov--agent' : 'prov'}>
                {agentSet ? 'Agent estimate — not yet reviewed' : 'Human-set'}
              </dd>
            </div>
            <div>
              <dt>Range on the board</dt>
              <dd>
                {forecast.estimates.earliest !== undefined && (
                  <>earliest {forecast.estimates.earliest} · </>
                )}
                {scenarios.map((s) => `${s.label.toLowerCase()} ${s.year}`).join(' · ')}
              </dd>
            </div>
            {forecast.lastHumanReview && (
              <div>
                <dt>Last human review</dt>
                <dd>{dateFmt(new Date(forecast.lastHumanReview))}</dd>
              </div>
            )}
          </dl>

          {forecast.note && <p className="qd-why__note">{forecast.note}</p>}

          <p className="qd-why__derivation">
            <b>This figure is asserted, not derived.</b> The board holds nine sourced
            resource estimates and around forty dated hardware metrics — enough to
            compute where rising capability meets the falling requirement, rather than
            to assert a year. Doing that is the next phase of this work, and the
            derivation will appear beside this number rather than replacing it
            silently.
          </p>

          {forecast.log && forecast.log.length > 0 && (
            <ol className="qd-why__log">
              {[...forecast.log].reverse().map((e, i) => (
                <li key={`${e.date}-${i}`}>
                  <span className="qd-why__logdate">{e.date}</span>
                  <span className="qd-why__logmove">
                    {e.from} → {e.to}
                  </span>
                  <span className="qd-why__logby">{e.agent ? `${e.by}/${e.agent}` : e.by}</span>
                  <p>{e.evidence}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      <section className="qd-mosca">
        <h2>Test your exposure — the Mosca test</h2>
        <p className="qd-mosca__intro">
          If the time your data must stay secret, plus the time migrating will take,
          exceeds the time before Q-Day, you are already exposed. Both inputs are
          yours to assert — the board has no way to know either for your organisation.
        </p>

        <div className="qd-mosca__inputs">
          <label className="qd-slider">
            <span className="qd-slider__head">
              <b>X</b> — how long must this data stay secret?
              <output>{x} yr</output>
            </span>
            <input
              type="range"
              min={1}
              max={50}
              value={x}
              onChange={(e) => setX(+e.target.value)}
            />
          </label>
          <label className="qd-slider">
            <span className="qd-slider__head">
              <b>Y</b> — how long will migrating take?
              <output>{y} yr</output>
            </span>
            <input
              type="range"
              min={1}
              max={15}
              value={y}
              onChange={(e) => setY(+e.target.value)}
            />
          </label>
        </div>

        <div className="qd-bar" aria-hidden="true">
          <div
            className="qd-bar__x"
            style={{ width: `${(x / Math.max(need, z, 1)) * 100}%` }}
          />
          <div
            className="qd-bar__y"
            style={{ width: `${(y / Math.max(need, z, 1)) * 100}%` }}
          />
          <div className="qd-bar__z" style={{ left: `${(z / Math.max(need, z, 1)) * 100}%` }}>
            <span>Z ≈ {z}y</span>
          </div>
        </div>

        <div
          className={exposed ? 'qd-verdict qd-verdict--exposed' : 'qd-verdict qd-verdict--ok'}
          role="status"
        >
          <p className="qd-verdict__head">
            {exposed
              ? `Exposed — X + Y exceeds Z by about ${over} year${over === 1 ? '' : 's'}`
              : 'On track — X + Y is within Z'}
          </p>
          <p className="qd-verdict__detail">
            {exposed
              ? `You need about ${need} years (X ${x} + Y ${y}) and roughly ${z} remain before this scenario's Q-Day. Data with this shelf-life should be migrating now — harvest-now-decrypt-later already applies to it.`
              : `You need about ${need} years (X ${x} + Y ${y}) and roughly ${z} remain — a margin of about ${z - need} year${z - need === 1 ? '' : 's'}. Margins shrink as estimates move.`}
          </p>
        </div>
      </section>
    </div>
  )
}
