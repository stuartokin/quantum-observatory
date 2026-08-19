import { useMemo } from 'react'
import { frontier } from '../../content/frontier'
import { allNews } from '../../content/newsroom'
import type { Forecast } from '../../content/forecast'
import { derive } from '../derive'
import { Section } from '../ui/Section'
import { BoardFigure } from '../ui/Figure'

/**
 * STACK — what a cryptographically relevant machine still needs.
 *
 * **Still no completion percentages, and the meters are not them.**
 *
 * The research prototype scores each component and sums to "15% of the way
 * there". Those figures are editorial: the remaining work is not linear in
 * qubit count, so 96 logical qubits against 835 is not 11% of anything anyone
 * could defend, and summing six such numbers compounds the invention.
 *
 * The bars below are a *log-scale position* between one qubit and the
 * requirement — the axis the problem actually lives on, since every published
 * estimate has moved by orders of magnitude rather than by percentages. No
 * number is printed on them, the honest figure is the multiple in the pill,
 * and nothing is summed.
 */
export function Stack({ forecast }: { forecast?: Forecast }) {
  const d = useMemo(() => derive(frontier, forecast, allNews), [forecast])

  const gaps = d.capability.gaps
  const logical = gaps.find((g) => g.kind === 'logical')
  const physical = gaps.find((g) => g.kind === 'physical')

  const mult = (n: number) =>
    n >= 10 ? `${Math.round(n).toLocaleString('en-GB')}× more needed` : `${n.toFixed(1)}× more needed`

  /** Position on a log axis from 1 to the requirement. Never a percentage. */
  const logPos = (have: number, need: number) => Math.log10(have) / Math.log10(need)

  return (
    <div className="qd-stack">
      <Section
        title="Capability stack"
        info={
          <>
            Each card is read from the frontier item it names — the figure, the plain-English
            explanation, the claim its evidence makes, its evidence level and its source all
            come from that item rather than from this page, so a card cannot drift from the
            board and improves when an agent improves the item.
            <br />
            <br />
            The bars are a log-scale position between one qubit and the published requirement,
            not a completion percentage, and they are never summed. The multiple in the pill is
            the figure to trust.
          </>
        }
      >
        <p className="qd-trends__lede">
          What a machine capable of breaking deployed cryptography still needs. Two components
          have a published requirement and so have a distance; the rest do not, because nobody
          publishes what gate fidelity a break needs — it depends on the code — and inventing
          a target would be worse than admitting there is none.
        </p>

        <div className="qd-stack__grid">
          {logical && (
            <BoardFigure
              itemId={logical.demonstrated.itemId}
              title="Logical qubits"
              badge={mult(logical.required.value.n / logical.demonstrated.value.n)}
              headline={
                <>
                  {logical.demonstrated.value.raw} demonstrated
                  <span className="qd-fig__sub">
                    against {logical.required.value.raw} for {logical.required.target} ·{' '}
                    {logical.demonstrated.metricName}
                  </span>
                </>
              }
              meter={logPos(logical.demonstrated.value.n, logical.required.value.n)}
            />
          )}

          {physical && (
            <BoardFigure
              itemId={physical.demonstrated.itemId}
              title="Physical qubits"
              badge={mult(physical.required.value.n / physical.demonstrated.value.n)}
              headline={
                <>
                  {physical.demonstrated.value.raw} demonstrated
                  <span className="qd-fig__sub">
                    against {physical.required.value.raw} for {physical.required.target} ·{' '}
                    {physical.demonstrated.metricName}
                  </span>
                </>
              }
              meter={logPos(physical.demonstrated.value.n, physical.required.value.n)}
            />
          )}

          <BoardFigure
            itemId="qec-below-threshold-surface-code"
            title="Below threshold"
            badge="crossed"
            headline={
              <>
                Λ ≈ 2.14
                <span className="qd-fig__sub">
                  adding qubits now reduces error rather than compounding it
                </span>
              </>
            }
          />

          <BoardFigure
            itemId="arch-trapped-ion"
            title="Gate fidelity"
            badge="no published target"
            headline={
              <>
                99.921% two-qubit
                <span className="qd-fig__sub">
                  what a break needs depends on the code, so no requirement exists to compare against
                </span>
              </>
            }
          />

          <BoardFigure
            itemId="qec-realtime-decoding"
            title="Real-time decoding"
            headline={
              <>
                Tracked as readiness
                <span className="qd-fig__sub">
                  errors must be found and fixed faster than they accumulate, for the whole run
                </span>
              </>
            }
          />

          <BoardFigure
            itemId="qec-magic-state-distillation"
            title="Magic state distillation"
            headline={
              <>
                Dominates the budget
                <span className="qd-fig__sub">
                  most of the qubits in every RSA-2048 estimate go here, not into the algorithm
                </span>
              </>
            }
          />
        </div>

        <p className="qd-note">
          The two multiples move for different reasons, and only one of them is hardware. The
          logical-qubit requirement fell from 1,193 to 835 in four months because somebody found
          a better algorithm — no machine changed. That is why every card carries the date its
          figure was published.
        </p>
      </Section>
    </div>
  )
}
