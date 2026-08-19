import type { StandingQuestion } from './questionTypes'
import type { ContentRecord } from './collections'

/**
 * `let`, not `const` — content is fetched and hydrated once before React
 * mounts. See `store.ts`. Never derive from these at module scope.
 */
export let allQuestions: StandingQuestion[] = []

export function hydrateQuestions(records: ContentRecord[]): void {
  allQuestions = records
    .map(({ attributes }) => attributes as unknown as StandingQuestion)
    .filter((q) => q.schema === 'question/v1' && q.status !== 'archived')
    .sort((a, b) => a.number - b.number)
}

export const questionsFor = (pillar: string): StandingQuestion[] =>
  allQuestions.filter((q) => q.pillar === pillar)

/** Days since an answer last materially changed. Null when never recorded. */
export function daysSinceChange(q: StandingQuestion, now = new Date()): number | null {
  if (!q.lastChanged) return null
  const d = new Date(q.lastChanged)
  if (isNaN(d.getTime())) return null
  return Math.floor((now.getTime() - d.getTime()) / 864e5)
}
