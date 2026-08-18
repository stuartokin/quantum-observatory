---
schema: frontier/v1
id: algo-adapt-vmpe
title: 'ADAPT-VMPE: classical circuit generation for variational fermionic ground states'
summary: 'Classical algorithm using Majorana Propagation to generate up to 100-qubit fermionic ansätze with polynomial complexity and controllable error bounds, demonstrated on the TLD1433 photosensitiser.'
plain: 'Preparing a good starting state for a quantum chemistry calculation is hard — usually it requires either deep quantum circuits or exponential classical effort. ADAPT-VMPE sidesteps this by building the circuit entirely classically using a framework called Majorana Propagation, which tracks how quantum operators evolve under fermionic gates and truncates terms that provably contribute little to the answer. The result is a circuit that a quantum computer can then run to approximate the ground state of a molecule. The paper shows this works for up to 100-qubit problems on TLD1433, a cancer-drug candidate, reaching below chemical precision with polynomial classical cost. The algorithm is general: TLD1433 is the benchmark, not the scope.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: variational-algorithms
actors:
  - 'Algorithmiq Ltd'
country:
  - FI
metrics:
  - name: maximum ansatz size
    value: '100'
    unit: qubits
    note: 'Constructed classically for TLD1433 derivative; three active space sizes tested'
  - name: energy error
    value: '<1.6'
    unit: millihartree
    note: 'Below chemical precision threshold; achieved with monomial cutoff length 4'
  - name: computational complexity
    value: polynomial
    unit: 'in qubit count and iterations'
    note: 'Theoretical guarantee from Majorana Propagation truncation bounds'
horizon: 2
priority: P2
qdayImpact: 0
novelty: 'New classical algorithm for fermionic circuit generation; polynomial scaling with controllable error bounds'
links:
  - to: app-pdt-qb-dmrg
    relation: enables
  - to: algo-quantum-simulation
    relation: enables
  - to: app-pdt-ftqc-algorithms
    relation: enables
origin: agent
status: draft
added: '2026-08-17'
evidence:
  claim: 'Chakraborty, Miller, Nykanen et al. (Algorithmiq, arXiv:2603.23444, 24 March 2026) introduce ADAPT-VMPE, a classical algorithm that uses Majorana Propagation to iteratively construct fermionic circuit ansätze for ground state approximation. Complexity is polynomial in qubit count and iteration number. Applied to TLD1433 (a ruthenium-based photosensitiser in human clinical trials), the method constructs ansätze up to 100 qubits across active space sizes of 28, 40, and 52 fermionic modes, achieving energy errors below chemical precision (1.6 millihartree) with monomial cutoff length 4. The circuit generation runs entirely classically; the resulting circuit is intended for execution on quantum hardware. Code is not public (commercially sensitive); data available on Zenodo.'
  level: E3
  verified: '2026-08-17'
  sources:
    - url: https://arxiv.org/abs/2603.23444
      role: preprint
      title: 'Scalable quantum circuit generation for iterative ground state approximation using Majorana Propagation'
      publisher: arXiv quant-ph
      date: '2026-03-24'
      identifier: 'arXiv:2603.23444'
      accessed: '2026-08-17'
      note: 'Preprint only as of verification date; no journal version found. Code withheld as commercially sensitive; numerical data on Zenodo.'
confidence: medium
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-17'
  reviewedOn: '2026-08-18'
  note: 'arXiv:2603.23444 HTML opened; all authors confirmed at Algorithmiq Ltd. TLD1433 active spaces 28/40/52 confirmed. <1.6 mHa at cutoff 4 confirmed. Code withheld commercially sensitive confirmed. Data on Zenodo confirmed. E3 correct for preprint. No changes.'
---

**What happened.** Algorithmiq researchers introduced ADAPT-VMPE, a classical algorithm that generates quantum circuit ansätze for molecular ground-state problems using their Majorana Propagation (MP) framework. MP tracks operator evolution under fermionic gates in Heisenberg picture and truncates high-length Majorana monomials — terms the theory proves contribute exponentially little to expectation values. The result is a scalable circuit-construction procedure with polynomial cost and provable error bounds, demonstrated on up to 100-qubit problems for TLD1433.

**Why it matters.** State preparation is a recognised bottleneck for near-term variational quantum algorithms: classical optimisers struggle with barren plateaus and the quantum hardware cost of exploring circuit space is high. ADAPT-VMPE offloads the ansatz construction entirely to classical computation, producing circuits ready for hardware execution. If the polynomial complexity scaling holds for larger active spaces, it removes a significant pre-computation bottleneck that has constrained variational quantum chemistry to small molecules.

**Position in the PDT pipeline.** This paper describes the circuit-generation stage; app-pdt-qb-dmrg describes the post-processing stage (QB-DMRG) that consumes circuits produced this way. They are distinct contributions from the same group.

**Previous state of the art.** ADAPT-VQE (Grimsley et al., 2019) generates circuits adaptively but requires quantum hardware or expensive classical statevector simulation for gradient evaluation. Majorana Propagation replaces that with a classical truncation scheme.

**Limitations.** Code is not public; independent replication has not been reported. The complexity guarantee relies on assumptions about monomial length distributions that hold for typical unstructured circuits — structured Hamiltonians may behave differently. The benchmark (TLD1433) comes from the same group's wider programme, so the benchmark choice itself is not independent.

**What would change the assessment.** Independent replication by a group outside Algorithmiq, or application to a molecule where classical DMRG is the established gold standard and the comparison is clean, would lift this to E4/E5 and possibly to experimental. A journal publication with open code would allow direct verification of the polynomial scaling claim.
