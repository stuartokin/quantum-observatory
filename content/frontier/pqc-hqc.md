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
  claim: NIST selected HQC for standardisation on 11 March 2025, as reported in NIST IR 8545 (Status Report on the Fourth Round of the NIST Post-Quantum Cryptography Standardisation Process). NIST will draft a standard based on HQC and release it for public comment; the final version is expected approximately two years after selection. HQC is not yet a published FIPS standard.
  verified: '2026-08-10'
  level: E4
  sources:
    - url: https://csrc.nist.gov/pubs/ir/8545/final
      role: standard
      title: 'Status Report on the Fourth Round of the NIST Post-Quantum Cryptography Standardization Process'
      publisher: NIST
      date: '2025-03-11'
      identifier: 'NIST IR 8545'
      doi: 10.6028/NIST.IR.8545
      accessed: '2026-08-10'
      note: 'Formally published NIST Interagency/Internal Report. Announces HQC selection; explains why HQC was chosen over BIKE and why Classic McEliece was not selected. Authoritative source for the selection fact. Draft FIPS standard for HQC expected c.2027.'
links:
  - to: pqc-fips-203
    relation: competes-with
moved:
  from: demonstrated
  on: '2026-08-09'
priority: P1
horizon: 2
country: [US]
confidence: high
status: published
added: '2026-08-04'
origin: human
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-04'
  reviewedOn: '2026-08-10'
  note: 'Source updated: replaced NIST CSRC project page with NIST IR 8545 (https://csrc.nist.gov/pubs/ir/8545/final), the formally published report that announced the selection. DOI 10.6028/NIST.IR.8545 added. NIST IR 8545 is a formally published NIST Interagency Report — the authoritative document for the selection fact; E4 is defensible for this claim (it is the published official report, not a draft). Readiness and level unchanged; prior reviewer correctly set readiness to experimental (HQC selected but FIPS not published).'
---
