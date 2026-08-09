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

**E5 requires independent replication by a different institution.** A follow-up
by the same team is not replication, however many papers deep.

**A preprint is E3**, including a preprint from a large laboratory, and
including one cited widely by others. Peer review is the line.

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

---

## Scope

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
