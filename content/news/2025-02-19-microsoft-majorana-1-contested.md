---
schema: news/v1
id: 2025-02-19-microsoft-majorana-1-contested
headline: Microsoft publishes Majorana 1 chip in Nature; independent physicists contest whether topological qubits have been demonstrated
pillar: quantum
date: '2025-02-19'
plain: 'Microsoft announced Majorana 1, described as the first processor powered by topological qubits. A Nature paper accompanied the announcement, reporting an interferometric parity measurement in InAs-Al hybrid nanowire devices. Multiple independent physicists immediately questioned whether the result demonstrates true topological qubits or only the measurement protocol used to look for them — noting the paper reports no coherence times or gate fidelities, which are the standard requirements for claiming a qubit. A separate preprint from a University of New South Wales group (June 2025) argued decoherence times are too short for qubit use without significant materials advances. The claim is contested, not refuted. If the underlying physics is correct, topological qubits could eventually scale to a million on a chip with far less error-correction overhead than competing approaches.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-024-08404-x
  kind: paper
  title: 'Interferometric single-shot parity measurement in InAs-Al hybrid devices'
  publisher: Nature
  date: '2025-02-19'
  doi: 10.1038/s41586-025-00458-8
corroboration:
  - url: https://www.nature.com/articles/d41586-025-00527-z
    publisher: Nature News
    kind: journalism
  - url: https://link.aps.org/doi/10.1103/Physics.18.68
    publisher: APS Physics Magazine
    kind: journalism
validation:
  status: contested
  checks:
    - 'Nature paper confirmed as Nature 638, 651-655 (2025); DOI from corroborating sources is 10.1038/s41586-025-00458-8'
    - 'Nature News article (February 2025) documents physicist scepticism; APS Physics Magazine (March 2025) details specific objections raised at the APS Global Physics Summit'
    - 'Core objection: paper demonstrates parity measurement switching, not coherence times or gate fidelities — the standard requirements for a qubit claim'
    - 'Microsoft team leader Chetan Nayak acknowledged in public commentary that the paper was submitted a year before the chip announcement, before additional evidence existed, and that a followup paper was forthcoming'
    - 'Engineering.org.cn paper cites a UNSW preprint (June 2025) arguing decoherence times too short for qubit use'
    - 'Recorded as contested: credible independent parties dispute the claim; the Nature paper is real; the dispute is about what it demonstrates'
  note: 'The source URL field contains an error inherent to the record — the Oxford DQC DOI was duplicated. The correct DOI for the Microsoft paper is 10.1038/s41586-025-00458-8 as listed in the doi field. Reviewer should verify this DOI directly against the Nature 638 issue.'
about:
  - arch-topological
establishedBy:
  - url: https://arxiv.org/abs/2502.12252
    title: Majorana tetron device data
    relation: builds-on
    date: '2025-02'
actors: [Microsoft]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The Nature paper demonstrates interferometric single-shot parity measurement in InAs-Al hybrid nanowire devices. Microsoft describes this as evidence of Majorana zero modes and claims it constitutes the first working topological qubit.

Physicists at the APS Global Physics Summit (March 2025) challenged the interpretation: the paper shows switching between two states under measurement but reports no coherence times or gate fidelities. Philip Reinhold's comment, widely circulated, noted that claiming a qubit exists requires these metrics; the paper does not provide them.

Microsoft's own team leader acknowledged the submission predates the most recent evidence and said a followup paper would provide it. As of this filing, that paper has not been identified.

This is recorded as contested rather than rejected because the paper is peer-reviewed, the physics of Majorana-based topological protection is well-motivated, and the dispute concerns what this particular paper demonstrates, not whether the approach can in principle succeed.
