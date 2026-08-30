import { useMemo, useState } from 'react'
import { GLOSSARY } from '../glossary'
import { LESSONS } from '../lessons'
import { frontierById } from '../../content/frontier'
import { allQuestions } from '../../content/questions'
import { Section } from '../ui/Section'
import { SourceRef } from '../ui/SourceRef'
import { FactoringDemo, CurveDemo } from '../ui/Demos'

/**
 * LEARN — eight steps, from why it matters to why it never finishes.
 *
 * **What this replaced, and why.** The first version of this tab was the twelve
 * standing questions in a numbered accordion, plus the glossary. Both are
 * useful and neither teaches: the questions are the board reporting on its own
 * state, and a dictionary is a reference you consult once you already know what
 * you are looking for. A reader arriving here knowing nothing left knowing
 * nothing, having been shown a status report.
 *
 * The research prototype had this right. It ran an eight-step explainer with
 * working demonstrations, and a reader could get from "what is RSA" to "why is
 * there a 2035 deadline" without leaving the page.
 *
 * **Two things this can do that the prototype could not.** Every step names the
 * frontier items its claims rest on, and those render from live content — so a
 * lesson cannot drift from the board, and improves when an agent improves an
 * item. And where a step touches something genuinely unsettled it says so by
 * naming one of the twelve standing questions, rather than teaching a
 * confident answer the board does not have.
 *
 * The questions themselves moved to the Frontier view, where they have a window
 * of their own. They appear here only against the step that raises them.
 */
const STATE_NOTE: Record<string, string> = {
  moving: 'the answer changed recently',
  steady: 'settled, nothing new',
  slowing: 'progress has decelerated',
  contested: 'credible parties disagree',
  unknown: 'the board cannot answer this yet',
}

const LEVEL_LABEL: Record<string, string> = {
  E5: 'independently replicated',
  E4: 'peer-reviewed',
  E3: 'preprint',
  E2: 'vendor statement',
  E1: 'theoretical',
  E0: 'speculative',
}

/** One frontier item, as a citation under a lesson. */
function Cited({ id }: { id: string }) {
  const item = frontierById.get(id)
  if (!item) {
    return (
      <li className="qd-cite qd-cite--missing">
        <code>{id}</code> is cited by this step and is not on the board.
      </li>
    )
  }
  const source = item.evidence?.sources?.[0]
  return (
    <li className="qd-cite">
      <b>{item.title}</b>
      {item.evidence?.level && (
        <span className="qd-cite__level" data-level={item.evidence.level}>
          {item.evidence.level} · {LEVEL_LABEL[item.evidence.level] ?? item.evidence.level}
        </span>
      )}
      {item.review?.state !== 'reviewed' && <span className="qd-cite__agent">agent, unreviewed</span>}
      {source && (
        <SourceRef
          source={{ ...source, level: item.evidence?.level, accessed: item.evidence?.verified }}
          label={source.publisher ?? 'source'}
        />
      )}
    </li>
  )
}

export function Learn() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<string | null>(LESSONS[0].id)

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

  const questionById = useMemo(
    () => new Map(allQuestions.map((x) => [x.id, x])),
    [],
  )

  return (
    <div className="qd-learn">
      <Section
        title="From nothing to the deadline, in eight steps"
        info={
          <>
            Written for a reader who does not work in cryptography. Open them in order the
            first time; after that, jump about.
            <br />
            <br />
            The explanations are written for this page and make no claim that could be
            checked against a source — which is why they live in the application rather
            than in content. <b>Every figure they rest on does not.</b> Each step names the
            board items carrying its claims, with the evidence level and the source, so a
            lesson cannot say more than the board can stand behind.
          </>
        }
      >
        <p className="qd-trends__lede">
          Eight steps: what cryptography is holding up, the two locks in use today, why a
          quantum computer opens both, what replaces them, who sets the dates, and why the
          work does not end when the migration does.
        </p>

        <ol className="qd-steps qd-steps--lessons">
          {LESSONS.map((l, i) => {
            const isOpen = open === l.id
            const question = l.question ? questionById.get(l.question) : undefined
            return (
              <li key={l.id}>
                <button
                  className="qd-steps__head"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : l.id)}
                >
                  <span className="qd-steps__n">{i + 1}</span>
                  <span className="qd-steps__q">
                    {l.title}
                    <i className="qd-steps__kicker">{l.kicker}</i>
                  </span>
                  <svg className="qd-chev" viewBox="0 0 24 24" aria-hidden="true" data-open={isOpen || undefined}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="qd-steps__body">
                    {l.body.map((p, k) => (
                      <p key={k} className="qd-steps__para">{p}</p>
                    ))}

                    {l.demo === 'factoring' && <FactoringDemo />}
                    {l.demo === 'curve' && <CurveDemo />}

                    {/*
                      A step that touches something unsettled says so with the
                      board's own answer rather than teaching past it. `unknown`
                      is the most useful state this can show.
                    */}
                    {question && (
                      <div className="qd-steps__open" data-state={question.state}>
                        <p className="qd-steps__openq">
                          <span>Still open</span> {question.question}
                        </p>
                        <p className="qd-steps__answer">{question.answer}</p>
                        <p className="qd-steps__meta">
                          {STATE_NOTE[question.state] ?? question.state} · confirmed {question.asOf}
                        </p>
                      </div>
                    )}

                    {!!l.cites?.length && (
                      <>
                        <p className="qd-steps__citeshead">What this rests on</p>
                        <ul className="qd-cites">
                          {l.cites.map((id) => (
                            <Cited key={id} id={id} />
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </Section>

      <Section
        title="Glossary"
        defaultOpen={false}
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
