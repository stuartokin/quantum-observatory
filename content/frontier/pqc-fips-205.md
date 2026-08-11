---
schema: frontier/v1
id: pqc-fips-205
title: SLH-DSA hash-based signatures (FIPS 205)
summary: Stateless hash-based signatures from SPHINCS+. Conservative fallback resting only on hash properties, in case lattice assumptions fail.
plain: A backup way of signing things. It is slower and produces much bigger signatures than the main choice, but its security rests only on ordinary hash functions — the best-understood building block in cryptography. If the newer lattice maths turns out to have a flaw, this one should still stand. Insurance, not the everyday option.
pillar: quantum
constellation: pqc
readiness: adopted
actors: [NIST]
metrics:
  - name: Standard
    value: 'FIPS 205'
  - name: Published
    value: '2024-08-13'
  - name: Basis
    value: 'hash functions'
    note: no lattice assumption
evidence:
  claim: NIST published FIPS 205 on 13 August 2024, based on a different mathematical approach to ML-DSA and intended as a backup method.
  verified: '2026-08-04'
  level: E4
  sources:
    - url: https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards
      role: standard
      publisher: NIST
      date: '2024-08-13'
links:
  - to: pqc-fips-204
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
  note: 'NIST news release confirmed FIPS 205 published 2024-08-13. Federal Register (2024-08-14) confirms simultaneous publication with FIPS 203 and 204. E4 correct for formally published FIPS standard. Human review 2026-08-07 noted; no corrections required.'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
