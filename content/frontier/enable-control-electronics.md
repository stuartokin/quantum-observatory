---
schema: frontier/v1
id: enable-control-electronics
title: Cryogenic control electronics
summary: Moving control into the cold stage so the wiring stops being the limit.
plain: Today each qubit needs its own wires running from room temperature into the refrigerator. That does not scale past a few thousand. Putting the control electronics inside the cold, where they must work without generating heat, is the way out.
pillar: quantum
constellation: enabling
readiness: experimental
evidence:
  claim: NEEDS PRIMARY SOURCE — placeholder. Replace with a specific free primary source and restate what it actually says.
  verified: '2026-08-04'
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography
      role: corroborating
links:
  - to: enable-cryogenics
    relation: depends-on
  - to: arch-superconducting
    relation: enables
  - to: qec-realtime-decoding
    relation: enables
confidence: low
status: draft
added: '2026-08-04'
origin: human
---
