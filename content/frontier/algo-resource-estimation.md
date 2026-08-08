---
schema: frontier/v1
id: algo-resource-estimation
title: Cryptanalytic resource estimation
summary: Detailed quantitative estimates of the physical qubit count and runtime required to run Shor's algorithm against real-world cryptographic key sizes.
plain: Before a quantum computer can threaten encryption, researchers must work out exactly how many qubits — and of what quality — are needed. These resource estimates have been revised repeatedly downward as error-correction and circuit-optimisation techniques improve. The best current estimate (2025) is that fewer than one million noisy physical qubits could factor a 2048-bit RSA key in under a week, assuming gate error rates of 0.1% — still far beyond today's hardware.
pillar: quantum
readiness: demonstrated
constellation: algorithms
actors:
  - Google Quantum AI
country:
  - US
metrics:
  - name: physical qubits for RSA-2048 factoring (2021 estimate)
    value: "20000000"
    unit: qubits
    note: Gidney & Ekerå 2021; assumes 0.1% gate error, 1 µs surface-code cycle, nearest-neighbour grid; runtime ~8 hours
  - name: physical qubits for RSA-2048 factoring (2025 revised estimate)
    value: "<1000000"
    unit: qubits
    note: Gidney 2025 arXiv; same hardware assumptions; runtime <1 week; uses approximate residue arithmetic and yoked surface codes
links:
  - to: algo-shor
    relation: evidence-for
  - to: crqc
    relation: evidence-for
  - to: qec-surface-code
    relation: depends-on
evidence:
  claim: Detailed resource analyses show RSA-2048 could be factored by a quantum computer with 20 million noisy physical qubits in ~8 hours (Gidney & Ekerå 2021, peer-reviewed), later revised to fewer than one million qubits in under a week using improved arithmetic and code techniques (Gidney 2025, preprint). Both assume 0.1% gate error rates and standard surface-code assumptions.
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://quantum-journal.org/papers/q-2021-04-15-433/
      role: primary
      title: How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits
      publisher: Quantum
      date: '2021-04-15'
      doi: 10.22331/q-2021-04-15-433
      identifier: Quantum 5, 433 (2021); arXiv:1905.09749
      accessed: '2026-08-08'
      note: Peer-reviewed, open access. The reference point for most subsequent resource estimates.
    - url: https://arxiv.org/abs/2505.15917
      role: preprint
      title: How to factor 2048 bit RSA integers with less than a million noisy qubits
      publisher: arXiv
      date: '2025-05-21'
      identifier: arXiv:2505.15917
      accessed: '2026-08-08'
      note: Single-author update by Gidney (Google Quantum AI). Uses approximate residue arithmetic and yoked surface codes to cut the 2021 qubit count by ~20×. Not yet peer-reviewed as of access date.
confidence: high
status: published
priority: P1
qdayImpact: 2
qdayReasoning: Continued compression of resource estimates — from 20 million to under one million physical qubits over four years, with a further 2026 preprint (Cain et al.) claiming 10,000 reconfigurable atomic qubits — moves the engineering target closer. This does not advance Q-Day directly (hardware still lags the estimate by orders of magnitude) but it tightens the planning window for migration timelines, justifying a +2 rather than 0.
horizon: 2
novelty: order-of-magnitude qubit reduction in five years
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Cryptanalytic resource estimation answers the question: how big does a quantum computer actually need to be to break real encryption? The field-defining answer came from Gidney and Ekerå in 2021: roughly 20 million noisy physical qubits, assuming 0.1% gate error rates, could factor a 2048-bit RSA key in about 8 hours. This was already a hundred-fold reduction from earlier estimates. A 2025 preprint by Gidney alone further reduces the estimate to fewer than one million physical qubits for the same task in under a week, using approximate residue arithmetic and yoked surface codes. A 2026 preprint (Cain et al., arXiv:2603.28627) claims as few as 10,000 reconfigurable atomic qubits could suffice under different architectural assumptions. These are theoretical estimates that assume future hardware meeting specified error-rate targets; no cryptographically relevant factoring has been experimentally demonstrated.
