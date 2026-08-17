---
schema: frontier/v1
id: algo-rws-qaoa-optimization-crossover
title: 'RWS-QAOA: projected quantum-classical crossover on Max-Cut with resource estimate'
summary: 'JPMorganChase preprint introduces Regularized Warm-Started QAOA and projects a runtime crossover below 0.2 s on 3,000-node Max-Cut graphs using under 1.3 million physical qubits on surface-code hardware. Hardware results on 96-node instances beat provably bounded classical algorithms.'
plain: 'QAOA is a quantum algorithm for combinatorial optimisation problems. This paper adds a regularised warm-start step — a classical pre-processing stage that sets the initial quantum state close to a good solution, avoiding a known failure mode. The paper runs the method on a real 96-qubit trapped-ion processor and beats the best algorithms with provable guarantees. For larger problem sizes where no quantum hardware exists, the authors use tensor-network simulations and then project forward to estimate that a fault-tolerant quantum computer with under 1.3 million physical qubits would solve 3,000-node instances faster than the best classical solver. That projection is not a measurement — it assumes hardware that does not yet exist.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: optimisation
actors:
  - 'JPMorganChase Global Technology Applied Research'
country:
  - US
horizon: 2
priority: P2
qdayImpact: 0
qdayReasoning: 'Max-Cut optimisation has no bearing on cryptanalytic tasks. The algorithm and circuit structure are unrelated to Shor or discrete-log algorithms. The projected 1.3M-qubit machine is not a CRQC — it is sized for a constant-depth optimisation circuit, not the deep circuits required to factor RSA-2048. Q-Day impact 0.'
novelty: 'First quantified physical-qubit resource bound for quantum optimisation advantage on Max-Cut'
metrics:
  - name: 'Hardware demonstration size'
    value: '96'
    unit: 'nodes (3-regular graph)'
    note: 'Run on Quantinuum Helios trapped-ion processor; beat Goemans-Williamson and HLZ provable bounds'
  - name: 'Tensor-network simulation size'
    value: '10000'
    unit: 'nodes'
    note: 'Beat restricted classical heuristics (no local search); classical simulation of quantum algorithm, not hardware'
  - name: 'Projected crossover runtime'
    value: '<0.2'
    unit: 'seconds'
    note: 'Projection for 3,000-node graphs on assumed surface-code hardware; not a measured result'
  - name: 'Projected physical qubit count at crossover'
    value: '<1300000'
    unit: 'physical qubits'
    note: 'Surface-code overhead assumed; hardware of this scale does not exist'
  - name: 'Depth-6 average cut fraction'
    value: '0.9167'
    unit: 'dimensionless'
    note: 'Tensor-network simulation result, restricted classical comparison'
links:
  - to: app-nqac-draper-qaoa-sqd-grid
    relation: competes-with
  - to: algo-resource-estimation
    relation: depends-on
  - to: arch-trapped-ion
    relation: depends-on
  - to: qec-below-threshold-surface-code
    relation: depends-on
evidence:
  claim: 'He et al. (JPMorganChase, arXiv:2603.10191, March 2026) introduce RWS-QAOA, which prevents QAOA stalling via a regularised warm start. On Quantinuum Helios (96-node, 3-regular graphs), RWS-QAOA outperforms Goemans-Williamson and Halperin-Livnat-Zwick. Tensor-network simulations to N=10,000 nodes show depth-6 RWS-QAOA achieves average cut fraction 0.9167, surpassing restricted classical heuristics. The authors project — not measure — that surface-code RWS-QAOA reaches a runtime crossover below 0.2 seconds on 3,000-node graphs with fewer than 1.3 million physical qubits, benchmarked against an optimised parallel Burer-Monteiro solver. The projection assumes fault-tolerant hardware not currently available. No independent replication.'
  level: E3
  verified: '2026-08-17'
  sources:
    - url: 'https://arxiv.org/abs/2603.10191'
      role: preprint
      title: 'Regularized Warm-Started Quantum Approximate Optimization and Conditions for Surpassing Classical Solvers on the Max-Cut Problem'
      publisher: arXiv
      date: '2026-03-10'
      identifier: 'arXiv:2603.10191'
      doi: '10.48550/arXiv.2603.10191'
      accessed: '2026-08-17'
      note: 'All seven authors at JPMorganChase GTAR. Hardware run on Quantinuum Helios. The 1.3M qubit crossover is explicitly labelled a projection by the authors.'
confidence: medium
status: draft
origin: agent
added: '2026-08-17'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-17'
---

## What happened

JPMorganChase's quantum research group introduce Regularized Warm-Started QAOA (RWS-QAOA), which fixes a known failure mode of standard QAOA: when the warm-start state is too close to a classical bitstring, QAOA stalls. The regulariser penalises this collapse, maintaining useful quantum superposition.

The paper works at three scales. On Quantinuum's Helios trapped-ion processor, 96-node 3-regular Max-Cut instances show RWS-QAOA beating Goemans-Williamson and Halperin-Livnat-Zwick — the two algorithms with the best provable approximation guarantees. This is a real hardware result, though the classical comparison is to provable-bound algorithms, not strongest heuristics. Tensor-network simulation extends to N=10,000 nodes at depth 6, achieving average cut fraction 0.9167, outperforming restricted classical heuristics (no local search). Finally, the authors project that a surface-code fault-tolerant implementation would cross the classical runtime on 3,000-node instances in under 0.2 seconds with fewer than 1.3 million physical qubits, even against an optimised parallel Burer-Monteiro solver with no restrictions.

## Why it matters

This is the first paper in the board's view to attach a specific physical-qubit count to a quantum optimisation advantage crossover on a well-defined problem class. The resource estimate is quantified and methodologically explicit, which is more useful than a general claim of future advantage. It belongs on the board alongside the cryptanalytic resource estimation line because it establishes what the optimisation analogue looks like.

## Previous state of the art

Standard warm-started QAOA was known to stall near classical bitstrings. Prior resource analyses for QAOA advantage (e.g. Guerreschi-Matsuura 2019, Scientific Reports) required hundreds of qubits for speedup on smaller instances with less competitive classical baselines. This paper uses a stronger classical baseline and reaches a lower projected qubit count for crossover.

## Limitations

The 1.3M qubit / 0.2s figure is a projection, not a measurement. No quantum hardware approaching that scale exists. The hardware demonstration (96 nodes) beats algorithms with provable guarantees, not best-in-class heuristics. Tensor-network simulation of the quantum algorithm is classical computation extrapolating from small-depth behaviour. The problem class (Max-Cut on random regular graphs) may not generalise to operationally relevant instances. No independent replication of any tier.

## What would change the assessment

An independent group replicating the tensor-network result or the hardware run at larger scale would raise evidence to E4/E5. A peer-reviewed journal publication would raise to E4. Classical counter-simulation of the projected large-scale regime (analogous to what happened with doped-Clifford circuits) would lower confidence. Demonstration on problem instances with real-world structure beyond random regular graphs would raise the applications relevance.
