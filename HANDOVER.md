# Handover

For picking this up in a new conversation. The repo carries the design; this
carries what a session learned that has not yet been written into the design.

Read alongside `OPERATING.md`, `AGENT-PLAN.md`, `DESIGN-LOG.md` and
`agents/_decisions.md`. Those are the record. This is the part that would
otherwise be lost when a conversation ends.

---

## Where the project stands

**Version 0.48.8.** Board at roughly 80 frontier items across nine
constellations, ~90 headlines, twelve standing questions, five agents plus a
steward, and a queue.

**Live at** stuartokin.github.io, deployed from `main` via GitHub Pages.

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

## The known next task — done, not yet merged

**Let an agent return a patch rather than a whole file.** Built in a later
session (patch not yet applied to `main` — see below for why). `agent-io.mjs`
gained `applyFields(existingRaw, fields)`: `fields` is a flat object of dotted
paths (`evidence.claim`, `review.note`, `qdayImpact`) to new values, applied to
the item as it stands on `content/frontier/<id>.md` — never the inbox, which
holds only this run's unmerged proposals. `null` deletes a field. The special
key `body` replaces the markdown below the front matter. `evidence.sources`
still replaces the whole array — no per-element merge verb, as expected.

`run-agent.mjs` reads the live file, applies the patch, and runs it through the
same `checkFile` a whole file always went through — so an overflowing field is
rejected exactly as before, except now only the fields in that one patch are
at risk, not everything else about the item. `sourcer`, `verifier` and
`reviewer` are marked `"writeMode": "patch"` in their `agent.json` and may no
longer send `content` at all; `scout` and `newsroom` are untouched and still
create whole files, since a file that doesn't exist yet has nothing to patch.

**One real bug found and fixed on the way, worth knowing if this is touched
again:** the first version of `applyFields` re-serialised the *whole* document
through `js-yaml.dump()` after every patch. That's correct — js-yaml never
mis-quotes a colon or an apostrophe the way hand-written YAML can — but it also
reformats every field's quoting for the whole file, because js-yaml decides
quoting style for the object as a whole, not per field. A patch touching one
line in `review.note` produced a diff touching the title, the summary, every
metric and every source. The fix, now in place: only the *top-level* YAML
blocks named in the patch are re-serialised and spliced back into the original
text; everything else survives byte for byte. Tested against a real board item
— see the `applyFields` tests added to `scripts/test-agent-io.mjs`.

**A second, unrelated bug turned up in `check-order.mjs` while building this**
— recorded in `DESIGN-LOG.md` since it's a gotcha for anyone editing
`run-agent.mjs`'s context-building code, not specific to patches.

**Not yet resolved, worth a look before merging:**

- `verifier`'s prompt was left setting `review.state: agent-merged` on every
  patch, matching what it already said before this change — but the schema's
  own description of `agent-merged` is "published by an agent, unchecked",
  and verifier's whole job is *checking*. That reads like it should be
  `agent-reviewed`, matching what `reviewer` sets. Not changed here since it
  wasn't part of the ask and predates this session — flagging rather than
  quietly fixing it, per the standing rule on decisions.
- Budgets (`budget.proposals` in each `agent.json`) were sized for whole-file
  output economics and left untouched. A patch is far smaller than a full
  item, so these are probably now conservative rather than tight — worth
  revisiting once a run or two shows the real size of a patch response.
- This session had no push access to this repo (the environment's git proxy
  declined it), so the change is a patch file, not a merged commit. Someone
  needs to `git apply` it, run the checks listed in the delivery README, and
  push.

## What a new conversation needs to be given

Not much, if these are read:

1. `OPERATING.md` — the loop, what a person decides, how to write a queue entry
2. `agents/_decisions.md` — every settled question, so none is reopened
3. `DESIGN-LOG.md` — the interface decisions and the failures behind them
4. This file
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
