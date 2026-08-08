---
schema: frontier/v1
id: crqc
title: Cryptographically relevant quantum computer
summary: 'A CRQC is a fault-tolerant quantum computer able to run Shor''s algorithm on RSA-2048 or P-256 within 24 hours. None exists; expert surveys place the median emergence date in the 2030s.'
plain: 'A cryptographically relevant quantum computer (CRQC) is one powerful enough to break the encryption that secures most internet traffic, banking, and government communications — specifically by running Shor''s algorithm on the key sizes actually used in practice. No CRQC exists today. The best machines in 2026 can run Shor''s algorithm on numbers with a handful of digits, not the 617-digit numbers in RSA-2048. Expert surveys in 2024 put the probability of a CRQC emerging within 10 years at 19–34%, rising to around 50% within 15 years. Recent algorithmic improvements have compressed the estimated physical qubit requirement from 20 million (2021) to under one million (2025), meaning the engineering gap is narrowing — but substantial hurdles in error correction, qubit fabrication, and control remain.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalytic-threat
country:
  - international
metrics:
  - name: expert probability of CRQC within 10 years
    value: '19-34%'
    unit: probability
    note: GRI Quantum Threat Timeline 2024, 32 experts; up from 17-31% in 2023
  - name: expert probability of CRQC within 5 years
    value: '5-14%'
    unit: probability
    note: GRI Quantum Threat Timeline 2024
  - name: physical qubits required (superconducting, RSA-2048)
    value: '<1000000'
    unit: physical qubits
    note: Gidney 2025; reduced from 20M in Gidney+Ekerå 2021
priority: P0
qdayImpact: 1
qdayReasoning: 'The CRQC item is a framing concept rather than a result, so its qdayImpact is scored on whether it documents acceleration or deceleration of threat timelines. The 2024 GRI survey shows expert probability of a 10-year CRQC at 19–34%, up from 17–31% in 2023 — a modest upward revision. More material is the algorithmic compression documented in Gidney 2025 (RSA-2048 resource estimate falls 20x). Together these justify +1: the evidence base is moving toward closer timelines, but uncertainties are large enough that the board should not overweight any single estimate. A CRQC also requires simultaneous maturation of nine engineering capabilities; qubit count alone is not the gating factor.'
horizon: 3
novelty: 'Expert probability estimates rising year-on-year; algorithmic estimates compressing hardware requirements'
links:
  - to: algo-shor
    relation: depends-on
  - to: qec-logical-qubit-scaling
    relation: depends-on
  - to: algo-resource-estimation
    relation: depends-on
evidence:
  claim: 'The Global Risk Institute Quantum Threat Timeline 2024 (32 global experts) estimates a 19–34% probability of a CRQC within 10 years and 5–14% within 5 years, both up from 2023. A CRQC is defined as a machine able to break RSA-2048 encryption within 24 hours. No CRQC exists; current hardware reaches only dozens of logical qubits. Gidney (2025) provides the current best resource estimate: fewer than one million noisy superconducting qubits required, down from 20 million in 2021.'
  level: E3
  verified: '2026-08-08'
  sources:
    - url: https://globalriskinstitute.org/publication/2024-quantum-threat-timeline-report/
      role: primary
      title: Quantum Threat Timeline Report 2024
      publisher: 'Global Risk Institute / evolutionQ'
      date: '2024-12-01'
      accessed: '2026-08-08'
      note: '32-expert survey, sixth annual edition. Probability estimates for CRQC emergence at 5, 10, 15, and 20-year horizons.'
    - url: https://arxiv.org/abs/2505.15917
      role: corroborating
      title: 'How to factor 2048 bit RSA integers with less than a million noisy qubits'
      publisher: arXiv
      date: '2025-05-21'
      identifier: 'arXiv:2505.15917'
      accessed: '2026-08-08'
      note: 'Gidney (Google). Current best resource estimate for RSA-2048 on superconducting hardware.'
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

A cryptographically relevant quantum computer is not a single device but a capability threshold: enough fault-tolerant qubits, running long enough, to execute Shor's algorithm on key sizes used in real cryptography. The threshold has not been reached. Expert surveys conducted annually by the Global Risk Institute track how that assessment changes; in 2024, 32 experts placed the 10-year probability at 19–34%, up from 17–31% a year earlier. The faster-moving signal is in resource estimation: the physical qubit count needed to factor RSA-2048 has fallen from 20 million (2021) to under one million (2025) on comparable hardware assumptions, driven by algorithmic improvements rather than hardware breakthroughs. The gap between today's largest fault-tolerant processors (dozens of logical qubits) and a CRQC (thousands) remains large.
