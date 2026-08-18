---
schema: frontier/v1
id: algo-ftqc-ising-crossover
title: 'Fault-tolerant quantum dynamics simulation: concrete crossover resource estimate'
summary: 'Preprint derives a full-stack resource estimate placing the quantum-classical crossover for mixed-field Ising dynamics at ~370,000 physical qubits and ~2 hours for a 100-site 1D system at p=10⁻³, benchmarked against best classical tensor-network and VMC algorithms.'
plain: 'A team spanning Oxford, Queen Mary London, Chinese Academy of Sciences, University of Hong Kong, Peking University and Tsinghua has calculated how large a fault-tolerant quantum computer would need to be before it outperforms the best classical algorithms for simulating a paradigmatic quantum physics problem. Their answer — roughly 370,000 physical qubits, running for about two hours — is the first full-stack estimate of this crossover point derived under realistic hardware assumptions. The calculation is theoretical; no hardware has been run.'
pillar: quantum
constellation: algorithms
cluster: resource-estimation
readiness: emerging
horizon: 2
priority: P1
qdayImpact: 0
qdayReasoning: 'This paper concerns fault-tolerant simulation of quantum physics, not cryptanalytic circuits. It does not address RSA or elliptic-curve key sizes, and provides no information about the resources needed to run Shor''s algorithm. Q-Day impact is 0.'
confidence: medium
novelty: 'First full-stack resource estimate for FTQC physics-simulation crossover'
country:
  - GB
  - CN
  - HK
actors:
  - Jinzhao Sun (Queen Mary University of London / University of Oxford)
  - Xiao Yuan (Peking University)
  - Pan Zhang (Chinese Academy of Sciences)
  - Pei Zeng (University of Hong Kong)
metrics:
  - name: physical qubits at crossover
    value: '3.7e5'
    unit: qubits
    note: '100-site 1D mixed-field Ising, p=10⁻³ physical error rate'
  - name: runtime at crossover
    value: '~2'
    unit: hours
    note: 'Quantum runtime at crossover; tensor-network classical cost exceeds this'
  - name: system size
    value: '100'
    unit: sites
    note: '1D chain; crossover occurs at modest system sizes'
  - name: physical error rate assumed
    value: '1e-3'
    unit: dimensionless
    note: 'Same p=10⁻³ assumption used in Gidney 2505.15917'
links:
  - to: algo-resource-estimation
    relation: competes-with
  - to: algo-quantum-simulation
    relation: evidence-for
  - to: qec-below-threshold-surface-code
    relation: depends-on
  - to: qec-magic-state-distillation
    relation: depends-on
evidence:
  level: E3
  claim: 'Sun et al. arXiv:2607.16116 (Jul 2026) introduce a scalable fault-tolerant framework combining coherent observable estimation (GCAE algorithm) with space-time-efficient non-Clifford rotations. A full-stack resource analysis benchmarked against state-of-the-art tensor-network and variational Monte Carlo algorithms finds a concrete quantum-classical crossover for mixed-field Ising dynamics at approximately 3.7×10⁵ physical qubits and ~2 hours for a 100-site 1D system at physical error rate p=10⁻³. The paper does not report a hardware experiment; it is a theoretical resource estimate and algorithmic design paper. No independent replication as of 2026-08-18.'
  verified: '2026-08-18'
  sources:
    - url: https://arxiv.org/abs/2607.16116
      role: preprint
      title: 'Quantum-classical crossover in fault-tolerant quantum dynamics simulation'
      publisher: arXiv
      date: '2026-07-17'
      identifier: arXiv:2607.16116
      accessed: '2026-08-18'
      note: '31 authors. Institutions include Queen Mary University of London, University of Oxford, Chinese Academy of Sciences, University of Hong Kong, Peking University, Tsinghua University. Preprint only; not yet peer-reviewed. Submitted 17 Jul 2026, final version 23 Jul 2026.'
status: draft
origin: agent
added: '2026-08-18'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-18'
---

## What happened

Sun et al. (31 authors, Queen Mary/Oxford/CAS/HKU/PKU/Tsinghua) present the first full-stack resource estimate for a quantum-classical crossover in fault-tolerant dynamics simulation of a physically relevant model. The mixed-field Ising model — a paradigmatic non-integrable system relevant to thermalisation and quantum chaos — is simulated under realistic hardware assumptions (p=10⁻³ gate error, surface code QEC). Their framework introduces two technical contributions: a new Gaussian-sampled Chebyshev amplitude estimation (GCAE) algorithm that reduces maximum circuit depth relative to standard quantum amplitude estimation, and a space-time-efficient non-Clifford rotation scheme that suppresses residual logical errors beyond what partially fault-tolerant approaches achieve.

## Why it matters

Previous resource estimates for fault-tolerant quantum advantage in physics simulation placed the crossover at scales requiring millions of physical qubits or impractical runtimes, making the question of when FTQC becomes useful for science effectively academic. This result places the crossover at ~370,000 physical qubits — within the range of near-term roadmap targets — and benchmarks it explicitly against the best available classical algorithms. That changes the assumption about the minimum scale at which a fault-tolerant machine produces genuine scientific value.

## Previous state of the art

Resource estimates for fault-tolerant physics simulation were generally dominated by chemistry (FeMoco, Fe4S4 benchmarks) rather than dynamics simulation. Partially fault-tolerant or heuristic approaches (QESEM, error mitigation) were used to push into classically hard regimes on current hardware but accumulate residual logical errors that limit depth. No prior estimate had placed a concrete crossover for many-body dynamics simulation under realistic error rates.

## Limitations

The paper is a theoretical resource estimate, not an experiment. The classical comparators are tensor-network and VMC algorithms as of mid-2026; improvements to classical methods could move the crossover. The 1D mixed-field Ising model, while non-integrable, is a benchmark system — whether the crossover scale extends to 2D or to other physically relevant models is not established here. No independent replication as of the verified date.

## What would change the assessment

A classical counter-result demonstrating that tensor-network methods can be improved to match the quantum cost at this system size would weaken the claim. Journal peer review would raise evidence to E4. Independent replication of the resource estimate by a different group would raise to E5. A hardware experiment approaching the crossover scale would move readiness from emerging to experimental.
