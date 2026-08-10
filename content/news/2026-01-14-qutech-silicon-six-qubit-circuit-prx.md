---
schema: news/v1
id: 2026-01-14-qutech-silicon-six-qubit-circuit-prx
headline: 'QuTech runs six-qubit algorithm on silicon spin-qubit array, largest multiqubit circuit in semiconductor quantum-dot hardware'
pillar: quantum
date: '2026-01-14'
plain: 'A team at QuTech and TU Delft ran a programmable quantum circuit on a linear array of six silicon spin qubits — the largest multiqubit algorithm demonstrated in semiconductor quantum-dot hardware to that date. Prior work had reached three-qubit algorithms despite larger devices being available. The team ran circuits across all combinations of three, four, five, and six neighbouring qubits, using a protocol designed to investigate dynamical quantum phase transitions. The result identifies key bottlenecks (idling, runtime, and SPAM errors) and shows that silicon is progressing as a platform, though the qubit count and fidelity remain well below what fault-tolerant computing requires. For a reader tracking silicon spin qubits: this is a milestone in programmability, not in error correction, and the gap to fault-tolerant operation remains large.'
significance: notable
source:
  url: https://link.aps.org/doi/10.1103/f285-l2v5
  kind: paper
  title: 'Running a Six-Qubit Quantum Circuit on a Silicon Spin-Qubit Array'
  publisher: PRX Quantum
  date: '2026-01-14'
  doi: 10.1103/f285-l2v5
corroboration:
  - url: https://qutech.nl/2026/04/02/programmable-quantum-circuits-put-silicon-qubits-to-the-test/
    publisher: QuTech
    kind: authority
  - url: https://physics.aps.org/articles/v19/s12
    publisher: APS Physics
    kind: journalism
validation:
  status: verified
  checks:
    - 'PRX Quantum DOI 10.1103/f285-l2v5 opened; paper confirmed published January 14, 2026 as PRX Quantum 7, 010308'
    - 'TU Delft Research Portal entry independently confirms authors, journal, DOI and date'
    - 'QuTech institutional press page (April 2, 2026) corroborates the result independently of the publisher page'
    - 'APS Physics synopsis confirms paper and publication date'
    - 'Not a duplicate of 2026-07-29-qutech-delft-spin-shuttling-weight-four-parity-nature: that is a different July 2026 paper on spin-shuttling and surface-code parity checks; this is a January 2026 paper on six-qubit algorithm demonstrations'
about:
  - arch-silicon-spin
establishedBy:
  - url: https://link.aps.org/doi/10.1103/f285-l2v5
    title: 'Running a Six-Qubit Quantum Circuit on a Silicon Spin-Qubit Array'
    relation: reports
    date: '2026-01-14'
    doi: 10.1103/f285-l2v5
actors: ['QuTech', 'TU Delft']
country: [NL]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

Fernández de Fuentes et al. used six single-spin electron qubits in a linear array of quantum dots to run circuits that probed dynamical quantum phase transitions in an Ising-like system. Addressable microwave driving provided single-qubit control, and tunable exchange interactions enabled two-qubit gates.

The key finding is that the device is now programmable across all sub-arrays of three to six qubits, which was not possible in earlier silicon processors despite their physical qubit count. The paper also provides an honest accounting of what limits the device: idling errors accumulate during longer circuits, SPAM errors are significant, and runtime must be managed carefully.

Silicon spin qubits remain a leading candidate for scalable quantum computing because of compatibility with semiconductor manufacturing, but this result shows the field is still in the stage of validating basic multi-qubit operations rather than approaching error-corrected computation.
