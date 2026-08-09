---
schema: frontier/v1
id: pqc-fips-206-falcon
title: FN-DSA / Falcon signatures (FIPS 206)
summary: NTRU lattice signatures with the smallest combined key and signature footprint. Selected but the standard is still in development.
plain: A third signature scheme, chosen because its signatures are small. That matters where every byte counts — chip firmware, constrained devices, certificates sent millions of times a second. The standard has not been finished yet, so you cannot build against it today.
pillar: quantum
constellation: pqc
readiness: experimental
actors: [NIST]
metrics:
  - name: Standard
    value: 'FIPS 206'
    note: in development
evidence:
  claim: NIST states FALCON was selected and will be published in FIPS 206, which is in development. An Initial Public Draft was submitted August 2025; the final standard is expected in late 2026 or early 2027.
  verified: '2026-08-04'
  level: E4
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography/post-quantum-cryptography-standardization
      role: standard
      publisher: NIST
links:
  - to: pqc-fips-204
    relation: competes-with
priority: P1
horizon: 2
country: [US]
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-09'
  note: 'readiness demonstrated → experimental: FIPS 206 IPD submitted August 2025; final standard expected late 2026 or early 2027 — not yet formally published. Demonstrated requires a published standard; experimental is correct. Evidence claim updated to reflect IPD status.'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
