# The weekly session

How to clear the review queue without reading everything yourself.

---

## First time using Cowork

Cowork is a workspace where Claude does a task across several steps and tools,
rather than answering one message. It can read this repository, open files,
make edits and commit them — so you are not copying text between windows.

**Setup, once:**

1. Open Claude, choose **Cowork**
2. Settings → Connectors → **GitHub** — already connected if it shows a tick
3. Start a new Cowork session
4. Paste the prompt below

It will ask before doing anything that changes the repository. Say yes and it
proceeds; say no and it explains what it wanted to do.

**It has no memory between sessions.** Everything it needs is in this repo —
`agents/_decisions.md`, `AGENT-PLAN.md`, `DESIGN-LOG.md` — which is why those
files exist and why decisions get written back to them.

---

## The prompt

Paste this whole thing.

---

You are working in the GitHub repository `stuartokin/stuartokin.github.io`,
which holds Horizon Q — a quantum technology readiness board maintained by
research agents that publish without human review.

**Read these first, in this order:**

1. `agents/_decisions.md` — standing precedents. These are settled. Apply them.
2. `AGENT-PLAN.md` — the architecture and why it is shaped this way
3. `DESIGN-LOG.md` — design decisions and their reasoning

**Then work through every open issue in the repository.**

For each one, and for each agent summary within it:

**Resolve anything covered by an existing precedent.** If `agents/_decisions.md`
already answers it, apply the answer, make the edit, and record what you did.
Do not ask me about a question that has already been settled.

**Resolve anything mechanical.** A source that needs re-citing, an evidence
level that contradicts its source type, a claim that overstates what its source
says, a broken link, a field that disagrees with another field on the same item.

**Correct downward without asking.** Lower an evidence level, weaken a claim,
reduce a Q-Day score, move a readiness down. Any of these may be applied to any
item, including one a human has reviewed — a review means somebody read it once
with what was known then, not that the rating is permanently right.

**Never correct upward.** Raising a level, moving a readiness up, strengthening
a claim, promoting to E5 — these come to me.

**Flag to me only:**

- Anything that would raise a claim or a rating
- Anything where the right answer depends on a policy that does not yet exist
- Anything naming Ofgem, a live consultation, a licence condition, an
  enforcement action, a regulatory position or a select committee
- Anything where you think an existing precedent is wrong

**Write every decision you make back to `agents/_decisions.md`**, under the
right heading, in the established style: the rule, one line of reasoning, and
`*Decided <date>, after <what prompted it>.*`

This matters more than the edits. A decision that is applied but not recorded
gets asked again next week, and I become the memory. If you settle something
new, it goes in the file.

**Then:**

- Commit your changes with a message naming what you resolved
- Comment on each issue you worked, listing what you resolved and what you left
- Close any issue where nothing remains for me
- Leave open any issue with something outstanding, and say plainly what it is

**Finally, tell me in one message:**

- How many issues you closed and how many you left open
- What decisions you added to the precedents file
- What needs me, each in two sentences: what is wrong, and what I have to decide

Write that last part for someone with four minutes. Lead with the decision, not
the background. If nothing needs me, say so plainly — that is a good outcome,
not an empty one.

---

## What you should get back

Most weeks: a handful of corrections applied, one or two precedents added, and
either nothing for you or a single decision.

The precedents file growing is the important signal. Every entry is a question
that will not be asked again, and the burden should fall over time rather than
staying flat.

---

## Email

You do not need Cowork to send it. **GitHub already emails you** when anything
comments on an issue you are watching, and the agents comment on the weekly
review-queue issue every run.

Check Settings → Notifications on GitHub if they are not arriving. Watching the
repository gives you everything; participating-only gives you threads you have
commented on.

---

## The limitation worth knowing

Cowork does not run on a trigger. It is a session you open, not something
watching the repository, so "whenever an issue is raised" means "whenever you
next sit down".

If that becomes the friction, the answer is a fifth agent — a steward running as
a GitHub Action on issue activity, doing what this prompt describes without
being asked. Same rules, same precedents file, no session to remember to start.
