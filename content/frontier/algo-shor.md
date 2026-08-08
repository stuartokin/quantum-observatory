---
schema: frontier/v1
id: algo-shor
title: Shor factoring at scale
summary: 'Resource estimates for running Shor algorithm on RSA-2048. The 2025 Gidney preprint reduces the qubit requirement from 20 million to under one million noisy physical qubits; no cryptographically relevant factoring has been demonstrated experimentally.'
plain: "Shor's algorithm can factor large numbers exponentially faster than any known classical method, which would break RSA and elliptic-curve cryptography if run on a large enough quantum computer. The question is how large 'large enough' is. The best current estimate (Gidney, May 2025) is that a quantum computer with fewer than one million noisy physical qubits and a week of runtime could factor a 2048-bit RSA key — far fewer than the 20 million estimated in 2019. No computer close to that size exists today, and the largest integer factored experimentally using a general quantum circuit remains tiny. The estimate is a preprint, not yet peer-reviewed."
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalysis
actors:
  - Google Quantum AI
country:
  - US
metrics:
  - name: noisy qubits required for RSA-2048
    value: '<1000000'
    unit: physical qubits
    note: 'Gidney 2025 preprint estimate; assumes 0.1% gate error rate, 1 µs surface code cycle'
  - name: estimated runtime for RSA-2048
    value: '<1 week'
    note: 'Gidney 2025 preprint'
priority: P0
qdayImpact: 2
qdayReasoning: 'Reducing the estimated qubit threshold for RSA-2048 factoring from 20 million to under one million noisy qubits meaningfully tightens the engineering gap. If hardware continues improving, this estimate makes Q-Day plausible sooner than prior analyses suggested. The score is +2 rather than +3 because the estimate is a preprint, the runtime is still under a week rather than hours, and the assumed gate error rates are still optimistic relative to current hardware.'
horizon: 3
novelty: major breakthrough
evidence:
  claim: 'Gidney (May 2025 preprint): using Chevignard approximate residue arithmetic and yoked surface codes, RSA-2048 can be factored in under a week by a quantum computer with fewer than one million noisy qubits, down from the 20 million estimated by Gidney and Ekerå in 2021. The 2021 Quantum journal paper remains the published baseline.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://arxiv.org/abs/2505.15917
      role: preprint
      title: How to factor 2048 bit RSA integers with less than a million noisy qubits
      publisher: arXiv
      date: '2025-05-21'
      identifier: arXiv:2505.15917
      accessed: '2026-08-08'
      note: 'Gidney sole author; not yet peer-reviewed as of 2026-08-08'
    - url: https://quantum-journal.org/papers/q-2021-04-15-433/
      role: primary
      title: 'How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits'
      publisher: Quantum
      date: '2021-04-15'
      identifier: 'Quantum 5, 433 (2021)'
      doi: 10.22331/q-2021-04-15-433
      accessed: '2026-08-08'
      note: 'Gidney and Ekerå; peer-reviewed, published baseline before 2025 optimisation'
links:
  - to: crqc
    relation: evidence-for
  - to: algo-resource-estimation
    relation: depends-on
  - to: qec-below-threshold-surface-code
    relation: depends-on
confidence: medium
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Shor's algorithm factors integers in polynomial quantum time, threatening RSA and elliptic-curve cryptography. The practical question is the physical resource cost. Gidney & Ekerå (2021, peer-reviewed) estimated ~20 million noisy qubits and ~8 hours for RSA-2048. A May 2025 preprint by Gidney alone, incorporating Chevignard's approximate residue arithmetic, reduces this to under one million noisy qubits in under a week. The 2025 figure is a preprint and has not been independently validated. No quantum computer has factored an integer of cryptographic size; the largest integers factored quantum-mechanically remain trivially small.
