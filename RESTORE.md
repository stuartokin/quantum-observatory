# Undoing the bulk confirmation

Two runs of the old Review workflow marked all 41 agent-written items as
`reviewed / by: human`. Nobody read them, so the board is currently asserting
something untrue. This puts it back.

## Do this

Actions → **Confirm or veto** → Run workflow

| Field | Value |
| --- | --- |
| What to do | `restore` |
| Item ids | `ALL` |
| Note | `restored after an accidental bulk confirmation` |

It sets `review.state` back to `agent-merged` for every item carrying an
`agentMergedOn` date — which is exactly the ones an agent wrote. Anything you
genuinely reviewed yourself has no such date and is left alone.

Afterwards the header should read **41 unreviewed** again.

## What changed so this cannot recur

**The workflow is renamed.** It was "Review", which is also what the reviewer
agent does, and nothing distinguished them. It is now **Confirm or veto** —
your decision. The agent is `reviewer`, under Actions → Agents.

**Bulk needs the word.** Leaving the ids field blank used to mean "everything",
so a destructive action with no undo was one click away by default. You now type
`ALL`, deliberately. Blank is refused with an explanation.

**Veto is never bulk.** It requires explicit ids and always did.

**Restore exists at all**, which it did not. A commit straight to `main` has no
Revert button, so there was no recovery path from a mistaken bulk confirmation
short of editing 41 files by hand.
