---
schema: news/v1
id: 2025-11-05-princeton-transmon-millisecond-coherence-nature
headline: 'Princeton publishes tantalum-on-silicon transmon qubit with T1 up to 1.68 ms in Nature, tripling the prior record'
pillar: quantum
date: '2025-11-05'
plain: 'Princeton researchers replaced the sapphire substrate with high-resistivity silicon and deposited tantalum in ultra-high-vacuum conditions, cutting bulk dielectric loss enough to push the best qubit''s relaxation time to 1.68 ms — roughly three times the prior lab record and fifteen times longer than current industry devices. The result matters because the same material stack can be fabricated at wafer scale, making it directly translatable to large processors rather than a one-off laboratory device. A time-averaged quality factor of 9.7×10⁶ was also measured across 45 qubits, and single-qubit gates reached 99.994% fidelity.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09687-4
  kind: paper
  title: 'Millisecond lifetimes and coherence times in 2D transmon qubits'
  publisher: Nature
  date: '2025-11-05'
  doi: 10.1038/s41586-025-09687-4
corroboration:
  - url: https://singularityhub.com/2025/11/11/record-breaking-qubits-are-stable-for-15-times-longer-than-google-and-ibms-designs/
    publisher: Singularity Hub
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper opened at DOI 10.1038/s41586-025-09687-4; T1 up to 1.68 ms stated in abstract and results for best qubit'
    - 'Single-qubit gate fidelity 99.994% directly stated in paper'
    - 'Qavg = 9.7×10⁶ across 45 qubits stated as dimensionless quality factor, not a coherence time in ms; conversion to ~1.0 ms T1 requires resonance frequency and is inference — not recorded as measurement'
    - 'Independent journalism corroboration from Singularity Hub confirmed'
about:
  - enable-transmon-millisecond-coherence
  - arch-superconducting
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
    unit: "\xB5s"
    qualifier: 'single qubit, best device'
    modality: superconducting
    crossChecks: enable-transmon-millisecond-coherence
  - kind: single-qubit-fidelity
    value: 99.994
    unit: '%'
    qualifier: 'single qubit, best device'
    modality: superconducting
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-10-05'
status: published
added: '2026-10-05'
---

The 1.68 ms T1 figure is for the single best qubit in the array and is directly stated in the Nature paper; it should not be read as a typical device figure. The time-averaged Qavg of 9.7×10⁶ across 45 qubits represents typical performance across the fabricated array — converting this to a coherence time requires knowing the resonance frequency and is therefore not recorded as a structured measurement here, though it corresponds to roughly 1.0 ms at typical transmon frequencies. Single-qubit gate fidelity of 99.994% is also directly stated.

The tantalum-on-silicon stack is notable for scalability: unlike sapphire substrates, high-resistivity silicon is compatible with standard wafer-scale fabrication processes, which the authors explicitly flag as a route to large-scale processors.
