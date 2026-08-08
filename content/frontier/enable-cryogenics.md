---
schema: frontier/v1
id: enable-cryogenics
title: Dilution refrigeration at scale
summary: 'Dilution refrigerators are the only practical technology for cooling superconducting and other solid-state qubit platforms to the ~10-20 mK temperatures required. Scaling from tens to thousands of qubits creates severe wiring, heat-load and cooling-power engineering challenges.'
plain: 'Superconducting quantum processors must operate at temperatures around 15 millikelvin — colder than outer space — achieved only with dilution refrigerators that exploit a quantum property of helium isotope mixtures. Every qubit needs at least one microwave control cable running from room-temperature electronics down through the refrigerator, and each cable leaks heat. A 2019 peer-reviewed engineering study from ETH Zurich showed how to wire and thermally optimise a dilution refrigerator for up to 50-150 qubits while staying within the cooling budget. Scaling to thousands of qubits requires new wiring technologies — superconducting flex cables and on-chip control electronics — that are the subject of active industrial and academic development.'
pillar: quantum
readiness: demonstrated
constellation: enabling
cluster: hardware-infrastructure
actors:
  - ETH Zurich
country:
  - CH
metrics:
  - name: demonstrated operating temperature
    value: '14'
    unit: mK
    note: 'Bluefors XLD400 dilution refrigerator, Krinner et al. 2019'
  - name: qubit capacity demonstrated
    value: '50'
    unit: qubits
    note: 'demonstrated; ~150 estimated possible ignoring space constraints'
priority: P1
qdayImpact: 1
qdayReasoning: 'Cryogenic engineering is a hard constraint on superconducting qubit scaling. Progress here directly bounds how fast fault-tolerant machines can grow, so improvements accelerate the path to cryptographically relevant hardware. Scored +1 because the constraint is real but active industrial effort is clearly making progress.'
horizon: 1
novelty: incremental
evidence:
  claim: 'Krinner et al. (ETH Zurich, EPJ Quantum Technology 2019): a thermally optimised, extensible dilution refrigerator cabling scheme supports operation of ~50 qubits at 14 mK, with analysis showing up to ~150 qubits feasible before space constraints dominate. The passive and active heat loads of all cable types are measured and validated.'
  verified: '2026-08-08'
  level: E4
  sources:
    - url: https://epjquantumtechnology.springeropen.com/articles/10.1140/epjqt/s40507-019-0072-0
      role: primary
      title: Engineering cryogenic setups for 100-qubit scale superconducting circuit systems
      publisher: EPJ Quantum Technology
      date: '2019-05-28'
      identifier: 'EPJ Quantum Technology 6, 2 (2019)'
      doi: 10.1140/epjqt/s40507-019-0072-0
      accessed: '2026-08-08'
      note: 'Open access. ETH Zurich / Wallraff group. Peer-reviewed engineering measurement.'
links:
  - to: arch-superconducting
    relation: enables
  - to: enable-control-electronics
    relation: depends-on
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Dilution refrigerators are the enabling infrastructure for superconducting qubit platforms. The ETH Zurich 2019 study — a systematic engineering measurement rather than a physics experiment — characterises how passive conduction and active signal dissipation through coaxial cables load each temperature stage of a commercial dilution refrigerator. It validates a thermally optimised design capable of hosting ~50 qubits at 14 mK, with ~150 qubits estimated to be feasible before the physical cabling volume becomes the binding constraint. The paper remains the canonical engineering reference for cryogenic wiring design at processor scale.
