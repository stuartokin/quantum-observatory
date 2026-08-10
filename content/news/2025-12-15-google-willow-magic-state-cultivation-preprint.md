---
schema: news/v1
id: 2025-12-15-google-willow-magic-state-cultivation-preprint
headline: 'Google demonstrates magic state cultivation on Willow superconducting processor, 40x error reduction at 99.99% fidelity'
pillar: quantum
date: '2025-12-15'
plain: 'Fault-tolerant quantum computing requires two components: a way to store logical qubits reliably, and a way to execute non-Clifford operations that give computation its universality. The second piece is the harder resource problem. Magic state distillation — the standard method — requires large qubit factories running in parallel. Magic state cultivation is a proposed cheaper alternative that improves states through selective measurement and feed-forward rather than large-scale concatenation. Google has now demonstrated cultivation experimentally on Willow for the first time, achieving 40 times error reduction and a final magic state fidelity of 99.99%. The experiment also demonstrates code-switching between a colour code and a surface code. This is a preprint, not yet peer-reviewed.'
significance: notable
source:
  url: https://arxiv.org/abs/2512.13908
  kind: preprint
  title: 'Magic state cultivation on a superconducting quantum processor'
  publisher: arXiv
  date: '2025-12-15'
  doi: 10.48550/arXiv.2512.13908
validation:
  status: single-source
  checks:
    - 'arXiv preprint 2512.13908 opened; submitted December 15, 2025 by Emma Rosenfeld and 295 co-authors from Google Quantum AI'
    - 'Fidelity of 0.9999 and 40x error reduction confirmed in abstract; 8% post-selection rate noted in paper'
    - 'Code-switching from distance-3 colour code into surface code confirmed as part of the experimental protocol'
    - 'No peer-reviewed journal publication found as of August 2026'
    - 'Aggregator coverage at Quantum Zeitgeist (December 2025) but no independent laboratory replication'
  note: 'Single-source preprint. The 99.99% fidelity figure applies to post-selected attempts retaining 8% of trials. Production magic state generation would need higher throughput efficiency. The theoretical cultivation proposal (Gidney 2024) is the direct precursor.'
about:
  - qec-magic-state-distillation
  - arch-superconducting
  - qec-colour-code
establishedBy:
  - url: https://arxiv.org/abs/2409.17166
    title: 'Magic state cultivation: growing T states as cheap as CNOT gates'
    relation: builds-on
    date: '2024-09'
actors:
  - Google Quantum AI
country:
  - US
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

Magic states are the non-stabiliser resource that allows fault-tolerant quantum computers to execute the T gates and Toffoli gates needed for universal quantum computation. Producing them is currently the dominant overhead in fault-tolerant architecture proposals — the Gidney-Fowler RSA-breaking estimate, for example, requires a large fraction of its qubit budget for magic state factories alone.

Cultivation replaces the factory model with a protocol that starts from a single noisy magic state, applies a sequence of measurements, and post-selects on outcomes that indicate successful purification. The theoretical proposal showed this could be done with far fewer qubits than distillation, but it required mid-circuit measurement and real-time classical feedback at a fidelity that was not previously available on superconducting processors.

Google's experiment implements the full cultivation protocol on Willow, including the demanding code-switching step where the logical state moves from a colour code into a surface code. The 40× error reduction and 99.99% fidelity are measured via a fault-tolerant measurement protocol developed for the experiment.

The 8% post-selection efficiency is the figure that matters for practical use. A system producing magic states at 8% efficiency is a proof-of-principle, not a production resource. The path from this result to a practical magic state generator operating at competitive rates is not spelled out in the preprint, and peer review has not yet examined the claim.
