---
schema: news/v1
id: 2026-06-02-barium-ion-25-level-qudit-ncomms
headline: 'Caltech and MIT demonstrate 25-level trapped-ion qudit and run multi-qubit algorithms in a single barium ion'
pillar: quantum
date: '2026-06-02'
plain: 'A standard qubit holds two states. This paper demonstrates a single barium-137 ion operating as a 25-level quantum system, implementing a 3-qubit Bernstein-Vazirani algorithm and a 4-qubit Toffoli gate encoded within one ion rather than several. The result is relevant to hardware efficiency — more computation per physical particle — and to understanding how error rates scale with qudit dimensionality, which determines whether the approach is practically useful at scale. The paper measures errors carefully and identifies dominant sources: magnetic field noise, which is known and addressable in principle.'
significance: routine
source:
  url: https://www.nature.com/articles/s41467-026-72662-8
  kind: paper
  title: 'Quantum logic operations and algorithms in a single 25-level atomic qudit'
  publisher: Nature Communications
  date: '2026-06-02'
  doi: 10.1038/s41467-026-72662-8
validation:
  status: verified
  checks:
    - 'Nature Communications paper page confirmed: published 2 June 2026. Authors: Pei Jiang Low, Nicholas C.F. Zutt, Crystal Senko (Caltech/MIT).'
    - 'Key claims confirmed in abstract: 25-level 137Ba+ qudit, Bernstein-Vazirani on 3 logical qubits and 4-qubit Toffoli gate implemented in single ion.'
    - 'arXiv:2507.15799 confirmed as the same work. arXiv v1 submitted July 2025; journal publication June 2026.'
    - 'No overclaim: paper measures how errors scale with qudit dimension and identifies primary sources — does not claim qudit superiority over qubit systems at scale.'
    - 'No contradicting report found.'
about:
  - arch-trapped-ion
establishedBy:
  - url: https://arxiv.org/abs/2507.15799
    title: 'Quantum logic operations and algorithms in a single 25-level atomic qudit'
    relation: reports
    date: '2025-07'
actors: [California Institute of Technology, Massachusetts Institute of Technology]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The experiment uses the rich internal level structure of 137Ba+ to encode 25 computational states in a single trapped ion. Multi-level qudit systems offer a hardware-efficiency argument: the Hilbert space grows as d^n rather than 2^n, so fewer physical particles are needed to represent the same computational space. The 3-qubit Bernstein-Vazirani algorithm and 4-qubit Toffoli gate are implemented by encoding the logical qubits into subsets of the 25 levels.

The practical question the paper does not resolve is whether qudit error rates at useful dimensionalities remain competitive with qubit error rates on the same hardware class. Magnetic field noise is identified as the dominant SPAM error source — known and addressable — but the path from 25-level single-ion demonstrations to multi-ion qudit processors at scale involves engineering challenges that have not yet been characterised.
