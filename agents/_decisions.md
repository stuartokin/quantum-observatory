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

**A preprint that has since appeared in a peer-reviewed journal may be promoted
to E4 only against the journal record itself** — volume, page or DOI. Secondary
reports that publication has occurred are not sufficient, however many agree. If
the record cannot be reached directly, leave the level where it is and say so.
*Decided 9 Aug 2026, after entanglement-distribution.*

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

**Readiness describes the technology, not the risk it addresses.** An item that
conflates the two should be reframed around the technology, with the risk stated
in the claim rather than the level. Where a threat model is recognised but no
instance is evidenced, that is `emerging` — not `demonstrated`.
*Decided 9 Aug 2026, after sense-grid-timing framed GPS-spoofing risk as a
timing capability, and harvest-now-decrypt-later used `demonstrated` to mean the
threat model is acknowledged.*

**An item's title must not imply a demonstration that does not exist.** Where
only resource estimates exist, name the gap rather than the achievement —
"Hardware gap to X" rather than "X at scale". Four separate runs independently
flagged `algo-shor` for this before it was changed.
*Decided 9 Aug 2026.*

## Proposed by the steward, 2026-08-11

Added by an agent applying existing precedent to a new case. Move these up
into the sections above once you have read them — or delete them if wrong.

**A P0 or P1 item must include summary, plain, qdayImpact, qdayReasoning, and novelty in addition to the schema-required fields. Schema validity alone is not sufficient for items the board highlights.**

A P1 item that passes schema validation but omits qdayImpact, qdayReasoning, and novelty cannot do its job of informing decision-makers; the schema permits omission but the board's purpose does not.

*Proposed 2026-08-11, after arch-neutral-atom was P1 and lacked qdayImpact, qdayReasoning, and novelty across multiple review runs despite passing schema validation. Not yet confirmed by a person.*

**A formally published NIST Interagency or Internal Report (NIST IR) with a DOI is E4. A NIST project page for a forthcoming standard, a preliminary draft, or an initial public draft is E3 at most. The line is publication, not selection or announcement.**

NIST IRs are formally published with DOIs and editorial review, equivalent in authority to NIST SPs and FIPS for evidence purposes. A project page or draft document lacks that status regardless of the importance of what it describes.

*Proposed 2026-08-11, after pqc-hqc (NIST IR 8545, formally published) correctly rated E4; pqc-fips-206-falcon (CSRC project page, unpublished FIPS) correctly rated E3 — the distinction between these two cases needed a recorded rule. Not yet confirmed by a person.*
