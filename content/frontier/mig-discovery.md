---
schema: frontier/v1
id: mig-discovery
title: Cryptographic discovery
summary: 'Automated tools that scan enterprise infrastructure to locate every instance of quantum-vulnerable cryptography as a prerequisite for post-quantum migration planning.'
plain: 'Before an organisation can replace quantum-vulnerable encryption, it must find all of it. Cryptography is embedded across infrastructure in ways that are rarely centrally tracked: TLS endpoints, firmware signing keys, embedded device certificates, software libraries. Automated cryptographic discovery tools scan these environments and produce inventories. CISA published a federal strategy in September 2024 mandating that US civilian agencies deploy such tools; NIST SP 1800-38B documented the state of available tools tested with over 28 industry collaborators. The capability exists in prototype and pilot form; large-scale enterprise deployment is not yet routine.'
pillar: quantum
readiness: experimental
constellation: migration
cluster: inventory
actors:
  - NIST NCCoE
  - CISA
  - NSA
country:
  - US
metrics:
  - name: industry collaborators in NCCoE PQC discovery project
    value: '>28'
    note: Reported in CISA strategy document September 2024.
priority: P1
qdayImpact: 0
qdayReasoning: ''
horizon: 1
novelty: federal pilot mandate for automated crypto inventory
links:
  - to: crypto-bill-of-materials
    relation: depends-on
  - to: mig-crypto-agility
    relation: enables
  - to: mig-supply-chain
    relation: enables
evidence:
  claim: 'CISA published a Strategy for Migrating to Automated Post-Quantum Cryptography Discovery and Inventory Tools in September 2024, mandating Federal Civilian Executive Branch agencies to deploy automated cryptographic discovery tools (ACDI). NIST SP 1800-38B (preliminary draft, December 2023) evaluated public-key application discovery tools in a lab with more than 28 industry collaborators and found that most required inventory data items cannot yet be collected automatically.'
  level: E2
  verified: '2026-08-08'
  sources:
    - url: https://www.cisa.gov/sites/default/files/2024-09/Strategy-for-Migrating-to-Automated-PQC-Discovery-and-Inventory-Tools.pdf
      role: standard
      title: Strategy for Migrating to Automated Post-Quantum Cryptography Discovery and Inventory Tools
      publisher: CISA / NIST / NSA
      date: '2024-09-01'
      accessed: '2026-08-08'
      note: Sets phased mandate for FCEB agencies; references NCCoE SP 1800-38 and CDM integration.
    - url: https://www.nccoe.nist.gov/publications/practice-guide/migration-post-quantum-cryptography-nist-sp-1800-38-practice-guide
      role: corroborating
      title: 'NIST SP 1800-38B: Public Key Application Discovery Tools (Preliminary Draft)'
      publisher: NIST NCCoE
      date: '2023-12-19'
      accessed: '2026-08-08'
      note: Documents discovery tool demonstrations with 28+ industry collaborators; preliminary draft.
confidence: medium
status: published
moved:
  from: demonstrated
  on: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agentMergedOn: '2026-08-08'
  agent: sourcer
  note: 'restored after an accidental bulk confirmation'
---

Cryptographic discovery is the unglamorous prerequisite for every quantum migration: you cannot replace what you cannot find. The CISA September 2024 strategy mandates pilot deployment of automated tools across US civilian agencies. NIST SP 1800-38B is honest that most required data items cannot yet be collected automatically. Readiness is revised from demonstrated to experimental — the tools exist and are being piloted, but routine enterprise-scale deployment is not established. Evidence is E2: the sources describe prototype demonstrations and a federal strategy document, not a peer-reviewed experimental result.
