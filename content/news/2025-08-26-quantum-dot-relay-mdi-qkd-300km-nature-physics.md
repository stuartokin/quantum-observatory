---
schema: news/v1
id: 2025-08-26-quantum-dot-relay-mdi-qkd-300km-nature-physics
headline: Chinese team demonstrates MDI-QKD over 300 km using a quantum dot single-photon relay in Nature Physics
pillar: quantum
date: '2025-08-26'
plain: 'Quantum key distribution loses signal over distance because photons are absorbed in fibre. Relay nodes can extend the range, but classical amplification destroys the quantum signal. This paper demonstrates a modular relay architecture using a high-quality quantum dot single-photon source and a measurement-device-independent protocol, establishing a secure key over fibres up to 300 km. The untrusted intermediate nodes remove the need to trust the relay hardware, which is the central security requirement for real-world deployment. The result moves QKD network reach meaningfully closer to metropolitan-to-regional scale without satellite links.'
significance: notable
source:
  url: https://www.nature.com/articles/s41567-025-03005-5
  kind: paper
  title: 'Realization of an untrusted intermediate relay architecture using a quantum dot single-photon source'
  publisher: Nature Physics
  date: '2025-08-26'
  doi: 10.1038/s41567-025-03005-5
corroboration:
  - url: https://phys.org/news/2025-09-relay-architecture-based-quantum-dot.html
    publisher: Phys.org
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature Physics paper opened; DOI 10.1038/s41567-025-03005-5 confirmed; Vol 21 pp. 1670-1677 (2025)'
    - 'Phys.org report corroborates the 300 km reach and MDI protocol'
    - 'Authors include Yu-Ming He and Jian-Wei Pan (USTC); Jian-Wei Pan is one of the most prominent QKD researchers globally — affiliation is credible'
    - 'Result is a relay demonstration, not a full repeater with quantum memory; this distinction is noted in the paper'
about:
  - comms-quantum-repeater
  - comms-mdi-qkd
  - quantum-key-distribution
  - comms-quantum-internet
establishedBy:
  - url: https://www.nature.com/articles/s41567-025-03005-5
    title: 'Realization of an untrusted intermediate relay architecture using a quantum dot single-photon source'
    relation: reports
    date: '2025-08-26'
    doi: 10.1038/s41567-025-03005-5
actors: ['USTC', 'Jian-Wei Pan group']
country: ['CN']
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The architecture uses three untrusted intermediate nodes and achieves a repetition rate of 304.52 MHz. A quantum dot single-photon source was used rather than attenuated laser pulses, improving the signal-to-noise ratio of quantum information transmission.

This is a relay rather than a true quantum repeater: photons are measured and re-emitted rather than being stored in quantum memory and entangled. It extends reach but does not achieve the memory-based entanglement distribution that fully general quantum networks require. The measurement-device-independent protocol removes one practical trust assumption compared to earlier QKD systems.
