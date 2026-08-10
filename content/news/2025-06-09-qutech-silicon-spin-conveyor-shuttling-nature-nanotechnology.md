---
schema: news/v1
id: 2025-06-09-qutech-silicon-spin-conveyor-shuttling-nature-nanotechnology
headline: 'QuTech demonstrates 99.5%-fidelity conveyor-mode spin shuttling in silicon, closing the connectivity gap'
pillar: quantum
date: '2025-06-09'
plain: 'Silicon spin qubits are attractive for quantum computing because they are made from semiconductor materials compatible with existing chip factories, but they have faced a persistent connectivity problem: qubits must interact with their immediate neighbours, which limits the kinds of error-correction codes that are practical. Moving a qubit physically — spin shuttling — is the proposed solution, but previous methods lost coherence rapidly. The QuTech Delft team has now demonstrated conveyor-mode shuttling using a travelling-wave electric potential, achieving 99.5% fidelity over 10 micrometres in under 200 nanoseconds — an order of magnitude better coherence than the standard bucket-brigade approach. This is the first demonstration of high-fidelity long-range shuttling in silicon, and it makes surface-code-compatible connectivity realistic for silicon spin processors.'
significance: notable
source:
  url: https://www.nature.com/articles/s41565-025-01920-5
  kind: paper
  title: 'High-fidelity single-spin shuttling in silicon'
  publisher: Nature Nanotechnology
  date: '2025-06-09'
  doi: 10.1038/s41565-025-01920-5
corroboration:
  - url: https://www.nature.com/articles/s41565-025-01942-z
    publisher: Nature Nanotechnology
    kind: paper
validation:
  status: verified
  checks:
    - 'Primary paper opened: De Smet et al., Nature Nanotechnology 20, 866-872 (2025), published June 9, 2025. DOI 10.1038/s41565-025-01920-5 confirmed.'
    - 'Nature Nanotechnology published an accompanying News & Views article (Binder and Benjamin, Nat. Nanotechnol. 20, 857-858) titled ''Shuttling arrives for silicon quantum computers'', independently assessing the result.'
    - 'QuTech Delft laboratory publication page lists this paper with the same authors and citation, confirming institutional provenance.'
    - 'Preprint (arXiv:2406.07267) predates the journal publication, consistent with peer-reviewed timeline.'
    - '99.5% fidelity and the order-of-magnitude coherence improvement over bucket-brigade are stated in the abstract of the primary paper — not only in press materials.'
about:
  - arch-silicon-spin
establishedBy:
  - url: https://arxiv.org/abs/2406.07267
    title: 'High-fidelity single-spin shuttling in silicon'
    date: '2024-06'
    relation: reports
actors: [QuTech, Delft University of Technology, TNO]
country: [NL]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

Scaling a silicon spin qubit processor beyond a few qubits requires moving quantum information between distant sites. Gate-mediated coupling decays rapidly with distance; the alternative is to physically transport the electron carrying the spin — spin shuttling.

Bucket-brigade shuttling, where the electron hops between a chain of static quantum dots, loses coherence at each step because each dot has slightly different electrostatic environment. The QuTech Delft team instead applied a two-tone travelling-wave electric potential that creates a moving potential well, carrying the electron smoothly over 10 micrometres across an isotopically purified Si/SiGe heterostructure. The coherence measured after conveyor transport was an order of magnitude better than after equivalent bucket-brigade transport.

The 99.5% transport fidelity brings silicon spin shuttling into the range needed for surface-code error correction, where non-local interactions are required. The same group subsequently demonstrated two-qubit logic between shuttled spins (arXiv:2503.15434, 2025), which is the step that turns this into a computing primitive rather than a memory operation.

This result is from a European laboratory (QuTech, Delft) and represents a significant advance in a non-US programme that is under-represented on this board.
