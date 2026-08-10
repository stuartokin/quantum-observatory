
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

const files = import.meta.glob('/content/forecasts/*.md', {
  query: '?parsed',
  import: 'default',
  eager: true,
}) as Record<string, { attributes: Record<string, unknown>; body: string }>


export const forecasts: Forecast[] = Object.values(files).map(
  ({ attributes, body }) => ({ ...(attributes as unknown as Forecast), body }),
)

export const forecastFor = (pillar: string): Forecast | undefined =>
  forecasts.find((f) => f.pillar === pillar)
