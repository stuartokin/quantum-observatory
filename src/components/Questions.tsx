import { useMemo, useRef, useState } from 'react'
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
  onOpenNews,
}: {
  questions: StandingQuestion[]
  items: FrontierItem[]
  news: NewsItem[]
  colour: string
  /** Open a frontier item cited as evidence. */
  onSelect: (id: string) => void
  /** Open a headline cited as evidence. */
  onOpenNews?: (id: string) => void
}) {
  const [openId, setOpenId] = useState<string | null>(null)
  /**
   * Two ways to read twelve answers.
   *
   * The list is for reading one properly. The grid is for seeing the shape of
   * all twelve at once — which is settled, which is moving, which nobody has
   * answered — and that is the view somebody arrives wanting.
   */
  const [view, setView] = useState<'list' | 'grid'>('grid')
  const listRef = useRef<HTMLOListElement>(null)

  /**
   * Switching view and scrolling are two steps, and the second only works once
   * the first has rendered — so the scroll waits a frame rather than firing
   * against a list that is still hidden.
   */
  const openQuestion = (id: string) => {
    setView('list')
    setOpenId(id)
    requestAnimationFrame(() => {
      listRef.current
        ?.querySelector(`[data-qid="${id}"]`)
        ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    })
  }

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

  /**
   * Count what the reader is actually shown.
   *
   * This counted the raw files, so a question with a derived answer was
   * reported as unanswered while displaying an answer — the summary and the
   * list disagreed on the same screen.
   */
  const summary = useMemo(() => {
    const states = resolved.map(({ q, derived }) => derived?.state ?? q.state)
    const by = (s: string) => states.filter((x) => x === s).length
    return {
      total: states.length,
      moving: by('moving'),
      steady: by('steady'),
      contested: by('contested'),
      unknown: by('unknown'),
      written: resolved.filter(({ derived }) => !derived).length,
    }
  }, [resolved])

  if (questions.length === 0) {
    return <p className="label">No questions recorded for this galaxy.</p>
  }

  return (
    <div className="questions">
      {/* Fixed. Scrolling the cards past the view switch means hunting for it
          every time you want to change mode. */}
      <div className="questions__summary questions__summary--fixed">
        <span className="questions__views">
          <button onClick={() => setView('grid')} aria-pressed={view === 'grid'}>
            Overview
          </button>
          <button onClick={() => setView('list')} aria-pressed={view === 'list'}>
            Read
          </button>
        </span>
        <span className="label">
          {summary.total} question{summary.total === 1 ? '' : 's'} ·{' '}
          {summary.moving} moving
          {summary.steady ? ` · ${summary.steady} steady` : ''}
          {summary.contested ? ` · ${summary.contested} contested` : ''}
          {summary.unknown ? ` · ${summary.unknown} unanswered` : ''}
          {summary.written < summary.total
            ? ` · ${summary.total - summary.written} counted, not written`
            : ''}
        </span>
      </div>

      <div className="questions__scroll">
      {view === 'grid' && (
        <div className="questions__grid">
          {resolved.map(({ q, derived }) => {
            const state = derived?.state ?? q.state
            const d = derived?.lastChanged
              ? Math.floor((Date.now() - new Date(derived.lastChanged).getTime()) / 864e5)
              : daysSinceChange(q)
            return (
              <button
                key={q.id}
                className="questions__cell"
                data-state={state}
                onClick={() => openQuestion(q.id)}
                title={derived?.answer ?? q.answer}
              >
                <span className="questions__cellnum">{q.number}</span>
                <span className="questions__cellq">{q.question}</span>
                <span className="questions__cellstate">
                  {STATE_LABEL[state] ?? state}
                </span>
                <span className="questions__cellwhen">
                  {d === null ? 'no date recorded' : `changed ${since(d)}`}
                </span>
                {derived && <span className="questions__cellderived">counted</span>}
              </button>
            )
          })}
        </div>
      )}

      <ol className="questions__list" hidden={view !== 'list'} ref={listRef}>
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
            <li
              key={q.id}
              data-qid={q.id}
              data-state={state}
              data-open={open || undefined}
            >
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

              {/* The evidence, on the surface rather than behind a click.
                  An answer a reader cannot follow to its source is an
                  assertion, and the whole point of the board is that nothing
                  here is only an assertion. */}
              {evidence.length > 0 && (
                <p className="questions__refs">
                  {evidence.slice(0, 5).map((e, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        e.kind === 'news' ? onOpenNews?.(e.ref) : onSelect(e.ref)
                      }
                      title={
                        e.kind === 'news'
                          ? 'Open this headline'
                          : 'Open this item on the board'
                      }
                      data-kind={e.kind ?? 'frontier'}
                    >
                      {e.ref}
                    </button>
                  ))}
                  {evidence.length > 5 && (
                    <span className="questions__more">+{evidence.length - 5}</span>
                  )}
                </p>
              )}

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

      </div>

      <p className="filter-group__note questions__foot">
        A question with nothing new to report is not a gap. Knowing an answer has
        held for eight months is often worth more than knowing it changed
        yesterday — and the date is what makes either statement mean anything.
      </p>
    </div>
  )
}
