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
