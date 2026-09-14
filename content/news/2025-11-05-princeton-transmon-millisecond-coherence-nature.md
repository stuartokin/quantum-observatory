---
schema: news/v1
id: 2025-11-05-princeton-transmon-millisecond-coherence-nature
headline: 'Princeton publishes tantalum-on-silicon transmon qubit with T1 up to 1.68 ms in Nature, tripling the prior record'
pillar: quantum
date: '2025-11-05'
plain: 'The coherence time of a superconducting qubit sets a ceiling on how many operations a quantum computer can execute before errors overwhelm the result. Princeton has built a tantalum-on-silicon transmon that survives up to 1.68 milliseconds — three times the previous best — and demonstrated 99.994% single-qubit gate fidelity on the same device. The materials platform is compatible with existing 2D transmon architectures and can potentially be fabricated at wafer scale, which means the improvement is not locked to a bespoke device but could be adopted by large-scale processors directly.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09687-4
  kind: paper
  title: 'Millisecond lifetimes and coherence times in 2D transmon qubits'
  publisher: Nature
  date: '2025-11-05'
  doi: 10.1038/s41586-025-09687-4
corroboration:
  - url: https://phys.org/news/2025-11-superconducting-qubit-millisecond-primed-industrial.html
    publisher: phys.org
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper opened at DOI 10.1038/s41586-025-09687-4; T1 up to 1.68 ms stated in abstract for best qubit'
    - 'Time-averaged quality factor Qavg of 9.7e6 across 45 qubits confirmed in paper text'
    - '99.994% single-qubit gate fidelity stated in paper'
    - 'phys.org coverage corroborates the result independently'
about:
  - arch-superconducting
  - enable-transmon-millisecond-coherence
establishedBy:
  - url: https://www.nature.com/articles/s41586-025-09687-4
    title: 'Millisecond lifetimes and coherence times in 2D transmon qubits'
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
    unit: µs
    qualifier: 'single qubit, best device'
    modality: superconducting
    note: 'T1 lifetime for the best qubit on the tantalum-on-silicon platform; time-averaged Qavg across 45 qubits corresponds to approximately 1.0 ms.'
    crossChecks: enable-transmon-millisecond-coherence
  - kind: single-qubit-fidelity
    value: 0.99994
    qualifier: 'tantalum-on-silicon 2D transmon'
    modality: superconducting
    note: 'Single-qubit gate fidelity stated directly in the paper alongside the coherence result.'
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-09-14'
status: published
added: '2025-11-05'
---

Princeton's tantalum-on-silicon platform replaces the conventional aluminium-on-sapphire stack that has dominated superconducting qubit fabrication. Surface and bulk dielectric losses are the primary decoherence mechanism in standard transmons; high-resistivity silicon markedly reduces bulk substrate loss, and tantalum's cleaner surface reduces two-level-system noise. The result is a time-averaged quality factor of 9.7 × 10⁶ across 45 qubits, and 1.5 × 10⁷ for the best device, corresponding to T1 up to 1.68 ms.

The design makes no changes to the 2D transmon qubit architecture, so existing quantum control gates and fabrication pipelines can accommodate it. The team demonstrated 99.994% single-qubit gate fidelity. The tantalum-on-silicon stack is amenable to wafer-scale production, which is the condition that makes a coherence improvement relevant at system scale rather than in a single characterisation device.
