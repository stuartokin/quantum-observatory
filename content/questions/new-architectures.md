---
schema: question/v1
id: new-architectures
number: 6
question: Are new architectures emerging that could outperform established ones?
pillar: quantum
answer: 'HRL''s exchange-only silicon spin QPU with fully integrated cryogenic CMOS control (Nature, July 2026) is the most concrete new architectural prototype: it uses commercial semiconductor fabrication for both qubits and control, potentially opening a scale path unavailable to superconducting or trapped-ion systems. GKP bosonic encoding is experimentally demonstrated on trapped ions (arch-gkp-encoding). Majorana-based topological qubits (arch-topological) remain at E2 with contested physics. No architecture has yet demonstrated a clear scalability advantage over superconducting or trapped-ion platforms at the system level. Cat qubits continue advancing at experimental stage.'
state: moving
asOf: '2026-08-14'
lastChanged: '2026-08-14'
changedBy: HRL Nature paper July 2026 demonstrating silicon QPU with commercial-foundry CMOS control as a complete architectural prototype.
evidence:
  - ref: arch-silicon-spin
    kind: frontier
    note: HRL Nature result is the primary new data point.
  - ref: arch-gkp-encoding
    kind: frontier
  - ref: arch-topological
    kind: frontier
    note: Contested; Microsoft Majorana 1 chip at E2.
  - ref: arch-cat-qubits
    kind: frontier
  - ref: arch-molecular-qubit
    kind: frontier
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-14'
status: draft
added: '2026-08-14'
---

The board's architecture coverage has improved materially over 2026, with items now covering GKP encoding, molecular qubits, cat qubits, Majorana systems, and ion-tweezer approaches. The HRL result adds something different from the qubit-architecture items: a full system-level architectural prototype where control, interconnect, and qubits are all built with standard semiconductor manufacturing techniques. Whether this translates to a competitive advantage over superconducting systems (which benefit from decades of fabrication investment) will not be clear for several years.
