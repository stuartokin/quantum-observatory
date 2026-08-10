---
schema: news/v1
id: 2026-03-31-alice-bob-arpa-e-rare-earth-magnets
headline: 'Alice and Bob receive ARPA-E funding for cat-qubit magnet design programme with GE Vernova as industrial partner'
pillar: quantum
date: '2026-03-31'
plain: 'Neodymium magnets are inside every electric motor, wind turbine, and EV drivetrain. Their supply chain is geographically concentrated. Alice & Bob, a cat-qubit quantum computing company, has received $3.9 million from the US Department of Energy''s ARPA-E to apply fault-tolerant quantum algorithms to discovering rare-earth-free alternatives. GE Vernova — which makes wind turbines and power generators — is the industrial partner tasked with evaluating whether materials the algorithm finds would be commercially viable. Los Alamos National Laboratory contributes tensor network tools for quantum circuit optimisation. The three-year programme targets a 10,000-fold speedup over classical simulation for strongly correlated magnetic systems. This is an announced programme and a grant award, not a demonstrated result — no alternative magnet has been identified and the quantum hardware capable of running the full algorithm does not yet exist. But a named power-sector company with a specific commercial need, a national laboratory, and a government grant is a stronger signal than a press release alone.'
significance: notable
source:
  url: https://alice-bob.com/newsroom/alice-bob-secures-3-9m-arpa-e-award-to-use-quantum-computing-to-design-rare-earth-free-magnets/
  kind: vendor
  title: 'Alice & Bob Secures $3.9M ARPA-E Award to Use Quantum Computing to Design Rare-Earth-Free Magnets'
  publisher: Alice & Bob
  date: '2026-03-31'
corroboration:
  - url: https://www.hpcwire.com/off-the-wire/alice-bob-secures-3-9m-arpa-e-award-to-apply-quantum-computing-to-magnet-design/
    publisher: HPCwire
    kind: press
  - url: https://thequantuminsider.com/2026/03/31/alice-bob-arpae-funding-quantum-materials/
    publisher: The Quantum Insider
    kind: journalism
validation:
  status: single-source
  checks:
    - 'Alice & Bob vendor announcement and HPCwire and The Quantum Insider all report the same award with consistent figures ($3.9M, three years, Los Alamos, GE Vernova)'
    - 'ARPA-E QC3 (Quantum Computing for Computational Chemistry) is a real DOE programme; the award is in principle verifiable against official DOE records'
    - 'ARPA-E award database not directly checked within run budget — marked single-source'
    - 'This is an announced collaboration and grant award, not a technical result — noted explicitly in plain text'
  note: 'Worth upgrading to verified if ARPA-E QC3 award list confirms Alice & Bob.'
about:
  - arch-cat-qubits
  - algo-quantum-simulation
actors: [Alice & Bob, Los Alamos National Laboratory, 'GE Vernova']
country: [FR, US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The materials target is neodymium-iron-boron (NdFeB) magnets — the dominant technology in high-performance motors and generators. China produces the majority of the rare-earth elements involved, making this a supply-chain and energy-security problem as much as a materials science problem.

The quantum computing approach targets the hardest part of the simulation: strongly correlated electron systems, where the quantum interactions between electrons define the magnetic behaviour but are computationally intractable to model exactly with classical methods. Alice & Bob''s cat-qubit architecture suppresses bit-flip errors autonomously, which is claimed to reduce the overhead needed for fault-tolerant material simulation algorithms.

GE Vernova''s role is specifically to evaluate whether materials identified through the algorithm would be commercially viable — that is, to perform the technoeconomic bridge from quantum chemistry to industrial adoption.

The 10,000-fold speedup target is a resource estimate projection, not a demonstrated result. The machine capable of running the full algorithm at that scale does not yet exist.
