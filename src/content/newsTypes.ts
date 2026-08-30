export type NewsSignificance = 'headline' | 'notable' | 'routine'
export type SourceKind =
  | 'paper' | 'preprint' | 'standard' | 'authority' | 'vendor' | 'press' | 'journalism'

export interface NewsSource {
  url: string
  kind: SourceKind
  title?: string
  publisher?: string
  date?: string
  doi?: string
}

/** Why an item is believed. An unvalidated item is not published. */
export interface NewsValidation {
  status: 'verified' | 'single-source' | 'contested' | 'rejected'
  checks: string[]
  note?: string
}

export interface EstablishedBy {
  url: string
  title?: string
  publisher?: string
  date?: string
  doi?: string
  relation?: 'reports' | 'builds-on' | 'applies' | 'contradicts'
}

export type MeasurementKind =
  | 'physical-qubits'
  | 'logical-qubits'
  | 'two-qubit-fidelity'
  | 'single-qubit-fidelity'
  | 'code-distance'
  | 'logical-error-per-cycle'
  | 'error-suppression-factor'
  | 'coherence-time'

export type Modality =
  | 'superconducting'
  | 'trapped-ion'
  | 'neutral-atom'
  | 'photonic'
  | 'silicon-spin'
  | 'topological'
  | 'annealing'
  | 'other'

/**
 * A figure this event reported, structured so it can be plotted.
 *
 * This is the only place on the board that can carry a capability *series*.
 * A frontier item holds the current best value and overwrites its own history
 * — when a device ships more qubits the old number is gone. A news item is
 * dated by when the thing happened and is never revised, so a hundred of them
 * are a hundred dated points.
 *
 * `modality` and `qualifier` are not decoration. Qubit counts on different
 * platforms are not points on one curve, and 48 error-corrected logical qubits
 * is not the same measurement as 94 error-detected ones on the same device.
 * Without those two fields this collection would produce a confident, wrong
 * chart.
 */
export interface Measurement {
  kind: MeasurementKind
  value: number
  unit?: string
  qualifier?: string
  modality?: Modality
  note?: string
  /** A frontier item whose verified metrics carry the same figure. */
  crossChecks?: string
}

/**
 * A dated event, deliberately not a frontier item.
 *
 * The board maps how close things are to being real. News is what happened and
 * when. Mixing them would let a stream of announcements move a readiness map,
 * which is precisely what the map exists to resist.
 */
export interface NewsItem {
  schema: 'news/v1'
  id: string
  headline: string
  pillar: 'quantum'
  date: string
  plain: string
  significance?: NewsSignificance
  source: NewsSource
  corroboration?: { url: string; publisher?: string; kind?: string }[]
  validation: NewsValidation
  /** Frontier item ids this bears on. */
  about?: string[]
  /** The research behind it — the link that makes an announcement traceable. */
  establishedBy?: EstablishedBy[]
  /** Figures this event reported. See `Measurement`. */
  measurements?: Measurement[]
  actors?: string[]
  country?: string[]
  review?: {
    state: 'reviewed' | 'agent-reviewed' | 'agent-merged' | 'vetoed'
    by?: 'human' | 'agent'
    on?: string
    agentMergedOn?: string
    reviewedOn?: string
    agent?: string
    note?: string
  }
  status: 'draft' | 'published' | 'archived'
  added?: string
  body?: string
}
