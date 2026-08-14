---
schema: question/v1
id: theory-to-demo
number: 4
question: Is anything theoretical moving towards demonstration?
pillar: quantum
answer: 'GKP (Gottesman-Kitaev-Preskill) bosonic encoding moved from theoretical to experimental: entangled logical qubits have been demonstrated on trapped-ion hardware (board item arch-gkp-encoding, E3). Measurement-based quantum computing had a 16-qubit on-chip photonic demonstration at USTC (August 2026, per Quantum Computing Report — primary paper not yet sourced). qLDPC codes (bivariate bicycle, E4 demonstrated) are entering full architectural proposals. Majorana-based topological qubits moved from theoretical prediction to a claimed hardware demonstration (Microsoft Majorana 1, February 2025; Majorana 2, June 2026), but remain at E2 — vendor claims without independent peer-reviewed replication. Constant-overhead fault-tolerant computation remains theoretical (E1); no demonstration of a complete fault-tolerant algorithm on logical qubits at meaningful depth has been published.'
state: moving
asOf: '2026-08-14'
lastChanged: '2025-02-01'
changedBy: 'Microsoft Majorana 1 (February 2025) was first claimed hardware demonstration of topological qubits, moving arch-topological from pure theory to E2. GKP encoding demonstrated in experiment.'
evidence:
  - ref: arch-gkp-encoding
    kind: frontier
    note: GKP encoding demonstrated in experiment; moved from purely theoretical.
  - ref: arch-topological
    kind: frontier
    note: Majorana-based qubits at E2 emerging — vendor hardware claims, not peer-reviewed.
  - ref: qec-qldpc-bivariate-bicycle
    kind: frontier
    note: qLDPC codes demonstrated and entering full architecture proposals.
  - ref: arch-photonic
    kind: frontier
    note: Photonic QC; measurement-based variant had first on-chip multi-qubit demonstration.
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-14'
status: draft
added: '2026-08-14'
---

The clearest example of theory-to-demonstration progress is GKP encoding, which spent years as a theoretically attractive but experimentally difficult approach and has now produced entangled logical qubits in trapped-ion hardware. Measurement-based quantum computing (one-way QC using cluster states) is at an earlier stage — the photonic MBQC demonstration at USTC is notable but needs primary sourcing before the board can place it confidently.

Majorana topological qubits occupy a contested middle ground: Microsoft has made hardware claims twice (Majorana 1 in February 2025, Majorana 2 in June 2026), but the evidence level is E2 until independent peer-reviewed replication appears. The theoretical promise is large — inherent error protection, a route to a million qubits on a chip — but the gap between vendor announcement and experimental confirmation is the widest of any architecture on the board.
