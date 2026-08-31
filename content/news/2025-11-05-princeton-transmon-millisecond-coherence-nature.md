---
schema: news/v1
id: 2025-11-05-princeton-transmon-millisecond-coherence-nature
headline: Princeton demonstrates superconducting transmon qubit with coherence exceeding one millisecond, tripling the previous record
pillar: quantum
date: '2025-11-05'
plain: Princeton engineers built a tantalum-on-silicon 2D transmon qubit that stays coherent for up to 1.68 milliseconds — three times longer than the previous best in a laboratory setting and roughly fifteen times longer than the industry standard in large processors. The improvement comes from replacing the sapphire substrate with high-resistivity silicon, attacking bulk dielectric loss that had resisted earlier materials work. The platform is fabricated in a standard stack and the team measured a time-averaged quality factor across 45 qubits, suggesting the gain is not confined to a single lucky device.
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
    - 'Nature paper opened; T1 up to 1.68 ms for best qubit stated in abstract and results'
    - 'Qavg of 9.7e6 across 45 qubits stated in the paper, confirming multi-device reproducibility'
    - 'Multiple independent news sources (phys.org, ScienceDaily) corroborate the result and cite the DOI'
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
    unit: "µs"
    qualifier: 'single qubit, best device'
    modality: superconducting
    note: 'T1 lifetime. Paper also reports time-averaged Qavg of 9.7e6 across 45 qubits; conversion to ms not transcribed per rules.'
    crossChecks: enable-transmon-millisecond-coherence
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-31'
status: published
added: '2025-11-05'
---
