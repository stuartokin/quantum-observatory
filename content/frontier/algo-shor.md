---
schema: frontier/v1
id: algo-shor
title: Shor factoring at scale
summary: The algorithm that breaks RSA and ECC.
plain: 'The 1994 result that started all of this: a method by which a quantum computer could undo the maths protecting almost all public-key encryption. The algorithm is not in doubt — only whether a machine big and stable enough to run it can be built.'
pillar: quantum
constellation: algorithms
readiness: emerging
evidence:
  claim: NEEDS PRIMARY SOURCE — placeholder. Replace with a specific free primary source and restate what it actually says.
  verified: '2026-08-04'
  level: E1
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography
      role: corroborating
links:
  - to: crqc
    relation: enables
  - to: pqc-fips-203
    relation: supersedes
  - to: algo-resource-estimation
    relation: depends-on
priority: P3
horizon: 3
qdayImpact: 0
qdayReasoning: 'The algorithm is settled. It constrains nothing about timing on its own.'
review:
  state: reviewed
  by: human
  'on': '2026-08-07'
confidence: low
status: draft
added: '2026-08-04'
origin: human
---
