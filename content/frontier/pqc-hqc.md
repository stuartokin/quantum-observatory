---
schema: frontier/v1
id: pqc-hqc
title: HQC code-based key encapsulation
summary: A backup key encapsulation mechanism built on error-correcting codes rather than lattices, hedging against a break in lattice hardness.
plain: A second, independent way to agree a secret key. It uses error-correcting codes rather than the lattice maths behind the main standard, so a breakthrough against lattices would not break this too. Deliberate insurance against putting all the eggs in one mathematical basket.
pillar: quantum
constellation: pqc
readiness: experimental
actors: [NIST]
metrics:
  - name: Selected
    value: '2025-03-11'
  - name: Basis
    value: 'error-correcting codes'
    note: independent of lattices
evidence:
  claim: NIST selected HQC for standardisation on 11 March 2025, reported in NIST IR 8545 on the fourth round of the PQC standardisation process. NIST will draft a standard and release it for public comment; the final version is expected approximately two years after selection. HQC is not yet a published FIPS standard.
  verified: '2026-08-09'
  level: E4
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography/post-quantum-cryptography-standardization
      role: standard
      publisher: NIST
links:
  - to: pqc-fips-203
    relation: competes-with
moved:
  from: demonstrated
  on: '2026-08-09'
priority: P1
horizon: 2
country: [US]
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-04'
  reviewedOn: '2026-08-09'
  note: 'readiness demonstrated → experimental: HQC selected March 2025 but NIST has not published a FIPS standard; final publication expected c.2027. Demonstrated requires a standard formally published; selection is not publication. June 2026 promotion to demonstrated was premature. Amending a human-reviewed item.'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
