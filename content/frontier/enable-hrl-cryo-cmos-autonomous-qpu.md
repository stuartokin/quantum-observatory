---
schema: frontier/v1
id: enable-hrl-cryo-cmos-autonomous-qpu
title: 'Integrated cryogenic CMOS QPU runs autonomous error correction in silicon'
summary: 'HRL Laboratories demonstrated an 18-qubit silicon QPU in which a 70-million-transistor CMOS controller at 4 K generates all control signals inside the cryostat and runs repeated error-correction rounds with no real-time room-temperature input.'
plain: 'Scaling silicon spin qubits faces a wiring crisis: each qubit needs precisely timed electrical signals, and running those wires from room-temperature electronics into a millikelvin refrigerator becomes physically and thermally unmanageable. HRL Laboratories addressed this with a complete prototype: a custom 70-million-transistor CMOS control chip that lives inside the refrigerator at 4 kelvin, connected to an 18-qubit silicon chip at millikelvin by a new superconducting ribbon cable that carries signals without carrying heat. Once a program is loaded, the system needs nothing from room temperature except power, a clock, and reference voltages. It ran repeated rounds of quantum error correction autonomously -- the first time any system has done this entirely inside the cryostat. The qubits are exchange-only spin qubits, which respond to simple voltage pulses rather than microwaves or lasers, making them compatible with CMOS signal generation. Gate errors improved by roughly an order of magnitude over the previous best for this qubit type. A distance-5 repetition code achieved 4.7 times lower logical error than a distance-3 code on the same device. All three components -- qubit chip, ribbon cable, and controller -- are fabricated on commercial semiconductor production lines, which is the precondition for the manufacturing economics silicon spin qubits need to reach useful scale.'
pillar: quantum
readiness: experimental
constellation: enabling
cluster: control-electronics
actors:
  - 'HRL Laboratories, Malibu, California'
metrics:
  - name: qubit-count
    value: '18'
    unit: exchange-only spin qubits
    note: '54 exchange-coupled quantum dots configurable to 18 EO qubits'
  - name: cmos-transistors
    value: '70 million'
    unit: transistors
    note: '130 nm RF-CMOS process at 4 K'
  - name: controller-power
    value: '<3.5'
    unit: W
    note: 'thermal load to mixing chamber under 10 microwatts; qubit electron temperature 150 mK'
  - name: single-qubit-gate-error
    value: '1.7e-4'
    unit: error per gate
    note: 'order-of-magnitude improvement over prior exchange-only state of art'
  - name: cnot-gate-error
    value: '3.5e-3'
    unit: error per gate
    note: 'lowest reproducible two-qubit error 9e-4'
  - name: repetition-code-suppression
    value: '4.7x'
    unit: logical error reduction
    note: 'distance-5 vs distance-3 repetition code, same device'
links:
  - to: enable-cryo-cmos-qubit-control
    relation: enables
  - to: arch-silicon-spin
    relation: enables
  - to: enable-control-electronics
    relation: enables
  - to: qec-realtime-decoding
    relation: depends-on
evidence:
  claim: 'HRL Quantum Team, Nature 655, 1154-1159 (2026), DOI 10.1038/s41586-026-10754-7: an 18-qubit exchange-only silicon QPU integrating a 70-million-transistor 130 nm RF-CMOS controller at 4 K with a novel superconducting ribbon cable executed repeated error-correction rounds autonomously with no real-time room-temperature electronics. Single-qubit gate errors 1.7e-4 and CNOT errors 3.5e-3 represent an order-of-magnitude advance over prior exchange-only results. Distance-5 repetition code achieved 4.7-fold lower logical error than distance-3 on the same device. Controller power under 3.5 W with under 10 microwatts thermal load to the mixing chamber. All three components fabricated on commercial semiconductor wafer processes. arXiv preprint 2604.16216 submitted April 2026.'
  verified: '2026-08-14'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-026-10754-7
      role: primary
      title: A digitally controlled silicon quantum processing unit
      publisher: Nature
      date: '2026-07-29'
      identifier: 'Nature 655, 1154-1159 (2026)'
      doi: 10.1038/s41586-026-10754-7
      accessed: '2026-08-14'
      note: 'Cover article 29 July 2026. Corresponding authors Blumoff, Ladd, Reed at HRL Laboratories.'
    - url: https://arxiv.org/abs/2604.16216
      role: preprint
      title: A digitally controlled silicon quantum processing unit
      publisher: arXiv
      date: '2026-04-17'
      identifier: arXiv:2604.16216
      accessed: '2026-08-14'
      note: 'v1 submitted 17 April 2026; v2 1 May 2026. Freely accessible. Substantially identical to published version.'
confidence: high
status: draft
origin: agent
added: '2026-08-14'
priority: P1
qdayImpact: 0
qdayReasoning: 'This result addresses the wiring and control-electronics bottleneck for silicon spin qubits. It does not change the resources, engineering difficulty, or timeline needed to break RSA-2048 or elliptic-curve cryptography. Fault-tolerant cryptanalysis requires millions of physical qubits running logical operations at useful scale; this is 18 physical qubits demonstrating a repetition code. The relevance is to scalability of a qubit platform, not to cryptanalytic capability. Q-Day impact is 0.'
horizon: 2
country:
  - US
novelty: 'First autonomous cryo-CMOS error correction in silicon; full QPU integration on commercial semiconductor lines'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-14'
---

## What happened

On 29 July 2026 HRL Laboratories published a Nature cover article demonstrating the first silicon quantum processor that generates all of its own control signals inside the cryostat and runs quantum error correction with no real-time room-temperature input. Three separately fabricated components are integrated: a silicon chip with 54 exchange-coupled quantum dots (configurable to 18 exchange-only qubits) at millikelvin; a 70-million-transistor 130 nm RF-CMOS controller at 4 K; and a new high-density superconducting ribbon cable connecting the two. Once a digital program is loaded, the only external connections are power, a clock, and reference voltages.

## Why it matters

The wiring bottleneck is a recognised constraint on scaling every qubit platform, most acutely for silicon spin qubits. HRL's result demonstrates a complete prototype architecture in which the signal-generation problem is moved inside the cryostat. The choice of exchange-only qubits — controlled by baseband voltage pulses rather than microwaves or lasers — is what makes this tractable: those pulses are close enough to standard digital signals that a CMOS chip can generate them at low power. The superconducting ribbon cable solves the thermal isolation problem, carrying 150 control waveforms from 4 K to millikelvin without heating the qubits.

The manufacturing argument is as significant as the performance result. All three components are fabricated on commercial semiconductor wafer processes. The qubit chip uses 200 mm isotopically enriched silicon-germanium wafers. If the architecture scales, it inherits the yield, cost, and supply chain of the transistor industry.

## Previous state of the art

Prior exchange-only silicon spin demonstrations used room-temperature control electronics and showed gate errors roughly an order of magnitude higher. Cryogenic CMOS controllers had been demonstrated independently (see `enable-cryo-cmos-qubit-control`) but not integrated with a qubit chip into a complete autonomous QPU running error correction. The existing board item covers cryo-CMOS chip concepts; this result adds the ribbon cable interconnect, the full system integration, and the autonomous error-correction demonstration.

## Limitations

18 physical qubits is far from cryptanalytic scale. The repetition code demonstrates syndrome extraction and error suppression scaling; it is not a full surface code and does not encode a fault-tolerant logical qubit. The CNOT error of 3.5e-3 is above the surface code threshold of roughly 1%; the 9e-4 best-case figure is not yet reproducibly achieved across the full device. Independent replication has not been reported; this is a single-laboratory result from a team now being acquired by IBM.

## What would change the assessment

Independent replication by a different laboratory (Delft, UNSW, Imec, or another silicon spin group) would move this toward E5. Demonstration of a full surface code cycle with consistently sub-threshold two-qubit errors across the full device would raise readiness. A published qubit count above 50 with the same integrated architecture would strengthen the scaling claim.
