---
schema: frontier/v1
id: mig-supply-chain
title: Supplier PQC readiness
summary: 'Assessing and managing supply-chain exposure to quantum-vulnerable cryptography in third-party products and services. CISA/NSA/NIST formally directed vendor engagement in August 2023.'
plain: 'An organisation that has upgraded its own systems to quantum-safe cryptography may still be exposed if the software and hardware it buys from suppliers still uses RSA or elliptic-curve keys. Supply-chain PQC readiness means understanding which vendors use quantum-vulnerable cryptography, asking them for migration roadmaps, and factoring their timelines into your own planning. In August 2023, CISA, NSA, and NIST published a joint factsheet making this explicit: technology vendors whose products rely on current public-key cryptography should already be planning for integration of post-quantum algorithms. NIST IR 8547 (November 2024) sets a hard clock: RSA and ECDH are deprecated for new deployments by 2030 and fully retired by 2035, which means any supplier still using them after 2030 is non-compliant.'
pillar: quantum
readiness: emerging
constellation: migration
cluster: pqc-migration
actors:
  - CISA
  - NSA
  - NIST
country:
  - US
metrics:
  - name: deprecation deadline for RSA/ECDH in new deployments
    value: '2030'
    unit: year
    note: NIST IR 8547, November 2024
  - name: full retirement deadline for RSA/ECDH
    value: '2035'
    unit: year
    note: NIST IR 8547, November 2024
priority: P1
qdayImpact: 0
horizon: 1
novelty: 'Formal US authority directive making vendor PQC roadmap engagement a named requirement'
links:
  - to: mig-discovery
    relation: depends-on
  - to: crypto-bill-of-materials
    relation: depends-on
  - to: pqc-fips-203
    relation: depends-on
evidence:
  claim: 'CISA, NSA, and NIST published a joint factsheet (August 2023) explicitly directing technology vendors whose products use quantum-vulnerable cryptography to begin planning and testing for post-quantum algorithm integration. The factsheet instructs organisations to ask suppliers for PQC roadmaps and to assess supply-chain reliance on quantum-vulnerable cryptography as part of their quantum-readiness programme. NIST IR 8547 (November 2024) subsequently set binding deprecation dates: RSA, ECDH, ECDSA, and finite-field DH are deprecated for new deployments by 2030 and fully retired by 2035.'
  level: E1
  verified: '2026-08-08'
  sources:
    - url: https://www.cisa.gov/sites/default/files/2023-08/Quantum-Readiness%20-%20Migration%20to%20Post-Quantum%20Cryptography_508c.pdf
      role: standard
      title: 'Quantum-Readiness: Migration to Post-Quantum Cryptography'
      publisher: 'CISA / NSA / NIST'
      date: '2023-08-21'
      accessed: '2026-08-08'
      note: 'Joint factsheet. Section on technology vendors explicitly names supply-chain cryptographic engagement as a requirement. Free to access.'
    - url: https://csrc.nist.gov/pubs/ir/8547/ipd
      role: standard
      title: 'Transition to Post-Quantum Cryptography Standards (NIST IR 8547)'
      publisher: NIST
      date: '2024-11-19'
      accessed: '2026-08-08'
      note: 'Sets deprecation (2030) and retirement (2035) dates for RSA, ECDH, ECDSA, DSA, and DH. Gives supply-chain planners a regulatory deadline to anchor vendor engagement.'
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Supplier PQC readiness addresses the weakest-link problem in post-quantum migration: an organisation that replaces its own cryptography is still exposed if its vendors have not. CISA, NSA, and NIST named this risk explicitly in their August 2023 joint factsheet, directing technology vendors to begin planning and testing for post-quantum algorithm integration even before standards were finalised. NIST IR 8547 (November 2024) gave the effort a hard regulatory timeline: RSA, ECDH, ECDSA, and related algorithms are deprecated for new deployments by 2030 and fully retired by 2035. An organisation's procurement process now needs to include asking vendors when and how they will comply with these dates — a question most vendor relationships are not yet structured to ask.
