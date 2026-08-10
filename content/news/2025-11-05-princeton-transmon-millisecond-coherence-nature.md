---
schema: news/v1
id: 2025-11-05-princeton-transmon-millisecond-coherence-nature
headline: 'Princeton demonstrates superconducting transmon qubit with coherence exceeding one millisecond, tripling the previous record'
pillar: quantum
date: '2025-11-05'
plain: 'Superconducting transmon qubits — the type used by Google and IBM — have resisted coherence improvements for years: the previous best was around 0.3 ms and the industry norm for large processors is around 70 µs. Princeton achieved over 1 ms by switching from a standard aluminium-on-sapphire circuit to tantalum on a high-purity silicon substrate, eliminating the surface defects that are the dominant decoherence source. The silicon substrate makes this directly compatible with existing semiconductor fabrication infrastructure. Longer coherence translates to more quantum gate operations before errors accumulate, which reduces the number of physical qubits needed per logical qubit. This is a materials advance that could be adopted by every superconducting quantum computer programme.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09687-4
  kind: paper
  title: 'Millisecond lifetimes and coherence times in 2D transmon qubits'
  publisher: Nature
  date: '2025-11-05'
  doi: 10.1038/s41586-025-09687-4
corroboration:
  - url: https://www.princeton.edu/news/2025/11/05/princeton-puts-quantum-computing-fast-track-new-qubit
    publisher: Princeton University
    kind: authority
  - url: https://phys.org/news/2025-11-superconducting-qubit-millisecond-primed-industrial.html
    publisher: phys.org
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper confirmed via Princeton institutional repository entry: Nature 647(8089):343-348, DOI 10.1038/s41586-025-09687-4, published November 2025'
    - 'Princeton University press release (primary institution) corroborates 1 ms figure and tantalum-silicon material choice'
    - 'phys.org and multiple other sources independently report the same figures'
    - 'No contradicting report found; Michel Devoret (2025 Nobel laureate, Google Quantum AI) cited praising the result'
about:
  - arch-superconducting
  - enable-fabrication
  - qec-error-correction-threshold
establishedBy:
  - url: https://www.nature.com/articles/s41586-025-09687-4
    title: 'Millisecond lifetimes and coherence times in 2D transmon qubits'
    relation: reports
    date: '2025-11'
actors: [Princeton University]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The advance comes from two materials changes: replacing aluminium with tantalum as the circuit metal, and replacing sapphire with high-purity silicon as the substrate. Tantalum has far fewer microscopic surface defects — the so-called two-level fluctuators responsible for most energy loss in superconducting circuits. Silicon substrates are standard in the semiconductor industry, which Princeton's co-PI Nathalie de Leon noted makes the design ready for industrial scaling.

The result is the largest single improvement in transmon coherence time in more than a decade, and the first to breach 1 ms in a two-dimensional (planar) chip format. Three-dimensional cavities have achieved longer lifetimes, but planar designs are what large-scale processors require. The coherence figure is about 15 times longer than the industry standard used in today's large-scale superconducting processors.
