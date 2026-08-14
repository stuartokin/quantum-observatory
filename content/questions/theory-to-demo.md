---
schema: question/v1
id: theory-to-demo
number: 4
question: Is anything theoretical moving towards demonstration?
pillar: quantum
answer: 'GKP bosonic encoding moved from theory to entangled logical qubit demonstration on trapped ions in 2025 (arch-gkp-encoding, E3). Process-verification frameworks for quantum advantage — previously a theoretical problem of how to certify classically-unverifiable results — were implemented in the IBM/Algorithmiq July 2026 demonstrations. Measurement-based and cluster-state computing remain primarily theoretical with no demonstration at useful scale. Majorana-based topological qubits (arch-topological) reached vendor prototype stage but independent validation of the underlying physics is incomplete. Constant-overhead fault tolerance (qLDPC) moved from theory to first hardware demonstrations in 2024–2025.'
state: moving
asOf: '2026-08-14'
lastChanged: '2026-08-14'
changedBy: GKP encoding demonstrated on trapped ions 2025; process-verification for quantum advantage implemented July 2026.
evidence:
  - ref: arch-gkp-encoding
    kind: frontier
    note: GKP encoding on trapped ions demonstrated, E3.
  - ref: qec-qldpc-bivariate-bicycle
    kind: frontier
    note: qLDPC constant-overhead codes demonstrated in hardware 2024.
  - ref: arch-topological
    kind: frontier
    note: Majorana prototype at E2; physics validation incomplete.
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-14'
status: draft
added: '2026-08-14'
---

The clearest theory-to-demonstration transition in the past year is GKP encoding, which went from a theoretical proposal with narrow experimental hints to entangled logical qubit demonstration on a trapped-ion system. The verification framework problem — a purely theoretical question about how one proves quantum advantage when classical verification is impossible — was also instantiated experimentally in the July 2026 IBM demonstrations. Measurement-based computing and cluster-state architectures remain the largest gap between theoretical promise and laboratory reality.
