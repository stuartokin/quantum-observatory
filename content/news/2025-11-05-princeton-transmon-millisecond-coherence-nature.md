---
schema: news/v1
id: 2025-11-05-princeton-transmon-millisecond-coherence-nature
headline: Princeton publishes tantalum-on-silicon transmon qubit with T1 up to 1.68 ms in Nature, tripling the prior record
pillar: quantum
date: '2025-11-05'
plain: Princeton engineers replaced the sapphire substrate with high-resistivity silicon under a tantalum base layer, cutting bulk dielectric loss enough to push the best qubit lifetime to 1.68 ms — three times the previous record and fifteen times the industry norm for large processors. The design requires no changes to qubit architecture, making it straightforward to carry into existing chip fabrication lines. The same material improvement brings single-qubit gate fidelity to 99.994%.
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09687-4
  kind: paper
  title: Millisecond lifetimes and coherence times in 2D transmon qubits
  publisher: Nature
  date: '2025-11-05'
  doi: 10.1038/s41586-025-09687-4
validation:
  status: verified
  checks:
    - 'Nature paper opened at DOI 10.1038/s41586-025-09687-4; T1 up to 1.68 ms stated in abstract and results'
    - 'Qavg of 9.7 × 10⁶ across 45 qubits stated directly; corresponding T1 in ms is a derived figure requiring resonance frequency and is not transcribed per the transcription-not-inference rule'
    - 'Single-qubit gate fidelity of 99.994% stated in results (ResearchGate full-text corroboration)'
    - 'phys.org and ScienceDaily independently report the same figures from the same paper'
about:
  - enable-transmon-millisecond-coherence
  - arch-superconducting
establishedBy:
  - url: https://www.nature.com/articles/s41586-025-09687-4
    title: Millisecond lifetimes and coherence times in 2D transmon qubits
    publisher: Nature
    date: '2025-11-05'
    doi: 10.1038/s41586-025-09687-4
    relation: reports
actors:
  - Princeton University
country:
  - US
measurements:
  - kind: coherence-time
    value: 1680
    unit: "\u00b5s"
    qualifier: 'single qubit, best device'
    modality: superconducting
    note: 'T1 lifetime directly stated in Nature abstract and results. Qavg = 9.7e6 across 45 qubits also stated but T1 equivalent requires frequency inference — not transcribed.'
    crossChecks: enable-transmon-millisecond-coherence
  - kind: single-qubit-fidelity
    value: 0.99994
    unit: ''
    qualifier: 'single qubit, best device'
    modality: superconducting
    note: '99.994% single-qubit gate fidelity stated in results section of the Nature paper.'
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-09-28'
status: published
added: '2025-11-05'
---

The tantalum-on-silicon platform tackles both surface and bulk dielectric loss simultaneously. Previous tantalum-on-sapphire devices were limited because two-level system losses came comparably from surface and bulk; replacing sapphire with high-resistivity silicon removed the bulk contribution. The team also improved Josephson junction deposition to reduce contamination, achieving Hahn echo coherence times (T2E) exceeding T1 for most qubits in the array.

The 45-qubit array achieved a time-averaged quality factor (Qavg) of 9.7 × 10⁶ across all qubits; the best single qubit reached Qavg of 1.5 × 10⁷ with a maximum Q of 2.5 × 10⁷, corresponding to T1 = 1.68 ms. The paper does not state the 45-qubit average as a T1 in milliseconds directly — that conversion is frequency-dependent and is therefore not transcribed as a measurement here.

The platform is intended to be wafer-scalable and compatible with standard quantum control gates, which is why Princeton describes it as primed for industrial integration.
