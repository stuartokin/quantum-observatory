import { useMemo, useState } from 'react'
import { GLOSSARY } from '../glossary'
import { frontierById } from '../../content/frontier'
import { allQuestions } from '../../content/questions'
import { Section } from '../ui/Section'

/**
 * LEARN — the vocabulary, and the questions the board is holding open.
 *
 * The numbered accordion is borrowed from the research prototype, where it is
 * used for an eight-step explainer. Here the numbers are not decoration: the
 * board's twelve standing questions are *already* numbered, ordered and
 * maintained by an agent, so the pattern lands on content that was shaped for
 * it. Four of them currently read `unknown`, which is a real answer and the
 * most useful thing on the page.
 */
const STATE_NOTE: Record<string, string> = {
  moving: 'the answer changed recently',
  steady: 'settled, nothing new',
  slowing: 'progress has decelerated',
  contested: 'credible parties disagree',
  unknown: 'the board cannot answer this yet',
}

export function Learn() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<string | null>(null)

  const terms = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return GLOSSARY
    return GLOSSARY.filter(
      (t) =>
        t.term.toLowerCase().includes(needle) ||
        (t.short ?? '').toLowerCase().includes(needle) ||
        t.definition.toLowerCase().includes(needle),
    )
  }, [q])

  const questions = allQuestions.filter((x) => x.pillar === 'quantum')

  return (
    <div className="qd-learn">
      <Section
        title="What is still open"
        info={
          <>
            The board&rsquo;s twelve standing questions, with the state an agent last recorded and
            the date it was last confirmed. These are content, not copy — they change when the
            evidence does. An answer of <b>unknown</b> means the board cannot currently tell
            you, which is more use than a confident guess.
          </>
        }
      >
        <ol className="qd-steps">
          {questions.map((x) => {
            const isOpen = open === x.id
            return (
              <li key={x.id} data-state={x.state}>
                <button
                  className="qd-steps__head"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : x.id)}
                >
                  <span className="qd-steps__n">{x.number}</span>
                  <span className="qd-steps__q">{x.question}</span>
                  <span className="qd-steps__state">{x.state}</span>
                  <svg className="qd-chev" viewBox="0 0 24 24" aria-hidden="true" data-open={isOpen || undefined}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="qd-steps__body">
                    <p className="qd-steps__answer">{x.answer}</p>
                    <p className="qd-steps__meta">
                      {STATE_NOTE[x.state] ?? x.state} · confirmed {x.asOf}
                      {x.lastChanged && ` · last materially changed ${x.lastChanged}`}
                      {x.changedBy && <> — {x.changedBy}</>}
                    </p>
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </Section>

      <Section
        title="Glossary"
        info={
          <>
            Definitions written for this page. They make no claim about the world that could be
            right or wrong against evidence, which is why they live in the application rather
            than in content — but where the board holds evidence on a term, the entry names the
            item and its evidence level so the claim is one step away.
          </>
        }
      >
        <div className="qd-learn__bar">
          <input
            type="search"
            placeholder="Filter terms…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Filter glossary terms"
          />
          <span className="qd-learn__count">
            {terms.length} of {GLOSSARY.length}
          </span>
        </div>

        <dl className="qd-learn__glossary">
          {terms.map((t) => {
            const item = t.see ? frontierById.get(t.see) : undefined
            return (
              <div key={t.term}>
                <dt>
                  {t.term}
                  {t.short && <span className="qd-learn__short">{t.short}</span>}
                </dt>
                <dd>
                  {t.definition}
                  {item && (
                    <span className="qd-learn__see">
                      On the board: <b>{item.title}</b>
                      {item.evidence?.level && <i> · {item.evidence.level}</i>}
                    </span>
                  )}
                  {t.see && !item && (
                    <span className="qd-learn__see qd-learn__see--missing">
                      Links to <code>{t.see}</code>, which is not on the board.
                    </span>
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
        {terms.length === 0 && <p className="qd-note">Nothing matches “{q}”.</p>}
      </Section>
    </div>
  )
}
