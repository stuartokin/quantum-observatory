export type QuestionState = 'moving' | 'steady' | 'slowing' | 'contested' | 'unknown'

export interface QuestionEvidence {
  ref: string
  kind?: 'frontier' | 'news' | 'url'
  note?: string
  url?: string
}

export interface QuestionChange {
  date: string
  was: string
  why?: string
  by?: 'human' | 'agent'
  agent?: string
}

/**
 * One of the twelve standing questions.
 *
 * Unlike an item, a question is never finished. It carries a current answer, the
 * date that answer last materially changed, and the evidence behind it.
 *
 * The gap between `asOf` and `lastChanged` is the useful figure: an answer
 * confirmed yesterday but unchanged for eight months tells you the field is
 * settled there, which is exactly what somebody planning around it needs.
 */
export interface StandingQuestion {
  schema: 'question/v1'
  id: string
  number: number
  question: string
  pillar: string
  answer: string
  state: QuestionState
  asOf: string
  lastChanged?: string
  changedBy?: string
  evidence?: QuestionEvidence[]
  history?: QuestionChange[]
  review?: {
    state?: 'reviewed' | 'agent-reviewed' | 'agent-merged' | 'vetoed'
    by?: 'human' | 'agent'
    on?: string
    agentMergedOn?: string
    reviewedOn?: string
    agent?: string
    note?: string
  }
  status: 'draft' | 'published' | 'archived'
  added?: string
  body?: string
}
