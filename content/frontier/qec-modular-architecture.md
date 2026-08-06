---
schema: frontier/v1
id: qec-modular-architecture
title: Modular fault-tolerant architecture
summary: Linking error-corrected modules rather than building one enormous chip. The proposed route from hundreds of logical qubits to the thousands an algorithm would need.
pillar: quantum
constellation: error-correction
readiness: emerging
actors: [IBM]
metrics:
  - name: Target
    value: 200 logical qubits by 2029
    note: IBM stated roadmap, not a demonstrated result
evidence:
  claim: IBM has published a modular architecture based on bivariate bicycle codes, with entanglement between modules via a universal adapter planned for demonstration on its innovation roadmap.
  verified: '2026-08-04'
  sources:
    - url: https://www.arxiv.org/abs/2506.03094
      role: preprint
      title: 'Tour de gross: a modular quantum computer based on bivariate bicycle codes'
      publisher: arXiv
      date: '2025-06-03'
      identifier: arXiv:2506.03094
    - url: https://www.ibm.com/quantum/blog/large-scale-ftqc
      role: vendor
      publisher: IBM
links:
  - to: qec-qldpc-bivariate-bicycle
    relation: depends-on
confidence: medium
status: published
added: '2026-08-04'
origin: human
---
