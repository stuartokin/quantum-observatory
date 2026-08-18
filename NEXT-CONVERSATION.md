# Opening prompt for the next conversation

Paste this as the first message. Attach nothing with it — the files are named
below and can follow once the reading is done.

---

Continuing the Horizon Q project: a quantum-frontier readiness board at
stuartokin.github.io, built as React and TypeScript on GitHub Pages, with five
research agents and a steward writing content into the repo. Currently at
version 0.48.8.

Before anything else, read these four files, which I will attach:

- `HANDOVER.md` — where the project stands and what has recently gone wrong
- `OPERATING.md` — how the loop runs and what a person decides
- `DESIGN-LOG.md` — interface decisions and the failures behind them
- `agents/_decisions.md` — every settled question, so none is reopened

Three things about how we work, learned the hard way in the previous
conversation:

**Do not edit a file you have not read in this conversation.** Roughly half a
dozen edits silently did nothing because an anchor string did not match, and
each time the check afterwards confirmed the file still parsed rather than that
the change had landed. If I ask you to change something you have not seen, ask
for it.

**Verify by reading back what the file now says.** Not that a name appears, not
that the syntax is valid — that the change is there and connected to something.
The recurring failure has been correct code in a place nothing calls.

**When something is invisible on screen, ask for the view that shows what is
behind it.** Three wrong diagnoses of one layering bug came from reasoning about
a description; one screenshot with the obscuring window shrunk solved it in
seconds.

---

## The first task

Let an agent return a patch rather than a whole file.

Every capped field is validated before writing, and an agent must return the
file entire — so a single overflow discards everything, including the parts that
were right. Five runs have been lost to this across four items, on four
different fields, each time after the research was already done. The current
mitigation is a pre-flight warning listing items with under 150 characters of
headroom; it reduces the frequency and cannot remove the failure mode.

The change is in `scripts/run-agent.mjs` and `scripts/agent-io.mjs`: accept a
`fields` object alongside or instead of `content`, apply it to the existing file
on disk, and validate the result. `checkFile` already takes a schema path, so
validation itself does not change. The agent prompts would then ask for
something smaller and more honest — *send the fields you are changing* — which
is also easier to review.

Points worth deciding rather than assuming:

- Whether `fields` replaces `content` or sits alongside it. Scout writes new
  files and genuinely needs `content`; the sourcer, verifier and reviewer edit
  existing ones and should not.
- What happens to a patch naming a field that does not exist, or an id that is
  not on the board — both should be rejected before writing, as now.
- Whether appending to a list field (`evidence.sources`) needs its own verb, or
  whether sending the whole list back is good enough. Probably the latter: one
  source list is small, and a merge protocol is a second thing to get wrong.

I will attach `run-agent.mjs` and `agent-io.mjs` when you have read the four
documents above.
