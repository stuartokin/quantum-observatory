# Decisions

Questions that have already been answered. Every agent reads this before
escalating anything.

**The point of this file is that a decision made once is never asked again.**
An escalation costs a person's attention; the same escalation twice means the
first answer went nowhere. If you find yourself about to raise something, look
here first — and if the answer is here, apply it and say you did.

If a decision here is wrong, say so in your summary rather than quietly
ignoring it. Precedents should be arguable, not immovable.

---

## Evidence levels

**A vendor document about the vendor's own hardware is E2.** Whatever its legal
status. SEC filings included: the liability there attaches to material
misstatement to investors, not to technical precision about gate fidelity, and
it remains a company describing its own product.

Where a vendor's own preprint or peer-reviewed paper exists, cite that instead
and rate it accordingly. An E4 exception for one vendor's filings opens the same
door for every vendor with a communications team.
*Decided 9 Aug 2026, after arch-trapped-ion was rated E4 on an SEC filing and a
blog post.*

**A review, survey, Perspective or roadmap paper is E3 at most.** However
prestigious the journal. It summarises other people's experiments; it is not
one. Follow its citations to the experiment and cite that.
*Decided 8 Aug 2026, after a Nature Reviews Physics Perspective was rated E4.*

**`unrated` is not E1.** An item with no source attached is `unrated`. E1 is a
judgement that the work is theoretical; `unrated` is an admission that nobody
has looked. Conflating them once made surface codes — demonstrated
experimentally since 2014 — read as untested.
*Decided 9 Aug 2026.*

**A peer-reviewed experimental paper is E4 whoever wrote it**, including a
vendor's own laboratory. Peer review and replication are different things: E4 is
the first, E5 the second. Rating a vendor's Nature paper E3 because it has not
been replicated confuses the two and applies a standard the board does not apply
to universities.
*Decided 11 Aug 2026, after arch-photonic sat at E3 on a Nature paper through
three reviewer runs.*

**E5 requires independent replication by a different institution.** A follow-up
by the same team is not replication, however many papers deep.

**Replication on a different physical platform counts for E5, and counts more
than replication on the same one.** Two groups reaching the same result with
unrelated hardware is stronger evidence than two groups with identical kit.

**The claim must state the phenomenon replicated, not the number.** Where two
experiments report similar figures on different platforms, the agreement of the
figures is usually coincidence — different code distances, different error
models. What is established is that the effect is real. Say that, and do not
imply the measurement itself was reproduced.
*Decided 11 Aug 2026, on below-threshold surface code operation demonstrated by
Google on superconducting hardware and by Harvard/MIT on neutral atoms.*

**A preprint is E3**, including a preprint from a large laboratory, and
including one cited widely by others. Peer review is the line.

**A paper that calls itself a whitepaper is still E3 if it behaves like a
preprint.** The venue and the substance decide the level, not the label the
authors chose. On arXiv with a DOI, full derivations, co-authors outside the
sponsoring company, independently cited — that is a preprint whatever the
abstract calls it. E2 is for a document that exists to make a case for its
publisher: a vendor blog, a roadmap, a marketing paper.

**Withheld artefacts limit verification, not the venue.** A paper that publishes
its result but not its circuits, under responsible disclosure, is harder to
check and should say so in the source note. It does not become a lesser kind of
publication. Where an independent group reproduces the figures with full
disclosure, cite that alongside.
*Decided 16 Aug 2026, on Babbush et al. arXiv:2603.28846 — self-described
whitepaper, Google Quantum AI with Stanford and Berkeley co-authors, circuits
withheld and validated by zero-knowledge proof, corroborated with full circuits
by Schrottenloher arXiv:2606.02235.*

---

## Q-Day

**A vendor roadmap never moves a Q-Day score.** It is a commercial statement
about a product. Record it as E2, score 0.

**A resource estimate that trades space for impractical time is not a threat
metric.** A figure of 10,000 qubits at a 117-year runtime describes a regime
nobody would operate in. Where a paper mixes space-optimised and time-optimised
results, cite the operable configuration or reject the framing.
*Decided 9 Aug 2026, on arXiv:2603.28627.*

**Agents may move the forecast, but it is stamped `agent-estimate` and cannot be
un-stamped by anything but a human.** One axis at a time, a two-year cap on any
single move, evidence required.

---

## Corrections and escalation

**Downward corrections do not need permission, on any item, including one a
human has reviewed.** Lower an evidence level, weaken a claim that outran its
source, reduce a Q-Day score, move a readiness down — do it, note it, and say so
plainly in your summary.

A human review is not a seal on the content; it means somebody read it once,
with what was known then. Making the board more cautious cannot embarrass
anyone, and a revert is one click.
*Decided 9 Aug 2026. The earlier rule sent every correction to a human-reviewed
item to escalation, which spent attention on cases the agent had already got
right.*

**Upward corrections always escalate.** Raising a level, moving a readiness up,
strengthening a claim, promoting to E5.

**Anything naming Ofgem, a live consultation, a licence condition, an
enforcement action, a regulatory position or a select committee escalates.**
Professional risk, never an agent's to judge.

**Three escalations per run, maximum.** If more qualify, rank them, send three,
and report how many were suppressed and of what kind.

**When a classical counter-paper directly simulates the circuit behind the
strongest claim in a multi-paper item, lower the confidence and name the scope.**
The claim text must say precisely which sub-claim is weakened and which the
counter-paper does not reach. This is a downward correction and needs no
permission.

A counter-result is evidence, and belongs in the record beside the claim it
challenges. But an item covering three papers must not read as though all three
fell when one did.
*Decided 16 Aug 2026, on app-quantum-materials-advantage: arXiv:2608.13110
classically simulated the IBM/UChicago doped-Clifford circuit in 37 minutes on
256 H100s. Confidence lowered medium to low — that paper carried the only
complexity-theoretic hardness argument of the three — and the Qedma and
Algorithmiq results explicitly recorded as unaddressed.*

**When a classical counter-paper simulates the circuit behind the strongest
claim in a multi-paper item, lower the confidence and name the scope.** The
claim text must say precisely which sub-claim is weakened and which the
counter-paper does not reach. This is a downward correction and needs no
permission.

A counter-result is evidence and belongs in the record beside the claim it
challenges. But an item covering three papers must not read as though all three
fell when one did.
*Decided 16 Aug 2026, on app-quantum-materials-advantage: arXiv:2608.13110
classically simulated the IBM/UChicago doped-Clifford circuit in 37 minutes on
256 H100s. Confidence lowered medium to low — that paper carried the only
complexity-theoretic hardness argument of the three — with the Qedma and
Algorithmiq results explicitly recorded as unaddressed.*

---

## Scope

**A result repeatedly cited as corroboration for another item probably deserves
its own.** When three or more runs flag the same paper as bigger than the note
it sits in, that repetition is the signal. Corroboration supports a claim; a
distinct result makes one.
*Decided 11 Aug 2026, after four runs flagged Bluvstein et al. Nature 649 as
warranting its own entry rather than a footnote on arch-neutral-atom.*

**Only Scout may add topics.** Sourcer, Verifier and Reviewer revise what exists.
A genuine new finding goes in the summary under *Worth Scout's attention*, not
into a file.

**Never delete a published item.** Propose removal in the summary; a human
actions it.

---

## Framing

**An item covering several distinct research directions should be narrowed to
the one it evidences, not split.** Three items where two would sit unsourced for
months is not an improvement.
*Decided 9 Aug 2026, on arch-topological, which conflated Majorana zero modes,
fractional quantum Hall anyons and Floquet codes.*

## Provenance fields

**The actors field names the authors and their institutions**, not a
description of who a paper covers. A review of "multiple academic groups" is
written by specific people somewhere specific; that is what goes in the field.
Listing the subject matter instead misrepresents where the work came from.

**The country field records where the authors are based**, not the geographic
scope of what they describe. A review written at a Bangladeshi university,
surveying work done in the US and Europe, is `country: BD`. Populating it from
scope makes the board's coverage-gap measurement meaningless — it would report
strength exactly where the board is weakest.
*Both decided 16 Aug 2026, after enable-microwave-optical listed "Multiple
academic groups (survey)" and "US, Europe" for a paper by three authors at BUET
and BRAC in Dhaka. Each rule was proposed twice by the steward, on 12 and 14
August, because a proposed rule is not where an agent looks for a settled one.*

---

## Sources

**A peer-reviewed theoretical or architectural paper is E1.** Peer review does
not lift theoretical work; E4 requires an experiment. A blueprint describes what
could be done, not what was measured, and rating it E4 says an experiment
happened when none did.
*Decided 16 Aug 2026, after qec-surface-code was set to E4 on Fowler et al. 2012
(Phys. Rev. A 86, 032324), a theoretical architecture paper. The experimental
surface-code work is correctly at E4 and E5 on other items, so E1 here does not
make the architecture read as untested.*

**When a cited preprint has since been published, correct the citation** — url,
role, publisher, date, identifier, doi — to the published version. That is a
metadata correction and needs no permission.

**But correcting the citation is not the same as raising the level.** If the
published version would justify a higher evidence level, escalate that question
separately. Citing a preprint when a journal record exists gives a false picture
of the evidence; quietly promoting the level while fixing the URL gives a
different false picture.
*Decided 16 Aug 2026, after app-quantum-chemistry-catalyst cited
arXiv:2204.11890 as a preprint when Phys. Rev. A 106, 032428 (2022) exists.*

---

## Proposed, awaiting a person
