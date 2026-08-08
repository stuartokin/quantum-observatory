---
schema: frontier/v1
id: qec-error-correction-threshold
title: Error correction threshold
summary: The noise level below which adding qubits helps rather than hurts.
plain: Every error-correcting scheme has a break-even noise level. Above it, adding more qubits adds more errors than it removes and the whole idea fails. Below it, the machine gets better the bigger you build it. Crossing this line is the single most important milestone in the field.
pillar: quantum
constellation: error-correction
readiness: demonstrated
evidence:
  claim: NEEDS PRIMARY SOURCE — placeholder. Replace with a specific free primary source and restate what it actually says.
  verified: '2026-08-04'
  level: E1
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography
      role: corroborating
links:
  - to: qec-below-threshold-surface-code
    relation: evidence-for
  - to: qec-surface-code
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
