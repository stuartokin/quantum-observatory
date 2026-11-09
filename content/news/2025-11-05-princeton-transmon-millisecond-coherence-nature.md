---
schema: news/v1
id: 2025-11-05-princeton-transmon-millisecond-coherence-nature
headline: Princeton publishes tantalum-on-silicon transmon qubit with T1 up to 1.68 ms in Nature, tripling the prior record
pillar: quantum
date: '2025-11-05'
plain: Superconducting qubits lose their quantum state to environmental noise, and coherence time sets a hard ceiling on how much computation can be done before errors accumulate. Princeton''s group replaced the sapphire substrate with high-resistivity silicon and pushed the relaxation time of a 2D transmon to 1.68 ms — roughly three times the previous best in this geometry. That margin directly loosens the resource requirements for error-corrected circuits, because longer coherence means fewer rounds of correction are needed per logical operation.
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
    - Nature paper opened; T1 up to 1.68 ms stated in abstract and results for the best qubit
    - Princeton Houck Lab publication page corroborates the result and authors
    - OSTI record confirms DOI and journal
measurements:
  - kind: coherence-time
    value: 1680
    unit: "µs"
    qualifier: 'single qubit, best device'
    modality: superconducting
    crossChecks: enable-transmon-millisecond-coherence
    note: T1 relaxation time for the best qubit on a tantalum-on-silicon platform. The 45-qubit ensemble Qavg of ~9.7e6 is dimensionless and not transcribed.
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
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-11-09'
status: published
added: '2026-11-09'
---

Princeton''s group replaced the sapphire substrate used in prior high-coherence transmon designs with high-resistivity silicon, cutting bulk substrate loss and enabling a time-averaged quality factor exceeding 1.5×10⁷ for the best device. The T1 of 1.68 ms is the directly reported figure from the Nature abstract and results. A 45-qubit ensemble Qavg of ~9.7×10⁶ is also reported but as a dimensionless quality factor; converting it to a coherence time requires a resonance frequency not stated in the accessible abstract and is therefore not transcribed here.
