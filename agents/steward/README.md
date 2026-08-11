# The steward

Runs when an issue moves. The other agents produce the queue; this one works it
down so a person only sees what needs judgement.

## Turning it on

```
agents/steward/agent.json  →  "enabled": true
```

Then **Actions → Steward → Run workflow**, to try it by hand before letting it
trigger itself.

**Not Actions → Agents.** The steward has its own runner — it reads issues and
writes precedents, neither of which the generic runner knows anything about.
Running it there used to produce a TypeError; it now refuses and says where to
go instead, and the Agents workflow no longer offers it at all.

After that it fires on issues opened or reopened, and on new comments — but
**not on its own**, and not on the other agents'. Without that guard an agent
comment triggers a steward comment triggers another run, and it never settles.

## What it can do without asking

- Anything `agents/_decisions.md` already covers
- Mechanical fixes: re-citing a vendor page to a preprint, an evidence level
  that contradicts its source type, a claim that outruns its source
- **Any downward correction**, on any item, including one you have reviewed

## What always reaches you

Three items maximum, each in two sentences:

- Anything that would **raise** a claim, level, readiness or Q-Day score
- Any E5 promotion
- Anything needing a policy that does not exist yet
- Anything naming Ofgem, a consultation, a licence condition, an enforcement
  action, a regulatory position or a select committee
- Anything where it thinks an existing precedent is wrong

## Precedents

The steward can **add** to `agents/_decisions.md` and never alter or remove.
Its entries land under a dated heading marked *proposed by the steward … not yet
confirmed by a person*.

Read them when convenient. Promote the good ones into the sections above; delete
the wrong ones. Either way they are visible in a commit rather than silently
governing the next run.

**This is the part that compounds.** Every precedent is a question that will not
be asked again, and the weekly burden should fall over time rather than staying
flat. If the file stops growing while escalations continue, something is wrong.

## Bounds

Three issues per run, eight files, five precedents, twenty searches. It closes
an issue only when nothing remains for you, and never one it has also raised
something on.

## The honest limitation

It is an agent applying rules written by agents and confirmed by you. It will be
reliable on category errors and precedent application, and worse than you at
judging whether something matters — which is why every upward correction and
every significance question still escalates.

If it starts closing issues you would have wanted to see, reduce its scope
rather than trusting it further. The failure mode to watch for is not a bad edit
but a quiet one.
