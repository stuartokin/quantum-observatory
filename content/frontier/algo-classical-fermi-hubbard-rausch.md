---
schema: frontier/v1
id: algo-classical-fermi-hubbard-rausch
title: 'GPU-accelerated TDVP certifies Q-CTRL Fermi-Hubbard run and advances classical frontier to t=7'
summary: 'Multiverse Computing and Donostia IPC exploit U(1)×SU(2) symmetry with GPU-accelerated TDVP at bond dimension χ≈62,000 on four NVIDIA H200s to certify the Q-CTRL/IBM 120-qubit Fermi-Hubbard simulation across t∈[0,6] — including the previously unresolved high-entanglement regime — and extend the classical frontier to t=7, beyond the quantum run. At comparable bond dimension the GPU implementation completes in ~100 minutes, reducing the claimed 3000× quantum speedup to ~36×.'
plain: 'Quantum advantage claims require showing that a quantum processor outperforms the best possible classical method, not a suboptimal one. The Q-CTRL team ran 120-qubit Fermi-Hubbard dynamics on an IBM processor in under three minutes and compared it against a classical simulation that took over 160 hours — claiming a 3000× speedup. But that classical baseline used a well-known algorithm (TDVP) without two available improvements: GPU hardware and exploitation of the physical symmetries of the problem. Rausch et al. applied both, reaching a bond dimension of ~62,000 on four NVIDIA H200 GPUs — fifteen times larger than Q-CTRL''s baseline. At this level the classical method fully converges across the entire simulation window, including the high-entanglement region t∈[5.2,6] that Q-CTRL''s own classical benchmark failed to resolve. When run at comparable bond dimension (χ≈4,880), the GPU implementation finishes in ~100 minutes rather than 160 hours, which the authors calculate revises the quantum advantage from 3000× to ~36× against bare QPU time. The classical simulation also extends to t=7, beyond the quantum hardware''s reach at t=6. This certifies that the hardware results are correct while showing they are not yet beyond classical reach.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: classical-advantage-narrowing
actors:
  - 'Multiverse Computing'
  - 'Donostia International Physics Center'
horizon: 2
priority: P1
confidence: medium
qdayImpact: 0
country:
  - ES
  - CA
novelty: 'GPU-symmetry TDVP reduces claimed 3000× Fermi-Hubbard advantage to ~36×; classical frontier extended to t=7.'
metrics:
  - name: 'Maximum bond dimension'
    value: '~62000'
    note: 'χ≈62,000 on four NVIDIA H200 GPUs; fifteen times Q-CTRL classical baseline of χ=4096'
  - name: 'Classical frontier extended to'
    value: '7'
    unit: 'natural hopping units'
    note: 'Beyond quantum hardware run at t=6; certified via convergence across χ≈40,000–62,000'
  - name: 'Revised quantum speedup at comparable bond dimension'
    value: '~36'
    unit: 'times'
    note: 'At χ≈4,880; original Q-CTRL claim was ~3000×'
  - name: 'GPU runtime at comparable bond dimension'
    value: '~100'
    unit: 'minutes'
    note: 'vs >160 hours for ITensor CPU baseline at χ=4096'
links:
  - to: algo-qctrl-fermi-hubbard-advantage
    relation: competes-with
  - to: algo-classical-fermi-hubbard-ouyang
    relation: competes-with
evidence:
  claim: 'Rausch et al. (arXiv:2606.04771, 3 June 2026) use GPU-accelerated TDVP exploiting U(1)×SU(2) symmetry at bond dimension χ≈62,000 on four NVIDIA H200 GPUs — fifteen times larger than Q-CTRL''s classical baseline of χ=4096 — to classically certify the Q-CTRL/IBM 120-qubit (L=60) Fermi-Hubbard quench dynamics across t∈[0,6], including the high-entanglement regime t∈[5.2,6] that Q-CTRL''s own CPU-based classical benchmark could not resolve. At comparable bond dimension (χ≈4,880) the GPU implementation completes in ~100 minutes — a ~100× speedup over the ITensor CPU baseline — which the authors calculate revises the claimed 3000× quantum advantage to ~36× against bare QPU time. The paper extends the classical frontier to t=7, beyond the quantum hardware run at t=6; convergence is verified across χ≈40,000–62,000. Beyond t=7 bond-dimension spread grows and the authors do not certify the dynamics. Distinct from arXiv:2608.13805 (Ouyang et al., Caltech), which uses a transverse tensor-network method at bond dimension 32 and is already on the board as algo-classical-fermi-hubbard-ouyang.'
  verified: '2026-08-18'
  level: E3
  sources:
    - url: 'https://arxiv.org/abs/2606.04771'
      role: preprint
      title: 'Pushing the Classical Frontier of 1D Fermi-Hubbard Quench Dynamics Beyond Current Quantum Simulations'
      publisher: arXiv
      date: '2026-06-03'
      identifier: 'arXiv:2606.04771 [quant-ph]'
      accessed: '2026-08-18'
      note: 'Preprint from Multiverse Computing and Donostia IPC. No journal record found as of access date. Cited by arXiv:2608.13805 (Ouyang, Caltech) and acknowledged in v2 of arXiv:2605.04025 (Q-CTRL/IBM).'
    - url: 'https://arxiv.org/abs/2605.04025'
      role: corroborating
      title: 'Fast, accurate, high-resolution simulation of large-scale Fermi-Hubbard models on a digital quantum processor'
      publisher: arXiv
      date: '2026-05-07'
      identifier: 'arXiv:2605.04025 [quant-ph]'
      accessed: '2026-08-18'
      note: 'The Q-CTRL/IBM quantum simulation preprint whose advantage claim is contested. v2 (July 2026) acknowledges Rausch et al. and notes their results certify the hardware outputs.'
status: draft
origin: agent
added: '2026-08-18'
review:
  state: agent-reviewed
  by: agent
  agent: steward
  agentMergedOn: '2026-08-18'
  reviewedOn: '2026-08-18'
  note: 'Steward review 2026-08-18. arXiv:2606.04771 confirmed as preprint from Multiverse Computing (Spain/Canada) and Donostia IPC. E3 correct for preprint primary source. Confidence medium correct: single independent classical counter using GPU-TDVP with symmetry exploitation; not yet peer-reviewed. qdayImpact 0 correct: 1D Fermi-Hubbard dynamics, no cryptanalytic relevance. Readiness emerging correct: advantage claim contested, not the physics. Country ES (Donostia, Spain) and CA (Multiverse Computing, Canada) correct. All metrics consistent with arXiv abstract. No downward corrections needed.'
---

## What happened

The Q-CTRL team (arXiv:2605.04025) ran Fermi-Hubbard quench dynamics on a 120-qubit IBM processor, completing an L=60 evolution to t=6 in under three minutes. They compared this against a classical TDVP simulation at bond dimension χ=4096 that required over 160 hours on a CPU cluster and failed to converge in the high-entanglement regime t∈[5.2,6]. On this basis they claimed a ~3000× quantum speedup.

Rausch et al. (Multiverse Computing, Donostia IPC) applied two improvements absent from Q-CTRL's classical baseline: exploitation of the full U(1)×SU(2) symmetry of the Fermi-Hubbard Hamiltonian, and GPU-accelerated tensor contractions on four NVIDIA H200 GPUs. This enabled bond dimensions up to χ≈62,000 — fifteen times larger than Q-CTRL's baseline. At this level the classical simulation achieves fully converged results across the entire t∈[0,6] window, certifying the quantum hardware results. At comparable bond dimension (χ≈4,880) the GPU implementation runs in ~100 minutes, which the authors calculate revises the quantum speedup from ~3000× to ~36×. The classical frontier is further extended to t=7, beyond the quantum hardware's reach.

## Why it matters

A quantum advantage claim is only as strong as the classical baseline it beats. This paper shows that a symmetry-aware GPU implementation — using commodity hardware available now — closes the gap Q-CTRL's advantage claim rested on. This is the second independent classical counter-result to this specific claim (alongside arXiv:2608.13805, Ouyang et al., Caltech, which uses a different transverse tensor-network method at bond dimension 32). Together they provide independent evidence from distinct methods that the 1D Fermi-Hubbard benchmark at current scale does not demonstrate quantum advantage.

## Previous state of the art

Q-CTRL's own classical baseline (ITensor, CPU cluster, χ=4096, >160 hours) was the comparison point. The high-entanglement regime t∈[5.2,6] was unresolved classically before this work.

## Limitations

Beyond t=7 bond-dimension spread grows and the authors do not certify the dynamics. The result is a preprint (E3); it has not been peer-reviewed. The revised ~36× speedup figure is at the lower bond dimension (χ≈4,880), not at full χ≈62,000.

## What would change this assessment

Peer review and independent replication would raise this to E4/E5. A demonstration that quantum hardware scales to L>60 or t>7 in a regime where GPU-TDVP cannot follow would restore the advantage claim. Conversely, if GPU-TDVP generalises to 2D geometries or disorder, the classical frontier advances further.
