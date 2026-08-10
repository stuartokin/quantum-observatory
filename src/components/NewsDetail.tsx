import type { NewsItem } from '../content/newsTypes'

function ago(date?: string): string {
  if (!date) return ''
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 864e5)
  if (days < 1) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 31) return `${days} days ago`
  return `${Math.round(days / 30.44)} months ago`
}

/** The full item, opened from the ticker. */
export default function NewsDetail({ item, colour }: { item: NewsItem; colour: string }) {
  const v = item.validation
  return (
    <div className="news-detail">
      <span className="label">
        {item.date} · {ago(item.date)}
        {item.significance === 'headline' && ' · headline'}
      </span>
      <h3 style={{ color: colour }}>{item.headline}</h3>
      <p>{item.plain}</p>

      <span className="label">Why this is believed</span>
      <p className={v?.status === 'verified' ? 'prov' : 'prov prov--agent'}>
        <span className="prov__dot" />
        {v?.status}
      </p>
      <ul className="news-detail__checks">
        {(v?.checks ?? []).map((c, k) => (
          <li key={k}>{c}</li>
        ))}
      </ul>
      {v?.note && <p className="prov-note">{v.note}</p>}

      <span className="label">Source</span>
      <ul className="news-detail__links">
        <li>
          <a href={item.source.url} target="_blank" rel="noopener noreferrer">
            {item.source.title ?? item.source.url}
          </a>
          <em> · {item.source.kind}</em>
          {item.source.publisher && <em> · {item.source.publisher}</em>}
        </li>
        {(item.corroboration ?? []).map((c, k) => (
          <li key={k}>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              {c.publisher ?? c.url}
            </a>
            <em> · corroborating</em>
          </li>
        ))}
      </ul>

      {item.establishedBy?.length ? (
        <>
          <span className="label">The research behind it</span>
          <p className="prov-note">
            An announcement is usually the visible end of work published earlier.
            These are the papers this rests on.
          </p>
          <ul className="news-detail__links">
            {item.establishedBy.map((e, k) => (
              <li key={k}>
                <a href={e.url} target="_blank" rel="noopener noreferrer">
                  {e.title ?? e.url}
                </a>
                {e.relation && <em> · {e.relation}</em>}
                {e.publisher && <em> · {e.publisher}</em>}
                {e.date && <em> · {e.date}</em>}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {item.about?.length ? (
        <>
          <span className="label">On the board</span>
          <p className="news-detail__about">{item.about.join(' · ')}</p>
        </>
      ) : null}
    </div>
  )
}


/**
 * The archive.
 *
 * A ticker is for what is happening; this is for what happened. Grouped by
 * month and collapsed, because a flat list of a year's headlines is a wall
 * rather than a record — the month is the unit people actually think in when
 * they ask when something changed.
 */
