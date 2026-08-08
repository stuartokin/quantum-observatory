---
schema: frontier/v1
id: enable-control-electronics
title: Cryogenic control electronics
summary: Integrated circuits that operate inside the dilution refrigerator, co-located with qubits, replacing the forest of room-temperature cables that currently limit qubit count.
plain: Every qubit today is controlled by electronics sitting at room temperature, connected by a cable that runs down into the fridge. At a million qubits, you cannot run a million cables — the heat they carry would overwhelm the refrigerator. Cryogenic control electronics solve this by putting the control chips right next to the qubits at millikelvin temperatures, replacing thousands of cables with a handful of digital signals.
pillar: quantum
readiness: demonstrated
constellation: enabling
actors:
  - Intel
  - TU Delft
  - Bluefors
  - IBM
  - QuTech
country:
  - NL
  - US
horizon: 2
priority: P1
qdayImpact: 1
qdayReasoning: Cryogenic control electronics are a prerequisite for scaling to the qubit counts a CRQC requires. Demonstrated at small scale but not yet integrated into large processors; removing the wiring bottleneck is necessary but not sufficient for Q-Day acceleration.
evidence:
  claim: Xue et al. (Nature 2021) demonstrated a cryo-CMOS chip at 3 K driving silicon spin qubits at 20 mK with coherent qubit control. Van Staveren et al. (IEEE TQE 2025) demonstrated cryo-CMOS bias electronics operating directly at the millikelvin stage co-located with semiconductor spin qubits, using a 22-nm FinFET process.
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/s41586-021-03469-4
      role: primary
      title: CMOS-based cryogenic control of silicon quantum circuits
      publisher: Nature
      date: '2021-05-12'
      identifier: 'Nature 593, 205–210 (2021)'
      doi: 10.1038/s41586-021-03469-4
      accessed: '2026-08-08'
      note: Xue et al. — Intel/TU Delft/QuTech. Cryo-CMOS chip at 3 K driving Si spin qubits at 20 mK; demonstrated coherent control and simple algorithms.
    - url: https://ieeexplore.ieee.org/document/11009741
      role: primary
      title: Millikelvin Cryo-CMOS System for Large-Scale Semiconductor Spin-Qubit Quantum Processors
      publisher: IEEE Transactions on Quantum Engineering
      date: '2025-07-01'
      identifier: 'IEEE TQE, doi:10.1109/TQE.2025.3580377'
      doi: 10.1109/TQE.2025.3580377
      accessed: '2026-08-08'
      note: Van Staveren et al. (TU Delft / Bluefors / Intel). Cryo-CMOS DAC and demultiplexer in 22-nm FinFET operating at mK stage co-located with spin qubits; reduces room-temperature wiring from O(N) to O(1).
metrics:
  - name: Operating temperature (Xue 2021)
    value: '3'
    unit: K
    note: Cryo-CMOS chip stage; qubits at 20 mK
  - name: Power per qubit under active control (IBM PRX Quantum 2024)
    value: '23'
    unit: mW
    note: IBM cryogenic CMOS at 4 K stage, PRX Quantum 5, 010326 (2024)
links:
  - to: arch-silicon-spin
    relation: enables
  - to: arch-superconducting
    relation: enables
  - to: enable-cryogenics
    relation: depends-on
confidence: high
status: published
moved:
  from: experimental
  on: '2026-08-08'
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Cryogenic control electronics have advanced from room-temperature prototypes to chips co-located with qubits at millikelvin. The 2021 Nature paper (Xue et al.) was the first demonstration of coherent qubit control from a cryo-CMOS chip at 3 K; the 2025 IEEE TQE paper (van Staveren et al.) pushed integration to the millikelvin stage itself. Both results are peer-reviewed experimental demonstrations, justifying readiness **demonstrated**. The remaining challenge is scaling from a handful of controlled qubits to the thousands needed for fault-tolerant computation without violating the refrigerator's cooling budget.
