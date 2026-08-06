# Horizon Q — design log

Running record of requirements, decisions and open questions. Updated as we go.
Feeds the image-generation prompts, then the architecture, then the data model.

---

## 1. What this is

**Not** a portfolio of Stuart's work. An **observatory of the frontier** — a live,
sourced map of how close developments in each field are to being real. Stuart's
writing annotates the board; it is not the subject of it.

Decided 3 Aug 2026, after the portfolio version was built and judged to have no
wow factor. The name promises the frontier, not a CV.

## 2. Brand

| | |
| --- | --- |
| Company | HorizonQ Limited |
| Domain | horizonqltd.com |
| Tagline | Enabling future technology for positive change |
| Logo | Square mark, deep navy `#001656` |
| Byline | Stuart Okin, personal capacity, disclaimer on all published content |

## 3. The board — core concept

Vertical axis is **readiness**, not time. Decided after comparing both as
generated images; maturity answers "how real is this", which is the question the
audience actually has.

**AXIS INVERTED, 3 Aug 2026.** New ideas arrive at the TOP and drift DOWN as
they mature toward mainstream. Gravity does the explaining — things fall toward
reality. New arrivals land where the eye already starts, which removes the need
for arrows and badges to direct attention.

```
EMERGING          ← new arrivals flash in here, bright, labelled
                     wide and busy: speculation is cheap
EXPERIMENTAL
DEMONSTRATED
ADOPTED
MAINSTREAM        ← few, large, settled
```

Shape is a **funnel**, not a mountain: broad at the top, narrowing downward.
Most of the frontier never reaches the bottom.

**Per-pillar axis.** The scale is not universal — "demonstrated" means something
different in quantum than in cyber. When a column is focused, its axis relabels
to that field's own maturity language. Resolves open question 2.

**Focus mode.** Three columns on arrival, but any one can be focused to fill the
frame. Multi-column is the overview; single-column is the working view.

Columns are pillars. **Launch with three**: cyber (violet), quantum (teal),
AI (amber). Materials and energy shown but marked NOT YET COVERED — no data, no
methodology, and an unsourced readiness claim about energy technology is a
professional risk given Stuart's role.

### Density rule (critical)

The interface is **not** uniformly dense. That was the flaw that killed the
first video concept: 1,842 individually tappable dots is not an interface — on a
phone each target would be a few pixels with no hint of what it is.

- **Top zone** — sparse, every item permanently labelled, large targets
- **Middle** — named clusters with counts, e.g. `QUBIT SCALING — 41`
- **Floor** — dim texture, aggregate only, never individually tappable

Semantic zoom resolves clusters into labelled items. Zoom is **resolution**,
not magnification.

### Attention mechanic

Two motions, both downward-settling:

- **New ideas flash in at the top**, brightness weighted by importance as judged
  by the agents. This is how agent discovery becomes visible rather than
  announced.
- **Clusters drift down** as evidence accumulates. Movement is the signal; the
  board tells you where to look rather than daring you to guess.

Expand a drifting cluster, pick a star, read further.

### Confidence decay

Ratings age. Not re-verified in 6 months → visibly fades. 12 months → drops to
low confidence, flags for review. Makes the board honest, gives agents real
work, and means it visibly breathes without faked telemetry.

**No fake telemetry.** No "power level 89.3%". Every number is a real count.

## 4. Evidence standard

Every marker carries these or it does not exist:

```yaml
readiness: lab-result
evidence:
  source: https://…        # primary, free to access
  claim: what the source actually says
  verified: '2026-08-02'
confidence: medium         # high | medium | low
```

Extends the Patch Pulse confidence-badge discipline to the whole board. When a
rating is disputed, point at the source rather than defend a judgement.

## 5. Two content collections

- `content/frontier/` — the world. Readiness items.
- `content/items/` — Stuart's articles, talks, observatories.

An article links to the frontier items it discusses. A frontier item shows
"Stuart wrote about this". Conflating them would force a rebuild later.

## 6. UI requirements

### Windowing
- Frames are **resizeable and moveable**
- Keyboard shortcuts dock/hide frames left and right
- Saveable window arrangements ("workspaces")

### Toolbar
- Moveable and collapsible
- Functions (predicted, to confirm): filter by pillar, confidence threshold,
  time scrub, search, sources on/off, agent activity, read view, options,
  save/load workspace

### Auth
- Login screen present but **greyed out / disabled** at launch
- Later enables admin, and additional services (commercial tier)

### Form factors
- Laptop: desk instrument. Persistent sidebar, horizontal toolbar, windowing.
- Mobile: card overlays rather than windows. Thumb-reachable controls.
- Fold: must work folded, unfolded, mid-fold.
- Document view permanently available — screen readers, slow connections,
  vestibular sensitivity. Off-limits to redesign agents.

## 7. Agents

| Agent | Cadence | Job |
| --- | --- | --- |
| Scout | weekly | Propose new frontier items with sources, into an inbox |
| Verifier | monthly | Re-check evidence URLs, update verified date, decay confidence |
| Challenger | quarterly | Argue the opposite rating on a sample, flag disagreements |

The Challenger is non-negotiable. An agent that only agrees will drift into
confident nonsense.

**Autonomy model:** ships freely with a canary window (12h preview, auto-promote
unless vetoed), but anything touching Ofgem, named organisations, live
consultations or regulatory positions escalates for a decision. One-tap
rollback. No auto-merge.

## 8. Design language

Palette derived from emission spectra, not picked. Five pillars are real
spectral lines, always in wavelength order:

| Pillar | Line | nm | Colour |
| --- | --- | --- | --- |
| Cyber | Hg | 435.8 | `#A97BFF` |
| Materials | H-beta | 486.1 | `#5B8CFF` |
| Quantum | O III | 500.7 | `#3DE0C0` |
| AI | Na D | 589.0 | `#FFB020` |
| Energy | H-alpha | 656.3 | `#FF5A47` |

Ground `#070B14` — an observing site at night, not a void.
Type: Archivo (display), Newsreader (body), IBM Plex Mono (data/labels).

**Signature element:** the spectral index — those lines on a continuum, acting
as filter in the document view and legend on the board.

## 9. Architecture that survives

Everything structural from Phase 0 carries over:

- Content never stores coordinates — abstract spatial properties only
- Worlds are mappings; the readiness board becomes the primary world
- Orbital and Landscape stay as alternate mappings over the **article**
  collection, which is what they always suited
- Three CI gates: schema, performance budget, agent write scope
- Document renderer protected from agents

## 10. Open questions

1. Can a defensible readiness census be populated for quantum/PQC from Q-Day?
   Target: 40–60 items, fully sourced.
3. Does the laptop layout feel like an instrument, or a stretched phone?
4. Commercial tier — deferred, but access and licence fields tagged from day one.
5. Ofgem outside-interest position, before any paid tier is built.

## 10a. Storyboard beats (laptop)

Six panels, agreed as the narrative for UI generation:

1. Arrival — default workspace, rising clusters draw the eye
2. Cluster expanded — semantic zoom resolves a count into labelled items
3. Item detail — evidence, source, confidence, last verified
4. Windows rearranged — drag, resize, dock to edge as collapsed tab
5. Toolbar moved and options open — save/load workspace
6. Agent activity — new items arriving, confidence decay visible

## 11. Status

- Phase 0 shipped: v0.2.1 live at stuartokin.github.io
- Read view: good, keep
- Orbital / Landscape: architecturally sound, conceptually parked
- Next: draw the UI together → then architecture → then data gathering
