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

**A lead that two runs could not source is closed, not outstanding.** Record it
as unsourceable with what was searched and what was found instead, and do not
queue it again unless new information appears — an identifier, a citation
elsewhere, a journal record.

Repeating a search that came back empty is a loop rather than diligence, and it
teaches a reader that the queue does not track what has already been tried.
*Decided 17 Aug 2026, after two scout runs and twenty searches failed to resolve
a Communications Physics Rydberg electrometry paper to a DOI distinct from
s42005-026-02529-3.*

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

## Proposed by the steward, 2026-08-17

Added by an agent applying existing precedent to a new case. Move these up
into the sections above once you have read them — or delete them if wrong.

**A conference abstract or preprint submission announcement is E2 at most. It is an announcement of work, not the work. Cite the paper when it appears, and rate it by its venue.**

An abstract describes what a paper will claim; it has not been checked, reviewed, or peer-assessed. E3 requires at minimum a credible lab demonstration or preprint with full methods.

*Proposed 2026-08-17, after Considering whether to rate the Weizmann PRX 7 033021 paper based on a round-up mention before the paper was opened. Not yet confirmed by a person.*

**When a reviewer agent corrects a metric and the corrected file is discarded for YAML errors, the steward applies the same correction to the live file on the next pass. The correction is still downward and still needs no permission.**

A YAML discard does not invalidate the underlying finding. The correction is settled; failing to apply it because the vehicle failed is an error of omission.

*Proposed 2026-08-17, after pqc-additional-signatures-r3 family count correction was identified in PR #106 but the file was discarded; the correction was not applied to the scout-written live file. Not yet confirmed by a person.*

## Proposed by the steward, 2026-08-17

Added by an agent applying existing precedent to a new case. Move these up
into the sections above once you have read them — or delete them if wrong.

**A lead that two separate agent runs searched for and could not resolve to a specific DOI or publication record is closed, not re-queued. Record it as unsourceable with what was searched. Do not queue it again unless a new identifier, a citation elsewhere, or a journal record appears.**

Repeating a search that came back empty twice is a loop. The rydberg-ml-pca-comms-physics-2026 lead was searched by newsroom (issue #105, first run) and a second time without resolution. Queuing it again wastes a run.

*Proposed 2026-08-17, after rydberg-ml-pca-comms-physics-2026 in issue #105 could not be sourced across two newsroom passes with multiple searches each. Not yet confirmed by a person.*

## Proposed by the steward, 2026-08-17

Added by an agent applying existing precedent to a new case. Move these up
into the sections above once you have read them — or delete them if wrong.

**When an aggregator (QCR, Quantum Insider, Quantum Zeitgeist, postquantum.com) highlights a detail that is also present in a primary or vendor source already cited in the file, add the detail to the claim from the existing source. Do not add the aggregator as a source and do not leave the detail absent.**

The aggregator cannot be cited, but its discovery value — pointing to a detail in an existing citable source — should not be lost. The sourcer demonstrated the correct pattern on app-nqac-nuclear-reactor-optimization.

*Proposed 2026-08-17, after sourcer run on app-nqac-nuclear-reactor-optimization: QCR named Q-FLO but could not be cited; the name was present in the IQMP blog already in the file and was added to the claim from that source.. Not yet confirmed by a person.*

## Proposed by the steward, 2026-08-17

Added by an agent applying existing precedent to a new case. Move these up
into the sections above once you have read them — or delete them if wrong.

**A self-described whitepaper on arXiv with co-authors outside the sponsoring institution, a DOI, and independent citations is E3, not E2. The label the authors chose does not override the venue and substance test. E2 is for a document that exists to make a case for its publisher — a vendor blog, a roadmap, a marketing paper — not for a technical preprint that happens to call itself a whitepaper.**

The 2026-08-16 precedent covers this explicitly; the 'unsettled' flags in algo-shor and algo-resource-estimation review notes for Babbush et al. arXiv:2603.28846 are stale. Recording here so future agents do not re-escalate.

*Proposed 2026-08-17, after algo-shor and algo-resource-estimation both flagged arXiv:2603.28846 as E2 vs E3 unsettled after the 2026-08-16 whitepaper precedent was written; the precedent was not being applied to close the flag. Not yet confirmed by a person.*

## Proposed by the steward, 2026-08-18

Added by an agent applying existing precedent to a new case. Move these up
into the sections above once you have read them — or delete them if wrong.

**A stale escalation flag in a source note or review note that is settled by an existing precedent in the decisions file should be removed as a clarifying downward correction. No permission is needed. Update the note, cite the precedent, and record the date.**

Leaving settled flags in place wastes future reviewer attention and creates false impressions of open questions. The flag is part of the item's claim record; a stale one is as misleading as a stale claim.

*Proposed 2026-08-18, after algo-resource-estimation carried 'E2 vs E3 unsettled' on the Babbush source note through three reviewer runs after the 2026-08-16 whitepaper precedent settled it as E3.. Not yet confirmed by a person.*

## Proposed by the steward, 2026-08-18

Added by an agent applying existing precedent to a new case. Move these up
into the sections above once you have read them — or delete them if wrong.

**When the 2026-08-16 counter-paper confidence-downgrade precedent applies, it requires a named board item whose primary claim is being countered. A counter-paper that simulates a circuit from a preprint not present as a standalone board item does not trigger a confidence downgrade on any existing item; record the counter in the new classical-counter item instead.**

The precedent was written for app-quantum-materials-advantage where the countered claim was the board item's own primary claim. Applying it to unrelated items because they are adjacent would be overreach.

*Proposed 2026-08-18, after algo-classical-fermi-hubbard-ouyang: Q-CTRL arXiv:2605.04025 is not a board item, so no existing item confidence changed. Not yet confirmed by a person.*

**A resource estimate for a physics-simulation crossover (fault-tolerant simulation of condensed matter or quantum dynamics) has qdayImpact 0 regardless of qubit count. The qubit count in such estimates is sized for a physics problem, not a cryptanalytic circuit; citing it as a Q-Day signal would conflate simulation progress with cryptographic capability.**

370,000 physical qubits for Ising dynamics is not 370,000 physical qubits for Shor. The error in the board would be quantum advantage equated with cryptographic capability.

*Proposed 2026-08-18, after algo-ftqc-ising-crossover: 370,000-qubit crossover estimate for mixed-field Ising dynamics, qdayImpact correctly 0. Not yet confirmed by a person.*

**A classical counter-result that defeats a quantum advantage claim from a preprint not currently on the board as a standalone item belongs as a new board item in the algorithms constellation (cluster: classical-advantage-narrowing), not as a modification to an existing item. The counter is the result; the countered preprint is cited as corroborating context.**

Creating the counter as a standalone item preserves the result and its significance without forcing an ill-fitting modification to an existing item that does not cover the countered claim.

*Proposed 2026-08-18, after algo-classical-fermi-hubbard-ouyang created as standalone item; Q-CTRL preprint listed as corroborating source. Not yet confirmed by a person.*

## Proposed by the steward, 2026-08-18

Added by an agent applying existing precedent to a new case. Move these up
into the sections above once you have read them — or delete them if wrong.

**A 'Worth Scout's attention' lead that names a paper already cited as a published source in the relevant board item is satisfied and should not be re-queued. Record the finding in the issue comment and close the lead.**

Re-queuing a sourcer or scout run to attach a source that is already in the file wastes a run and teaches agents the queue does not track what has been done.

*Proposed 2026-08-18, after Scout issue #129 flagged checking Tindall et al. arXiv:2503.05693 Science publication status for arch-annealing and algo-quantum-simulation; both items already cite it as Science 392, 6800: 868 (2026).. Not yet confirmed by a person.*

## Proposed by the steward, 2026-08-18

Added by an agent applying existing precedent to a new case. Move these up
into the sections above once you have read them — or delete them if wrong.

**A 'Worth Scout's attention' lead that names a source already cited as a published record in the relevant board item is satisfied and should not be re-queued. Record the finding in the issue comment and close the lead.**

Re-queuing a sourcer or scout run to attach a source already present in the file wastes a run and teaches agents the queue does not track completed work.

*Proposed 2026-08-18, after Scout issue #129 flagged checking Tindall et al. arXiv:2503.05693 Science publication status for arch-annealing and algo-quantum-simulation; both items already cite it as Science 392, 6800: 868 (2026). Steward noted this in the previous cycle comment but the rule was not recorded.. Not yet confirmed by a person.*

## Proposed by the steward, 2026-08-18

Added by an agent applying existing precedent to a new case. Move these up
into the sections above once you have read them — or delete them if wrong.

**A 'Worth Scout's attention' or 'Could not source' lead that names a paper already present as a published source (with DOI or journal identifier) in the relevant board item is satisfied. Record the finding in the issue comment and do not re-queue it. A lead is only outstanding if the source is absent from the file.**

Re-queuing a sourcer or scout run to attach a source already in the file wastes a run and teaches agents the queue does not track completed work.

*Proposed 2026-08-18, after Tindall et al. Science 392 lead in Issue #129 flagged twice across two steward passes after both arch-annealing and algo-quantum-simulation already cited it as the published journal record.. Not yet confirmed by a person.*

**A 'Worth Scout's attention' lead that names a specific arXiv preprint as a candidate for a new board item, where that preprint has not been checked for peer-reviewed publication status or proposed as an item, qualifies for a single sourcer run to confirm venue and propose the item if warranted. It does not qualify for a scout run unless the item is genuinely absent from the board index.**

Scout cannot see file contents and cannot attach sources to existing items; sourcer is the correct agent to confirm a preprint's venue and propose or update an item.

*Proposed 2026-08-18, after arXiv:2501.08478 (Jeng et al., Northwestern chiplet compiler) flagged in Issue #121 scout run under 'Worth Scout's attention' with a queued /focus scout instruction; the job is actually a sourcer job since it involves confirming a venue and proposing an item, not adding a topic to the board index.. Not yet confirmed by a person.*

## Proposed by the steward, 2026-08-18

Added by an agent applying existing precedent to a new case. Move these up
into the sections above once you have read them — or delete them if wrong.

**A 'Worth Scout's attention' or 'Could not source' lead that names a paper already present as a published source (with DOI or journal identifier) in the relevant board item is satisfied. Record the finding in the issue comment and do not re-queue it. A lead is only outstanding if the source is absent from the file.**

Re-queuing a sourcer or scout run to attach a source already in the file wastes a run and teaches agents the queue does not track completed work.

*Proposed 2026-08-18, after Tindall et al. Science 392 lead in Issue #129 was flagged and re-flagged across three steward passes after both arch-annealing and algo-quantum-simulation already cited it as the published journal record.. Not yet confirmed by a person.*
