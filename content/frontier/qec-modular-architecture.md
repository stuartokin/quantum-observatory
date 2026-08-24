---
schema: frontier/v1
id: qec-modular-architecture
title: Modular fault-tolerant architecture
summary: Linking error-corrected modules rather than building one enormous chip.
plain: Chips cannot grow indefinitely — yield, wiring and cooling all set limits. The alternative is many smaller error-corrected modules wired together, the way data centres scale by adding servers rather than one giant computer. Announced as a plan with dates, not yet a demonstrated result.
pillar: quantum
constellation: error-correction
readiness: emerging
actors: [IBM]
metrics:
  - name: Target
    value: '200 logical qubits by 2029'
    note: stated roadmap, not a demonstrated result
evidence:
  claim: IBM has published a modular architecture based on bivariate bicycle codes, with entanglement between modules via a universal adapter planned for demonstration on its innovation roadmap.
  verified: '2026-08-04'
  level: E3
  sources:
    - url: https://www.arxiv.org/abs/2506.03094
      role: preprint
      title: 'Tour de gross: a modular quantum computer based on bivariate bicycle codes'
      publisher: arXiv
      date: '2025-06-03'
      identifier: 'arXiv:2506.03094'
    - url: https://www.ibm.com/quantum/blog/large-scale-ftqc
      role: vendor
      publisher: IBM
links:
  - to: qec-qldpc-bivariate-bicycle
    relation: depends-on
  - to: comms-quantum-repeater
    relation: depends-on
  - to: qec-logical-qubit-scaling
    relation: enables
priority: P2
horizon: 3
country: [US]
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-24'
  note: arXiv:2506.03094 (Tour de gross) confirmed as IBM Quantum preprint (Yoder, Schoute, Rall, Pritchett, Gambetta, Cross, Carroll, Beverland), submitted June 2025, not peer-reviewed. No journal record found on ResearchGate or errorcorrectionzoo. E3 correct. 200 logical qubit / 2029 roadmap target is vendor statement, E2, not scored for Q-Day per decisions. No corrections.
confidence: medium
status: published
added: '2026-08-04'
origin: human
---

Quantum chips cannot grow indefinitely — yield, wiring and cooling all set limits. The alternative is many smaller error-corrected modules wired together, the way data centres scale by adding servers rather than one giant computer. Announced as a plan with dates, not yet a demonstrated result.
