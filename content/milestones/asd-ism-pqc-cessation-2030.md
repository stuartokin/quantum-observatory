---
schema: milestone/v1
id: asd-ism-pqc-cessation-2030
title: 'ASD ISM: traditional asymmetric cryptography not approved beyond end 2030'
jurisdiction: AU
authority: ASD
date: '2030-12-31'
kind: deadline
what: 'ISM control ISM-1917 (Rev 3, Sep-25) requires new cryptographic equipment and software to support ASD-approved PQC algorithms by no later than 2030. ASD guidance states that RSA, DH, ECDH and ECDSA will not be approved beyond 2030. The 2030 date includes contingency for quantum technology breakthroughs; organisations should add further contingency for internal factors.'
plain: 'Australian government systems must stop using traditional public-key cryptography (RSA, ECDH, ECDSA, Diffie-Hellman) by end 2030. This is the earliest hard national deadline among comparable Five Eyes jurisdictions — five years ahead of the equivalent NIST deadline.'
status: upcoming
about:
  - pqc-fips-203
  - pqc-fips-204
  - pqc-fips-205
  - cnsa-2-timeline
  - harvest-now-decrypt-later
source:
  url: https://www.cyber.gov.au/business-government/secure-design/quantum/planning-for-post-quantum-cryptography
  title: Planning for post-quantum cryptography
  publisher: Australian Signals Directorate (ASD) / cyber.gov.au
  date: '2025-09-22'
added: '2026-08-19'
review:
  state: agent-merged
  by: agent
  agent: scout
  note: 'Checked against cyber.gov.au Planning for PQC (Sep 2025) which states ASD recommends ceasing traditional asymmetric cryptography by end 2030. ISM-1917 Rev 3 (Sep-25) on live ISM Guidelines page prescribes PQC support by no later than 2030. December 2024 ISM Cryptography PDF confirms RSA/DH/ECDH/ECDSA descriptions updated to note not approved beyond 2030.'
---

The Australian Signals Directorate's Information Security Manual sets end of 2030 as the deadline after which RSA, Diffie-Hellman, ECDH and ECDSA are no longer approved for use in Commonwealth systems. ISM control ISM-1917 (Revision 3, September 2025) makes this prescriptive for new development and procurement. The ASD guidance document states the date already incorporates contingency for quantum technology breakthroughs.

This is the earliest national hard deadline among comparable jurisdictions. NIST IR 8547 sets 2035 for disallowing RSA and ECC — five years later. NCSC has not published an equivalent hard date. The ISM applies to Commonwealth entities across all classification levels (NC, OS, P, S, TS); industry and critical infrastructure operators are encouraged but not mandated under the same ISM controls, though the Security of Critical Infrastructure Act creates parallel expectations.

The board already records the 2026 planning milestone (asd-ism-pqc-plan-2026) and the 2028 critical-systems commencement milestone as intermediate steps toward this date.
