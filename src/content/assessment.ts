import type { Assessment } from './assessmentTypes'
import type { ContentRecord } from './collections'

/**
 * `let`, not `const` — content is fetched and hydrated once before React
 * mounts. See `store.ts`. Never derive from these at module scope.
 */
export let assessments: Assessment[] = []

export function hydrateAssessment(records: ContentRecord[]): void {
  assessments = records
    .map(({ path, attributes }) => {
      const a = attributes as unknown as Assessment
      if (!a?.id || !a.kind) {
        console.warn('Skipping malformed assessment file:', path)
        return null
      }
      return a
    })
    .filter((a): a is Assessment => a !== null)
}

export const questionnaires = (): Assessment[] =>
  assessments.filter((a) => a.kind === 'questionnaire')

export const maturityLevels = (): Assessment | undefined =>
  assessments.find((a) => a.kind === 'levels')
