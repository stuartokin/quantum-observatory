---
schema: frontier/v1
id: algo-cryptanalytic-runtime
title: 'Cryptanalytic circuit runtime: the qubit-runtime tradeoff in RSA-2048 estimates'
summary: 'Each RSA-2048 resource estimate is a qubit-count/runtime pair. Reducing qubits extends runtime: Gidney 2021 (20 M qubits, 8 hours), Gidney 2025 (<1 M qubits, <1 week), Pinnacle 2026 (<100 k qubits, ~1 month), Cain 2026 (~10 k qubits, months). Sustained fault-tolerant operation over days is itself an unmet engineering requirement independent of qubit count.'
plain: 'Breaking RSA-2048 with a quantum computer requires not just millions of physical qubits, but also continuous fault-tolerant operation for days to months — a second engineering constraint the board''s qubit-count figures do not make explicit. Every published estimate is a pair: a qubit count and a runtime, and the two trade against each other. Gidney and Ekerå (2021) required 20 million qubits to factor RSA-2048 in eight hours. Gidney (2025) cut qubits roughly twenty-fold to under one million, but the runtime grew to under one week (~5 days), because fewer parallel magic-state factories mean the circuit runs deeper rather than wider. The Pinnacle Architecture (Iceberg Quantum, 2026) cuts qubits to under 100,000 by switching to qLDPC error-correcting codes, but the runtime rises to roughly one month at the same hardware assumptions. Cain et al. (2026) propose as few as 10,000 qubits on a neutral-atom platform; RSA-2048 runtime at minimum qubit count is one to two orders of magnitude longer than for ECC-256, implying months. No quantum system has sustained continuous fault-tolerant operation for even hours. The board''s own precedent says an estimate trading space for an impractical runtime is not a threat metric; this item makes the runtime of each estimate explicit so that precedent can be applied consistently.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: resource-estimation
actors:
  - 'Craig Gidney (Google Quantum AI)'
  - 'Craig Gidney and Martin Ekerå'
  - 'Paul Webster et al. (Iceberg Quantum, Sydney)'
  - 'Madelyn Cain et al. (Oratomic / Caltech)'
metrics:
  - name: Gidney-Ekerå 2021 qubit count
    value: '20000000'
    unit: physical qubits
    note: '8-hour runtime; 0.1% gate error, 1 µs surface-code cycle, 10 µs reaction time'
  - name: Gidney 2025 qubit count
    value: '<1000000'
    unit: physical qubits
    note: '<1 week (~5 day) runtime; same hardware assumptions; ~6.5e9 Toffoli gates'
  - name: Pinnacle 2026 qubit count
    value: '<100000'
    unit: physical qubits
    note: '~1 month runtime at 1 µs cycle, 0.1% error; qLDPC codes; preprint only'
  - name: Cain 2026 minimum qubit count
    value: '9739'
    unit: physical qubits
    note: 'RSA-2048 runtime 1-2 orders of magnitude longer than ECC-256 at minimum qubit count'
links:
  - to: algo-resource-estimation
    relation: evidence-for
  - to: algo-shor
    relation: depends-on
  - to: crqc
    relation: enables
  - to: qec-below-threshold-surface-code
    relation: depends-on
evidence:
  claim: 'Gidney and Ekerå (Quantum, 2021) estimated RSA-2048 factoring requires 20 million noisy physical qubits in 8 hours, assuming 0.1% gate error, 1 µs surface-code cycle time, and 10 µs reaction time. Gidney (arXiv:2505.15917, 2025) reduced the qubit count to under one million using approximate residue arithmetic, yoked surface codes, and magic-state cultivation, at the cost of a longer runtime under one week; the Toffoli count is approximately 6.5 × 10^9 — the spacetime product did not shrink proportionally. Webster et al. (Iceberg Quantum, arXiv:2602.11457, 2026) claim RSA-2048 with fewer than 100,000 physical qubits using qLDPC codes, at a runtime of approximately one month (1 µs cycle, 0.1% error); shorter runtimes require additional physical qubits. Cain et al. (arXiv:2603.28627, 2026) propose as few as 9,739 reconfigurable neutral-atom qubits, with ECC-256 solvable in a few days at 26,000 qubits but RSA-2048 runtime one to two orders of magnitude longer at minimum qubit count. In all cases the computation requires sustained active fault correction; no system has demonstrated continuous fault-tolerant operation for even hours.'
  verified: '2026-08-19'
  level: E3
  sources:
    - url: https://quantum-journal.org/papers/q-2021-04-15-433/
      role: primary
      title: How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits
      publisher: Quantum
      date: '2021-04-15'
      identifier: 'Quantum 5, 433 (2021)'
      doi: 10.22331/q-2021-04-15-433
      note: 'Peer-reviewed. Sets the 20 M qubit / 8-hour baseline with explicit hardware assumptions adopted in all subsequent estimates.'
    - url: https://arxiv.org/abs/2505.15917
      role: preprint
      title: How to factor 2048 bit RSA integers with less than a million noisy qubits
      publisher: arXiv
      date: '2025-05-21'
      identifier: arXiv:2505.15917
      doi: 10.48550/arXiv.2505.15917
      note: 'Reduces qubit count 20x to under one million; runtime grows to under one week. Same hardware assumptions as 2021. Not yet peer-reviewed as of 2026-08-19.'
    - url: https://arxiv.org/abs/2602.11457
      role: preprint
      title: 'The Pinnacle Architecture: Reducing the cost of breaking RSA-2048 to 100 000 physical qubits using quantum LDPC codes'
      publisher: arXiv
      date: '2026-02-12'
      identifier: arXiv:2602.11457
      accessed: '2026-08-19'
      note: 'Iceberg Quantum, Sydney. Claims <100 k qubits at ~1 month runtime using qLDPC codes. Not peer-reviewed. Runtime stated in paper Figure 3 and abstract. Gidney publicly noted concerns about assumptions.'
    - url: https://arxiv.org/abs/2603.28627
      role: preprint
      title: 'Shor''s algorithm is possible with as few as 10,000 reconfigurable atomic qubits'
      publisher: arXiv
      date: '2026-03-30'
      identifier: arXiv:2603.28627
      accessed: '2026-08-19'
      note: 'Cain et al. (Oratomic/Caltech). Minimum 9,739 qubits; RSA-2048 runtime 1-2 orders of magnitude longer than ECC-256 at minimum qubit count per abstract.'
confidence: medium
status: draft
priority: P1
qdayImpact: 0
qdayReasoning: 'The spacetime product of the Shor circuit has not shrunk as fast as headline qubit figures suggest. Gidney 2021: 20 million qubits, 8 hours. Gidney 2025: under 1 million qubits, ~5 days — Toffoli count roughly doubled versus 2021, so the spacetime product is comparable. Pinnacle 2026: under 100,000 qubits, ~1 month — similar total computational volume, packaged differently using qLDPC codes. Runtime of days to months of uninterrupted fault-tolerant operation is an engineering threshold that no system has approached. Per the board''s own precedent, an estimate trading space for an impractical runtime is not a threat metric; qdayImpact is therefore 0. This item documents the constraint that must be checked before any qubit-count reduction is used to move the Q-Day forecast. Reviewers should verify the runtime column before scoring any future qubit-reduction finding.'
country:
  - US
  - AU
novelty: 'Surfaces the runtime dimension of published qubit estimates; spacetime product roughly conserved across three orders of magnitude of qubit reduction'
horizon: 2
origin: agent
added: '2026-08-19'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-19'
  note: 'Gidney-Ekerå 2021 sourced from quantum-journal.org (peer-reviewed). Gidney 2025 from arxiv.org/abs/2505.15917 (preprint E3). Pinnacle from arxiv.org/abs/2602.11457 (preprint E3, Iceberg Quantum). Cain from arxiv.org/abs/2603.28627 (preprint E3, Oratomic/Caltech). Item rated E3 overall as synthesis across preprints plus one peer-reviewed record. Checked board list: algo-resource-estimation exists but records qubit counts without paired runtimes; this is not a duplicate.'
---

## What happened

Every published estimate of the qubits needed to break RSA-2048 comes paired with a runtime — but the board records only the qubit count. The runtime matters because the two trade against each other, and the board's own precedent already says an estimate that buys fewer qubits with an impractical runtime is not a threat metric. Without the runtime figures on the board, that precedent cannot be applied consistently.

The trajectory of published estimates:

| Source | Physical qubits | Runtime | Code |
|---|---|---|---|
| Gidney–Ekerå 2021 (peer-reviewed) | 20 million | 8 hours | Surface code |
| Gidney 2025 (preprint) | <1 million | <1 week | Surface code |
| Webster et al. 2026 (preprint) | <100,000 | ~1 month | qLDPC |
| Cain et al. 2026 (preprint) | ~10,000 | months | qLDPC / neutral-atom |

All four use the same headline hardware assumptions (0.1% gate error, 1 µs code cycle, 10 µs reaction time for the superconducting baseline).

## Why it matters

The spacetime product — qubits multiplied by runtime — has not shrunk proportionally with the qubit count. Gidney 2025 roughly doubled the Toffoli count relative to 2021 (fewer parallel magic-state factories, deeper circuit) to achieve the 20× qubit reduction. Pinnacle rearranges the overhead again using different error-correcting codes. The total compute volume is roughly conserved, just packaged differently.

No quantum system has demonstrated sustained fault-tolerant operation for even hours, let alone the continuous days-to-months a cryptanalytic run now requires. This is an engineering gap independent of and comparable in scale to the qubit gap. A machine with the right qubit count but insufficient runtime stability cannot break RSA-2048.

## Previous state of the art

The board's `algo-resource-estimation` item recorded the Gidney 2025 qubit figure without the paired runtime. The `crqc` item discusses the overall gap but does not itemise the runtime requirement as a distinct engineering constraint.

## Limitations

All four estimates are theoretical. The Pinnacle and Cain figures are unreviewed preprints. The Pinnacle runtime is explicitly stated in the paper (Figure 3 and abstract); the Cain RSA-2048 runtime is inferred from the abstract statement that it is "one to two orders of magnitude longer" than ECC-256 at minimum qubit count. Gidney has publicly noted concerns about Pinnacle's hardware assumptions. The 10,000-qubit Cain figure has attracted critical commentary about whether the minimum-qubit configuration is operationally realistic.

## What would change this assessment

Peer review of the Pinnacle and Cain preprints with independent verification of the runtime claims. A demonstration of sustained fault-tolerant operation for even 24 hours would be the first credible evidence that the runtime constraint is tractable, and would warrant revisiting the priority of runtime-sensitive estimates.
