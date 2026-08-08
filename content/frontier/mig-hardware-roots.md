---
schema: frontier/v1
id: mig-hardware-roots
title: PQC in hardware roots of trust
summary: HSMs, secure elements and firmware signing.
plain: The chips and modules that hold the keys everything else depends on. They are the slowest layer to change because it often means new silicon, and they can have service lives of fifteen years or more. What gets installed now will still be running long after the deadline.
pillar: quantum
constellation: migration
readiness: experimental
evidence:
  claim: NEEDS PRIMARY SOURCE — placeholder. Replace with a specific free primary source and restate what it actually says.
  verified: '2026-08-04'
  level: E1
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography
      role: corroborating
links:
  - to: pqc-fips-204
    relation: depends-on
  - to: pqc-fips-205
    relation: depends-on
  - to: mig-supply-chain
    relation: depends-on
priority: P3
horizon: 2
review:
  state: reviewed
  by: human
  'on': '2026-08-07'
confidence: low
status: draft
added: '2026-08-04'
origin: human
---
