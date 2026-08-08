---
schema: frontier/v1
id: algo-shor
title: Shor factoring at scale
summary: 'Shor''s algorithm factors large integers exponentially faster than classical methods, threatening RSA and ECC. No quantum computer has run it at cryptographically relevant scale; the best resource estimate now places that bar below one million physical qubits.'
plain: 'Peter Shor''s 1994 algorithm finds the prime factors of a large number exponentially faster than any known classical method. Breaking RSA-2048 — the encryption used across the internet — would require running it on a very large, very reliable quantum computer. The best current estimate (Gidney, 2025) puts that at under one million physical qubits running for less than a week, which is 20 times fewer qubits than the 2019 estimate. Real quantum computers have so far only factored integers up to 35 without mathematical shortcuts.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalysis
actors:
  - Google Quantum AI
country:
  - US
metrics:
  - name: 'largest integer factored on real hardware (no shortcuts)'
    value: '35'
    note: Integers 15, 21 and 35 factored on real devices; beyond 35 poses substantial experimental challenges.
  - name: estimated physical qubits for RSA-2048 (Gidney 2025)
    value: '<1000000'
    unit: physical qubits
    note: 'Assumes 0.1% gate error rate, surface code, 1 µs cycle time; runtime under one week.'
priority: P0
qdayImpact: 2
qdayReasoning: 'The 2025 Gidney resource estimate reduces the physical qubit threshold for breaking RSA-2048 by 20× relative to 2019. This does not advance hardware timelines directly, but lowers the engineering bar and narrows the gap between roadmap machines and cryptographic relevance. The Global Risk Institute 2024 survey already reflects this acceleration: probability of CRQC within 10 years rose from 17–31% (2023) to 19–34% (2024). Scored +2 rather than +3 because no hardware milestone accompanied the algorithmic improvement.'
horizon: 3
novelty: major reduction in resource estimate
links:
  - to: crqc
    relation: evidence-for
  - to: algo-resource-estimation
    relation: enables
  - to: qec-below-threshold-surface-code
    relation: depends-on
evidence:
  claim: 'Gidney (2025, arXiv 2505.15917) estimates that a 2048-bit RSA integer can be factored in less than a week by a quantum computer with fewer than one million noisy physical qubits — a 20× reduction from the 2019 Gidney–Ekerå estimate of 20 million qubits. Real hardware demonstrations have factored integers only up to 35 without mathematical shortcuts; integers beyond 35 pose substantial experimental challenges.'
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
      note: 'Craig Gidney, Google Quantum AI. Reduces Toffoli count by >100× vs Chevignard 2024; same physical assumptions as GE 2019.'
    - url: https://www.mdpi.com/2227-7390/11/19/4222
      role: corroborating
      title: Large-Scale Simulation of Shor''s Quantum Factoring Algorithm
      publisher: Mathematics (MDPI)
      date: '2023-10-09'
      identifier: 'Mathematics 11(19), 4222'
      doi: 10.3390/math11194222
      accessed: '2026-08-08'
      note: Confirms hardware demonstrations reach 35; beyond 35 poses substantial experimental challenges.
confidence: high
status: published
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Shor's algorithm is the quantum threat that drives the entire post-quantum cryptography migration. It factors large integers exponentially faster than classical computers, which would break RSA and elliptic-curve cryptography if run at scale. Real hardware has only managed numbers up to 35 without mathematical shortcuts. The 2025 Gidney preprint is the most current authoritative resource estimate: under one million physical qubits, under one week — 20 times fewer qubits than the 2019 estimate, achieved through approximate modular arithmetic and denser qubit storage. The hardware to run this does not yet exist.
