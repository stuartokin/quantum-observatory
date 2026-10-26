---
schema: news/v1
id: 2025-11-05-princeton-transmon-millisecond-coherence-nature
headline: Princeton publishes tantalum-on-silicon transmon qubit with T1 up to 1.68 ms in Nature, tripling the prior record
pillar: quantum
date: '2025-11-05'
plain: Superconducting transmon qubits have been limited by energy loss at material interfaces for years. Princeton replaced the standard sapphire substrate with high-resistivity silicon and grew tantalum directly on it, reducing bulk substrate loss enough to reach a T1 of 1.68 ms on the best device — around three times the previous record. The team also demonstrated 99.994% single-qubit gate fidelity and showed the architecture is compatible with standard quantum processor fabrication, which matters for scaling.
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09687-4
  kind: paper
  title: Millisecond lifetimes and coherence times in 2D transmon qubits
  publisher: Nature
  date: '2025-11-05'
  doi: 10.1038/s41586-025-09687-4
corroboration:
  - url: https://engineering.princeton.edu/news/2025/11/05/princeton-engineers-say-new-qubit-could-make-current-quantum-computers-1000-times
    publisher: Princeton University Engineering
    kind: authority
validation:
  status: verified
  checks:
    - 'Nature paper DOI 10.1038/s41586-025-09687-4 opened; T1 up to 1.68 ms and Q_avg of 9.7 × 10^6 across 45 qubits appear in the abstract'
    - 'Princeton Engineering news release corroborates the result independently'
    - 'No contradicting report found'
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
actors: [Princeton University, C2QA, Brookhaven National Laboratory]
country: [US]
measurements:
  - kind: coherence-time
    value: 1680
    unit: µs
    qualifier: 'single qubit, best device'
    modality: superconducting
    crossChecks: enable-transmon-millisecond-coherence
    note: 'T1 up to 1.68 ms stated in Nature abstract. Q_avg of 9.7e6 across 45 qubits also reported; that figure is a quality factor, not a directly stated ms value, so not transcribed separately.'
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-10-26'
status: published
added: '2026-10-26'
---
