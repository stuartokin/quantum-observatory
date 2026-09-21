---
schema: news/v1
id: 2025-11-05-princeton-transmon-millisecond-coherence-nature
headline: 'Princeton publishes tantalum-on-silicon transmon qubit with T1 up to 1.68 ms in Nature, tripling the prior record'
pillar: quantum
date: '2025-11-05'
plain: 'A Princeton team replaced the sapphire substrate in standard transmon qubits with high-resistivity silicon and used tantalum wiring, achieving a coherence time of 1.68 ms in the best device — three times longer than the previous record. The design is compatible with existing superconducting processors and scalable to wafer fabrication, making it a plausible drop-in improvement for systems like Google Willow. Longer coherence directly reduces error rates, which is the primary bottleneck in scaling to fault-tolerant operation.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09687-4
  kind: paper
  title: 'Millisecond lifetimes and coherence times in 2D transmon qubits'
  publisher: Nature
  date: '2025-11-05'
  doi: 10.1038/s41586-025-09687-4
validation:
  status: verified
  checks:
    - 'Nature paper opened; T1 up to 1.68 ms stated in abstract for best qubit'
    - 'Qavg of 9.7×10⁶ across 45 qubits stated as dimensionless quality factor, not directly as a ms figure; ~1.0 ms conversion would be inference and is not transcribed'
    - 'Multiple independent science outlets (phys.org, ScienceDaily, SciTechDaily) corroborate the result'
    - 'No contradicting report found'
about:
  - enable-transmon-millisecond-coherence
  - arch-superconducting
establishedBy:
  - url: https://www.nature.com/articles/s41586-025-09687-4
    title: 'Millisecond lifetimes and coherence times in 2D transmon qubits'
    date: '2025-11'
    doi: 10.1038/s41586-025-09687-4
    relation: reports
actors:
  - Princeton University
country:
  - US
measurements:
  - kind: coherence-time
    value: 1680
    unit: 'µs'
    qualifier: 'single qubit, best device'
    modality: superconducting
    note: 'T1 up to 1.68 ms stated in Nature abstract. Qavg 9.7×10⁶ across 45 qubits given as quality factor only; ~1.0 ms conversion not transcribed (inference).'
    crossChecks: enable-transmon-millisecond-coherence
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-09-21'
status: published
added: '2025-11-05'
---

The Princeton tantalum-on-silicon transmon reaches T1 up to 1.68 ms on the best device, and a time-averaged quality factor of 9.7 × 10⁶ across a 45-qubit array — a figure the authors describe as the highest reported for a multi-qubit superconducting processor. The key materials change is replacing sapphire with high-resistivity silicon as the substrate, which reduces bulk dielectric loss, combined with tantalum wiring that has fewer surface defects than aluminium. The platform is 2D and compatible with existing foundry processes, so the result is not a laboratory curiosity but a potential upgrade path for deployed processors.

What remains unproven: the 45-qubit figure is a quality factor, not a directly measured coherence time, and the best-device T1 may not be representative of the array as a whole. Industrial translation at wafer scale has not yet been demonstrated, though the authors argue the material stack is consistent with it.
