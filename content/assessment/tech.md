---
schema: assessment/v1
id: tech
kind: questionnaire
title: 'Technical'
summary: 'Engineering view — inventory, automation, protocol readiness and what would actually have to change.'
heuristic: 'The weights and scores here are editorial judgement, not measurement. Nothing on this board evidences that discovery maturity predicts migration time by a factor of 1.4 rather than 1.2 — the ordering is defensible and the precision is not. Treat the result as a structured way to arrive at your own X and Y, and argue with the weights: they are held as content so that you can.'
questions:
  - question: '1 · Discovery — do you hold a complete cryptographic inventory (every key, cert and trust store)?'
    dimension: agility
    weight: 1.4
    weightReason: 'Discovery is the strongest predictor of migration time; you cannot migrate what you cannot see. Heaviest default influence on Y.'
    options:
      - label: 'No inventory'
        score: 1
      - label: 'Partial / manual'
        score: 2
      - label: 'Centrally maintained'
        score: 3
      - label: 'Automated, continuous'
        score: 5
  - question: '2 · Business criticality — do you know which services fail if public-key crypto breaks?'
    dimension: maturity
    weight: 1
    weightReason: 'Shapes the maturity level read-out only — it has no effect on X or Y, whatever the weight. Weight it to change how much it drives your maturity score.'
    options:
      - label: 'Not mapped'
        score: 1
      - label: 'Some known'
        score: 2
      - label: 'Documented for key services'
        score: 3
      - label: 'Fully mapped & maintained'
        score: 4
  - question: '3 · Key management — where do keys live and is the lifecycle defined?'
    dimension: maturity
    weight: 1.2
    weightReason: 'Maturity-only (no X/Y effect), but weighted above standard because governed HSM/KMS estates are the backbone of every other capability here.'
    options:
      - label: 'Mostly software, ad hoc'
        score: 1
      - label: 'Mixed, partly documented'
        score: 2
      - label: 'HSM/KMS with lifecycles'
        score: 4
      - label: 'HSM/KMS, owned, fully governed'
        score: 5
  - question: '4 · Agility — how long to rotate the TLS certificate estate?'
    dimension: agility
    weight: 1.2
    weightReason: 'A concrete, measurable agility fact — harder evidence than self-assessment, so slightly above standard influence on Y.'
    options:
      - label: 'Weeks / manual'
        score: 1
      - label: 'Days'
        score: 2
      - label: 'Hours'
        score: 4
      - label: 'Minutes — automated (ACME)'
        score: 5
  - question: '5 · Agility — could you rotate all internet-facing certificates within 24 hours?'
    dimension: agility
    weight: 1.1
    weightReason: 'Strong Y signal, but overlaps the rotation-time question — kept slightly lower to avoid double-counting the same capability.'
    options:
      - label: 'No'
        score: 1
      - label: 'With major effort'
        score: 2
      - label: 'Yes, most'
        score: 4
      - label: 'Yes, automated'
        score: 5
  - question: '6 · Algorithms — are deprecated algorithms (e.g. RSA-1024) still in production?'
    dimension: agility
    weight: 0.9
    weightReason: 'Deprecated-algorithm hygiene correlates with agility but is an indirect proxy — slightly below standard influence on Y.'
    options:
      - label: 'Unknown'
        score: 1
      - label: 'Likely, some'
        score: 2
      - label: 'No, but unverified'
        score: 3
      - label: 'No — verified; PQC/hybrid piloted'
        score: 5
  - question: '7 · Suppliers — do you track your PKI / SaaS providers’ post-quantum roadmaps?'
    dimension: maturity
    weight: 1
    weightReason: 'Maturity-only (no X/Y effect): supplier tracking shapes readiness posture rather than your own migration speed.'
    options:
      - label: 'Not checked'
        score: 1
      - label: 'Aware of a few'
        score: 2
      - label: 'Tracked for key suppliers'
        score: 3
      - label: 'Contractual PQC readiness'
        score: 5
  - question: '8 · Data risk — what is your longest data-confidentiality requirement?'
    dimension: shelf-life
    weight: 1
    weightReason: 'This question alone sets X. Its weight scales X directly — raise it if retention obligations are understated.'
    options:
      - label: 'Under 5 years'
        score: 3
      - label: '5–10 years'
        score: 8
      - label: '10–25 years'
        score: 18
      - label: '25+ years'
        score: 30
  - question: '9 · Technology — are HSMs, VPNs, load-balancers and identity platforms hybrid/PQC-capable?'
    dimension: agility
    weight: 1.3
    weightReason: 'A hard gate on Y: if HSMs, VPNs and load-balancers cannot do PQC, no amount of process shortens the timeline — weighted up accordingly.'
    options:
      - label: 'Unknown'
        score: 1
      - label: 'Mostly not'
        score: 2
      - label: 'Some, upgrade path exists'
        score: 3
      - label: 'Yes — interoperability tested'
        score: 5
  - question: '10 · Governance — named accountable exec, PQC programme and board oversight?'
    dimension: maturity
    weight: 1.1
    weightReason: 'Maturity-only (no X/Y effect), weighted slightly up: accountable ownership is what converts intent into a funded programme.'
    options:
      - label: 'None'
        score: 1
      - label: 'Informal ownership'
        score: 2
      - label: 'Programme exists'
        score: 3
      - label: 'Board-reported programme'
        score: 5
added: '2026-08-19'
---
