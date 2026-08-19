---
schema: milestone/v1
id: cmvp-fips-140-2-historical-2026
title: 'FIPS 140-2 certificates move to Historical status: FIPS 140-3 required for new US procurement'
jurisdiction: US
authority: NIST CMVP
date: '2026-09-21'
kind: deadline
what: 'NIST CMVP will move all FIPS 140-2 validated cryptographic modules to Historical status on September 21, 2026. After that date, CMVP defines Historical modules as those federal agencies should not include in new procurements; only FIPS 140-3 validated modules satisfy new acquisition requirements. Existing deployments of FIPS 140-2 modules on existing systems are not retroactively invalidated.'
plain: 'From September 21, 2026, cryptographic products validated under the older FIPS 140-2 standard will no longer count for new US government procurement. Any agency or contractor buying new security products must specify FIPS 140-3 validated equivalents.'
status: upcoming
about:
  - pqc-fips-203
  - pqc-fips-204
  - pqc-fips-205
  - mig-hardware-roots
added: '2026-08-19'
source:
  url: 'https://csrc.nist.gov/projects/fips-140-3-transition-effort'
  title: 'FIPS 140-3 Transition Effort'
  publisher: 'NIST Cryptographic Module Validation Program'
  date: '2019-05-01'
review:
  state: agent-merged
  by: agent
  agent: scout
  note: 'Date September 21, 2026 from NIST CMVP transition effort page and main CMVP programme page (csrc.nist.gov/projects/cryptographic-module-validation-program). CMVP management manual PDF (March 2023) says September 22 — one-day discrepancy noted; September 21 used as the programme-level statement. Status is upcoming as of 2026-08-19.'
---

NIST's Cryptographic Module Validation Programme (CMVP) stopped accepting new FIPS 140-2 submissions in April 2022. On September 21, 2026, all remaining active FIPS 140-2 certificates move to the Historical list regardless of their individual validation dates.

**What Historical status means in practice:** CMVP's operative language says federal agencies "should not include" Historical modules in new procurements. For DoD contractors this maps directly to CMMC evidence tables; for civilian agencies it governs any acquisition referencing FIPS 140 compliance. Existing deployments are not invalidated — a system running FIPS 140-2 validated modules may continue to operate — but the certificate cannot be cited to satisfy new procurement requirements.

**Relationship to PQC migration:** FIPS 140-2 and FIPS 140-3 are module validation standards, not algorithm standards. They do not directly mandate post-quantum algorithms. However, FIPS 140-3 validated modules are the prerequisite infrastructure for deploying the PQC algorithms (FIPS 203/204/205) that federal systems must adopt under M-26-15 and EO 14412. A procurement gap in FIPS 140-3 validated products would block the PQC migration timeline.

**Minor discrepancy in primary sources:** NIST's transition effort page and main CMVP programme page both state September 21, 2026; the CMVP management manual PDF (March 2023) states September 22, 2026. One-day discrepancy within the same programme's documents; September 21 is used here as the programme-level statement.
