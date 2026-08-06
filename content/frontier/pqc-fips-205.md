---
schema: frontier/v1
id: pqc-fips-205
title: SLH-DSA hash-based signatures (FIPS 205)
summary: Stateless hash-based signatures from SPHINCS+. Conservative fallback resting only on hash properties, in case lattice assumptions fail.
pillar: quantum
constellation: pqc
readiness: adopted
cluster: pqc-standards
evidence:
  claim: NIST published FIPS 205 on 13 August 2024, based on a different mathematical approach to ML-DSA and intended as a backup method.
  verified: '2026-08-04'
  sources:
    - url: https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards
      role: standard
confidence: high
status: published
added: '2026-08-04'
origin: human
---
