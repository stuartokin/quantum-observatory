---
schema: frontier/v1
id: mig-supply-chain
title: Supplier PQC readiness
summary: 'How prepared technology suppliers are to deliver post-quantum cryptography in their products. CISA, NSA, and NIST identify supply chain PQC readiness as a distinct risk category; no empirical survey of actual supplier readiness rates has been published.'
plain: 'Most organisations rely on technology suppliers for cryptographic components they do not write themselves — hardware vendors, software providers, cloud platforms, firmware makers. When those suppliers have not migrated to post-quantum cryptography, the buying organisation''s migration stalls regardless of its own internal progress. CISA, NSA, and NIST published joint guidance in 2023 explicitly naming supply chain PQC readiness as a risk management requirement: organisations must assess their supply chain for quantum exposure, engage vendors directly, and understand vendor responsibilities. The NCSC confirmed in its March 2025 migration guidance that quantum readiness depends on supplier readiness. No published empirical study measures how many suppliers have actually prepared; the evidence base is authoritative guidance, not measured data — reflected in the E2 level.'
pillar: quantum
readiness: emerging
constellation: migration
cluster: 'supply chain'
actors:
  - CISA
  - NSA
  - NIST
  - NCSC
country:
  - US
  - GB
metrics: []
links:
  - to: mig-discovery
    relation: depends-on
  - to: crypto-bill-of-materials
    relation: depends-on
  - to: mig-crypto-agility
    relation: enables
priority: P1
qdayImpact: 0
horizon: 1
novelty: 'National authority guidance establishing supply chain as a named quantum risk management category'
evidence:
  claim: 'CISA, NSA, and NIST jointly published a quantum-readiness factsheet that names supply chain assessment, technology vendor engagement, and vendor responsibilities as explicit guidance sections. The NCSC March 2025 PQC migration timeline guidance states that an organisation''s quantum readiness depends on its supply chain and supplier readiness. Neither document provides empirical measurement of current supplier readiness rates; both establish this as a formal risk management requirement.'
  verified: '2026-08-08'
  level: E2
  sources:
    - url: https://www.cisa.gov/resources-tools/resources/quantum-readiness-migration-post-quantum-cryptography
      role: primary
      title: 'Quantum-Readiness: Migration to Post-Quantum Cryptography'
      publisher: 'CISA / NSA / NIST'
      date: '2023-08-01'
      accessed: '2026-08-08'
      note: 'Joint national authority factsheet. Supply chain assessment, vendor engagement, and vendor responsibilities are named sections. Not a peer-reviewed experiment; E2 ceiling.'
    - url: https://www.ncsc.gov.uk/guidance/pqc-migration-timelines
      role: corroborating
      title: 'Timelines for migration to post-quantum cryptography'
      publisher: 'NCSC (UK)'
      date: '2025-03-01'
      accessed: '2026-08-08'
      note: 'NCSC March 2025. States organisational quantum readiness depends on supply chain and supplier readiness.'
confidence: medium
status: published
origin: agent
added: '2026-08-08'
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

Supply chain PQC readiness is a named risk category in the joint CISA/NSA/NIST factsheet and in NCSC''s March 2025 migration guidance. No empirical study of actual supplier readiness rates exists. This item is correctly at E2: authoritative guidance, not measured data. Raising it requires published measurement.
