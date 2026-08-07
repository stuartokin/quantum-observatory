export type Readiness = 'emerging' | 'experimental' | 'demonstrated' | 'adopted' | 'mainstream'
export type Confidence = 'high' | 'medium' | 'low'

export type SourceRole = 'primary' | 'preprint' | 'standard' | 'vendor' | 'corroborating'

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
}

export interface Metric {
  name: string
  value: string
  unit?: string
  note?: string
}

export type Relation = 'depends-on' | 'competes-with' | 'enables' | 'supersedes' | 'evidence-for'
export interface Link { to: string; relation: Relation }

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
  metrics?: Metric[]
  links?: Link[]
  evidence: Evidence
  confidence: Confidence
  status: 'draft' | 'published' | 'archived'
  moved?: { from?: Readiness; on?: string }
  articles?: string[]
  origin?: 'human' | 'agent'
  added?: string
}
