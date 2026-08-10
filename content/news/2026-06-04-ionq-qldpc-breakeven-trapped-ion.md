---
schema: news/v1
id: 2026-06-04-ionq-qldpc-breakeven-trapped-ion
headline: 'IonQ reports first qLDPC breakeven memory on trapped ions, running nine error-correcting codes on one device'
pillar: quantum
date: '2026-06-04'
plain: 'IonQ ran nine distinct quantum error-correcting codes — spanning qLDPC, topological, and concatenated families — on a single 40-ion barium chain without reconfiguring the hardware between codes. The qLDPC code encoding four logical qubits into 18 physical qubits reached breakeven: logical qubit lifetimes at or slightly above the best bare physical qubit in the same machine. Error rates were up to nine times better than a previous superconducting demonstration of a similar code. The result extends evidence for qLDPC codes from superconducting hardware to trapped ions. This is a preprint and has not been peer-reviewed; published here single-source and labelled accordingly.'
significance: notable
source:
  url: https://arxiv.org/abs/2606.06455
  kind: preprint
  title: 'Breakeven demonstration of quantum low-density parity-check codes'
  publisher: arXiv
  date: '2026-06-04'
validation:
  status: single-source
  checks:
    - 'arXiv preprint 2606.06455 opened; abstract confirms 4-logical-qubit-into-18-physical-qubit qLDPC code, breakeven performance, and 9x improvement over superconducting prior art'
    - 'Quantum Computing Report article opened as secondary description; consistent with preprint claims and adds hardware detail'
    - 'postquantum.com analysis opened; consistent; notes first full OMG architecture demonstration on a working trapped-ion computer'
    - 'No peer-reviewed journal publication found; rated single-source at E3 (preprint)'
  note: 'Breakeven means logical qubit lifetime equals or slightly exceeds the best physical qubit lifetime in the same device. It is distinct from below-threshold operation, which requires the logical error rate to fall as code distance increases. These are different milestones. Below-threshold has been demonstrated on superconducting hardware (Google Willow); breakeven on qLDPC codes on trapped ions is what this result adds.'
about:
  - qec-qldpc-bivariate-bicycle
  - arch-trapped-ion
  - qec-logical-qubit-scaling
establishedBy:
  - url: https://arxiv.org/abs/2606.06455
    title: 'Breakeven demonstration of quantum low-density parity-check codes'
    relation: reports
    date: '2026-06-04'
  - url: https://www.nature.com/articles/s41586-024-07107-7
    title: 'High-threshold and low-overhead fault-tolerant quantum memory'
    relation: builds-on
    date: '2024'
actors:
  - IonQ
country:
  - US
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The experiment uses the optical-metastable-ground (OMG) architecture for mid-circuit measurement and reset, eliminating the need for ion transport or dedicated coolant ions. This is the first full OMG demonstration on a functioning trapped-ion quantum computer; prior uses had been limited to one or two ions. The OMG approach allows ancilla qubits to double as sympathetic coolant ions, removing a resource that typically consumes up to 50% of ion count in other trapped-ion systems.

Nine codes were tested on the same 40-ion chain without hardware reconfiguration: five qLDPC codes (including a bivariate bicycle code variant), topological codes, and concatenated codes. The best-performing qLDPC code uses 18 physical qubits to protect 4 logical qubits — a 4.5:1 ratio, compared with roughly 17:1 for a distance-3 surface code.

The result is a preprint. Peer review and independent replication are required before it should change frontier readiness assessments.
