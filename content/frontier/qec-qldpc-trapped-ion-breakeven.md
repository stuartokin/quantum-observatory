---
schema: frontier/v1
id: qec-qldpc-trapped-ion-breakeven
title: 'Trapped-ion breakeven of qLDPC codes: nine codes on one device'
summary: 'IonQ demonstrated breakeven QEC with bivariate bicycle and generalised bicycle qLDPC codes on 40 trapped Ba-133 ions, achieving logical error rates 9x better than the prior superconducting qLDPC result.'
plain: 'Quantum error-correcting codes need to keep logical qubit lifetimes at least as long as the raw physical qubits they protect — that is the breakeven threshold. Below it, the overhead of running the code actively shortens the qubit lifetime rather than extending it. IonQ ran nine different error-correcting codes on a single chain of 40 barium ions without changing the hardware for each one — including five high-rate qLDPC codes that normally require long-range connections difficult to fabricate in superconducting chips. On the strongest result (a BB[[18,4,3]] code encoding 4 logical qubits in 18 physical qubits), logical error rates were 4-9x lower than the only prior experimental qLDPC demonstration on superconducting hardware. Breakeven was reached: several codes achieved logical qubit lifetimes matching or slightly exceeding the physical qubit lifetime. A subsequent soft-decoder analysis pushed all five qLDPC codes beyond breakeven. The significance is that trapped-ion hardware sidesteps the connectivity problem that forces superconducting chips to use bespoke fabrication for each qLDPC code variant.'
pillar: quantum
readiness: experimental
constellation: error-correction
cluster: qldpc
actors:
  - 'IonQ, Inc.'
country:
  - US
metrics:
  - name: 'physical qubits used'
    value: '40'
    unit: 'Ba-133 ions'
  - name: 'distinct QEC codes demonstrated on one device'
    value: '9'
  - name: 'logical error rate improvement vs superconducting baseline (X errors)'
    value: '9'
    unit: 'x'
  - name: 'logical error rate improvement vs superconducting baseline (Z errors)'
    value: '4'
    unit: 'x'
  - name: 'logical lifetime at breakeven (GB4 [[26,2,5]])'
    value: '3.95 ± 0.68'
    unit: 's'
links:
  - to: qec-qldpc-bivariate-bicycle
    relation: evidence-for
  - to: arch-trapped-ion
    relation: depends-on
  - to: qec-below-threshold-surface-code
    relation: competes-with
  - to: qec-logical-qubit-scaling
    relation: competes-with
evidence:
  claim: 'Tham et al. (IonQ, arXiv:2606.06455, June 2026) demonstrate nine QEC codes on a single 40-ion Ba-133 trapped-ion device without hardware reconfiguration: five bivariate bicycle (BB) and generalised bicycle (GB) qLDPC codes, two topological toric codes, and one concatenated code. A BB[[18,4,3]] code encoding 4 logical qubits achieves logical error rates 4x (Z) and 9x (X) lower than the prior superconducting BB code demonstration (Wang et al., Nature Physics 2026). The GB4 [[26,2,5]] code reaches logical lifetime 3.95 +/- 0.68 s versus physical lifetime 3.3 +/- 0.9 s, achieving breakeven within uncertainty. The OMG (optical-metastable-ground) architecture enables mid-circuit measurement and reset without ion transport or dedicated coolant ions. A subsequent soft-decoder analysis (Aydin et al., arXiv:2609.26958, September 2026) brings all five qLDPC codes beyond breakeven at 2.6-5.6% rejection per syndrome round. Result is distinct from qec-logical-qubit-scaling (Quantinuum iceberg codes, a different code family) and from qec-qldpc-bivariate-bicycle (same code family, superconducting hardware).'
  verified: '2026-10-05'
  level: E3
  sources:
    - url: 'https://arxiv.org/abs/2606.06455'
      role: preprint
      title: 'Breakeven demonstration of quantum low-density parity-check codes'
      publisher: arXiv
      date: '2026-06-04'
      identifier: 'arXiv:2606.06455'
      accessed: '2026-10-05'
      note: 'All authors at IonQ Inc. Experimental demonstration on 40 Ba-133 ions. No journal publication record found as of verification date.'
    - url: 'https://arxiv.org/abs/2609.26958'
      role: corroborating
      title: 'Soft decoding for quantum LDPC codes with experimental validation'
      publisher: arXiv
      date: '2026-09-22'
      identifier: 'arXiv:2609.26958'
      accessed: '2026-10-05'
      note: 'Reanalyses IonQ experimental data with a soft decoder; all five qLDPC codes reach beyond-breakeven at 2.6-5.6% rejection per syndrome round.'
confidence: medium
status: draft
priority: P1
qdayImpact: 0
novelty: 'First trapped-ion breakeven of high-rate qLDPC codes; nine code families on one device without hardware reconfiguration'
horizon: 2
origin: agent
added: '2026-10-05'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-10-05'
  note: 'Sourced from arXiv:2606.06455 (IonQ preprint, June 2026). Verified distinct from qec-logical-qubit-scaling (iceberg codes) and qec-qldpc-bivariate-bicycle (superconducting). Corroborating soft-decoder paper arXiv:2609.26958 adds beyond-breakeven result.'
---

## Trapped-ion breakeven of qLDPC codes

**What happened.** IonQ researchers ran nine quantum error-correcting codes on a single chain of 40 barium-133 ions in June 2026, without hardware reconfiguration between them. Five were high-rate qLDPC codes from the bivariate bicycle (BB) and generalised bicycle (GB) families — the same mathematical family demonstrated on superconducting hardware by IBM/Google, but implemented here on trapped-ion hardware for the first time at breakeven. On the BB[[18,4,3]] code, logical error rates were 4–9× lower than the only prior experimental qLDPC result on solid-state hardware (Wang et al., Nature Physics 2026). Several codes reached the breakeven threshold: logical qubit lifetime matched or slightly exceeded the physical qubit lifetime. A subsequent soft-decoder analysis (Aydin et al., arXiv:2609.26958) pushed all five qLDPC codes beyond breakeven.

**Why it matters.** The long-range connectivity required by qLDPC codes is a structural problem for superconducting chips, which need bespoke hardware for each code variant. Trapped-ion all-to-all connectivity means the same device runs any code without modification — a genuine hardware-fabrication bottleneck removed. The OMG architecture also eliminates ion transport and dedicated coolant ions, reducing runtime and ion-count costs.

**Previous state of the art.** Wang et al. (Nature Physics, 2026) demonstrated one BB code on a custom superconducting Kunlun chip — not at breakeven, ~9% logical error per cycle.

**Limitations.** All authors are IonQ; this is an unreplicated vendor preprint (E3). The result demonstrates memory performance, not logical gates or computation. High post-selection rates in some configurations are not operational.

**What would change the assessment.** Independent replication on a different platform would raise this toward E5. Peer review raises to E4. Demonstration of logical gates on these qLDPC codes would substantially strengthen the case for fault-tolerant computation.
