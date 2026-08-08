---
schema: frontier/v1
id: qec-logical-qubit-scaling
title: Logical qubit scaling
summary: Moving from a handful of logical qubits to the thousands an algorithm would need.
plain: Having a few reliable qubits is a laboratory result. Breaking encryption or simulating a molecule needs thousands, working together, for hours. The gap between what exists and what is needed is currently three or four orders of magnitude.
pillar: quantum
constellation: error-correction
readiness: experimental
evidence:
  claim: NEEDS PRIMARY SOURCE — placeholder. Replace with a specific free primary source and restate what it actually says.
  verified: '2026-08-04'
  level: E1
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography
      role: corroborating
links:
  - to: qec-modular-architecture
    relation: depends-on
  - to: crqc
    relation: enables
  - to: algo-resource-estimation
    relation: evidence-for
priority: P0
horizon: 2
qdayImpact: 2
qdayReasoning: 'The gap between demonstrated and required logical qubits is the dominant term in every estimate.'
review:
  state: reviewed
  by: human
  'on': '2026-08-07'
confidence: low
status: draft
added: '2026-08-04'
origin: human
---
