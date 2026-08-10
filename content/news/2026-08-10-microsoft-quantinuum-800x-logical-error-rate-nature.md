---
schema: news/v1
id: 2026-08-10-microsoft-quantinuum-800x-logical-error-rate-nature
headline: 'Microsoft and Quantinuum publish peer-reviewed 800× logical error rate improvement in Nature'
pillar: quantum
date: '2026-06-10'
plain: 'A 2024 press-release claim has cleared peer review. The Nature paper confirms that applying Microsoft''s qubit-virtualization platform to Quantinuum''s trapped-ion hardware reduces logical circuit error rates by up to 800× compared with equivalent physical-qubit baselines, using a 12-qubit Knill-inspired code and a 16-qubit tesseract colour code across up to 12 logical qubits. The peer-reviewed result matters differently from the announcement: it is now the basis on which other teams can build. The absolute error rate achieved (0.001% per Bell-state preparation) is still orders of magnitude above what Shor''s algorithm at cryptographic scale would require, and no commercially relevant problem has been solved.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-026-10628-y
  kind: paper
  title: 'Improved quantum processor logical error rates via correction and detection'
  publisher: Nature
  date: '2026-06-10'
  doi: 10.1038/s41586-026-10628-y
corroboration:
  - url: https://quantumcomputingreport.com/microsoft-and-quantinuum-publish-peer-reviewed-quantum-error-correction-data-in-nature/
    publisher: Quantum Computing Report
    kind: journalism
  - url: https://quantum.microsoft.com/en-us/insights/blogs/microsoft-application-of-error-correction-to-trapped-ion-qubits
    publisher: Microsoft Quantum
    kind: vendor
validation:
  status: verified
  checks:
    - 'Nature paper opened at doi:10.1038/s41586-026-10628-y; Nature volume 654 pp 349-355 confirmed; 800× figure appears in results section against Bell-state preparation baseline'
    - 'Quantum Computing Report independently describes the same paper with matching figures'
    - 'Microsoft vendor blog corroborates but is secondary to the paper'
    - 'Original 2024 press announcement pre-dates peer review; this item records the peer-reviewed publication, not the 2024 claim'
    - 'No contradicting technical report found'
about:
  - qec-logical-fidelity
  - arch-trapped-ion
  - qec-logical-qubit-scaling
establishedBy:
  - url: https://www.nature.com/articles/s41586-026-10628-y
    title: 'Improved quantum processor logical error rates via correction and detection'
    relation: reports
    date: '2026-06-10'
    doi: 10.1038/s41586-026-10628-y
actors: [Microsoft, Quantinuum]
country: [US, UK]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The paper uses two code constructions optimised for Quantinuum's QCCD architecture: a 12-qubit code encoding two logical qubits (inspired by Knill) and a 16-qubit tesseract colour code encoding four. Combined with error detection and post-selection, the approach achieved no errors in more than 15,000 accepted trials in the most demanding configuration, corresponding statistically to a 0.001% error rate. The dominant noise source identified was dephasing from ion transport; compiler optimisations and dynamical decoupling reduced but did not eliminate it. The paper covers up to 12 logical qubits simultaneously. No commercially relevant computation has been demonstrated — the gap to cryptographically relevant scale remains several orders of magnitude in logical qubit count and gate fidelity.
