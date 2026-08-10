---
schema: frontier/v1
id: algo-grover
title: Grover search
summary: 'Quantum search algorithm offering quadratic speedup over classical unstructured search, demonstrated with better-than-classical success probability on IBM superconducting hardware using error detection and dynamical decoupling.'
plain: 'Grover''s algorithm lets a quantum computer find a needle in a haystack database in roughly the square root of the number of steps a classical computer would need. It has been run on real quantum hardware and shown to beat classical computers — though only on small problem sizes so far. Its main practical relevance is that it would halve the effective key length of symmetric encryption (e.g. AES-128 becomes as hard as AES-64 against a quantum attacker), which is why NIST built it into its post-quantum security level definitions.'
pillar: quantum
readiness: demonstrated
constellation: algorithms
actors:
  - 'University of Southern California'
country:
  - US
metrics:
  - name: 'Maximum qubits with better-than-classical success probability'
    value: '5'
    unit: qubits
    note: 'On IBM transmon hardware; 99.5% success at 2 qubits with [[4,2,2]] QED code'
priority: P1
qdayImpact: 1
qdayReasoning: 'Grover search at scale would halve the effective security of symmetric ciphers. Demonstrated only at 5 qubits — far from cryptographically relevant scale. Directly informs NIST PQC security category definitions (Category 1 = AES-128 Grover hardness) and so sets the bar for PQC migration urgency, giving it a marginal positive impact on Q-Day framing without constituting a near-term threat.'
horizon: 2
novelty: 'Better-than-classical performance demonstrated with error detection'
evidence:
  claim: 'Pokharel and Lidar (2024) report better-than-classical success probabilities for a complete Grover search algorithm on up to 5 qubits using two IBM superconducting transmon platforms, achieving 99.5% success probability at 2 qubits via the [[4,2,2]] quantum error-detection code and dynamical decoupling. This is the first demonstration of quantum algorithmic breakeven via quantum error detection for Grover search.'
  level: E4
  verified: '2026-08-08'
  sources:
    - url: 'https://www.nature.com/articles/s41534-023-00794-6'
      role: primary
      title: 'Better-than-classical Grover search via quantum error detection and suppression'
      publisher: 'npj Quantum Information'
      date: '2024-02-20'
      identifier: 'npj Quantum Information 10, 23 (2024)'
      doi: 10.1038/s41534-023-00794-6
      accessed: '2026-08-08'
      note: 'Peer-reviewed. Preprint arXiv:2211.04543 submitted November 2022.'
links:
  - to: crqc
    relation: evidence-for
  - to: algo-resource-estimation
    relation: enables
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-10'
  note: 'npj Quantum Information 10, 23 (2024) confirmed via Nature website and ResearchGate cross-check; DOI 10.1038/s41534-023-00794-6 verified. Better-than-classical at up to 5 qubits, 99.5% success at 2 qubits with [[4,2,2]] QED, dynamical decoupling confirmed. E4 correct for peer-reviewed result. No independent replication by a separate institution found. No changes made.'
---

Grover's algorithm provides a provable quantum speedup for unstructured database search, requiring O(√N) oracle queries versus O(N) classically. Its cryptographic significance is that it halves the effective bit-security of symmetric ciphers — AES-128 has ~64 bits of quantum security rather than 128 — which defines NIST's post-quantum security categories.

The 2024 peer-reviewed result from the University of Southern California demonstrated better-than-classical success probability on up to 5 physical qubits using IBM quantum hardware, with 99.5% success at 2 qubits using the [[4,2,2]] error-detection code. This constitutes algorithmic breakeven via quantum error detection. Larger demonstrations exist but have not achieved better-than-classical performance at scale.
