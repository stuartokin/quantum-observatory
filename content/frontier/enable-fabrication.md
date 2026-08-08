---
schema: frontier/v1
id: enable-fabrication
title: Qubit fabrication yield
summary: Achieving high and consistent fabrication yield for superconducting qubits at wafer scale, using industrial semiconductor processes compatible with eventual mass production.
plain: |
  Making one good qubit in a university lab is hard. Making thousands of identical, consistent qubits on the same chip, reliably, in a commercial fabrication facility — that is the fabrication yield problem. Until yield is high and consistent, quantum processors cannot be manufactured at the scale or cost required for practical fault-tolerant machines. The key challenge is that qubits are exquisitely sensitive to tiny impurities and surface defects introduced during fabrication.
pillar: quantum
readiness: demonstrated
constellation: enabling
actors:
  - Imec
  - KU Leuven
country:
  - BE
horizon: 2
priority: P1
metrics:
  - name: Qubits characterised on 300 mm wafer
    value: "400"
    unit: qubits
    note: Van Damme et al. 2024; 75 dies per wafer in standard CMOS pilot line
  - name: Josephson junction test structures characterised
    value: "12840"
    unit: structures
    note: Van Damme et al. 2024; used to validate yield and variability statistics
  - name: Coherence time achieved
    value: ">100"
    unit: µs
    note: T1 and T2 relaxation and coherence times using CMOS industrial process
moved:
  from: experimental
  on: '2026-08-08'
evidence:
  claim: >-
    Van Damme et al. (2024) demonstrated superconducting transmon qubits fabricated in an industrial 300 mm CMOS pilot line at Imec using only optical lithography and reactive-ion etching, characterising 400 qubits and 12,840 Josephson junction test structures with coherence times exceeding 100 µs and yield statistics competitive with conventional laboratory techniques.
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/s41586-024-07941-9
      role: primary
      title: Advanced CMOS manufacturing of superconducting qubits on 300 mm wafers
      publisher: Nature
      date: '2024-09-18'
      identifier: 'Nature 634, 74–79 (2024)'
      doi: 10.1038/s41586-024-07941-9
      accessed: '2026-08-08'
      note: Open access (CC BY 4.0). PMC copy available. Authors at Imec, Leuven and KU Leuven.
links:
  - to: arch-superconducting
    relation: enables
  - to: enable-cryogenics
    relation: depends-on
qdayImpact: 1
qdayReasoning: >-
  Wafer-scale industrial fabrication of high-coherence qubits removes a manufacturing bottleneck on the path to the qubit counts needed for a CRQC. It does not change the error rates or algorithms required, but it makes the scaling trajectory more credible.
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

The move from laboratory hand-fabrication to industrial CMOS processes is a prerequisite for quantum computing at scale. Van Damme et al. 2024 is the clearest published demonstration: 400 superconducting transmon qubits fabricated across a 300 mm wafer in the Imec CMOS pilot line, with coherence times matching the best lab results. This justifies moving the readiness from experimental to demonstrated — the technique has been shown to work at meaningful scale and the results are peer-reviewed in Nature. The gap to mainstream is that this remains a pilot-line result; volume production and three-dimensional integration are still outstanding.
