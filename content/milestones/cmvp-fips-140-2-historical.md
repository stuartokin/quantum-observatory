---
schema: milestone/v1
id: cmvp-fips-140-2-historical
title: 'FIPS 140-2 certificates move to CMVP Historical status: new procurements must specify FIPS 140-3'
jurisdiction: US
authority: NIST CMVP
date: '2026-09-21'
kind: deadline
what: 'NIST CMVP will move all remaining active FIPS 140-2 validated cryptographic module certificates to Historical status on September 21, 2026. Per the NIST FIPS 140-3 transition page: "FIPS 140-2 modules can remain active for 5 years after validation or until September 21, 2026, when the FIPS 140-2 validations will be moved to the historical list. Even on the historical list, CMVP supports the purchase and use of these modules for existing systems." New procurements should require FIPS 140-3 validated modules.'
plain: 'From 21 September 2026, every cryptographic module validated only under FIPS 140-2 is listed as Historical by NIST. Federal agencies and their suppliers should not cite these certificates in new procurements; only FIPS 140-3 validated modules qualify. Existing deployments may continue, but new contracts must specify 140-3 validation.'
status: upcoming
about:
  - mig-hardware-roots
  - mig-discovery
  - pqc-fips-203
  - pqc-fips-204
  - pqc-fips-205
source:
  url: 'https://csrc.nist.gov/projects/fips-140-3-transition-effort'
  title: 'FIPS 140-3 Transition Effort'
  publisher: 'NIST CMVP'
  date: '2026-04-13'
added: '2026-08-19'
review:
  state: agent-merged
  by: agent
  on: '2026-08-19'
  agent: scout
  note: 'Primary source is csrc.nist.gov/projects/fips-140-3-transition-effort (NIST CMVP programme page, accessed 2026-08-19). September 21 2026 date and the Historical-list language quoted directly from that page. Source date from search result metadata (April 2026); the underlying date was set in the FIPS 140-3 Federal Register notice (May 1 2019) and the five-year sunset window published with CMVP transition guidance.'
---

The NIST Cryptographic Module Validation Program has operated the FIPS 140-2 sunset on a published schedule since 2019. FIPS 140-3 was approved March 22 2019 and became effective September 22 2019. CMVP began accepting FIPS 140-3 validation submissions in September 2020 and stopped accepting new FIPS 140-2 submissions in September 2021. The five-year maximum validity window for existing FIPS 140-2 certificates ends on September 21 2026, when all remaining active certificates move to the Historical list.

**What Historical status means.** A Historical certificate remains a public record but is no longer listed as actively validated for new procurement. CMVP guidance states that federal agencies should not include Historical-status modules in new acquisitions. Existing systems may continue to operate; the restriction applies to new contracts, renewals, and audit evidence chains. Defence contractors face a compressed sequence: CMMC Level 2 enforcement begins November 10 2026, seven weeks after this transition, and CMMC assessors will scrutinise any FIPS 140-2 certificate cited as compliance evidence for control 3.13.11.

**Relationship to PQC migration.** FIPS 140-3 and the post-quantum migration are separate requirements. FIPS 140-3 updates the validation framework for cryptographic modules (mandatory side-channel resistance, ISO/IEC 19790 alignment, runtime self-tests) but does not mandate post-quantum algorithms. The connection is practical: any module implementing FIPS 203/204/205 post-quantum algorithms and procured after September 21 2026 must hold a FIPS 140-3 certificate to be used in federal procurement. Agencies deploying PQC algorithms need to confirm their chosen implementations carry 140-3 certificates, not merely algorithmic NIST approval.

**Status note.** This deadline falls 33 days from the date of this record. Status is set to upcoming. A reviewer should confirm met — or investigate missed — after September 21 2026 by checking the NIST CMVP module database at csrc.nist.gov/projects/cryptographic-module-validation-program.
