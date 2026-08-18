---
schema: frontier/v1
id: enable-control-electronics
title: Cryogenic control electronics
summary: 'Integrated circuits operating at cryogenic temperatures (4 K or below) to control and read out qubits inside dilution refrigerators, reducing wiring complexity and latency compared to room-temperature electronics.'
plain: 'Superconducting qubits operate at temperatures near absolute zero inside dilution refrigerators. Controlling them traditionally requires thousands of cables running from room temperature down to the cold chip — a bottleneck that limits how many qubits can be controlled. Cryogenic CMOS chips that operate at the 4 K stage of the refrigerator can sit close to the qubits, drastically reducing this wiring problem. Underwood et al. (2024) demonstrated a 14 nm FinFET CMOS chip at 4 K that successfully drove a two-qubit gate on superconducting transmons.'
pillar: quantum
constellation: enabling
readiness: demonstrated
cluster: hardware-stack
actors:
  - IBM Research
country:
  - US
horizon: 2
novelty: first cryo-CMOS ASIC used to demonstrate a two-qubit gate
priority: P1
qdayImpact: 1
qdayReasoning: 'Cryogenic control electronics are a necessary enabling condition for scaling superconducting quantum computers beyond a few hundred qubits. Without them, the wiring bottleneck prevents scale-up. Progress here contributes to the overall trajectory toward a CRQC but cannot by itself advance Q-Day.'
metrics:
  - name: 'Controller temperature'
    value: '4'
    unit: 'K'
    note: 'Thermally anchored to 4 K stage of dilution refrigerator'
  - name: 'Power per qubit'
    value: '23'
    unit: 'mW'
    note: 'Under active control'
  - name: 'Single-qubit gate error'
    value: '8e-4'
    note: 'From randomized benchmarking'
  - name: 'Two-qubit gate error'
    value: '1.4e-2'
    note: 'Cross-resonance gate via cryo-CMOS control'
links:
  - to: arch-superconducting
    relation: enables
  - to: enable-cryogenics
    relation: depends-on
evidence:
  claim: 'Underwood et al. (2024) demonstrated a 14 nm FinFET cryo-CMOS ASIC thermally anchored at 4 K inside a dilution refrigerator, generating qubit control waveforms and driving a two-qubit cross-resonance gate between fixed-frequency transmon qubits. Single-qubit gate error was 8×10⁻⁴ and two-qubit gate error was 1.4×10⁻², measured by randomized benchmarking. Power dissipation was 23 mW per qubit under active control.'
  level: E4
  verified: '2026-08-16'
  sources:
    - url: https://link.aps.org/doi/10.1103/PRXQuantum.5.010326
      role: primary
      title: 'Using Cryogenic CMOS Control Electronics to Enable a Two-Qubit Cross-Resonance Gate'
      publisher: PRX Quantum
      date: '2024-02-14'
      identifier: 'PRX Quantum 5, 010326 (2024)'
      doi: 10.1103/PRXQuantum.5.010326
      accessed: '2026-08-08'
      note: 'Underwood et al.; IBM Research; preprint arXiv:2302.11538'
    - url: https://arxiv.org/abs/2505.08424
      role: corroborating
      title: 'CMOS-Compatible, Wafer-Scale Processed Superconducting Qubits Exceeding Energy Relaxation Times of 200us'
      publisher: arXiv
      date: '2025-05-13'
      identifier: 'arXiv:2505.08424'
      doi: 10.48550/arXiv.2505.08424
      accessed: '2026-08-16'
      note: 'Mayer et al., Fraunhofer EMFT / TU Munich. 200mm CMOS-compatible fabrication; 99.7% JJ yield; T1 up to 100 µs median, individual devices approaching 200 µs. Corroborates the manufacturing feasibility context for cryo-integrated control. Preprint, not peer-reviewed.'
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-16'
  note: PRX Quantum 5, 010326 confirmed via APS DOI, IBM Research publications page, and NASA/ADS. Underwood et al., IBM Watson Research Center. 14 nm FinFET CMOS ASIC at 4 K, cross-resonance gate on fixed-frequency transmons, 23 mW/qubit, single-qubit error 8×10⁻⁴, two-qubit error 1.4×10⁻², all confirmed from IBM Research abstract and ADS record. E4 correct for peer-reviewed PRX Quantum. No changes.
  reviewedOn: '2026-08-18'
---

Superconducting transmon qubits live inside dilution refrigerators cooled to millikelvin temperatures. Controlling them has traditionally required thousands of cables routed from room-temperature electronics — a wiring problem that grows worse as qubit counts increase. One solution is to place the control electronics inside the refrigerator itself. IBM Research demonstrated a 14 nm CMOS chip that operates at 4 K, generating the microwave pulses needed to control transmon qubits and successfully performing a two-qubit gate. The chip consumed just 23 mW per qubit and achieved gate errors comparable to room-temperature control systems, showing that cryogenic integration is feasible.
