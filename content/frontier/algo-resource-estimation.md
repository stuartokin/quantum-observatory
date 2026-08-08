---
schema: frontier/v1
id: algo-resource-estimation
title: Cryptanalytic resource estimation
summary: Quantitative analysis of the physical resources — qubit count, gate count, runtime — a fault-tolerant quantum computer would need to break cryptosystems such as RSA-2048 or elliptic-curve cryptography.
plain: |
  To know how worried to be about quantum computers breaking encryption, you need to know how big such a machine would actually have to be. Cryptanalytic resource estimation does that calculation: taking the best-known quantum factoring algorithms, pairing them with realistic error-correction assumptions, and working out exactly how many physical qubits and how much time would be required. The answer has been falling steeply — from billions of qubits in 2012 to under a million in 2025.
pillar: quantum
readiness: experimental
constellation: algorithms
actors:
  - Google Quantum AI
country:
  - US
horizon: 2
priority: P0
metrics:
  - name: Physical qubits to factor RSA-2048
    value: "<1000000"
    unit: noisy physical qubits
    note: Gidney 2025 estimate; assumes 0.1% gate error rate, 1 µs surface code cycle
  - name: Estimated runtime
    value: "<7"
    unit: days
    note: Gidney 2025; trades qubit count for longer runtime vs 2021 estimate
evidence:
  claim: >-
    Gidney (2025) estimates that a 2048-bit RSA integer could be factored in less than one week by a quantum computer with fewer than one million noisy physical qubits, assuming a 0.1% gate error rate and a 1 µs surface code cycle — a 20× reduction in qubit count from the 2021 Gidney-Ekerå estimate of 20 million qubits.
  level: E3
  verified: '2026-08-08'
  sources:
    - url: https://arxiv.org/abs/2505.15917
      role: preprint
      title: How to factor 2048 bit RSA integers with less than a million noisy qubits
      publisher: arXiv
      date: '2025-05-21'
      identifier: arXiv:2505.15917
      accessed: '2026-08-08'
      note: Craig Gidney, Google Quantum AI. Preprint; substantially updates the Gidney-Ekerå 2021 Quantum journal result.
links:
  - to: algo-shor
    relation: evidence-for
  - to: crqc
    relation: evidence-for
  - to: pqc-fips-203
    relation: enables
qdayImpact: 2
qdayReasoning: >-
  A 20× reduction in the estimated qubit requirement for RSA-2048 factoring meaningfully compresses the gap between current hardware and cryptographically relevant capability. It does not change the hardware that exists today, but it tightens the resource threshold that hardware must cross. If algorithmic improvements continue at this pace, Q-Day forecasts will need to be revised earlier. Scored +2 rather than +3 because the estimate is a preprint theoretical result, not a hardware demonstration.
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Resource estimation for cryptanalysis is not a hardware result — it is theoretical work that tells the field what the hardware target actually is. The most recent and significant estimate is Gidney 2025 (arXiv:2505.15917), which reduces the qubit count for factoring RSA-2048 by 20× compared to the widely-cited 2021 Gidney-Ekerå result. The reduction comes from improved algorithmic techniques rather than better hardware, illustrating that the cryptographic threat from quantum computing depends on both hardware progress and algorithmic progress. Readiness stays at experimental: there are no hardware demonstrations of Shor's algorithm at cryptographically relevant scales; this item captures the state of the theoretical resource estimates.
