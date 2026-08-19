import type { ContentRecord } from './collections'

export interface ForecastEstimates {
  earliest?: number
  aggressive?: number
  central?: number
  conservative?: number
}

export interface ForecastLogEntry {
  date: string
  from: string
  to: string
  by: 'human' | 'agent'
  agent?: string
  evidence: string
  assumption?: string
}

export interface Forecast {
  schema: 'forecast/v1'
  id: string
  pillar: string
  title: string
  question: string
  estimates: ForecastEstimates
  /** An agent may write agent-estimate and can never write human-set. */
  state: 'human-set' | 'agent-estimate'
  by?: 'human' | 'agent'
  on?: string
  lastHumanReview?: string
  note?: string
  log?: ForecastLogEntry[]
  body?: string
}

/**
 * `let`, not `const` — content is fetched and hydrated once before React
 * mounts. See `store.ts`. Never derive from these at module scope.
 */
export let forecasts: Forecast[] = []

export function hydrateForecasts(records: ContentRecord[]): void {
  forecasts = records
    .map(({ path, attributes }): Forecast | null => {
      const f = attributes as unknown as Forecast
      // Schema-gated at build time (content/schema/forecast.schema.json), but
      // this is the one collection consumers destructure straight into —
      // Panels.tsx reads forecast.estimates.{earliest,...} with no guard of
      // its own, so a malformed file here would crash the whole app to the
      // ErrorBoundary rather than just being missing. Same defence frontier.ts
      // already applies per item: skip and warn rather than take the board down.
      if (!f?.id || !f.estimates) {
        console.warn('Skipping malformed forecast file:', path)
        return null
      }
      return f
    })
    .filter((f): f is Forecast => f !== null)
}

export const forecastFor = (pillar: string): Forecast | undefined =>
  forecasts.find((f) => f.pillar === pillar)
