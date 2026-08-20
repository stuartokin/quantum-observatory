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

  /**
   * WEIGHTS THE READER CAN MOVE.
   *
   * The content states a default and a reason for it, and the honest answer to
   * "why 1.4 and not 1.2?" is that nothing on this board evidences either — it
   * is editorial ordering with false precision on top. Printing the number and
   * defending it would be the worse response; handing over the dial is the
   * better one, and it makes the heuristic line true rather than apologetic.
   *
   * Held by question key and never written back. The file is the board's
   * position; this session is the reader's.
   */
  const [weights, setWeights] = useState<Record<string, number>>({})
  const [openWhy, setOpenWhy] = useState<Record<string, boolean>>({})
  const [openGuide, setOpenGuide] = useState<Record<string, boolean>>({})
  const weightOf = (qn: AssessmentQuestion, key: string) => weights[key] ?? qn.weight ?? 1

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
      .map((qn, i) => {
        const key = `${form.id}:${i}`
        return { qn, choice: answers[key], w: weights[key] ?? qn.weight ?? 1 }
      })
      .filter(
        (a): a is { qn: AssessmentQuestion; choice: number; w: number } =>
          typeof a.choice === 'number',
      )
    if (answered.length < form.questions.length) return null

    const agg = (dim: string) => {
      const rows = answered.filter((a) => a.qn.dimension === dim)
      if (!rows.length) return null
      // The reader's weight where they have set one, the content's otherwise.
      const w = rows.reduce((t, r) => t + r.w, 0)
      const s = rows.reduce((t, r) => t + r.qn.options[r.choice].score * r.w, 0)
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
  }, [form, answers, weights])

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
              setWeights({})
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
                  {/*
                    The weight, as a dial rather than a printed number.

                    Below the options, not above them: the question and its
                    answers are the job, and how heavily it counts is the
                    second thought a reader has, not the first. It shows what
                    it drives — X, Y or the level — because a weight with no
                    stated effect is a number to nod at.
                  */}
                  <div className="qd-assess__weight" data-changed={weights[key] !== undefined || undefined}>
                    <span className="qd-assess__wlabel">
                      Weight ·{' '}
                      {qn.dimension === 'agility'
                        ? 'drives Y'
                        : qn.dimension === 'shelf-life'
                          ? 'drives X'
                          : 'drives the level'}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={2}
                      step={0.1}
                      value={weightOf(qn, key)}
                      aria-label={`Weight for question ${i + 1}`}
                      onChange={(e) =>
                        setWeights((w) => ({ ...w, [key]: Number(e.target.value) }))
                      }
                    />
                    <b className="qd-assess__wval">×{weightOf(qn, key).toFixed(1)}</b>
                    {qn.weightReason && (
                      <button
                        className="qd-assess__winfo"
                        aria-expanded={!!openWhy[key]}
                        aria-label="Why this weight"
                        onClick={() => setOpenWhy((o) => ({ ...o, [key]: !o[key] }))}
                      >
                        i
                      </button>
                    )}
                    {/* Only once it has been moved. A reset for something at
                        its default is a control that does nothing. */}
                    {weights[key] !== undefined && (
                      <button
                        className="qd-assess__wreset"
                        title={`Back to the board's ${qn.weight ?? 1}`}
                        aria-label="Reset this weight"
                        onClick={() =>
                          setWeights((w) => {
                            const next = { ...w }
                            delete next[key]
                            return next
                          })
                        }
                      >
                        ⟲
                      </button>
                    )}
                  </div>

                  {openWhy[key] && qn.weightReason && (
                    <p className="qd-assess__why">
                      <b>Default ×{qn.weight ?? 1}.</b> {qn.weightReason}
                      {weights[key] !== undefined && (
                        <i> You have set it to ×{weightOf(qn, key).toFixed(1)}.</i>
                      )}
                    </p>
                  )}

                  {/*
                    What the authorities say to do about a weak answer.

                    Stated as their position with their links, not as this
                    board's advice — the board maps how close things are to
                    being real and does not tell anyone how to run a migration.
                    Folded shut, because a reader working through ten questions
                    does not want ten essays open.
                  */}
                  {qn.guidance && (
                    <div className="qd-assess__guide">
                      <button
                        className="qd-disc"
                        aria-expanded={!!openGuide[key]}
                        onClick={() => setOpenGuide((o) => ({ ...o, [key]: !o[key] }))}
                      >
                        National &amp; international guidance
                        <svg className="qd-chev" viewBox="0 0 24 24" aria-hidden="true" data-open={openGuide[key] || undefined}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {openGuide[key] && (
                        <div className="qd-assess__guidebody">
                          <p>{qn.guidance.text}</p>
                          {!!qn.guidance.links?.length && (
                            <p className="qd-assess__guidelinks">
                              {qn.guidance.links.map((l) => (
                                <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                                  {l.label} ↗
                                </a>
                              ))}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
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
