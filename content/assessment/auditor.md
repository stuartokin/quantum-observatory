---
schema: assessment/v1
id: auditor
kind: questionnaire
title: 'Auditor'
summary: 'Assurance view — evidence, third parties, records and whether the answers above could be demonstrated.'
heuristic: 'The weights and scores here are editorial judgement, not measurement. Nothing on this board evidences that discovery maturity predicts migration time by a factor of 1.4 rather than 1.2 — the ordering is defensible and the precision is not. Treat the result as a structured way to arrive at your own X and Y, and argue with the weights: they are held as content so that you can.'
questions:
  - question: 'Can you discover every cryptographic key across the estate?'
    dimension: agility
    weight: 1.4
    weightReason: 'Discovery first: the strongest predictor of migration time, so the heaviest default influence on Y.'
    options:
      - label: 'No reliable way'
        score: 1
      - label: 'Partial / manual'
        score: 2
      - label: 'Central inventory, periodic'
        score: 3
      - label: 'Automated, continuous discovery'
        score: 5
  - question: 'Do you know where every certificate is used and what depends on it?'
    dimension: maturity
    weight: 1.1
    weightReason: 'Maturity-only (no X/Y effect); dependency mapping weighted slightly up because it is what auditors find missing most often.'
    options:
      - label: 'Largely unknown'
        score: 1
      - label: 'Some mappings'
        score: 2
      - label: 'Documented for critical systems'
        score: 3
      - label: 'Full dependency mapping'
        score: 5
  - question: 'Can you rotate keys and certificates automatically?'
    dimension: agility
    weight: 1.2
    weightReason: 'Automation is demonstrated agility — above-standard influence on Y.'
    options:
      - label: 'No — manual'
        score: 1
      - label: 'Some automation'
        score: 2
      - label: 'Most, automated'
        score: 4
      - label: 'Fully automated (e.g. ACME)'
        score: 5
  - question: 'Could you replace compromised keys within hours?'
    dimension: agility
    weight: 1.3
    weightReason: 'Incident-tested replacement speed is the closest real-world proxy for Y available to an auditor.'
    options:
      - label: 'No — days or weeks'
        score: 1
      - label: 'With major effort'
        score: 2
      - label: 'Yes, for critical systems'
        score: 4
      - label: 'Yes, enterprise-wide'
        score: 5
  - question: 'Can you migrate rapidly to post-quantum cryptography if required?'
    dimension: agility
    weight: 1.2
    weightReason: 'Direct migration readiness — above standard, though partly plan rather than proof.'
    options:
      - label: 'Not assessed'
        score: 1
      - label: 'Analysis started'
        score: 2
      - label: 'Plan in place'
        score: 3
      - label: 'Tested & hybrid-ready'
        score: 5
  - question: 'Can you demonstrate cryptographic agility with evidence, not assertion?'
    dimension: maturity
    weight: 1
    weightReason: 'Maturity-only (no X/Y effect): evidence quality shapes the maturity read-out.'
    options:
      - label: 'No evidence'
        score: 1
      - label: 'Informal'
        score: 2
      - label: 'Documented'
        score: 3
      - label: 'Auditable, board-reported'
        score: 5
  - question: 'What is your longest data-confidentiality requirement (harvest-now-decrypt-later exposure)?'
    dimension: shelf-life
    weight: 1
    weightReason: 'This question alone sets X. Its weight scales X directly.'
    options:
      - label: 'Under 5 years'
        score: 3
      - label: '5–10 years'
        score: 8
      - label: '10–25 years'
        score: 18
      - label: '25+ years'
        score: 30
added: '2026-08-19'
---
