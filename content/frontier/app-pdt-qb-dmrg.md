---
schema: frontier/v1
id: app-pdt-qb-dmrg
title: 'QB-DMRG: quantum-boosted DMRG for photosensitizer design in photodynamic therapy'
summary: 'Algorithmiq demonstrated a hybrid quantum-classical QB-DMRG pipeline for excited-state simulation of BODIPY photosensitizers on up to 100 qubits of IBM hardware, winning the 2.5-year Wellcome Leap Q4Bio challenge in April 2026.'
plain: 'Photodynamic therapy (PDT) is a cancer treatment that uses light-activated drug molecules called photosensitizers to destroy tumour cells. Designing better photosensitizers requires accurate simulation of how molecules absorb and emit light — a calculation that overwhelms standard classical methods for realistic molecule sizes. Algorithmiq built a hybrid pipeline called QB-DMRG that uses a quantum computer to generate correlated quantum states, then feeds those states into a classical tensor-network (DMRG) solver to achieve lower-energy solutions than classical DMRG alone at the same computational cost. The team ran this on IBM quantum hardware at up to 100 qubits and won the sole $2 million prize from the Wellcome Leap Q4Bio programme. No peer-reviewed paper for the full pipeline has been published yet; the evidence is a company white paper and prize-announcement press releases.'
pillar: quantum
readiness: emerging
constellation: applications
cluster: drug-discovery
actors:
  - 'Algorithmiq (Helsinki, Finland)'
  - 'Cleveland Clinic'
  - 'IBM Quantum'
metrics:
  - name: circuit-width
    value: '100'
    unit: qubits
    note: 'Ground- and excited-state circuits executed on IBM hardware; figure from Algorithmiq white paper and press release.'
country:
  - FI
  - US
links:
  - to: app-hybrid-protein-simulation
    relation: competes-with
  - to: app-quantum-chemistry-catalyst
    relation: competes-with
  - to: algo-quantum-simulation
    relation: depends-on
  - to: arch-superconducting
    relation: depends-on
evidence:
  claim: 'Algorithmiq white paper (Q4Bio perspective, algorithmiq.fi, 2024/2026) describes a QB-DMRG hybrid workflow combining low-depth quantum circuits with classical DMRG tensor networks for excited-state electronic structure of BODIPY photosensitizers. Circuits ran on IBM quantum hardware at up to 100 qubits. The paper states quantum-generated samples achieved lower energy than classical DMRG at the same bond dimension. IBM newsroom and Algorithmiq press release (April 2026) confirm Algorithmiq won the sole $2 million Q4Bio prize. No arXiv preprint or journal DOI has been found for the full QB-DMRG pipeline as of 2026-08-18. Evidence ceiling is E2: company PDF plus vendor/prize-body press releases.'
  verified: '2026-08-16'
  level: E2
  sources:
    - url: https://algorithmiq.fi/publications/Q4Bio_Perspective_Paper.pdf
      role: vendor
      title: 'Photodynamic Therapy as a Driver for Useful Quantum Advantage in Chemistry: Perspective from the Q4Bio program'
      publisher: Algorithmiq
      date: '2024-01-01'
      accessed: '2026-08-16'
      note: 'Company white paper; no arXiv ID or journal DOI. Date approximate — no explicit publication date on document; Q4Bio prize awarded April 2026. Describes QB-DMRG workflow and 100-qubit IBM hardware demonstration. E2: vendor document on company website.'
    - url: https://algorithmiq.fi/news/algorithmiq-wins-2-million-wellcome-leap-prize-for-quantum-enabled-cancer-drug-discovery-development/
      role: vendor
      title: 'Algorithmiq Wins $2 Million Wellcome Leap Prize for Quantum-Enabled Cancer Drug Discovery and Development'
      publisher: Algorithmiq
      date: '2026-04-16'
      accessed: '2026-08-16'
      note: 'Prize-announcement press release. Corroborates 100-qubit figure and QB-DMRG description. E2.'
confidence: low
status: draft
origin: agent
priority: P2
qdayImpact: 0
horizon: 2
novelty: 'first healthcare domain application at 100 qubits; QB-DMRG method novel'
added: '2026-08-16'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-16'
  reviewedOn: '2026-08-18'
  note: 'Q4Bio outcome confirmed via wellcomeleap.org: $2M for scalable path to future advantage, $5M grand prize unawarded, Algorithmiq sole winner. 100-qubit claim in both white paper and press release. No arXiv preprint found for QB-DMRG pipeline as of 2026-08-18. E2 correct: vendor white paper and press releases only. Raise to E3 if arXiv preprint appears. No changes.'
---

## QB-DMRG for photodynamic therapy drug design

**What happened.** Algorithmiq, in collaboration with Cleveland Clinic and IBM, won the sole $2 million prize from Wellcome Leap's Q4Bio challenge (concluded April 2026) for demonstrating a hybrid quantum-classical pipeline applied to photosensitizer molecules used in photodynamic cancer therapy. The core method, QB-DMRG, uses a low-depth quantum circuit to prepare correlated electronic states on IBM quantum hardware, measures those states informationally-completely, then feeds the resulting data into a classical DMRG tensor-network solver. The claim is that quantum-generated samples allow DMRG to reach lower energies than it could achieve classically at the same bond dimension — meaning the quantum step extends the reach of the best classical method rather than replacing it. Circuits were executed at up to 100 qubits.

**Why it matters.** Excited-state electronic structure of photosensitizer molecules (particularly the BODIPY family) is a regime where classical methods — TDDFT, EOM-CCSD — are known to fail at realistic molecule sizes because strong electron correlation cannot be captured efficiently. If the QB-DMRG claim holds, it identifies a concrete computational bottleneck in drug design where quantum hardware could provide value before fault tolerance. The Q4Bio framework required demonstrability on current hardware, biological relevance, and validation against classical benchmarks — a stricter set of criteria than most quantum advantage claims.

**Previous state of the art.** Classical DMRG is the leading method for strongly correlated electronic structure; its cost scales with bond dimension. VQE and ADAPT-VQE methods have been demonstrated for excited states of small photosensitizer molecules (Nykänen et al., J. Phys. Chem. Lett. 2024), but not at the 100-qubit scale claimed here.

**Limitations.** The full QB-DMRG pipeline result has not been published as a peer-reviewed paper or arXiv preprint as of 2026-08-18. The evidence is an Algorithmiq white paper and prize-body press releases, placing the ceiling at E2. The 100-qubit figure is a circuit-width claim; it does not imply 100 logical or error-corrected qubits. No independent replication of the QB-DMRG advantage claim has been reported.

**What would change this assessment.** An arXiv preprint or journal publication of the full QB-DMRG pipeline result would raise this to E3 or E4. Independent replication on a different hardware platform would be E5 evidence for the method. A classical counter-simulation showing the same energy can be reached without quantum hardware would reduce confidence further.
