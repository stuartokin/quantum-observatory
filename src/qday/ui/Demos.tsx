import { useMemo, useState } from 'react'

/**
 * TWO DEMONSTRATIONS, AND ONE THAT IS NOT HERE.
 *
 * The research prototype's best idea was that a trapdoor is much easier to feel
 * than to read about. You can write "factoring is hard" a dozen ways and it
 * stays abstract; make somebody search for a factor by hand for fifteen seconds
 * and the point lands.
 *
 * So these are interactive and deliberately small. Each demonstrates exactly
 * one idea and stops:
 *
 * - **Factoring** — the asymmetry itself. Multiplying is instant, searching is
 *   not, and the search grows with the size of the number.
 * - **The curve** — why elliptic-curve keys are hard to reverse: the points
 *   land nowhere near where a reader expects, so counting the hops backwards
 *   has nothing to grip.
 *
 * **The key-size comparison the prototype had is missing on purpose.** It is
 * the natural third demonstration for the FIPS step, and the board does not
 * hold those figures: the standards items carry the standard number and its
 * publication date, not the byte counts. Asserting them here from memory would
 * put unsourced numbers on a page whose entire argument is that it does not do
 * that. A sourcer job is queued to read them out of the standards, and the
 * demonstration can be built when the board can stand behind it.
 */

/* ---------- Factoring ---------- */

/** 3,233 = 53 × 61. Small enough to solve by hand, big enough to be annoying —
 *  which is the entire lesson. The product is written into the prose rather
 *  than computed, because it is a fixed part of the exercise. */
const FACTORS = [53, 61]

export function FactoringDemo() {
  const [tried, setTried] = useState<number[]>([])
  const [found, setFound] = useState<number[]>([])

  /** Odd candidates only. Nobody learns anything from ruling out the evens,
   *  and a hundred buttons is a wall rather than an exercise. */
  const candidates = useMemo(() => {
    const out: number[] = []
    for (let n = 3; n <= 71; n += 2) out.push(n)
    return out
  }, [])

  const done = found.length === 2

  return (
    <div className="qd-demo">
      <p className="qd-demo__lede">
        <b>3,233</b> is two prime numbers multiplied together. Find them.
      </p>

      <div className="qd-demo__grid" role="group" aria-label="Candidate factors">
        {candidates.map((n) => {
          const isFactor = FACTORS.includes(n)
          const state = found.includes(n) ? 'hit' : tried.includes(n) ? 'miss' : undefined
          return (
            <button
              key={n}
              className="qd-demo__cand"
              data-state={state}
              disabled={!!state}
              aria-label={`Try ${n}`}
              onClick={() => {
                if (isFactor) setFound((f) => [...f, n])
                else setTried((t) => [...t, n])
              }}
            >
              {n}
            </button>
          )
        })}
      </div>

      <p className="qd-demo__status" role="status">
        {done ? (
          <>
            <b>53 × 61 = 3,233.</b> That took {tried.length + found.length} attempts on a
            four-digit number. An RSA-2048 key is a <b>617-digit</b> number, and the
            candidates outnumber the atoms in the observable universe by an
            unimaginable margin. Nothing about the method changes — only the size of
            the search, and that is enough.
          </>
        ) : found.length === 1 ? (
          <>
            One found. Keep going — and notice that finding the first one told you
            nothing about where the second is.
          </>
        ) : tried.length === 0 ? (
          <>Tap the numbers. There is no shortcut; searching is the method.</>
        ) : (
          <>
            {tried.length} ruled out. Multiplying two primes took a moment. This is the
            same operation backwards.
          </>
        )}
      </p>

      {(tried.length > 0 || found.length > 0) && (
        <button
          className="qd-demo__reset"
          onClick={() => {
            setTried([])
            setFound([])
          }}
        >
          ⟲ Start again
        </button>
      )}
    </div>
  )
}

/* ---------- The curve ---------- */

/**
 * y² = x³ − 3x + 5 over the reals, drawn to scale.
 *
 * Over the reals rather than over a finite field, which is what real
 * cryptography uses — a field of 2²⁵⁶ points would render as noise and teach
 * nothing. The geometry is the honest part: the chord-and-tangent rule and the
 * unpredictability of where you land are exactly the same. The page says so
 * rather than letting the simplification pass as the real thing.
 */
const A = -3
const B = 5
const yAt = (x: number) => {
  const v = x * x * x + A * x + B
  return v < 0 ? null : Math.sqrt(v)
}

/** The chord-and-tangent addition law. P + Q, or 2P when they coincide. */
function addPoints(p: [number, number], q: [number, number]): [number, number] {
  const [x1, y1] = p
  const [x2, y2] = q
  const s =
    x1 === x2 && y1 === y2
      ? (3 * x1 * x1 + A) / (2 * y1)
      : (y2 - y1) / (x2 - x1)
  const x3 = s * s - x1 - x2
  const y3 = s * (x1 - x3) - y1
  return [x3, y3]
}

const START: [number, number] = [-1.5, yAt(-1.5) ?? 1]

export function CurveDemo() {
  const [hops, setHops] = useState(1)

  const points = useMemo(() => {
    const out: [number, number][] = [START]
    for (let i = 1; i < 8; i++) {
      const next = addPoints(out[out.length - 1], START)
      if (!Number.isFinite(next[0]) || !Number.isFinite(next[1])) break
      out.push(next)
    }
    return out
  }, [])

  /** The visible curve, sampled. Two branches: the closed oval on the left and
   *  the open arm, which is why the sampler has to skip where y² < 0. */
  const path = useMemo(() => {
    const upper: string[] = []
    const lower: string[] = []
    for (let x = -3; x <= 4; x += 0.02) {
      const y = yAt(x)
      if (y === null) {
        upper.push('M')
        lower.push('M')
        continue
      }
      upper.push(`${upper[upper.length - 1] === 'M' || !upper.length ? 'M' : 'L'}${sx(x)} ${sy(y)}`)
      lower.push(`${lower[lower.length - 1] === 'M' || !lower.length ? 'M' : 'L'}${sx(x)} ${sy(-y)}`)
    }
    return [upper.join(' ').replace(/M(?=\s*M)/g, ''), lower.join(' ').replace(/M(?=\s*M)/g, '')]
  }, [])

  const shown = points.slice(0, hops)

  return (
    <div className="qd-demo">
      <p className="qd-demo__lede">
        Start at <b>P</b> and keep adding it to itself. Watch where you land.
      </p>

      <svg viewBox="0 0 320 200" className="qd-demo__curve" role="img"
        aria-label={`An elliptic curve with ${hops} computed point${hops === 1 ? '' : 's'} marked`}>
        <line x1="0" y1="100" x2="320" y2="100" className="qd-demo__axis" />
        <line x1={sx(0)} y1="0" x2={sx(0)} y2="200" className="qd-demo__axis" />
        <path d={path[0]} className="qd-demo__line" />
        <path d={path[1]} className="qd-demo__line" />

        {shown.map((p, i) => (
          <g key={i}>
            <circle cx={sx(p[0])} cy={sy(p[1])} r={i === 0 ? 4.5 : 3.5} className="qd-demo__pt" data-first={i === 0 || undefined} />
            <text x={sx(p[0]) + 7} y={sy(p[1]) - 5} className="qd-demo__lbl">
              {i === 0 ? 'P' : `${i + 1}P`}
            </text>
          </g>
        ))}
      </svg>

      <div className="qd-demo__row">
        <button className="qd-demo__go" onClick={() => setHops((h) => Math.min(points.length, h + 1))} disabled={hops >= points.length}>
          Bounce →
        </button>
        {hops > 1 && (
          <button className="qd-demo__reset" onClick={() => setHops(1)}>⟲ Start again</button>
        )}
        <span className="qd-demo__count">{hops} of {points.length}</span>
      </div>

      <p className="qd-demo__status" role="status">
        {hops < 3 ? (
          <>Each hop follows one fixed rule: draw a line, find where it meets the curve, reflect it.</>
        ) : hops >= points.length ? (
          <>
            You can see where <b>{points.length}P</b> is. Now answer the reverse question — given
            only P and that final point, how many hops was it? There is no pattern to follow
            back. That is the discrete logarithm problem, and a real key is not eight hops
            but a number with seventy-seven digits.
          </>
        ) : (
          <>
            Notice the points are not marching along the curve. They land nowhere near where
            the previous one was.
          </>
        )}
      </p>

      <p className="qd-demo__caveat">
        Drawn over ordinary numbers so it can be seen. Real cryptography uses the same
        rule over a finite field of about 2<sup>256</sup> points, which would render as
        noise — the geometry is faithful, the scale is not.
      </p>
    </div>
  )
}

/** Curve space → SVG space. x ∈ [−3, 4], y ∈ [−5, 5]. */
function sx(x: number) {
  return ((x + 3) / 7) * 320
}
function sy(y: number) {
  return 100 - (y / 5) * 95
}
