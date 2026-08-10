---
schema: news/v1
id: 2026-06-02-microsoft-majorana-2-legg-critique
headline: 'Microsoft announces Majorana 2 preprint as Nature publishes peer-reviewed critique of the Majorana 1 evidence base'
pillar: quantum
date: '2026-06-02'
plain: 'Two events unfolded in June that together deepen the existing dispute over Microsoft''s topological quantum programme. On 2 June Microsoft released a preprint claiming a 1000-fold improvement in parity lifetime for its Majorana 2 chip by replacing aluminium with lead in the superconducting stack. On 24 June, Nature published a peer-reviewed Matters Arising critique by Henry Legg of the University of St Andrews, arguing that the February 2025 Majorana 1 paper — the foundation of the programme — rested on coding errors in the topological gap protocol and on data Microsoft did not present. Microsoft''s reply appeared in the same issue. Neither event resolves the dispute: the Majorana 2 preprint has not been peer-reviewed, and Microsoft contests Legg''s reading of the Majorana 1 data. The dispute is now on the public record in Nature, which is a different situation from where it stood in February 2025. This item updates 2025-02-19-microsoft-majorana-1-contested.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-026-10567-8
  kind: paper
  title: 'On the robustness of topological gap detection via transport'
  publisher: Nature
  date: '2026-06-24'
  doi: 10.1038/s41586-026-10567-8
corroboration:
  - url: https://arxiv.org/abs/2606.03884
    publisher: arXiv
    kind: preprint
  - url: https://techxplore.com/news/2026-06-microsoft-quantum.html
    publisher: TechXplore
    kind: journalism
  - url: https://www.theregister.com/research/2026/06/24/boffin-claims-microsofts-supposed-quantum-leap-does-not-compute-due-to-basic-python-errors/5260489
    publisher: The Register
    kind: journalism
validation:
  status: contested
  checks:
    - 'Legg Nature Matters Arising paper confirmed: DOI 10.1038/s41586-026-10567-8, published 24 June 2026 in Nature.'
    - 'Microsoft reply confirmed in same issue: DOI 10.1038/s41586-026-10568-7.'
    - 'Majorana 2 preprint confirmed at arXiv:2606.03884, posted approximately 2 June 2026 — not peer-reviewed as of this writing.'
    - 'Legg argues coding errors in the topological gap protocol cause the same device to classify as topologically gapped or gapless depending on arbitrary measurement window choices.'
    - 'Microsoft argues the cited bugs are minor; maintains the topological gap protocol was a tune-up procedure, not the primary evidence for parity measurement results.'
    - 'Majorana 2 preprint presents only Z-type parity measurements — X-type measurements, necessary to demonstrate a functioning qubit, are acknowledged as future work.'
    - 'This item updates 2025-02-19-microsoft-majorana-1-contested with materially new information: a peer-reviewed challenge published in Nature and a successor chip announcement.'
  note: 'Contested: Microsoft maintains the physics is sound and the bugs trivial; Legg argues a fundamental protocol flaw, not a minor error. Both positions appear in Nature vol 654 (June 2026).'
about:
  - arch-topological
establishedBy:
  - url: https://www.nature.com/articles/s41586-026-10567-8
    title: 'On the robustness of topological gap detection via transport'
    relation: contradicts
    date: '2026-06'
  - url: https://arxiv.org/abs/2606.03884
    title: 'Majorana 2 chip preprint (Microsoft Azure Quantum)'
    relation: builds-on
    date: '2026-06'
actors: [Microsoft, University of St Andrews]
country: [US, UK]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

This item updates 2025-02-19-microsoft-majorana-1-contested. Two distinct events occurred in June 2026.

**Majorana 2 (2 June, preprint, arXiv:2606.03884):** Microsoft replaced aluminium with lead in the superconducting nanowire stack and reported parity lifetimes rising from milliseconds to approximately 20 seconds — more than a 1000-fold improvement. The preprint presents only Z-type parity measurements. X-type measurements, which are necessary to demonstrate a full qubit, are acknowledged as future work. Without X measurements, the result demonstrates a long-lived parity state in a superconducting wire, but does not demonstrate a qubit. The preprint has not been peer-reviewed.

**Legg critique (24 June, peer-reviewed in Nature):** Henry Legg, whose research focuses on semiconductor-superconductor nanowires, published a Matters Arising paper arguing that Microsoft's topological gap protocol — designed to distinguish topological from trivial Andreev states — produces results that depend on arbitrary parameter choices. Shifting measurement windows changes whether the protocol classifies a device region as topologically gapped or not. Legg also identifies what he describes as coding errors in the analysis software that concealed alternative results. Microsoft's reply in the same issue contests both characterisations, arguing the TGP was a tune-up procedure and the bugs were minor.

The context matters: this is the third time Microsoft has faced formal scientific scrutiny of its Majorana claims, following paper retractions in 2018 and 2021. Whether Legg's critique is vindicated or rebutted will require further experimental work and independent replication, neither of which exists yet. Microsoft's 2029 target for a commercially useful topological quantum computer rests on a programme whose foundational measurement is now formally contested in peer review.
