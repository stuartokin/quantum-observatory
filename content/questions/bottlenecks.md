---
schema: question/v1
id: bottlenecks
number: 3
question: Has any known bottleneck become easier or harder?
pillar: quantum
answer: 'The cryogenic wiring and control bottleneck eased materially: HRL Laboratories demonstrated in Nature (29 July 2026) a silicon QPU running error correction with a cryogenic CMOS controller at 4 K, with no real-time room-temperature input — the first autonomous cryogenic control demonstration. The physical-to-logical qubit overhead remains the binding constraint for fault-tolerant computation; qLDPC codes (bivariate bicycle, IBM) reduce this but have not changed the order of magnitude. Real-time decoding speed improved to sub-microsecond latency (multiple groups). Magic state distillation overhead is being reduced algorithmically. Algorithm-side: Gidney 2025 reduced the resource cost of Shor at RSA-2048 scale by a factor of twenty with no hardware change.'
state: moving
asOf: '2026-08-14'
lastChanged: '2026-08-14'
changedBy: HRL Nature paper (29 Jul 2026) demonstrating autonomous cryogenic error correction; Gidney 2025 reducing Shor resource cost.
evidence:
  - ref: enable-cryo-cmos-qubit-control
    kind: frontier
    note: HRL result extends this area; Nature paper July 2026.
  - ref: qec-realtime-decoding
    kind: frontier
    note: Sub-microsecond decoding now demonstrated by multiple groups.
  - ref: qec-qldpc-bivariate-bicycle
    kind: frontier
    note: Reduces physical-to-logical qubit overhead but bottleneck remains.
  - ref: algo-resource-estimation
    kind: frontier
    note: Gidney 2025 reduces the resource cost of breaking RSA by a factor of twenty.
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-14'
status: draft
added: '2026-08-14'
---

The most concrete bottleneck reduction is in cryogenic control electronics: HRL's Nature result shows it is physically possible to run error correction entirely inside the cryostat, which removes the thermal and wiring complexity of running thousands of control lines from room temperature. The qubit overhead problem — needing hundreds to thousands of physical qubits per logical qubit — remains unsolved at scale but is being attacked by qLDPC codes and improved magic state techniques. On the algorithmic side, Gidney 2025 shows that some of the apparent distance between today's machines and cryptanalytic capability was in the resource estimation, not the hardware.
