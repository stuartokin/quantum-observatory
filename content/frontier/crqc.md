---
schema: frontier/v1
id: crqc
title: Cryptographically relevant quantum computer
summary: 'A CRQC is a fault-tolerant quantum computer capable of running Shor''s algorithm at sufficient scale to break RSA-2048 or ECC in practice. None exists. Expert surveys place the probability at 19–34% within ten years.'
plain: 'A cryptographically relevant quantum computer (CRQC) is one powerful enough to break the encryption that protects internet traffic, banking, and government communications. It would need thousands of error-corrected logical qubits — each built from hundreds to thousands of physical qubits — running reliably for days. No such machine exists today. A 2024 survey of 32 global experts placed a 19–34 percent chance of one appearing within ten years, up from 17–31 percent in 2023. The 2025 Gidney resource estimate lowered the physical qubit requirement for attacking RSA-2048 by 20×, which narrows the gap between current hardware roadmaps and cryptographic threat.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalysis
actors:
  - evolutionQ
  - Global Risk Institute
  - Google Quantum AI
country:
  - CA
  - US
metrics:
  - name: expert probability of CRQC within 10 years (2024 survey)
    value: '19-34%'
    note: 'Range across 32 experts surveyed by evolutionQ / Global Risk Institute 2024; up from 17–31% in 2023.'
  - name: physical qubits estimated for RSA-2048 attack
    value: '<1000000'
    unit: physical qubits
    note: 'Gidney 2025 arXiv 2505.15917; assumes 0.1% gate error, surface code, <1 week runtime.'
priority: P0
qdayImpact: 0
qdayReasoning: 'The CRQC item represents the threat horizon itself, not a capability advance. Its presence is definitional. qdayImpact is 0 because this item does not move Q-Day — it describes it. Individual advances that update resource estimates (algo-shor, qec-below-threshold-surface-code) carry non-zero impact scores.'
horizon: 3
novelty: definitional threat threshold
links:
  - to: algo-shor
    relation: depends-on
  - to: qec-below-threshold-surface-code
    relation: depends-on
  - to: harvest-now-decrypt-later
    relation: enables
evidence:
  claim: 'The evolutionQ / Global Risk Institute Quantum Threat Timeline Report 2024, surveying 32 global experts, estimates a 19–34% probability of a CRQC within 10 years (up from 17–31% in 2023) and 5–14% within five years. Gidney 2025 (arXiv 2505.15917) provides the current best resource estimate: under one million physical qubits to factor RSA-2048 in under one week, 20× fewer than the 2019 estimate. No CRQC exists today.'
  level: E3
  verified: '2026-08-08'
  sources:
    - url: https://www.evolutionq.com/publications/quantum-threat-timeline-research-report-2024
      role: primary
      title: Quantum Threat Timeline Research Report 2024
      publisher: evolutionQ / Global Risk Institute
      date: '2024-11-01'
      accessed: '2026-08-08'
      note: 'Sixth annual edition; 32 experts surveyed. Probability of CRQC: 5–14% within 5 years, 19–34% within 10 years.'
    - url: https://arxiv.org/abs/2505.15917
      role: corroborating
      title: How to factor 2048 bit RSA integers with less than a million noisy qubits
      publisher: arXiv
      date: '2025-05-21'
      identifier: arXiv:2505.15917
      accessed: '2026-08-08'
      note: Current best physical resource estimate for a CRQC targeting RSA-2048.
confidence: high
status: published
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

A cryptographically relevant quantum computer is not a specific machine — it is a threshold. Cross it and RSA, ECC, and Diffie-Hellman break. Today's machines are many hardware generations away. The 2024 Global Risk Institute survey gives the clearest public consensus: 19–34% probability within ten years. The 2025 Gidney preprint shows the engineering bar is lower than previously thought — which is precisely why the migration standardisation work is urgent now rather than in 2035.
