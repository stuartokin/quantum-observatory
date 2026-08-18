---
schema: frontier/v1
id: algo-classical-fermi-hubbard-ouyang
title: 'Classical tensor-network simulation defeats IBM Fermi-Hubbard quantum advantage claim'
summary: 'Caltech team reproduces all observables from a 120-qubit IBM Fermi-Hubbard quantum simulation using transverse tensor-network contraction at bond dimension 32, faster and more accurately than the hardware. A second independent counter from Multiverse Computing reached the same conclusion via GPU-accelerated TDVP.'
plain: 'Q-CTRL ran a simulation of a physics model called the 1D Fermi-Hubbard model on an IBM quantum processor using 120 qubits, claiming the quantum hardware was 3,000 times faster than the best classical method they tested. Researchers at Caltech then showed that a simpler classical tensor-network algorithm, needing only a bond dimension of 32, could reproduce every measurement from the quantum experiment faster and more accurately, and reach longer simulation times. A second independent group at Multiverse Computing reached the same conclusion using a different classical method. The quantum advantage claim does not hold for this circuit.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: classical-advantage-narrowing
actors:
  - 'Xiao-Yu Ouyang (Caltech)'
  - 'Runze Chi (Caltech)'
  - 'Garnet Kin-Lic Chan (Caltech)'
country:
  - US
horizon: 2
priority: P1
novelty: 'Second independent classical defeat of Q-CTRL/IBM Fermi-Hubbard advantage claim; bond dimension 32 sufficient.'
metrics:
  - name: 'Classical bond dimension sufficient to match quantum experiment'
    value: '32'
    unit: 'bond dimension'
    note: 'transverse tensor-network contraction; quantum experiment used 120 qubits'
  - name: 'Observable trajectories reproduced'
    value: '7260'
    unit: 'trajectories'
    note: 'all trajectories from Q-CTRL/IBM hardware run reproduced more quickly and accurately'
qdayImpact: 0
links:
  - to: algo-quantum-simulation
    relation: competes-with
  - to: app-quantum-materials-advantage
    relation: competes-with
  - to: algo-classical-fe4s4-advantage
    relation: evidence-for
  - to: algo-classical-femoco
    relation: evidence-for
evidence:
  level: E3
  verified: '2026-08-18'
  claim: Ouyang, Chi, and Chan (arXiv:2608.13805, Caltech, 13 Aug 2026) study Neel quench dynamics of the 1D Fermi-Hubbard model run on an IBM superconducting processor (arXiv:2605.04025, Hartnett et al., Q-CTRL/IBM, May 2026). They demonstrate that all 7,260 observable trajectories from the quantum experiment can be reproduced more quickly and accurately by transverse tensor-network contraction at bond dimension 32, and extended to longer times than the hardware simulation. A prior counter-paper (arXiv:2606.04771, Rausch et al., Multiverse Computing, Jun 2026) used GPU-accelerated TDVP at bond dimension approx 62,000 to reproduce Q-CTRL results including the previously unresolved high-entanglement regime, and advanced the classical frontier to t=7, beyond the quantum run at t=6. The Q-CTRL source (arXiv:2605.04025) is a preprint not present as a standalone board item.
  sources:
    - url: https://arxiv.org/abs/2608.13805
      role: primary
      title: Fast classical simulation of Fast, accurate, high-resolution simulation of large-scale Fermi-Hubbard models on a digital quantum processor
      publisher: arXiv
      date: '2026-08-13'
      identifier: arXiv:2608.13805
      accessed: '2026-08-18'
      note: Caltech (Chan group). Transverse tensor-network contraction at bond dimension 32 reproduces all observables from Q-CTRL/IBM 120-qubit Fermi-Hubbard run faster and more accurately, extending to longer times. Preprint; E3.
    - url: https://arxiv.org/abs/2605.04025
      role: corroborating
      title: Fast, accurate, high-resolution simulation of large-scale Fermi-Hubbard models on a digital quantum processor
      publisher: arXiv
      date: '2026-05-05'
      identifier: arXiv:2605.04025
      accessed: '2026-08-18'
      note: Q-CTRL/IBM experiment being classically countered. 120 qubits, claimed 3000x speedup over TDVP at bond dimension 4096 on CPU cluster. Preprint; E3 at most. Included here as the target of arXiv:2608.13805 and arXiv:2606.04771.
    - url: https://arxiv.org/abs/2606.04771
      role: corroborating
      title: Pushing the Classical Frontier of 1D Fermi-Hubbard Quench Dynamics Beyond Current Quantum Simulations
      publisher: arXiv
      date: '2026-06-03'
      identifier: arXiv:2606.04771
      accessed: '2026-08-18'
      note: Rausch, Singh, Jahromi, Kshetrimayum, Orús; Multiverse Computing (Spain/Canada) and Donostia International Physics Center. GPU-accelerated TDVP exploiting U(1)×SU(2) symmetry; bond dimension ~62,000 on four NVIDIA H200 GPUs (15x Q-CTRL classical baseline). Reproduces Q-CTRL results including high-entanglement regime t∈[5.2,6] where Q-CTRL benchmark failed; advances classical frontier to t=7 beyond quantum run at t=6. Prior independent counter to arXiv:2608.13805 using a different method. Preprint; E3.
confidence: medium
status: draft
origin: agent
added: '2026-08-18'
review:
  state: agent-reviewed
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-18'
  reviewedOn: '2026-08-18'
  note: 'Focus run 2026-08-18. Added arXiv:2606.04771 (Rausch et al., Multiverse Computing, Jun 2026) as corroborating source. Method: GPU-accelerated TDVP at χ≈62,000 on 4× H200 GPUs; reproduces Q-CTRL high-entanglement regime and advances classical frontier to t=7 beyond quantum t=6. Distinct from arXiv:2608.13805 (Ouyang, transverse TN at BD=32). Stale ''Sourcer run queued'' note resolved. E3 correct; preprint, not peer-reviewed. No other changes.'
---

## What happened

Q-CTRL ran a 1D Fermi-Hubbard simulation on an IBM superconducting quantum processor using up to 120 qubits, claiming the quantum hardware completed the L=60 evolution to time t=6 in under three minutes while the best classical tensor-network method they tested (TDVP at bond dimension 4,096 on a CPU cluster) required over 160 hours and failed to converge in the most demanding regime. They described this as a 3,000× quantum speedup.

Ouyang, Chi, and Chan at Caltech (arXiv:2608.13805, 13 Aug 2026) applied transverse tensor-network contraction to the same problem. Bond dimension 32 — far below Q-CTRL's classical baseline of 4,096 — suffices to reproduce all 7,260 observable trajectories from the quantum experiment faster, more accurately, and at longer simulation times than the hardware.

## Why it matters

Bond dimension 32 is modest classical computation. If it matches or beats a 120-qubit quantum processor on this task, the advantage claim collapses. This is the second independent classical defeat: Rausch et al. (arXiv:2606.04771, Multiverse Computing, Jun 2026) had already used GPU-accelerated TDVP at bond dimension ~62,000 to cover the high-entanglement regime Q-CTRL's classical benchmark left unresolved, pushing the classical frontier to t=7 — beyond the quantum experiment's t=6. The two counters use completely different methods, making the classical result robust. The pattern is consistent with algo-classical-femoco and algo-classical-fe4s4-advantage: classical algorithms are actively closing the gap across multiple quantum simulation domains.

## Previous state of the art

Q-CTRL's TDVP benchmark at bond dimension 4,096 was the explicit comparison point. The quantum hardware outperformed that specific classical configuration. Whether stronger classical methods existed was open at the time of publication.

## Limitations

Both counter-papers are preprints. The Q-CTRL paper (arXiv:2605.04025) is also a preprint. The 1D Fermi-Hubbard model with these parameters may have structure that tensor networks exploit especially well; harder instances — 2D models, larger system sizes, different parameter regimes — could behave differently.

## What would change the assessment

If peer review identifies an error in the Ouyang or Rausch classical simulations, or if Q-CTRL demonstrates advantage on a circuit that both classical methods provably fail, the picture changes. As it stands, this task is not a credible quantum advantage benchmark.
