/**
 * A self-assessment questionnaire — content, but deliberately not evidence.
 *
 * Everything else in `content/` makes a claim about the world that could be
 * checked against a source. This does not: it is a structured prompt whose
 * weights are editorial judgement, and it sits beside sourced material where
 * it could easily borrow authority it has not earned.
 *
 * So `heuristic` exists on every questionnaire and the surface always prints
 * it. Holding the questions as content is what lets a reader argue with the
 * weights and an editor revise them — not a claim that they are measured.
 */
export type Dimension = 'agility' | 'shelf-life' | 'maturity'

export interface AssessmentOption {
  label: string
  score: number
}

export interface AssessmentQuestion {
  question: string
  /** agility feeds Y, shelf-life feeds X, maturity feeds the level only. */
  dimension: Dimension
  weight?: number
  /** Why that weight. A weight with no stated reason cannot be argued with. */
  weightReason?: string
  options: AssessmentOption[]
}

export interface MaturityLevel {
  level: number
  name: string
  description: string
}

export interface Assessment {
  schema: 'assessment/v1'
  id: string
  kind: 'questionnaire' | 'levels'
  title: string
  summary?: string
  heuristic?: string
  questions?: AssessmentQuestion[]
  levels?: MaturityLevel[]
  added?: string
}
