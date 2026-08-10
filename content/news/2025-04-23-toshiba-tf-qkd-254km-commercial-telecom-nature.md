---
schema: news/v1
id: 2025-04-23-toshiba-tf-qkd-254km-commercial-telecom-nature
headline: 'Twin-field QKD demonstrated over 254 km of live German commercial telecom fibre without cryogenic cooling'
pillar: quantum
date: '2025-04-23'
plain: 'Previous demonstrations of long-range quantum key distribution used dedicated fibres or laboratory conditions with cryogenic equipment. Toshiba Europe and university partners have now run a coherence-based twin-field QKD protocol over 254 km of operational commercial fibre connecting Frankfurt, Kehl, and Kirchfeld, delivering keys at 110 bits per second using only non-cryogenic semiconductor detectors. This is the first deployment on working commercial infrastructure outside a metropolitan network, and more than doubles the practical range achievable with conventional hardware. The result matters because it shows that the phase-based architecture required for a future quantum internet is compatible with existing data centres and telecom operations — without the specialised hardware that has kept long-range QKD laboratory-bound.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-08801-w
  kind: paper
  title: 'Long-distance coherent quantum communications in deployed telecom networks'
  publisher: Nature
  date: '2025-04-23'
  doi: 10.1038/s41586-025-08801-w
corroboration:
  - url: https://connect.geant.org/2025/04/24/toshiba-europe-geant-psnc-and-anglia-ruskin-university-announce-the-first-demonstration-of-quantum-key-distribution-within-commercial-telecommunication-networks
    publisher: GÉANT
    kind: authority
  - url: https://phys.org/news/2025-04-quantum-messages-km-infrastructure.html
    publisher: phys.org
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper abstract opened directly: 254 km Frankfurt-Kehl span, 110 bits/s rate, and non-cryogenic detectors confirmed in paper text'
    - 'GÉANT (European research network authority) independently corroborated the deployment and named the commercial infrastructure'
    - 'Phys.org independently reported the result citing the Nature paper DOI'
    - 'No contradicting measurement or replication failure found'
    - 'Checked against existing board items: 300 km MDI-QKD (August 2025) is a different protocol and distance; USTC metropolitan repeater is a different architecture. Not a duplicate.'
about:
  - comms-mdi-qkd
  - quantum-key-distribution
  - comms-quantum-internet
establishedBy:
  - url: https://arxiv.org/abs/2405.11990
    title: 'Coherent Quantum Communications Across National Scale Telecommunication Infrastructure'
    relation: reports
    date: '2024-05'
  - url: https://www.nature.com/articles/s41566-021-00832-5
    title: '600-km repeater-like quantum communications with dual-band stabilization (Pittaluga et al., Nature Photonics 2021)'
    relation: builds-on
    date: '2021'
actors: [Toshiba Europe, University of Geneva, INRIM, Anglia Ruskin University, GÉANT, PSNC]
country: [UK, DE, IT, CH]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The system maintained optical phase coherence between nodes using a scalable off-band phase-stabilisation approach, removing the need for the ultra-stable optical cavities that had previously restricted twin-field QKD to laboratory settings. The experiment ran across operational data centres, demonstrating compatibility with real-world infrastructure rather than dedicated quantum links.

The practical significance is dual. First, the protocol achieves what a quantum repeater would achieve — breaking the distance limit set by direct transmission — but without requiring quantum memories, which remain years from deployment. Second, the non-cryogenic detector design means integration with existing data-centre equipment is feasible rather than aspirational.

The rate of 110 bits per second at 254 km is adequate for cryptographic key refresh in high-security applications, though not for bulk encryption. The next step, not yet demonstrated, is multi-node network operation beyond a single link.
