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
    value: 'FIPS 204'
  - name: Published
    value: '2024-08-13'
evidence:
  claim: NIST published FIPS 204 on 13 August 2024 as the primary standard for protecting digital signatures.
  verified: '2026-08-04'
  level: E4
  sources:
    - url: https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards
      role: standard
      publisher: NIST
      date: '2024-08-13'
links:
  - to: pqc-fips-205
    relation: competes-with
  - to: pqc-fips-206-falcon
    relation: competes-with
  - to: mig-hardware-roots
    relation: enables
priority: P1
horizon: 1
qdayImpact: 0
qdayReasoning: 'A defence, not a capability.'
country: [US]
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-04'
  reviewedOn: '2026-08-11'
  note: 'NIST news release confirmed FIPS 204 published 2024-08-13. Federal Register (2024-08-14) confirms simultaneous publication of FIPS 203, 204, and 205. E4 correct for formally published FIPS standard. Human review 2026-08-07 noted; no corrections required.'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
