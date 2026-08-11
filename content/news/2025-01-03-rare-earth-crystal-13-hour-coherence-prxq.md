---
schema: news/v1
id: 2025-01-03-rare-earth-crystal-13-hour-coherence-prxq
headline: 'Rare-earth crystal sets 13.1-hour nuclear spin coherence record in PRX Quantum, opening satellite quantum memory pathway'
pillar: quantum
date: '2025-01-03'
plain: 'Quantum memories for networks lose their stored information quickly; the previous record in any system suitable for optical quantum memory was six hours. A team from Australian National University, Caltech and collaborators has now measured 13.1 hours of coherence in a praseodymium-doped crystal cooled to 125 mK, and separately demonstrated six hours at 6 K — a temperature achievable with compact single-stage cryocoolers rather than dilution refrigerators. The paper identifies this as sufficient to physically transport memory crystals between distant sites for entanglement distribution, and notes the 6 K result as a practical precursor to satellite-compatible quantum memory nodes.'
significance: notable
source:
  url: https://journals.aps.org/prxquantum/abstract/10.1103/PRXQuantum.6.010302
  kind: paper
  title: 'Nuclear Spins in a Solid Exceeding 10-Hour Coherence Times for Ultra-Long-Term Quantum Storage'
  publisher: PRX Quantum
  date: '2025-01-03'
  doi: 10.1103/PRXQuantum.6.010302
validation:
  status: verified
  checks:
    - 'PRX Quantum abstract and result section opened directly: 13.1 h figure appears in the results, 6 h at 6 K stated as secondary result'
    - 'Prior record of 6 hours (Zhong et al. Nature 2015) confirmed in the paper''s own citations, making this a genuine doubling'
    - 'Authors include Sellars and Bartholomew from Australian National University, the group that held the prior record — cross-institutional but not fully independent verification'
    - 'No contradicting experimental report found'
about:
  - comms-quantum-memory
  - comms-quantum-repeater
  - entanglement-distribution
establishedBy:
  - url: https://arxiv.org/abs/2412.02475
    title: 'Nuclear Spins in a Solid Exceeding 10-Hour Coherence Times for Ultra-Long-Term Quantum Storage'
    relation: reports
    date: '2024-12'
actors:
  - Australian National University
  - Caltech
country:
  - AU
  - US
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-11'
status: published
added: '2026-08-11'
---

The paper distinguishes two operating regimes. At 125 mK (dilution refrigerator), the team suppressed dephasing from magnetic impurities to reach 13.1 hours; they further show that operating on a spectrally narrow subensemble extends this to over 18 hours. At 6 K, achievable with single-stage cryocoolers, they demonstrated 6 hours — practical for portable and space-based deployment.

The result has two distinct implications. First, 13 hours of coherence is long enough to physically carry the crystal from one node to another for entanglement swapping — an unusual mode of quantum networking but technically credible at these coherence times. Second, the 6 K result means the hardware requirement drops to commercially available cryocoolers, removing the dilution refrigerator as an obstacle to satellite payloads.

What remains unproven: the crystal stores coherence but demonstrating a complete quantum memory cycle — write, store, and read an arbitrary quantum state with high fidelity — at these timescales has not yet been shown. The 13-hour figure is a coherence time, not a memory efficiency figure. The gap between coherence time and memory system performance is the next engineering challenge.
