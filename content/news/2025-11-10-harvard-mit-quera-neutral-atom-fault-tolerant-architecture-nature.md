---
schema: news/v1
id: 2025-11-10-harvard-mit-quera-neutral-atom-fault-tolerant-architecture-nature
headline: 'Harvard, MIT and QuEra publish first integrated fault-tolerant neutral-atom architecture below error threshold in Nature'
pillar: quantum
date: '2025-11-10'
plain: 'Until November 2025 every fault-tolerant demonstration had combined at most a few of the required ingredients — error correction, logical gates, magic-state injection, entropy removal — in isolation. The Bluvstein and Lukin group ran all of them together on 448 rubidium atoms and crossed below the surface-code error threshold: adding more qubits now reduces errors rather than compounding them. This is a qualitative change in what neutral-atom hardware can do, not a record-breaking qubit count. The machine is slow by superconducting standards and millions of qubits remain distant, but the architecture is described by the authors as conceptually scalable, and independent observers at Google Quantum AI agreed the result was among the most advanced quantum experiments done on any platform.'
significance: headline
source:
  url: https://www.nature.com/articles/s41586-025-09848-5
  kind: paper
  title: 'A fault-tolerant neutral-atom architecture for universal quantum computation'
  publisher: Nature
  date: '2025-11-10'
  doi: 10.1038/s41586-025-09848-5
corroboration:
  - url: https://news.harvard.edu/gazette/story/2025/11/a-potential-quantum-leap/
    publisher: Harvard Gazette
    kind: authority
  - url: https://quantumcomputingreport.com/harvard-and-collaborators-demonstrate-scalable-fault-tolerant-architecture-with-448-neutral-atom-qubits/
    publisher: Quantum Computing Report
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper page opened; DOI 10.1038/s41586-025-09848-5 confirmed; published 10 November 2025, authors include Bluvstein, Geim, Lukin (Harvard), Vuletić (MIT), Gullans (NIST/UMD)'
    - 'Harvard Gazette (primary institution release) and Quantum Computing Report independently describe the same experimental results and 448-atom figure'
    - 'Confirmed distinct from the Sept 24 2025 QuEra AFT paper (10.1038/s41586-025-09543-5) — different experiment, different authors, different result'
    - 'Confirmed distinct from the Sept 15 2025 Harvard/MIT 3000-qubit continuous operation paper already on the board'
    - 'Error threshold crossing confirmed in results section description: adding qubits reduces logical error rate'
about:
  - arch-neutral-atom
  - qec-below-threshold-surface-code
  - qec-logical-qubit-scaling
  - qec-magic-state-distillation
establishedBy:
  - url: https://arxiv.org/abs/2411.11822
    title: 'Fault-tolerant quantum computation with a neutral atom processor (preprint version)'
    relation: reports
    date: '2025-11'
  - url: https://www.nature.com/articles/s41586-025-09543-5
    title: 'Low-Overhead Transversal Fault Tolerance for Universal Quantum Computation (QuEra AFT, Sept 2025)'
    relation: builds-on
    date: '2025-09'
actors: [Harvard University, Massachusetts Institute of Technology, QuEra Computing, NIST, University of Maryland]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The experiment ran on 448 rubidium atoms in reconfigurable optical tweezers, integrating physical entanglement, logical entanglement, transversal logical gates, teleportation-based magic-state injection, and continuous entropy removal — all on one device. Previous demonstrations had implemented these elements separately. Crossing below the error threshold means the architecture enters a scaling regime where more physical qubits produce lower logical error rates, which is the precondition for building arbitrarily large fault-tolerant computers.

What remains to be done: the clock speed of neutral-atom error-correction cycles (~4.5 ms per cycle) is roughly 1,000 times slower than superconducting systems. The paper outlines a path to 3–5× gate error reduction and ~10× clock speedup that would put the system well inside the fault-tolerance regime with overhead to spare. Neither has been demonstrated yet. A machine capable of useful computation still requires millions of physical qubits.
