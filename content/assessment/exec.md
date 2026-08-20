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
    guidance:
      text: 'Every published playbook opens here. NCSC asks for a discovery exercise producing an inventory of the services, protocols and dependencies that use cryptography; the CISA/NSA/NIST factsheet and the NCCoE practice guide put the same thing as a cryptographic bill of materials covering algorithm, key, certificate and protocol across IT and OT. The EU roadmap makes an initial national inventory part of its first step, due by the end of 2026. The shared reasoning is blunt: you cannot prioritise, protect or migrate what you cannot see, and an inventory built during the migration is built too late to plan it.'
      links:
        - label: 'NCSC migration timelines'
          url: https://www.ncsc.gov.uk/guidance/pqc-migration-timelines
        - label: 'CISA/NSA/NIST readiness factsheet'
          url: https://www.cisa.gov/resources-tools/resources/quantum-readiness-migration-post-quantum-cryptography
        - label: 'NIST NCCoE practice guide'
          url: https://pages.nist.gov/nccoe-migration-post-quantum-cryptography/

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
    guidance:
      text: 'This is the question the guidance calls cryptographic agility, and it is the one most organisations answer worst. The NCCoE practice guide treats the ability to swap an algorithm without redesigning the system as the property the whole migration depends on — the post-quantum change is not the last one, and anything that cannot be changed once cannot be changed twice. A useful test is not hypothetical: most organisations have already rehearsed this during a certificate authority incident or an expiry scramble, and what that cost in hours or weeks is the honest input here.'
      links:
        - label: 'NIST NCCoE practice guide'
          url: https://pages.nist.gov/nccoe-migration-post-quantum-cryptography/
        - label: 'NCSC migration timelines'
          url: https://www.ncsc.gov.uk/guidance/pqc-migration-timelines

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
    guidance:
      text: 'Proof means a test, not a plan. Post-quantum keys and signatures are substantially larger than the ones they replace, which breaks assumptions buried in protocol implementations, hardware security modules, embedded devices and anything that sized a buffer years ago. NCSC and the NCCoE both push towards piloting on real systems for that reason, and hybrid modes exist so a pilot can run without giving up the security of what is already deployed. An untested plan tends to be optimistic in exactly the places that turn out to matter.'
      links:
        - label: 'NCSC migration timelines'
          url: https://www.ncsc.gov.uk/guidance/pqc-migration-timelines
        - label: 'NIST NCCoE practice guide'
          url: https://pages.nist.gov/nccoe-migration-post-quantum-cryptography/

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
    guidance:
      text: 'This is the harvest-now-decrypt-later question, and it is the only one whose clock has already started: traffic captured today can be stored and decrypted whenever a capable machine exists. The EU roadmap is explicit that data needing to stay confidential for at least ten years should be protected first, setting end-2030 for high-risk use cases; NIST deprecates RSA and ECC after 2030 and disallows them after 2035. Answer for the longest-lived secret you actually hold rather than the average — the average is not what an adversary would keep.'
      links:
        - label: 'EU implementation roadmap'
          url: https://ec.europa.eu/newsroom/dae/redirection/document/117507
        - label: 'NIST IR 8547 transition'
          url: https://csrc.nist.gov/pubs/ir/8547/ipd
added: '2026-08-19'
---
