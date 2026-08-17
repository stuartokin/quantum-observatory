# Operating

How the board runs, and what it needs from a person. Target: ten minutes a week,
plus whatever a decision deserves.

---

## The loop

**Monday, 06:00 UTC.** The Agents workflow fires. Every agent with
`enabled: true` and a due `everyWeeks` count runs: first one queued instruction,
then its standing work. Each opens a pull request, merges it, and comments on
the week's review-queue issue.

**You read the issue.** Ten minutes. Most of it is a record; what matters is the
**Needs you** section and anything under **Worth Scout's attention**.

**You run the steward.** Actions → Steward → Run workflow. It reads the open
issues, applies settled precedent, and writes focus instructions into
`agents/_queue.md`.

**You read the queue** and delete anything you disagree with.

**The agents drain it** — one instruction each on the next scheduled pass, or
sooner via Actions → Agents with a `passes` count.

### Why the steward is not automatic

It fires on issue activity, but the agents open their issues with the default
`GITHUB_TOKEN`, and GitHub does not trigger workflows from events raised by that
token. So the steward has only ever run by hand.

**That is left alone deliberately.** The steward decides what the other agents
do next. Automating its trigger closes the loop and the board starts setting its
own agenda between Mondays. Every item currently traces back to a person
choosing to ask for it, and that is worth more than the thirty seconds it costs.

Revisit if you find yourself running it reflexively without reading what
triggered it — at that point the human step has become ceremonial. The honest
test is whether you have ever declined to run it, or edited the queue
afterwards.

---

## The queue

`agents/_queue.md`. Focus instructions waiting to run. **Nothing in it has run
yet** — that gap is the design, not a formality.

- One instruction per run. Several drained into one pass would be several runs'
  work in one summary, and the summary is how anybody judges whether the work
  was good.
- An entry that fails twice is dropped, and the run says so.
- An entry older than 21 days is dropped rather than run. Three weeks
  unexecuted usually means overtaken.
- The steward queues at most six per pass. A queue that grows faster than it
  drains stops being read, and an unread queue is worse than none because it
  looks like a plan.

### Write instructions the agent can actually carry out

Getting this wrong wastes a run, because a good agent refuses rather than
guessing.

| The job | The agent |
| --- | --- |
| Add a topic not on the board | scout |
| Attach or correct a source on an existing item | sourcer |
| Re-check a claim against its sources | verifier or reviewer |
| Gather or backfill headlines | newsroom |
| Answer the twelve standing questions | scout |

**Scout sees the board index, not item contents.** It cannot edit an existing
item — asked to attach a source it will confirm the source, decline to invent a
file it cannot read, and escalate. Six runs were spent that way on one
instruction.

**Write scope is narrower than it looks.** Scout writes to
`content/frontier/_inbox/` and `content/questions/`, and nothing else. An
instruction to "add a news item" is impossible for it: `content/news/` belongs
to the newsroom.

### Name the thing, and say when to stop

An instruction that identifies its target by description rather than by
identifier will absorb the whole search budget. One run spent eleven searches
trying to distinguish two papers on the same journal page, reached the right
conclusion — that it could not be sourced — and ran out before it could say so.

Give a DOI or an arXiv id where you have one. Where you do not, cap the effort:
*"stop after five searches and report what you have."*

---

## What a person decides

Agents may correct downward on their own judgement and never upward. Anything in
this list reaches you:

- **Raising an evidence level or readiness.** Always.
- **Publishing a draft item.** `status: draft` to `published`.
- **Whether an item belongs at all**, when an agent is unsure.
- **A new precedent.** The steward proposes; you promote or delete.

### Promote or delete proposed rules

The steward adds rules to the bottom of `agents/_decisions.md` when it applies
existing precedent to a new case. **Read them and move them up, or delete them.**

A rule left in the proposed section is one the steward may propose again — it is
not where an agent looks for a settled answer. Two rules were proposed twice
before anyone noticed.

---

## When something fails

**A file discarded on a character limit.** Every capped field is validated
before writing and an agent must return the whole file, so one overflow discards
everything — including the parts that were right. The runner now lists items
with under 150 characters of headroom, and the agent is told to replace rather
than append. If a file is discarded anyway, the item is probably full: trim
`plain` and `qdayReasoning` into the body, or make the edit by hand.

**A run that produced no JSON.** The tail of its reasoning and any identifiers
it mentioned are written to the issue. That is not a report the agent chose to
give, but the reasoning is usually the useful part — and it tells you whether
the job is answerable as written before you requeue it.

**A run that changed nothing.** Not a failure. A run that searched properly and
found nothing has still done the looking, and the summary is the output.

---

## Reading the header

- **`n of n sourced`** — items with a primary source attached.
- **`unreviewed (n checked)`** — `checked` means an agent compared the claim
  against its sources. It still counts as unreviewed, because a machine reading
  is not review.
- **`reviewed`** — a person read it.

If `unreviewed` climbs week on week, scout is adding faster than the reviewer
checks. The answer is `everyWeeks: 2` on scout, not disabling it. A board
growing faster than it can be checked is a board getting less trustworthy, and
that figure is the honest signal.

---

## Housekeeping worth doing occasionally

**Check `agents/` for folders nobody remembers making.** Agent discovery reads
every directory containing an `agent.json`. A forgotten one with
`enabled: true` fires on Monday morning without anyone deciding it should. A
folder is a decision, and a folder nobody remembers making is a decision nobody
made.

**Run the steward before closing issues, not after.** It reads open issues. A
closed thread is one it cannot see, and the leads in it go down with it.
