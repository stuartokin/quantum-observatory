# Backlog

Everything raised and not yet done, with why it is waiting. Kept because this
project runs across many conversations and a suggestion made in one is lost by
the next unless it is written down.

**Three rules for this file.** An item leaves only when it is done or
deliberately dropped — and a dropped item moves to the last section rather than
being deleted, so nobody re-proposes it in six months. An item that is blocked
says who on. And nothing goes here that belongs in `agents/_queue.md`: that is
for research an agent runs, this is for work a person or a session does.

Last reviewed: 20 August 2026, at 0.58.0.

---

## Blocked on Stuart

Nothing else can clear these.

| | What | Why it needs a person |
| --- | --- | --- |
| **B1** | Delete three duplicate milestones: `asd-ism-pqc-complete-2030`, `cmvp-fips-140-2-historical-2026`, `omb-m-26-15-full-migration-2035` | A drag-and-drop upload adds and replaces; it cannot remove. The keeper of each pair is the better record and the OMB keeper has already absorbed the loser's one unique fact. |
| **B2** | Confirm the repository name — `quantum-observatory` is assumed throughout the plan | It becomes part of the public URL and of `base` in `vite.config.ts`. Cheap to decide now, tedious to change after. |
| **B3** | Name any repositories missing from the landing page | The file is written and delivered. GitHub's API refused an unauthenticated listing, so it carries the three projects known from conversation. |
| **B4** | Decide whether to recreate a user site at `stuartokin.github.io` after the rename | Without one, the domain root serves nothing. The landing page is built for exactly this. |

---

## The remaining phases

From `PLAN-QUANTUM-OBSERVATORY.md`. Phases A, B and C are done; only D remains.

### C — Threats and Readiness — **DONE, 0.58.0**

All seven Q-Day sections are now live, which ends the Q-Day integration.

**Neither arrived as the quarantined import it was planned to be.** With the
project narrowed to quantum the board turned out to answer both questions from
sourced items, and the open question in this phase — how far "readiness" goes —
answered itself: not into general cyber maturity models, and not into vendor
scores. See HANDOVER for the reasoning, which is worth keeping.

### D — Rename the repository and republish — **NEXT, and the last one**

Steps are written out in the plan, including the trap: the repo is currently a
**user site**, and renaming makes it a project site at
`stuartokin.github.io/<name>/`. Every asset 404s until `base` is set in
`vite.config.ts`. Content fetching already goes through
`import.meta.env.BASE_URL`, so it is one line plus a verification pass.

Do it **last** — every phase above is easier to check at a URL that works.

---

## Deferred features

Genuinely wanted, not yet scheduled.

### D1 — A corrections surface

**The strongest thing this site has, and currently invisible.** Every record
where the board changed its mind: what it said before, what it says now, what
changed it. The data already exists in `review.note`, in `history` on the
questions, and in `lastChanged`; nothing surfaces it.

The EU 2035 episode is the worked example — the board asserted no such date
existed, an agent read the roadmap rather than the announcement, and the board
corrected itself and wrote the rule it had broken into `agents/_decisions.md`.
Today that story is only legible to somebody reading release notes.

*Raised in the cyber plan as Phase E; survives its withdrawal unchanged.*

### D2 — Intellectual property as a leading indicator

Requested and not yet started. A patent application is filed before publication
and usually before any announcement, so filings reveal direction that press
releases do not — and they are dated, primary, free and jurisdictionally
verifiable. Sources: EPO Espacenet and the OPS API, WIPO PATENTSCOPE, USPTO
PatentsView, Google Patents.

**The rule that must ship with it, or it poisons the board:** a patent is never
evidence that something works. It is evidence that somebody is trying, and it
dates the attempt. E1 at most; never moves a Q-Day score, on the same footing
as a vendor roadmap. The interesting object is rarely one filing but a *filing
pattern* — and a filing whose claims are narrower than the same organisation's
public statement is a finding in its own right.

Delivery: a `patents` source role, a decisions entry carrying that rule, and
scout prompts for filing sweeps where the board is thin — error correction,
control electronics, cryogenics.

*Requested 20 August 2026. Still wanted after the descope to quantum only:
patents are, if anything, more relevant to a hardware frontier than to cyber.*

### D3 — The key-size demonstration

Learn's FIPS step tells a reader the new keys and signatures are larger without
saying by how much, because **the board does not hold the figures**. A sourcer
job is queued to read them out of the standards. Build the third demonstration
when the board can cite it — not before.

*Blocked on: the queued sourcer run.*

### D4 — Another presentation pass

"Much better, but we can work again on it later." Nothing specific is
outstanding; recorded so the invitation is not forgotten.

---

## Content gaps

| | What | Note |
| --- | --- | --- |
| **C1** | Guidance text for the **technical** and **auditor** questionnaires | The executive set carries what NCSC, CISA/NSA/NIST, the NCCoE and the EU roadmap say, with links. The other two carry none. Real writing, properly sourced — not a filler job. |
| **C2** | Enough dated measurements to draw a capability trend | The derivation still refuses: neutral-atom physical qubits has three points that measure different things, everything else has one or two. **This is the honest state, not a bug** — do not relax the rule to make a line appear. The newsroom backfill is the route. |
| **C3** | The `applications` constellation | Was empty, now holds four items, all correctly hedged. Keep feeding it: the board answers "how close is this" far better than "what would it be good for". |

---

## Engineering debt

| | What | Cost of leaving it |
| --- | --- | --- |
| **E1** | No gate checks that a lesson's `cites` ids exist | A renamed or removed item makes a Learn step show an orange "not on the board" line to readers. Caught by eye today. A ten-line addition to `check-exports` or its own script. |
| ~~E2~~ | ~~`deferred` bucket near its ceiling~~ | **Closed 0.58.0.** The bucket was summing chunks a reader never downloads together. It now enforces on the largest single chunk — Q-Day at 29 KB of 40 — with the total still reported. |
| **E3** | `--line-quantum` in `tokens.css` is the O III line, which `palette.ts` assigned to *cyber* | The two files have disagreed since they were written. Teal is chrome, violet is data, and both are correct in behaviour. Renaming touches every stylesheet for no functional gain. **Left deliberately; documented in HANDOVER.** |
| **E4** | `2026-08-10-quera-96-logical-qubits-nature-neutral-atom.md` has `date: 2026-01-19` | The id is date-prefixed by convention, so the filename and the field disagree. The field is the one that counts and is correct. Renaming would change the id. Worth a tidy, not worth a silent rename. |

---

## Closed — do not re-open

Recorded so these are not proposed again.

| What | Why it is closed |
| --- | --- |
| Merging Cyber Attack Earth and the AI-vulnerability field guide | Withdrawn 20 August 2026. The project is quantum only. The analysis of that repository — that `build_cyber_data.py` is a data-lake builder with a human decision gate, filename-based staleness detection and a refusal to sum incompatible estimates — is preserved in `claude/2026-08-20-plan-cyber-and-beyond.md` in the Claude Project, should it ever be revived. |
| A cyber galaxy in the board | Same. Four unpopulated pillars removed in 0.56.0. |
| Private hosting, GitHub Enterprise Cloud, `horizonqltd.com` | Withdrawn. The site is public. Enterprise Cloud lists at $21 per user per month, which is roughly £200–250 a year to buy one feature for one person. If privacy is ever wanted, Cloudflare Pages with Access does it free — and "not indexed" and "access-controlled" are different problems with very different costs. |
| Stripping `pillar` from every content file | Rejected in favour of narrowing the enum. Ninety-two files unchanged, every record still states its domain, and a second domain could be added without a migration. |
| Rejecting near-duplicate milestones automatically | The runner warns instead. Three US deadlines genuinely fall on 31 December 2030, so a date-clash rejection would be wrong more often than right — and deciding whether two records describe one obligation is a judgement about meaning, which an automatic decision must not touch. |
| Making Q-Day sections into windows | Considered at 0.55.0 and rejected: seven long documents read badly in floating frames. The shared dock gave the consistency without the cost. Pop-out figures remain a live option if it is ever wanted. |
