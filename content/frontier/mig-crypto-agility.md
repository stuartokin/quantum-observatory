---
schema: frontier/v1
id: mig-crypto-agility
title: Crypto-agility
summary: 'Crypto-agility is the ability to update cryptographic algorithms without re-architecting the whole stack. NIST NCCoE SP 1800-38 frames it as core to PQC migration; NIST IR 8547 sets the deprecation timeline (RSA/ECC deprecated 2030, disallowed 2035) that makes agility urgent.'
plain: 'Crypto-agility means a system can swap one cryptographic algorithm for another without a full rebuild. It sounds simple but is hard in practice: algorithms are often hardcoded, tied to hardware, or assumed permanent by protocol designers. NIST has made agility a central theme of its PQC migration guidance. Its practice guide (SP 1800-38) and internal report IR 8547 set out why systems must be built to change, and by when. NIST IR 8547 establishes that RSA and elliptic-curve cryptography are deprecated for new systems from 2030 and disallowed entirely from 2035. Any system designed today without crypto-agility will face a forced rebuild, not a graceful upgrade, when that deadline arrives.'
pillar: quantum
readiness: experimental
constellation: migration
cluster: crypto-discovery
actors:
  - 'NIST NCCoE'
country:
  - US
horizon: 1
novelty: 'Formal NIST guidance establishing crypto-agility as PQC migration prerequisite'
evidence:
  claim: 'NIST NCCoE SP 1800-38A (April 2023, updated February 2025) frames crypto-agility as a foundational requirement for PQC migration, alongside cryptographic discovery and interoperability testing. NIST Internal Report 8547 (Initial Public Draft, November 2024) establishes that RSA and elliptic-curve cryptography are deprecated for new systems after 2030 and disallowed entirely after 2035, creating hard deadlines that force crypto-agile design on systems built today. Readiness is experimental: the concept is defined and mandated by NIST, but deployment of fully agile systems at enterprise scale is not yet standard practice.'
  verified: '2026-08-08'
  level: E4
  sources:
    - url: 'https://www.nccoe.nist.gov/sites/default/files/2023-04/pqc-migration-nist-sp-1800-38a-preliminary-draft.pdf'
      role: standard
      title: 'NIST SP 1800-38A: Migration to Post-Quantum Cryptography'
      publisher: 'NIST NCCoE'
      date: '2023-04-24'
      identifier: 'NIST SP 1800-38A (Preliminary Draft)'
      accessed: '2026-08-08'
      note: 'Establishes crypto-agility as a core workstream for PQC migration alongside cryptographic discovery and interoperability testing.'
    - url: 'https://csrc.nist.gov/pubs/ir/8547/ipd'
      role: standard
      title: 'NIST IR 8547: Transition to Post-Quantum Cryptography Standards'
      publisher: NIST
      date: '2024-11-19'
      identifier: 'NIST IR 8547 (Initial Public Draft)'
      accessed: '2026-08-08'
      note: 'Sets deprecation of RSA/ECC for new systems after 2030 and disallowance after 2035; makes crypto-agility an urgent design requirement.'
confidence: high
status: published
links:
  - to: crypto-bill-of-materials
    relation: depends-on
  - to: mig-discovery
    relation: depends-on
  - to: hybrid-tls-mlkem
    relation: enables
origin: human
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

Crypto-agility is not a feature — it is an architectural property that must be designed in from the start. NIST IR 8547 has set hard dates: deprecated 2030, disallowed 2035. Systems without agility face a forced rebuild.
