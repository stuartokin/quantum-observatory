---
schema: frontier/v1
id: arch-molecular-qubit
title: 'Surface-scaffolded molecular qubits on 2D materials'
summary: 'Pentacene molecules on hexagonal boron nitride form optically addressable spin qubits with coherence up to 214 µs under dynamical decoupling, outperforming near-surface NV centres in diamond while sitting directly at a surface. Scalable fabrication and ambient-condition fluorescence are demonstrated.'
plain: 'Quantum computers need qubits — controllable two-level systems. Most approaches use engineered structures: superconducting circuits, trapped atoms, semiconductor defects. Molecular qubits take a different approach: individual molecules are the qubits, with their electron spins storing quantum information. The attraction is chemistry: molecules can be chemically tuned, scaled by synthesis rather than lithography, and in principle attached to surfaces in ways that interface naturally with photonic or superconducting devices. The challenge has always been coherence — molecular qubits near surfaces lose their quantum state quickly because nearby spins disrupt them. This experiment, from a collaboration led by the University of Chicago and Northwestern University, deposits pentacene molecules onto a layer of hexagonal boron nitride (a flat, defect-sparse 2D material). The hBN layer shields the pentacene from surface noise. The result: coherence times of 214 microseconds under dynamical decoupling — longer than near-surface NV centres in diamond, which are the current standard for surface-compatible spin qubits. The qubits show stable fluorescence at room temperature, and the fabrication uses 2D material techniques compatible with scalable manufacturing.'
pillar: quantum
constellation: architectures
cluster: molecular
readiness: emerging
horizon: 2
priority: P1
actors:
  - 'University of Chicago'
  - 'Northwestern University'
country:
  - US
metrics:
  - name: 'Hahn-echo coherence time'
    value: '22'
    unit: 'µs'
    note: 'Bare Hahn-echo; extends to 214 µs under dynamical decoupling'
  - name: 'Dynamical-decoupling coherence time'
    value: '214'
    unit: 'µs'
    note: 'Outperforms state-of-the-art shallow NV centres in diamond at same surface proximity'
novelty: 'Record surface coherence for a molecular qubit; scalable 2D-material fabrication'
links:
  - to: sense-nv-magnetometry
    relation: competes-with
  - to: arch-silicon-spin
    relation: competes-with
  - to: enable-fabrication
    relation: depends-on
evidence:
  claim: 'Pentacene molecules scaffolded on hexagonal boron nitride exhibit Hahn-echo coherence of 22 µs extending to 214 µs under dynamical decoupling, optically detected magnetic resonance from cryogenic to ambient conditions, and stable fluorescence for extended periods. The paper reports scalable fabrication and surface integration. This is a preprint and has not been independently replicated.'
  verified: '2026-08-12'
  level: E3
  sources:
    - url: 'https://arxiv.org/abs/2601.19976'
      role: preprint
      title: 'A Surface-Scaffolded Molecular Qubit'
      publisher: arXiv
      date: '2026-01-27'
      identifier: 'arXiv:2601.19976'
      accessed: '2026-08-12'
      note: 'Multi-institution collaboration: U Chicago, Northwestern, Hebrew University. 27 authors. Preprint only; peer review pending.'
qdayImpact: 0
qdayReasoning: 'Molecular qubits are far from cryptanalytic relevance. The result is an enabling advance for a new architecture, not a computing capability milestone.'
confidence: medium
status: draft
origin: agent
added: '2026-08-12'
review:
  state: agent-merged
  by: agent
  agent: Scout
  agentMergedOn: '2026-08-12'
---

## What happened

Molecular qubits — qubits built from individual molecules rather than fabricated structures — have long been attractive in principle because chemistry can tune their properties in ways that lithography cannot. The obstacle has been coherence at surfaces: placing a qubit near a surface, where it can couple to nearby systems and be read out or integrated, has consistently degraded the coherence times that make qubits useful.

This work, from a large collaboration based at the University of Chicago and Northwestern University, deposits pentacene molecules onto hexagonal boron nitride (hBN), a flat, atomically thin insulator. The hBN acts as a scaffold and shield: it positions the molecule at the surface while protecting it from the disordered spin environment that normally destroys surface coherence. Coherence times of 214 µs under dynamical decoupling were measured — longer than the best near-surface NV centres in diamond, which are the existing benchmark for surface-compatible spin qubits, despite the molecular qubit being an order of magnitude closer to the surface.

## Why it matters

This removes the central objection to surface molecular qubits: that proximity to a surface necessarily destroys coherence. The result points toward molecular qubits that can be:
- Integrated with photonic waveguides (fluorescence at telecom-relevant wavelengths)
- Positioned at defined locations on 2D material circuits
- Fabricated at scale by chemical deposition rather than ion implantation or electron-beam lithography

The platform could also serve sensing applications (nanoscale magnetometry) which may arrive before computing applications.

## Previous state of the art

Molecular qubits in bulk crystals: coherence times of milliseconds but no surface integration. Near-surface NV centres in diamond: 10–50 µs coherence at the surface. This result exceeds NV-centre surface performance while sitting directly on a surface, using a chemically tunable molecule.

## Limitations

Preprint only. Single-qubit demonstration — no two-qubit gates, no error correction, no entanglement. Relies on defect densities in hBN for qubit formation, which may limit uniformity. Room-temperature stability demonstrated for minutes (half-life 37 minutes unencapsulated); long-term stability at scale not yet shown.

## What would change this assessment

Peer-reviewed publication; two-qubit gate demonstration; independent replication at another institution; demonstration of site-selective placement of molecules.
