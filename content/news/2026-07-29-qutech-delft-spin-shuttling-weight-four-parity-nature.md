---
schema: news/v1
id: 2026-07-29-qutech-delft-spin-shuttling-weight-four-parity-nature
headline: QuTech and Delft demonstrate weight-four parity checks in silicon via spin-shuttling, reaching surface-code connectivity milestone
pillar: quantum
date: '2026-07-29'
plain: 'Surface-code error correction requires that each physical qubit interact with four neighbours — weight-four parity checks — but silicon spin qubits sitting in fixed positions cannot reach non-adjacent qubits without additional connectivity. A team from QuTech and Delft University of Technology led by Brennan Undseth has demonstrated a solution: a mobile ancilla qubit physically shuttles along a silicon channel to interact sequentially with four stationary data qubits, forming a five-qubit processor capable of performing both X- and Z-type parity checks up to weight four. This is the connectivity building block that surface codes require, now demonstrated for the first time in a silicon spin-qubit architecture. The result opens a direct path toward error-correction experiments with spin qubits and shows that sparse arrays with a mobile bus qubit can replace dense fixed-coupling layouts that are harder to wire and control at scale.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-026-10766-3
  kind: paper
  title: 'Weight-four parity checks in a spin-shuttling architecture'
  publisher: Nature
  date: '2026-07-29'
  doi: 10.1038/s41586-026-10766-3
corroboration:
  - url: https://www.natureasia.com/en/info/press-releases/detail/9398
    publisher: Nature Portfolio
    kind: press
  - url: https://phys.org/news/2026-07-independent-semiconductor-qubits-scales.html
    publisher: phys.org
    kind: journalism
  - url: https://www.nccr-spin.ch/news/zuwn9hxsz3syuha67zsl8topjcgrvm
    publisher: NCCR SPIN
    kind: authority
validation:
  status: verified
  checks:
    - 'Nature abstract page opened; doi 10.1038/s41586-026-10766-3 confirmed. Nature 655, 1160–1166 (2026). Published 29 July 2026.'
    - 'arXiv preprint 2601.23267 opened and confirmed as the underlying work, posted January 30, 2026.'
    - 'NCCR SPIN (Swiss national quantum programme) commentary opened as independent corroboration, describing the same result and placing it in context.'
    - 'Nature Portfolio press release confirms both this paper and the companion HRL paper in the same issue.'
    - 'No contradicting report found.'
about:
  - arch-silicon-spin
  - qec-surface-code
  - qec-error-correction-threshold
  - qec-below-threshold-surface-code
establishedBy:
  - url: https://arxiv.org/abs/2601.23267
    title: Weight-four parity checks with silicon spin qubits
    relation: reports
    date: '2026-01'
actors: [QuTech, Delft University of Technology]
country: [NL]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The device contains a shuttling bus that coherently transports qubits and can make them interact at four isolated locations called bus stops. The team used quantum non-demolition spin measurements to tune all single- and two-qubit operations without access to charge sensing in most of the device — a practically important finding, since charge sensing adds hardware overhead. The largest entangled state produced was a five-qubit GHZ state across all qubit combinations in the array, described as the largest such state ever constructed with gate-defined semiconductor spins. The complementary HRL paper in the same issue addresses the wiring and control problem; this paper addresses the connectivity problem. Together they represent the most significant month for silicon spin qubits in the field's history.
