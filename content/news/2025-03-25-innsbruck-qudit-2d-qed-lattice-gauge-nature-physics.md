---
schema: news/v1
id: 2025-03-25-innsbruck-qudit-2d-qed-lattice-gauge-nature-physics
headline: Innsbruck group simulates 2D quantum electrodynamics on a trapped-ion qudit processor in Nature Physics, completing a decade-long goal for lattice gauge theory
pillar: quantum
date: '2025-03-25'
plain: Researchers at the University of Innsbruck published in Nature Physics the first experimental simulation of two-dimensional quantum electrodynamics using trapped-ion qudits. Standard qubits encode two states; qudits encode many — and gauge fields in QED require high-dimensional representations that qubits encode only awkwardly. The Innsbruck group used its universal qudit processor to simulate 2D QED on a small lattice, extending lattice gauge theory simulation from one spatial dimension to two. This is a small-scale laboratory demonstration, not a practically useful physics calculation, but it establishes qudit hardware as a viable platform for the class of problems where high-dimensional encoding matters.
significance: notable
source:
  url: https://www.nature.com/articles/s41567-025-02797-w
  kind: paper
  title: Simulating two-dimensional lattice gauge theories on a qudit quantum computer
  publisher: Nature Physics
  date: '2025-03-25'
  doi: 10.1038/s41567-025-02797-w
corroboration:
  - url: https://www.nature.com/articles/s41567-025-02821-z
    publisher: Nature Physics
    kind: paper
validation:
  status: verified
  checks:
    - 'Nature Physics paper doi:10.1038/s41567-025-02797-w confirmed; publication date March 25 2025; lead author Michael Meth, senior author Martin Ringbauer, University of Innsbruck'
    - 'Accompanying Research Briefing doi:10.1038/s41567-025-02821-z in the same journal independently summarises the decade-long framing and confirms this is the first 2D QED simulation'
    - 'Checked: distinct from the 2024 PRX Quantum paper by Calajó et al. (1+1D SU(2) simulation, different group, different gauge group, one spatial dimension)'
    - 'Noted: this is a small-lattice demonstration; lattice sizes that would challenge classical methods remain far beyond current hardware'
about:
  - algo-quantum-simulation
  - arch-trapped-ion
establishedBy:
  - url: https://www.nature.com/articles/s41567-025-02797-w
    title: Simulating two-dimensional lattice gauge theories on a qudit quantum computer
    publisher: Nature Physics
    date: '2025-03-25'
    doi: 10.1038/s41567-025-02797-w
    relation: reports
  - url: https://www.nature.com/articles/s41567-022-01658-0
    title: A universal qudit quantum processor with trapped ions
    publisher: Nature Physics
    date: '2022'
    relation: builds-on
actors: [University of Innsbruck, Austrian Academy of Sciences]
country: [AT]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

Quantum electrodynamics describes the interaction of light and charged matter and is the most precisely tested theory in physics. Simulating it on a quantum computer requires encoding the gauge field — which in the exact theory has an infinite spectrum — as a finite-dimensional object. Standard qubits encode two states per site; representing even a truncated gauge field with qubits requires many qubits per lattice site. Qudits, which can encode multiple levels within a single trapped ion, map the truncated gauge field more directly.

The 2022 universal qudit processor demonstrated by the same Innsbruck group provided the hardware platform. This 2025 paper extends the programme to two spatial dimensions — a step that had eluded experimental teams for roughly a decade because the gauge constraints in 2D become far more restrictive and harder to enforce on hardware.

The result simulates a small 2D QED lattice and confirms gauge invariance is maintained throughout the dynamics. Scaling to lattice sizes where this would be classically intractable is a goal for future hardware generations. In the near term, the significance is that the qudit encoding is experimentally validated in 2D, which opens a route to non-Abelian gauge theories (relevant to QCD, the theory of the strong force) that would be even more awkward to encode with qubits.
