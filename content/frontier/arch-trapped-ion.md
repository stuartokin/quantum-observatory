---
schema: frontier/v1
id: arch-trapped-ion
title: Trapped-ion QCCD
summary: Ions shuttled between zones in a vacuum trap. Highest gate fidelities and all-to-all connectivity; slower clock speed.
plain: 'Individual charged atoms held still in a vacuum by electric fields and manipulated with lasers. Every atom is identical, which makes them exceptionally accurate, and any one can be moved next to any other. The drawback is speed: physically shuttling atoms takes time, so operations are slower than rival approaches.'
pillar: quantum
constellation: architectures
readiness: adopted
actors: [Quantinuum]
metrics:
  - name: Logical qubits
    value: '48'
    note: Helios, from 98 physical
  - name: Overhead
    value: '2:1'
    note: physical to logical
  - name: 2-qubit gate fidelity
    value: '99.921'
    note: per cent
evidence:
  claim: 'Quantinuum states Helios achieved 48 logical qubits from 98 physical qubits, an error-correcting overhead of 2:1 in a commercial setting, with 99.921 per cent two-qubit gate fidelity.'
  verified: '2026-08-04'
  sources:
    - url: https://www.sec.gov/Archives/edgar/data/0002110105/000162828026037917/quantinuum-sx1a.htm
      role: primary
      publisher: SEC filing
      date: '2026'
    - url: https://www.quantinuum.com/blog/introducing-helios-the-most-accurate-quantum-computer-in-the-world
      role: vendor
      publisher: Quantinuum
links:
  - to: arch-superconducting
    relation: competes-with
  - to: arch-neutral-atom
    relation: competes-with
  - to: qec-realtime-decoding
    relation: depends-on
  - to: enable-fabrication
    relation: depends-on
moved:
  from: demonstrated
  'on': '2026-07-02'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
