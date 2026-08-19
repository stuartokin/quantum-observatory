---
schema: news/v1
id: 2025-03-03-ustc-zuchongzhi-30-prl-quantum-advantage
headline: USTC publishes Zuchongzhi 3.0 quantum advantage benchmark in PRL, placing classical simulation cost six orders of magnitude beyond prior records
pillar: quantum
date: '2025-03-03'
plain: China's USTC published in Physical Review Letters the first peer-reviewed results for its 105-qubit Zuchongzhi 3.0 processor. In a random circuit sampling experiment using 83 qubits, the processor completed a task in seconds that would require roughly 6.4 billion years on Frontier — a classical simulation cost six orders of magnitude larger than Google's 2024 Sycamore experiments. An independent APS Physics commentary notes that Willow and Zuchongzhi 3.0 are broadly comparable in fidelity. This is a benchmark designed to be hard for classical machines, not a useful computation; the result demonstrates where Chinese superconducting hardware stood in early 2025.
significance: notable
source:
  url: https://link.aps.org/doi/10.1103/PhysRevLett.134.090601
  kind: paper
  title: Establishing a New Benchmark in Quantum Computational Advantage with 105-qubit Zuchongzhi 3.0 Processor
  publisher: Physical Review Letters
  date: '2025-03-03'
  doi: 10.1103/PhysRevLett.134.090601
corroboration:
  - url: https://physics.aps.org/featured-article-pdf/10.1103/PhysRevLett.134.090601
    publisher: APS Physics
    kind: journalism
  - url: https://www.hpcwire.com/2025/03/04/china-quantum-chip-zuchongzhi-3-0-claims-googles-qa-benchmark-title/
    publisher: HPCwire
    kind: journalism
validation:
  status: verified
  checks:
    - 'PRL paper doi:10.1103/PhysRevLett.134.090601 opened; fidelity figures (99.90% single-qubit, 99.62% two-qubit, 99.13% readout) and 83-qubit 32-cycle RCS results appear in the text'
    - 'APS Physics featured-article commentary by Barry Sanders (University of Calgary) confirms the benchmark framing and compares Willow and Zuchongzhi 3.0 performance'
    - 'HPCwire journalism corroborates the publication date and result independently'
    - 'Confirmed this is distinct from Zuchongzhi 3.2 (below-threshold surface-code QEC, December 2025, already in catalogue)'
    - 'Noted: RCS benchmarks measure classical hardness of simulation; this does not correspond to useful computation and classical algorithm improvements remain possible'
about:
  - algo-random-circuit-sampling
  - arch-superconducting
establishedBy:
  - url: https://arxiv.org/abs/2412.11924
    title: Establishing a New Benchmark in Quantum Computational Advantage with 105-qubit Zuchongzhi 3.0 Processor
    date: '2024-12'
    relation: reports
actors: [USTC, Chinese Academy of Sciences]
country: [CN]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
measurements:
  - kind: physical-qubits
    value: 105
    qualifier: 'processor size'
    modality: superconducting
    crossChecks: arch-superconducting
    note: 'Zuchongzhi 3.0. 83 of the 105 were used in the random-circuit-sampling run.'
---

Zuchongzhi 3.0 is a 105-qubit superconducting processor arranged in a 15×7 array with 182 qubit couplers, from the Jian-Wei Pan group at USTC. The peer-reviewed PRL paper was received December 20, 2024 and published March 3, 2025.

The experiment used 83 qubits and 32 logical cycles of random circuit sampling, generating one million samples in a few hundred seconds. The estimated classical simulation time on Frontier is approximately 5.9 × 10⁹ years, placing the classical hardness six orders of magnitude beyond Google's Sycamore-67 and Sycamore-70 experiments.

APS Physics commentary by Barry Sanders notes that the gap between Willow and Zuchongzhi 3.0 is small on key performance metrics, describing the race as continuing with close separation. This is a superconducting quantum advantage benchmark result, not an error-correction result — the Zuchongzhi 3.2 paper demonstrating below-threshold surface-code QEC appeared in December 2025 and is separately catalogued.
