---
schema: frontier/v1
id: enable-fabrication
title: Qubit fabrication yield
summary: Industrial-scale manufacturing of superconducting qubits with high yield and reproducible coherence, using semiconductor foundry processes.
plain: Making one qubit in a university lab is hard. Making ten thousand identical ones on a single wafer, reliably, is a different problem entirely. Fabrication yield is about closing that gap — applying chip-factory techniques to quantum devices so that most qubits on a wafer work, and work well enough to use in a real computer.
pillar: quantum
readiness: demonstrated
constellation: enabling
actors:
  - imec
  - Delft University of Technology
  - KU Leuven
country:
  - BE
  - NL
horizon: 2
priority: P1
qdayImpact: 1
qdayReasoning: Yield and reproducibility at wafer scale are prerequisites for manufacturing the millions of physical qubits a CRQC requires. The imec 2024 result shows industrial methods can reach >100 µs coherence, but full integration into a working processor at this scale has not been demonstrated.
evidence:
  claim: Van Damme et al. (Nature 2024) fabricated superconducting transmon qubits in imec's 300 mm CMOS pilot line using industry-standard methods. Characterisation of 400 qubits and 12,840 Josephson junction test structures showed coherence times exceeding 100 µs and excellent qubit yield across the wafer.
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/s41586-024-07941-9
      role: primary
      title: Advanced CMOS manufacturing of superconducting qubits on 300 mm wafers
      publisher: Nature
      date: '2024-10-02'
      identifier: 'Nature 634, 74–79 (2024)'
      doi: 10.1038/s41586-024-07941-9
      accessed: '2026-08-08'
      note: Van Damme et al.; imec / KU Leuven / TU Delft. Open-access Creative Commons. First large-scale industrial CMOS fabrication of transmon qubits with T1/T2 > 100 µs.
metrics:
  - name: Wafer diameter
    value: '300'
    unit: mm
  - name: Qubits characterised
    value: '400'
  - name: Josephson junction test structures
    value: '12840'
  - name: Relaxation/coherence time
    value: '>100'
    unit: µs
links:
  - to: arch-superconducting
    relation: enables
  - to: enable-cryogenics
    relation: depends-on
confidence: high
status: published
moved:
  from: experimental
  on: '2026-08-08'
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

The imec result (Van Damme et al., Nature 2024) is the clearest demonstration that superconducting qubit fabrication can be transferred to a semiconductor foundry without sacrificing coherence. Characterising 400 qubits with coherence times above 100 µs on a single 300 mm wafer is a qualitative leap from academic cleanroom runs of a handful of devices. The readiness moves to **demonstrated**: industrial methods work at meaningful scale. What remains undemonstrated is full integration — routing, packaging, and control wiring — at this device count.
