---
schema: frontier/v1
id: sense-inertial-navigation
title: Quantum inertial navigation
summary: Position held without GNSS, using cold-atom accelerometers.
plain: Knowing where you are by measuring every acceleration and rotation since you started, accurately enough that the errors stay small over hours. It matters because satellite navigation can be jammed or spoofed, and a great deal of infrastructure quietly depends on it.
pillar: quantum
constellation: sensing
readiness: experimental
evidence:
  claim: NEEDS PRIMARY SOURCE — placeholder. Replace with a specific free primary source and restate what it actually says.
  verified: '2026-08-04'
  level: E1
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography
      role: corroborating
links:
  - to: sense-optical-clock
    relation: depends-on
  - to: sense-gravimetry
    relation: depends-on
  - to: sense-grid-timing
    relation: enables
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
