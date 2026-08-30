# Quantum Observatory

How close quantum computing, sensing, communications and post-quantum
cryptography are to being real — with every claim carrying its source, its
date, and whether anyone has actually checked it.

Written in a personal capacity by Stuart Okin.

---

## What it is

Two surfaces over one body of content.

**Frontier** — a galaxy of items, each graded by how close it is to being real
(`emerging` → `mainstream`) and by the strength of its evidence (`E0` → `E5`).
Windows over a canvas: move them, resize them, put them away. Zoom drives three
levels of detail and nothing is ever hidden — a demoted item becomes a small dim
dot and stays clickable.

**Q-Day** — seven sections on the cryptographic question specifically. What a
machine capable of breaking RSA-2048 still needs, where demonstrated capability
sits against the falling requirement floor, every regulator's migration deadline
against a derived Q-Day band, and the Mosca test.

## The rules that make it worth reading

**Nothing on the board asserts what it cannot source.** Every item names its
evidence, and the interface shows the level rather than hiding it in a footnote.

**`unknown` is a published answer.** Four of the twelve standing questions
currently read that way. A board that only shows the questions it can answer is
telling you about itself, not about the field.

**Agent work is visibly agent work.** Six agents research, source, verify and
report; everything they publish is marked `agent-merged` or `agent-reviewed`
until a human reads it. No agent may ever write `state: reviewed` or
`by: human` — CI fails the pull request if one tries.

**Derived figures show their working.** The Q-Day estimate is computed from
board content at load time, not typed into a file. Where the board cannot
compute something honestly it says so — the capability trend currently refuses
to draw a line because no three measurements yet share a qualifier.

**Corrections are part of the record.** When the board gets something wrong it
says what it said before, what it says now, and what changed its mind.

## Layout

```
content/
  schema/*.schema.json    the contracts — one per collection, and the authority
                          on every field limit
  frontier/               the items: what is being tracked, graded
  news/                   dated events, never revised, optionally carrying
                          structured measurements
  questions/              the twelve standing questions and their current state
  milestones/             regulatory deadlines, each with the document that set it
  assessment/             the Mosca questionnaires and maturity levels
  forecasts/              expert elicitation feeding the Q-Day derivation
  items/                  other published projects, linked from the board
  site.json               title, tagline, byline, disclaimer

src/
  content/                loaders and types. Content is fetched at runtime, not
                          bundled — see plugins/contentJson.ts
  renderers/board/        the Frontier surface
  qday/                   the Q-Day surface, its seven tabs and its derivation
  components/             the shared shell: header, dock, menu, windows

agents/
  <name>/agent.json       schedule, model, write scope, budget
  <name>/prompt.md        the brief
  _decisions.md           every question already answered — read before escalating
  _queue.md               focus instructions waiting to run
  _sources.md             the source register, in tier order

scripts/                  the gates, the agent runner, the derivation checks
```

## The gates

`npm run build` runs all of them, and a failure blocks a deploy:

| Gate | What it refuses |
| --- | --- |
| `check:order` | scripts that depend on each other running out of order |
| `check:exports` | one symbol exported from two modules |
| `check:state` | invalid review state on any record |
| `validate` | any record that does not satisfy its schema |
| `validate:news` | a measurement without the fields that make it comparable |
| `validate:questions` | a thirteenth standing question |
| `provenance` | an agent claiming human review |
| `derive` | a Q-Day derivation that no longer reproduces |
| `budget` | a payload over its gzipped limit, per bucket |

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # every gate, then the production build
npm run test:agent
```

You do not need any of this to change content — the markdown files are editable
in GitHub's web editor, and Actions builds and deploys on push.

## Agents

```bash
npm run agent -- scout      # research and propose
npm run agent -- sourcer    # attach better sources to what exists
npm run agent -- verifier   # check that claims still hold
npm run agent -- newsroom   # the dated record
npm run agent -- reviewer   # check existing entries
npm run steward             # read the issues, write the queue
```

Each writes only inside its declared `write_scope`, enforced by the runner. A
run that produces nothing valid returns its queue entry rather than spending it.

## Deployment

GitHub Actions builds and publishes to GitHub Pages on every push to `main`,
and after any agent or review workflow completes successfully.

---

Views expressed here are my own and do not represent the position of Ofgem or
any organisation I advise.
