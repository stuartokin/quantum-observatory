---
schema: frontier/v1
id: enable-hrl-silicon-qpu-integrated
title: 'Integrated silicon QPU: cryogenic CMOS control with autonomous error correction'
summary: 'HRL demonstrated an 18-qubit silicon QPU integrating a 4 K CMOS controller, 296-channel superconducting ribbon cable, and mK exchange-only qubit chip — running autonomous error correction with no room-temperature latency.'
plain: 'Quantum computers based on silicon spin qubits face a practical obstacle: each qubit normally needs its own wire running from inside a refrigerator (at temperatures near absolute zero) to bulky room-temperature electronics. At scale, this becomes physically impossible — too many wires, too much heat flowing in. HRL Laboratories solved this by building the control electronics into the refrigerator itself. Their system puts a custom chip, made on a standard commercial semiconductor production line, at 4 kelvin (just four degrees above absolute zero) inside the cryostat. That chip generates all 150 time-varying control signals needed to operate 18 silicon qubits sitting at millikelvin temperatures below it. A specially engineered superconducting ribbon cable carries the signals down without leaking heat. The full system then ran quantum error correction entirely on its own — no instructions arriving in real time from room-temperature equipment. Gate errors fell by an order of magnitude compared with prior exchange-only silicon demonstrations. This matters because it shows that the control wiring bottleneck, long considered one of the hardest practical problems in scaling silicon spin qubits, can be addressed with ordinary semiconductor manufacturing. Every component in the system was fabricated on standard commercial wafer processes.'
pillar: quantum
readiness: demonstrated
constellation: enabling
cluster: cryogenic-control
actors:
  - 'HRL Laboratories (Malibu, California)'
  - Boeing
priority: P1
qdayImpact: 0
qdayReasoning: 'This result addresses the control wiring scalability bottleneck for silicon spin qubits. It does not change cryptanalytic resource estimates or the qubit counts needed to break RSA-2048 or ECC. Q-Day impact is 0.'
country:
  - US
novelty: 'First fully integrated silicon QPU with autonomous cryogenic CMOS error correction; order-of-magnitude gate fidelity improvement for exchange-only qubits'
horizon: 2
metrics:
  - name: 'Physical qubits'
    value: '18'
    note: 'Exchange-only qubits from 54 quantum dots on 200 mm isotopically enriched SiGe wafers'
  - name: 'Single-qubit gate error'
    value: '1.7e-4'
    note: 'Average; order-of-magnitude improvement over prior exchange-only state of the art'
  - name: 'CNOT gate error'
    value: '3.5e-3'
    note: 'Average entangling gate error'
  - name: 'Distance-5 error suppression factor'
    value: '4.7'
    unit: 'Λ5/3'
    note: 'Logical error rate of distance-5 repetition code vs distance-3 subsystem from same data'
  - name: 'Logical fidelity [[4,2,2]] code'
    value: '0.95'
    note: 'Post-selected two-logical-qubit fidelity across 3 syndrome extraction rounds'
  - name: 'CMOS controller power'
    value: '<3.5'
    unit: 'W at 4 K'
    note: '70 million transistors, 130 nm RF-CMOS process; <10 µW thermal load at mixing chamber'
  - name: 'Superconducting ribbon cable channels'
    value: '296'
    note: 'Niobium-on-polyimide; carries all time-varying control signals from 4 K to mK stage'
links:
  - to: arch-silicon-spin
    relation: evidence-for
  - to: enable-cryo-cmos-qubit-control
    relation: competes-with
  - to: qec-realtime-decoding
    relation: depends-on
  - to: enable-cryogenics
    relation: depends-on
added: '2026-08-14'
status: draft
origin: agent
evidence:
  level: E4
  verified: '2026-08-14'
  claim: 'HRL Laboratories published in Nature (29 July 2026) an 18-qubit silicon exchange-only QPU integrating a custom cryogenic CMOS controller (70M transistors, 130 nm RF-CMOS, operating at 4 K, drawing under 3.5 W) with a 296-channel superconducting ribbon cable and a millikelvin qubit chip. The system executed distance-3 and distance-5 repetition codes and a [[4,2,2]] error-detection code autonomously — no real-time room-temperature input. Single-qubit gate errors of 1.7×10⁻⁴ and CNOT errors of 3.5×10⁻³ represent an order-of-magnitude improvement over prior exchange-only demonstrations. Distance-5 error suppression Λ5/3 = 4.7. The [[4,2,2]] code sustained 95% logical fidelity (post-selected) over three rounds. All components fabricated on standard commercial semiconductor lines. Preprint arXiv:2604.16216 posted April 2026.'
  sources:
    - url: 'https://www.nature.com/articles/s41586-026-10754-7'
      role: primary
      title: 'A digitally controlled silicon quantum processing unit'
      publisher: Nature
      date: '2026-07-29'
      identifier: 'Nature 655, 1154–1159 (2026)'
      doi: '10.1038/s41586-026-10754-7'
      accessed: '2026-08-14'
      note: 'Cover story. Corresponding authors Jacob Z. Blumoff, Thaddeus D. Ladd, Matthew D. Reed. All authors at HRL Laboratories, Malibu CA (some affiliations Boeing).'
    - url: 'https://arxiv.org/abs/2604.16216'
      role: preprint
      title: 'A digitally controlled silicon quantum processing unit'
      publisher: arXiv
      date: '2026-04-20'
      identifier: 'arXiv:2604.16216'
      accessed: '2026-08-14'
      note: 'Preprint version. Submitted April 2026, published in Nature July 2026.'
confidence: high
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-14'
---

## What happened

HRL Laboratories published the cover paper of Nature on 29 July 2026 demonstrating the first silicon quantum processing unit with fully integrated cryogenic CMOS control. Every time-varying control signal for an 18-qubit exchange-only silicon chip is generated inside the cryostat by a custom chip fabricated in a standard 130 nm RF-CMOS commercial foundry process. A 296-channel superconducting niobium-on-polyimide ribbon cable carries signals from the 4 K controller to the millikelvin qubit stage with less than 10 µW of thermal load at the mixing chamber. Once initialised, the system runs error correction autonomously — no room-temperature electronics involved at runtime.

## Why it matters

Control wiring is widely regarded as one of the hardest practical bottlenecks for scaling any qubit platform, and silicon spin qubits in particular. Each wire from room temperature to millikelvin carries heat; the number of wires needed grows with qubit count; and external waveform generators impose latency that makes autonomous real-time error correction impossible. This result addresses all three problems simultaneously with hardware made entirely on standard commercial semiconductor lines. The qubit chip (200 mm SiGe), the CMOS controller (130 nm RF-CMOS), and the ribbon cable (niobium-on-polyimide) are each a standard wafer-scale process — not custom academic fabrication.

Gate fidelities also advanced substantially: single-qubit errors of 1.7×10⁻⁴ and CNOT errors of 3.5×10⁻³ are roughly an order of magnitude below the previous exchange-only state of the art.

## Previous state of the art

Prior exchange-only silicon demonstrations (HRL's own 2023 Nature paper on universal logic with encoded spin qubits) achieved encoded CNOT fidelity of ~96.3%. External rack-based room-temperature electronics were required for all control, precluding autonomous error correction and imposing wiring constraints that do not scale.

## Limitations

- 18 qubits is not fault-tolerant scale. The repetition codes demonstrated detect, not fully correct, arbitrary errors.
- Post-selection was required for the 95% [[4,2,2]] logical fidelity figure; without post-selection, logical fidelity was 0.59.
- No independent replication yet; this is a single-laboratory result (E4, not E5).
- IBM's pending acquisition of HRL introduces institutional uncertainty about how this research programme continues.

## What would change the assessment

Upward: independent replication by a different institution would raise to E5. Demonstration at larger qubit counts (≥50 logical qubits) with full fault tolerance would move readiness toward adopted.

Downward: if charge noise at higher qubit counts prevents the fidelity figures from holding, the scalability claim weakens materially. The paper notes models match results, but models have not been stress-tested beyond 18 qubits.
