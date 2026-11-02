---
schema: news/v1
id: 2025-11-05-princeton-transmon-millisecond-coherence-nature
headline: 'Princeton publishes tantalum-on-silicon transmon qubit with T1 up to 1.68 ms in Nature, tripling the prior record'
pillar: quantum
date: '2025-11-05'
plain: 'The coherence time of a superconducting qubit — how long it holds a quantum state before noise destroys it — has been a hard ceiling on how useful superconducting quantum computers can become. Princeton''s tantalum-on-silicon transmon reaches 1.68 ms, roughly three times longer than any previously published result and about fifteen times longer than qubits in current commercial processors. A longer coherence time means fewer error-correction cycles are needed, which directly reduces the overhead cost of fault-tolerant computation.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09687-4
  kind: paper
  title: 'Millisecond lifetimes and coherence times in 2D transmon qubits'
  publisher: Nature
  date: '2025-11-05'
  doi: 10.1038/s41586-025-09687-4
corroboration:
  - url: https://www.eurekalert.org/news-releases/1104645
    publisher: EurekAlert / Princeton University
    kind: authority
validation:
  status: verified
  checks:
    - 'Nature paper opened; T1 up to 1.68 ms stated in abstract and results for the best qubit (DOI 10.1038/s41586-025-09687-4).'
    - 'OSTI record 3028426 confirms journal, volume, DOI and publication date.'
    - 'Princeton University press release corroborates figure independently.'
    - 'No contradicting measurement found in literature.'
about:
  - enable-transmon-millisecond-coherence
  - arch-superconducting
establishedBy:
  - url: https://doi.org/10.1038/s41586-025-09687-4
    title: 'Millisecond lifetimes and coherence times in 2D transmon qubits'
    publisher: Nature
    date: '2025-11-05'
    doi: 10.1038/s41586-025-09687-4
    relation: reports
actors:
  - Princeton University
  - Brookhaven National Laboratory (C2QA)
country:
  - US
measurements:
  - kind: coherence-time
    value: 1680
    unit: 'µs'
    qualifier: 'single qubit, best device'
    modality: superconducting
    note: 'T1max = 1.68 ± 0.1 ms stated directly in Nature abstract and results. Best of the devices tested; time-averaged Qavg across 45 qubits is dimensionless and not transcribed.'
    crossChecks: enable-transmon-millisecond-coherence
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-11-02'
status: published
added: '2025-11-05'
---
