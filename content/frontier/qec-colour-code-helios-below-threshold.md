---
schema: frontier/v1
id: qec-colour-code-helios-below-threshold
title: 'Colour-code QEC below threshold on trapped-ion Helios: suppression factor 12'
pillar: quantum
constellation: error-correction
cluster: colour-codes
readiness: experimental
status: draft
origin: agent
added: '2026-11-09'
horizon: 1
priority: P1
confidence: medium
country:
  - US
actors:
  - Quantinuum
novelty: 'First below-threshold colour-code on trapped ion; suppression factor Λ=12 exceeds superconducting colour-code results'
metrics:
  - name: 'Logical memory error rate per syndrome-extraction round (d=7)'
    value: '5e-6'
    unit: 'per round'
    note: '5(-2+4)×10⁻⁶ at distance 7 with Tesseract decoder'
  - name: 'Suppression factor Λ (memory, d=3 to d=7)'
    value: '12'
    note: 'Λ=12(-2+3); logical error rate falls by factor ~12 per two-step code-distance increase'
  - name: 'Logical two-qubit Clifford error rate (d=5)'
    value: '7e-5'
    unit: 'per gate'
    note: '7(-3+3)×10⁻⁵ per logical two-qubit Clifford at d=5; gate suppression factor Λ=9(-3+8)'
  - name: 'Physical qubits per d=7 code block'
    value: '73'
    unit: 'physical qubits'
qdayImpact: 0
qdayReasoning: 'Below-threshold colour-code operation improves logical qubit memory quality on trapped-ion hardware. It does not directly change cryptanalytic resource estimates for RSA-2048 or elliptic-curve cryptography, which depend on logical qubit count at scale, gate speed, and magic-state distillation costs — none of which this result characterises at cryptanalytic scale. The Λ figure is relevant to future resource estimates if colour codes replace surface codes in FTQC architectures, but that inference requires additional work this preprint does not provide.'
links:
  - to: qec-colour-code
    relation: evidence-for
  - to: arch-trapped-ion
    relation: depends-on
  - to: qec-below-threshold-surface-code
    relation: competes-with
evidence:
  verified: '2026-11-09'
  level: E3
  claim: 'Lavasani et al. (arXiv:2610.24077, 16 October 2026) report below-threshold triangular colour-code operation on Quantinuum Helios-1, a 98-qubit trapped-ion processor. Memory logical error rates per syndrome-extraction round: 5.5×10⁻⁴ (d=3), 3.8×10⁻⁵ (d=5), 5×10⁻⁶ (d=7); suppression factor Λ=12(-2+3). Circuit- and hardware-level leakage reduction schemes used. Encoded two-qubit Clifford circuits at d=3,5 give logical error 7×10⁻⁵ per gate with Λ=9(-3+8). Real-time neural-network decoders run an order of magnitude faster than the syndrome extraction rate. No peer-reviewed journal record as of 2026-11-09. Distance-7 gate experiments not performed; Helios-1 qubit count insufficient.'
  sources:
    - url: 'https://arxiv.org/abs/2610.24077'
      role: preprint
      title: 'Quantum error correction well below the color code threshold'
      publisher: arXiv
      date: '2026-10-16'
      identifier: 'arXiv:2610.24077 [quant-ph]'
      doi: '10.48550/arXiv.2610.24077'
      accessed: '2026-11-09'
      note: 'Preprint only as of 2026-11-09. 23 authors, all Quantinuum. Submitted 16 Oct 2026. Reports memory logical error rates and gate error suppression at d=3,5,7 on Helios-1 using triangular colour codes and Tesseract decoder.'
summary: 'Quantinuum Helios-1 achieves below-threshold colour-code QEC at d=3,5,7 with suppression factor Λ=12 and memory logical error rate 5×10⁻⁶ per round at d=7, exceeding prior superconducting colour-code results.'
plain: 'Quantum error correction encodes a logical qubit across many physical qubits so that errors can be detected and removed without reading the information. The colour code is a particular encoding that allows certain fault-tolerant operations more efficiently than the more-common surface code. Quantinuum ran triangular colour codes of three sizes on its Helios trapped-ion processor and found that each step up in size suppressed the logical memory error rate by a factor of about 12 — the hallmark of below-threshold operation, meaning larger codes are reliably better. At the largest size tested (distance 7, using 73 physical qubits), the logical memory error rate reached 5×10⁻⁶ per correction round. The same suppression trend held for encoded two-qubit logic operations, though only at smaller code sizes due to qubit count limits on Helios-1. For comparison, Google demonstrated colour-code below-threshold scaling on superconducting hardware in 2025 with a suppression factor of roughly 1.56; Quantinuum reports 12 on trapped ions. Limitations: syndrome rounds on Helios take hundreds of milliseconds — far slower than superconducting hardware — affecting throughput. Distance-7 gate experiments were not possible. This is a preprint with no independent replication yet.'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-11-09'
  note: 'Verified arXiv:2610.24077 abstract and HTML 2026-11-09. Confirmed Nature 653, 56-62 (arXiv:2503.20870, DOI 10.1038/s41586-026-10445-3) is the quantum magnetism paper, not this result. No journal record for 2610.24077 found on arXiv or ResearchGate as of verification date. E3 as preprint-only Quantinuum result with no independent replication.'
---

## What happened

Quantinuum's Helios-1 — a 98-qubit trapped-ion quantum processor — ran triangular colour codes at distances d=3, 5, and 7. At each step up, the logical memory error rate fell by a factor of approximately 12, reaching 5×10⁻⁶ per syndrome-extraction round at d=7. Below-threshold scaling was also demonstrated for encoded two-qubit Clifford operations (Λ≈9, d=3→5). Circuit- and hardware-level leakage reduction were credited as key enablers.

## Why it matters

Below-threshold operation means larger codes are reliably better — the basic requirement for scalable fault-tolerant quantum computation. The suppression factor of 12 substantially exceeds what Google reported for the colour code on superconducting hardware (Λ≈1.56 in 2025). If this Λ holds at larger distances, colour codes on trapped-ion hardware would reach target logical error rates (e.g., 10⁻¹²) at much smaller code sizes than alternatives, reducing qubit overhead per logical qubit. The result also demonstrates real-time neural-network decoding running faster than the syndrome extraction rate — relevant to practical FTQC.

## Previous state of the art

The board holds `qec-colour-code` (experimental, E4), covering colour codes on superconducting hardware (Google 2025, Nature 645, 614) and the existing `arch-trapped-ion` for the hardware platform. The Helios result is on a distinct platform with a substantially higher suppression factor.

## Limitations

- Preprint only; no peer review as of 2026-11-09.
- Syndrome rounds on Helios-1 take roughly hundreds of milliseconds — many orders of magnitude slower than superconducting processors (~microseconds). Wall-clock time per logical operation is much longer.
- Distance-7 gate experiments not performed; Helios-1 lacks sufficient qubits.
- No independent replication.
- Magic-state distillation below threshold described as future work.

## What would change this assessment

Peer review raises evidence to E4; independent replication at a separate institution raises to E5. Gate experiments at d=7, or results at d=9+, would strengthen the readiness case. A result showing syndrome round time reduction (faster gates, faster classical processing) would address the main throughput limitation.
