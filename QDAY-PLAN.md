# Bringing Q-Day Observatory into HorizonQ — a plan

Written 19 August 2026, against HorizonQ 0.48.11 and the current
`stuartokin/Qday-Research` `index.html` (2,563 lines, one file).

**Status: Phases 0–3 shipped as 0.49.0 → 0.52.0.** Phases 4 and 5 are still
a plan. Five of the seven Observatory sections are live. See `HANDOVER.md` → "Content is fetched now, not bundled"
and "There is a second surface now" for what each actually changed.

---

## What was asked for, and what was decided

Four decisions were taken before this was written:

1. **Threats and Readiness data** — import it quarantined, visibly marked as
   unverified, and have agents verify it over time.
2. **The Q-Day estimate** — derive it from sourced evidence; an engine
   proposes, a person confirms.
3. **Navigation** — Q-Day is a full-screen takeover from the board, with the
   same look and feel taken from the best of both.
4. **Look and feel** — HorizonQ's shell, keeping Qday-Research's
   threat-amber / defence-teal opposition as Q-Day's own accent.

On (3): the takeover will sit on a hash route (`#/q-day/trends`) underneath,
so pages stay deep-linkable. Qday-Research already syncs `?tab=` to the URL
today, so dropping that would be a regression against the thing being
replaced. Flagged rather than assumed — say if you'd rather not.

---

## Phase 0 — done (0.49.0)

**The content budget was the blocker, and the project's own rules said not
to raise it.**

At 0.48.11 content sat at 188.8 / 220 KB gzipped — 31.2 KB of headroom. The
portable data in Qday-Research measures **58.9 KB gzipped** as it stands,
and lands nearer **75–90 KB** once wrapped in HorizonQ's evidence, review
state and source fields. Two to three times the entire remaining allowance.

`DESIGN-LOG.md` and `AGENT-PLAN.md §11a` both answered this in advance:

> At roughly 200 items, or 220 KB gzipped of content, the fix is to emit
> content as a JSON file fetched at runtime rather than bundled. Do not
> raise the ceiling instead.

That is now done. Content is emitted as JSON assets and fetched;
before-first-paint went from 374.8 KB gzipped to 264.6 KB; the project's own
documents moved behind Help; markdown bodies stopped being shipped at all,
since nothing renders them. Budget buckets were rebuilt around what a
visitor actually waits for, with ceilings measured from the 0.49.0 build.

**The new ceilings are deliberately tight enough to fail when the Q-Day
datasets arrive.** That is wanted: it forces the question rather than
letting the number drift. The first lever then is deferring `news` out of
the initial fetch — 40% of the fetched bytes, shown a fortnight at a time —
not moving a ceiling.

---

## What HorizonQ can honestly evidence

| Tab | HorizonQ backing | Verdict |
|---|---|---|
| **Clocks** | `content/forecasts/q-day.md` (human-set 2034/2036/2038/2041), 12 standing questions, `qdayImpact` on 20+ items | **Strong.** Ships first. |
| **Trends** | 9 sourced resource estimates with DOIs; ~40 hardware metrics across 13 architecture + 11 error-correction items; 97 dated news items for the time axis | **Strong, but needs a new derivation** — see below. |
| **Stack** | Six components map onto existing constellations; `arch-*` and `qec-*` items carry the real figures | **Good.** The `pct` values are editorial and must be re-derived or dropped. |
| **Plan** | `cnsa-2-timeline`, `pqc-fips-203/204/205`, `harvest-now-decrypt-later`, EO 14412 news | **Partial.** UK NCSC 2028/2031/2035 exists only as a source URL on `mig-supply-chain` — not held as data anywhere. |
| **Threats** | **Nothing.** Zero `CVE-` strings anywhere in `content/` | **Import quarantined.** |
| **Readiness** | Almost nothing — `hybrid-tls-mlkem` (Cloudflare adoption %) and `mig-hardware-roots`. `mig-supply-chain` explicitly records that no empirical supplier-readiness survey has been published | **Import quarantined.** |
| **Learn** | Glossary and interactive explainers are presentational | **Straight port.** Low risk. |

The vendor and org records **already carry 88 evidence URLs between them**.
They are not unsourced — they are *cited but unchecked*. That makes
verification the job `verifier` already does, not original research.

---

## The Q-Day derivation — the real work

**Today's number is not computed.** `model.scenarios` hardcodes
2036 / 2038 / 2041. The only derived figure in Qday-Research is the Trends
chart crossover (`crossover()`, L1373), a log-linear extrapolation of **the
last two points of IBM's published roadmap**.

**That method is already forbidden by this board's own precedent:**

> **A vendor roadmap never moves a Q-Day score.** It is a commercial
> statement about a product. Record it as E2, score 0.
> — `agents/_decisions.md`, Q-Day section

So the derivation cannot be ported. It has to be rebuilt on demonstrated
capability — which HorizonQ is unusually well equipped to supply.

### Two curves, both moving

**The requirement floor is falling.** The current app treats it as a
constant, which is the thing it gets most wrong. HorizonQ holds the whole
descent, sourced: 20,000,000 physical qubits (Gidney & Ekerå 2019) →
<1,000,000 (Gidney 2025, at 0.1% gate error, 1 µs cycle, 10 µs reaction) →
<100,000 (qLDPC Pinnacle, arXiv:2602.11457, ~1 month runtime) → 1,193
logical for ECC-256 (EUROCRYPT 2026) → 26,000 physical for P-256 on neutral
atoms (Cain et al.). Two orders of magnitude in six years.

**Demonstrated capability is rising.** 98 physical at 99.921% two-qubit
(Quantinuum Helios), 120 + 218 couplers (IBM Nighthawk), 448 atoms
(Bluvstein), 48 error-corrected logical on 98 physical, Λ = 2.14 below
threshold. All dated via `evidence.verified` and cross-referenced by dated
news through `establishedBy`.

**The crossing is a distribution, not a date.** The three scenarios stop
being hardcoded years and become assumption sets: *Aggressive* (optimistic
requirement against the fastest demonstrated trend), *Source-weighted* (each
estimate weighted by evidence level — E2 vendor scores 0 per precedent),
*Cautious* (conservative requirement against the median trend).

**It must show its working** — which items fed it, at what evidence level,
under what stated assumptions, and what would have to change to move it.
That last one is what no other Q-Day tracker does, and this board can say it
because `qdayImpact` and `qdayReasoning` are already populated on 20+ items
(`algo-resource-estimation` +3, `algo-shor` +2, `harvest-now-decrypt-later`
+2, `hybrid-tls-mlkem` −1).

### The proposal flow

1. Build computes the derivation from current content.
2. If it differs from `content/forecasts/q-day.md` by more than the existing
   guardrails allow (one axis, two-year cap), it opens a proposal on the
   weekly review issue — stamped `agent-estimate`, never self-applied.
3. A person promotes it or deletes it, same as a steward precedent.
4. The site shows the human-set number as authoritative *and* the derivation
   beside it, so a divergence between the two is visible rather than hidden.

**Also worth fixing while in there:** `q-day.md`'s log records a move to
"2036-2041", but the estimates block reads 2034–2041. The `earliest` axis
moved without a log entry. Small, but this file is about to be load-bearing.

---

## Architecture

**Where it lives.** Not inside `Board.tsx` — that file is 3,246 lines and is
already the largest thing in the repo. Q-Day becomes a sibling surface:

```
src/qday/
  QDay.tsx              takeover shell, tab dock, route sync
  tabs/                 Clocks Trends Stack Plan Threats Readiness Learn
  charts/               shared SVG primitives
  derive/               the Q-Day model — pure, testable, no React
```

`src/App.tsx` grows a hash-route switch: board by default, `#/q-day/*`
mounts the takeover, lazy-loaded through the existing `lazyWithReload.ts` so
first paint is untouched.

**Two new collections, not five.** A collection per dataset would be five
schemas and five gates for records that mostly rhyme:

- `content/readiness/` — vendors *and* organisations, one schema with
  `kind: vendor | organisation`. 55 records.
- `content/threats/` — vulnerabilities *and* attacks, one schema with
  `kind: vulnerability | attack`. 51 records.

Standards and milestones do **not** get a collection — they belong on the
frontier items that already exist, which need the UK NCSC dates added as
data rather than as a URL. The glossary is presentational: no schema, no
agent, no provenance.

Each new collection needs the checklist in `HANDOVER.md`, which now includes
`src/content/collections.ts` as of 0.49.0.

**Quarantine.** A new `review.state: imported` — "brought in from
Qday-Research, not verified by this board". It renders through the
provenance grammar that already exists, counts as unreviewed in every header
figure, and can only be promoted with evidence, since upward corrections
always escalate. No new visual language required.

---

## The design merge

**Kept from HorizonQ:** the `#070B14` observatory ground and panel
treatment; Archivo display / Newsreader body / IBM Plex Mono labels; the
uppercase letter-spaced micro-label convention; 2px radii; the provenance
badge grammar; frame chrome and focus rings.

**Kept from Qday-Research:** amber `#ff9e3d` = threat, teal `#46d4c4` =
defence — that opposition *is* the subject of the section and is what makes
the two countdowns legible at a glance; the countdown card treatment; the
bottom tab dock, which maps onto HorizonQ's existing dock idiom; the
log-scale chart conventions.

Both designs already use IBM Plex Mono for labels and data, so the two
halves share a voice at the level a reader notices first.

**Fix before building on the palette:** `src/palette.ts` and
`src/styles/tokens.css` disagree — `PILLAR_SPECTRUM` assigns quantum
`#A77BFF` (Hg 435.8 nm) and cyber `#3DE0C0` (O III 500.7), while the CSS
tokens map those hexes to the opposite pillars. Q-Day is a quantum section
and will reach for the quantum accent; it should reach for one colour.

---

## Phases

**Phase 0 — Unblock. ✅ Done, 0.49.0.**
Runtime-JSON content migration, budget rebuilt, 110 KB off first paint.

**Phase 1 — The surface. ✅ Done, 0.50.0.**
Hash routing, the takeover shell, the tab dock, the design merge. Clocks
built on the forecast — countdowns, scenario pills, the Mosca test,
headroom, and the provenance saying the figure is asserted rather than
derived. Six sections visible and honest about being empty.

The palette fix was **not** done, deliberately: on inspection the two files
are used for different jobs and correcting either direction would recolour a
dozen pieces of unrelated chrome. That is a design decision, not a defect —
see `HANDOVER.md`. Q-Day did not need it resolved.

Deferred from Phase 1, with reasons: the readiness questionnaire that
suggests Mosca's X and Y (21 questions across three personas) is an
unevidenced scoring heuristic and belongs with the Readiness work in Phase 4,
labelled as a heuristic; and scenario choice is not yet in the URL, so a
shared link opens on the default rather than the sender's scenario.

**Phase 2 — The derivation. ✅ Done, 0.51.0.**
`src/qday/derive/`, pure and tested over fixtures; Trends built on it; the
proposal flow writing to the weekly issue; the `q-day.md` log inconsistency
fixed.

**Built differently from what this plan specified, on evidence.** There is no
two-curve crossing, because there is no capability time series to fit and the
only forward capability curve available is a vendor roadmap, which the board
scores zero. The derivation reasons from the falling requirement, the present
gap, expert elicitation and the impact ledger instead — and reproduces the
asserted 2036–2041 range exactly. See `HANDOVER.md` → "The Q-Day figure is
derived now".

**Resolved in Phase 3.** The dated capability series was built — but as
`measurements[]` on news rather than as a `content/capability/` collection.
The newsroom already produces dated, validated, item-linked records; they only
lacked structured numbers. No new collection, no new agent, and backfill
becomes "add a block to items that already exist".

**Phase 3 — Stack, Plan, Learn. ✅ Done, 0.52.0.**
All three built. NCSC and CNSA-2 dates captured as `content/milestones/` with
sources, and `src/qday/deadlines.ts` deleted. Stack's percentages were
**dropped rather than re-derived** — the remaining work is not linear in qubit
count, so the page shows multiples (8.9× logical, 58× physical) computed from
the derivation instead.

**Also folded in, on request:** `measurements[]` on the news schema — the
board's first accumulating record, and the thing that makes a real capability
series possible. Seven seeded from figures the board had already verified;
the newsroom fills the rest. See `HANDOVER.md` → "The board has a memory now"
for the two fields that stop it lying, and why no doubling time is computed
yet.

**Phase 4 — The quarantined data.**
`content/readiness/` and `content/threats/` schemas, gates, loaders; 106
records imported with `review.state: imported`; Threats and Readiness built.
**This is where the budget will fail** — defer `news` first, don't raise a
ceiling.

**Phase 5 — Verification.**
Extend `verifier`'s scope (or a dedicated agent — a folder is itself a
decision, per OPERATING) to work through the imported records against their
88 existing citations. Queue entries, and precedent in `_decisions.md` for
how a readiness score is graded.

Phases 1–2 are the substance and are roughly a session each. 3–4 are broader
but shallower. 5 is ongoing operations rather than a build.

---

## Risks and things to watch

- **The roadmap precedent is load-bearing.** If the derived date comes out
  materially later than the current 2038 because vendor roadmaps score 0,
  that is the board working correctly — but it will look like a regression.
  Worth deciding in advance that the honest answer wins.
- **Two videos, 22 MB.** `QDayDemo.mp4` (19 MB) and `QDayIntro.mp4` (2.7 MB)
  sit in the research repo. They don't belong in a Pages bundle. Host them
  elsewhere and link, or drop them.
- **Known inconsistencies in the imported data**: the welcome copy says "37
  vendors" against 40 records; ML-DSA-65 is 3,300 bytes in `sizes` and 3,309
  in `buildSizeBars`. Both trivial, both worth catching at import rather
  than inheriting.
- **`assess` scoring is a heuristic with no evidence behind it** — the Mosca
  X/Y suggestion derived from the readiness questionnaire. A reasonable aid,
  but it must be labelled as a heuristic, not given the authority of a
  sourced figure.
- **Four standing questions are stale at `unknown`** since 11 August
  (`architecture-pace`, `outside-accelerants`, `sensing-comms`, `roadmaps`).
  Several bear directly on Q-Day timing. Worth a scout run before the
  derivation leans on them.
- **`arch-superconducting` cites IBM Nighthawk with no source in
  `evidence.sources`** — flagged as a vendor statement. If the capability
  trend uses it, that gap matters.
