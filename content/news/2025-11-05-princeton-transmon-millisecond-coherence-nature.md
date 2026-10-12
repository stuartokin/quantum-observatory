---
schema: news/v1
id: 2025-11-05-princeton-transmon-millisecond-coherence-nature
headline: Princeton publishes tantalum-on-silicon transmon qubit with T1 up to 1.68 ms in Nature, tripling the prior record
pillar: quantum
date: '2025-11-05'
plain: Superconducting qubits lose their quantum state quickly, which forces error-correction systems to work faster than the hardware can sustain. Princeton''s tantalum-on-silicon transmon achieves a coherence time of 1.68 ms — roughly three times the previous best — across a 45-qubit device, not just a single handpicked qubit. That combination of scale and consistency is what makes it relevant to real processors rather than just a laboratory record.
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
    - Nature paper opened; T1 up to 1.68 ms for the best qubit stated in abstract and results
    - Qavg of 9.7e6 across 45 qubits also stated; conversion to T1 requires resonance frequency and is therefore inference — not recorded as a measurement
    - Princeton University affiliation confirmed; independent of vendor programmes
about:
  - arch-superconducting
  - enable-transmon-millisecond-coherence
establishedBy:
  - url: https://doi.org/10.1038/s41586-025-09687-4
    title: Millisecond lifetimes and coherence times in 2D transmon qubits
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
    unit: "µs"
    qualifier: single qubit, best device
    modality: superconducting
    note: T1 directly stated in Nature abstract and results. Qavg of 9.7e6 across 45 qubits is a dimensionless quality factor; converting to T1 requires resonance frequency and is not transcribed.
    crossChecks: enable-transmon-millisecond-coherence
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-10-12'
status: published
added: '2026-10-12'
---

The tantalum-on-silicon platform replaces the substrate used in standard 2D transmon designs, markedly decreasing bulk substrate loss. The paper reports a time-averaged quality factor (Qavg) of 9.7 × 10⁶ across 45 qubits, with the best qubit reaching Qavg of 1.5 × 10⁷ and a maximum Q of 2.5 × 10⁷ — corresponding to T1 up to 1.68 ms. The Qavg figure is dimensionless and is not transcribed as a coherence-time measurement because converting it to milliseconds requires knowing the resonance frequency, which would make it inference rather than transcription.
