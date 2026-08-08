# Turning the agents on

Phase A: Scout and Verifier. Both ship **disabled**. Nothing runs until you
follow the steps below and set `enabled: true`.

## What an agent is here

A scheduled GitHub Action. It wakes, sends `prompt.md` plus the current board to
the Claude API, gets files back, checks them, **merges and publishes them**, and
logs the run in a weekly review issue.

No server, no always-on process. A cron job with a language model in it.

## Publish first, veto after

Agent output goes live without waiting for you. That is deliberate — with five
galaxies, review-before-merge is about three hours a week, and a queue you stop
reading is worse than no agents.

What makes it safe:

- **Every item says whether a human has read it.** An agent writes
  `agent-merged` and *cannot* write `reviewed`. CI fails the run if it tries
- The board displays it: *"Agent-merged 12 Aug — not yet reviewed"*
- **Veto is one click** — GitHub's Revert button on the merge commit. Runs are
  squashed so one revert undoes the whole run
- Downgrades merge as freely as upgrades. An agent making the board *less*
  confident cannot embarrass you

**Three things still never auto-merge:** anything naming Ofgem, a live
consultation or a regulatory position; deletion of a published item; and any
edit to a locked field. The first is a professional risk rather than a technical
one, and no provenance label fixes it.

## Reviewing, weekly

An issue titled *"Review queue — week of ..."* collects every run. For each:

- **Confirm** — set `review.state: reviewed` with today's date
- **Veto** — Revert on the linked pull request
- **Ignore** — it stays labelled unreviewed on the board, indefinitely, and
  says so

Ignoring is legitimate. It is not debt, because the item is already telling
readers it has not been checked.

## 1. Get an API key

console.anthropic.com → API keys → create one. Copy it; it is shown once.

## 2. Store it as a secret

Repo → Settings → Secrets and variables → Actions → **New repository secret**

- Name: `ANTHROPIC_API_KEY`
- Value: the key

Never in the repo. The workflow reads it from here.

## 3. Test one run by hand before scheduling anything

Actions → **Agents** → Run workflow → type `scout` in the agent box → Run.

It will do nothing, because Scout is disabled. That is the point: it proves the
plumbing without spending anything.

## 4. Enable Sourcer first

Edit `agents/sourcer/agent.json`, set `"enabled": true`, commit.

Actions → Agents → Run workflow → type `sourcer` → Run.

It will pick up to twelve unsourced items, research them properly, and merge
what it can evidence. Expect it to report several it **could not** source —
that is the point, and those reports are as useful as the successes.

**Read that first pull request carefully.** It tells you whether the prompt is
right, and prompts are much easier to fix before a queue builds up.

## 5. Watch the first merge land

Check the site. The new item should carry a visible
*"Agent-merged — not yet reviewed"* label. If it does not, something is wrong
with the renderer and you should disable the agent until it is fixed — that
label is the entire safeguard.

## 6. Leave Verifier off for at least a fortnight

Get comfortable reviewing Scout first. Two agents producing PRs before you have
a review rhythm is how the queue becomes wallpaper.

## Cost

A weekly Scout run with 25 searches is roughly 20–40p. Verifier runs monthly
with 30 searches. Call it £2–3 a month for both.

Set a spend limit in the Anthropic console anyway.

## The three agents

| Agent | Runs | Job |
| --- | --- | --- |
| **Sourcer** | **by hand** | Attach primary sources to items that have none. Depth |
| **Scout** | weekly | Find new developments. Breadth |
| **Verifier** | every 4 weeks | Re-check sources, decay evidence, hunt replication |

`everyWeeks: 0` means never scheduled. The workflow fires weekly and each agent
decides whether it is due.

## Start with Sourcer, not Scout

43 of the 56 quantum items have no evidence at all. Until that clears, the board
is mostly a list of topics rather than a map of readiness — and Scout adding
more unsourced topics to an already unsourced board makes it worse, not better.

Sourcer is a **campaign**: enable it, run it by hand four or five times over a
couple of weeks, watch the E1 count fall, then turn it off. Bigger budget than
the others — 60 searches, 12 items — because it is doing deliberate research
rather than scanning.

Then Scout weekly, and its job is what it is actually good at: noticing change
rather than backfilling.

## Cost

A weekly Scout run at 25 searches is roughly 20–40p. Verifier monthly at 30.
A Sourcer campaign at 60 searches a run, five runs, is a few pounds in total.

Call it £2–3 a month steady state, plus a one-off for the campaign. Set a spend
limit in the Anthropic console anyway.

## What they cannot do

Agents write only into `content/frontier/_inbox/`; the workflow promotes those
files onto the board after the checks pass.

- They cannot touch the renderer, the schema, the scripts or the workflows
- They cannot alter their own configuration
- They cannot delete a published item
- They cannot claim human review
- They cannot mention Ofgem, a consultation or a regulatory position

Four independent checks run before anything merges: schema validation,
provenance, escalation terms, and write scope. Any one failing stops the run.

Worst case: something wrong publishes, labelled as unreviewed, and you revert
it in one click.

## Reviewing

The PR description carries the summary, the twelve-question checklist, and what
the agent considered and rejected. **The rejections are often the most useful
part** — they tell you what it looked at and why it said no.

To accept a proposal, move the file from `content/frontier/_inbox/` up into
`content/frontier/` and delete it from the inbox. Set `status: published` once
you are satisfied with the sourcing.

## If you stop reading the PRs

Reduce the cadence. A reviewer who stops reading is the real failure mode, not
a bad proposal — and the fix is fewer runs, not more filtering.
