# Source register

Where the agents look, in order, before searching for anything.

A register does what open search cannot: it makes coverage **deliberate and
auditable**. You can see what is on this list, what was checked, and what was
not. Search then catches what the register does not know about — which on a
frontier board is the whole point. Both, in that order.

Every agent reads this file. Adding a source here changes what all four do.

---

## How to use it

**Register first, search second.** Work the tiers below in order, then search
freely for whatever the register missed. Report which tiers you actually
reached — a run that only got through tier 1 is a legitimate run and worth
knowing about.

**The source type sets the evidence level, never the author.** A peer-reviewed
paper from Google is E4. A blog post from a two-person startup is E2. So is a
blog post from IBM. This is the rule that lets us list major vendors without
becoming their newsletter.

**Coverage requirement:** at least **half** of what you propose in a run must
come from outside the five largest programmes (IBM, Google, Microsoft,
Quantinuum, IonQ). Not because their work is weak — much of it is the best in
the field — but because their communications reach further, and a board that
simply follows attention is a board that has stopped looking.

If you cannot meet that in a given week, say so rather than padding.

---

## Tier 1 — Preprints

Where results appear first, usually months before the journal.

- arXiv quant-ph, new listings — https://arxiv.org/list/quant-ph/new
- arXiv quant-ph, recent — https://arxiv.org/list/quant-ph/recent
- arXiv cs.CR, for cryptanalytic and PQC work — https://arxiv.org/list/cs.CR/recent
- IACR ePrint archive — https://eprint.iacr.org/

Search these with the breakthrough vocabulary: *below threshold · reduced
overhead · constant overhead · logical error suppression · transversal gate ·
real-time decoding · magic state · scalable fabrication · room temperature ·
high yield · integrated photonics · modular architecture · improved coherence ·
microwave-optical conversion*.

## Tier 2 — Journals

The peer-reviewed record. E4, and E5 where independently replicated.

- Nature — https://www.nature.com/nature/research-articles
- Nature Physics — https://www.nature.com/nphys/research-articles
- Nature Communications, quantum physics —
  https://www.nature.com/subjects/quantum-physics/ncomms
- PRX Quantum — https://journals.aps.org/prxquantum/recent
- Physical Review Letters — https://journals.aps.org/prl/recent
- Physical Review Applied — https://journals.aps.org/prapplied/recent
- Quantum (open access) — https://quantum-journal.org/
- Science — https://www.science.org/journal/science

## Tier 3 — Standards and national technical authorities

Formal standards are E4. Guidance and roadmaps from these bodies are strong
sources for the migration and PQC constellations.

- NIST PQC project — https://csrc.nist.gov/projects/post-quantum-cryptography
- NIST publications — https://csrc.nist.gov/publications
- NIST NCCoE PQC migration —
  https://pages.nist.gov/nccoe-migration-post-quantum-cryptography/
- NCSC guidance — https://www.ncsc.gov.uk/section/advice-guidance/all-topics
- CISA — https://www.cisa.gov/topics/cybersecurity-best-practices
- ETSI quantum-safe cryptography —
  https://www.etsi.org/technologies/quantum-safe-cryptography
- European Commission digital strategy —
  https://digital-strategy.ec.europa.eu/en/library
- BSI Germany — https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Quantentechnologien-und-Post-Quanten-Kryptografie/quantentechnologien-und-post-quanten-kryptografie_node.html

## Tier 4 — Vendor and laboratory research

**Listed for their papers, not their newsrooms.**

Follow these to arXiv and journal publications, which carry their real evidence
level. A vendor's own technical document is E2 at most; the same team's paper in
Nature is E4. Cite the paper.

- Google Quantum AI research — https://research.google/research-areas/quantum-computing/
- IBM Quantum research — https://research.ibm.com/topics/quantum-computing
- Microsoft Quantum — https://www.microsoft.com/en-us/research/research-area/quantum-computing/
- Quantinuum publications — https://www.quantinuum.com/publications
- QuEra publications — https://www.quera.com/research
- PsiQuantum — https://www.psiquantum.com/news-import
- Rigetti, IonQ, Pasqal, Alice & Bob, Xanadu, Atom Computing, Oxford Ionics,
  Infleqtion, SEEQC, Diraq, Silicon Quantum Computing — search by name plus
  arXiv rather than trusting a press page

**Roadmaps are never evidence about Q-Day.** A vendor timeline is a commercial
statement about a product. Record it as E2 and score Q-Day impact 0.

## Tier 5 — National programmes and laboratories

Under-represented on this board and worth deliberate effort.

- UK NQCC — https://www.nqcc.ac.uk/
- UK NQTP — https://uknqt.ukri.org/
- NIST / JILA — https://jila.colorado.edu/research
- Sandia, Oak Ridge, Fermilab, Argonne quantum programmes
- EU Quantum Flagship — https://qt.eu/
- RIKEN, Japan — https://www.riken.jp/en/research/labs/rqc/
- USTC, China — search by group and by arXiv affiliation
- Delft QuTech — https://qutech.nl/publications/
- Innsbruck, Harvard, MIT, Caltech, Sydney, Waterloo IQC

## Tier 6 — Discovery indexes

Useful for **finding** things. **Never citable.**

- Wikipedia, list of quantum processors —
  https://en.wikipedia.org/wiki/List_of_quantum_processors
- Wikipedia, timeline of quantum computing —
  https://en.wikipedia.org/wiki/Timeline_of_quantum_computing_and_communication
- The Quantum Insider, Quantum Zeitgeist, postquantum.com

Follow them to the paper and cite the paper. If you cannot reach the paper, drop
the item — an aggregator's summary of a result is not the result.

Note that the processors list holds **devices**, while our architectures
constellation holds **modalities**. Do not pour one into the other.

---

## Known gaps, stated rather than implied

- **Non-English coverage is poor.** Chinese and Japanese programmes are
  significant and under-represented here. They are on the list above; whether
  they are actually reached each run is a different question, and worth saying
  out loud in your summary when they are not.
- **Patents are not searched.** No tooling for it.
- **Conference proceedings** are reached only when they surface elsewhere.

Say plainly when a tier went unchecked. A stated gap is a finding; a silent one
is a false impression of coverage.
