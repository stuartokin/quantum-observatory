---
schema: frontier/v1
id: enable-seqc-chiplet-compiler
title: 'SEQC: hierarchical compiler for modular quantum chiplet architectures'
summary: 'SEQC replaces O(n²) monolithic compilation with parallel O(k²) elaboration over k-qubit chiplets, yielding 9.3–32.3% average fidelity gains and 1.34–3.27× speedup over a chiplet-unaware Qiskit baseline on IBM Quantum hardware.'
plain: 'Quantum compilers today treat a processor as one large block, which becomes extremely slow and inaccurate as machines grow bigger. SEQC instead splits a quantum circuit into pieces that fit each chiplet module, compiles each piece in parallel, then stitches the results together. It only does the expensive layout step once per architecture, reusing it across runs. Tested on real IBM Quantum hardware, it produced meaningfully more accurate circuits and compiled them faster than the standard Qiskit tool, which does not know about chiplet boundaries.'
pillar: quantum
readiness: emerging
constellation: enabling
cluster: compilers
actors:
  - Northwestern University
  - MIT Lincoln Laboratory
country:
  - US
metrics:
  - name: average circuit fidelity increase
    value: '9.3–32.3'
    unit: '%'
    note: 'Depends on chiplet size and topology; max 49.99–63.36%. From arXiv:2501.08478v5 abstract.'
  - name: compilation speedup vs chiplet-unaware Qiskit
    value: '1.34–3.27'
    unit: '×'
    note: 'Average; up to 3.37–6.74× max. From arXiv:2501.08478v5 abstract.'
links:
  - to: enable-compilers
    relation: competes-with
  - to: enable-nqac-hamiltonian-compiler-drug-design
    relation: competes-with
  - to: arch-superconducting
    relation: depends-on
evidence:
  claim: 'Jeng et al. (Northwestern / MIT Lincoln Laboratory, DOE SQMS Center) propose SEQC, a hierarchical parallelized compilation pipeline for chiplet-based modular quantum systems. SEQC stratifies a source circuit once per architecture (O(n²) step, done once) then elaborates each chiplet subcircuit in parallel (O(k²) per chiplet) before each execution. The paper reports 9.3–32.3% average increase in circuit fidelity (max 49.99–63.36%, depending on chiplet size and topology) and 1.34–3.27× average compilation speedup (max 3.37–6.74×) over a chiplet-unaware Qiskit baseline, validated on IBM Quantum hardware. The paper is accepted at IEEE QCE26 (QSYS track, session 296, Wednesday 15:00–16:30, Toronto, September 2026); proceedings not yet published as of 2026-08-18.'
  level: E3
  verified: '2026-08-18'
  sources:
    - url: https://arxiv.org/abs/2501.08478
      role: preprint
      title: 'SEQC: Stratify-Elaborate Quantum Compilation Towards Modular Hybrid Architectures'
      publisher: arXiv
      date: '2026-07-30'
      identifier: arXiv:2501.08478v5
      accessed: '2026-08-18'
      note: 'v5 (30 Jul 2026) is the current version, likely camera-ready for QCE26. Accepted at IEEE QCE26 QSYS track per published schedule PDF. Proceedings not yet on IEEE Xplore; raise to E4 when DOI is available.'
    - url: https://qce.quantum.ieee.org/2026/wp-content/uploads/sites/13/2026/08/QCE26-Technical-Papers-Schedule-V101.pdf
      role: corroborating
      title: QCE26 Technical Papers Schedule V101
      publisher: IEEE Quantum Week 2026
      date: '2026-08-18'
      accessed: '2026-08-18'
      note: 'Confirms SEQC acceptance in session QSYS::296::790::791 (Modular Architectures & Communication-Aware Compilation), 3-WED 15:00-16:30, room 713A.'
confidence: medium
status: draft
origin: agent
priority: P2
qdayImpact: 0
qdayReasoning: 'Compilation tooling for modular quantum architectures does not change the resources needed to break RSA-2048 or deployed elliptic-curve cryptography. The speedup is in classical compilation overhead, not in cryptanalytic circuit depth or qubit count.'
novelty: 'Architecture-aware compiler; new method'
horizon: 2
added: '2026-08-18'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-18'
---

## SEQC: compiler for modular quantum chiplet architectures

**What happened.** Jeng, Maruszewski, Lau, Selna, Gavrincea, Smith and Hardavellas (Northwestern; Gavrincea also MIT Lincoln Laboratory; funded partly by DOE SQMS) built a compiler that treats a modular quantum processor as a collection of chiplets rather than one monolithic device. The compiler runs a one-time stratification step that assigns subcircuits to chiplets, then re-runs a much cheaper elaboration step per execution. The result is that the expensive O(n²) allocation problem for an n-qubit machine becomes several parallel O(k²) problems for k-qubit chiplets.

**Why it matters.** Every known modular architecture proposal — including IBM's multi-chip roadmap and any future superconducting chiplet system — will require compilation that handles inter-chiplet links with differing gate sets, latencies and fidelities. Today's standard tools (Qiskit) are unaware of this structure. SEQC is the first published system to address it with a hierarchical pipeline, and it is accepted at the leading quantum engineering conference.

**Previous state of the art.** Qiskit's transpiler applies a single global routing pass, treating all qubit links as equivalent. This scales poorly as qubit count grows and ignores the heterogeneity of inter-chiplet connections.

**Limitations.** Results are measured on IBM Quantum hardware with simulated chiplet partitions, not on a production multi-chip system (none yet exists at scale). Fidelity gains depend strongly on chiplet topology — the 9.3% figure is the low-end average; the 32.3% applies to larger, more favourable topologies. The paper remains a preprint; proceedings publish after QCE26 (September 2026).

**What would change the assessment.** Publication of IEEE proceedings raises this to E4. Independent implementation on non-IBM hardware (e.g., neutral-atom or trapped-ion multi-module systems) would confirm generality. A production multi-chip processor would turn this from a projection into a direct measurement.
