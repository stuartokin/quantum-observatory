import { useMemo, useState } from 'react'
import type { StandingQuestion } from '../content/questionTypes'
import { daysSinceChange } from '../content/questions'

/**
 * THE TWELVE QUESTIONS.
 *
 * The board maps what exists. This says what it means — the questions somebody
 * planning around quantum technology actually has, each with a current answer
 * and the date it last changed.
 *
 * The date is the point. "No change since March" is a real answer and often the
 * more useful one: it says the field is settled there, which is what you need
 * before deciding not to worry about something. An answer with no date is an
 * opinion.
 */

const STATE_LABEL: Record<string, string> = {
  moving: 'Moving',
  steady: 'Steady',
  slowing: 'Slowing',
  contested: 'Contested',
  unknown: 'Not yet answered',
}

function since(days: number | null): string {
  if (days === null) return 'never recorded'
  if (days < 1) return 'today'
  if (days < 14) return `${days} days ago`
  if (days < 60) return `${Math.round(days / 7)} weeks ago`
  if (days < 365) return `${Math.round(days / 30.44)} months ago`
  return `${(days / 365).toFixed(1)} years ago`
}

export default function Questions({
  questions,
  colour,
  onSelect,
}: {
  questions: StandingQuestion[]
  colour: string
  /** Open a frontier item cited as evidence. */
  onSelect: (id: string) => void
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  const summary = useMemo(() => {
    const by = (s: string) => questions.filter((q) => q.state === s).length
    return {
      moving: by('moving'),
      steady: by('steady'),
      contested: by('contested'),
      unknown: by('unknown'),
    }
  }, [questions])

  if (questions.length === 0) {
    return <p className="label">No questions recorded for this galaxy.</p>
  }

  return (
    <div className="questions">
      <div className="questions__summary">
        <span className="label">
          {summary.moving} moving · {summary.steady} steady
          {summary.contested ? ` · ${summary.contested} contested` : ''}
          {summary.unknown ? ` · ${summary.unknown} unanswered` : ''}
        </span>
      </div>

      <ol className="questions__list">
        {questions.map((q) => {
          const days = daysSinceChange(q)
          const open = openId === q.id
          const stale = days !== null && days > 180

          return (
            <li key={q.id} data-state={q.state} data-open={open || undefined}>
              <button
                className="questions__head"
                onClick={() => setOpenId(open ? null : q.id)}
                aria-expanded={open}
              >
                <span className="questions__number">{q.number}</span>
                <span className="questions__q">{q.question}</span>
                <span
                  className="questions__state"
                  style={q.state === 'moving' ? { color: colour } : undefined}
                >
                  {STATE_LABEL[q.state] ?? q.state}
                </span>
              </button>

              <p className="questions__answer">{q.answer}</p>

              <p className="questions__when">
                <span className={stale ? 'questions__stale' : undefined}>
                  Last changed {since(days)}
                </span>
                {q.asOf && <span> · confirmed current {q.asOf}</span>}
              </p>

              {open && (
                <div className="questions__detail">
                  {q.changedBy && (
                    <>
                      <span className="label">What changed it</span>
                      <p>{q.changedBy}</p>
                    </>
                  )}

                  {q.evidence?.length ? (
                    <>
                      <span className="label">Resting on</span>
                      <ul className="questions__evidence">
                        {q.evidence.map((e, i) => (
                          <li key={i}>
                            {e.kind === 'url' && e.url ? (
                              <a href={e.url} target="_blank" rel="noopener noreferrer">
                                {e.note ?? e.url}
                              </a>
                            ) : (
                              <button onClick={() => onSelect(e.ref)}>{e.ref}</button>
                            )}
                            {e.note && e.kind !== 'url' && <span> — {e.note}</span>}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {q.history?.length ? (
                    <>
                      <span className="label">Before that</span>
                      <ul className="questions__history">
                        {q.history.map((h, i) => (
                          <li key={i}>
                            <span className="questions__hdate">{h.date}</span>
                            <span className="questions__hwas">{h.was}</span>
                            {h.why && <span className="questions__hwhy">{h.why}</span>}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="filter-group__note">
                      No earlier answer recorded. The history begins when an agent
                      first changes this one.
                    </p>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <p className="filter-group__note">
        A question with nothing new to report is not a gap. Knowing an answer has
        held for eight months is often worth more than knowing it changed
        yesterday — and the date is what makes either statement mean anything.
      </p>
    </div>
  )
}
