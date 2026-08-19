import { useMemo, useState } from 'react'
import { GLOSSARY } from '../glossary'
import { frontierById } from '../../content/frontier'
import { allQuestions } from '../../content/questions'

/**
 * LEARN — the vocabulary, and the twelve questions.
 *
 * Two halves with different provenance, and the page keeps them apart.
 *
 * The glossary is definitions: presentational, written for this surface, and
 * making no claim that could be right or wrong against evidence. It lives in
 * code (`src/qday/glossary.ts`) for exactly that reason.
 *
 * The questions are the board's own standing questions, content, with dates
 * and states an agent maintains. They are the honest answer to "what is still
 * unsettled" — and four of the twelve currently read `unknown`, which is worth
 * a reader seeing rather than a page hiding.
 */
export function Learn() {
  const [q, setQ] = useState('')

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

  const quantumQuestions = allQuestions.filter((x) => x.pillar === 'quantum')

  return (
    <div className="qd-learn">
      <p className="qd-trends__lede">
        The vocabulary this subject runs on, and the questions the board is holding open.
        Definitions are written for this page and make no claim about the world; where the
        board holds evidence on a term, the entry links to it.
      </p>

      <section>
        <div className="qd-learn__bar">
          <h3>Glossary</h3>
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
      </section>

      {quantumQuestions.length > 0 && (
        <section>
          <h3>What is still open</h3>
          <p className="qd-note">
            The board's standing questions, with the state an agent last recorded. An
            answer of <b>unknown</b> is a real answer — it says the board cannot currently
            tell you, which is more use than a confident guess.
          </p>
          <ol className="qd-learn__questions">
            {quantumQuestions.map((x) => (
              <li key={x.id} data-state={x.state}>
                <span className="qd-learn__qstate">{x.state}</span>
                <div>
                  <p className="qd-learn__qtext">{x.question}</p>
                  <p className="qd-learn__qanswer">{x.answer}</p>
                  <p className="qd-learn__qmeta">
                    as of {x.asOf}
                    {x.lastChanged && ` · last changed ${x.lastChanged}`}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  )
}
