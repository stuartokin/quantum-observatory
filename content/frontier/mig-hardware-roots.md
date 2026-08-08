---
schema: frontier/v1
id: mig-hardware-roots
title: PQC in hardware roots of trust
summary: 'Post-quantum algorithms are being embedded in hardware security modules and trusted platform modules. STMicroelectronics shipped the first FIPS 140-3 certified TPM with a PQC-authenticated firmware update path in 2024.'
plain: 'Hardware roots of trust — chips like Trusted Platform Modules (TPMs) and Hardware Security Modules (HSMs) — are where computers anchor their most sensitive cryptographic operations. If a root of trust cannot run post-quantum algorithms, then even a perfectly migrated software stack sits on a quantum-vulnerable foundation. STMicroelectronics shipped the first TPM family with FIPS 140-3 certification in October 2024. The devices authenticate firmware updates using a post-quantum hash-based signature (LMS), and can receive ML-KEM and ML-DSA support via field firmware upgrades. However, as of mid-2025 no vendor has yet obtained FIPS 140-3 Level 3 validation with PQC algorithm support combined — those submissions are in process at NIST. There is a meaningful gap between shipping PQC-capable hardware and having it formally validated with PQC algorithms.'
pillar: quantum
readiness: experimental
constellation: migration
cluster: hardware-security
actors:
  - STMicroelectronics
country:
  - FR
metrics:
  - name: 'Certification level'
    value: 'FIPS 140-3 Level 1'
    unit: ''
    note: 'ST33KTPM2X family; first TPM to receive FIPS 140-3; PQC firmware update path via LMS SP800-208'
horizon: 1
novelty: 'First FIPS 140-3 certified TPM with PQC firmware authentication path'
evidence:
  claim: 'STMicroelectronics announced FIPS 140-3 certification of the ST33KTPM2X TPM family in October 2024, the first TPMs to receive this certification. The devices use LMS (SP800-208, a post-quantum hash-based signature scheme) to authenticate firmware updates, and support field firmware upgrades adding ML-KEM and ML-DSA (FIPS 203/204). The NIST CMVP security policy confirms FIPS 140-3 Level 1 module status. As of mid-2025, no vendor has obtained FIPS 140-3 Level 3 with PQC algorithm support combined; those submissions remain in process.'
  verified: '2026-08-08'
  level: E2
  sources:
    - url: 'https://newsroom.st.com/media-center/press-item.html/n4643.html'
      role: vendor
      title: 'STMicroelectronics delivers industry''s first FIPS 140-3 certified TPMs'
      publisher: STMicroelectronics
      date: '2024-10-08'
      accessed: '2026-08-08'
      note: 'Named vendor announcement; FIPS 140-3 certification confirmed by NIST CMVP. First TPM family with this certification.'
    - url: 'https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4702.pdf'
      role: standard
      title: 'FIPS 140-3 Security Policy — ST33KTPM2XSPI / ST33KTPM2XI2C'
      publisher: 'NIST CMVP'
      date: '2024-01-01'
      accessed: '2026-08-08'
      note: 'Non-proprietary NIST CMVP security policy document confirming FIPS 140-3 Level 1 module status.'
confidence: medium
status: published
links:
  - to: mig-crypto-agility
    relation: enables
  - to: pqc-fips-203
    relation: depends-on
  - to: pqc-fips-204
    relation: depends-on
origin: human
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

Hardware roots of trust are the bottom of the cryptographic stack. The first FIPS 140-3 certified TPMs now use a PQC algorithm (LMS) to authenticate firmware updates and support ML-KEM/ML-DSA via field upgrade. Full combined PQC and FIPS 140-3 Level 3 validation remains in process across all major HSM vendors.
