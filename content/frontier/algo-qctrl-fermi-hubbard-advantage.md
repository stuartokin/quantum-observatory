---
schema: frontier/v1
id: algo-qctrl-fermi-hubbard-advantage
title: 'Q-CTRL 120-qubit Fermi-Hubbard simulation: contested advantage claim'
summary: 'Q-CTRL ran 1D Fermi-Hubbard dynamics on a 120-qubit IBM processor and claimed 3000x wall-clock speedup over classical TDVP. Two independent groups have since reproduced the result classically, one at bond dimension 32.'
plain: 'Q-CTRL used IBM quantum hardware and its own error-suppression software to simulate how electrons move through a 1D material (the Fermi-Hubbard model). Using 120 qubits, it completed the simulation in about two minutes and claimed this was 3000 times faster than the best classical alternative. Two independent groups subsequently reproduced the same outputs using classical tensor-network methods on GPU clusters, one of them with a bond dimension of just 32 — far smaller than Q-CTRL used for its classical benchmark. The advantage claim is now contested.'
pillar: quantum
constellation: algorithms
cluster: classical-advantage-narrowing
readiness: emerging
confidence: low
priority: P1
qdayImpact: 0
qdayReasoning: 'Physics simulation result on a NISQ device. No cryptographic circuit is involved. Does not change resources needed to break RSA-2048 or elliptic-curve cryptography.'
actors:
  - 'Q-CTRL (Los Angeles / Sydney)'
  - 'IBM Quantum'
country:
  - US
  - AU
novelty: 'Contested advantage claim — two independent classical counters within three months'
horizon: 2
metrics:
  - name: 'Qubit count'
    value: '120'
    unit: 'physical qubits'
    note: '1D Fermi-Hubbard, L=60 sites via efficient mapping'
  - name: 'Claimed speedup'
    value: '3000'
    unit: 'x wall-clock vs TDVP at chi=4096'
    note: 'Classical benchmark used bond dimension 4096 on CPU cluster; subsequently surpassed classically'
  - name: 'Trotter steps (62-qubit run)'
    value: '90'
    unit: 'steps'
    note: 'Spin-charge separation observed to t=9 natural units'
  - name: 'Classical counter bond dimension (Ouyang et al.)'
    value: '32'
    unit: 'chi'
    note: 'Transverse tensor-network contraction reproduces all 7260 observable trajectories'
links:
  - to: algo-classical-fermi-hubbard-ouyang
    relation: competes-with
  - to: algo-quantum-simulation
    relation: evidence-for
  - to: app-quantum-materials-advantage
    relation: competes-with
evidence:
  claim: 'Hartnett et al. (Q-CTRL, arXiv:2605.04025, May 2026) report digital quantum simulation of 1D Fermi-Hubbard dynamics on a superconducting IBM processor using up to 120 qubits and up to 90 Trotter steps, with error suppression via Fire Opal. They claim a 3000x wall-clock speedup over TDVP at bond dimension chi=4096 on a CPU cluster. Rausch et al. (arXiv:2606.04771, Multiverse Computing, Jun 2026) counter by exploiting full SU(2)xU(1) symmetry and GPU acceleration, reaching chi~62,000 on four H200 GPUs and reproducing the experiment classically; Q-CTRL acknowledged this in v2 (Jul 2026). Ouyang, Chi & Chan (arXiv:2608.13805, Caltech, Aug 2026) counter using transverse tensor-network contraction at bond dimension 32, reproducing all 7260 observable trajectories faster and more accurately than the quantum hardware run. The advantage claim is not established.'
  level: E3
  verified: '2026-08-18'
  sources:
    - url: 'https://arxiv.org/abs/2605.04025'
      role: primary
      title: 'Fast, accurate, high-resolution simulation of large-scale Fermi-Hubbard models on a digital quantum processor'
      publisher: arXiv
      date: '2026-05-05'
      identifier: 'arXiv:2605.04025'
      doi: '10.48550/arXiv.2605.04025'
      accessed: '2026-08-18'
      note: 'v2 updated 2026-07-15 to acknowledge Rausch et al. classical counter. All authors at Q-CTRL (US/AU). Preprint, not yet peer-reviewed.'
    - url: 'https://arxiv.org/abs/2606.04771'
      role: corroborating
      title: 'Pushing the Classical Frontier of 1D Fermi-Hubbard Quench Dynamics Beyond Current Quantum Simulations'
      publisher: arXiv
      date: '2026-06-03'
      identifier: 'arXiv:2606.04771'
      doi: '10.48550/arXiv.2606.04771'
      accessed: '2026-08-18'
      note: 'Rausch et al., Multiverse Computing and Donostia IPC. GPU-accelerated TDVP at chi~62,000 on 4 H200 GPUs, fifteen times Q-CTRL classical benchmark. Preprint.'
    - url: 'https://arxiv.org/abs/2608.13805'
      role: corroborating
      title: 'Fast classical simulation of Fast, accurate, high-resolution simulation of large-scale Fermi-Hubbard models on a digital quantum processor'
      publisher: arXiv
      date: '2026-08-13'
      identifier: 'arXiv:2608.13805'
      doi: '10.48550/arXiv.2608.13805'
      accessed: '2026-08-18'
      note: 'Ouyang, Chi, Chan (Caltech). Transverse tensor-network contraction at bond dimension 32 reproduces all 7260 quantum experiment trajectories faster and more accurately.'
status: draft
origin: agent
added: '2026-08-18'
review:
  state: agent-reviewed
  by: agent
  agent: steward
  agentMergedOn: '2026-08-18'
  reviewedOn: '2026-08-18'
  note: 'Steward review 2026-08-18. E3 correct for three preprints (arXiv:2605.04025, arXiv:2606.04771, arXiv:2608.13805). Confidence low correct: two independent classical counter-papers from different groups using different methods reproduce the quantum result. qdayImpact 0 correct: 1D Fermi-Hubbard dynamics on a NISQ device has no cryptanalytic relevance. Readiness emerging correct: the advantage claim is contested, not the physics. No downward corrections needed. The Q-CTRL paper (primary source) is itself a preprint and the countered claim; citing it as primary with counters as corroborating is the correct structure per the 2026-08-18 precedent on classical-counter items.'
---

## What happened

In May 2026, Q-CTRL (in collaboration with IBM hardware) published a preprint reporting 1D Fermi-Hubbard dynamics simulated on a 120-qubit superconducting processor using Fire Opal error suppression. The key claim: a 3000× wall-clock speedup over classical TDVP at bond dimension χ=4096 running on a CPU cluster. The physics observed — spin-charge separation to t=9 natural units in a 62-qubit run — is genuine and non-trivial. The advantage framing rested entirely on the choice of classical baseline.

## Why the claim is contested

Two independent groups subsequently reproduced the result classically:

- **Rausch et al.** (Multiverse Computing, Jun 2026, arXiv:2606.04771) exploited the full SU(2)×U(1) symmetry of the Fermi-Hubbard Hamiltonian and added GPU support, reaching bond dimensions up to χ≈62,000 on four NVIDIA H200 GPUs — about fifteen times the Q-CTRL classical benchmark. The Q-CTRL team acknowledged this in their v2 update (July 2026).

- **Ouyang, Chi & Chan** (Caltech, Aug 2026, arXiv:2608.13805) used a transverse tensor-network contraction method where a bond dimension of just 32 suffices to reproduce all 7,260 observable trajectories from the quantum experiment, faster and with higher accuracy, and extend to longer evolution times.

## Previous state of the art

Before Rausch et al. and Ouyang et al., the community benchmark for 1D Fermi-Hubbard dynamics was standard TDVP without GPU acceleration or symmetry exploitation, consistent with Q-CTRL's choice of χ=4096 on CPUs.

## Limitations and caveats

All three papers are preprints. The Q-CTRL result on spin-charge separation physics is not disputed; what is disputed is whether quantum hardware provides a genuine computational advantage over optimised classical methods for this regime. The 62-qubit, 90-Trotter-step run (t=9) has not been specifically addressed by the Ouyang et al. transverse method — only the 120-qubit, 30-step run at t=6 is explicitly countered there. Rausch et al. reach the high-entanglement regime Q-CTRL's own classical benchmark could not converge.

## What would change this assessment

Peer review of any of the three papers. A response from Q-CTRL showing that the Ouyang method does not converge on the 62-qubit spin-charge separation regime at t=9. Demonstration of a regime where both classical counters fail while the quantum result remains accurate.
