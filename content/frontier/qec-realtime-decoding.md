---
schema: frontier/v1
id: qec-realtime-decoding
title: Real-time syndrome decoding
summary: Correcting errors faster than they accumulate.
plain: Error correction works by constantly measuring hints about what went wrong and calculating the fix. If that calculation is slower than the errors arrive, you never catch up and the whole scheme fails. It is an ordinary classical computing problem that gates whether any of the quantum hardware can actually be used.
pillar: quantum
constellation: error-correction
readiness: experimental
actors:
  - Google Quantum AI
  - Quantinuum
  - IBM
metrics:
  - name: Sparse Blossom throughput (distance-17 surface code, single CPU core)
    value: <1
    unit: µs per syndrome round
    note: Higgott and Gidney, Quantum 9, 1600 (2025). Mean 0.62 µs/round; 97.4% of shots decoded below 1 µs at 0.1% circuit-level noise. Matches 1 µs QEC cycle rate of superconducting hardware at d=17. Processes both X and Z bases.
  - name: Collision Clustering FPGA latency (881-qubit surface code)
    value: '810'
    unit: ns per shot
    note: Barber et al., Nature Electronics 8, 84-91 (2025). Xilinx Ultrascale+ XCVU3P FPGA; uses 4.5% of available logic LUTs and 10 KB memory. Decoding frequency above 1 MHz.
  - name: Collision Clustering ASIC latency (1057-qubit surface code)
    value: '240'
    unit: ns per shot
    note: Barber et al., Nature Electronics 8, 84-91 (2025). 12 nm FinFET ASIC process node; 0.06 mm² area, 8 mW power consumption. Designed for cryogenic integration.
  - name: Google Willow real-time decoder latency (distance-5)
    value: '63'
    unit: µs average
    note: Nature 638, 920-926 (2025). Averaged over one million cycles of a d=5 surface code below-threshold experiment. Sparse Blossom variant with parallelisation.
  - name: Requirement
    value: within one QEC cycle
    note: slower decoding means corrections arrive too late
evidence:
  claim: 'Higgott and Gidney (Quantum 9, 1600, Jan 2025) demonstrate Sparse Blossom, a variant of the minimum-weight perfect matching decoder that processes syndrome data for both X and Z bases of a distance-17 surface code in mean 0.62 µs per round on a single CPU core at 0.1% circuit-level depolarising noise — 97.4% of shots decoded below the 1 µs syndrome generation rate of superconducting hardware. Barber et al. (Nature Electronics 8, 84-91, Jan 2025) demonstrate the Collision Clustering decoder on FPGA and ASIC: FPGA decodes an 881-qubit surface code in 810 ns (above 1 MHz) using 4.5% of available logic LUTs; a 12 nm FinFET ASIC decodes a 1,057-qubit surface code in 240 ns at 0.06 mm² and 8 mW — within cryogenic power budgets. The Google Willow below-threshold experiment (Nature 638, 920-926, 2025) confirmed real-time decoding in a functioning system at 63 µs average latency at distance-5 over one million cycles. IBM''s Relay-BP preprint (arXiv:2506.01779) argues improved belief propagation is sufficient for real-time decoding of bivariate-bicycle qLDPC quantum memory. Together these results establish that real-time decoding is tractable for surface codes and high-rate qLDPC codes at scales up to ~1,000 physical qubits; scaling to millions of physical qubits required for a CRQC remains an open engineering challenge.'
  verified: '2026-08-19'
  level: E4
  sources:
    - url: https://quantum-journal.org/papers/q-2025-01-20-1600/
      role: primary
      title: 'Sparse Blossom: correcting a million errors per core second with minimum-weight matching'
      publisher: Quantum
      date: '2025-01-20'
      identifier: 'Quantum 9, 1600 (2025)'
      doi: 10.22331/q-2025-01-20-1600
      accessed: '2026-08-19'
      note: Higgott and Gidney (Google Quantum AI). Peer-reviewed. Mean 0.62 µs/round for d-17 surface code at 0.1% noise; 97.4% of shots decoded below 1 µs on a single CPU core. Open-source PyMatching v2.
    - url: https://www.nature.com/articles/s41928-024-01319-5
      role: corroborating
      title: A real-time, scalable, fast and resource-efficient decoder for a quantum computer
      publisher: Nature Electronics
      date: '2025-01-07'
      identifier: 'Nat. Electron. 8, 84-91 (2025)'
      doi: 10.1038/s41928-024-01319-5
      accessed: '2026-08-19'
      note: 'Barber et al. (Quantinuum/Riverlane). Peer-reviewed. Collision Clustering decoder: FPGA decodes 881-qubit surface code in 810 ns (>1 MHz) at 4.5% LUT usage; ASIC decodes 1,057-qubit surface code in 240 ns at 0.06 mm² and 8 mW. Preprint arXiv:2309.05558.'
    - url: https://www.nature.com/articles/s41586-024-08449-y
      role: corroborating
      title: Quantum error correction below the surface code threshold
      publisher: Nature
      date: '2025-01-01'
      identifier: 'Nature 638, 920-926 (2025)'
      doi: 10.1038/s41586-024-08449-y
      accessed: '2026-08-11'
      note: 'Google Willow. Real-time decoding at distance-5: 63 µs average latency across one million cycles. Confirms real-time operation in a functioning below-threshold experiment.'
    - url: https://arxiv.org/abs/2506.01779
      role: corroborating
      title: Improved belief propagation is sufficient for real-time decoding of quantum memory
      publisher: arXiv
      date: '2025-06-02'
      identifier: arXiv:2506.01779
      accessed: '2026-08-19'
      note: IBM Quantum (Müller, Alexander, Beverland et al.). Relay-BP decoder for bivariate-bicycle and surface codes. Preprint; not peer-reviewed. v2 revised 2025-08-22.
links:
  - to: qec-qldpc-bivariate-bicycle
    relation: enables
  - to: enable-control-electronics
    relation: depends-on
  - to: qec-below-threshold-surface-code
    relation: enables
priority: P1
horizon: 2
qdayImpact: 1
qdayReasoning: 'Decoding speed was a plausible hard blocker; evidence it is tractable removes a source of delay.'
country:
  - US
  - UK
review:
  state: agent-reviewed
  by: agent
  agent: steward
  agentMergedOn: '2026-08-19'
  reviewedOn: '2026-08-19'
  note: 'Steward review 2026-08-19. Sparse Blossom (Quantum 9, 1600) and Collision Clustering (Nature Electronics 8, 84-91) confirmed as peer-reviewed primaries sourced by the issue #145 sourcer run. Mean 0.62 µs/round at d=17, 97.4% below 1 µs, 810 ns FPGA (881 qubits), 240 ns ASIC (1057 qubits) all consistent with sourcer summary. Google Willow 63 µs at d=5 retained from prior reviewer pass. E4 correct. No corrections needed.'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
