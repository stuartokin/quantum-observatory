---
schema: frontier/v1
id: comms-quantum-internet
title: Quantum internet
summary: 'A network distributing entanglement rather than classical bits, enabling physics-guaranteed secure communication and distributed quantum computation. Two-node demonstrations over deployed urban telecom fibre completed in 2024.'
plain: 'The quantum internet would link quantum processors by sending entangled photons through ordinary fibre-optic cables. Any eavesdropping disturbs the photons in a detectable way, making security a consequence of physics rather than mathematical difficulty. In 2024, a Harvard team demonstrated two quantum memory nodes — diamond defect centres inside nanoscale optical cavities — entangled through 35 km of existing Boston-area telecom fibre. The photons were converted to standard telecom wavelengths for the journey and stored for seconds in nuclear spin memories. This is an early milestone: two nodes, one link, no routing. A usable network requires quantum repeaters, many more memory nodes, and reliable classical control — none yet demonstrated at scale.'
pillar: quantum
readiness: experimental
constellation: communications
cluster: quantum-networking
actors:
  - Harvard University
  - AWS Center for Quantum Networking
  - MIT
country:
  - US
metrics:
  - name: deployed urban fibre loop
    value: '35'
    unit: km
    note: 'Boston-area telecom fibre; Knaut et al. Nature 2024'
  - name: entanglement storage time
    value: '>1'
    unit: s
    note: 'Nuclear spin qubit memory with integrated error detection'
evidence:
  claim: 'Knaut et al. demonstrated a two-node quantum network of silicon-vacancy centres in nanophotonic diamond cavities entangled through a 35 km fibre loop deployed in the Boston urban environment, using quantum frequency conversion to 1350 nm telecom wavelengths and second-long nuclear spin entanglement storage with integrated error detection.'
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/s41586-024-07252-z
      role: primary
      title: Entanglement of nanophotonic quantum memory nodes in a telecom network
      publisher: Nature
      date: '2024-05-15'
      identifier: 'Nature 629, 573-578 (2024)'
      doi: 10.1038/s41586-024-07252-z
      accessed: '2026-08-08'
      note: 'Preprint arXiv:2310.01316. Two-node demonstration only; multi-node routing not yet shown.'
links:
  - to: comms-quantum-repeater
    relation: depends-on
  - to: comms-quantum-memory
    relation: depends-on
  - to: entanglement-distribution
    relation: depends-on
confidence: high
status: published
qdayImpact: 0
horizon: 3
novelty: 'First entanglement of quantum memory nodes over deployed urban telecom fibre'
moved:
  from: emerging
  on: '2026-08-08'
priority: P2
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

The quantum internet distributes entanglement between remote nodes, enabling quantum-secure communication and distributed quantum computation. Knaut et al. (Harvard / AWS, Nature 2024) demonstrated the first entanglement of two quantum memory nodes — silicon-vacancy centres in nanophotonic diamond cavities — through 35 km of deployed Boston-area telecom fibre. Quantum frequency conversion shifted photons to 1350 nm for low-loss transmission; nuclear spin qubits provided second-long entanglement storage with integrated error detection. Readiness is corrected from 'emerging' to 'experimental': this is a replicated physics result (the same group also showed 40 km spool performance), but the work remains far from a useful network — two nodes, single link, no routing, no repeaters.
