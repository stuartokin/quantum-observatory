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
  claim: 'NIST selected HQC for standardisation on 11 March 2025, as reported in NIST IR 8545. HQC is a code-based KEM whose security rests on the quasi-cyclic moderate-density parity-check (QC-MDPC) decoding problem — a different mathematical foundation from ML-KEM''s module-lattice problem. NIST selected it specifically as a portfolio hedge: if a structural attack against lattice-based key encapsulation is discovered, organisations need a code-based alternative unaffected by the same weakness. The NIST March 2025 news release states NIST ''plans to release a draft standard built around HQC for public comment in about a year'' and will ''finalize the standard for release in 2027'' following a 90-day comment period. HQC is not a general-use recommendation alongside ML-KEM; it is an explicit diversity hedge. HQC is not yet a published FIPS standard as of 2026-08-19.'
  level: E4
  verified: '2026-08-19'
  sources:
    - url: https://csrc.nist.gov/pubs/ir/8545/final
      role: standard
      title: Status Report on the Fourth Round of the NIST Post-Quantum Cryptography Standardization Process
      publisher: NIST
      date: '2025-03-11'
      identifier: NIST IR 8545
      doi: 10.6028/NIST.IR.8545
      accessed: '2026-08-19'
      note: Formally published NIST IR. Selects HQC; explains rationale (code-based, different hardness from ML-KEM lattices). States draft standard will be published for public comment in approximately 2026 with final in 2027.
    - url: https://www.nist.gov/news-events/news/2025/03/nist-selects-hqc-fifth-algorithm-post-quantum-encryption
      role: corroborating
      title: NIST Selects HQC as Fifth Algorithm for Post-Quantum Encryption
      publisher: NIST
      date: '2025-03-11'
      accessed: '2026-08-19'
      note: NIST news release. States NIST 'plans to release a draft standard built around HQC for public comment in about a year' and will 'finalize the standard for release in 2027' following a 90-day comment period. Primary authoritative timeline statement.
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
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-19'
  note: 'Focus run 2026-08-19. Added NIST March 2025 news release as corroborating source — it is the authoritative statement of HQC timeline: draft ''in about a year'' (from March 2025), final 2027 after 90-day comment period. Claim updated to make hedge-against-lattice-break rationale explicit and to cite the precise NIST timeline. E4 held on NIST IR 8545 (formally published). Readiness experimental correct: selected but FIPS not published.'
---
