---
schema: news/v1
id: 2026-03-24-riedel-scalable-diamond-siv-quantum-memory-prx
headline: 'IonQ and AWS publish wafer-scale fabrication of diamond silicon-vacancy quantum memory arrays in Physical Review X'
pillar: quantum
date: '2026-03-24'
plain: 'Building a quantum internet requires memory nodes that can store and retrieve photonic qubits efficiently and be manufactured reliably at scale. A team at IonQ, AWS Center for Quantum Computing, and Element Six has published a wafer-scale fabrication technique for diamond photonic crystal cavities hosting silicon-vacancy colour centres — a leading candidate for such nodes. The technique achieves strong light-matter coupling (cooperativities approaching 100) and demonstrates reliable fabrication across multiple diamond membranes bonded to the same chip. The photonic layer can be integrated with electronic control lines. This is a fabrication and yield result, not a full network demonstration — but it addresses the manufacturing gap that has kept diamond quantum memories in the laboratory rather than in a deployable node.'
significance: notable
source:
  url: https://journals.aps.org/prx/abstract/10.1103/nfrg-zsts
  kind: paper
  title: 'Scalable Photonic Quantum Interconnect Platform'
  publisher: Physical Review X
  date: '2026-03-24'
  doi: 10.1103/nfrg-zsts
corroboration:
  - url: https://journals.aps.org/prx/accepted/10.1103/nfrg-zsts
    publisher: Physical Review X
    kind: paper
validation:
  status: verified
  checks:
    - 'Physical Review X publication confirmed: Phys. Rev. X 16, 011063, Published 24 March, 2026'
    - 'Author affiliations confirmed on journal page: IonQ Inc., Element Six (UK) Limited, AWS Center for Quantum Computing'
    - 'Key technical claims (cooperativities approaching 100, reliable fabrication across membranes, modular electronic integration) found in abstract on the journal page'
    - 'No contradicting paper found; this is a fabrication advance, not a contested measurement'
about:
  - comms-quantum-memory
  - enable-fabrication
  - comms-quantum-internet
establishedBy:
  - url: https://journals.aps.org/prx/abstract/10.1103/nfrg-zsts
    title: 'Scalable Photonic Quantum Interconnect Platform'
    relation: reports
    date: '2026-03-24'
    doi: 10.1103/nfrg-zsts
actors: [IonQ, AWS Center for Quantum Computing, Element Six]
country: [US, GB]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

Silicon-vacancy centres in diamond emit photons at a wavelength compatible with fibre-optic transmission and can store quantum states in long-lived nuclear spin. The challenge has been that each device was previously fabricated individually with variable coupling quality — incompatible with the high yields needed for a distributed network of memory nodes.

The wafer-scale technique uses ion implantation and membrane liftoff, high-quality diamond overgrowth, and targeted colour-centre implantation to produce consistent devices across a chip. Flip-chip bonding to semiconductor substrates allows integration with coplanar waveguide control electronics, enabling a modular architecture where photonic and electronic layers are separately optimised.

IonQ''s involvement here is notable: the company is primarily a trapped-ion quantum computing vendor, but this paper reveals active quantum networking research, consistent with the broader vision of modular trapped-ion processors connected via photonic links.
