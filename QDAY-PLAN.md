# Bringing Q-Day Observatory into HorizonQ — a plan

Written 19 August 2026, against HorizonQ 0.48.11 and the current
`stuartokin/Qday-Research` `index.html` (2,563 lines, one file).

This is a plan, not a change. Nothing in the repo has been touched.

---

## What you asked for, and what was decided

Four decisions were taken before this was written:

1. **Threats and Readiness data** — import it quarantined, visibly marked as
   unverified, and have agents verify it over time.
2. **The Q-Day estimate** — derive it from sourced evidence; an engine
   proposes, a person confirms.
3. **Navigation** — Q-Day is a full-screen takeover from the board.
4. **Look and feel** — HorizonQ's shell, keeping Qday-Research's
   threat-amber / defence-teal opposition as Q-Day's own accent.

**One amendment I'd like to make to (3), rather than quietly doing it
either way.** You chose full-screen takeover, and the option as written said
nothing would be deep-linkable. That's not actually forced: the takeover can
be full-screen *and* sit on a hash route (`#/q-day/trends`). It costs
roughly an afternoon, it keeps the presentation you chose, and
Qday-Research already syncs `?tab=` to the URL today — so dropping it would
be a regression against the thing being replaced. **I've planned for hash
routes underneath the takeover. Say if you'd rather not.**

---

## The one thing that has to happen first

**The content budget is already nearly spent, and this work cannot fit
inside it.**

`scripts/check-budget.mjs` at 0.48.11, gzipped:

```
content    188.8 KB / 220 KB   86%      headroom: 31.2 KB
news       106.1 KB / 120 KB   88%      headroom: 13.9 KB
app         73.6 KB /  88 KB   84%
```

The portable data in Qday-Research measures **58.9 KB gzipped** as it stands
(vendors 13.6, attacks 9.9, panes 7.8, vulns 7.4, model 6.0, orgs 5.3,
glossary 3.7, assessment 3.2, gantt+sizes 2.0). Wrapped in HorizonQ's own
schema — evidence blocks, review state, verified dates, source arrays — it
will land nearer **75–90 KB gzipped**. That is two to three times the entire
remaining content allowance.

`DESIGN-LOG.md` and `AGENT-PLAN.md §11a` already answer this, and the answer
is not to raise the ceiling:

> At roughly 200 items, or 220 KB gzipped of content, the fix is to emit
> content as a JSON file fetched at runtime rather than bundled. Do not
> raise the ceiling instead.

So **Phase 0 is the runtime-JSON migration**, and it is not optional. It is
also the right move independently: content stops being downloaded by every
visitor before first paint, each section fetches only what it needs, and the
board stops paying for the Q-Day datasets on a page that never shows them.
The `?parsed` Vite plugin already does the YAML→JSON work at build time —
this changes where the JSON is emitted, not how it's produced.

Without Phase 0, the build gate fails and refuses to be raised. With it,
there is room for everything below and a long runway after.

---

## What HorizonQ can honestly evidence today

This is the uncomfortable part, and it shapes the whole sequence. Per tab:

| Tab | HorizonQ backing | Verdict |
|---|---|---|
| **Clocks** | `content/forecasts/q-day.md` (human-set 2034/2036/2038/2041), 12 standing questions, `qdayImpact` on 20+ items | **Strong.** Ships first. |
| **Trends** | 9 sourced resource estimates with DOIs; ~40 hardware metrics across 13 architecture + 11 error-correction items; 97 dated news items for the time axis | **Strong, but needs a new derivation** — see below. |
| **Stack** | Six components map onto existing constellations; `arch-*` and `qec-*` items carry the real figures | **Good.** The `pct` values are editorial and must be re-derived or dropped. |
| **Plan** | `cnsa-2-timeline`, `pqc-fips-203/204/205`, `harvest-now-decrypt-later`, EO 14412 news | **Partial.** UK NCSC 2028/2031/2035 exists only as a source URL on `mig-supply-chain` — not held as data anywhere. Needs capturing. |
| **Threats** | **Nothing.** Zero `CVE-` strings anywhere in `content/` | **Import quarantined.** |
| **Readiness** | Almost nothing — `hybrid-tls-mlkem` (Cloudflare adoption %) and `mig-hardware-roots`. `mig-supply-chain` explicitly records that no empirical supplier-readiness survey has been published | **Import quarantined.** |
| **Learn** | Glossary and interactive explainers are presentational | **Straight port.** Low risk. |

The good news on the quarantined half: the vendor and org records **already
carry 88 evidence URLs between them**. They are not unsourced — they are
*cited but unchecked*. That makes verification a tractable job of exactly
the kind `verifier` already does: open the cited source, check it supports
the claim, correct downward if not. It is not original research.

---

## The Q-Day derivation — the real work

**Today's number is not computed.** `model.scenarios` hardcodes
2036 / 2038 / 2041. The only genuinely derived figure in Qday-Research is
the Trends chart crossover (`crossover()`, L1373), and it is a log-linear
extrapolation of the **last two points of IBM's published roadmap**.

**That method is already forbidden by this board's own precedent**, and this
is the single most important finding in the review:

> **A vendor roadmap never moves a Q-Day score.** It is a commercial
> statement about a product. Record it as E2, score 0.
> — `agents/_decisions.md`, Q-Day section

So the derivation cannot be ported. It has to be rebuilt on demonstrated
capability, which HorizonQ happens to be unusually well equipped to supply.

### The model I'd propose

Two curves, both moving, and the answer is where they cross:

**The requirement floor is falling.** This is the insight the current app
misses entirely by treating the floor as a constant. HorizonQ holds the
whole descent, sourced: 20,000,000 physical qubits (Gidney & Ekerå 2019) →
<1,000,000 (Gidney 2025, stated assumptions: 0.1% gate error, 1 µs cycle,
10 µs reaction) → <100,000 (qLDPC Pinnacle, arXiv:2602.11457, ~1 month
runtime) → 1,193 logical for ECC-256 (EUROCRYPT 2026) → 26,000 physical for
P-256 on neutral atoms (Cain et al.). Algorithmic improvement has moved the
target two orders of magnitude in six years. That trend is itself evidence.

**Demonstrated capability is rising.** 98 physical with 99.921% two-qubit
(Quantinuum Helios), 120 + 218 couplers (IBM Nighthawk), 448 atoms
(Bluvstein), 48 error-corrected logical qubits on 98 physical, Λ = 2.14
below threshold. Every one of these is dated via `evidence.verified` and
cross-referenced by dated news through `establishedBy`.

**The crossing is a distribution, not a date.** The three scenarios stop
being hardcoded years and become *assumption sets*:
- **Aggressive** — optimistic requirement estimate (qLDPC, 100k) against the
  fastest demonstrated capability trend
- **Source-weighted** — each estimate weighted by its evidence level
  (E4 peer-reviewed > E3 preprint > E2 vendor, which scores 0 per precedent)
- **Cautious** — conservative requirement against the median trend

**It must show its working.** Every scenario renders with: which items fed
it, at what evidence level, what the stated assumptions were, and — most
usefully — *what would have to change to move it*. That last one is the
thing no other Q-Day tracker does, and this board is uniquely positioned to
say it because `qdayImpact` and `qdayReasoning` are already populated on 20+
items (`algo-resource-estimation` +3, `algo-shor` +2,
`harvest-now-decrypt-later` +2, `hybrid-tls-mlkem` −1).

### The proposal flow

Per your decision, the engine proposes and a person confirms, which is
exactly the shape the board already uses:

1. Build computes the derivation from current content.
2. If it differs from `content/forecasts/q-day.md` by more than the existing
   guardrails allow (one axis, two-year cap), it opens a proposal on the
   weekly review issue — stamped `agent-estimate`, never self-applied.
3. You promote it or delete it, same as a steward precedent.
4. The site shows the human-set number as authoritative *and* the derivation
   beside it, so a divergence between the two is visible rather than hidden.

**Also worth fixing while in there:** `q-day.md`'s log records a move to
"2036-2041", but the estimates block now reads 2034–2041. The `earliest`
axis moved at some point without a log entry. Small, but this file is about
to become load-bearing.

---

## Architecture

**Where it lives.** Not inside `Board.tsx`. That file is 3,246 lines and is
already the largest thing in the repo; adding seven tabs of charts to it
would be the wrong instinct. Q-Day becomes a sibling surface:

```
src/
  qday/
    QDay.tsx              takeover shell, tab dock, route sync
    tabs/                 Clocks Trends Stack Plan Threats Readiness Learn
    charts/               shared SVG primitives
    derive/               the Q-Day model — pure, testable, no React
```

`src/App.tsx` (currently 12 lines) grows a hash-route switch: board by
default, `#/q-day/*` mounts the takeover. Lazy-loaded via the existing
`lazyWithReload.ts`, so the board's first paint is untouched.

**New content collections — two, not five.** The natural instinct is a
collection per dataset; that's five schemas and five gates for records that
mostly rhyme. Instead:

- `content/readiness/` — vendors *and* organisations, one schema with a
  `kind: vendor | organisation` field. Both carry name, sector, score,
  sub-scores, confidence, rationale, evidence[]. 55 records.
- `content/threats/` — vulnerabilities *and* attacks, one schema with
  `kind: vulnerability | attack`. Both carry year, severity, category,
  description, source. 51 records.

Standards and milestones do **not** get a collection — they belong on the
frontier items that already exist (`cnsa-2-timeline`, `pqc-fips-*`), which
need the UK NCSC dates added as data rather than as a URL. The glossary is
presentational and needs no schema, no agent, and no provenance.

Each new collection needs the eight-step checklist that already exists:
directory, schema, `validate-content.mjs` COLLECTIONS entry, `agent-io.mjs`
COLLECTIONS entry, loader + TS interface, chunking (already handled — the
Vite config matches the whole `/content/` tree), a gate in the build chain,
and agent `write_scope`.

**Quarantine.** A new `review.state: imported` — "brought in from
Qday-Research, not verified by this board". It renders through the
provenance grammar that already exists (`.prov--agent`, hollow bodies for
unsourced), counts as unreviewed in every header figure, and can only be
promoted with evidence, since **upward corrections always escalate** per
`_decisions.md`. No new visual language required.

---

## The design merge

HorizonQ's shell, Q-Day's semantics. Concretely:

**Kept from HorizonQ:** the `#070B14` observatory ground and panel
treatment; Archivo display / Newsreader body / IBM Plex Mono labels; the
uppercase letter-spaced micro-label convention; 2px radii; the provenance
badge grammar; frame chrome and focus rings.

**Kept from Qday-Research:** amber `#ff9e3d` = threat, teal `#46d4c4` =
defence — this opposition *is* the subject of the section and is what makes
the two countdowns legible at a glance; the countdown card treatment; the
bottom tab dock (which maps neatly onto HorizonQ's existing dock idiom); the
log-scale chart conventions.

**The bridge already exists** — both designs use IBM Plex Mono for labels
and data, so the two halves already share a voice at the level a reader
notices first.

**One thing to fix before building on the palette:** `src/palette.ts` and
`src/styles/tokens.css` currently disagree — `PILLAR_SPECTRUM` assigns
quantum `#A77BFF` (Hg 435.8 nm) and cyber `#3DE0C0` (O III 500.7), while the
CSS tokens map those two hexes to the opposite pillars. Q-Day is a quantum
section and will reach for the quantum accent; it should reach for one
colour, not two. Half an hour, but do it first.

---

## Phases

Each phase ends somewhere shippable. Nothing here is a big-bang merge.

**Phase 0 — Unblock (required first).**
Runtime-JSON content migration. Content emitted as fetched JSON rather than
bundled modules; per-collection lazy loading; budget gate updated to measure
the new shape. *Ships as: same site, materially faster first paint, budget
back to comfortable.*

**Phase 1 — The surface.**
Hash routing, the takeover shell, the tab dock, the design-token merge, the
palette fix. Clocks built on the existing forecast — real countdowns,
scenario pills, the Mosca test, headroom. Six empty tabs behind it.
*Ships as: Q-Day reachable from the board, one tab genuinely working.*

**Phase 2 — The derivation.**
The two-curve model in `src/qday/derive/`, pure and unit-tested against the
real content. Trends rebuilt on it. The proposal flow into the weekly issue.
The `q-day.md` log inconsistency fixed. *Ships as: the number stops being
asserted and starts being derived — the substance of the whole exercise.*

**Phase 3 — Stack, Plan, Learn.**
The three tabs HorizonQ can already evidence. NCSC UK dates captured as
data. `pct` values in Stack re-derived from real metrics or dropped.
*Ships as: five of seven tabs live, all sourced.*

**Phase 4 — The quarantined data.**
`content/readiness/` and `content/threats/` schemas, gates, loaders; 106
records imported with `review.state: imported`; Threats and Readiness tabs
built. *Ships as: all seven tabs live, two visibly unverified.*

**Phase 5 — Verification.**
Extend `verifier`'s scope (or a dedicated agent — note OPERATING's warning
that a folder is itself a decision) to work through the imported records
against their 88 existing citations. Queue entries, precedent in
`_decisions.md` for how a readiness score is graded. *Ships as: the
quarantine drains, weekly.*

**Honest estimate:** Phases 0–2 are the substance and are roughly a session
each. Phases 3–4 are broader but shallower. Phase 5 is ongoing operations
rather than a build. This is not a one-sitting job, and I'd rather say so
now than discover it at 80%.

---

## Risks and things I'd watch

- **The roadmap precedent is load-bearing.** If the derived date comes out
  materially later than the current 2038 because vendor roadmaps score 0,
  that is the board working correctly — but it will look like a regression.
  Worth deciding in advance that the honest answer wins.
- **Two videos, 22 MB.** `QDayDemo.mp4` (19 MB) and `QDayIntro.mp4` (2.7 MB)
  sit in the research repo. They don't belong in a Pages bundle. Either host
  them elsewhere and link, or drop them.
- **Known inconsistencies in the imported data**: the welcome copy says "37
  vendors" against 40 records; ML-DSA-65 is 3,300 bytes in `sizes` and 3,309
  in `buildSizeBars`. Both trivial, both worth catching at import rather
  than inheriting.
- **`assess` scoring is a heuristic with no evidence behind it** — the Mosca
  X/Y suggestion derived from the readiness questionnaire. It's a reasonable
  aid, but it should be labelled as a heuristic, not presented with the same
  authority as a sourced figure.
- **The four stale standing questions.** `architecture-pace`,
  `outside-accelerants`, `sensing-comms` and `roadmaps` are all `unknown`
  and haven't moved since 11 August. Several bear directly on Q-Day timing.
  Worth a scout run before the derivation leans on them.
- **`arch-superconducting` cites IBM Nighthawk with no source in
  `evidence.sources`** — flagged as a vendor statement. If the capability
  trend uses it, that gap matters.

---

## What I'd do first

Phase 0, and only Phase 0 — the runtime-JSON migration — then stop and show
you the budget numbers before touching anything Q-Day. It's the prerequisite
for all of it, it's independently worth doing, and it's the one piece where
getting it wrong is expensive to unwind later.

If you'd rather see something visible sooner, the alternative is Phase 1
first with the budget gate temporarily bypassed — but the project's own
DESIGN-LOG is fairly pointed about not doing that, and I'd be arguing
against the file.
