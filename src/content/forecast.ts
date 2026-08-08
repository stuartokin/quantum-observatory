import fm from 'front-matter'

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
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function normalise(v: unknown): unknown {
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  if (Array.isArray(v)) return v.map(normalise)
  if (v && typeof v === 'object') {
    return Object.fromEntries(
      Object.entries(v as Record<string, unknown>).map(([k, x]) => [k, normalise(x)]),
    )
  }
  return v
}

export const forecasts: Forecast[] = Object.values(files).map((raw) => {
  const { attributes, body } = fm<Record<string, unknown>>(raw)
  return { ...(normalise(attributes) as Forecast), body }
})

export const forecastFor = (pillar: string): Forecast | undefined =>
  forecasts.find((f) => f.pillar === pillar)
