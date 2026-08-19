---
schema: milestone/v1
id: asd-ism-pqc-complete-2030
title: 'ASD ISM: cease traditional asymmetric cryptography by end of 2030'
jurisdiction: AU
authority: ASD
date: '2030-12-31'
kind: deadline
what: 'Organisations should have completed their PQC transition by end of 2030, ceasing the use of traditional asymmetric cryptographic algorithms including RSA, Diffie-Hellman (DH), Elliptic Curve Diffie-Hellman (ECDH) and Elliptic Curve Digital Signature Algorithm (ECDSA). Adoption of PQC by the end of 2030 includes contingencies for disruptive technology breakthroughs and other external factors.'
plain: Australian government agencies (and others applying the ISM) must have fully replaced RSA, DH, ECDH and ECDSA with ASD-approved post-quantum algorithms by end of 2030. This is the earliest hard national completion deadline globally — five years earlier than NIST IR 8547 and the UK NCSC 2035 target.
status: upcoming
about:
  - pqc-fips-203
  - pqc-fips-204
  - pqc-fips-205
  - cnsa-2-timeline
  - crqc
  - harvest-now-decrypt-later
source:
  url: https://www.cyber.gov.au/sites/default/files/2025-09/Planning%20for%20post-quantum%20cryptography%20(September%202025).pdf
  title: 'Planning for post-quantum cryptography'
  publisher: Australian Signals Directorate (ASD / ACSC)
  date: '2025-09-01'
added: '2026-08-19'
review:
  state: agent-merged
  by: agent
  agent: scout
  note: 'Date and wording taken from the September 2025 ASD planning PDF and corroborated by the live ISM Guidelines for Cryptography page (cyber.gov.au, ISM-1917 Rev 3 and ISM-2073 Rev 0, both updated Sep-25, applicable NC/OS/P/S/TS). The ISM Guidelines page also states AES-128 and AES-192 will not be approved beyond 2030. The 2030 date applies to organisations required to comply with the ISM; the guidance encourages but does not formally bind industry. Status set upcoming — deadline is 2030-12-31.'
---

## ASD ISM: Complete PQC transition by end of 2030

The Australian Signals Directorate's Information Security Manual sets a 2030 deadline for ceasing all use of traditional asymmetric cryptography (RSA, DH, ECDH, ECDSA) in Australian government systems. The requirement is backed by ISM controls ISM-1917 (Revision 3, September 2025) and ISM-2073 (Revision 0, September 2025), both applicable across all classification levels (not classified through top secret).

**Significance:** The ASD 2030 deadline is the earliest hard national completion date found globally. NIST IR 8547 sets 2030 for deprecation and 2035 for disallowance of quantum-vulnerable algorithms for US federal systems. The UK NCSC targets 2035. ASD is five years ahead of both.

**Three milestones:** ASD structures the path as (1) refined plan by end-2026, (2) commence transition for critical systems by end-2028, (3) complete transition by end-2030. The 2030 date explicitly includes contingency for technology breakthroughs; organisations are expected to add their own internal buffers.

**Scope:** Mandatory for entities required to comply with the ISM — primarily Australian government agencies under the PSPF. Industry is encouraged to adopt the same timeline but is not formally bound by the ISM.

**Previous state of art:** No AU jurisdiction milestone was on the board before this run.
