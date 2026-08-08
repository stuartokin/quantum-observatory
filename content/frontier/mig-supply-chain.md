---
schema: frontier/v1
id: mig-supply-chain
title: Supplier PQC readiness
summary: 'The capacity of technology suppliers to deliver products and services supporting post-quantum cryptographic algorithms within the timeframes required by customers and regulators.'
plain: 'An organisation that completes its own migration to post-quantum cryptography remains exposed if its suppliers have not. Every cloud service, VPN appliance, HSM, and certificate authority in the supply chain must support the new algorithms. Supplier readiness varies enormously — some vendors have shipped ML-KEM support since 2024; others have no public roadmap. The Australian Signals Directorate published a structured questionnaire for assessing vendor readiness in 2026; the PKI Consortium launched a PQC Maturity Model in June 2026 defining six levels of product-level readiness. Both are frameworks. No published data on industry-wide supplier compliance rates exists.'
pillar: quantum
readiness: emerging
constellation: migration
cluster: procurement
actors:
  - Australian Signals Directorate
  - PKI Consortium
country:
  - AU
  - MULTI
metrics:
  - name: PQCMM maturity levels
    value: '6'
    note: Levels 0–5; Level 5 is PQC by default with certified implementations.
priority: P1
qdayImpact: 0
qdayReasoning: ''
horizon: 1
novelty: new governance frameworks for vendor assessment
links:
  - to: mig-discovery
    relation: depends-on
  - to: cnsa-2-timeline
    relation: depends-on
  - to: crypto-bill-of-materials
    relation: depends-on
evidence:
  claim: 'The Australian Signals Directorate published Post-Quantum Questions to Ask Your Vendors (2026), noting that vendor readiness may be the biggest factor in whether organisations can meet migration timeframes. The PKI Consortium published the PQC Maturity Model (PQCMM) in June 2026, a six-level (0–5) product-level framework for evaluating post-quantum readiness in supply-chain procurement. Both are frameworks with no published data on industry-wide uptake.'
  level: E1
  verified: '2026-08-08'
  sources:
    - url: https://www.cyber.gov.au/business-government/secure-design/quantum/post-quantum-questions-to-ask-your-vendors
      role: primary
      title: Post-quantum questions to ask your vendors
      publisher: Australian Signals Directorate
      date: '2026-07-01'
      accessed: '2026-08-08'
      note: Structured questionnaire for procurement and vendor risk teams; notes vendor readiness as key migration constraint.
    - url: https://pkic.org/wg/pqc/pqcmm/
      role: corroborating
      title: PQC Maturity Model (PQCMM)
      publisher: PKI Consortium
      date: '2026-06-14'
      accessed: '2026-08-08'
      note: Vendor-facing framework defining six maturity levels (0–5) for PQC adoption in products and services.
confidence: medium
status: published
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Supplier PQC readiness is one of the least-measured risks in the migration landscape. An organisation can complete its own transition and remain exposed through every third-party vendor that still negotiates RSA key exchange. The ASD questionnaire and PKI Consortium PQCMM are the first formal frameworks for assessing this — both published mid-2026. Evidence stays at E1: these are governance proposals, not measured outcomes. The item is correctly framed and correctly placed at emerging.
