---
schema: milestone/v1
id: asd-ism-pqc-cessation-2030
title: 'ASD ISM: cessation of traditional asymmetric cryptography by end 2030'
jurisdiction: AU
authority: ASD
date: '2030-12-31'
kind: deadline
what: 'The ASD Information Security Manual (December 2024, ISM-1917 Rev 1) states that RSA, DH, ECDH and ECDSA will not be approved beyond 2030. New cryptographic equipment and software must support ML-DSA-87, ML-KEM-1024, SHA-384, SHA-512 and AES-256 by no later than 2030. Applies across classification levels NC, OS, P, S, TS. ISM-2073 (Sep-25) separately requires a PQC transition plan to be developed, implemented and maintained.'
plain: 'Australian government systems must stop using RSA, DH, ECDH and ECDSA by end of 2030 under the ISM. New procurements must already support the replacement algorithms (ML-KEM, ML-DSA). Commonwealth agencies must comply; industry guidance follows the same timeline.'
status: upcoming
about:
  - pqc-fips-203
  - pqc-fips-204
  - cnsa-2-timeline
  - harvest-now-decrypt-later
source:
  url: 'https://www.cyber.gov.au/sites/default/files/2024-12/22.%20ISM%20-%20Guidelines%20for%20Cryptography%20(December%202024).pdf'
  title: 'ISM Guidelines for Cryptography (December 2024)'
  publisher: 'Australian Signals Directorate'
  date: '2024-12-01'
added: '2026-08-19'
review:
  state: agent-merged
  by: agent
  agent: scout
  note: 'ISM Guidelines for Cryptography December 2024 PDF, section on post-quantum cryptography. Controls ISM-0472 (DH), ISM-0475 (ECDSA), ISM-0476 (RSA) each state will not be approved beyond 2030. ISM-1917 Rev 1 Dec-24 requires ML-DSA-87 and ML-KEM-1024 support by 2030. Cyber.gov.au planning page confirms the three-milestone structure.'
---

The Australian Signals Directorate's Information Security Manual, updated December 2024, sets a hard end-2030 date for traditional asymmetric cryptography in Australian government systems. Controls for RSA (ISM-0476), DH (ISM-0472), ECDH, and ECDSA (ISM-0475) each carry the wording "will not be approved beyond 2030". ISM-1917 (Revision 1, December 2024) requires that new cryptographic equipment and software ensure support for ML-DSA-87, ML-KEM-1024, SHA-384, SHA-512 and AES-256 by no later than 2030.

This is the earliest national hard cessation deadline for traditional asymmetric cryptography among Five Eyes partners. The US NIST IR 8547 deprecates RSA and ECC from 2030 but does not disallow them until 2035. The ASD 2030 date is framed as a recommendation for all organisations and a compliance requirement for Commonwealth entities. ISM-2073 (September 2025) adds a standing control requiring a PQC transition plan to be developed, implemented and maintained.

Two intermediate milestones precede this date: a refined transition plan by end 2026, and commencement of transition for critical systems by end 2028.
