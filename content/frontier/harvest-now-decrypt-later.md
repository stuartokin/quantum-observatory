---
schema: frontier/v1
id: harvest-now-decrypt-later
title: Harvest-now, decrypt-later
summary: Interception today of traffic whose value outlives current encryption.
plain: Copying encrypted data now and storing it until a quantum computer can open it. It means the deadline is not when quantum computers arrive, but today minus however long your secrets need to stay secret. For medical records, national security or grid design, that is decades.
pillar: quantum
constellation: migration
readiness: demonstrated
evidence:
  claim: NEEDS PRIMARY SOURCE — placeholder. Replace with a specific free primary source and restate what it actually says.
  verified: '2026-08-04'
  level: E1
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography
      role: corroborating
links:
  - to: crqc
    relation: depends-on
  - to: cnsa-2-timeline
    relation: enables
  - to: pqc-fips-203
    relation: supersedes
priority: P3
horizon: 2
qdayImpact: 0
qdayReasoning: 'Changes how much the date matters, not when it falls.'
review:
  state: reviewed
  by: human
  'on': '2026-08-07'
confidence: low
status: draft
added: '2026-08-04'
origin: human
---
