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

/**
 * What the national guidance says about a question, with somewhere to read it.
 *
 * A questionnaire that only returns a score is a quiz. The useful part is what
 * to do about a weak answer, and that is not this board's opinion — NCSC, the
 * CISA/NSA/NIST factsheet and the EU roadmap all say it, and mostly agree. So
 * it is stated as their position, carries its links, and sits behind a
 * disclosure rather than in front of the question.
 */
export interface AssessmentGuidance {
  text: string
  links?: { label: string; url: string }[]
}

export interface AssessmentQuestion {
  question: string
  /** agility feeds Y, shelf-life feeds X, maturity feeds the level only. */
  dimension: Dimension
  /**
   * The default influence of this question on its dimension.
   *
   * A *default*, not a constant: the surface lets a reader move it, because
   * the number is editorial judgement and the honest response to "why 1.4 and
   * not 1.2?" is to hand over the dial rather than defend the decimal. What
   * the reader changes is never written back — this file is the board's
   * position and their session is theirs.
   */
  weight?: number
  /** Why that weight. A weight with no stated reason cannot be argued with. */
  weightReason?: string
  options: AssessmentOption[]
  guidance?: AssessmentGuidance
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
