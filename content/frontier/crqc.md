---
schema: frontier/v1
id: crqc
title: Cryptographically relevant quantum computer
summary: 'A quantum computer capable of running Shor''s algorithm against RSA-2048 or equivalent elliptic curve targets at cryptographically relevant parameters — breaking deployed public-key cryptography within a practical timeframe.'
plain: 'A cryptographically relevant quantum computer (CRQC) is one powerful enough to break the encryption that secures the internet: RSA, elliptic curve cryptography, and Diffie-Hellman key exchange. No such machine exists today. The technical requirements — currently estimated at under one million noisy physical qubits for RSA-2048 — remain far beyond any existing device, but algorithmic improvements in 2025 and 2026 have sharply reduced that estimate. Expert surveys in 2025 put a 28–49% probability on a CRQC arriving within ten years.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalysis
priority: P0
qdayImpact: 0
qdayReasoning: ''
actors:
  - IBM
  - NIST
  - University of Waterloo
  - Microsoft
country:
  - US
  - CA
horizon: 3
novelty: 'Threshold concept; no CRQC demonstrated. Resource requirements have fallen sharply in 2025.'
metrics:
  - name: Expert survey probability of CRQC within 10 years (2023 edition)
    value: 17-31
    unit: percent
    note: GRI Quantum Threat Timeline 2023. Mosca, Piani, GRI. Lowest point in the longitudinal series; 2025b authors attribute the 2022–2023 dip to post-pandemic recalibration of expectations.
  - name: Expert survey probability of CRQC within 10 years (2024 edition)
    value: 19-34
    unit: percent
    note: GRI Quantum Threat Timeline 2024. 32 expert respondents. Up from 17–31% in 2023. Sixth annual edition.
  - name: Expert survey probability of CRQC within 10 years (2025 edition)
    value: 28-49
    unit: percent
    note: GRI Quantum Threat Timeline 2025b. 26 expert respondents. Highest 10-year estimate in the report''s seven-year history.
  - name: Expert survey probability of CRQC within 15 years (2025 edition)
    value: 51-70
    unit: percent
    note: GRI Quantum Threat Timeline 2025b. 26 respondents. Reflects acceleration attributed to error correction advances and algorithmic qubit-count reductions.
  - name: 'Mosca 2015 personal estimate: probability RSA-2048 broken by 2031'
    value: '50'
    unit: percent
    note: Michele Mosca, IACR ePrint 2015/1075. Origin of the X+Y>Z migration inequality. Personal estimate, not a survey; a named 2015 forecast now checkable against 2026 reality.
links:
  - to: algo-resource-estimation
    relation: depends-on
  - to: algo-shor
    relation: depends-on
  - to: qec-logical-qubit-scaling
    relation: depends-on
evidence:
  claim: 'Scholten et al. (2024, IEEE Security & Privacy, IBM/NIST) review benefits and risks of quantum computers, concluding fault-tolerant algorithms pose the primary cryptographic threat. The GRI Quantum Threat Timeline series shows accelerating expert opinion: 17–31% CRQC within 10 years (2023 edition); 19–34% (2024 edition, 32 experts); 28–49% (2025b edition, 26 experts); 51–70% within 15 years (2025b). Mosca (IACR ePrint 2015/1075) estimated a 1/2 chance of breaking RSA-2048 by 2031 — the origin of the X+Y>Z inequality used in quantum migration planning. No CRQC has been demonstrated; the item records the threat threshold and the expert consensus on timing, now evidenced as a longitudinal trend rather than a point estimate.'
  level: E3
  verified: '2026-08-19'
  sources:
    - url: https://arxiv.org/abs/2401.16317
      role: primary
      title: Assessing the Benefits and Risks of Quantum Computers
      publisher: IEEE Security & Privacy
      date: '2024-07-17'
      identifier: arXiv:2401.16317
      doi: 10.48550/arXiv.2401.16317
      accessed: '2026-08-08'
      note: Scholten, Williams, Moody, Mosca, Hurley, Zeng, Troyer, Gambetta. Multi-institution (IBM, NIST, UWaterloo, Microsoft). Review paper; E3 per schema rules for reviews.
    - url: https://eprint.iacr.org/2015/1075
      role: corroborating
      title: 'Cybersecurity in an era with quantum computers: will we be ready?'
      publisher: IACR Cryptology ePrint Archive
      date: '2015-11-05'
      identifier: IACR ePrint 2015/1075
      accessed: '2026-08-19'
      note: 'Michele Mosca, University of Waterloo. Origin of the X+Y>Z migration inequality. States: 1/2 chance of breaking RSA-2048 by 2031. Personal estimate, not a survey. Preprint; CC BY.'
    - url: https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2023/
      role: corroborating
      title: Quantum Threat Timeline Report 2023
      publisher: Global Risk Institute
      date: '2023-12-01'
      accessed: '2026-08-19'
      note: GRI/evolutionQ annual survey. 17–31% CRQC within 10 years. Figures confirmed from evolutionQ (co-author) page, which reports the 2024 edition rose to 19–34% from 17–31% in 2023. Date approximate; exact month not verified.
    - url: https://globalriskinstitute.org/publication/2024-quantum-threat-timeline-report/
      role: corroborating
      title: Quantum Threat Timeline Report 2024
      publisher: Global Risk Institute
      date: '2024-12-01'
      accessed: '2026-08-19'
      note: GRI/evolutionQ annual survey. 32 expert respondents. 19–34% CRQC within 10 years, up from 17–31% in 2023. Sixth annual edition. URL confirmed via GRI publication page.
    - url: https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2025b/
      role: corroborating
      title: Quantum Threat Timeline Report 2025
      publisher: Global Risk Institute
      date: '2026-04-22'
      accessed: '2026-08-08'
      note: 26 expert respondents. 28–49% within 10 years, 51–70% within 15 years. Highest 10-year estimate in the report''s seven-year history. Not a technical experiment.
confidence: medium
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: steward
  agentMergedOn: '2026-08-19'
  reviewedOn: '2026-08-19'
  note: 'Steward review 2026-08-19. GRI 2023 (17–31%), 2024 (19–34%), 2025b (28–49%/51–70%) metrics confirmed consistent with issue #145 sourcer summary and evolutionQ publications page. Mosca 2015 IACR ePrint 2015/1075 confirmed as origin of X+Y>Z inequality. E3 correct for review/survey primary source. No downward corrections needed. Longitudinal trend framing in claim is accurate and better-evidenced than a single snapshot.'
---
