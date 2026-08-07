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
    value: within one QEC cycle
    note: slower decoding means corrections arrive too late
evidence:
  claim: Google reported below-threshold performance maintained while decoding in real time; IBM reports that improved belief propagation is sufficient for real-time decoding of qLDPC quantum memory.
  verified: '2026-08-04'
  sources:
    - url: https://www.nature.com/articles/s41586-024-08449-y
      role: primary
      title: Quantum error correction below the surface code threshold
      publisher: Nature
      date: 2025
      identifier: Nature 638, 920–926 (2025)
    - url: https://arxiv.org/abs/2506.01779
      role: preprint
      title: Improved belief propagation is sufficient for real-time decoding of quantum memory
      publisher: arXiv
      identifier: 'arXiv:2506.01779'
links:
  - to: qec-qldpc-bivariate-bicycle
    relation: enables
  - to: enable-control-electronics
    relation: depends-on
  - to: qec-below-threshold-surface-code
    relation: enables
confidence: high
status: published
added: '2026-08-04'
origin: human
---
