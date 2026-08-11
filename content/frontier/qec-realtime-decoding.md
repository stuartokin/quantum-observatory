---
schema: frontier/v1
id: qec-realtime-decoding
title: Real-time syndrome decoding
summary: Correcting errors faster than they accumulate.
plain: Error correction works by constantly measuring hints about what went wrong and calculating the fix. If that calculation is slower than the errors arrive, you never catch up and the whole scheme fails. It is an ordinary classical computing problem that gates whether any of the quantum hardware can actually be used.
pillar: quantum
constellation: error-correction
readiness: experimental
actors: [Google Quantum AI, IBM]
metrics:
  - name: Requirement
    value: 'within one QEC cycle'
    note: slower decoding means corrections arrive too late
evidence:
  claim: Google reported below-threshold performance maintained while decoding in real time; IBM reports that improved belief propagation is sufficient for real-time decoding of qLDPC quantum memory.
  verified: '2026-08-04'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-024-08449-y
      role: primary
      title: Quantum error correction below the surface code threshold
      publisher: Nature
      date: '2025'
      identifier: Nature 638, 920–926 (2025)
    - url: https://arxiv.org/abs/2506.01779
      role: preprint
      title: Improved belief propagation is sufficient for real-time decoding of quantum memory
      publisher: arXiv
      date: '2025-06-02'
      identifier: 'arXiv:2506.01779'
      note: 'IBM Quantum (Müller, Alexander, Beverland et al.). Preprint; not peer-reviewed. Relay-BP decoder for bivariate-bicycle and surface codes. v2 revised 2025-08-22.'
links:
  - to: qec-qldpc-bivariate-bicycle
    relation: enables
  - to: enable-control-electronics
    relation: depends-on
  - to: qec-below-threshold-surface-code
    relation: enables
priority: P1
horizon: 2
qdayImpact: 1
qdayReasoning: 'Decoding speed was a plausible hard blocker; evidence it is tractable removes a source of delay.'
country: [US]
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-04'
  reviewedOn: '2026-08-11'
  note: 'Primary source Nature 638 (Google Willow) confirmed in prior runs; E4 defensible on that source alone. IBM preprint arXiv:2506.01779 confirmed as IBM Quantum (Müller et al., June 2025, revised Aug 2025); not peer-reviewed — corroborating preprint role correctly set. Added date and note to the preprint source record. Human review 2026-08-07 noted; no corrections required.'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
