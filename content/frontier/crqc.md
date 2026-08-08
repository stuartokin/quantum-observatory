---
schema: frontier/v1
id: crqc
title: Cryptographically relevant quantum computer
summary: 'A quantum computer capable of breaking RSA-2048 or ECC-256 in a practically relevant timeframe. Does not yet exist. Expert surveys and NIST policy treat it as plausible within 10-15 years.'
plain: 'A cryptographically relevant quantum computer (CRQC) is a machine powerful enough and reliable enough to run Shor''s algorithm and break the public-key encryption that secures internet traffic, banking, government communications, and most digital infrastructure. No such machine exists today. The largest fault-tolerant processors demonstrated in 2025-2026 operate with dozens of logical qubits; breaking RSA-2048 requires on the order of one million physical qubits working in concert. What has changed is the estimate of how far away that threshold is. The Global Risk Institute 2025 expert survey found 26 international experts now rate the probability of a CRQC within 10 years at 28-49% — the highest 10-year estimate in the survey''s seven-year history. US policy (NIST IR 8547) deprecates RSA and ECC for federal systems by 2030 and disallows them entirely by 2035. Both timelines imply the migration window is narrower than most organisations have planned for.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalysis
actors:
  - Global Risk Institute
  - evolutionQ
  - NIST
country:
  - CA
  - US
metrics:
  - name: Expert probability of CRQC within 10 years
    value: '28-49'
    unit: percent
    note: 'GRI Quantum Threat Timeline Report 2025, 26 experts. Range reflects optimistic vs pessimistic interpretation of survey responses. Highest 10-year estimate in the report''s 7-year history.'
  - name: Expert probability of CRQC within 15 years
    value: '51-70'
    unit: percent
    note: 'GRI Quantum Threat Timeline Report 2025. Described as likely within 15 years.'
  - name: US RSA/ECC deprecation date
    value: '2030'
    unit: year
    note: 'NIST IR 8547 ipd (Nov 2024). Deprecated for new federal systems. Full disallowance 2035.'
links:
  - to: algo-resource-estimation
    relation: depends-on
  - to: algo-shor
    relation: depends-on
  - to: harvest-now-decrypt-later
    relation: enables
evidence:
  claim: 'The GRI Quantum Threat Timeline Report 2025 (26 international experts, published March 2026) finds that expert estimates of a CRQC within 10 years now range from 28% to 49% probability — the highest 10-year estimate in the survey''s seven-year history, up from 14-34% in 2024. NIST IR 8547 (Initial Public Draft, November 2024) formally proposes deprecating RSA and ECC for all US federal systems by 2030 and disallowing them by 2035. A CRQC does not exist; both sources address forecast and policy response, not experimental demonstration.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2025b/
      role: primary
      title: 'Quantum Threat Timeline Report 2025'
      publisher: 'Global Risk Institute / evolutionQ'
      date: '2026-03-09'
      accessed: '2026-08-08'
      note: 'Annual expert survey. 26 global experts. Authored by Dr Michele Mosca and Dr Marco Piani. Seventh edition.'
    - url: https://csrc.nist.gov/pubs/ir/8547/ipd
      role: standard
      title: 'NIST IR 8547 (Initial Public Draft): Transition to Post-Quantum Cryptography Standards'
      publisher: NIST
      date: '2024-11-01'
      identifier: 'NIST IR 8547 ipd'
      accessed: '2026-08-08'
      note: 'Sets 2030 deprecation and 2035 disallowance dates for RSA, ECDSA, ECDH, and DH in US federal systems. Initial public draft; policy direction confirmed by subsequent Executive Order 14412 (June 2026).'
confidence: medium
status: published
priority: P0
qdayImpact: 0
qdayReasoning: 'The CRQC item describes the concept and the expert forecast, not a technical result that itself moves Q-Day. The algorithmic results that shift the estimate belong on algo-resource-estimation (qdayImpact +2). This item is the framing concept; its sources confirm what experts believe, not what hardware has achieved.'
horizon: 2
novelty: incremental
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

A cryptographically relevant quantum computer (CRQC) is a fault-tolerant machine capable of running Shor''s algorithm to break RSA-2048 or ECC-256 in a practically relevant timeframe. No such machine exists as of mid-2026. The Global Risk Institute Quantum Threat Timeline Report 2025 surveyed 26 international experts and found the probability of a CRQC within 10 years now rated at 28–49%, the highest figure in the survey's seven-year history. US policy response is embodied in NIST IR 8547, which proposes deprecating RSA and elliptic-curve algorithms for federal systems by 2030 and disallowing them entirely by 2035. The migration window implied by these two timelines — expert probability rising and policy deadlines fixed — is the primary driver of urgency across the migration constellation.
