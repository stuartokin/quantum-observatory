---
schema: milestone/v1
id: omb-m-26-15-full-migration-2035
title: 'OMB M-26-15: full PQC migration of all federal civilian systems by 2035'
jurisdiction: US
authority: Office of Management and Budget
date: '2035-12-31'
kind: deadline
what: 'OMB Memorandum M-26-15 (June 24, 2026), implementing EO 14412, directs all executive departments and agencies to complete migration of remaining systems to post-quantum cryptography by 2035 (Phase 5 of the five-phase timeline). This obligation is set by an OMB memorandum, not a formal standard, and may be revised or revoked by executive action. The memo sets an interim objective to mitigate as much quantum risk as feasible by December 31, 2030.'
plain: 'Every US civilian federal agency must complete migration of all systems from classical public-key cryptography to post-quantum standards by 2035. This deadline comes from an executive memorandum, not a law or technical standard, so a future administration could revise it.'
status: upcoming
about:
  - pqc-fips-203
  - pqc-fips-204
  - pqc-fips-205
  - harvest-now-decrypt-later
  - mig-crypto-agility
added: '2026-08-19'
source:
  url: 'https://www.whitehouse.gov/wp-content/uploads/2026/06/M-26-15-Execution-of-the-Migration-to-Post-Quantum-Cryptography.pdf'
  title: 'Execution of the Migration to Post-Quantum Cryptography (M-26-15)'
  publisher: 'Office of Management and Budget, Executive Office of the President'
  date: '2026-06-24'
review:
  state: agent-merged
  by: agent
  agent: scout
  note: 'Primary PDF confirmed at whitehouse.gov. Five-phase timeline and 2035 Phase 5 terminal date from document as read in tychon.io and postquantum.com analyses of that PDF. EO-vs-standard distinction flagged in what field per focus instruction.'
---

OMB Memorandum M-26-15, signed by Director Russell T. Vought on June 24, 2026, implements Executive Order 14412 and converts federal PQC migration from a planning exercise into a funded, scheduled programme of record for all executive departments and agencies excluding National Security Systems (which remain under NSM-10/CNSA 2.0).

The memo establishes a five-phase timeline: Phase 1 (2026–2027) strategy and discovery; Phase 2 (2027–2028) pilots and early migration; Phase 3 (2028–2030) migration of key establishment for highest-priority systems; Phase 4 (2031) migration of digital signatures for priority systems; Phase 5 (2035) full migration of all remaining systems. An interim objective targets mitigation of as much quantum risk as feasible by December 31, 2030.

**Why this matters for the board:** EO 14412-derived milestones for key establishment (2030) and signatures (2031) are already recorded. This entry captures the 2035 full-completion obligation and the five-phase structure a reader planning a decade-long compliance programme needs. Because the deadline is set by an executive memorandum — not a statute or formal standard — it is subject to revision by executive action. That is a material difference from NIST FIPS deadlines and is flagged here for any reader planning a ten-year migration.
