---
schema: milestone/v1
id: eo-14412-2031-signatures
title: 'EO 14412: post-quantum digital signatures on federal high value assets'
jurisdiction: US
authority: 'The White House'
date: '2031-12-31'
kind: deadline
status: upcoming
what: 'Executive Order 14412 section 4(b)(iii) requires agencies to transition all high value assets and high impact systems to use post-quantum cryptography for digital signatures by December 31, 2031 — a year after the same systems must have moved for key establishment.'
plain: 'Federal signing keys get a year longer than federal key exchange. Signatures are checked at the moment they are used, so a quantum computer arriving later cannot forge one after the fact — which is why they are second in the queue rather than first.'
about:
  - mig-crypto-agility
source:
  url: https://www.federalregister.gov/d/2026-12909
  title: 'Executive Order 14412: Securing the Nation Against Advanced Cryptographic Attacks'
  publisher: 'Federal Register'
  date: '2026-06-25'
review:
  state: agent-reviewed
  by: agent
  agent: claude-session
  on: '2026-08-19'
  note: 'Read in the order text as published, section 4(b)(iii): "transition all HVAs and high impact systems to use PQC for digital signatures by December 31, 2031." Signed 22 June 2026, published 91 FR 38484 on 25 June 2026.'
added: '2026-08-19'
---
