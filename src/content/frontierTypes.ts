export type Readiness = 'emerging' | 'experimental' | 'demonstrated' | 'adopted' | 'mainstream'
export type Confidence = 'high' | 'medium' | 'low'
export type EvidenceLevel = 'E0' | 'E1' | 'E2' | 'E3' | 'E4' | 'E5'
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
  state: 'reviewed' | 'agent-merged' | 'vetoed'
  by?: 'human' | 'agent'
  on?: string
  agentMergedOn?: string
  agent?: string
  note?: string
}

export interface FrontierItem {
  schema: 'frontier/v1'
  id: string
  title: string
  summary?: string
  plain?: string
  pillar: 'ai' | 'quantum' | 'materials' | 'energy' | 'cyber'
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
  review?: Review
  status: 'draft' | 'published' | 'archived'
  moved?: { from?: Readiness; on?: string }
  articles?: string[]
  origin?: 'human' | 'agent'
  added?: string
}
