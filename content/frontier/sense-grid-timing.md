---
schema: frontier/v1
id: sense-grid-timing
title: Timing assurance for grid protection
summary: Holdover accurate enough that protection schemes survive loss of GNSS.
plain: Power grid protection relies on comparing measurements taken at different substations at exactly the same instant, and that timing usually comes from satellites. If the satellite signal is lost or spoofed, a local clock must hold accuracy long enough to ride it out.
pillar: quantum
constellation: sensing
readiness: emerging
evidence:
  claim: NEEDS PRIMARY SOURCE — placeholder. Replace with a specific free primary source and restate what it actually says.
  verified: '2026-08-04'
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography
      role: corroborating
links:
  - to: sense-optical-clock
    relation: depends-on
  - to: sense-inertial-navigation
    relation: depends-on
confidence: low
status: draft
added: '2026-08-04'
origin: human
---
