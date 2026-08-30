export type Readiness = 'emerging' | 'experimental' | 'demonstrated' | 'adopted' | 'mainstream'
export type Confidence = 'high' | 'medium' | 'low'
/**
 * `unrated` is not a low grade — it means nobody has attached evidence yet, and
 * says nothing about the development. E1 is a judgement that the work is
 * theoretical. Treating the two as the same made a well-demonstrated technique
 * read as untested.
 */
export type EvidenceLevel = 'unrated' | 'E0' | 'E1' | 'E2' | 'E3' | 'E4' | 'E5'
export type Priority = 'P0' | 'P1' | 'P2' | 'P3' | 'P4'
export type SourceRole = 'primary' | 'preprint' | 'standard' | 'vendor' | 'corroborating'
export type Relation = 'depends-on' | 'competes-with' | 'enables' | 'supersedes' | 'evidence-for'

export interface Source {
  url: string
  role: SourceRole
  title?: string
  publisher?: string
  date?: string
  identifier?: string
  /* `doi`, `note` and `accessed` are in frontier.schema.json and in the
   * content, and were missing here — the same schema/type drift that had
   * `review` optional when the schema marks it required. The derivation dates
   * a metric by matching the identifier in its note against these sources, so
   * a field the type does not admit is a source it cannot match. */
  doi?: string
  note?: string
  accessed?: string
}

export interface Evidence {
  claim: string
  verified: string
  sources: Source[]
  /** E5 replicated · E4 peer-reviewed · E3 preprint · E2 vendor · E1 theory · E0 speculative */
  level?: EvidenceLevel
}

export interface Metric {
  name: string
  value: string
  unit?: string
  note?: string
}

export interface Link {
  to: string
  relation: Relation
}

/**
 * Provenance. Every item declares whether a human has read it.
 * An agent writes `agent-merged` and can never write `reviewed` — that single
 * asymmetry is what makes publish-first-veto-after safe.
 */
export interface Review {
  /**
   * reviewed        a human read it
   * agent-reviewed  the reviewer agent checked it against its sources
   * agent-merged    an agent published it, unchecked
   * vetoed          reverted, kept for the record
   */
  state: 'reviewed' | 'agent-reviewed' | 'agent-merged' | 'vetoed'
  by?: 'human' | 'agent'
  on?: string
  agentMergedOn?: string
  reviewedOn?: string
  agent?: string
  note?: string
}

export interface FrontierItem {
  schema: 'frontier/v1'
  id: string
  title: string
  summary?: string
  plain?: string
  pillar: 'quantum'
  readiness: Readiness
  cluster?: string
  constellation?: string
  actors?: string[]
  country?: string[]
  metrics?: Metric[]
  links?: Link[]
  evidence: Evidence
  confidence: Confidence
  priority?: Priority
  qdayImpact?: number
  qdayReasoning?: string
  horizon?: 1 | 2 | 3
  novelty?: string
  // frontier.schema.json marks this required (every item declares whether a
  // human has read it) — the TS type had drifted to optional, which would
  // mask a genuine omission if the schema gate were ever bypassed.
  review: Review
  status: 'draft' | 'published' | 'archived'
  moved?: { from?: Readiness; on?: string }
  articles?: string[]
  origin?: 'human' | 'agent'
  added?: string
}
