---
schema: question/v1
id: q4-theory-to-demo
number: 4
question: 'Is anything theoretical moving towards demonstration?'
pillar: quantum
answer: 'qLDPC codes have moved from theoretical to experimentally demonstrated at small scale on neutral-atom hardware (QuEra, 2:1 overhead). GKP encoding has produced entangled logical qubits on trapped-ion hardware (arch-gkp-encoding). The Majorana-based topological qubit substrate (Microsoft Majorana 1) has been demonstrated but universal fault-tolerant operation has not. The Pinnacle Architecture (qLDPC-based RSA-scale computation) remains theoretical — its qubit overhead claims are based on simulation, not hardware. Measurement-based and cluster-state computing remain at the theoretical/emerging stage with no independent hardware demonstration at scale.'
state: moving
asOf: '2026-08-12'
lastChanged: '2026-08-12'
changedBy: 'QuEra demonstrated 2:1 physical-to-logical overhead using qLDPC codes on neutral-atom hardware in April 2026, moving qLDPC from theory into hardware demonstration.'
evidence:
  - ref: arch-gkp-encoding
    kind: frontier
    note: 'GKP encoding on trapped-ion hardware.'
  - ref: arch-topological
    kind: frontier
    note: 'Majorana substrate demonstrated; universal operation not yet shown.'
  - ref: qec-qldpc-bivariate-bicycle
    kind: frontier
    note: 'qLDPC codes demonstrated at meaningful overhead ratios.'
history: []
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-12'
status: draft
added: '2026-08-12'
---

The clearest transition this cycle is qLDPC codes moving from paper to hardware. The gap between a hardware demonstration at small scale and the performance claims of the Pinnacle Architecture (RSA-2048 scale) is large and requires non-local connectivity that has not been demonstrated. Topological qubits remain the most consequential theoretical-to-hardware open question — Majorana 1 is a substrate demonstration, and Microsoft has not yet published a peer-reviewed below-threshold result.
