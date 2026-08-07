---
schema: frontier/v1
id: pqc-fips-204
title: ML-DSA digital signatures (FIPS 204)
summary: Lattice-based signature scheme derived from CRYSTALS-Dilithium. The primary post-quantum replacement for ECDSA and RSA signatures.
plain: The new standard way to prove a message or a piece of software really came from who it claims. Signatures are what make software updates, certificates and code signing trustworthy, so this has to change before quantum computers can forge them.
pillar: quantum
constellation: pqc
readiness: adopted
actors: [NIST]
metrics:
  - name: Standard
    value: FIPS 204
  - name: Published
    value: 2024-08-13
evidence:
  claim: NIST published FIPS 204 on 13 August 2024 as the primary standard for protecting digital signatures.
  verified: '2026-08-04'
  sources:
    - url: https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards
      role: standard
      publisher: NIST
      date: 2024-08-13
links:
  - to: pqc-fips-205
    relation: competes-with
  - to: pqc-fips-206-falcon
    relation: competes-with
  - to: mig-hardware-roots
    relation: enables
confidence: high
status: published
added: '2026-08-04'
origin: human
---
