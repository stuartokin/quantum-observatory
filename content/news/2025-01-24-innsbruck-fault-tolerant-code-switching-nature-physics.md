---
schema: news/v1
id: 2025-01-24-innsbruck-fault-tolerant-code-switching-nature-physics
headline: 'Innsbruck and RWTH Aachen demonstrate first experimental fault-tolerant code switching between two error-correction codes on a trapped-ion processor'
pillar: quantum
date: '2025-01-24'
plain: 'A universal fault-tolerant quantum computer needs at least two error-correction codes — no single code supports all the gates required for universal computation fault-tolerantly. The Innsbruck group has demonstrated, on a real trapped-ion processor, switching between a 7-qubit colour code (which supports CNOT and H gates fault-tolerantly) and a 10-qubit code (which supports the T gate). Together they form a complete universal gate set. This is the first experimental demonstration of fault-tolerant code switching. The result does not yet run a practically useful algorithm, but it removes a specific experimental question that theory had long required to be answered: whether code-switching can be implemented without losing fault-tolerance in the transition. It can.'
significance: notable
source:
  url: https://www.nature.com/articles/s41567-024-02727-2
  kind: paper
  title: 'Experimental fault-tolerant code switching'
  publisher: Nature Physics
  date: '2025-01-24'
  doi: 10.1038/s41567-024-02727-2
corroboration:
  - url: https://www.uibk.ac.at/en/newsroom/2025/calculating-error-free-more-easily-with-two-codes/
    publisher: University of Innsbruck
    kind: authority
  - url: https://www.fz-juelich.de/en/news/archive/announcements/2024/optimising-quantum-computers-how-code-switching-improves-logical-operations
    publisher: Forschungszentrum Jülich
    kind: authority
validation:
  status: verified
  checks:
    - 'Nature Physics paper opened; DOI 10.1038/s41567-024-02727-2 confirmed; published January 24, 2025'
    - 'Paper abstract confirms switching between the 7-qubit colour code and 10-qubit code, forming a complementary universal gate set — codes and gate assignments consistent with press releases'
    - 'University of Innsbruck press release dated January 24, 2025 quotes named researcher Ivan Pogorelov; consistent with paper authorship (Pogorelov, Butt, Postler, Marciniak, Schindler, Müller, Monz)'
    - 'Forschungszentrum Jülich independently confirms the result as a co-author institution'
    - 'Confirmed as first experimental demonstration — no prior experimental code-switching paper found in literature search'
    - 'No contradicting technical report found'
about:
  - arch-trapped-ion
  - qec-colour-code
  - qec-logical-fidelity
establishedBy:
  - url: https://www.nature.com/articles/s41567-024-02727-2
    title: 'Experimental fault-tolerant code switching'
    relation: reports
    date: '2025-01-24'
    doi: 10.1038/s41567-024-02727-2
actors: [University of Innsbruck, RWTH Aachen, Forschungszentrum Jülich]
country: [AT, DE]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The code-switching procedure moves a logical quantum state between error-correcting codes without measurement, preserving fault tolerance throughout the transition. This matters because no single error-correcting code supports a fault-tolerant implementation of all gates in a universal set. The standard alternative — magic state distillation — is resource-intensive. Code switching offers a complementary route to universality with potentially lower overhead in certain circuit regimes.

The experiment used a compact trapped-ion processor at Innsbruck. The 7-qubit colour code provides fault-tolerant CNOT and Hadamard gates; the 10-qubit code provides the fault-tolerant T gate. The paper constructs logical circuits and prepares 12 different logical states not accessible fault-tolerantly within either code alone.

This is an experimental proof of principle at small scale. The qubit counts are modest and the circuits do not approach the scale needed for practical algorithms. But the demonstration resolves a specific question that fault-tolerant architecture had required to be answered before code-switching could be relied upon as a design element.
