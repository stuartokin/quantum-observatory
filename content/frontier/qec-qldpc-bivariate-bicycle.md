---
schema: frontier/v1
id: qec-qldpc-bivariate-bicycle
title: Bivariate bicycle qLDPC codes
summary: A code family encoding twelve logical qubits in 288 physical qubits — roughly a tenfold overhead reduction against the surface code.
plain: A cheaper way of building reliable qubits out of unreliable ones. The established method needs roughly a thousand physical qubits per useful one; this needs about a tenth of that. The catch is that the qubits must talk to more distant neighbours, which is harder to build. It is now the centre of IBM’s plan.
pillar: quantum
constellation: error-correction
readiness: demonstrated
actors: [IBM]
metrics:
  - name: Code parameters
    value: '[[144,12,12]]'
    note: the "gross" code
  - name: Logical qubits per block
    value: '12'
  - name: Overhead reduction
    value: '10x'
    note: versus surface code at comparable k and d
evidence:
  claim: IBM introduced a fault-tolerant quantum memory based on bivariate bicycle qLDPC codes; the gross code encodes 12 logical qubits into 144 data qubits plus 144 syndrome qubits, correcting as well as the surface code with about ten times fewer qubits.
  verified: '2026-08-04'
  sources:
    - url: https://www.nature.com/articles/s41586-024-07107-7
      role: primary
      title: High-threshold and low-overhead fault-tolerant quantum memory
      publisher: Nature
      date: '2024-03-27'
      identifier: Nature 627, 778–782 (2024)
    - url: https://www.ibm.com/quantum/blog/large-scale-ftqc
      role: vendor
      publisher: IBM
links:
  - to: qec-below-threshold-surface-code
    relation: competes-with
  - to: qec-realtime-decoding
    relation: depends-on
  - to: qec-modular-architecture
    relation: enables
  - to: qec-surface-code
    relation: competes-with
confidence: high
status: published
added: '2026-08-04'
origin: human
---
