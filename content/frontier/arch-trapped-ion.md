---
schema: frontier/v1
id: arch-trapped-ion
title: Trapped-ion QCCD
summary: 'Ions shuttled between zones in a vacuum trap. Highest gate fidelities and all-to-all connectivity; slower clock speed. Peer-reviewed Nature paper (Ransford et al. 2026) confirms 99.921% two-qubit gate fidelity on 98-qubit Helios.'
plain: 'Individual charged atoms held still in a vacuum by electric fields and manipulated with lasers. Every atom is identical, which makes them exceptionally accurate, and any one can be moved next to any other. The drawback is speed: physically shuttling atoms takes time, so operations are slower than rival approaches. Quantinuum''s Helios processor achieved 99.921% two-qubit gate fidelity across all 98 qubits — the highest reported for a commercial system — validated independently by Sandia National Laboratories under a DOE cooperative agreement.'
pillar: quantum
constellation: architectures
readiness: adopted
actors:
  - Quantinuum
  - Sandia National Laboratories
metrics:
  - name: Physical qubits (Helios)
    value: '98'
    unit: qubits
    note: 'barium-137 hyperfine qubits; all-to-all connectivity via rotatable ion storage ring'
  - name: Two-qubit gate fidelity
    value: '99.921'
    unit: '%'
    note: 'Average infidelity 7.9(2)×10⁻⁴ across all operational zones; Ransford et al. Nature 655 (2026)'
  - name: Single-qubit gate fidelity
    value: '99.9975'
    unit: '%'
    note: 'Average infidelity 2.5(1)×10⁻⁵; Ransford et al. Nature 655 (2026)'
  - name: SPAM fidelity
    value: '99.967'
    unit: '%'
    note: 'Average infidelity 3.3(5)×10⁻⁴; Ransford et al. Nature 655 (2026)'
evidence:
  claim: 'Ransford et al. (Quantinuum and Sandia National Laboratories, Nature 655, 81-86, June 2026) report Helios, a 98-qubit trapped-ion QCCD processor using 137Ba+ hyperfine qubits with all-to-all connectivity. Averaged over all operational zones in the system, average infidelities are 2.5(1)×10⁻⁵ for single-qubit gates, 7.9(2)×10⁻⁴ for two-qubit gates, and 3.3(5)×10⁻⁴ for SPAM. Sandia National Laboratories evaluated and verified the system under a DOE Cooperative Research and Development Agreement. The paper demonstrates performance beyond the reach of classical simulation on random circuit sampling benchmarks. Separate preprint work (Dasu et al., arXiv:2602.22211) shows 48 error-corrected logical qubits from the same 98-qubit hardware using iceberg codes at 2:1 overhead.'
  verified: '2026-08-11'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-026-10676-4
      role: primary
      title: 'A 98-qubit trapped-ion quantum computer with all-to-all connectivity'
      publisher: Nature
      date: '2026-06-17'
      identifier: 'Nature 655, 81-86 (2026)'
      doi: 10.1038/s41586-026-10676-4
      accessed: '2026-08-11'
      note: 'Ransford et al.; Quantinuum and Sandia National Laboratories. Peer-reviewed. Sandia co-authored and independently verified fidelity figures under DOE CRADA (renewed May 2026 per Sandia LabNews). Publisher correction issued 7 July 2026 (DOI 10.1038/s41586-026-10882-0); fidelity claims unchanged. Infidelities confirmed: 2.5(1)×10⁻⁵ (1Q), 7.9(2)×10⁻⁴ (2Q), 3.3(5)×10⁻⁴ (SPAM). Confirmed via nature.com, Sandia LabNews, quantumcomputingreport.com.'
    - url: https://arxiv.org/abs/2511.05465
      role: preprint
      title: 'Helios: A 98-qubit trapped-ion quantum computer'
      publisher: arXiv
      date: '2025-11-07'
      identifier: 'arXiv:2511.05465'
      doi: 10.48550/arXiv.2511.05465
      accessed: '2026-08-09'
      note: 'Preprint version; SPAM figure in preprint (4.8(6)×10⁻⁴) differs slightly from published paper (3.3(5)×10⁻⁴). Published figures are authoritative.'
links:
  - to: arch-superconducting
    relation: competes-with
  - to: arch-neutral-atom
    relation: competes-with
  - to: qec-realtime-decoding
    relation: depends-on
  - to: enable-fabrication
    relation: depends-on
moved:
  from: demonstrated
  on: '2026-07-02'
priority: P1
horizon: 1
qdayImpact: 1
qdayReasoning: 'A 2:1 physical-to-logical overhead in a commercial system (demonstrated in separate iceberg-code work on the same hardware, Dasu et al. arXiv:2602.22211) is far below usual surface-code assumptions (~1000:1), though at small absolute qubit count. The hardware paper itself (Ransford et al.) confirms the underlying gate fidelities that make this possible.'
country:
  - US
confidence: high
status: published
added: '2026-08-04'
origin: human
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-09'
  reviewedOn: '2026-08-11'
  note: 'Nature 655, 81-86 re-confirmed this run via nature.com abstract and quantumcomputingreport.com and Sandia LabNews (July 2026). Fidelities 2.5(1)×10⁻⁵ (1Q), 7.9(2)×10⁻⁴ (2Q), 3.3(5)×10⁻⁴ (SPAM) confirmed from nature.com. Sandia DOE CRADA confirmed as renewed May 2026. E4 correct. No changes made.'
---

Trapped-ion QCCD (quantum charge-coupled device) computers confine individual charged atoms in a vacuum using electric fields, manipulate them with lasers, and physically shuttle ions between operational zones to implement two-qubit gates between any pair. The all-to-all connectivity is a fundamental architectural advantage over nearest-neighbour platforms.

Quantinuum's Helios processor uses 137Ba⁺ hyperfine qubits — a switch from the ytterbium ions of earlier H-series machines — with a rotatable ion storage ring connecting two quantum operation regions. Ransford et al. (Nature 655, June 2026) report average two-qubit gate infidelity of 7.9(2)×10⁻⁴ (99.921% fidelity) across all operational zones. Single-qubit infidelity is 2.5(1)×10⁻⁵ (99.9975%). These figures were evaluated and verified by Sandia National Laboratories under a long-standing DOE Cooperative Research and Development Agreement — making this one of the few commercial quantum computing results with explicit independent institutional verification in the published paper.

A separate preprint (Dasu et al., arXiv:2602.22211) demonstrates that the same hardware achieves 48 error-corrected logical qubits at a 2:1 physical-to-logical overhead using iceberg codes, enabled by the all-to-all connectivity that allows the global stabilizer measurements these codes require.
