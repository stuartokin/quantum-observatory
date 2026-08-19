# Handover

For picking this up in a new conversation. The repo carries the design; this
carries what a session learned that has not yet been written into the design.

Read alongside `OPERATING.md`, `AGENT-PLAN.md`, `DESIGN-LOG.md` and
`agents/_decisions.md`. Those are the record. This is the part that would
otherwise be lost when a conversation ends.

---

## Where the project stands

**Version 0.53.0**, built in this session but not yet dragged into
`main` — see "Delivery now goes through the browser, not git push" below
before assuming otherwise. Board at 93 frontier items across nine
constellations, 97 headlines, twelve standing questions, five agents plus a
steward, and a queue.

**0.49.0 through 0.53.0 are Phases 0–3 of the Q-Day work, plus a
presentation pass.** Five of the seven
Observatory sections are live; Threats and Readiness wait on Phase 4.
`QDAY-PLAN.md` carries the sequence; the four sections below carry what a
session needs before touching any of it.

**Live at** stuartokin.github.io, deployed from `main` via GitHub Pages.

**0.48.11 fixed everything a full-repo code review turned
up**, on request, after the review itself was written up and delivered
first. Three real bugs a reader would notice — the zoom-out floor was
computed and never wired to the actual zoom clamp, so a spread-out board
could have unreachable off-screen area with no scrollbar to recover it;
timeline headlines were positioned to the month and then that precision was
silently discarded by `yearFraction`'s `new Date(year, 0, 1)`, stacking a
year's headlines at one point; and draft items could render live in the news
ticker and the "most changed constellation" panel, which read from the
unfiltered collection instead of the published-only one. Plus one that
matters more than it sounds: `applyFields` (the patch mechanism below) could
silently round-trip an unquoted date into an ISO timestamp if it shared a
touched block with a patched field — dormant only because current content
happens to quote every date. Full list, file by file, with the verification
for each: `CODE-REVIEW-2026-08-18.md`, also saved in the Claude Project as
`claude/2026-08-18-code-review.md`. All fixes are covered by the existing
gates (`npm run build` chain) plus two new regression tests in
`test-agent-io.mjs`; everything was green before this was handed back.

**The applications constellation was empty a week ago** and now holds four
items, all correctly hedged: no verified quantum advantage on a commercially
relevant problem has been published, and the board says so.

**The interface now**: galaxy and timeline in separate windows, a constellation
window, the twelve questions, a key shared by every plot, a dock that lists what
is put away rather than everything that exists. Zoom drives three levels of
detail; clicking a supergroup, readiness band or year hones to it. Nothing is
ever hidden by zoom — demoted items become small dim dots, still clickable.

**Recent significant content**: the July 2026 IBM/Qedma/Algorithmiq advantage
cluster, with the classical counter-paper (arXiv:2608.13110) already recorded
against it; Babbush et al. on ECC-256 resource estimates; DI-QKD at 100 km from
USTC; the HRL integrated silicon QPU.

---

## The Observatory's presentation kit

**0.53.0.** Stuart compared the Observatory against the research prototype it
replaces and preferred the prototype's formatting. He was right, and the
reasons are specific rather than a matter of taste — so they were adopted
rather than argued with.

`src/qday/ui/` now holds the shared pieces. **Use them rather than hand-rolling
another layout in a tab:**

- **`Section`** — a foldable small-caps rule with an optional `(i)` holding how
  the section was computed. Density is the enemy on these pages; folding is
  the cheapest answer, and the working belongs beside the result rather than
  in a footnote.
- **`BoardFigure`** — the card that explains itself, and the most important
  thing here. It takes a **frontier item id**, not prose, and fills its own
  drawer: `plain` → "in plain terms", `evidence.claim` → what the evidence
  says, `evidence.level` and `review.state` → the badges, `evidence.sources[0]`
  → the link. **It takes an id on purpose.** A card that could be handed
  arbitrary prose would eventually be handed some, and would then drift from
  the board silently. Use `DerivedFigure` where the figure genuinely has no
  single item behind it.
- **`Takeaway`** — the implication of a chart, stated as a claim a reader can
  disagree with rather than woven into the caption as if it were data.
- **`Chips` / `useMulti` / `useSingle`** — filters in one row above the chart.
  Colour follows the entity, never its rank: hiding a series must not repaint
  the survivors.
- **`useTooltip` / `ChartTooltip`** — a real hover layer. An SVG `<title>` is a
  tooltip only in the sense that it eventually appears, in the OS's styling,
  and on a touchscreen not at all. Positioned against the figure so it travels
  with the chart, and flipped left near the right edge.
- **`SourceRef`** *(0.54.0)* — **every citation anywhere on this surface goes
  through it.** It renders the reference inline and opens a panel with the
  title, publisher, identifier, access date, evidence level, reviewer note and
  a link out. Before it, a claim held a source in its data and showed the
  reader a bare publisher name: the citation existed and was unreachable. If a
  future tab prints `source.title` into a `<span>`, that is the thing to
  replace.
- **`ReadinessAssessment`** *(0.54.0)* — the Mosca test. See below.

### Things worth not re-learning

- `.qday-surface__main > *` sets one content width for every tab. Each tab used
  to set its own, so a wide monitor stretched the Plan gantt to 1900px and put
  its row labels a foot from its data.
- `.qd-stack__grid` and `.qd-plan__grid` use `align-items: start`. Without it a
  grid row stretches every card to its tallest sibling, so opening one drawer
  left two neighbours with a foot of empty panel.
- The gantt's window label sits **above** the band. In the tick row it printed
  straight through "2039".
- **Stack still has no completion percentages, and the bars are not them.** They
  are a log-scale position between one qubit and the published requirement,
  with no number printed, the multiple as the headline, and nothing summed.
  If a future session is asked for a progress bar or a total, that is the
  argument against it.
- **Escape is handled twice and the order is not the one you want.** The Q-Day
  surface and `SourceRef` both listen on `document`; `SourceRef` mounts later,
  so a bubbling listener closed the whole surface from inside an open panel.
  It listens in the **capture** phase and calls `stopPropagation`. Any future
  overlay on this surface needs the same, and the test is: open it, press
  Escape, and check you are still on Q-Day.

---

## The Mosca test is content, not code

**0.54.0.** `content/assessment/` holds three questionnaires — `exec.md` (4
questions), `tech.md` (10), `auditor.md` (7) — plus `maturity-levels.md`.
`ReadinessAssessment` reads them and plots x + y against z.

- **x, y and z are years, and only x and y come from the questionnaire.** z is
  the board's own derived Q-Day band, so the verdict moves when the evidence
  moves. That is the whole reason to have built this here rather than kept the
  prototype's static version.
- **The weighting is stated on the page.** Every questionnaire carries a
  `heuristic` string saying in plain words that the mapping from an answer to a
  number is editorial judgement rather than measurement. It is printed beside
  the questions. A weighting a reader cannot see is a weighting they cannot
  argue with.
- **Shelf-life options score in years (3 / 8 / 18 / 30), not on a 1–5 rating.**
  This was got wrong once: multiplying the option score by six pinned the x
  slider at its ceiling for every answer. The score *is* the number of years.
  Level averaging deliberately excludes the shelf-life question for the same
  reason — it is on a different scale from the rest.
- Adding the collection touched the same five places the milestone collection
  did. That checklist is in the section below and it still holds.

---

## The board has a memory now

**0.52.0.** News items can carry `measurements[]` — the figure an event
reported, structured. This is the first thing on the board that accumulates
rather than overwrites.

**Why it had to go on news and not on items.** A frontier item holds the
*current best* value: when a device ships more qubits an agent patches the
field and the old number is gone. A news item is dated by when the thing
happened and is never revised. So a hundred dated news items are a hundred
points and the items are a snapshot. That asymmetry is the whole design.

### The two fields that stop it lying

`modality` and `qualifier` are mandatory for anything plotted, and
`check-news.mjs` refuses a count without a modality.

- **Modality**: counts on different platforms are not points on one curve.
- **Qualifier**: Caltech's 6,100 atoms *trapped in a tweezer array* and
  QuEra's 448 *operated below threshold* are not the same measurement.
  Grouped naively they show capability **falling** by an order of magnitude.

`capabilitySeries()` computes a doubling time only when three points share one
qualifier and the series grows. **Nothing clears that yet**, and each group
says which condition it failed. That is the honest state of the board, not a
bug — do not be tempted to relax it to make a line appear.

### Seeding rule, if you add more

Only transcribe a figure that already exists as a verified metric on a
frontier item, and set `crossChecks` to that item. Seven measurements across
six events were added that way. Anything else is a newsroom campaign, not a
build task.

**One inconsistency found and left alone:**
`content/news/2026-08-10-quera-96-logical-qubits-nature-neutral-atom.md` has
`date: 2026-01-19`. The id is date-prefixed by convention, so the filename and
the field disagree. The `date` field is the one that counts and is correct;
renaming would change the id. Worth a tidy, not worth a silent rename.

---

## Regulatory deadlines are content

**0.52.0.** `content/milestones/` holds dated obligations — NCSC 2028/2031/2035,
the CNSA 2.0 timetable, the US federal target, the FIPS publication. Each has
its own source. `src/qday/deadlines.ts` is **deleted**, as its own header said
it should be.

- A milestone is not a frontier item and deliberately does not live with them:
  a frontier item maps how close a development is to being real, and a
  deadline is not a development. It has no readiness level and nobody
  demonstrates it.
- **`status` is never computed from the date.** A deadline in the past is not
  automatically met. The board records what actually happened.
- Adding the collection touched five places, which is the checklist working:
  `content/schema/milestone.schema.json`, `validate-content.mjs`,
  `agent-io.mjs`, `src/content/collections.ts`, and a loader with a `hydrate`
  registered in `store.ts`.

**0.54.0 added four and refused one.** The EU roadmap's end-2026 start and
end-2030 high-risk deadline, and NIST's 2030 deprecation and 2035 disallowal,
are in — each read from the primary document and marked `agent-reviewed` with a
note saying what was checked. Milestones gained a `review` block for exactly
this, using the same enum as every other collection.

**The one that was refused matters more than the four, and not for the reason
originally given.** The research prototype asserts an EU "2035 full transition"
milestone. It was not imported, because the Commission's *announcement* of the
roadmap sets end-2026 and end-2030 and no 2035 date, and it was queued as entry
1 for an agent to settle.

Scout settled it in 0.54.1 by reading the roadmap document rather than the
announcement, and **the date is real**: section 4.1, "By 31.12.2035: The PQC
transition for medium-risk use cases has been completed." It is now
`eu-2035-medium-risk`, and both existing EU records were rewritten to quote the
roadmap instead of the press release.

> **An announcement page is not the document.** A government news item
> summarising its own roadmap is closer to an aggregator than to a source,
> however official the domain. This board's rule about following a summary to
> the artefact applies to the European Commission exactly as it applies to
> Quantum Zeitgeist, and this is the first time it was broken from the inside
> rather than by an agent.

**Australia's ASD deadline is real and still not here** — cyber.gov.au refuses
automated fetching, so it stays queued rather than typed from memory.

`agents/scout/agent.json` now includes `content/milestones/**` and
`content/questions/**` in its write scope. A regulatory deadline is a scouting
result; routing it through a human retype was the only reason it wasn't.

---

## Widening a write scope is three changes, not one

**0.54.1.** 0.54.0 added `content/milestones/**` to scout's write scope and
nothing else. **All four runs that followed failed**, on two separate faults,
after the research was done and the sources found. Both are fixed, and the
shape of the mistake is the part worth keeping.

**Fault one — a fourth copy of the collection table.** `agent-io.mjs` carries
`COLLECTIONS`, and the comment above it says adding a collection means adding
one line in one place. That was untrue: `run-agent.mjs` kept its own
hand-written ternary inside `withIdentity` that knew news, questions and
forecasts and **silently defaulted everything else to `frontier/v1`**. So every
milestone scout wrote was stamped `frontier/v1` on the way past and then
rejected by the milestone schema for it — a file failing a check that the
runner itself had caused it to fail.

It now asks `schemaConstFor(path)`, which reads `properties.schema.const` out
of the governing schema file. **A JSON Schema already states this; asking it is
the only version that cannot fall behind.** `test-agent-io.mjs` asserts the
property for every entry in `COLLECTIONS`, so a new collection cannot be added
without it holding.

If you ever find a fifth copy of that mapping, delete it the same way.

**Fault three, found the run after — the brief's limits were the frontier's.**
`plain` is 1600 characters on a frontier item and **400** on a milestone. The
prompt printed one table of limits with no collection named above it, so the
agent wrote a frontier-length `plain` into a milestone and lost the file. Four
more records went that way, including Australia's ASD deadline twice — and it
had reached cyber.gov.au, which this session cannot. The tables are now headed
by collection, and the brief says explicitly that where it and the schema
disagree, **the schema wins**, since the schema is the thing that runs.

**Fault four, and the reason all of this kept costing whole runs.** A run whose
files were *all* rejected still spent its queue entry. The rule was "a usable
answer spends it", which is right for a run that searched properly and found
nothing — repeating that weekly is a loop rather than diligence. But a run
where every file was rejected did not find nothing: it searched, read the
source, wrote the record, and lost it to a character count. It now returns the
entry, up to the same two attempts a truncated run gets, so the retry that
fixes it can actually happen.

Ajv's message is also now told to say how far over: "must NOT have more than
400 characters (it is 431, so 31 over)". A field 31 over and a field written to
twice the limit read identically otherwise, so the log could not distinguish a
slip from a misunderstanding — and it was a misunderstanding every time.

**Fault two — `fixedCollections` said milestones could not grow.** That flag
exists because the twelve questions are twelve; scout once wrote six more
alongside them. Milestones were added to it by reflex in 0.54.0, which meant
that even with the schema stamped correctly, a *new* deadline — the entire
point of giving scout the scope — would have been rejected as "not one of the
existing milestones". Only `questions` is fixed.

**The check before widening a scope:** does the agent's prompt describe the
shape of what it may now write, does the runner know how to stamp it, and is
the collection allowed to grow? The prompt was the one that looked sufficient
and was not — it documented `question/v1` at length and never mentioned
milestones, while its file-format example showed `schema: frontier/v1` three
times as though it were universal.

---

## Stack has no percentages, on purpose

The research prototype scored each component of a cryptographically relevant
machine and summed them to "15% of the way there". Those figures were
editorial. The remaining work is not linear in qubit count, so 96 logical
qubits against 835 is not 11% of anything anyone could defend.

The page shows **multiples** instead — 8.9× more logical qubits, 58× more
physical — computed from the derivation, with the requirement's own source
date beside it. Where the literature publishes no target (nobody says what
gate fidelity a break needs, because it depends on the code) the row says so
rather than inventing one.

If a future session is asked to "add a progress bar to Stack", this is the
argument against it.

---

## The Q-Day figure is derived now

**0.51.0.** `src/qday/derive/` computes the board's Q-Day position from its
own items. The Trends page renders it; `npm run derive` runs the same code at
build time and is in the build chain.

**The result: the derivation reproduces the asserted range exactly.** Derived
window 2036–2041 against an asserted 2036–2041. The number a human set is
confirmed by the evidence rather than replaced by it, which is a better
outcome than a correction and was not guaranteed.

### It does not compute a crossing point, and that is deliberate

The plan for this phase described two curves meeting. That was written before
the content was surveyed, and it cannot be built honestly:

1. **There is no capability time series.** Every qubit-count metric on the
   architecture and error-correction items is dated within a fortnight of
   August 2026 — that is `evidence.verified`, when the board last *checked*
   the figure. The board records each item's current best value and never its
   history. A trend fitted to points sharing one x is not a trend.
2. **The only source of a forward capability curve is a vendor roadmap**, and
   `agents/_decisions.md` has always scored those zero. The research
   prototype's one genuinely computed number extrapolates IBM's roadmap.

The missing data and the standing rule point the same way, so the derivation
reasons from what is evidenced: the falling requirement (a real dated series),
the present gap (a snapshot, not a trajectory), expert elicitation (the only
thing on the board that maps to calendar years, and therefore what sets the
window), and the `qdayImpact` ledger.

### Things that will bite whoever touches this

- **A metric is dated by the paper its note names**, matched against
  `evidence.sources` by identifier — never by `evidence.verified`. Dating from
  the item would collapse every figure onto the week an agent last ran and
  destroy the entire signal. If the requirement trend ever goes flat, look at
  that join in `src/qday/derive/parse.ts` before believing the board changed.
- **Requirement and capability are dated differently, and that asymmetry is in
  the content.** Cryptanalysis items cite a paper per metric; hardware items
  cite one paper for the whole item. So capability points are dated by the
  item's most recent source — weaker provenance, labelled as such rather than
  dropped. Applying the requirement rule to capability would empty the gap.
- **Classification is by `cluster` and `constellation`, never by parsing
  names.** `cluster: cryptanalysis` is the requirement side; `architectures`
  and `error-correction` are the capability side. An early version tested the
  metric's prose and threw away "Logical qubits in demonstration
  (error-corrected)" — the single most relevant capability figure on the board
  — because the name contained "error", while admitting "Logical vs physical
  qubit lifetime = 2.4 times" as a count of qubits.
- **Annealers are excluded.** `arch-annealing` reports more qubits than any
  gate-model device on the board and cannot run Shor at any size.
- **`npm run test:derive` is sixteen cases over fixtures, not live content.**
  A test whose answer changes when an agent runs is not a test. Every case is
  a mistake this made on the way to working.
- **A divergence never fails the build.** It writes
  `.agent-run/qday-proposal.md` for the weekly issue. Making new evidence
  break the deploy would teach everyone to stop adding it.

### Chart colour is computed, not chosen

The interface amber and teal sit at OKLCH lightness 0.78 and 0.80 — fine for a
pill, outside the 0.48–0.67 band a categorical mark wants against this ground.
Chart marks use a stepped-down pair (`--qd-chart-required`,
`--qd-chart-demonstrated`) validated against the real surface for lightness,
chroma, colour-blind separation and contrast. If you add a third series,
validate it against the same surface rather than picking something that looks
right.

---

## There is a second surface now

**0.50.0.** The board is no longer the only thing the application renders.
`src/App.tsx` switches on a hash route: no hash is the board, `#/q-day/*`
mounts the Q-Day Observatory from `src/qday/`, lazily, so the board's first
paint is untouched.

**Hash routing, not the History API, and not by accident.** GitHub Pages
serves static files with no rewrite rules, so `/q-day/trends` would 404 on a
refresh. The usual workaround — a `404.html` that re-serves `index.html` —
turns every genuinely mistyped URL into a silent success, which is a worse
failure than the one it fixes. A hash never leaves the client.

### What moved, and what to know before touching it

- **The board's Q-Day window is gone.** `QDayPanel`, its frame, its entry in
  `defaultLayout`, its slot in the z-order array and its styles in
  `workspace.css` were all removed. The header bar and the toolbar button
  both now navigate to the Observatory. Two places showing the same forecast
  would have meant two places to update when the derivation lands.
- **The scenarios come from `content/forecasts/q-day.md`**, not from source.
  `src/qday/scenarios.ts` maps `aggressive` / `central` / `conservative` onto
  the three pills. An axis the forecast leaves unset is left out rather than
  filled from a neighbour.
- **`src/qday/deadlines.ts` is a deliberate, temporary exception.** It holds
  the UK NCSC 2028/2031/2035 checkpoints, which exist on the board today only
  as a URL hanging off `mig-supply-chain` — cited, not held as data, and you
  cannot render a countdown from a hyperlink. The surface shows the citation
  beside the clock and says it is not board data. **Phase 3 should empty and
  delete that file, not extend it.**
- **Everything on the surface is styled by `src/qday/qday.css`**, which ships
  with the lazy chunk. `.qday-boot` is the exception and lives in
  `global.css` — a loading fallback styled by the stylesheet it is waiting
  for is unstyled exactly when it is on screen.

### The forecast's own inconsistency is now visible

`content/forecasts/q-day.md` logs a single move to "2036-2041", but its
`estimates` block reads 2034–2041: the `earliest` axis moved at some point
without a log entry. That was noted in the code review and is now rendered
on the site under "Why this date?", where a reader can see it. Worth fixing
in the content — it is a one-line addition to the log, and this file is now
load-bearing for a whole surface.

### The palette question turned out to be subtler than the plan said

`QDAY-PLAN.md` said to fix `src/palette.ts` and `src/styles/tokens.css`
disagreeing about quantum and cyber before building. On inspection **it is
not a straightforward bug and it was deliberately left alone.**

The two files do disagree — `PILLAR_SPECTRUM` gives quantum the violet Hg
line and cyber the teal O III; the CSS tokens give those hexes to the
opposite pillars, and the violets are not even the same hex (`#A77BFF` vs
`#A97BFF`). But they are used for different jobs: `PILLAR_SPECTRUM` drives
the galaxy accent, while `--line-quantum` and `--line-cyber` are used as
generic UI accents — focus rings, provenance badges, "moved" markers — that
have nothing to do with pillars. Correcting either direction would swap the
colour of a dozen unrelated pieces of chrome. **That is a design decision
with a visible outcome, not a defect to fix quietly.**

Q-Day did not need it resolved: it uses threat-amber and defence-teal, and
binds defence to `--line-quantum` as an existing value rather than caring
which pillar owns the name.

---

## Content is fetched now, not bundled

**0.49.0.** The `content` and `news` JavaScript chunks no longer exist.
`plugins/contentJson.ts` emits each collection as `dist/content-data/<name>.json`
and `src/content/store.ts` fetches them. This is what `AGENT-PLAN.md §11a` and
`DESIGN-LOG.md` both said to do when content outgrew bundling, and specifically
said to do *instead of* raising the ceiling — which is why the ceiling was never
raised.

Before first paint went from **374.8 KB gzipped to 264.6 KB**, and 183.2 KB of
what remains is now data rather than code.

### The one invariant that will break this silently

**Never derive from a content export at module scope.**

```ts
// FINE — evaluated when the component renders, after content has loaded
function Panel() { const sourced = frontier.filter(isSourced) }

// BROKEN — evaluated at import time, captures the empty array, renders nothing
const SOURCED = frontier.filter(isSourced)
```

The loaders export `let`, not `const`, and reassign once during
`loadContent()`. ES modules export live *bindings*, so every importer sees the
hydrated value — which is why `Board.tsx` did not have to change at all. But a
module-scope `const` snapshots the empty array before hydration and there is no
error, no warning, and no crash. It just renders nothing, which is exactly the
"correct code somewhere nobody could reach it" failure this project keeps
recording. Every consumer was checked for this before the change; keep it that
way.

`main.tsx` awaits `loadContent()` before mounting, so no component needs a
loading branch. A failed fetch renders an explicit message rather than a white
screen — the ErrorBoundary cannot catch it, because it happens before there is
anything to render.

### Other things that changed with it

- **Markdown bodies are no longer shipped.** Nothing renders one — `Markdown`
  is used in six places, all of them Help rendering the project's own `?raw`
  documents, and `CHANGELOG.md` has recorded the gap since 0.1.0. They were
  bundled anyway for the whole life of the project. `INCLUDE_BODIES` in
  `plugins/contentJson.ts` flips it back in one line if that ever changes; the
  better answer is fetching one body when a reader opens that item.
- **`plugins/frontmatter.ts` was deleted.** Nothing imported `?parsed` any
  more. Its parser lives on in `plugins/parseFrontMatter.ts`.
- **The project's documents got their own `docs` chunk.** They were sharing
  the content chunk, and a manual chunk containing anything statically
  imported is fetched eagerly — so everyone downloaded `DESIGN-LOG.md` whether
  or not they opened Help. That is 50 KB now charged only to readers who do.
- **Adding a collection now also means adding a line to
  `src/content/collections.ts`** — the one list both the build plugin and the
  store read. That is on top of the existing checklist (directory, schema,
  `validate-content.mjs`, `agent-io.mjs`, loader, gate, agent `write_scope`).
- **The budget buckets changed** to `app / deferred / docs / data / news / css`,
  and the script now prints the before-first-paint total, which is the figure
  the budget always existed to protect.

### Known and deliberate, for whoever picks this up

- **The budget will fail when the Q-Day datasets land** (~75–90 KB gzipped,
  per `QDAY-PLAN.md`). That is intended — the ceilings were set from this
  build's measurements, not padded to accommodate a future phase. **The first
  lever is not the ceiling: it is deferring `news` out of the initial fetch.**
  It is 40% of the fetched bytes, the ticker shows a fortnight of it, and the
  archive is opened rarely. `loadContent()` is shaped to make that a change to
  one function.
- **`plugins/` is still not typechecked.** It never was. Adding it to
  `tsconfig.json` needs `@types/node` and a node-targeted config, since the
  existing one is browser-targeted — a small job, deliberately not smuggled
  into this change alongside a new dependency.
- Content is served with `?v=<package version>` as the cache key. Bump the
  version when content changes or readers will hold a stale copy for GitHub
  Pages' ten-minute max-age.

---

## Delivery now goes through the browser, not git push

**Read this before doing anything else in a new session.** Stuart now works
from Claude Projects and updates GitHub by hand through the browser — not
by asking a session to `git push`. An earlier session already hit this from
the other direction: its git proxy declined push access to
`stuartokin/stuartokin.github.io` outright, and the fix that session shipped
went out as a raw diff file for manual `git apply`. That was a one-off
workaround; this is now the standing way changes leave a session; don't
attempt `git push` and don't be surprised when it isn't available.

**What a session owes at the end of a change, every time:**

1. **A zip of only the changed and new files**, each at its real
   repo-relative path (`src/renderers/board/Board.tsx`, not `Board.tsx`) —
   so unzipping locally reproduces a small tree that drops straight onto the
   repo, and dragging that tree into GitHub's "Add file → Upload files" page
   preserves the paths and offers to replace what's there. A zip of the
   *whole* repo when three files changed makes the reader hunt for what
   actually moved; don't do that.
2. **`package.json`'s version bumped**, same convention as always — one
   version per delivered change, regardless of size, so a report of a
   problem can name a build.
3. **A new entry at the top of `src/releases.ts`**, in the project's own
   voice (what changed and why it was wrong before, not a commit-message
   summary of files touched) — this is what actually renders in the Help
   panel's "last N releases", which is the only changelog a reader of the
   live site ever sees. Trim the oldest entry to keep the array at ten, per
   its own docstring.
4. **A plain-language note of exactly which files changed**, in the chat
   response, so Stuart doesn't have to open the zip to know what he's about
   to overwrite.

None of this replaces `HANDOVER.md` itself — still update it the same way
this entry does, so the next session isn't rediscovering the same ground.

---

## Things that will bite a new session

### Character limits discard whole runs

Every capped field is validated before writing, and an agent must return the
whole file — so one overflow loses everything, including the parts that were
right. This cost five runs across three items before it was understood.

The runner now warns which items have under 150 characters of headroom. When a
file is discarded anyway, the item is full: trim `plain` and `qdayReasoning`
into the body, or make the edit by hand. `algo-resource-estimation` is the
worst offender and was edited manually in the end.

### An agent asked to do something outside its write scope will refuse

Correctly, and it costs a run. Scout sees the board *index*, not item contents,
so it cannot edit an existing item. Its write scope is
`content/frontier/_inbox/` and `content/questions/` — not `content/news/`.

Six runs were spent on one instruction that asked Scout to attach a source.
Three more were queued asking it to add news items.

### The steward reads issues, and treats them as the truth

It reads every board file too, but an issue comment is vivid prose and
`status: published` is one line in seventy YAML blocks. It repeated the same
three publish requests across six passes after they had been actioned.

A state table at the top of its board context fixed that. If it happens again in
a new form, the answer is to strip resolved requests from the thread before it
reaches the model, not to add more instruction.

### Run the steward before closing issues

It reads *open* issues. Closing a thread takes its leads with it. Five were
recovered by hand; that was luck, not design.

---

## The pattern in my own failures, which is worth guarding against

Working across an interface where I cannot see the running page or the live
repo, the same three mistakes recurred:

**A text substitution that matches nothing does nothing, quietly.** Roughly
half a dozen edits in one week silently no-opped because an anchor string did
not match — wrong indentation, a ternary spread over three lines, a comment that
had been reworded. Each time the check afterwards confirmed the wrong thing:
that the file still parsed, rather than that the change had landed.

**The fix: verify by reading back what the file now says, not by asking whether
it is still valid.**

**Building the right thing and connecting it to nothing.** A year-window filter
computed and never passed to the layout. A `setShowNewsOverlay` with no button.
A hovered-organisation display inside a panel that was closed by default. Each
was correct code in a place nobody could reach.

**The fix: after writing something new, check that the old code path now calls
it.**

**Diagnosing an invisible thing from a description.** Three wrong diagnoses of
one layering bug — the height clamp, then the z-order, then the default
position — all reasonable, all wrong. One screenshot with the obscuring window
shrunk solved it in seconds: the culprit was a hanging info panel, not the frame
at all.

**The fix: when something is invisible, ask for the view that shows what is
behind it, rather than reasoning about causes.**

---

## Patch mode is live

**Let an agent return a patch rather than a whole file.** This landed in
`main` since the last rewrite of this section — confirmed by `writeMode:
"patch"` present in `sourcer`, `verifier` and `reviewer`'s `agent.json`, and
by the version number having moved from 0.48.8 to 0.48.10 before this
session started. `agent-io.mjs` has `applyFields(existingRaw, fields)`:
`fields` is a flat object of dotted paths (`evidence.claim`, `review.note`,
`qdayImpact`) to new values, applied to the item as it stands on
`content/frontier/<id>.md` — never the inbox, which holds only a run's
unmerged proposals. `null` deletes a field. The special key `body` replaces
the markdown below the front matter. `evidence.sources` still replaces the
whole array — no per-element merge verb, deliberately.

`run-agent.mjs` reads the live file, applies the patch, and runs it through
the same `checkFile` a whole file always went through, so an overflowing
field is rejected exactly as before — except now only the fields in that one
patch are at risk, not everything else about the item. `scout` and
`newsroom` are untouched and still create whole files, since a file that
doesn't exist yet has nothing to patch.

**This session's review found and fixed two more bugs in it**, both recorded
in full in `CODE-REVIEW-2026-08-18.md`: `applyFields` didn't normalise a
Date object YAML hands back for an unquoted date, so a patch could silently
round-trip an unrelated date field into an ISO timestamp; and
`run-agent.mjs` ran patch output through `normaliseFile`'s whole-document
colon-quoting repair pass regardless, which could requote a scalar the patch
never touched — the exact "diff touches fields nobody named" problem the
patch mechanism exists to prevent, one layer up. Both fixed; the first is
now covered by a regression test in `scripts/test-agent-io.mjs`.

**Still open, not part of this session's ask — worth a look:**

- `verifier`'s prompt sets `review.state: agent-merged` on every patch, but
  the schema's own description of `agent-merged` is "published by an agent,
  unchecked", and verifier's whole job is *checking*. Reads like it should be
  `agent-reviewed`, matching what `reviewer` sets. Flagging rather than
  quietly changing it, per the standing rule on decisions.
- Budgets (`budget.proposals` in each `agent.json`) were sized for whole-file
  output economics. A patch is far smaller than a full item, so these are
  probably conservative now rather than tight — worth revisiting once a run
  or two shows the real size of a patch response.

## What a new conversation needs to be given

Not much, if these are read:

1. `OPERATING.md` — the loop, what a person decides, how to write a queue entry
2. `agents/_decisions.md` — every settled question, so none is reopened
3. `DESIGN-LOG.md` — the interface decisions and the failures behind them
4. This file — including "Delivery now goes through the browser, not git
   push" above, which changes what a session owes at the end of any change
5. `package.json` — for the current version number

Then whichever specific files a task touches. Do not accept an edit to a file
that has not been read in that conversation; blind edits are where the silent
no-ops came from.

---

## Practical, for a long-running project in a chat interface

**Screenshots are expensive but sometimes irreplaceable.** The layering bug was
only solvable from one. Prefer a log or a file where either will do, and reach
for a screenshot when the question is genuinely visual — then crop it to the
part that matters.

**Send files as text where the upload path allows.** Renaming `.mjs` or `.md` to
`.txt` has worked when a direct upload arrived empty. A fragment pasted inline
is better than a whole file that does not arrive.

**Version every package and say what changed.** Twelve point releases in two
days is not a problem; not knowing which one is deployed would be.

**When a run fails, the log is the most valuable thing you have.** Several fixes
in this project came from a single line of output that contradicted an
assumption — `content-Dz6Q3tbE.js` being byte-identical across two builds, or
`2 left` appearing three times in a row.
