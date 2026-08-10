---
schema: news/v1
id: 2025-06-25-riken-ibm-iron-sulfur-science-advances
headline: RIKEN and IBM simulate iron-sulfur chemistry beyond exact classical diagonalization using a 77-qubit Heron processor and Fugaku supercomputer
pillar: quantum
date: '2025-06-25'
plain: 'Iron-sulfur clusters drive nitrogen fixation, photosynthesis, and cellular respiration, but their complex electron structures resist accurate classical simulation. RIKEN and IBM coupled a 77-qubit IBM Heron processor with Japan''s Fugaku supercomputer in a sample-based quantum diagonalization workflow to calculate electronic structure of iron-sulfur clusters at system sizes beyond the reach of exact classical diagonalization. The result, published in Science Advances as a cover article, is one of the clearest peer-reviewed demonstrations that near-term quantum hardware can contribute scientific value to real chemistry problems. This is a hybrid workflow — the quantum processor samples configuration space; Fugaku handles diagonalization. No fault-tolerant computer was involved. No pharmaceutical partner was named. The result matters because it is a named molecule, a peer-reviewed method, and a specific problem that was historically considered to require fault-tolerant quantum computing.'
significance: headline
source:
  url: https://www.science.org/doi/10.1126/sciadv.adu9991
  kind: paper
  title: Chemistry beyond the scale of exact diagonalization on a quantum-centric supercomputer
  publisher: Science Advances
  date: '2025-06-25'
  doi: 10.1126/sciadv.adu9991
corroboration:
  - url: https://phys.org/news/2025-06-hybrid-quantumclassical-approach-chemical.html
    publisher: Phys.org
    kind: journalism
  - url: https://newsroom.ibm.com/2025-06-23-ibm-and-riken-unveil-first-ibm-quantum-system-two-outside-of-the-u-s
    publisher: IBM Newsroom
    kind: vendor
validation:
  status: verified
  checks:
    - 'Science Advances DOI 10.1126/sciadv.adu9991 confirmed from paper page and Phys.org coverage; paper was featured on journal cover'
    - 'Phys.org article (June 25 2025) independently describes the result and confirms journal publication'
    - 'Paper abstract confirmed: 58, 45, and 77 qubits for N2, 2Fe-2S, and 4Fe-4S respectively; up to 3,500 two-qubit gates; results described as beyond exact diagonalization scale'
    - 'IBM newsroom (June 23 2025) references the Science Advances paper as a recently published result'
    - 'Subsequent work (IBM blog, October 2025 arXiv on closed-loop Fugaku) builds on this result, consistent with it being a real published foundation'
    - 'No contradicting result found'
about:
  - algo-quantum-simulation
establishedBy:
  - url: https://www.science.org/doi/10.1126/sciadv.adu9991
    title: Chemistry beyond the scale of exact diagonalization on a quantum-centric supercomputer
    relation: reports
    date: '2025-06'
actors: [RIKEN, IBM]
country: [JP, US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

Sample-based quantum diagonalization (SQD) divides the problem: the quantum processor samples the electron configuration space (a task that grows exponentially for classical computers), while Fugaku performs diagonalization on the sampled subspace. The workflow is not sequential — it is a closed iterative loop.

For [4Fe-4S], 77 qubits and up to 3,500 two-qubit gates were used. The result was more accurate than previous quantum attempts and comparable to leading classical approximation methods, on systems beyond the reach of exact classical diagonalization.

What this is not: a demonstration that quantum provides strict advantage over all classical approximation methods, or that the result was achieved fault-tolerantly. The advantage is in the SQD hybrid workflow architecture, not in quantum hardware alone. Whether this changes drug discovery timelines is speculative; the paper demonstrates scientific feasibility on a real molecule, not commercial deployment.
