# Design log

Decisions and why they were made. Written for whoever opens this next — which
may be a person, may be an agent, and will not have been in the room.

`AGENT-PLAN.md` covers the agent architecture. `agents/_decisions.md` covers
editorial precedent. This covers the interface and the reasoning behind it,
including the parts that went wrong.

---

## The core commitments

**Content never stores coordinates.** Items carry readiness, constellation and
evidence; where a body appears is derived. A renderer is a mapping over content,
not a layout somebody saved.

**Every number on screen is a real count.** No sample data, no illustrative
figures, no "typically around". If a number cannot be counted it does not
appear.

**Nothing claims more than its evidence.** An unsourced topic is drawn hollow
and says so. A machine-checked entry says a machine checked it. The board is
allowed to be thin; it is not allowed to be misleading.

---

## Colour

**Hue carries the constellation and nothing else.** Nine hues across a narrow
arc, 205° to 335°, blue-violet through magenta, with lightness alternating
74/63% so neighbouring lanes differ in two dimensions rather than one.

Nine unrelated colours would turn a sky into a pie chart. The arc is wide enough
that adjacent constellations are plainly different and narrow enough that the
board still reads as one galaxy.

**Importance is carried by size and brightness, never hue.** Saturation is held
constant so no category shouts louder than another.

**Actor is carried by glyph shape.** It used to shift the hue by up to ±34°,
which was catastrophic: adjacent constellations sit 16° apart, so the actor tint
completely scrambled the category signal it was competing with. Removed, along
with `shiftHue` and `actorHash`. Shape was always the better channel.

---

## Things that were tried and removed

**Scrollbars on the canvas.** Built for both views and both axes, then deleted.
Panning by drag already worked; the bars added a second mechanism for the same
job and a class of hit-testing bugs for no gain. Zooming out now stops at a
fit-to-frame floor, so there is nothing off-screen to indicate.

**Automatic toolbar compaction.** Two attempts, both wrong in different ways —
one compared widths, which a wrapping toolbar defeats; the other measured its
own rendered height and oscillated between states, producing React error #185.

The rule learned: **when a measurement drives the thing it measures, the answer
is not a better threshold.** Compaction is now a threshold on the width the
reader sets with a corner grip. A value the reader controls cannot feed back
into itself.

**Canvas-drawn UI controls.** The timeline key toggle was drawn on the canvas
and twice could not be found on screen despite apparently correct coordinates.
Replaced with a DOM button. A control that cannot be inspected cannot be
debugged.

---

## Things that were hard to see and worth knowing

**Header layout is inline, not CSS.** The statistics vanished for three
versions. Every diagnosis was wrong until the tell was noticed: the Q-Day bar
had vanished too, so it was never a styling problem with the figures. A flex
item defaults to `min-width: auto`, so a long title refused to shrink and pushed
the entire right-hand side off the edge of the header.

The constraints now sit in inline styles, which beat every stylesheet rule
regardless of import order. Note also that `@import` is evaluated **before** the
rest of the importing file, so a rule in `workspace.css` loses to a bare rule in
`global.css` — the opposite of the obvious assumption.

**Rotation lives in a ref.** Calling `setCam()` inside the draw loop triggered a
state update sixty times a second, each cancelling and restarting the animation
frame. Drift accumulates in `spin.current` and is added at projection time; it
folds into real camera state only when the reader takes hold.

**Use `performance.now()` consistently.** Idle detection stored `Date.now()` and
compared it against a `performance.now()` timestamp, producing a difference of
about minus 1.7 trillion — so the easing term was permanently zero and nothing
ever turned.

**Labels are rationed by area, not by merit.** Threshold-based rationing failed
twice: most sourced items score above 0.7 on any blended importance measure, so
"only the important ones" meant nearly all of them. Both views now compute a
budget from their own dimensions and award labels most-important-first.

The timeline budget was briefly `(W × H) / 5000`, which on a normal frame is
over two hundred — a limit larger than the number of marks, and therefore no
limit at all. **Sanity-check a formula against a real frame size before
shipping it.**

---

## Content in the bundle

Content is bundled into JavaScript at build time, so the entry chunk grows with
every item an agent adds. Application code and content are measured separately,
or the app appears to bloat whenever an agent does its job.

**At roughly 200 items the answer is to fetch content as JSON at runtime, not to
raise the ceiling.** The budget gate says so when it fails.

Separately, about 30 KB gzipped of the app bundle is js-yaml, pulled in by
`front-matter` to parse content in the browser — every visitor downloads a YAML
parser to read files fixed at build time. Moving that into a Vite plugin would
cut roughly a third of the bundle. That is the next size win, not another
increase.

---

## Working practice, learned the hard way

**Editing code by text substitution introduces errors that are invisible until
compiled.** This session produced two duplicated JSX attributes, two
use-before-declaration errors, and a regex mangled into `/^---\\r?\\n/` — which
matches a literal backslash and therefore nothing, and rejected every file an
agent produced for a full version.

Countermeasures now in place: `scripts/test-agent-io.mjs` runs 28 checks in CI
before any agent does, and duplicate-attribute and brace-depth scans run before
packaging. Anything patched should be *run*, not inspected — shell quoting
returned contradictory answers about that regex twice.

**Repair of a structured format is useful and not free.** The YAML repair layer
has fixed three real problems — unquoted colons, backslash-escaped apostrophes,
unclosed front matter — and caused one, by quoting a valid block scalar `>-`
into a two-character string. Every case belongs in the self-test.

---

## Failures worth keeping, August 2026

Five days of work on the interface and the agent loop, and the useful record is
not the features but the ways they failed.

### A canvas gradient resolves against the transform at fill time

The nebula was invisible twice. The first version keyed each cloud to a
readiness band and then coloured it from the constellation list — five bands
indexing a nine-element array, so it drew arbitrary hues at an alpha low enough
to see nothing.

The second was subtler and worth remembering. The gradient was created at screen
coordinates `(cx, cy)`, and the fill then translated to that same point — so the
gradient's centre landed at `(2cx, 2cy)`, off screen, and every fill drew the
transparent end. **A canvas gradient is resolved against the matrix in force when
it is filled, not when it is made.** Create it inside the transform.

### Height computed from a position that has since changed

`intoView` clamped a frame's `y` into the viewport and then computed its height
from the *original* `y`. A window near the bottom got a height measured from
where it used to be, ran off the screen, and opened underneath whatever was
already there — which reads exactly like not opening at all.

Three wrong diagnoses preceded the right one, all reasoned from a description.
The fourth came from a screenshot with the obscuring window shrunk, and took
seconds. **When something is invisible, the useful information is what is behind
it.**

### Building the right thing in the wrong place

The honing state was declared in `Board` and used in `Sky`, a different
component. The filter panel worked; the label drawing and the click handler did
not. Before that, a year-window filter was computed and never passed to the
layout it was meant to change, and a `setShowNewsOverlay` existed with no button
to call it.

Each was correct code somewhere nobody could reach it. **After writing something
new, check that the old code path now calls it.**

### A budget that was never consistent with its ceiling

The reviewer's prompt said eight to twelve items a run. Each check returns a
whole file at around 6,300 characters, so twelve is roughly 75,000 before the
summary — against a ceiling that holds about that much in total. Twelve was the
exact edge; the run that attempted fourteen wrote nothing at all.

Two numbers had been set independently and never reconciled with the arithmetic.
The prompt now defers to the budget the runner injects, and the runner measures
the board's own average item size and warns when a budget cannot be met.

### Returning whole files makes every limit total

This is the one still outstanding. Every capped field is validated before
writing and an agent must return the file entire, so a single overflow discards
everything — including the parts that were right. Five runs have been lost to it
across four items, on four different fields, each time after the research was
already done.

The current mitigation is a pre-flight warning listing items with under 150
characters of headroom. **The structural answer is to let an agent return a patch
— the fields it means to change — so an overflow in one cannot discard the
rest.** Recorded here rather than built, because it is the right first task for a
session that can give it proper attention.

### Four gates now exist because of these

None of them is something TypeScript can see, and each was written after making
the mistake rather than before, which is the honest order but not the cheap one.

- **`check-order`** — a `const` used above its declaration. Cost three runs.
- **`check-exports`** — one symbol exported from two modules. `glyphFor` lived in
  both `tower.ts` and `glyphs.ts`; the board imported the wrong one, so two
  versions changed nothing on screen while the version number rose.
- **`check-state`** — a `setX()` with no `useState` behind it. A block inserted by
  a substitution that matched nothing leaves every reference orphaned, and a
  check that merely looks for the name finds it, in the uses.
- **JSX comment form** — `//` inside an opening tag parses as attributes.

### The one that produced all of them

**A text substitution that matches nothing does nothing, quietly.** Half a dozen
edits in one week silently no-opped because an anchor did not match — wrong
indentation, a ternary spread over three lines, a comment since reworded. Every
time, the check afterwards confirmed the wrong thing: that the file still parsed,
rather than that the change had landed.

Verify by reading back what the file now says.

---

## Open, and deliberately so

- **Non-English coverage is poor.** Chinese and Japanese programmes are on the
  source register and rarely reached. Stated on the site rather than implied
  away.
- **Patents are not searched.** No tooling.
- **The intersection view is unbuilt.** Cross-galaxy links are tagged but not
  displayed, and should not be designed until a second galaxy has real content —
  the interesting version is one body appearing in two galaxies at once, and
  that is not answerable with data on one side.
- **`horizonqltd.com` is not yet pointing here.** Everything runs on
  `stuartokin.github.io`.
