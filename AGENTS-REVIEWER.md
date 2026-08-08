# The reviewer agent

Added 8 Aug 2026, to cut how much of the review queue actually needs you.

## What it does

Once a week it reads everything published since the last run, opens the sources,
and checks:

- does the source support the claim, or has the claim been stretched
- does the source *type* support the evidence level (a review article rated E4
  is the error this exists for)
- is the readiness defensible now that evidence exists
- does a non-zero Q-Day score survive reading
- the nine errors that would discredit the board — physical qubits as logical,
  roadmaps as results, QKD as PQC, and so on
- duplicates and contradictions

## The rule that makes it safe

**It may correct downward on its own judgement. It may never correct upward.**

Lower an evidence level, weaken a claim, move a readiness down, reduce a Q-Day
score — it does that and records why. Anything that would make the board *more*
confident is escalated instead, never done.

A reviewer that can only make the board more cautious cannot embarrass you. One
that can make it more confident is just another author.

## What it cannot do

It cannot mark anything `reviewed`. That state means a person read it, and CI
fails the run if an agent writes it. Its own state is **`agent-reviewed`**,
which displays as *"Agent-checked — not read by a person"* and still counts
toward the unreviewed figure in the header.

That distinction is the point. This is a second pass by the same kind of system
that wrote the entry — worth having, and not independent review.

## What reaches you

At most two or three items a run, each in two sentences: what is wrong and what
decision is needed. It escalates only:

1. A claim its source does not support, where the fix is not obvious
2. Anything that would raise a level, readiness or Q-Day score
3. Any E5 promotion — the strongest statement the board makes
4. A P0 or P1 where significance itself is the question
5. Ofgem, consultations, licence conditions, regulatory positions
6. Two items that should be one, or a direct contradiction

Everything else it fixes and logs. "Twelve checked, four corrected, nothing
needs you" is a good week.

## Running it

Enable it *after* Sourcer's campaign finishes, not during — it is there to
check settled output, not to chase a moving target.

```
agents/reviewer/agent.json  →  "enabled": true
```

Then Actions → Agents → Run workflow → `reviewer`.

## The honest limitation

An agent reviewing agent output is not independent. It shares the training, the
blind spots and the tendency to find a plausible reading rather than the correct
one. It will catch category errors and arithmetic reliably. It will be worse
than you at judging whether something *matters*.

Which is why significance questions escalate and confidence increases escalate —
those are the two places its judgement is least trustworthy, and yours is the
whole point.
