# Horizon Q — agent plan

The reference document for the agent layer. Written before building so we can
argue with it cheaply, and return to it when something drifts.

Companion to `DESIGN-LOG.md`, which covers the board itself.

**Status:** agreed, not yet built. Nothing in `agents/` runs today.

---

## 1. Scope and order

**Quantum first.** Get one galaxy and one agent loop working end to end before
adding either more agents or more galaxies.

Then **AI or cyber** — decided later, not now.

Everything below is built so a second galaxy needs new content and a new scale
definition, never new machinery.

### What is galaxy-specific

| Thing | Scope |
| --- | --- |
| Readiness scale | Per galaxy, in `content/frontier/_scales.json` |
| **Q-Day impact axis** | **Quantum only.** Decided 7 Aug 2026 |
| Constellations | Per galaxy |
| Evidence levels, priority | Universal |

Q-Day stays quantum. Other galaxies get their own impact axis later if one is
genuinely needed; inventing a generic "impact" now would produce a field nobody
can define and every agent would fill in badly.

---

## 2. The single most important structural decision

**A card and a frontier item are the same file.**

- **Front matter** = structured data the board reads
- **Markdown body** = the research card a human reads

One store, two audiences. Two separate stores would drift apart within weeks,
and the site would end up showing the shallower of the two.

Consequence: clicking a body on the board can show the full card. That is a far
better answer to "what is this thing" than the one-line summary we have now.

---

## 3. Classification — four axes, not six

The source spec proposed six taxonomies. Nobody applies six consistently, and
an axis that drives nothing on screen becomes noise the reviewer learns to skip.

### Kept

**Readiness** — existing five levels, per-galaxy definitions. Drives y position.

```
emerging · experimental · demonstrated · adopted · mainstream
```

**Evidence level** — replaces the current `confidence` field. Better, because
E5's independent-replication test is a real threshold rather than a judgement.

| | |
| --- | --- |
| **E5** | Replicated, independently validated |
| **E4** | Peer-reviewed experimental result, not yet replicated |
| **E3** | Preprint or credible lab demonstration |
| **E2** | Prototype or vendor technical claim |
| **E1** | Proposal or theoretical work |
| **E0** | Speculative |

E0 and E1 are never discarded for being speculative. They are labelled and kept.

**Priority P0–P4** — what the board should pull the eye to. Must reflect
significance, never publicity.

**Q-Day impact −3…+3** — quantum only. The most decision-relevant field on the
board, and the reason anyone senior would look at this at all.

### Dropped, and why

| Dropped | Reason |
| --- | --- |
| Technology readiness (8 levels) | Duplicates readiness. Two scales for one idea guarantees disagreement |
| Hype risk | Almost exactly the inverse of evidence level plus source role. Derive it for display; do not ask an agent to score it |
| Novelty (7 levels) | Demoted to a free tag. Useful colour, bad axis |

---

## 4. The Q-Day forecast is a tracked object

The strongest idea in the source spec, and it deserves to be more than a rule.

`content/forecasts/q-day.md` holds four estimates plus an **append-only log** of
every change: previous value, new value, the evidence responsible, confidence,
and which assumption changed.

That produces something genuinely unusual — not a countdown, but a countdown
**with its own change history**, where every movement is attributable to a
source.

### Baseline, 7 August 2026

| | |
| --- | --- |
| Earliest technically plausible | *to be set* |
| Aggressive | **2036** |
| Central | *to be set within range* |
| Conservative | **2041** |
| State | `human-set` |

Range of 2036–2041 set by Stuart. Everything after this is a tracked change.

### Agents may move it. Provenance must be unmistakable.

Revised 7 Aug 2026, replacing an earlier proposal-only rule. Agents can change
the estimate, but every value carries a state:

| State | Meaning | Shown as |
| --- | --- | --- |
| `human-set` | A person set or confirmed this | plain, no qualifier |
| `agent-estimate` | An agent moved it; not yet reviewed | **labelled on the board, in the card, and anywhere the figure appears** |

An agent writing to the forecast sets `state: agent-estimate` and cannot clear
it. Only a human sets `human-set`. There is no path by which an agent-set figure
quietly becomes an apparently human one — that is the whole safeguard.

### Age, not expiry

An agent estimate does not expire. It stands until reviewed. But the figure
always carries **when a human last looked**, so an unreviewed number can never
pass for a maintained one.

Every displayed value shows three things: the value, its state, and the date of
last human review.

> **2038–2043** · *Agent estimate, not yet reviewed*
> Moved from 2036–2041 on 12 Aug 2026 · **Last human review: 7 Aug 2026**

And once confirmed:

> **2036–2041** · *Reviewed*
> **Last human review: 7 Aug 2026**

The two dates do the work between them. A recent agent move against an old
review date is visibly a number nobody has checked; the reader can weigh it
without needing the system to decide on their behalf.

This is the same discipline as `evidence.verified` on every frontier item, and
for the same reason: an assessment is only as fresh as the last time somebody
actually looked.

### Guardrails on agent movement

1. **One axis at a time.** An agent may not move all four estimates in one
   change.
2. **Two-year cap.** Any single proposed move greater than two years escalates
   for a human decision rather than being written. Big jumps are where an agent
   over-reads one paper.
3. **Evidence required.** No move without a primary source and a stated
   assumption that changed. "Recent progress" is not a reason.
4. **Never on a roadmap.** A vendor timeline is not evidence about Q-Day. This
   is the single most likely way the estimate gets pulled earlier wrongly.
5. **Reversion is free.** A human can revert to any prior logged value in one
   action, and reversion is itself logged.
6. **Direction is not a bias.** An agent must be as willing to move the estimate
   later as earlier. Evidence of greater difficulty is evidence.

### Where the inner values come from

Decided 7 Aug 2026. The outer bounds are set by hand; the **aggressive and
central figures are a synthesis**, not an opinion.

`content/forecasts/experts/` holds one file per tracked forecast:

```yaml
who: Global Risk Institute            # or a named researcher, agency, standards body
kind: expert-survey                   # expert-survey | agency | researcher | model | agent
estimate: { from: 2033, to: 2040 }
basis: what this forecast is actually reasoning from
independent_of: [ ... ]               # forecasts this one does NOT merely restate
source: { url: ..., date: ..., role: primary }
verified: 2026-08-07
```

The agent's job is to **gather and maintain these**, then derive the inner
values from them. The derivation is written down and reproducible, not a feel.

Candidate inputs to gather first: the annual expert-survey timelines, national
technical authority positions (NIST, NCSC, NSA/CNSA), published cryptanalytic
resource estimates, and academic researchers who have put a dated figure in
print. Vendor roadmaps are recorded but **excluded from the derivation** — they
are commercial statements about a product, not forecasts about cryptanalysis.

### The failure mode this must avoid

Aggregating expert opinion has a specific and well-known weakness: **the sources
are not independent**. Five commentators citing one survey is one data point
wearing five hats, and averaging it produces false confidence.

Hence `independent_of` on every entry, and a hard rule:

> Two forecasts that trace to the same underlying analysis count once.

The agent must record what each forecast reasons *from*, not only what it
concludes. Where it cannot establish that, the entry is marked
`basis: unknown` and carries reduced weight.

### The agent's own judgement is a labelled input, not a blend

The agent may hold a view. It records it as one more entry with
`kind: agent`, its reasoning, and the evidence it rests on — visible alongside
the human experts rather than silently folded into the average.

That way a reader can see whether the number moved because the field moved or
because the agent thinks the field moved. Those are different claims.

### What is displayed

Never a bare figure. The forecast shows the range, the spread of inputs behind
it, how many are independent, and when each was last checked.

> **Central estimate 2038** · *Agent estimate, not yet reviewed*
> Derived from 9 forecasts, 6 independent · spread 2033–2045
> Last human review: 7 Aug 2026

A wide spread is information, not a defect. If the experts disagree, the board
should say so rather than manufacture a consensus.

### What has not changed

Distinguish, always: scientific feasibility ≠ engineering feasibility ≠
economic feasibility ≠ actual cryptanalytic capability. A result can be
scientifically decisive and change the engineering timeline not at all.

## 5. Five agents

One agent given six jobs does all six badly. Each of these has a distinct job,
its own write scope, and its own cadence.

| Agent | Cadence | Horizon | Job |
| --- | --- | --- | --- |
| **Scout** | weekly | 1–2 | Mainstream and emerging. Propose new items with sources |
| **Frontier Scout** | fortnightly | 3 | Labs, preprints, blue sky, small groups. Deliberately not the big vendors |
| **Verifier** | monthly | — | Re-check every source URL, update verified dates, decay evidence, hunt replication to promote E4→E5 |
| **Challenger** | monthly | — | Seek contradiction: failed replications, revised roadmaps, cancelled programmes, better classical algorithms |
| **Cartographer** | monthly | — | Deduplicate, merge updates, maintain the link graph, report trends |

### Why Scout is split in two

The source spec asks for 40/40/20 effort across mainstream, lab and blue sky.
A single agent told to spend 20% on blue sky will spend approximately none,
because mainstream results are easier to find and easier to source. Separating
the mandate is the only way the split actually happens.

Frontier Scout is explicitly told **not** to lead with IBM, Google, Microsoft,
Quantinuum or IonQ, and to look for small groups producing unusually important
results.

### Why Challenger is non-negotiable

An agent that only ever adds things drifts into confident nonsense within
months. Negative findings get cards of their own: a failed replication is a
finding, not an absence of one.

---

## 6. Build order

**Phase A — Scout + Verifier only.**
One loop, end to end: propose → review → merge → decay. Prove the review burden
is bearable before adding anything.

**Phase B —** Challenger. The first real test of whether the board can be wrong.

**Phase C —** Frontier Scout and Cartographer.

**Phase D —** Q-Day forecast object and its approval flow.

Review capacity is the binding constraint on all of this, not agent capability.

---

## 7. Safety model

Unchanged from the board's existing gates.

- Each agent declares `write_scope`; CI fails any PR touching a path outside it
- All proposals land in `content/frontier/_inbox/`, never directly on the board
- `src/renderers/`, `src/content/`, `content/schema/`, `scripts/` and
  `.github/` are forbidden to every agent regardless of scope
- No agent may modify a field listed in an item's `locked` array
- **Caps per run.** Six proposals maximum. A reviewer who stops reading the PRs
  is a failed agent, and volume is how that happens
- Anything touching Ofgem, named organisations, live consultations or
  regulatory positions escalates for a decision rather than shipping
- The Q-Day forecast is the one file where an agent writes a headline figure.
  The state label **and** the last-human-review date must both render, or the
  build fails.
  It is therefore the one file where provenance labelling is enforced in the
  renderer, not only in the data — a missing state label should fail the build,
  not merely look untidy

### Source discipline

Primary only: peer-reviewed papers, preprints, formal standards, national
technical authority publications, or a named vendor's own technical document.

Aggregators — Quantum Zeitgeist, postquantum.com, The Quantum Insider and
similar — are for **finding** things and are never cited as evidence. Use them
to locate the paper, then cite the paper.

Vendor press releases are never E4 or above. Vendors describe roadmaps as
achievements.

---

## 8. Errors the agents must not make

Carried over from the source spec, close to verbatim, because every one of
these is a real failure mode seen in public commentary:

- Treating physical qubits as equivalent to logical qubits
- Assuming qubit count alone predicts capability
- Equating quantum advantage with cryptographic capability
- Treating roadmaps as achieved results
- Copying marketing claims without qualification
- Reading funding announcements as technical breakthroughs
- Assuming every quantum algorithm gives practical advantage
- Assuming laboratory performance automatically scales
- Confusing QKD with post-quantum cryptography
- Confusing quantum sensing progress with quantum computing progress
- Treating theoretical resource estimates as engineering demonstrations

---

## 9. Search vocabulary, not schema

The long keyword lists in the source spec are excellent **prompt context** and
poor structure. They go into agent prompts as search vocabulary; they do not
become fields.

The hidden-breakthrough phrases are the highest-value of these, because an
obscure paper matching them frequently matters more than a corporate
announcement:

> reduced overhead · order-of-magnitude improvement · below threshold ·
> fault tolerant · logical error suppression · deterministic · scalable
> fabrication · room temperature · high fidelity · high yield · integrated
> photonics · modular architecture · improved coherence · real-time decoding ·
> constant overhead · transversal gate · quantum memory ·
> microwave-optical conversion

---

## 10. AI intersection — surface later, tag now

The source spec has a whole section on AI × quantum. That is not a quantum
topic and not an AI topic; it is the **intersection**, and intersections are
the thing Horizon Q is eventually for.

**Now:** items that sit across two galaxies get tagged, not moved. Nothing is
built to display them yet.

Candidates already visible in the quantum galaxy:

| Intersection | Where it lands |
| --- | --- |
| Machine-learning error decoders | quantum error-correction × AI |
| AI-designed quantum circuits and pulse sequences | quantum algorithms × AI |
| Autonomous laboratories running quantum experiments | enabling stack × AI |
| AI-designed materials for qubit fabrication | enabling stack × AI × materials |
| AI accelerators used for real-time decoding | enabling stack × AI |
| Foundation models for physics | algorithms × AI |
| Classical ML narrowing quantum advantage claims | algorithms × AI, and a **Challenger** beat |
| Harvest-now-decrypt-later against AI training corpora | migration × AI × cyber |

**Later:** a cross-galaxy view. Two boards side by side is the obvious version
and probably the wrong one. The interesting version is a body appearing in both
galaxies at once, with the link drawn between them — which is only worth
designing when a second galaxy has real content.

**Do not build the intersection view before the second galaxy exists.** The
design question is not answerable without data on both sides.

---

## 10a. Coverage of the source spec, section by section

Written 7 Aug 2026 after a fair challenge: the plan had drifted into being
mostly about Q-Day. Q-Day is the sharpest question, not the only one.

| § | Requirement | Status |
| --- | --- | --- |
| 1 | Twelve core questions | **Adopted** as Scout's per-run checklist (below) |
| 2 | Architectures | Constellation exists, 8 items. Spec lists ~28 modalities — thin |
| 3 | Hardware and engineering | `enabling`, 5 items against ~35 topics — **thin** |
| 4 | Error correction | Well covered, 10 items |
| 5 | Q-Day monitoring | Covered extensively, §4 |
| 6 | Algorithms and software | 6 items against ~20 topics — thin |
| 7 | Quantum × AI | Tagged now, surfaced later, §10 |
| 8 | **Applications** | **Missing entirely — new constellation needed** |
| 9 | Sensors | 7 items against ~25 topics — thin |
| 10 | Communications | 7 items, reasonable |
| 11 | Enabling technologies | Folded into §3 above |
| 12 | Organisations | Covered by the `actors` facet |
| 13 | Geographic coverage | **Add a `country` field** so the gap is measurable, not asserted |
| 14 | Sources | Covered, §7 |
| 15 | Evidence levels | Adopted, replaces `confidence` |
| 16 | Technology readiness | Dropped — duplicates readiness |
| 17 | Novelty | Demoted to a free tag on the item |
| 18 | Priority P0–P4 | Adopted |
| 19 | Q-Day impact | Adopted, quantum only |
| 20 | Hype risk | Dropped — derived from evidence level and source role |
| 21 | Hidden breakthroughs | Adopted as search vocabulary, §9 |
| 22 | Card creation | Adopted, one file, §2 |
| 23 | Duplicate handling | Cartographer |
| 24 | Contradictions | Challenger |
| 25 | Trend detection | Cartographer — **needs an output artefact, see below** |
| 26 | Q-Day discipline | Covered, §4 |
| 27 | Errors to avoid | Adopted near-verbatim, §8 |
| 28 | Three horizons | Covered by splitting Scout, §5 |
| 29 | **Final test** | **Adopted as the priority rule, below** |

### The applications constellation — the real omission

The board has no home for **what any of this is for**. Chemistry, drug
discovery, catalysts, battery chemistry, materials, fusion, financial
optimisation, logistics, energy optimisation, climate modelling, defence.

Ninth constellation: **`applications`**. Without it the board answers "how close
is this technology" and never "what would it be good for" — which is the
question most readers actually arrive with, and the one that makes the whole
thing legible to a non-specialist.

The spec's application ladder maps cleanly onto the existing readiness axis:

```
theoretical → emerging      simulation  → emerging/experimental
lab demo    → experimental  prototype   → demonstrated
pilot       → adopted       commercial  → mainstream
```

No new axis. One new constellation and a body of content.

### The twelve core questions become Scout's checklist

Not prose in a prompt — an explicit checklist Scout answers in every PR
description, so a run that found nothing says so rather than padding.

The two that matter most and are easiest to skip:

- **"Has any known bottleneck become harder?"** Negative movement is a finding
- **"Are previously accepted forecasts now outdated?"** The Challenger's brief,
  restated

### The final test sets priority

Adopted verbatim as the rule, because it is a better priority heuristic than
any rubric:

> **If this result is true and scales, what assumption would we need to change?**

If the answer is "none", it is P3 or P4. If it changes an assumption about
scalability, error correction, logical qubits, manufacturing, runtime,
cryptanalysis, networking, sensing, cost or deployability, it is P0 or P1.

Priority reflects significance, never publicity.

### Trend detection needs an artefact

§25 asks for periodic analysis across accumulated cards. Analysis nobody reads
is not analysis, so Cartographer writes to `content/trends/YYYY-MM.md`:

- what accelerated, what stalled
- architectures converging or being abandoned
- bottlenecks emerging or clearing
- repeated independent confirmation
- unexpected entrants
- what the board says now that it did not three months ago

That last line is the one worth having. It is also, in time, the raw material
for the pieces you would actually publish.

### Coverage becomes a measurable number

"Thin" appears five times in the table above. That should be a metric, not an
adjective. Each constellation declares its intended scope; the board shows
coverage against it.

> `enabling` · 5 of ~35 topics · **14% covered**

Honest, useful, and it points Scout at the gaps rather than letting it drift
toward whatever is easiest to find that week.

---

## 11. Known gaps, stated rather than implied

- **Non-English coverage is poor.** The agents search what their tools reach,
  which is overwhelmingly English. Chinese and Japanese quantum programmes are
  significant and under-represented here. Say so on the site rather than
  implying global coverage
- **Patents are not searched.** Named in the source spec; no tooling for it
- **43 of 56 current quantum items are unsourced.** Sourcing is the binding
  constraint on every view built so far
- Only 13 items carry real dates, so the timeline is sparse by fact, not by fault
- **Breadth is thin against the spec.** Enabling ~14% covered, algorithms and
  sensing similar. Depth of sourcing and breadth of coverage are separate
  problems and both are open
- **No applications content yet.** The constellation is agreed; nothing is in it

---

## 12. Open questions

1. Does the card body template stay short, or grow once we see real cards?
   Agreed short for now — review capacity decides
2. What is the review rhythm? Weekly PR review is the assumption; if that slips,
   cadences must come down rather than the queue growing
3. When does the second galaxy start — after quantum is fully sourced, or in
   parallel once the agent loop is proven?
4. Does the Q-Day forecast object get its own view on the board, or sit inside
   the existing one?
5. ~~What sets the earliest-plausible and central figures?~~ **Resolved 7 Aug
   2026:** synthesised from tracked expert forecasts plus the agent's own
   labelled judgement, with correlated sources counted once. Outer bounds stay
   hand-set
6. ~~Should an agent estimate expire?~~ **Resolved 7 Aug 2026: no.** It stands
   until reviewed, but always displays its state and the date of last human
   review. Clarity beats automatic removal
