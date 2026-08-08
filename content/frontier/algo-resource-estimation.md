---
schema: frontier/v1
id: algo-resource-estimation
title: Cryptanalytic resource estimation
summary: How many logical qubits and how long to break RSA-2048.
plain: Calculating the machine you would actually need to break a given key — how many reliable qubits, for how many hours. These estimates have fallen substantially over time as the methods improve, and they are what turn a physics question into a migration deadline.
pillar: quantum
constellation: algorithms
readiness: experimental
evidence:
  claim: NEEDS PRIMARY SOURCE — placeholder. Replace with a specific free primary source and restate what it actually says.
  verified: '2026-08-04'
  level: E1
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography
      role: corroborating
links:
  - to: algo-shor
    relation: depends-on
  - to: crqc
    relation: evidence-for
  - to: cnsa-2-timeline
    relation: enables
priority: P0
horizon: 2
qdayImpact: 2
qdayReasoning: 'Resource estimates are the direct input to any Q-Day date. Falling estimates move the forecast without any hardware changing.'
review:
  state: reviewed
  by: human
  'on': '2026-08-07'
confidence: low
status: draft
added: '2026-08-04'
origin: human
---
