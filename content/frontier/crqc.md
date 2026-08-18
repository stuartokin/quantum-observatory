---
schema: frontier/v1
id: crqc
title: Cryptographically relevant quantum computer
summary: 'A quantum computer capable of running Shor''s algorithm against RSA-2048 or equivalent elliptic curve targets at cryptographically relevant parameters — breaking deployed public-key cryptography within a practical timeframe.'
plain: 'A cryptographically relevant quantum computer (CRQC) is one powerful enough to break the encryption that secures the internet: RSA, elliptic curve cryptography, and Diffie-Hellman key exchange. No such machine exists today. The technical requirements — currently estimated at under one million noisy physical qubits for RSA-2048 — remain far beyond any existing device, but algorithmic improvements in 2025 and 2026 have sharply reduced that estimate. Expert surveys in 2025 put a 28–49% probability on a CRQC arriving within ten years.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalysis
priority: P0
qdayImpact: 0
qdayReasoning: ''
actors:
  - IBM
  - NIST
  - University of Waterloo
  - Microsoft
country:
  - US
  - CA
horizon: 3
novelty: 'Threshold concept; no CRQC demonstrated. Resource requirements have fallen sharply in 2025.'
metrics:
  - name: Expert survey probability of CRQC within 10 years
    value: '28-49'
    unit: percent
    note: 'GRI Quantum Threat Timeline 2025, 26 expert respondents. Up from 19-34% in the 2024 survey.'
  - name: Expert survey probability of CRQC within 15 years
    value: '51-70'
    unit: percent
    note: 'GRI Quantum Threat Timeline 2025. Reflects acceleration attributed to error correction advances and algorithmic qubit-count reductions.'
links:
  - to: algo-resource-estimation
    relation: depends-on
  - to: algo-shor
    relation: depends-on
  - to: qec-logical-qubit-scaling
    relation: depends-on
evidence:
  claim: 'Scholten et al. (2024, IEEE Security & Privacy, multi-institution including IBM and NIST) review the benefits and risks of quantum computers, concluding that fault-tolerant algorithms pose the primary cryptographic threat and that quantum computers may provide economic benefits before threatening cryptography. The GRI Quantum Threat Timeline 2025 (26 expert respondents) estimates a 28–49% probability of a CRQC within 10 years and 51–70% within 15 years, accelerated from prior surveys. No CRQC has been demonstrated; the item records the threat threshold and the expert consensus on timing.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://arxiv.org/abs/2401.16317
      role: primary
      title: 'Assessing the Benefits and Risks of Quantum Computers'
      publisher: 'IEEE Security & Privacy'
      date: '2024-07-17'
      identifier: 'arXiv:2401.16317'
      doi: 10.48550/arXiv.2401.16317
      accessed: '2026-08-08'
      note: 'Scholten, Williams, Moody, Mosca, Hurley, Zeng, Troyer, Gambetta. Multi-institution (IBM, NIST, UWaterloo, Microsoft). Review paper; evidence level E3 per schema rules for reviews.'
    - url: https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2025b/
      role: corroborating
      title: 'Quantum Threat Timeline Report 2025'
      publisher: 'Global Risk Institute'
      date: '2026-04-22'
      accessed: '2026-08-08'
      note: '26 expert respondents. Annual longitudinal survey; 2025b edition. Not a technical experiment — corroborating expert consensus on timeline only.'
confidence: medium
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-18'
  note: 'GRI 2025b confirmed via globalriskinstitute.org: 28-49% CRQC within 10 years, 51-70% within 15 years, 26 respondents confirmed. Multiple independent sources corroborate these figures. E3 correct for review + expert survey. No changes.'
---

A CRQC does not exist. The item marks the threat threshold against which all migration timelines are calibrated. The primary source is a peer-reviewed review (E3 ceiling per schema), not an experimental result. Resource requirements published in 2025 and 2026 (see algo-resource-estimation and algo-shor) have materially reduced the estimated hardware needed, which is the main reason expert surveys show accelerating timelines.
