---
schema: frontier/v1
id: cnsa-2-timeline
title: CNSA 2.0 migration deadline
summary: 'NSA''s Commercial National Security Algorithm Suite 2.0 sets category-by-category deadlines for US National Security Systems to adopt quantum-resistant cryptography, with exclusive-use dates running from 2030 to 2033.'
plain: 'The NSA published CNSA 2.0 in September 2022 as the replacement algorithm suite for US national security systems. It names specific quantum-resistant algorithms — ML-KEM-1024 for key exchange, ML-DSA-87 for signatures — and sets firm dates by product category. Software signing and networking equipment must use only CNSA 2.0 algorithms by 2030. Web services, operating systems, and cloud infrastructure follow by 2033. New acquisitions must support CNSA 2.0 from January 2027. This is the most operationally specific quantum-migration mandate published by any government.'
pillar: quantum
readiness: adopted
constellation: migration
cluster: standards
actors:
  - NSA
country:
  - US
metrics:
  - name: new acquisitions must support CNSA 2.0
    value: '2027-01-01'
    note: All new NSS acquisitions from this date must be CNSA 2.0 compliant.
  - name: exclusive use deadline for networking and software signing
    value: '2030'
    note: Networking equipment and software/firmware signing must exclusively use CNSA 2.0 by end of 2030.
  - name: exclusive use deadline for web services and cloud
    value: '2033'
    note: Operating systems, custom applications, and cloud services must reach exclusive use by 2033.
priority: P1
qdayImpact: 0
qdayReasoning: ''
horizon: 1
novelty: formal government migration mandate
links:
  - to: pqc-fips-203
    relation: depends-on
  - to: pqc-fips-204
    relation: depends-on
  - to: mig-supply-chain
    relation: enables
evidence:
  claim: 'The NSA CNSA 2.0 advisory (September 2022, updated May 2025) mandates ML-KEM-1024 and ML-DSA-87 for National Security Systems with category-by-category exclusive-use deadlines: 2030 for networking equipment and software/firmware signing; 2033 for web, cloud, and custom applications. New NSS acquisitions must support CNSA 2.0 from January 1, 2027. Custom applications and legacy equipment must be updated or replaced by 2033.'
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://media.defense.gov/2025/May/30/2003728741/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS.PDF
      role: standard
      title: Commercial National Security Algorithm Suite 2.0
      publisher: National Security Agency
      date: '2022-09-01'
      accessed: '2026-08-08'
      note: Original v1.0 September 2022; URL is May 2025 update. Authoritative source for algorithm requirements and transition timeline.
confidence: high
status: published
moved:
  from: emerging
  on: '2026-08-08'
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

CNSA 2.0 is the US government's most operationally specific quantum-migration mandate. It names algorithms, product categories, and calendar dates. The 2030 deadline for networking equipment is already driving vendor product roadmaps. Evidence is raised to E4: this is a formal published government technical advisory with clear, enforceable dates — not a proposal. Readiness correctly sits at adopted: it is on published migration roadmaps and driving procurement requirements.
