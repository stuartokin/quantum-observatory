---
schema: assessment/v1
id: exec
kind: questionnaire
title: 'Executive'
summary: 'Board and executive view — exposure, obligation and whether the organisation could move if it had to.'
heuristic: 'The weights and scores here are editorial judgement, not measurement. Nothing on this board evidences that discovery maturity predicts migration time by a factor of 1.4 rather than 1.2 — the ordering is defensible and the precision is not. Treat the result as a structured way to arrive at your own X and Y, and argue with the weights: they are held as content so that you can.'
questions:
  - question: 'Can you say, today, everywhere RSA and ECC are used across your organisation?'
    dimension: agility
    weight: 1.4
    weightReason: 'Discovery is the single strongest predictor of migration time — every national playbook starts here, so it carries the heaviest default influence on Y.'
    options:
      - label: 'No central inventory'
        score: 1
      - label: 'Partially — some systems known'
        score: 2
      - label: 'Mostly — a maintained inventory'
        score: 3
      - label: 'Yes — complete, automated discovery'
        score: 5
  - question: 'If a critical crypto flaw were announced tomorrow, how long to replace every affected certificate, key and signature?'
    dimension: agility
    weight: 1.5
    weightReason: 'The most direct empirical measure of Y there is: replacing every key and certificate under pressure is a rehearsal of the migration itself.'
    options:
      - label: 'Months, or unknown'
        score: 1
      - label: 'Weeks'
        score: 2
      - label: 'A few days'
        score: 4
      - label: 'Hours — largely automated'
        score: 5
  - question: 'Can you prove critical systems can move to post-quantum crypto without major redesign or prolonged outages?'
    dimension: agility
    weight: 1
    weightReason: 'A strong signal, but partly forward-looking assertion rather than demonstrated speed — so it takes standard weight on Y.'
    options:
      - label: 'No — not assessed'
        score: 1
      - label: 'Some analysis done'
        score: 2
      - label: 'Plan exists, partly tested'
        score: 3
      - label: 'Yes — tested and hybrid-ready'
        score: 5
  - question: 'How long must your most sensitive data stay confidential?'
    dimension: shelf-life
    weight: 1
    weightReason: 'This question alone sets X (data shelf-life). Its weight scales X directly — raise it if your stated retention understates reality (e.g. implicit legal duties).'
    options:
      - label: 'Under 5 years'
        score: 3
      - label: '5–10 years'
        score: 8
      - label: '10–25 years'
        score: 18
      - label: '25+ years (health, legal, state)'
        score: 30
added: '2026-08-19'
---
