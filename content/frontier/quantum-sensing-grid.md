---
schema: frontier/v1
id: quantum-sensing-grid
title: Quantum sensing for grid monitoring
summary: 'Quantum magnetometers, atomic clocks, and gravimeters are being evaluated for power-grid fault detection, synchronisation backup, and infrastructure monitoring. Laboratory demonstrations exist; field deployment requires miniaturisation.'
plain: 'Power grids rely on sensors and clocks to detect faults, balance load, and keep generators in step. Quantum sensors — devices that exploit quantum effects to measure magnetic fields, time, or gravity with higher precision than classical instruments — are being studied as upgrades or backups for this infrastructure. A 2025 review from the US National Energy Technology Laboratory identified specific use cases: quantum magnetometers detecting faults in powerlines and transformers, chip-scale atomic clocks providing backup timing when GPS is jammed or spoofed, and quantum gravimeters locating underground infrastructure. The technology works in the laboratory; the barrier to grid deployment is making the devices small, rugged, and cheap enough for field use.'
pillar: quantum
constellation: sensing
readiness: experimental
actors:
  - National Energy Technology Laboratory (NETL)
  - US Department of Energy
country:
  - US
metrics:
  - name: Chip-scale atomic clock holdover drift
    value: '890'
    unit: ns per 24 hours
    note: 'Crawford et al. 2025: CSACs demonstrated at 890 ns drift over 24 hours, suitable as GPS backup for at least one day'
priority: P2
qdayImpact: 0
horizon: 2
novelty: incremental
evidence:
  claim: 'Crawford et al. (NETL/US DOE, Nature Reviews Clean Technology, October 2025) review quantum sensing platforms for energy applications, identifying quantum magnetometers for powerline and transformer fault detection, chip-scale atomic clocks for electric-vehicle-to-grid and grid synchronisation backup, and quantum gravimeters for carbon-capture leak detection. Deployment requires further miniaturisation, ruggedisation, and cost reduction.'
  verified: '2026-08-08'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s44359-025-00112-7
      role: primary
      title: Quantum sensing for emerging energy technologies
      publisher: Nature Reviews Clean Technology
      date: '2025-10-19'
      identifier: 'Nat. Rev. Clean Technol. 1, 861 (2025)'
      doi: 10.1038/s44359-025-00112-7
      accessed: '2026-08-08'
      note: Peer-reviewed review by NETL/DOE team. Covers grid-enhancing, EV-to-grid and CCS sensing applications.
confidence: high
status: published
links:
  - to: sense-nv-magnetometry
    relation: depends-on
  - to: sense-optical-clock
    relation: depends-on
  - to: sense-grid-timing
    relation: enables
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

A peer-reviewed 2025 review from NETL identifies quantum magnetometers (powerline and transformer fault detection), chip-scale atomic clocks (grid synchronisation backup at 890 ns/day drift), and quantum gravimeters (leak detection for CCS) as near-term energy applications. Field deployment depends on solving miniaturisation and cost barriers that remain open research problems.
