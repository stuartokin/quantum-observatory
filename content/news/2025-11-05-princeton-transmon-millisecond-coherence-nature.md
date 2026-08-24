---
schema: news/v1
id: 2025-11-05-princeton-transmon-millisecond-coherence-nature
headline: Princeton demonstrates superconducting transmon qubit with coherence exceeding one millisecond, tripling the previous record
pillar: quantum
date: '2025-11-05'
plain: 'A Princeton team replaced the substrate in a 2D transmon qubit with high-resistivity silicon and achieved a T1 lifetime of 1.68 ms — three times the prior record — while maintaining time-averaged quality factors above 10 million across 45 qubits. The platform uses a standard tantalum-on-silicon stack compatible with existing large-scale fabrication, which is why this matters: improved coherence that cannot be translated to a chip at scale is a laboratory curiosity; this one plausibly can.'
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
    - 'Nature paper opened; T1 up to 1.68 ms stated in abstract and results for the best qubit'
    - 'Time-averaged Qavg of 9.7e6 across 45 qubits stated in the abstract'
    - 'DOI confirmed: 10.1038/s41586-025-09687-4, Nature vol 647 pp 343-348'
    - 'Corroborated by phys.org and ScienceDaily reports citing the same paper'
about:
  - arch-superconducting
  - enable-transmon-millisecond-coherence
establishedBy:
  - url: https://doi.org/10.1038/s41586-025-09687-4
    title: 'Millisecond lifetimes and coherence times in 2D transmon qubits'
    relation: reports
    date: '2025-11-05'
    doi: 10.1038/s41586-025-09687-4
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
    note: 'T1 lifetime up to 1.68 ms for best qubit on tantalum-on-silicon 2D transmon platform. Directly stated in paper abstract.'
    crossChecks: enable-transmon-millisecond-coherence
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-24'
status: published
added: '2026-08-24'
---
