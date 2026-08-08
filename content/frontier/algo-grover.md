---
schema: frontier/v1
id: algo-grover
title: Grover search
summary: Grover's algorithm provides a quadratic quantum speedup for searching unstructured databases and has been demonstrated on multiple hardware platforms.
plain: Grover's algorithm is a quantum procedure that finds a specific item in an unsorted list roughly quadratically faster than any classical method — searching a million items takes about a thousand steps instead of a million. It has been run successfully on small quantum processors, but scaling it to database sizes where the speedup matters in practice still requires far more reliable, fault-tolerant machines than exist today.
pillar: quantum
readiness: demonstrated
constellation: algorithms
actors:
  - Silicon Quantum Computing Pty Ltd
  - UNSW Sydney
country:
  - AU
metrics:
  - name: success probability
    value: "~95"
    unit: "%"
    note: Three-qubit Grover search on a four-qubit silicon processor; all gates above the fault-tolerant threshold
  - name: single-qubit gate fidelity
    value: ">99.9"
    unit: "%"
  - name: two-qubit CZ gate fidelity (best pair)
    value: "99.65 ± 0.35"
    unit: "%"
links:
  - to: arch-silicon-spin
    relation: evidence-for
  - to: qec-error-correction-threshold
    relation: depends-on
evidence:
  claim: A four-qubit silicon processor with all control fidelities above the fault-tolerant threshold demonstrated a three-qubit Grover search algorithm with approximately 95% probability of finding the marked state — one of the most successful implementations to date.
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/s41565-024-01853-5
      role: primary
      title: "Grover's algorithm in a four-qubit silicon processor above the fault-tolerant threshold"
      publisher: Nature Nanotechnology
      date: '2025-02-20'
      doi: 10.1038/s41565-024-01853-5
      identifier: Nature Nanotechnology (2025)
      accessed: '2026-08-08'
    - url: https://arxiv.org/abs/2404.08741
      role: preprint
      title: "Grover's algorithm in a four-qubit silicon processor above the fault-tolerant threshold"
      publisher: arXiv
      date: '2024-04-12'
      identifier: arXiv:2404.08741
      accessed: '2026-08-08'
confidence: high
status: published
priority: P2
qdayImpact: 0
horizon: 2
novelty: first above-threshold multi-qubit algorithm in silicon
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Grover's algorithm is a quantum search procedure with a proven quadratic speedup over classical search in unstructured databases. A 2025 peer-reviewed study from Silicon Quantum Computing and UNSW Sydney demonstrated a three-qubit Grover search on a four-qubit phosphorus-in-silicon processor, achieving approximately 95% success probability with every gate fidelity above the fault-tolerant threshold — including single-qubit fidelities above 99.9% and CZ gate fidelities above 99%. This is among the highest-fidelity multi-qubit algorithm demonstrations to date in silicon spin qubits. The result is a hardware milestone, not a practical database search: the problem size (three qubits, eight entries) is trivial classically, and scaling Grover to cryptographically meaningful search spaces would require millions of fault-tolerant logical qubits.
