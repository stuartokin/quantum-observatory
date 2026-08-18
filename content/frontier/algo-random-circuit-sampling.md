---
schema: frontier/v1
id: algo-random-circuit-sampling
title: Random circuit sampling
summary: Sampling the output distribution of random quantum circuits has been used to demonstrate quantum computational advantage over classical supercomputers.
plain: Random circuit sampling (RCS) is a benchmark task in which a quantum processor applies a randomly chosen sequence of quantum gates and measures the result. The distribution of outputs is provably hard to reproduce classically at scale. It is not a useful computation — no problem is solved — but it is evidence that a quantum processor is doing something a classical machine cannot efficiently replicate. The USTC Zuchongzhi 3.0 processor completed an RCS task in seconds that would take the world's fastest supercomputer an estimated 5.9 billion years.
pillar: quantum
readiness: demonstrated
constellation: algorithms
actors:
  - University of Science and Technology of China (USTC)
  - Chinese Academy of Sciences
country:
  - CN
metrics:
  - name: qubits used in RCS experiment
    value: "83"
    unit: qubits
    note: 32-cycle RCS on Zuchongzhi 3.0 (105-qubit chip)
  - name: estimated classical runtime on Frontier supercomputer
    value: "5.9e9"
    unit: years
    note: Classical cost to replicate 10^6 RCS samples; from PRL paper
  - name: single-qubit gate fidelity
    value: "99.90"
    unit: "%"
  - name: two-qubit gate fidelity
    value: "99.62"
    unit: "%"
links:
  - to: arch-superconducting
    relation: depends-on
  - to: crqc
    relation: competes-with
evidence:
  claim: The Zuchongzhi 3.0 superconducting processor (105 qubits) completed an 83-qubit, 32-cycle random circuit sampling task — generating one million samples in a few hundred seconds — that would require approximately 5.9 × 10^9 years for the Frontier supercomputer, placing its classical simulation cost six orders of magnitude beyond prior Google experiments.
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://link.aps.org/doi/10.1103/PhysRevLett.134.090601
      role: primary
      title: Establishing a New Benchmark in Quantum Computational Advantage with 105-qubit Zuchongzhi 3.0 Processor
      publisher: Physical Review Letters
      date: '2025-03-03'
      doi: 10.1103/PhysRevLett.134.090601
      identifier: Phys. Rev. Lett. 134, 090601 (2025)
      accessed: '2026-08-08'
    - url: https://arxiv.org/abs/2412.11924
      role: preprint
      title: Establishing a New Benchmark in Quantum Computational Advantage with 105-qubit Zuchongzhi 3.0 Processor
      publisher: arXiv
      date: '2024-12-16'
      identifier: arXiv:2412.11924
      accessed: '2026-08-08'
      note: 'Preprint version; states 6.4 × 10^9 years. Published PRL paper revised to 5.9 × 10^9 years; PRL figure is authoritative.'
confidence: high
status: published
priority: P2
qdayImpact: 0
qdayReasoning: RCS demonstrates quantum advantage on a contrived sampling problem that has no cryptographic relevance. It does not scale to Shor's algorithm; the circuits are random and shallow, not the deep, structured circuits needed for factoring. Progress here does not accelerate Q-Day.
horizon: 2
novelty: largest RCS quantum advantage margin to date
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-18'
  note: 'PRL 134, 090601 confirmed via APS abstract page and ADS record. 5.9×10^9 yr figure confirmed from published paper (ADS: arXiv preprint said 6.4×10^9, PRL revised to 5.9×10^9 — already documented in item). 83-qubit, 32-cycle, 10^6 samples in hundreds of seconds confirmed. E4 correct. No changes.'
---

Random circuit sampling is the leading experimental demonstration of quantum computational advantage: quantum hardware completing a specific task faster than any classical computer. The current state of the art is USTC's Zuchongzhi 3.0 (105 physical qubits), which in a peer-reviewed Physical Review Letters paper (March 2025) reported generating one million samples from an 83-qubit, 32-cycle random circuit in seconds — a task estimated to require 5.9 billion years on the Frontier supercomputer. This places the classical simulation cost six orders of magnitude beyond earlier Google experiments. The caveat is important: RCS is specifically designed to favour quantum hardware, and improvements in classical tensor-network algorithms have repeatedly narrowed claimed advantages. Furthermore, RCS does not constitute a cryptographically relevant computation. Demonstrating quantum advantage on a random circuit does not translate to running Shor's algorithm.
