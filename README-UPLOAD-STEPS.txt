Horizon Q — patch mode for sourcer/verifier/reviewer
Upload via GitHub's web UI ("Add file > Upload files")

These files REPLACE the existing files at the same path — GitHub's upload
page recognises the matching filename in that folder as an update, not a
duplicate, as long as you're in the right folder when you drop it.

Do these as ONE set of uploads if you can (GitHub lets you drag a whole
folder's worth of files into the dropzone and commit them together), or as
four separate visits if it's easier to keep track of:

1. REPO ROOT
   Navigate to the repo's root page (where you see HANDOVER.md etc. listed).
   Add file > Upload files > drag in:
     HANDOVER.md
     DESIGN-LOG.md

2. agents/sourcer/
   Navigate into that folder.
   Add file > Upload files > drag in:
     agent.json
     prompt.md

3. agents/verifier/
   Same, with the two files from the agents/verifier folder in the zip.

4. agents/reviewer/
   Same, with the two files from the agents/reviewer folder in the zip.

5. scripts/
   Navigate into that folder.
   Add file > Upload files > drag in:
     agent-io.mjs
     run-agent.mjs
     test-agent-io.mjs

After each folder's upload, GitHub shows a commit box at the bottom of the
page — write a short message (or use the suggested one) and commit directly
to main, or "Create a new branch and start a pull request" if you'd rather
review the diff first before it goes live. Since this is a scripts/config
change rather than agent-authored board content, it doesn't need to go
through the agent PR/merge workflow described in OPERATING.md — treat it
like any other manual maintenance commit.

VERIFY AFTERWARDS (I ran all of these clean before delivery; worth
re-running once uploaded, e.g. via Actions or a local clone, since the web
upload UI doesn't run your npm scripts for you):

  npm install
  npm run test:agent                                    # 44 checks
  npm run validate && npm run validate:news && npm run validate:questions
  npm run check:order && npm run check:exports && npm run check:state
  npm run provenance
  npx tsc --noEmit

WHAT CHANGED, BRIEFLY
  sourcer/verifier/reviewer now send a "fields" patch (dotted paths to just
  the values they're changing) instead of a whole file, so a single
  overflowing field only costs that patch, not the item's entire state.
  applyFields() in agent-io.mjs applies the patch and re-serialises only the
  touched YAML blocks, so a one-field change stays a one-block diff. Full
  writeup, including two bugs I found and fixed along the way, is in the
  HANDOVER.md and DESIGN-LOG.md updates themselves.

THREE THINGS FLAGGED, NOT DECIDED HERE (also in HANDOVER.md)
  1. verifier still sets review.state: agent-merged rather than
     agent-reviewed — predates this change, wasn't part of the ask, flagged
     rather than silently fixed.
  2. budget.proposals in the three agent.json files wasn't retuned for the
     smaller size of a patch response — probably conservative now.
  3. This session never got push access even after GitHub App
     authorization, which is why you're doing this by hand.
