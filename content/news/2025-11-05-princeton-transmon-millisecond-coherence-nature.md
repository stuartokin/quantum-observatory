---
schema: news/v1
id: 2025-11-05-princeton-transmon-millisecond-coherence-nature
headline: Princeton publishes tantalum-on-silicon transmon qubit with T1 up to 1.68 ms in Nature, tripling the prior record
pillar: quantum
date: '2025-11-05'
plain: Superconducting qubit coherence has been a hard ceiling on how deep a circuit can run before errors overwhelm the result. Princeton''s group replaced the sapphire substrate with high-resistivity silicon under a tantalum layer, attacking both surface and bulk dielectric loss simultaneously. The best device reached a T1 lifetime of 1.68 ms — roughly three times the previous record — and the improvement carries across a 45-qubit array, meaning it is not a single lucky device. Because the platform uses no unusual fabrication steps, it can be integrated into existing processor designs.
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09687-4
  kind: paper
  title: Millisecond lifetimes and coherence times in 2D transmon qubits
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
    - 'Nature paper opened; T1 up to 1.68 ms for best qubit stated in abstract and results'
    - 'Time-averaged Qavg of 9.7e6 across 45 qubits stated in abstract, consistent with ~1.0 ms'
    - 'phys.org report corroborates the 1 ms figure and Nature citation'
    - 'No contradicting claim found'
about:
  - arch-superconducting
  - enable-transmon-millisecond-coherence
establishedBy:
  - url: https://www.nature.com/articles/s41586-025-09687-4
    title: Millisecond lifetimes and coherence times in 2D transmon qubits
    doi: 10.1038/s41586-025-09687-4
    date: '2025-11-05'
    relation: reports
actors:
  - Princeton University
country:
  - US
measurements:
  - kind: coherence-time
    value: 1680
    unit: "µs"
    qualifier: 'single qubit, best device'
    modality: superconducting
    note: 'T1 lifetime for best device on tantalum-on-silicon platform. Paper also reports Qavg 9.7e6 across 45 qubits, corresponding to ~1.0 ms average.'
    crossChecks: enable-transmon-millisecond-coherence
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-09-07'
status: published
added: '2026-09-07'
---
