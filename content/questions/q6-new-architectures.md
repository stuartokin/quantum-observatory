---
schema: question/v1
id: q6-new-architectures
number: 6
question: 'Are new architectures emerging that could outperform established ones?'
pillar: quantum
answer: 'qLDPC codes are the most significant emerging alternative to surface codes for fault-tolerant overhead. The Pinnacle Architecture (Iceberg Quantum, February 2026) is the most aggressive published design using qLDPC, claiming 10x fewer physical qubits for RSA-2048 at the cost of requiring non-local connectivity not yet demonstrated at scale. Neutral-atom arrays are scaling fastest on demonstrated logical qubit counts. Majorana-based topological qubits remain a longer-horizon alternative — the substrate is demonstrated but universal operation is not. Bosonic and cat qubit approaches (Alice & Bob) have demonstrated hour-scale bit-flip lifetimes. No single platform is dominant across all dimensions.'
state: moving
asOf: '2026-08-12'
lastChanged: '2026-02-12'
changedBy: 'Pinnacle Architecture preprint (arXiv:2602.11457, February 2026) from Iceberg Quantum is the most aggressive published qLDPC-based architecture design to date.'
evidence:
  - ref: arch-topological
    kind: frontier
    note: 'Majorana substrate demonstrated; universal fault-tolerant operation not shown.'
  - ref: arch-neutral-atom
    kind: frontier
    note: 'Neutral atoms leading on demonstrated logical qubit scale.'
  - ref: arch-cat-qubits
    kind: frontier
    note: 'Bosonic/cat qubit hour-scale bit-flip lifetimes demonstrated.'
  - ref: qec-qldpc-bivariate-bicycle
    kind: frontier
    note: 'qLDPC the emerging code family competing with surface codes.'
history:
  - date: '2026-02-12'
    was: 'Surface codes dominant; qLDPC demonstrated on small scale only. Topological qubits at substrate demonstration stage.'
    why: 'Pinnacle Architecture preprint introduced qLDPC-based RSA-scale computation design.'
    by: agent
    agent: scout
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-12'
status: draft
added: '2026-08-12'
---

The architecture landscape is more genuinely contested than at any previous point in this board's history. Surface codes remain the most experimentally validated approach. qLDPC codes offer substantially better overhead ratios on paper and at small scale. The neutral-atom modality has demonstrated the highest logical qubit count to date. The race between these approaches will determine the physical qubit count required for fault-tolerant computation — which in turn is the central variable in Q-Day timing.
