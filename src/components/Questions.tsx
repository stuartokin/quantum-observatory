import { useMemo, useState } from 'react'
import type { StandingQuestion } from '../content/questionTypes'
import { daysSinceChange } from '../content/questions'
import { deriveAnswer, isDerived } from '../renderers/board/deriveQuestions'
import type { FrontierItem } from '../content/frontierTypes'
import type { NewsItem } from '../content/newsTypes'

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
  items,
  news,
  colour,
  onSelect,
}: {
  questions: StandingQuestion[]
  items: FrontierItem[]
  news: NewsItem[]
  colour: string
  /** Open a frontier item cited as evidence. */
  onSelect: (id: string) => void
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  /**
   * An agent's answer wins. Where there is none, the board answers what it can
   * count — which is a poor answer and a great deal better than a blank one,
   * provided it says which it is.
   */
  const resolved = useMemo(
    () =>
      questions.map((q) => {
        if (!isDerived(q)) return { q, derived: null }
        return { q, derived: deriveAnswer(q, items, news) }
      }),
    [questions, items, news],
  )

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
        {resolved.map(({ q, derived }) => {
          const answer = derived?.answer ?? q.answer
          const state = derived?.state ?? q.state
          const evidence = derived
            ? derived.evidence.map((e) => ({ ref: e.ref, kind: e.kind }))
            : (q.evidence ?? [])
          const days = derived?.lastChanged
            ? Math.floor((Date.now() - new Date(derived.lastChanged).getTime()) / 864e5)
            : daysSinceChange(q)
          const open = openId === q.id
          const stale = days !== null && days > 180

          return (
            <li key={q.id} data-state={state} data-open={open || undefined}>
              <button
                className="questions__head"
                onClick={() => setOpenId(open ? null : q.id)}
                aria-expanded={open}
              >
                <span className="questions__number">{q.number}</span>
                <span className="questions__q">{q.question}</span>
                <span
                  className="questions__state"
                  style={state === 'moving' ? { color: colour } : undefined}
                >
                  {STATE_LABEL[state] ?? state}
                </span>
              </button>

              <p className="questions__answer">{answer}</p>
              {derived && (
                <p className="questions__derived">
                  Counted from the board — no agent has written an answer to this
                  one yet. A count can say what happened, not what it means.
                </p>
              )}

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

                  {evidence.length ? (
                    <>
                      <span className="label">Resting on</span>
                      <ul className="questions__evidence">
                        {evidence.map((e, i) => (
                          <li key={i}>
                            {'url' in e && e.kind === 'url' && e.url ? (
                              <a href={e.url} target="_blank" rel="noopener noreferrer">
                                {('note' in e && e.note) || e.url}
                              </a>
                            ) : (
                              <button onClick={() => onSelect(e.ref)}>{e.ref}</button>
                            )}
                            {'note' in e && e.note && e.kind !== 'url' && <span> — {e.note}</span>}
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
