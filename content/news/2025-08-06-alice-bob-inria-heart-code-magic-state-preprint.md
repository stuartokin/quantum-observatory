---
schema: news/v1
id: 2025-08-06-alice-bob-inria-heart-code-magic-state-preprint
headline: Alice & Bob and Inria post preprint claiming 8.7-fold qubit reduction for magic state preparation using cat qubits
pillar: quantum
date: '2025-08-06'
plain: 'Magic states are a consumable resource that fault-tolerant quantum computers need to run non-Clifford gates — roughly, the operations that make quantum computing more powerful than classical. Preparing them is expensive: Google''s comparable scheme requires 463 physical qubits per state. Alice & Bob and Inria''s "unfolded distillation" method, exploiting the noise bias of cat qubits, requires only 53 qubits — an 8.7-fold reduction — and is five times faster. If verified in peer review, this would meaningfully reduce the overhead of fault-tolerant computation on cat-qubit hardware. The claim rests on a preprint; no experimental demonstration of the method has been published.'
significance: routine
source:
  url: https://arxiv.org/abs/2508.03889
  kind: preprint
  title: 'Unfolded distillation: very low-cost magic state preparation for biased-noise qubits'
  publisher: arXiv
  date: '2025-08-06'
corroboration:
  - url: https://alice-bob.com/newsroom/alice-bob-and-inria-improve-efficiency-of-magic-state-preparation-to-enable-useful-quantum-computing/
    publisher: Alice & Bob
    kind: vendor
  - url: https://quantumzeitgeist.com/alice-bob-inria-boost-quantum-computing-with-efficient-magic-state-preparation/
    publisher: Quantum Zeitgeist
    kind: journalism
validation:
  status: single-source
  checks:
    - 'arXiv preprint found via aggregator; title confirmed as "Unfolded distillation: very low-cost magic state preparation for biased-noise qubits"'
    - 'Alice & Bob press release and Inria announcement are consistent with each other but both originate from the same team — not independent'
    - 'Quantum Zeitgeist and Phys.org both report from the same vendor announcement, adding reach but not independent measurement'
    - 'No peer-reviewed publication found as of this run; preprint submitted for review per vendor statement'
    - 'Claim of 8.7x reduction compared to Google is vendor-stated; Google has not commented'
  note: 'Published as single-source because the only technical source is the vendor-affiliated preprint. The corroboration sources restate the vendor claim without independent assessment.'
about:
  - arch-cat-qubits
  - qec-magic-state-distillation
  - enable-compilers
establishedBy:
  - url: https://arxiv.org/abs/2508.03889
    title: 'Unfolded distillation: very low-cost magic state preparation for biased-noise qubits'
    relation: reports
    date: '2025-08-06'
actors: ['Alice & Bob', 'Inria']
country: ['FR']
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The "Heart Code" is a 2D layout derived by unfolding a 3D distillation code. The key enabler is the noise bias of cat qubits: their asymmetric error model means one type of error (bit-flip) is exponentially suppressed, allowing error-correction codes optimised for the remaining errors to be much cheaper.

This is a theoretical and numerical result at preprint stage. The reduction in qubit count is calculated rather than measured experimentally. Alice & Bob's cat qubit hardware has demonstrated the underlying noise bias in earlier published work, but the specific protocol has not yet been run on hardware. Peer review pending.
