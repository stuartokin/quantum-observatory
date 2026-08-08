---
schema: frontier/v1
id: crqc
title: Cryptographically relevant quantum computer
summary: 'A CRQC is a fault-tolerant quantum computer large enough to run Shor''s algorithm against RSA or ECC at real key sizes. No such machine exists; resource estimates define the engineering gap.'
plain: 'A cryptographically relevant quantum computer (CRQC) would be powerful enough to break the public-key encryption protecting most internet traffic. It does not yet exist. The clearest measure of how far away it is comes from resource estimates: how many error-corrected qubits, running for how long, at what error rate? A 2025 Google Quantum AI preprint put the requirement for RSA-2048 at under one million physical qubits running for under a week — a 20-fold reduction on the previous 2019 estimate. Current machines have hundreds to a few thousand physical qubits with error rates too high for fault-tolerant operation. The gap is large, but it has been shrinking faster than most forecasts assumed.'
pillar: quantum
constellation: algorithms
readiness: emerging
actors:
  - Google Quantum AI
country:
  - US
metrics:
  - name: Physical qubits to factor RSA-2048 (surface code, 0.1% error rate)
    value: '<1000000'
    unit: physical qubits
    note: Gidney 2025; assumes 0.1% gate error rate, 1 µs surface-code cycle, less than one week runtime
  - name: Toffoli gate reduction vs 2019 estimate
    value: '>100x'
    note: Gidney 2025 vs Gidney+Ekerå 2019
priority: P0
qdayImpact: 2
qdayReasoning: 'Resource estimates directly define the engineering target for Q-Day. Gidney 2025 reduced the qubit requirement 20-fold relative to the 2019 baseline, meaning the hardware target is substantially closer than institutional risk models built on the 2019 figure assumed. However this is a theoretical computation, not a hardware result; no machine approaches even 1% of the required capability. The impact score reflects the acceleration of the engineering target, not any change in hardware readiness.'
horizon: 3
novelty: major resource-estimate revision
evidence:
  claim: 'Gidney (Google Quantum AI, May 2025) estimates that a 2048-bit RSA integer could be factored in less than a week by a quantum computer with fewer than one million noisy physical qubits, assuming a 0.1% gate error rate and surface-code error correction — a greater-than-20-fold reduction from the 2019 Gidney+Ekerå estimate of 20 million qubits. The reduction comes from approximate residue arithmetic, yoked surface codes, and magic-state cultivation.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://arxiv.org/abs/2505.15917
      role: preprint
      title: How to factor 2048 bit RSA integers with less than a million noisy qubits
      publisher: arXiv
      date: '2025-05-21'
      identifier: 'arXiv:2505.15917 [quant-ph]'
      doi: 10.48550/arXiv.2505.15917
      accessed: '2026-08-08'
      note: Google Quantum AI. Preprint, not yet peer-reviewed as of verification date.
    - url: https://arxiv.org/abs/2603.28846
      role: corroborating
      title: 'Securing Elliptic Curve Cryptocurrencies against Quantum Vulnerabilities: Resource Estimates and Mitigations'
      publisher: arXiv
      date: '2026-03-30'
      identifier: 'arXiv:2603.28846 [quant-ph]'
      doi: 10.48550/arXiv.2603.28846
      accessed: '2026-08-08'
      note: 'Babbush, Zalcman, Gidney et al. (Google Quantum AI). ECC-256 resource estimate: <1200 logical qubits, <90M Toffoli gates, <500k physical qubits.'
confidence: high
status: published
links:
  - to: algo-shor
    relation: depends-on
  - to: qec-below-threshold-surface-code
    relation: depends-on
  - to: algo-resource-estimation
    relation: depends-on
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

No CRQC exists today. The Gidney 2025 preprint provides the current best resource estimate: fewer than one million noisy physical qubits, under one week of runtime, assuming surface-code error correction at 0.1% gate error rate. This is a 20× reduction from the same author's 2019 baseline and implies a hardware target that is closer than previously modelled — but still orders of magnitude beyond any existing machine.
