import { useEffect, useState } from 'react'

export interface Parts {
  d: number
  h: number
  m: number
  s: number
}

/**
 * A deadline that has passed reads zero, never negative.
 *
 * The negative case is real — one of these clocks is a target that can be
 * missed — but a countdown showing "-14 days" invites the reader to work out
 * what that means. The surface says it in words instead, where it can be said
 * properly.
 */
export function parts(ms: number): Parts {
  const t = Math.max(0, ms)
  return {
    d: Math.floor(t / 864e5),
    h: Math.floor((t % 864e5) / 36e5),
    m: Math.floor((t % 36e5) / 6e4),
    s: Math.floor((t % 6e4) / 1e3),
  }
}

/**
 * One interval for the whole surface rather than one per clock.
 *
 * Two clocks each running their own timer drift apart by up to a second, and
 * two countdowns to different dates showing seconds that tick at visibly
 * different moments looks like a bug even though both are correct.
 */
export function useNow(intervalMs = 1000): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])
  return now
}
