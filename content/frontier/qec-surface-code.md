---
schema: frontier/v1
id: qec-surface-code
title: Surface code
summary: The workhorse code. Well understood, high threshold, expensive.
plain: 'The best-understood scheme for turning unreliable qubits into a reliable one. It only needs neighbouring qubits to talk to each other, which makes it easy to build, but it is greedy: roughly a thousand physical qubits for one useful one.'
pillar: quantum
constellation: error-correction
readiness: demonstrated
metrics:
  - name: Typical overhead
    value: '~1000:1'
    note: physical to logical
evidence:
  claim: NEEDS PRIMARY SOURCE — placeholder. Replace with a specific free primary source and restate what it actually says.
  verified: '2026-08-04'
  sources:
    - url: https://csrc.nist.gov/projects/post-quantum-cryptography
      role: corroborating
links:
  - to: qec-qldpc-bivariate-bicycle
    relation: competes-with
  - to: qec-below-threshold-surface-code
    relation: evidence-for
  - to: qec-colour-code
    relation: competes-with
confidence: low
status: draft
added: '2026-08-04'
origin: human
---
