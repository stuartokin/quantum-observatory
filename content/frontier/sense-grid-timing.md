---
schema: frontier/v1
id: sense-grid-timing
title: Timing assurance for grid protection
summary: 'Power-grid phasor measurement units depend on GPS timing. Quantum time-synchronisation protocols have been proposed and demonstrated in the lab but a 2026 critical assessment concludes they will not replace classical methods near-term.'
plain: 'The electricity grid uses GPS-synchronised clocks to keep its sensors — called phasor measurement units — in step across thousands of kilometres. If GPS is jammed or spoofed, protection systems can trip incorrectly or miss faults. Quantum timing, which uses entangled photons or quantum-key-distribution correlations to synchronise clocks, has been proposed as a more secure alternative. Laboratory demonstrations exist, but a 2026 critical assessment found that time transfer — getting the precision of a quantum clock from one place to another — remains two to three orders of magnitude short of what is needed, and that deploying quantum timing across 1,800+ PMU sites in North America alone is impractical with current technology. The realistic near-term path is GPS backup via fibre-based timing, not quantum networks.'
pillar: quantum
constellation: sensing
readiness: emerging
actors:
  - QUBITRIUM B.V.
  - Karlsruhe Institute of Technology
country:
  - NL
  - DE
metrics:
  - name: Best demonstrated quantum time-transfer uncertainty
    value: '2.46'
    unit: ps
    note: 'Krelina et al. 2026: two to three orders of magnitude short of what optical clock distribution requires'
  - name: PMU timing requirement (IEEE C37.118.1, 60 Hz grid)
    value: '2.6'
    unit: µs (maximum TVE 1%)
    note: Travelling-wave fault location requires 100 ns accuracy
priority: P2
qdayImpact: 0
horizon: 3
novelty: incremental
evidence:
  claim: 'Krelina et al. (arXiv:2604.10243, April 2026) critically assess quantum time-synchronisation protocols for infrastructure use cases including power grids. They find that time transfer, not clock performance, is the bottleneck, with the best demonstrated synchronisation uncertainty (2.46 ps) falling two to three orders of magnitude short of optical clock requirements. They conclude quantum timing will not replace classical methods near-to-medium term; near-term value is in physical-layer security at a small number of critical nodes connected to quantum networks, not grid-wide deployment.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://arxiv.org/abs/2604.10243
      role: preprint
      title: 'Quantum Protocols for Time Synchronisation and Distribution: A Critical Assessment'
      publisher: arXiv
      date: '2026-04-11'
      identifier: 'arXiv:2604.10243 [quant-ph]'
      doi: 10.48550/arXiv.2604.10243
      accessed: '2026-08-08'
      note: 'Krelina, Tefek, Seskir, Durak (QUBITRIUM B.V. / KIT). 24-page assessment; conclusion is cautionary for near-term grid deployment.'
confidence: high
status: published
links:
  - to: sense-optical-clock
    relation: depends-on
  - to: quantum-sensing-grid
    relation: evidence-for
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

The primary source is cautionary: quantum timing cannot practically replace GPS-based grid synchronisation in the near-to-medium term. Readiness correctly stays at emerging. The paper is a preprint (E3); no independent replication has been found. The board item may be slightly badly framed — the risk being addressed is GPS spoofing vulnerability, not quantum sensing capability per se; a better frame might be "GPS-independent timing for grid protection".
