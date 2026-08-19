import type { Forecast } from '../content/forecast'

/**
 * THE THREE CLOCKS COME FROM THE BOARD, NOT FROM THIS FILE.
 *
 * Qday-Research hardcoded 2036 / 2038 / 2041 in its source. Those same three
 * numbers already live in `content/forecasts/q-day.md` as `aggressive`,
 * `central` and `conservative`, where they are versioned, logged, and carry a
 * state saying whether a human set them. So the scenarios are read from there.
 *
 * That is not a cosmetic difference. It means moving the estimate is a content
 * change an agent can propose and a person can veto — the same loop as every
 * other claim on this board — rather than an edit to a source file. And it
 * means the site cannot show a number the repo disagrees with.
 *
 * **These are still asserted, not derived.** The forecast file says so
 * plainly: *"Outer bounds set by hand. Inner values are provisional."* Phase 2
 * replaces the assertion with a derivation over the board's own resource
 * estimates and demonstrated-capability figures. Until then the surface says
 * "human-set" everywhere it shows a date, because a provisional number
 * presented confidently is worse than no number.
 */
export type ScenarioId = 'aggressive' | 'central' | 'conservative'

export interface Scenario {
  id: ScenarioId
  label: string
  year: number
  /** 1 January of `year`, UTC. The estimate has year precision; pretending to
   *  a day would be inventing precision the forecast does not claim. */
  date: Date
  description: string
}

const DESCRIPTIONS: Record<ScenarioId, string> = {
  aggressive:
    'The front edge of the board’s range. Treat it as a risk-management floor — the earliest date it would be unreasonable to plan past — rather than a claim that RSA and ECC fail that year.',
  central:
    'The middle of the range, and the figure the header carries. It is the one most likely to move first when the derivation lands, because it is the axis with the least direct evidence behind it.',
  conservative:
    'The far edge, assuming scaling, error correction and long-depth reliable execution all stay genuinely hard. Planning only to this date is the position that harvest-now-decrypt-later exists to argue against.',
}

const LABELS: Record<ScenarioId, string> = {
  aggressive: 'Aggressive',
  central: 'Source-weighted',
  conservative: 'Cautious',
}

/**
 * Built from whatever the forecast actually holds.
 *
 * An axis the forecast leaves unset is left out rather than filled in with a
 * neighbour: three pills where the middle one is quietly a copy of the right
 * one would misrepresent the board's own uncertainty.
 */
export function scenariosFrom(forecast: Forecast | undefined): Scenario[] {
  if (!forecast?.estimates) return []
  const order: ScenarioId[] = ['aggressive', 'central', 'conservative']
  return order.flatMap((id) => {
    const year = forecast.estimates[id]
    if (typeof year !== 'number' || !Number.isFinite(year)) return []
    return [
      {
        id,
        label: LABELS[id],
        year,
        date: new Date(Date.UTC(year, 0, 1)),
        description: DESCRIPTIONS[id],
      },
    ]
  })
}

/**
 * Years from now to the scenario, which is Mosca's Z.
 *
 * Whole years, matching the precision of the estimate. Computing it to the day
 * from a date that is only accurate to the year would be arithmetic dressed up
 * as measurement.
 */
export const yearsTo = (scenario: Scenario, now = new Date()): number =>
  scenario.year - now.getFullYear()
