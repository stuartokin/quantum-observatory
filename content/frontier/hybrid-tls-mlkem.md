---
schema: frontier/v1
id: hybrid-tls-mlkem
title: Hybrid TLS key exchange (X25519 + ML-KEM)
summary: Classical and post-quantum key agreement combined, so a break in either alone is survivable.
plain: Doing the key exchange twice, the old way and the new way, and combining both results. If the new post-quantum maths turns out to be flawed, the old protection still holds; if a quantum computer arrives, the new one does. Belt and braces, and already switched on for a large share of web traffic.
pillar: quantum
constellation: migration
readiness: adopted
evidence:
  claim: NEEDS PRIMARY SOURCE — placeholder. Replace with a specific free primary source and restate what it actually says.
  verified: '2026-08-04'
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography
      role: corroborating
links:
  - to: pqc-fips-203
    relation: depends-on
  - to: mig-crypto-agility
    relation: enables
confidence: low
status: draft
added: '2026-08-04'
origin: human
---
