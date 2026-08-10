---
schema: news/v1
id: 2026-06-10-microsoft-quantinuum-800x-logical-error-nature
headline: 'Microsoft and Quantinuum 800x logical error rate improvement peer-reviewed and published in Nature'
pillar: quantum
date: '2026-06-10'
plain: 'Results first demonstrated on Quantinuum''s H2 trapped-ion processor in 2024 have now passed peer review and appeared in Nature. The experiment showed logical error rates between 11 and 800 times lower than physical baselines, using a Knill-inspired 12-qubit code and a 16-qubit tesseract colour code combined with error detection and post-selection. The peer review matters for the board: vendor announcements carry at most E2; a Nature paper carries E4. The result is no longer a claim about what one company measured on its own hardware — it is what the field has examined and not overturned.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-026-10628-y
  kind: paper
  title: 'Improved quantum processor logical error rates via correction and detection'
  publisher: Nature
  date: '2026-06-10'
  doi: 10.1038/s41586-026-10628-y
corroboration:
  - url: https://quantum.microsoft.com/en-us/insights/blogs/microsoft-application-of-error-correction-to-trapped-ion-qubits
    publisher: Microsoft Quantum
    kind: vendor
  - url: https://quantumcomputingreport.com/microsoft-and-quantinuum-publish-peer-reviewed-quantum-error-correction-data-in-nature/
    publisher: Quantum Computing Report
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper opened at doi:10.1038/s41586-026-10628-y; volume 654 pp. 349-355 confirmed'
    - 'Abstract confirms 11x-800x range and two code constructions: 12-qubit Knill-inspired and 16-qubit tesseract colour code'
    - 'Microsoft Quantum blog opened as secondary corroboration; consistent with paper content'
    - 'Quantum Computing Report article opened; confirms peer-review event and describes technical framework accurately'
    - 'Original 2024 results were preprint and vendor announcement (E2-E3); this journal publication is the E4 event'
  note: 'The 800x figure uses aggressive post-selection filtering; without post-selection, Bell-state error rate falls to ~0.17%, a 5x improvement. The paper reports both. Post-selection is not scalable to the regime where every computational output is used, but the experiment demonstrates that trapped-ion hardware at current fidelity can encode logical qubits with substantially lower error rates across non-trivial circuits.'
about:
  - arch-trapped-ion
  - qec-logical-fidelity
  - qec-colour-code
establishedBy:
  - url: https://arxiv.org/abs/2404.02280
    title: 'Demonstration of logical qubits and repeated error correction with better-than-physical error rates'
    relation: reports
    date: '2024-04'
  - url: https://arxiv.org/abs/2409.04628
    title: 'Demonstration of quantum computation and error correction with a tesseract code'
    relation: builds-on
    date: '2024-09'
actors:
  - Microsoft
  - Quantinuum
country:
  - US
  - UK
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

Two code constructions are reported. The 12-qubit carbon code (Knill-inspired) encodes two logical qubits and achieves a 51x reduction in error rate per round of repeated error correction versus the physical baseline. The 16-qubit tesseract subsystem code encodes four logical qubits; applied to graph-state preparation across 4, 8, and 12 logical qubits it delivers 15x, 11x, and 22x error reductions respectively. The most dramatic result — 800x — comes from Bell-state preparation with aggressive post-selection filtering (physical ~0.8%, logical ~0.001%).

The experiment runs on Quantinuum''s H2 trapped-ion QCCD processor using Microsoft''s qubit-virtualization platform. Ion transport within the device allows interactions between distant qubits, which is a structural advantage for both code constructions used. Results span circuits up to 12 parallelised logical qubits.

This is a record for the ratio of physical to logical error rate on a multi-qubit system, but it is not a demonstration of fault-tolerant universal quantum computation. Post-selection at this scale is not compatible with the error-corrected computation that would be needed for cryptanalytically relevant workloads.
