---
schema: frontier/v1
id: pqc-fips-203
title: ML-KEM key encapsulation (FIPS 203)
summary: Lattice-based key encapsulation derived from CRYSTALS-Kyber. The primary replacement for RSA and ECDH key exchange.
plain: The new standard way for two computers to agree a secret key over an open connection. It replaces the maths behind almost every HTTPS connection today, which a large quantum computer would eventually be able to break. If you only migrate one thing, it is this.
pillar: quantum
constellation: pqc
readiness: adopted
actors: [NIST]
metrics:
  - name: Standard
    value: FIPS 203
  - name: Published
    value: 2024-08-13
evidence:
  claim: NIST published FIPS 203 as a finalised standard on 13 August 2024, intended as the primary standard for general encryption.
  verified: '2026-08-04'
  sources:
    - url: https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards
      role: standard
      publisher: NIST
      date: 2024-08-13
links:
  - to: pqc-hqc
    relation: competes-with
  - to: hybrid-tls-mlkem
    relation: enables
  - to: cnsa-2-timeline
    relation: enables
  - to: crqc
    relation: supersedes
confidence: high
status: published
added: '2026-08-04'
origin: human
---
