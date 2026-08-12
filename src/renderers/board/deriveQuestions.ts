import type { FrontierItem } from '../../content/frontierTypes'
import type { NewsItem } from '../../content/newsTypes'
import type { StandingQuestion, QuestionState } from '../../content/questionTypes'

/**
 * PROVISIONAL ANSWERS.
 *
 * Several of the twelve can be answered from the board itself. Not well — a
 * derived answer counts things and cannot say what they mean — but a counted
 * answer is far better than an empty one, and it is honest about being counted.
 *
 * These are a floor, not the intended state. Where an agent has written a real
 * answer, that wins and this is never consulted. Where it has not, the reader
 * sees what the board can support rather than a blank, and the answer says
 * plainly that it was derived.
 *
 * The rule: a derived answer may only state what can be counted. "Three items
 * moved readiness in the last quarter" is countable. "Progress is accelerating"
 * is not, and no amount of arithmetic makes it so.
 */

const days = (d?: string) =>
  d ? (Date.now() - new Date(d).getTime()) / 864e5 : Infinity

const recent = (d: string | undefined, within: number) => days(d) <= within

export interface Derived {
  answer: string
  state: QuestionState
  lastChanged?: string
  evidence: { ref: string; kind: 'frontier' | 'news' }[]
}

export function deriveAnswer(
  q: StandingQuestion,
  items: FrontierItem[],
  news: NewsItem[],
): Derived | null {
  const moved = items.filter((i) => i.moved?.on).sort((a, b) =>
    (b.moved!.on ?? '').localeCompare(a.moved!.on ?? ''),
  )
  const movedRecently = moved.filter((i) => recent(i.moved?.on, 90))
  const qday = items.filter((i) => (i.qdayImpact ?? 0) !== 0)
  const headlines = news.filter((n) => n.significance === 'headline')

  switch (q.id) {
    case 'what-changed': {
      if (movedRecently.length === 0 && news.length === 0) return null
      return {
        state: movedRecently.length ? 'moving' : 'steady',
        lastChanged: moved[0]?.moved?.on,
        answer:
          `${movedRecently.length} item${movedRecently.length === 1 ? '' : 's'} changed ` +
          `readiness in the last quarter, and ${news.length} headline` +
          `${news.length === 1 ? ' has' : 's have'} been recorded. ` +
          `${movedRecently.length ? `Most recently: ${movedRecently[0].title}.` : ''}`,
        evidence: movedRecently.slice(0, 4).map((i) => ({ ref: i.id, kind: 'frontier' as const })),
      }
    }

    case 'q-day-timing': {
      if (qday.length === 0) return null
      const strongest = [...qday].sort(
        (a, b) => Math.abs(b.qdayImpact ?? 0) - Math.abs(a.qdayImpact ?? 0),
      )[0]
      return {
        state: qday.some((i) => recent(i.moved?.on, 180)) ? 'moving' : 'steady',
        lastChanged: strongest?.moved?.on ?? strongest?.evidence?.verified,
        answer:
          `${qday.length} item${qday.length === 1 ? ' carries' : 's carry'} a non-zero ` +
          `Q-Day score. The largest is ${strongest.title} at ${strongest.qdayImpact! > 0 ? '+' : ''}` +
          `${strongest.qdayImpact}. The forecast itself has not been moved by an agent.`,
        evidence: qday.slice(0, 4).map((i) => ({ ref: i.id, kind: 'frontier' as const })),
      }
    }

    case 'theory-to-demo': {
      const toDemo = moved.filter(
        (i) => i.readiness === 'demonstrated' && i.moved?.from === 'experimental',
      )
      if (toDemo.length === 0) return null
      return {
        state: toDemo.some((i) => recent(i.moved?.on, 180)) ? 'moving' : 'steady',
        lastChanged: toDemo[0]?.moved?.on,
        answer:
          `${toDemo.length} item${toDemo.length === 1 ? ' has' : 's have'} moved from ` +
          `experimental to demonstrated: ${toDemo.slice(0, 3).map((i) => i.title).join(', ')}` +
          `${toDemo.length > 3 ? ', among others' : ''}.`,
        evidence: toDemo.slice(0, 4).map((i) => ({ ref: i.id, kind: 'frontier' as const })),
      }
    }

    case 'real-advantage': {
      const apps = items.filter((i) => i.constellation === 'applications')
      return {
        state: apps.length === 0 ? 'unknown' : 'moving',
        lastChanged: apps.sort((a, b) => (b.added ?? '').localeCompare(a.added ?? ''))[0]?.added,
        answer:
          apps.length === 0
            ? 'The applications constellation is empty. The board cannot answer this yet, which is itself the answer: no application has been evidenced here.'
            : `${apps.length} item${apps.length === 1 ? '' : 's'} in the applications ` +
              `constellation. ${apps.filter((i) => i.readiness === 'demonstrated' || i.readiness === 'adopted').length} at demonstrated or beyond.`,
        evidence: apps.slice(0, 4).map((i) => ({ ref: i.id, kind: 'frontier' as const })),
      }
    }

    case 'sensing-comms': {
      const sc = items.filter(
        (i) => i.constellation === 'sensing' || i.constellation === 'communications',
      )
      if (sc.length === 0) return null
      const scMoved = sc.filter((i) => recent(i.moved?.on, 180))
      return {
        state: scMoved.length ? 'moving' : 'steady',
        lastChanged: sc.map((i) => i.moved?.on).filter(Boolean).sort().reverse()[0],
        answer:
          `${sc.length} items across sensing and communications, of which ` +
          `${sc.filter((i) => i.readiness === 'demonstrated' || i.readiness === 'adopted').length} ` +
          `are demonstrated or beyond and ${scMoved.length} moved in the last six months.`,
        evidence: sc.slice(0, 4).map((i) => ({ ref: i.id, kind: 'frontier' as const })),
      }
    }

    case 'roadmaps': {
      const vendor = news.filter((n) => n.source?.kind === 'vendor' || n.source?.kind === 'authority')
      if (vendor.length === 0) return null
      return {
        state: vendor.some((n) => recent(n.date, 90)) ? 'moving' : 'steady',
        lastChanged: vendor.sort((a, b) => b.date.localeCompare(a.date))[0]?.date,
        answer:
          `${vendor.length} headline${vendor.length === 1 ? '' : 's'} from vendors or ` +
          `national authorities recorded. The most recent is dated ` +
          `${vendor.sort((a, b) => b.date.localeCompare(a.date))[0].date}. Roadmaps are ` +
          `recorded at E2 and never move the Q-Day forecast on their own.`,
        evidence: vendor.slice(0, 4).map((n) => ({ ref: n.id, kind: 'news' as const })),
      }
    }

    case 'forecasts': {
      if (headlines.length === 0) return null
      return {
        state: 'steady',
        lastChanged: headlines.sort((a, b) => b.date.localeCompare(a.date))[0]?.date,
        answer:
          `${headlines.length} headline-significance result${headlines.length === 1 ? '' : 's'} ` +
          `recorded — the kind that would change what somebody plans around. Whether any ` +
          `of them invalidates a published forecast is a judgement no count can make.`,
        evidence: headlines.slice(0, 4).map((n) => ({ ref: n.id, kind: 'news' as const })),
      }
    }

    default:
      return null
  }
}

/** True when the answer a reader is seeing was counted rather than written. */
export function isDerived(q: StandingQuestion): boolean {
  return q.state === 'unknown' || !q.lastChanged
}
