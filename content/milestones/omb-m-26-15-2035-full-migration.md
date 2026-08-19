---
schema: milestone/v1
id: omb-m-26-15-2035-full-migration
title: 'OMB M-26-15 Phase 5: full migration of remaining federal civilian systems by 2035'
jurisdiction: US
authority: OMB
date: '2035-12-31'
kind: deadline
what: 'OMB Memorandum M-26-15, "Execution of the Migration to Post-Quantum Cryptography" (June 24, 2026), Phase 5 requires completion of migration of remaining federal civilian information systems to post-quantum cryptography by 2035, based on risk assessment and availability of commercial offerings. Phases 1-4 address strategy and discovery (2026-2027), pilots and early migration (2027-2028), key-establishment migration for high-value assets and high-impact systems (2028-2030), and digital-signature migration for those same categories (2031).'
plain: 'All US federal civilian agencies must complete migration of remaining IT systems to quantum-resistant cryptography by 2035. This is the capstone of a five-phase plan set by OMB M-26-15; high-priority systems face earlier 2030 and 2031 deadlines under EO 14412. The 2035 date is in a memorandum, not a statute, and could be revised by a subsequent administration.'
status: upcoming
about:
  - harvest-now-decrypt-later
  - crypto-bill-of-materials
  - mig-hardware-roots
  - pqc-fips-203
  - pqc-fips-204
  - pqc-fips-205
source:
  url: 'https://www.whitehouse.gov/wp-content/uploads/2026/06/M-26-15-Execution-of-the-Migration-to-Post-Quantum-Cryptography.pdf'
  title: 'Execution of the Migration to Post-Quantum Cryptography'
  publisher: 'Office of Management and Budget'
  date: '2026-06-24'
added: '2026-08-19'
review:
  state: agent-merged
  by: agent
  on: '2026-08-19'
  agent: scout
  note: 'Primary document is the M-26-15 PDF on whitehouse.gov, confirmed via the OMB memoranda index (whitehouse.gov/omb/information-resources/guidance/memoranda/) which lists it as June 24 2026. Phase 5 date stated as 2035 in the five-phase schedule in the memorandum body. Instrument type (memorandum vs statute) noted in plain field per focus instruction.'
---

OMB M-26-15, signed June 24 2026 by OMB Director Russell T. Vought, is the operational playbook for civilian agencies implementing Executive Order 14412 ("Securing the Nation Against Advanced Cryptographic Attacks"). It establishes a five-phase migration schedule for all executive departments and agencies, excluding National Security Systems governed separately under NSM-10 and CNSA 2.0.

Phases 1 through 4 run from 2026 to 2031 and are anchored by EO 14412 hard deadlines already recorded on this board: key establishment for high-value assets and high-impact systems by December 31 2030 (eo-14412-2030-key-establishment), and digital signatures for those same categories by December 31 2031 (eo-14412-2031-signatures). Phase 5 extends the obligation to all remaining federal civilian systems by 2035, based on risk assessment and availability of commercial PQC offerings.

**Why Phase 5 matters.** M-26-15 is the first federal document to publish an explicit end-to-end schedule for the full civilian PQC transition. The 2035 endpoint reconciles EO 14412 priority deadlines with the NIST IR 8547 horizon (which deprecates RSA and ECC by 2030 and disallows them by 2035). An organisation treating 2030 as the only federal deadline misses that systems outside the high-value-asset and high-impact categories still carry a binding obligation.

**Instrument type.** This date is set by an OMB memorandum implementing an executive order. Both instruments are more mutable than a published standard: EO 14412 could be modified by a subsequent executive order; M-26-15 could be superseded by a revised memorandum. The focus instruction flagged this distinction as material for a reader planning ten years out.

**Additional agency obligations under M-26-15.** Every agency must name a PQC migration lead and submit a full migration plan within 120 days of June 24 2026 (approximately October 22 2026). The memo requires integration of PQC readiness into procurement workflows and mandates use of a cryptographic bill of materials to provide real-time visibility of cryptographic posture.
