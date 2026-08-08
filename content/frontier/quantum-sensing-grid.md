---
schema: frontier/v1
id: quantum-sensing-grid
title: Quantum sensing for grid monitoring
summary: 'Quantum magnetometers, atomic clocks and gravimeters have demonstrated sensitivity relevant to power-grid fault detection and synchronisation. No large-scale field deployment confirmed; lab demonstrations support feasibility.'
plain: 'Quantum sensors exploit properties of atoms and light to measure magnetic fields, time and gravity with precision beyond conventional instruments. For electricity grids, the most relevant applications are detecting tiny magnetic-field anomalies that signal faults in power lines or transformers, and providing ultra-precise timing for grid synchronisation. A 2025 review in Nature Reviews Clean Technology documents these use-cases and the engineering gaps — chiefly miniaturisation and cost — that must close before grid deployment becomes routine. A substation trial in Hefei, China (commissioned November 2024) is reported as the first integration of quantum sensing technologies in live grid infrastructure.'
pillar: quantum
readiness: experimental
constellation: sensing
cluster: grid sensing
actors:
  - National Energy Technology Laboratory
  - University of Colorado Boulder
  - USTC
country:
  - US
  - CN
links:
  - to: sense-nv-magnetometry
    relation: depends-on
  - to: sense-optical-clock
    relation: depends-on
  - to: sense-grid-timing
    relation: enables
evidence:
  claim: 'Crawford et al. (2025) in Nature Reviews Clean Technology identify quantum magnetometers as capable of detecting powerline and transformer faults, and chip-scale atomic clocks as enabling grid synchronisation. Miniaturisation, ruggedisation and cost reduction are identified as the key barriers to field deployment. A substation in Hefei, China integrating 85 quantum devices across 18 technology types was commissioned in November 2024.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://www.nature.com/articles/s44359-025-00112-7
      role: primary
      title: Quantum sensing for emerging energy technologies
      publisher: Nature Reviews Clean Technology
      date: '2025-10-19'
      identifier: 'Nature Reviews Clean Technology (2025)'
      doi: 10.1038/s44359-025-00112-7
      accessed: '2026-08-08'
      note: 'Peer-reviewed review article; authors at US National Energy Technology Laboratory and University of Colorado Boulder. Covers power grid, EV-to-grid, and carbon capture applications.'
priority: P2
qdayImpact: 0
qdayReasoning: ''
horizon: 2
novelty: emerging application review
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

Quantum magnetometers can detect the tiny magnetic-field signatures of faults in power lines and transformers at sensitivities beyond classical instruments. Chip-scale atomic clocks can synchronise grid sections with greater precision than GPS-dependent timing. A 2025 peer-reviewed review confirms the technical case but identifies miniaturisation and cost as the barriers. A Hefei substation trial (November 2024) is the first reported live integration, but independent verification of performance is not yet available.
