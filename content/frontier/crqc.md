---
schema: frontier/v1
id: crqc
title: Cryptographically relevant quantum computer
summary: A cryptographically relevant quantum computer (CRQC) is a fault-tolerant quantum machine large enough to run Shor's algorithm and break RSA or elliptic-curve cryptography at deployed key sizes. None exists today.
plain: A CRQC is the machine that would make today's public-key encryption obsolete. It does not exist yet, and building one requires scaling fault-tolerant qubits by several orders of magnitude beyond current hardware. NIST and NSA are treating it as a planning threat even before it arrives, because migrating cryptographic infrastructure takes years. Expert surveys put the probability of a CRQC at around 19–49% within ten years.
pillar: quantum
readiness: emerging
constellation: algorithms
actors:
  - NIST
  - Global Risk Institute
  - evolutionQ
country:
  - US
  - CA
metrics:
  - name: expert probability of CRQC within 10 years (2024 GRI survey)
    value: "19–34"
    unit: "%"
    note: Range from 32-expert survey; up from 17–31% in 2023 edition
  - name: expert probability of CRQC within 10 years (2025 GRI survey)
    value: "28–49"
    unit: "%"
    note: From 26-expert 2025 survey; highest 10-year range in seven-year history of the report
links:
  - to: algo-shor
    relation: depends-on
  - to: algo-resource-estimation
    relation: depends-on
  - to: qec-logical-qubit-scaling
    relation: depends-on
evidence:
  claim: NIST IR 8547 (November 2024 draft) defines a CRQC as a quantum computer capable of undermining deployed public-key cryptography and proposes deprecating vulnerable algorithms by 2035. The Global Risk Institute 2024 Quantum Threat Timeline Report, based on 32 global experts, estimates a 19–34% probability of a CRQC within 10 years. No CRQC has been built.
  level: E1
  verified: '2026-08-08'
  sources:
    - url: https://nvlpubs.nist.gov/nistpubs/ir/2024/NIST.IR.8547.ipd.pdf
      role: standard
      title: Transition to Post-Quantum Cryptography Standards (Initial Public Draft)
      publisher: NIST
      date: '2024-11-19'
      identifier: NIST IR 8547 (ipd)
      accessed: '2026-08-08'
      note: Authoritative US government definition of CRQC and migration timeline; proposes deprecating quantum-vulnerable algorithms by 2030–2035.
    - url: https://globalriskinstitute.org/publication/2024-quantum-threat-timeline-report/
      role: corroborating
      title: Quantum Threat Timeline Report 2024
      publisher: Global Risk Institute / evolutionQ
      date: '2024-12-01'
      identifier: GRI Quantum Threat Timeline 2024
      accessed: '2026-08-08'
      note: Annual expert survey (32 respondents); sixth edition. Estimates 19–34% CRQC probability within 10 years, up from 17–31% in 2023.
confidence: high
status: published
priority: P0
qdayImpact: 0
qdayReasoning: This item defines Q-Day conceptually; it does not itself move the date. The evidence attached (NIST IR 8547 and GRI survey) describes expert probability estimates rather than demonstrating technical progress. qdayImpact is 0 because sourcing this definitional item does not change the underlying physics.
horizon: 3
novelty: foundational threat definition
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

A cryptographically relevant quantum computer (CRQC) is a fault-tolerant quantum machine capable of running Shor's algorithm at key sizes used in deployed public-key cryptography — specifically RSA-2048, 3072, and 4096, and elliptic-curve schemes including P-256 and P-384. No such machine exists. The term is defined in NIST IR 8547 (November 2024 initial public draft), which proposes deprecating quantum-vulnerable algorithms by 2030 and disallowing them after 2035, as the target to migrate away from. The Global Risk Institute's 2024 annual expert survey, drawing on 32 quantum computing experts, estimated a 19–34% probability of a CRQC within 10 years (up from 17–31% in 2023), and a 2025 follow-on survey raised the 10-year range to 28–49%. The cryptographic threat is asymmetric: data harvested today under classical encryption remains at risk once a CRQC eventually exists, which is the logic behind Mosca's inequality and the urgency of post-quantum migration even before a CRQC arrives.
