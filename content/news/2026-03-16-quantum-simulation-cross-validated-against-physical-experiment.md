---
schema: news/v1
id: 2026-03-16-quantum-simulation-cross-validated-against-physical-experiment
headline: 'Two independent teams cross-validate quantum simulation results against real laboratory measurements of magnetic materials'
pillar: quantum
date: '2026-03-16'
plain: 'Quantum computers are supposed to simulate nature better than classical computers. In March 2026, two independent groups showed for the first time that they actually match real experimental data from physical samples — not by beating a supercomputer on a benchmark, but by agreeing with a physical laboratory. IBM and Oak Ridge researchers used a Heron superconducting processor to compute the energy spectrum of a magnetic crystal (KCuF3) and found strong agreement with neutron scattering measurements at the Spallation Neutron Source at Oak Ridge. Separately, Pasqal used a 256-qubit neutral-atom processor to simulate TmMgGaO4, a frustrated magnet, matching susceptibility measurements on real crystals and accessing dynamics beyond what classical computers can simulate. Both results are preprints as of the run date and are not yet peer-reviewed. The milestone is the cross-validation against physical experiment rather than against another calculation — Nature flagged both preprints on March 30 as representing this milestone for the first time.'
significance: notable
source:
  url: https://arxiv.org/abs/2603.15608
  kind: preprint
  title: 'Benchmarking quantum simulation with neutron-scattering experiments'
  publisher: arXiv
  date: '2026-03-16'
corroboration:
  - url: https://arxiv.org/abs/2603.20372
    publisher: arXiv (Pasqal)
    kind: preprint
  - url: https://www.nature.com/articles/d41586-026-00959-1
    publisher: Nature News
    kind: journalism
  - url: https://newsroom.ibm.com/2026-03-26-ibm-quantum-computer-accurately-simulates-real-magnetic-materials,-reproducing-national-laboratory-data
    publisher: IBM Newsroom
    kind: vendor
validation:
  status: verified
  checks:
    - 'arXiv:2603.15608 opened directly; submitted March 16, 2026; authors include IBM Quantum, Oak Ridge National Laboratory, Purdue, Los Alamos'
    - 'arXiv:2603.20372 opened directly; Pasqal team, 256-qubit Rydberg simulator, magnetisation curves match susceptibility measurements on TmMgGaO4 crystals'
    - 'Nature News article (March 30, 2026) independently identifies both preprints as the same milestone'
    - 'C&EN independently reports the IBM result with a methodological caution: starting state prepared classically at 80-85% fidelity before quantum processor takes over'
    - 'Not the same as the 2025-06-25 RIKEN/IBM iron-sulfur result, which was a simulation beyond classical diagonalization — this is cross-validation against physical experiment'
  note: 'Both preprints are arXiv only as of 2026-08-10. Item should be revisited if either reaches a peer-reviewed journal.'
about:
  - algo-quantum-simulation
  - arch-neutral-atom
  - arch-superconducting
establishedBy:
  - url: https://arxiv.org/abs/2603.15608
    title: 'Benchmarking quantum simulation with neutron-scattering experiments'
    relation: reports
    date: '2026-03-16'
  - url: https://arxiv.org/abs/2603.20372
    title: 'One-to-one quantum simulation of a frustrated magnet with 256 qubits'
    relation: reports
    date: '2026-03-16'
actors: [IBM, Oak Ridge National Laboratory, Purdue University, Los Alamos National Laboratory, Pasqal]
country: [US, FR]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The IBM/ORNL team focused on KCuF3, a canonical one-dimensional magnetic system with a well-measured neutron scattering spectrum. Using up to 50 qubits on an IBM Heron processor within a quantum-classical hybrid workflow, they computed dynamical structure factors that matched the experimental spectrum across multiple metrics. A classical simulation was shown for comparison; the quantum simulation matched experimental data more closely in the physically relevant regime.

The Pasqal group took an analogue approach: mapping TmMgGaO4's effective Hamiltonian onto a 256-qubit Rydberg atom array in a one-to-one correspondence, then measuring magnetisation curves that agreed quantitatively with susceptibility measurements on single crystals. They also accessed non-equilibrium dynamics after a sudden quench — a regime where entanglement growth places the problem beyond classical simulation reach.

Both groups are careful not to claim quantum advantage in the computational sense. The IBM workflow requires a classical starting state at 80–85% fidelity before quantum processing begins. The Pasqal result is analogue simulation, not gate-based computation. What is new is the experimental benchmark itself: quantum simulation output agreed with a physical laboratory rather than with another calculation.
