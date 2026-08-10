---
schema: news/v1
id: 2026-06-03-oxford-nonclassical-cat-states-prx
headline: 'Oxford demonstrates superpositions of intrinsically nonclassical oscillator states in a trapped ion, opening new possibilities for bosonic error correction'
pillar: quantum
date: '2026-06-03'
plain: 'Standard Schrödinger cat states are superpositions of two coherent states — the closest quantum analogue to a classical oscillating particle. Oxford has done something harder: superpositions whose components are themselves strongly nonclassical (squeezed states, trisqueezed states, Fock states). The experiment used the motional degree of freedom of a single trapped strontium-88 ion. The practical motivation is bosonic error correction: squeezed-cat codes theoretically offer better error protection per unit of energy than conventional cat codes, but they require exactly this kind of state as a starting point. This is an experimental demonstration of a technique, not a working error-corrected qubit.'
significance: notable
source:
  url: https://journals.aps.org/prx/abstract/10.1103/PhysRevX.16.031029
  kind: paper
  title: Generating Arbitrary Superpositions of Nonclassical Quantum Harmonic Oscillator States
  publisher: Physical Review X
  date: '2026-06-03'
corroboration:
  - url: https://www.physics.ox.ac.uk/news/oxford-physicists-create-new-family-schrodingers-cat-states
    publisher: University of Oxford Department of Physics
    kind: authority
  - url: https://www.eurekalert.org/news-releases/1131276
    publisher: EurekAlert
    kind: press
validation:
  status: verified
  checks:
    - 'PRX paper (Phys. Rev. X 16, 031029, 3 June 2026) confirmed via Oxford physics department press release citing full journal reference and author list'
    - 'Authors confirmed: S. Saner, O. Băzăvan, D.J. Webb, G. Araneda, D.M. Lucas, C.J. Ballance, R. Srinivas — all University of Oxford'
    - 'EurekAlert institutional release corroborates experimental method: single strontium-88 ion, coupling internal qubit to motional degree of freedom, mid-circuit measurement to project motional state into chosen superposition'
    - 'Wigner-function negativity and sixfold rotational symmetry reported as experimental confirmation of non-classicality'
    - 'Relevance to arch-cat-qubits confirmed: squeezed-cat error-correction codes require nonclassical component states of exactly this type; prior demonstrations used coherent-state components only'
about:
  - arch-cat-qubits
  - arch-trapped-ion
actors:
  - University of Oxford
country:
  - GB
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The technique works by first entangling the ion''s internal qubit state with different motional states through engineered interactions, then performing a mid-circuit measurement of the internal qubit. Quantum mechanics projects the motional degree of freedom into a superposition of whichever nonclassical components the entanglement was constructed from. The researchers demonstrated this for squeezed, trisqueezed, and Fock-state components — all of which carry Wigner-function negativity, a signature with no classical analogue.

The relevance to bosonic error correction: squeezed-cat codes have been proposed in the theory literature for several years as offering lower error rates than coherent-state cat codes at equal mean photon number. They depend on the ability to prepare and manipulate exactly the states Oxford has now demonstrated in experiment. This is an enabling technique result, not a demonstration of error correction itself, and not yet at the scale or fidelity required for a practical bosonic qubit.
