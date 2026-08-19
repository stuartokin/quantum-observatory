---
schema: milestone/v1
id: nist-2035-disallowed
title: 'US: classical public-key cryptography disallowed'
jurisdiction: US
authority: 'NIST'
date: '2035-12-31'
kind: deadline
status: upcoming
what: 'NIST IR 8547 disallows RSA, ECDSA, EdDSA, DH and ECDH after 2035 at every parameter size — the point at which the classical algorithms stop being approved at all.'
plain: 'After 2035 the old algorithms are simply not allowed, whatever key size you use.'
about:
  - pqc-fips-203
  - pqc-fips-204
  - pqc-fips-205
  - harvest-now-decrypt-later
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
  note: 'Checked against Tables 2 and 4 of the initial public draft, which read "Disallowed after 2035" for both 112-bit and >=128-bit parameters.'
added: '2026-08-19'
---
