---
schema: frontier/v1
id: enable-silicon-qpu-cryo-integrated
title: 'Integrated silicon QPU: 4K CMOS control with autonomous error correction'
summary: 'HRL Laboratories demonstrated an 18-qubit silicon QPU integrating a cryogenic CMOS controller, superconducting ribbon cable, and exchange-only spin qubits, running autonomous error correction with no real-time room-temperature electronics.'
plain: 'Quantum computers need control electronics to generate signals for every qubit. Those electronics normally sit at room temperature and connect to the cold qubits via hundreds of cables running into the refrigerator. The cables deposit heat and multiply with qubit count, eventually exceeding what the cooling system can manage. HRL Laboratories replaced the racks of room-temperature electronics with a single custom chip — 70 million transistors in a standard 130-nanometre CMOS process — that operates inside the refrigerator at 4 kelvin (about minus 452 degrees Fahrenheit), close to the qubits. A purpose-built superconducting ribbon cable then carries those control signals the rest of the way to the qubits at milli-kelvin temperatures without conducting significant heat. Together the three components form a self-contained quantum processing unit. Once programmed, it ran repeated error-correction cycles with no real-time input from room-temperature electronics — the first time this has been demonstrated. Gate errors for the 18 exchange-only silicon spin qubits improved by an order of magnitude over prior demonstrations of this qubit type, and fivefold error suppression was observed as repetition-code distance increased. All three components — qubit chip, ribbon cable, controller — are made with standard semiconductor fabrication processes, which is an argument that the approach can scale with the same economics as conventional chips.'
pillar: quantum
readiness: experimental
constellation: enabling
cluster: cryogenic-control
actors:
  - 'HRL Laboratories (Malibu, California)'
  - 'Boeing'
metrics:
  - name: qubit count
    value: '18'
    unit: exchange-only spin qubits
    note: '54 exchange-coupled quantum dots configurable to 18 EO qubits'
  - name: CMOS controller operating temperature
    value: '4'
    unit: kelvin
    note: '70-million-transistor chip in 130nm RF CMOS process'
  - name: controller power draw
    value: '<3.5'
    unit: watts
    note: 'thermal load to mixing chamber under 10 microwatts'
  - name: single-qubit gate error (average)
    value: '1.7e-4'
    unit: error per gate
    note: 'order-of-magnitude improvement on prior EO silicon spin state of the art'
  - name: two-qubit gate error (average)
    value: '3.5e-3'
    unit: error per gate
  - name: two-qubit gate error (best reproducible)
    value: '9e-4'
    unit: error per gate
  - name: error suppression with repetition-code distance
    value: '~5'
    unit: fold
    note: 'fivefold reduction in errors when adding qubits to repetition code'
priority: P1
qdayImpact: 0
qdayReasoning: 'The integrated cryo-CMOS control system addresses a wiring and thermal scalability bottleneck for silicon spin qubits. It does not affect cryptanalytic resource estimates: at 18 physical qubits the system is many orders of magnitude below the scale required for Shor-class computation against RSA-2048 or elliptic-curve cryptography, and the advance is in control engineering rather than algorithmic efficiency or logical qubit overhead.'
links:
  - to: enable-cryo-cmos-qubit-control
    relation: competes-with
  - to: arch-silicon-spin
    relation: evidence-for
  - to: enable-control-electronics
    relation: enables
  - to: enable-cryogenics
    relation: depends-on
country:
  - US
novelty: 'First integrated silicon QPU with autonomous cryo-CMOS error correction; all components semiconductor-process fabricated'
horizon: 2
confidence: medium
status: draft
origin: agent
added: '2026-08-14'
evidence:
  level: E4
  claim: 'HRL Laboratories demonstrated a silicon QPU comprising a cryogenic CMOS controller (4K, 130nm RF CMOS, 70M transistors, <3.5W, <10 microwatts heat load at mixing chamber), a high-density superconducting ribbon cable, and an 18-qubit exchange-only silicon spin chip. The integrated system autonomously executed repeated error-correction cycles with no real-time room-temperature electronics. Single-qubit gate errors of 1.7e-4 and CNOT errors of 3.5e-3 (best reproducible 9e-4) represent an order-of-magnitude improvement on prior exchange-only demonstrations. Fivefold error suppression observed as repetition-code distance increased. All three components fabricated using semiconductor wafer processes.'
  verified: '2026-08-14'
  sources:
    - url: https://www.nature.com/articles/s41586-026-10754-7
      role: primary
      title: 'A digitally controlled silicon quantum processing unit'
      publisher: Nature
      date: '2026-07-29'
      identifier: 'Nature 655, 1154-1159 (2026)'
      doi: 10.1038/s41586-026-10754-7
      accessed: '2026-08-14'
      note: 'Cover paper. Peer-reviewed experimental result. Corresponding authors Blumoff, Ladd, Reed (all HRL Laboratories). Full author list: Members of the HRL Quantum Team and Collaborators.'
    - url: https://arxiv.org/abs/2604.16216
      role: preprint
      title: 'A digitally controlled silicon quantum processing unit'
      publisher: arXiv
      date: '2026-04-17'
      identifier: 'arXiv:2604.16216'
      accessed: '2026-08-14'
      note: 'Preprint submitted 17 April 2026, updated 1 May 2026. Free to access. Journal version is the primary source; listed for open-access traceability.'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-14'
---

## What happened

HRL Laboratories published a Nature cover paper on 29 July 2026 demonstrating the first quantum processing unit in which all time-varying qubit control signals are generated by a cryogenic CMOS chip inside the refrigerator, with error correction running autonomously — no real-time signal from room-temperature electronics required after initial programming.

The QPU integrates three components, each fabricated using semiconductor wafer processes: an 18-qubit exchange-only spin chip on isotopically enriched silicon-germanium operating at milli-kelvin; a 70-million-transistor mixed-signal controller in 130nm RF CMOS at 4K; and a high-density superconducting ribbon cable carrying control signals between stages while acting as a thermal standoff.

## Why it matters

The room-temperature wiring problem is one of the binding engineering constraints for quantum computers at scale. Each qubit needs control lines, and the cooling budget at the coldest stage is roughly 30 microwatts. Cable counts that grow linearly with qubit count will eventually exceed what any refrigerator can accommodate. The HRL system displaces that bottleneck: the controller draws under 3.5W and deposits under 10 microwatts at the mixing chamber stage, and the superconducting ribbon replaces hundreds of individual coaxial runs.

Autonomous error correction inside the cryostat removes a latency and bandwidth constraint that would otherwise worsen as codes grow larger. This is a separate contribution from the control integration, though enabled by the same architecture.

The semiconductor-process fabrication of all three components is a structural argument — not yet a demonstration at scale — that silicon spin QPUs can eventually inherit semiconductor manufacturing economics.

## Previous state of the art

The existing item `enable-cryo-cmos-qubit-control` covers a milli-kelvin CMOS chip for spin-qubit control — a different temperature regime and narrower function. Prior exchange-only silicon spin demonstrations required room-temperature signal generation for all time-varying control and showed gate errors roughly an order of magnitude higher than this result.

## Limitations

18 qubits is far below fault-tolerant scale. Error suppression was demonstrated for a repetition code, not a full 2D surface code. The system has not been independently replicated, placing it at experimental rather than demonstrated. The thermal budget improvement has not been tested at hundreds or thousands of qubits. IBM''s announced acquisition of HRL may affect the independence of follow-on publications.

## What would change this assessment

Independent replication of the integrated-system approach by a separate group would support a move to E5. Demonstration at higher qubit counts maintaining the same thermal envelope per qubit would strengthen the scalability claim. A full surface-code demonstration with logical error below physical would be the next meaningful QEC threshold.
