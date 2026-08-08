---
schema: frontier/v1
id: pqc-fips-206-falcon
title: FN-DSA / Falcon signatures (FIPS 206)
summary: NTRU lattice signatures with the smallest combined key and signature footprint. Selected but the standard is still in development.
plain: A third signature scheme, chosen because its signatures are small. That matters where every byte counts — chip firmware, constrained devices, certificates sent millions of times a second. The standard has not been finished yet, so you cannot build against it today.
pillar: quantum
constellation: pqc
readiness: demonstrated
actors: [NIST]
metrics:
  - name: Standard
    value: 'FIPS 206'
    note: in development
evidence:
  claim: NIST states FALCON was selected and will be published in FIPS 206, which is in development.
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
  state: reviewed
  by: human
  'on': '2026-08-07'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
