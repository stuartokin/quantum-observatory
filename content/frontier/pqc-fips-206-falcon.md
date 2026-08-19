---
schema: frontier/v1
id: pqc-fips-206-falcon
title: FN-DSA / Falcon signatures (FIPS 206)
summary: NTRU lattice signatures with the smallest combined key and signature footprint. Selected but the standard is still in development.
plain: A third signature scheme, chosen because its signatures are small. That matters where every byte counts — chip firmware, constrained devices, certificates sent millions of times a second. The standard has not been finished yet, so you cannot build against it today.
pillar: quantum
constellation: pqc
readiness: experimental
actors: [NIST]
metrics:
  - name: Standard
    value: 'FIPS 206'
    note: in development
evidence:
  claim: 'NIST submitted the FN-DSA (FIPS 206) draft standard for approval on August 28, 2025. Ray Perlner (NIST) presented FIPS 206 status at the Sixth PQC Standardization Conference on September 25, 2025, confirming the IPD was written and awaiting publication. The NIST CSRC PQC project page describes FIPS 206 as ''in development'' as of August 2026. FIPS 206 specifies FN-DSA based on the FALCON submission: an NTRU-lattice hash-then-sign signature scheme producing smaller signatures and public keys than ML-DSA, at the cost of floating-point arithmetic in key generation and signing. Public review of approximately one year places the final standard in late 2026 or early 2027. No Federal Register notice for a final FIPS 206 has been published as of 2026-08-19.'
  level: E3
  verified: '2026-08-19'
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography/post-quantum-cryptography-standardization
      role: standard
      title: Post-Quantum Cryptography Standardization — NIST CSRC project page
      publisher: NIST
      date: '2024-08-13'
      note: NIST CSRC project page. As of August 2026 describes FIPS 206 (FN-DSA/FALCON) as 'in development'. Confirms HQC selected for standardisation March 11, 2025 (NIST IR 8545). Date given is FIPS 203/204/205 publication date — the project page is continuously updated and carries no single publication date.
    - url: https://csrc.nist.gov/presentations/2025/fips-206-fn-dsa-falcon
      role: corroborating
      title: 'FIPS 206: FN-DSA (Falcon) — Sixth PQC Standardization Conference presentation'
      publisher: NIST CSRC
      date: '2025-09-25'
      note: Presentation by Ray Perlner (NIST) at the Sixth PQC Standardization Conference, September 24-26 2025, Gaithersburg MD. States IPD is 'basically written, awaiting approval'. Previews FN-DSA/FALCON review and planned changes from FALCON as submitted. Confirms floating-point arithmetic challenge for implementation.
links:
  - to: pqc-fips-204
    relation: competes-with
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
  note: 'Focus run 2026-08-19. FIPS 206 IPD submitted August 28, 2025 (DigiCert blog citing NIST, September 2025; confirmed by NIST 6th PQC Conference presentation). NIST CSRC project page still says ''in development'' as of August 2026 — no IPD URL found at csrc.nist.gov/pubs/fips/206/ipd. Conference presentation (Perlner, Sep 25 2025) added as corroborating source. No Federal Register notice for FIPS 206 found — flagged for Verifier. Final standard expected late 2026 or early 2027. E3 correct: project page of forthcoming standard. Readiness experimental correct.'
---
