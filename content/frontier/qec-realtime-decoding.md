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
    note: Higgott and Gidney, Quantum 9, 1600 (2025). Matches 1 µs QEC cycle rate of superconducting hardware at 0.1% circuit-level noise. Processes both X and Z bases.
  - name: Collision Clustering decoder speed (FPGA, up to 881-qubit surface code)
    value: MHz
    unit: decoding speed
    note: Barber et al., Nature Electronics 8, 84-91 (2025). Matches superconducting qubit cycle rate up to 881-qubit surface code on FPGA; 1,057-qubit on ASIC.
  - name: Collision Clustering ASIC power and area
    value: 8 mW / 0.06 mm²
    unit: ''
    note: Barber et al., Nature Electronics 8, 84-91 (2025). Enables cryogenic-compatible decoder integration.
  - name: Requirement
    value: within one QEC cycle
    note: slower decoding means corrections arrive too late
evidence:
  claim: Higgott and Gidney (Quantum 9, 1600, Jan 2025) demonstrate Sparse Blossom, a variant of the minimum-weight perfect matching decoder that processes syndrome data for both X and Z bases of a distance-17 surface code in under 1 µs per syndrome round on a single CPU core — matching the syndrome generation rate of superconducting quantum processors at 0.1% circuit-level noise. Barber et al. (Nature Electronics 8, 84-91, Jan 2025) demonstrate the Collision Clustering decoder on FPGA and ASIC hardware, achieving MHz decoding speed matching superconducting qubit cycle rates up to 881-qubit surface codes on FPGA and 1,057-qubit surface codes on ASIC; the ASIC occupies 0.06 mm² and consumes 8 mW. IBM's Relay-BP preprint (arXiv:2506.01779) argues improved belief propagation is sufficient for real-time decoding of bivariate-bicycle qLDPC quantum memory. Together these results establish that real-time decoding is tractable for surface codes and high-rate qLDPC codes at scales up to ~1,000 physical qubits; scaling to millions of physical qubits required for a CRQC remains an open engineering challenge.
  verified: '2026-08-19'
  level: E4
  sources:
    - url: https://quantum-journal.org/papers/q-2025-01-20-1600/
      role: primary
      title: 'Sparse Blossom: correcting a million errors per core second with minimum-weight matching'
      publisher: Quantum
      date: '2025-01-20'
      identifier: Quantum 9, 1600 (2025)
      doi: 10.22331/q-2025-01-20-1600
      accessed: '2026-08-19'
      note: Higgott and Gidney (Google Quantum AI). Peer-reviewed. Distance-17 surface code decoded in under 1 µs per round on a single CPU core, matching 1 µs superconducting QEC cycle at 0.1% noise. Open-source PyMatching v2.
    - url: https://www.nature.com/articles/s41928-024-01319-5
      role: corroborating
      title: A real-time, scalable, fast and resource-efficient decoder for a quantum computer
      publisher: Nature Electronics
      date: '2025-01-07'
      identifier: Nat. Electron. 8, 84-91 (2025)
      doi: 10.1038/s41928-024-01319-5
      accessed: '2026-08-19'
      note: 'Barber et al. (Quantinuum). Peer-reviewed. Collision Clustering decoder on FPGA and ASIC: MHz decoding speed up to 881-qubit (FPGA) and 1,057-qubit (ASIC) surface codes. ASIC: 0.06 mm², 8 mW. Preprint arXiv:2309.05558.'
    - url: https://www.nature.com/articles/s41586-024-08449-y
      role: corroborating
      title: Quantum error correction below the surface code threshold
      publisher: Nature
      date: '2025-01-01'
      identifier: Nature 638, 920-926 (2025)
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
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-19'
  note: Focus run 2026-08-19. Added Sparse Blossom (Quantum 9, 1600, 2025; E4) and Collision Clustering (Nature Electronics 8, 84-91, 2025; E4) as primary and corroborating sources with quantitative throughput and latency figures. Evidence level raised from prior state to E4 on strength of two peer-reviewed experimental papers. Metrics added. Google Willow and IBM Relay-BP preprint retained. Actors and country updated.
confidence: high
status: published
added: '2026-08-04'
origin: human
---
