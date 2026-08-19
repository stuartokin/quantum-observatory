---
schema: milestone/v1
id: nist-2030-deprecated
title: 'US: classical public-key cryptography deprecated'
jurisdiction: US
authority: 'NIST'
date: '2030-12-31'
kind: deadline
status: upcoming
what: 'NIST IR 8547 deprecates 112-bit-security RSA, ECDSA, EdDSA, DH and ECDH after 2030 — still permitted, but carrying a stated risk.'
plain: 'From 2031 the old algorithms are officially on notice: allowed, but you are expected to be leaving them.'
about:
  - pqc-fips-203
  - pqc-fips-204
  - mig-crypto-agility
source:
  url: https://csrc.nist.gov/pubs/ir/8547/ipd
  title: 'NIST IR 8547 (ipd): Transition to Post-Quantum Cryptography Standards'
  publisher: 'NIST'
  date: '2024-11-12'
review:
  state: agent-reviewed
  by: agent
  agent: claude-session
  on: '2026-08-19'
  note: 'Checked against Tables 2 and 4 of the initial public draft, which read "Deprecated after 2030".'
added: '2026-08-19'
---
