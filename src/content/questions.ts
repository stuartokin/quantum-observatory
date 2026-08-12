import type { StandingQuestion } from './questionTypes'

const files = import.meta.glob('/content/questions/*.md', {
  query: '?parsed',
  import: 'default',
  eager: true,
}) as Record<string, { attributes: Record<string, unknown>; body: string }>

export const allQuestions: StandingQuestion[] = Object.values(files)
  .map(({ attributes, body }) => ({ ...(attributes as unknown as StandingQuestion), body }))
  .filter((q) => q.schema === 'question/v1' && q.status !== 'archived')
  .sort((a, b) => a.number - b.number)

export const questionsFor = (pillar: string): StandingQuestion[] =>
  allQuestions.filter((q) => q.pillar === pillar)

/** Days since an answer last materially changed. Null when never recorded. */
export function daysSinceChange(q: StandingQuestion, now = new Date()): number | null {
  if (!q.lastChanged) return null
  const d = new Date(q.lastChanged)
  if (isNaN(d.getTime())) return null
  return Math.floor((now.getTime() - d.getTime()) / 864e5)
}
