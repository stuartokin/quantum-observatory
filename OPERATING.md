# Running this weekly

You should not be copying issue text into a chat window to get an answer. That
worked while the thing was being built and is the wrong shape for operating it.

---

## The problem

Every escalation you answered created a rule that nothing wrote down, so the
next equivalent case escalated again — and you were the memory between them.
Meanwhile the assistant helping you decide could not see the repository, so you
became the transport layer as well.

Three fixes, in order of how much they take off your desk.

---

## 1. Precedents, not conversations

`agents/_decisions.md` holds every question already settled. Vendor documents
are E2 whatever their legal status. Reviews cap at E3. Downward corrections need
no permission. Roadmaps never move Q-Day.

Every agent reads it before escalating. **A decision made once is never asked
again**, which is the difference between a system that learns and one that
merely runs.

When you answer a new escalation, add it here. Two lines. That is the whole
maintenance burden, and it compounds in your favour.

---

## 2. Fewer escalations by design

Downward corrections now apply to human-reviewed items too. That single
over-restriction cost a real escalation slot on `arch-trapped-ion` — an obvious
over-rating on a vendor SEC filing, sent to a person only because the item had
been reviewed once. The agent had already reached the right answer.

Between the precedents file and this, last week's run would have escalated
nothing.

---

## 3. Stop relaying

**Use Claude Code in the desktop app, or Cowork, pointed at this repository.**

Either can read the issues, open the files, make the edit and commit it. The
same conversation, without you carrying text between two windows that cannot
see each other.

A weekly session then looks like:

> Read the newest comment on the open review-queue issue. Apply anything covered
> by `agents/_decisions.md`. Tell me only what genuinely needs a decision.

And when you answer something new:

> Add that to `agents/_decisions.md` so it is not asked again.

---

## What the week should cost

**Ten minutes.** Open the issue, read one summary, answer nothing or answer one
thing, close it.

If it costs more than that for two weeks running, the fix is **cadence, not
effort** — run the agents fortnightly. A review rhythm you abandon is worse than
a slower one you keep, because the board carries on publishing either way.

---

## The one thing not to automate

Deciding what matters. The agents are reliable at category errors, arithmetic
and claims that outrun their sources. They are worse than you at significance —
which is why upward corrections and P0/P1 judgement calls escalate, and why the
Q-Day forecast carries an `agent-estimate` stamp no agent can remove.

That asymmetry is the design. Everything else here exists to protect the small
number of decisions that actually need you.

## The queue

The steward reads the open issues and writes focus instructions into
`agents/_queue.md`, then says in its issue comment what it queued. **Nothing it
queues runs in the same pass.**

That gap is the design. An agent that can enlarge its own workload will, and the
cheapest guard is a committed file somebody glances at — not a rule nobody
checks. Read the queue, delete what you disagree with, and the rest runs.

### What runs it

Every agent drains its own entries. On the **Monday 06:00 UTC** scheduled pass,
each takes **one** instruction before doing its normal work.

To clear it sooner: **Actions → Agents → Run workflow**, name the agent, and set
**passes** to how many instructions it should take. Each pass is a complete run
— its own validation, its own merge, its own issue comment.

There was briefly a separate Queue workflow. It ran the agent and then tried to
publish with a single `git add`, which is not what publishing is: the Agents
workflow validates, checks provenance and scope, merges from the inbox and
comments on the issue. A second copy of that pipeline would have drifted from
the first within a fortnight, so there is one, and it takes a passes count.

### Why one at a time

Four instructions drained into a single run would be four runs' work reported as
one summary, and the summary is how anybody judges whether the work was any
good.

### Ageing

An entry older than **21 days** is dropped rather than run, and the run says so.
An instruction that has sat unexecuted for three weeks has probably been
overtaken by something, and running it blind is worse than losing it.
