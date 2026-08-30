import { useMemo } from 'react'
import { Section, Takeaway } from '../ui/Section'
import { BoardFigure } from '../ui/Figure'
import { frontier } from '../../content/frontier'
import { hrefFor } from '../route'
import type { FrontierItem } from '../../content/frontierTypes'

/**
 * READINESS — how far the migration has actually got.
 *
 * **Also planned as a quarantined import, and also not one.** The original
 * intent was to bring across the research prototype's vendor readiness scores
 * marked unverified. Two things argue against it now.
 *
 * A vendor readiness score is the hardest kind of claim for this board to
 * stand behind: it is a judgement about a company's internal state, it goes
 * stale within a quarter, and the published ones are mostly assembled from
 * marketing material. Putting a table of them on a board whose argument is
 * that every claim carries a checkable source would undercut the argument in
 * the section where it matters most.
 *
 * And the board already answers a better question. The `migration` and `pqc`
 * constellations *are* a readiness assessment: each item is a capability the
 * migration depends on, and each carries a readiness level that says how far
 * that capability has got, with the evidence behind it. `mig-supply-chain` sits
 * at `emerging` and `crypto-bill-of-materials` at `demonstrated`, and the
 * distance between them is the real finding.
 *
 * So this reads the board rather than importing anything, and it says what it
 * is not doing.
 */

/** Weakest first. The interesting end of this list is the top. */
const ORDER: FrontierItem['readiness'][] = [
  'emerging',
  'experimental',
  'demonstrated',
  'adopted',
  'mainstream',
]

const RUNG: Record<string, string> = {
  emerging: 'proposed, not replicated',
  experimental: 'replicated, not at scale',
  demonstrated: 'working at scale, or standardised',
  adopted: 'shipping, or on a published roadmap',
  mainstream: 'the default; absence is the exception',
}

/**
 * Named `MigrationReadiness`, not `Readiness`.
 *
 * `Readiness` is already the frontier item's readiness-level type in
 * `frontierTypes.ts`, and `check-exports` refuses one name exported from two
 * modules — a caller importing `Readiness` could not tell whether it was
 * getting a React component or a union of five strings. The longer name is
 * also the more accurate one: this section is about how far the migration has
 * got, not about readiness in the abstract.
 */
export function MigrationReadiness() {
  /** Everything the migration depends on, weakest first. */
  const rows = useMemo(
    () =>
      frontier
        .filter((i) => i.constellation === 'migration' || i.constellation === 'pqc')
        .sort(
          (a, b) =>
            ORDER.indexOf(a.readiness) - ORDER.indexOf(b.readiness) ||
            a.title.localeCompare(b.title),
        ),
    [],
  )

  const weakest = rows.filter((i) => i.readiness === 'emerging' || i.readiness === 'experimental')

  return (
    <div className="qd-readiness">
      <Section
        title="Is the migration ready?"
        info={
          <>
            Every item in the <b>migration</b> and <b>pqc</b> constellations is a
            capability the transition depends on, and each carries a readiness level with
            the evidence behind it. Sorted weakest first, because the weakest rung is what
            decides how long this takes.
            <br />
            <br />
            Nothing here is scored by this page. The levels are the board&rsquo;s, set
            against published definitions and revisable by an agent that finds better
            evidence.
          </>
        }
      >
        <p className="qd-trends__lede">
          The algorithms are finished. Almost nothing else is. Of {rows.length} capabilities
          the migration rests on, <b>{weakest.length}</b> are still at the two weakest
          rungs — which is a more useful statement about readiness than any score out of
          ten.
        </p>

        <ol className="qd-ladder">
          {rows.map((i) => (
            <li key={i.id} data-readiness={i.readiness}>
              <span className="qd-ladder__rung">{i.readiness}</span>
              <span className="qd-ladder__title">{i.title}</span>
              <span className="qd-ladder__note">{RUNG[i.readiness]}</span>
              {i.evidence?.level && (
                <span className="qd-ladder__level" data-level={i.evidence.level}>
                  {i.evidence.level}
                </span>
              )}
            </li>
          ))}
        </ol>

        <Takeaway>
          The standards being published is the part everyone noticed and the part that was
          never going to be the constraint. Discovery, crypto-agility, hardware roots of
          trust and supplier readiness are where the years go, and every one of them sits
          below the algorithms on this ladder.
        </Takeaway>
      </Section>

      <Section
        title="What is furthest behind"
        info={
          <>
            The same list, filtered to the two weakest rungs and read as cards so the
            evidence and its source are one tap away. These are the capabilities that
            decide the schedule.
          </>
        }
      >
        <div className="qd-stack__grid">
          {weakest.slice(0, 6).map((i) => (
            <BoardFigure
              key={i.id}
              itemId={i.id}
              badge={i.readiness}
              headline={
                <>
                  {RUNG[i.readiness]}
                  <span className="qd-fig__sub">
                    {i.evidence?.level
                      ? `evidence ${i.evidence.level}`
                      : 'no evidence level recorded'}
                  </span>
                </>
              }
            />
          ))}
        </div>
      </Section>

      <Section title="Are you ready?" defaultOpen={false}>
        <p className="qd-trends__lede">
          The board cannot answer that and does not try. What it offers is a structured way
          to arrive at your own numbers: three questionnaires — executive, technical and
          auditor — that produce a maturity level and starting values for X and Y in the
          Mosca test, with every weight stated, adjustable and argued for.
        </p>
        <p className="qd-note">
          It is on <a href={hrefFor('clocks')}>Clocks</a>, beside the arithmetic it feeds.
          It is a self-assessment prompt rather than an audit, and the page says so in
          three places.
        </p>
      </Section>

      <Section title="Is your jurisdiction ready?" defaultOpen={false}>
        <p className="qd-trends__lede">
          Every published deadline the board holds, each with the document that set it,
          is on <a href={hrefFor('plan')}>Plan</a> — plotted against the derived Q-Day
          band so the question a reader actually has is answerable: does the migration
          finish before the thing it defends against arrives?
        </p>
      </Section>

      <Section title="What this section does not hold" defaultOpen={false}>
        <p className="qd-trends__lede">
          <b>No vendor readiness scores.</b> They were in the plan and are deliberately
          not here.
        </p>
        <p className="qd-note">
          A vendor readiness score is a judgement about a company&rsquo;s internal state,
          it goes stale within a quarter, and the published ones are largely assembled
          from marketing material. Putting a table of them on a board that asks every
          other claim to carry a checkable source would undercut the argument exactly
          where it matters most. If this arrives later it will arrive as sourced items,
          with the same evidence levels as everything else.
        </p>
      </Section>
    </div>
  )
}
