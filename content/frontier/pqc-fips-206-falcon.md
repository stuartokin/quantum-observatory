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
  claim: 'NIST submitted the FN-DSA (FIPS 206) draft standard for approval on August 28, 2025. Ray Perlner (NIST) presented FIPS 206 status at the Sixth PQC Standardization Conference (September 25, 2025), confirming the IPD was ''basically written, awaiting approval''; a March 2025 NIST news release had already stated the draft would be ''released shortly'' alongside the HQC selection. FIPS 206 specifies FN-DSA based on the FALCON submission: an NTRU-lattice hash-then-sign scheme producing smaller signatures and public keys than ML-DSA, at the cost of floating-point arithmetic in signing. The NIST CSRC PQC project page describes FIPS 206 as ''in development'' as of August 2026. Public review of approximately one year places the final standard in late 2026 or early 2027. No Federal Register notice for a final FIPS 206 has been published as of 2026-08-19.'
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
    - url: https://www.nist.gov/news-events/news/2025/03/nist-selects-hqc-fifth-algorithm-post-quantum-encryption
      role: corroborating
      title: NIST Selects HQC as Fifth Algorithm for Post-Quantum Encryption
      publisher: NIST
      date: '2025-03-11'
      accessed: '2026-08-19'
      note: NIST news release for HQC selection (NIST IR 8545). States that 'a draft of the fourth standard, built around the FALCON algorithm, also concerns digital signatures and will be released shortly as FIPS 206.' Establishes that as of March 2025 the IPD was described as imminent.
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
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-19'
  reviewedOn: '2026-08-24'
  note: 'FIPS 206 status confirmed via NIST CSRC, DigiCert (Sep 2025), and IETF draft-ietf-cose-falcon-04 (Mar 2026): IPD submitted Aug 28 2025, public review ~1 year, final expected late 2026 or early 2027. CSRC project page describes as ''in development'' Aug 2026. E3 correct for draft standard. Readiness experimental correct. No corrections.'
---
