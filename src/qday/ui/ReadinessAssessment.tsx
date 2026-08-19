import { useMemo, useState } from 'react'
import { questionnaires, maturityLevels } from '../../content/assessment'
import type { AssessmentQuestion } from '../../content/assessmentTypes'

/**
 * THE READINESS ASSESSMENT — a prompt, wearing the label of a prompt.
 *
 * This exists because X and Y in the Mosca test are the reader's to assert and
 * most readers do not know theirs. Working through twenty questions is a
 * better way to arrive at a number than moving a slider until it feels right.
 *
 * **It is the one thing on this surface that is not evidence, and it says so
 * in three places** — the intro, the heuristic line from the content, and the
 * result. That is not defensive writing: it sits inches from a chart derived
 * from peer-reviewed resource estimates, and a five-level maturity score
 * rendered in the same typeface would borrow authority it has not earned.
 *
 * Nothing is stored, nothing is sent, and the suggested X and Y are applied
 * only when the reader presses the button.
 */
export function ReadinessAssessment({
  onApply,
}: {
  onApply: (x: number, y: number) => void
}) {
  const forms = questionnaires()
  const levelsDoc = maturityLevels()
  const [persona, setPersona] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const form = forms.find((f) => f.id === persona)

  /**
   * Two dimensions, two very different jobs.
   *
   * `agility` answers "how fast could you move", which is Y. `shelf-life`
   * answers "how long must this stay secret", which is X. A question tagged
   * `maturity` moves the level and neither slider — the distinction matters,
   * because being well-run and having short-lived data are not the same
   * safety.
   */
  const result = useMemo(() => {
    if (!form?.questions) return null
    const answered = form.questions
      .map((qn, i) => ({ qn, choice: answers[`${form.id}:${i}`] }))
      .filter((a): a is { qn: AssessmentQuestion; choice: number } => typeof a.choice === 'number')
    if (answered.length < form.questions.length) return null

    const agg = (dim: string) => {
      const rows = answered.filter((a) => a.qn.dimension === dim)
      if (!rows.length) return null
      const w = rows.reduce((t, r) => t + (r.qn.weight ?? 1), 0)
      const s = rows.reduce((t, r) => t + (r.qn.options[r.choice].score * (r.qn.weight ?? 1)), 0)
      return s / w // 1..5
    }

    const agility = agg('agility')
    const shelf = agg('shelf-life')
    const maturity = agg('maturity')

    /* Level is averaged over the 1–5 dimensions only. `shelf-life` is in
     * years and would swamp it. */
    const scores = [agility, maturity].filter((n): n is number => n !== null)
    const level = scores.length
      ? Math.max(1, Math.min(5, Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)))
      : null

    /**
     * The two dimensions are on different scales, and conflating them was a
     * real bug worth leaving a note about.
     *
     * `agility` options score 1–5 — a rating — so Y is derived from it: high
     * agility means a short migration, running 2 years at the top of the
     * scale to 10 at the bottom.
     *
     * `shelf-life` options score **in years already** ("Under 5 years" = 3,
     * "25+ years" = 30). The first version treated it as a 1–5 rating and
     * multiplied, which turned a 30-year answer into 180 years and pinned the
     * X slider at its maximum. A dimension whose scores mean something
     * different has to be read differently.
     */
    const y = agility === null ? null : Math.max(2, Math.min(15, Math.round(12 - agility * 2)))
    const x = shelf === null ? null : Math.max(1, Math.min(50, Math.round(shelf)))

    return { level, x, y, agility, shelf }
  }, [form, answers])

  const levels = levelsDoc?.levels ?? []
  const matched = result?.level ? levels.find((l) => l.level === result.level) : undefined

  return (
    <div className="qd-assess">
      <h3>Readiness assessment</h3>
      <p className="qd-assess__intro">
        This maps you onto a five-level maturity model and suggests starting values for X
        (data shelf-life) and Y (migration time) that you can apply to the Mosca test.
        Optional, nothing is stored or sent, and it is a self-assessment prompt —{' '}
        <b>not an audit, and not evidence</b>.
      </p>

      <p className="qd-assess__step">
        <span className="qd-steps__n">1</span> Choose the view that fits you
      </p>
      <div className="qd-assess__personas">
        {forms.map((f) => (
          <button
            key={f.id}
            className="qd-assess__persona"
            aria-pressed={persona === f.id}
            onClick={() => {
              setPersona(persona === f.id ? null : f.id)
              setAnswers({})
            }}
          >
            <b>{f.title}</b>
            <span>{f.questions?.length ?? 0} questions</span>
            <i>{f.summary}</i>
          </button>
        ))}
      </div>

      {!form && (
        <p className="qd-assess__hint">
          Pick one to begin — the questions differ by role. Nothing appears until you choose.
        </p>
      )}

      {form && (
        <>
          {form.heuristic && <p className="qd-assess__heuristic">{form.heuristic}</p>}

          <ol className="qd-assess__qs">
            {(form.questions ?? []).map((qn, i) => {
              const key = `${form.id}:${i}`
              return (
                <li key={key}>
                  <p className="qd-assess__q">
                    {qn.question}
                    <span className="qd-assess__dim" data-dim={qn.dimension}>
                      {qn.dimension === 'agility'
                        ? 'feeds Y'
                        : qn.dimension === 'shelf-life'
                          ? 'feeds X'
                          : 'level only'}
                    </span>
                  </p>
                  <div className="qd-assess__opts">
                    {qn.options.map((o, k) => (
                      <button
                        key={o.label}
                        aria-pressed={answers[key] === k}
                        onClick={() => setAnswers((a) => ({ ...a, [key]: k }))}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  {qn.weightReason && answers[key] !== undefined && (
                    <p className="qd-assess__why">
                      <b>Weight {qn.weight ?? 1}.</b> {qn.weightReason}
                    </p>
                  )}
                </li>
              )
            })}
          </ol>

          {result ? (
            <div className="qd-assess__result">
              {matched && (
                <p className="qd-assess__level">
                  <b>{matched.name}</b>
                  <span>{matched.description}</span>
                </p>
              )}
              <p className="qd-assess__suggest">
                Suggested starting points:{' '}
                {result.x !== null ? <b>X ≈ {result.x} years</b> : <i>X not covered by this view</i>}
                {' · '}
                {result.y !== null ? <b>Y ≈ {result.y} years</b> : <i>Y not covered by this view</i>}
              </p>
              <button
                className="qd-assess__apply"
                onClick={() => onApply(result.x ?? 10, result.y ?? 5)}
                disabled={result.x === null && result.y === null}
              >
                Apply to the Mosca test ↓
              </button>
              <p className="qd-assess__caveat">
                These are starting points from a weighted questionnaire, not a measurement of
                your organisation. Move the sliders afterwards — you know things this does not.
              </p>
            </div>
          ) : (
            <p className="qd-assess__hint">
              Answer every question to see a level and a suggested X and Y.
            </p>
          )}
        </>
      )}
    </div>
  )
}
