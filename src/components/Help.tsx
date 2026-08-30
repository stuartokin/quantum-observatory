import { useMemo, useState } from 'react'
import type { FrontierItem } from '../content/frontierTypes'
import { items as articles } from '../content/loader'
import { GlyphMark } from './GlyphMark'
import { Markdown } from './Markdown'
import { buildDecisions, tally } from '../renderers/board/decisions'
import { buildDataLog, lastDataChange } from '../renderers/board/dataLog'
import { allNews } from '../content/newsroom'
import { BUILD_TIME, formatBuildTime } from '../buildInfo'
import { RELEASES } from '../releases'
import sourceRegister from '/agents/_sources.md?raw'
import decisionsDoc from '/agents/_decisions.md?raw'
import scoutPrompt from '/agents/scout/prompt.md?raw'
import sourcerPrompt from '/agents/sourcer/prompt.md?raw'
import verifierPrompt from '/agents/verifier/prompt.md?raw'
import reviewerPrompt from '/agents/reviewer/prompt.md?raw'
import designLog from '/docs/DESIGN-LOG.md?raw'
import operating from '/docs/OPERATING.md?raw'
import agentPlan from '/docs/AGENT-PLAN.md?raw'

/**
 * Help lives in its own module so it can be loaded on demand.
 *
 * It carries a markdown renderer and every document in the project — the design
 * log, the operating guide, the agent plan, four agent prompts and the source
 * register. All of that sat in the first paint for a panel most readers never
 * open, which is what pushed the bundle over its ceiling.
 */

/** One collapsible section. Open state is lifted so "expand all" can drive it. */
function Section({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string
  title: string
  open: boolean
  onToggle: (id: string) => void
  children: React.ReactNode
}) {
  return (
    <section className="help-section" data-open={open || undefined}>
      <button className="help-section__head" onClick={() => onToggle(id)} aria-expanded={open}>
        <span className="help-section__caret" aria-hidden="true">
          {open ? '▾' : '▸'}
        </span>
        {title}
      </button>
      {open && <div className="help-section__body">{children}</div>}
    </section>
  )
}

export default function Help({ colour, pool }: { colour: string; pool: FrontierItem[] }) {
  const [open, setOpen] = useState<Set<string>>(new Set(['reading']))
  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })

  const SECTIONS = [
    'what', 'reading', 'controls', 'provenance', 'decisions', 'sources',
    'prompts', 'design', 'operating', 'plan', 'data', 'versions', 'elsewhere',
  ]
  const allOpen = SECTIONS.every((id) => open.has(id))

  /** Counted from the board, never written down — a typed figure ages badly. */
  const stats = useMemo(() => {
    const level = new Map<string, number>()
    const state = new Map<string, number>()
    for (const i of pool) {
      const l = i.evidence?.level ?? 'unrated'
      level.set(l, (level.get(l) ?? 0) + 1)
      const st = i.review?.state ?? 'unknown'
      state.set(st, (state.get(st) ?? 0) + 1)
    }
    return {
      total: pool.length,
      unchecked: pool.filter((i) => i.review?.state === 'agent-merged').length,
      checked: pool.filter((i) => i.review?.state === 'agent-reviewed').length,
      sourced: pool.filter(
        (i) => i.status === 'published' && !i.evidence.claim.startsWith('NEEDS PRIMARY SOURCE'),
      ).length,
      level: [...level.entries()].sort(),
      state: [...state.entries()].sort(),
      constellations: new Set(pool.map((i) => i.constellation)).size,
    }
  }, [pool])

  const decisions = useMemo(() => buildDecisions(pool), [pool])
  const dataLog = useMemo(() => buildDataLog(pool, allNews), [pool])
  const lastChange = useMemo(() => lastDataChange(dataLog), [dataLog])
  const counts = useMemo(() => tally(decisions), [decisions])
  const [agentDoc, setAgentDoc] = useState<'scout' | 'sourcer' | 'verifier' | 'reviewer'>('scout')
  const PROMPTS = {
    scout: scoutPrompt,
    sourcer: sourcerPrompt,
    verifier: verifierPrompt,
    reviewer: reviewerPrompt,
  }

  return (
    <div className="help">
      <div className="help-toolbar">
        <button onClick={() => setOpen(allOpen ? new Set() : new Set(SECTIONS))}>
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      <Section id="what" title="What this is, and what it is not" open={open.has('what')} onToggle={toggle}>
        <p>
          The Quantum Observatory is not a feed, and its value comes from what it refuses to
          include. Thousands of quant-ph preprints appear each year, hundreds of
          peer-reviewed results across computing, cryptography, communications
          and sensing, and a trade press that publishes daily. The aggregators
          cover that volume already, and faster than any individual could.
        </p>
        <p>
          What they cannot do is tell you, six months later, which of those
          announcements turned out to matter — because they have no mechanism
          for going back and marking one down when a classical result narrows
          it.
        </p>
        <p>
          This board does. Every item carries an evidence level tied to the kind
          of source behind it, a readiness position tied to what has been built
          rather than announced, and a date recording when that assessment last
          moved. Agents correct downward on their own judgement and may never
          raise anything without a person. So a claim that weakens gets weaker
          here, and the record shows when and why.
        </p>
        <p>
          The output is not <em>here is what happened this week</em> but{' '}
          <em>here is what is currently true, and how confident anyone should be
          about it</em>. Tens of items where a feed would have thousands, because
          that is what survives the requirement that each be traceable to a
          primary source and mean something for planning.
        </p>
        <p>
          And it says what it does not know. The applications constellation held
          nothing for months, which was the correct answer: no verified quantum
          advantage on a commercially relevant problem had been published.
          Several of the twelve standing questions still read{' '}
          <em>not yet answered</em>, with a note on what evidence would settle
          them. A board that only shows the questions it can answer is
          describing itself rather than the field.
        </p>
        <p className="filter-group__note">
          Two honest caveats. This is a derivative of that literature — it could
          not exist without the journals and aggregators, and it uses the trade
          press constantly to locate papers it then refuses to cite. It is a
          different layer, not a replacement: they establish what was published,
          this establishes what it amounts to. And its coverage is a judgement
          about what belongs, made by agents against rules a person wrote. It is
          narrower than the literature by design, and the things it leaves out
          are chosen rather than absent.
        </p>
      </Section>

      <Section id="reading" title="Reading the board" open={open.has('reading')} onToggle={toggle}>
        <p>
          A map of how close developments in quantum computing, post-quantum
          cryptography, communications and sensing are to being real. Position is
          readiness, not date.
        </p>
        <dl className="help-key">
          <div>
            <dt><GlyphMark glyph="star" colour={colour} /></dt>
            <dd>Filled — carries a verified primary source</dd>
          </div>
          <div>
            <dt><GlyphMark glyph="pulsar" colour={colour} /></dt>
            <dd>Hollow — a topic with no source yet. Not a claim</dd>
          </div>
          <div>
            <dt><GlyphMark glyph="comet" colour={colour} /></dt>
            <dd>
              Shape is the organisation behind it. Colour is the constellation.
              Nothing on the board represents an organisation itself — every body
              is a development.
            </dd>
          </div>
        </dl>
        <p>
          <strong>Timeline:</strong> the horizontal axis is when the evidence was
          published, not when a file was written. Items with no dated source sit
          in the undated gutter rather than being given a position they have not
          earned.
        </p>
      </Section>

      <Section id="controls" title="Controls" open={open.has('controls')} onToggle={toggle}>
        <p>
          Hover to name · click to open · drag a body to move it · double-click a
          constellation to enter its orbit · scroll or pinch to zoom · drag to pan
        </p>
        <p>
          <strong>In orbit:</strong> drag empty space to rotate · shift-drag or
          right-drag to roll · two-finger twist to roll on touch · scroll or pinch
          to move the camera closer. The sky drifts on its own when left alone,
          and a body you have moved eases back into its orbit.
        </p>
        <p>
          <strong>Frames:</strong> drag the title bar to move · the corner to
          resize · the caret to minimise. The toolbar has a grip on each end:
          drag the left to move it, click it to collapse, drag the right to
          resize until it reduces to icons.
        </p>
        <p>Double-click the page title for the Q-Day forecast and its change history.</p>
      </Section>

      <Section id="provenance" title="Who wrote this" open={open.has('provenance')} onToggle={toggle}>
        <p>
          Research agents publish to this board without a human reading it first.
          That is a deliberate trade, and it rests on every entry saying so.
        </p>
        <p>
          A <strong>dashed amber ring</strong> means an agent published that entry
          and nobody has read it. Its sources are real and were checked by the
          agent; the judgement has not been confirmed. Open it to see when, and by
          which agent.
        </p>
        <p>
          <strong>Agent-checked</strong> means a second agent opened the sources
          and tested the claim against them. It still counts toward the
          unreviewed figure — the number in brackets beside it is how many have
          at least been through that check, and that is the figure a reviewer
          run moves. That agent can only ever make an
          entry more cautious, never more confident — anything that would raise a
          level goes to a person instead. It is still not a person having read it.
        </p>

        <span className="label">Where the board stands</span>
        <dl className="metrics">
          <div><dt>Items</dt><dd>{stats.total}</dd></div>
          <div><dt>Sourced</dt><dd>{stats.sourced}</dd></div>
          <div><dt>Unchecked</dt><dd>{stats.unchecked}</dd></div>
          <div><dt>Agent-checked</dt><dd>{stats.checked}</dd></div>
          <div><dt>Constellations</dt><dd>{stats.constellations}</dd></div>
          {stats.level.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
          {stats.state.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </Section>

      <Section
        id="decisions"
        title="What was decided, and by whom"
        open={open.has('decisions')}
        onToggle={toggle}
      >
        <p>
          Two kinds of decision run through this board. <strong>Precedents</strong>{' '}
          are settled by a person once and applied by the agents thereafter.{' '}
          <strong>Judgements</strong> are made on individual items — a readiness
          moved, an evidence level corrected, an entry removed.
        </p>
        <p>
          The record below is derived from the board itself, so it cannot
          disagree with what the board holds. An agent may only ever correct{' '}
          <em>downward</em>; anything that would raise a claim goes to a person.
        </p>

        <dl className="metrics">
          <div><dt>Decisions</dt><dd>{counts.total}</dd></div>
          <div><dt>By a person</dt><dd>{counts.byHuman}</dd></div>
          <div><dt>By an agent</dt><dd>{counts.byAgent}</dd></div>
          <div><dt>Readiness moved</dt><dd>{counts.moved}</dd></div>
          <div><dt>Corrected down</dt><dd>{counts.corrected}</dd></div>
          <div><dt>Vetoed</dt><dd>{counts.vetoed}</dd></div>
        </dl>

        <span className="label">Most recent first</span>
        <ul className="decisions">
          {decisions.slice(0, 40).map((d, i) => (
            <li key={`${d.id}-${d.kind}-${i}`} data-kind={d.kind} data-by={d.by}>
              <span className="decisions__meta">
                {d.date} · {d.by === 'human' ? 'person' : (d.agent ?? 'agent')}
              </span>
              <span className="decisions__title">{d.title}</span>
              <span className="decisions__what">{d.what}</span>
              {d.why && <span className="decisions__why">{d.why}</span>}
            </li>
          ))}
        </ul>
        {decisions.length > 40 && (
          <p className="filter-group__note">
            {decisions.length - 40} older decisions not shown.
          </p>
        )}

        <span className="label" style={{ display: 'block', marginTop: 20 }}>
          Standing precedents
        </span>
        <Markdown source={decisionsDoc} />
      </Section>

      <Section id="sources" title="Where the agents look" open={open.has('sources')} onToggle={toggle}>
        <p>
          The register below is the agents&rsquo; own, rendered from the file they
          read. They work it in tier order before searching freely.
        </p>
        <p>
          <strong>The source type sets the evidence level, never the author.</strong>{' '}
          A peer-reviewed paper from a large vendor is E4; a blog post from the
          same vendor is E2, exactly as a blog post from a two-person startup is.
          At least half of each run must come from outside the five largest
          programmes — not because their work is weak, but because a board that
          follows attention has stopped looking.
        </p>
        <Markdown source={sourceRegister} />
      </Section>

      <Section id="prompts" title="What the agents are told" open={open.has('prompts')} onToggle={toggle}>
        <p>
          The agents' instructions in full. Judgement lives here rather than in
          code, so it can be read and argued with by anyone who can read the
          board.
        </p>
        <div className="prompt-tabs">
          {(['scout', 'sourcer', 'verifier', 'reviewer'] as const).map((a) => (
            <button
              key={a}
              onClick={() => setAgentDoc(a)}
              aria-pressed={agentDoc === a}
              style={agentDoc === a ? { color: colour, borderColor: colour } : undefined}
            >
              {a}
            </button>
          ))}
        </div>
        <Markdown source={PROMPTS[agentDoc]} />
      </Section>

      <Section id="design" title="Design log" open={open.has('design')} onToggle={toggle}>
        <Markdown source={designLog} />
      </Section>

      <Section id="operating" title="How this is run" open={open.has('operating')} onToggle={toggle}>
        <Markdown source={operating} />
      </Section>

      <Section id="plan" title="The agent plan" open={open.has('plan')} onToggle={toggle}>
        <Markdown source={agentPlan} />
      </Section>

      <Section id="data" title="What changed in the data" open={open.has('data')} onToggle={toggle}>
        <dl className="metrics">
          <div><dt>Content last changed</dt><dd>{lastChange ?? '—'}</dd></div>
          <div><dt>Site last built</dt><dd>{formatBuildTime(BUILD_TIME)}</dd></div>
          <div><dt>Days recorded</dt><dd>{dataLog.length}</dd></div>
        </dl>
        <p className="filter-group__note">
          Front matter records dates but not times, so a change is dated to the
          day. The build time is when that content last reached a reader, which
          is the other half of the freshness question.
        </p>

        <p className="label">The last {Math.min(10, dataLog.length)} days on which anything changed</p>
        {dataLog.slice(0, 10).map((day) => (
          <details key={day.date} className="release">
            <summary>
              <strong>{day.date}</strong>
              <span>
                {day.changes.length} change{day.changes.length > 1 ? 's' : ''}
              </span>
            </summary>
            <ul className="data-log">
              {day.changes.map((c, i) => (
                <li key={`${c.id}-${c.kind}-${i}`} data-kind={c.kind} data-by={c.by}>
                  <span className="data-log__kind">
                    {c.kind}
                    {c.agent ? ` · ${c.agent}` : c.by === 'human' ? ' · person' : ''}
                  </span>
                  <span className="data-log__title">{c.title}</span>
                  <span className="data-log__detail">{c.detail}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </Section>

      <Section id="versions" title="What changed, by version" open={open.has('versions')} onToggle={toggle}>
        <p className="label">The last {RELEASES.length} releases</p>
        {RELEASES.map((r) => (
          <details key={r.version} className="release">
            <summary>
              <strong>v{r.version}</strong>
              <em>{r.date}</em>
              <span>{r.headline}</span>
            </summary>
            {r.ui && (
              <>
                <span className="label">Interface</span>
                <ul>{r.ui.map((l, i) => <li key={i}>{l}</li>)}</ul>
              </>
            )}
            {r.agents && (
              <>
                <span className="label">Agents and content</span>
                <ul>{r.agents.map((l, i) => <li key={i}>{l}</li>)}</ul>
              </>
            )}
            {r.content && (
              <>
                <span className="label">Content</span>
                <ul>{r.content.map((l, i) => <li key={i}>{l}</li>)}</ul>
              </>
            )}
          </details>
        ))}
        <p className="filter-group__note">
          Content figures are counted from the board as it stands, not recorded
          here. A number typed into a changelog is wrong within a week.
        </p>
      </Section>

      <Section id="elsewhere" title="Elsewhere" open={open.has('elsewhere')} onToggle={toggle}>
        <ul className="help-links">
          {articles.map((a) => (
            <li key={a.id}>
              {a.url ? (
                <a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a>
              ) : (
                a.title
              )}
            </li>
          ))}
        </ul>
      </Section>

      <p className="disclaimer">
        Written in a personal capacity. Views expressed here are my own and do not
        represent those of my employer.
      </p>
    </div>
  )
}

