---
schema: frontier/v1
id: arch-trapped-ion
title: Trapped-ion QCCD
summary: 'Ions shuttled between zones in a vacuum trap. Highest gate fidelities and all-to-all connectivity; slower clock speed. Peer-reviewed Nature paper (Ransford et al. 2026) confirms 99.921% two-qubit gate fidelity on 98-qubit Helios.'
plain: 'Individual charged atoms held still in a vacuum by electric fields and manipulated with lasers. Every atom is identical, which makes them exceptionally accurate, and any one can be moved next to any other. The drawback is speed: physically shuttling atoms takes time, so operations are slower than rival approaches. Quantinuum''s Helios processor achieved 99.921% two-qubit gate fidelity across all 98 qubits — the highest reported for a commercial system — validated independently by Sandia National Laboratories under a DOE cooperative agreement.'
pillar: quantum
constellation: architectures
readiness: adopted
actors:
  - Quantinuum
  - Sandia National Laboratories
metrics:
  - name: Physical qubits (Helios)
    value: '98'
    unit: qubits
    note: 'barium-137 hyperfine qubits; all-to-all connectivity via rotatable ion storage ring'
  - name: Two-qubit gate fidelity
    value: '99.921'
    unit: '%'
    note: 'Average infidelity 7.9(2)×10⁻⁴ across all operational zones; Ransford et al. Nature 655 (2026)'
  - name: Single-qubit gate fidelity
    value: '99.9975'
    unit: '%'
    note: 'Average infidelity 2.5(1)×10⁻⁵; Ransford et al. Nature 655 (2026)'
  - name: SPAM fidelity
    value: '99.967'
    unit: '%'
    note: 'Average infidelity 3.3(5)×10⁻⁴; Ransford et al. Nature 655 (2026)'
evidence:
  claim: 'Ransford et al. (Quantinuum and Sandia National Laboratories, Nature 655, 81-86, June 2026) report Helios, a 98-qubit trapped-ion QCCD processor using 137Ba+ hyperfine qubits with all-to-all connectivity. Averaged over all operational zones, average infidelities are 2.5(1)×10⁻⁵ for single-qubit gates, 7.9(2)×10⁻⁴ for two-qubit gates, and 3.3(5)×10⁻⁴ for SPAM. Sandia National Laboratories evaluated and verified the system under a DOE CRADA. Separate preprint (Dasu et al., arXiv:2602.22211) shows 48 error-corrected logical qubits from the same hardware using iceberg codes at 2:1 overhead. Montanez-Barrera and Michielsen (Jülich Supercomputing Centre, arXiv:2604.26423, April 2026) independently benchmark Helios-1 using LR-QAOA on the JUPITER exascale supercomputer, confirming coherent performance to 93 qubits (12,834 two-qubit gates).'
  verified: '2026-08-17'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-026-10676-4
      role: primary
      title: 'A 98-qubit trapped-ion quantum computer with all-to-all connectivity'
      publisher: Nature
      date: '2026-06-17'
      identifier: 'Nature 655, 81-86 (2026)'
      doi: 10.1038/s41586-026-10676-4
      accessed: '2026-08-17'
      note: 'Ransford et al.; Quantinuum and Sandia National Laboratories. Peer-reviewed. Sandia co-authored and independently verified fidelity figures under DOE CRADA (renewed May 2026). Infidelities confirmed: 2.5(1)×10⁻⁵ (1Q), 7.9(2)×10⁻⁴ (2Q), 3.3(5)×10⁻⁴ (SPAM). Epub June 17 2026.'
    - url: https://arxiv.org/abs/2511.05465
      role: preprint
      title: 'Helios: A 98-qubit trapped-ion quantum computer'
      publisher: arXiv
      date: '2025-11-07'
      identifier: 'arXiv:2511.05465'
      doi: 10.48550/arXiv.2511.05465
      accessed: '2026-08-17'
      note: 'Preprint version; SPAM figure in preprint (4.8(6)×10⁻⁴) differs slightly from published paper (3.3(5)×10⁻⁴). Published figures are authoritative.'
    - url: https://arxiv.org/abs/2604.26423
      role: corroborating
      title: 'Large-Scale Quantum Circuit Simulation on an Exascale System for QPU Benchmarking'
      publisher: arXiv
      date: '2026-04-29'
      identifier: 'arXiv:2604.26423'
      doi: 10.48550/arXiv.2604.26423
      accessed: '2026-08-17'
      note: 'Montanez-Barrera, Michielsen; Jülich Supercomputing Centre (JSC), Forschungszentrum Jülich, Germany. Preprint, not peer-reviewed. Independent external benchmark of Helios-1 using LR-QAOA on JUPITER exascale supercomputer (4,096 nodes, 16,384 GH200 superchips). Noiseless classical simulations to 48 qubits confirm noise-tolerant regime; experimental extension identifies coherent performance to 93 qubits (12,834 two-qubit gates), beyond which outputs become statistically noise-dominated.'
links:
  - to: arch-superconducting
    relation: competes-with
  - to: arch-neutral-atom
    relation: competes-with
  - to: qec-realtime-decoding
    relation: depends-on
  - to: enable-fabrication
    relation: depends-on
moved:
  from: demonstrated
  on: '2026-07-02'
priority: P1
horizon: 1
qdayImpact: 1
qdayReasoning: 'A 2:1 physical-to-logical overhead in a commercial system (demonstrated in separate iceberg-code work on the same hardware, Dasu et al. arXiv:2602.22211) is far below usual surface-code assumptions (~1000:1), though at small absolute qubit count. The hardware paper itself (Ransford et al.) confirms the underlying gate fidelities that make this possible.'
country:
  - US
confidence: high
status: published
added: '2026-08-04'
origin: human
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-17'
  note: 'Added arXiv:2604.26423 (Montanez-Barrera, Michielsen; Jülich Supercomputing Centre, April 2026) as corroborating source per focus instruction 2026-08-17. Independent external benchmarking of Helios-1: coherent performance confirmed to 93 qubits (12,834 two-qubit gates) on JUPITER exascale. Preprint, E3 on its own; E4 held on Ransford et al. Nature 655 primary.'
---

Trapped-ion QCCD (quantum charge-coupled device) computers confine individual charged atoms in a vacuum using electric fields, manipulate them with lasers, and physically shuttle ions between operational zones to implement two-qubit gates between any pair. The all-to-all connectivity is a fundamental architectural advantage over nearest-neighbour platforms.

Quantinuum's Helios processor uses 137Ba⁺ hyperfine qubits — a switch from the ytterbium ions of earlier H-series machines — with a rotatable ion storage ring connecting two quantum operation regions. Ransford et al. (Nature 655, June 2026) report average two-qubit gate infidelity of 7.9(2)×10⁻⁴ (99.921% fidelity) across all operational zones. Single-qubit infidelity is 2.5(1)×10⁻⁵ (99.9975%). These figures were evaluated and verified by Sandia National Laboratories under a long-standing DOE Cooperative Research and Development Agreement — making this one of the few commercial quantum computing results with explicit independent institutional verification in the published paper.

A separate preprint (Dasu et al., arXiv:2602.22211) demonstrates that the same hardware achieves 48 error-corrected logical qubits at a 2:1 physical-to-logical overhead using iceberg codes, enabled by the all-to-all connectivity that allows the global stabilizer measurements these codes require.

An independent external benchmark by Montanez-Barrera and Michielsen (Jülich Supercomputing Centre, arXiv:2604.26423, April 2026) used LR-QAOA circuits on the JUPITER exascale supercomputer to characterise the regime of coherent performance on Helios-1. Classical noiseless simulations on up to 4,096 nodes confirm the noise-tolerant regime to 48 qubits; experimental extension without classical reference identifies coherent performance maintained to 93 qubits (12,834 two-qubit gates), beyond which outputs at 95 qubits become statistically indistinguishable from random sampling.
