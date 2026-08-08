---
schema: frontier/v1
id: crqc
title: Cryptographically relevant quantum computer
summary: 'A CRQC is a quantum computer powerful enough to break RSA-2048 or ECC-256 in practical time. Expert consensus as of March 2026 places the 10-year probability at 28–49%, the highest in seven years of the leading expert survey.'
plain: 'A cryptographically relevant quantum computer (CRQC) is the machine that would actually break today''s encryption at scale. No such machine exists. The leading annual expert survey, run by the Global Risk Institute and evolutionQ, asked 26 international quantum specialists in early 2026 what probability they assigned to a CRQC appearing within 10 years. The answers ranged from 28% to 49% — the highest the survey has recorded in seven years, up from 14–34% the year before. The wide range reflects genuine expert disagreement; the upward trend reflects accelerating algorithmic and hardware progress. Whether 28% or 49%, both figures are high enough that standard risk frameworks require action now: migrating cryptographic infrastructure takes years and cannot start after a CRQC appears.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalysis
actors:
  - 'Global Risk Institute'
  - 'evolutionQ'
country:
  - CA
metrics:
  - name: '10-year CRQC probability (survey upper bound)'
    value: '49'
    unit: percent
    note: '26-expert survey, March 2026 GRI report. Up from 34% in 2024 edition.'
  - name: '10-year CRQC probability (survey lower bound)'
    value: '28'
    unit: percent
    note: 'Same survey, pessimistic estimate. Up from 14% in 2024.'
  - name: '15-year CRQC probability'
    value: '51-70'
    unit: percent
    note: 'Survey respondents consider a CRQC likely within 15 years.'
links:
  - to: algo-resource-estimation
    relation: depends-on
  - to: algo-shor
    relation: depends-on
  - to: qec-logical-qubit-scaling
    relation: depends-on
priority: P0
qdayImpact: 0
horizon: 2
novelty: 'Highest expert consensus on 10-year CRQC probability in seven-year survey history'
evidence:
  claim: 'The Global Risk Institute Quantum Threat Timeline Report 2025 (published March 2026, 26 international expert respondents, authored by Mosca and Piani of evolutionQ) found the probability of a CRQC within 10 years at 28–49%, the highest in the report''s seven-year history, up sharply from 14–34% in 2024. Within 15 years the estimate reaches 51–70% likelihood. This is an expert survey, not an experimental result; E3 ceiling applies.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2025b/
      role: primary
      title: 'Quantum Threat Timeline Report 2025'
      publisher: 'Global Risk Institute / evolutionQ'
      date: '2026-03-09'
      accessed: '2026-08-08'
      note: '26-expert survey, seventh annual edition. Authors: Mosca, Piani. Survey/forecasting document — E3 ceiling applies, not an experimental result.'
    - url: https://csrc.nist.gov/pubs/ir/8547/ipd
      role: corroborating
      title: 'NIST IR 8547 ipd: Transition to Post-Quantum Cryptography Standards'
      publisher: NIST
      date: '2024-11-01'
      identifier: 'NIST IR 8547 ipd'
      accessed: '2026-08-08'
      note: 'Regulatory context: RSA/ECC deprecated after 2030, disallowed after 2035. Corroborates urgency framing.'
confidence: medium
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

No CRQC exists. The Global Risk Institute''s March 2026 expert survey places the 10-year probability at 28–49%, the highest in the survey''s history. Both ends of that range are high enough to require action, because cryptographic migration takes years and cannot begin after the machine appears.
