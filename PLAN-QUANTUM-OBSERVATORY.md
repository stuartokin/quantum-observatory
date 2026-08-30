# Quantum Observatory — the plan from here

Written 20 August 2026, replacing the cyber-and-beyond plan of the same date.
**Updated at 0.57.1**: Phases A and B are shipped, and what remains is marked.
Outstanding work not in a phase lives in `BACKLOG.md`.
That plan proposed absorbing two other repositories and moving to a private
site on `horizonqltd.com`. **All of it is withdrawn.**

The project is now one thing: **a quantum board, including Q-Day, published as
an ordinary public repository.** No cyber merge, no AI-vulnerability merge, no
private hosting, no company branding.

---

## 1. Nothing is lost, and the crypto stays

The board declares five galaxies — quantum, cyber, AI, materials, energy. Only
one has ever been populated:

| Galaxy | Frontier items |
| --- | --- |
| quantum | **92** |
| cyber | 1 |
| ai, materials, energy | **0** |

So removing them deletes *options that were never used*, not work.

**The single `cyber` item is mis-filed and is not cyber.** It is
`pqc-additional-signatures-r3` — NIST IR 8610, the nine additional post-quantum
signature candidates in round three. It already sits in the `pqc` constellation.
Two news items carry the same wrong pillar and are the same story: the NIST PIV
post-quantum dual-stack drafts, and HAWK's withdrawal after AI cryptanalysis
found a lattice weakness in sixty hours.

All three become `pillar: quantum`. **Three field edits. No record is deleted
and no text is rewritten.**

**The crypto areas are untouched and remain a backbone of the board.** They live
one level *below* the pillar, in the constellations, which this plan does not
change:

- **`pqc`** — 6 items: the standards, the candidates, the algorithm families
- **`migration`** — 8 items: crypto-agility, harvest-now-decrypt-later, the
  deployment work
- plus 15 `content/milestones/` records — NCSC, NIST, CNSA 2.0, the EU roadmap,
  EO 14412 — and the whole Q-Day surface, which is a cryptography surface end to
  end.

The thing being removed is a *top-level category that held one mislabelled
record*. Every claim about cryptography on this board survives it.

---

## 2. Naming

**The product is the Quantum Observatory.**

This resolves a clash rather than living with it. "Observatory" was attached to
the Q-Day surface while the board itself had a company name. Promoting
"Observatory" to the whole product and demoting Q-Day to a section inside it is
now simply accurate — Q-Day is *one part* of a board that also covers
architectures, error correction, enabling technology, sensing and
communications.

| Thing | Called |
| --- | --- |
| The product | **Quantum Observatory** |
| The galaxy view | **Frontier** — the map of how close things are to being real |
| The seven-section surface | **Q-Day** — no longer "Q-Day Observatory" |

The header becomes `Quantum Observatory · Frontier` and
`Quantum Observatory · Q-Day`, which the shared header built in 0.55.0 already
supports without change.

**"Horizon Q" and "Horizon Quantum Computing" are different things.**
`content/frontier/enable-compilers.md` names *Horizon Quantum Computing*, a real
company working on quantum compilers. A find-and-replace across the repository
would silently rename it. **The sweep must be manual, or at least reviewed
file by file.**

---

## 3. Sequence

The order below swaps the first two items from how they were listed, for one
reason: **branding and the Q-Day work touch the same files.** Settling the
identity first means the header, the site metadata and the release notes are
written once under the final name rather than twice.

### Phase A — De-brand and narrow — **DONE, 0.56.0**

1. **Identity.** `content/site.json` title and tagline; `index.html` title and
   description; the wordmark in the shared header; `README.md`; `package.json`
   name. The tagline currently reads "AI, quantum, materials, energy and cyber"
   and needs to become a quantum one.
2. **The agent briefs.** Scout opens "You research the quantum galaxy of the
   Horizon Q readiness board"; the verifier says "You keep the Horizon Q quantum
   board honest". Both need the new name, and scout's "quantum galaxy" phrasing
   should drop now that there is only one.
3. **Narrow the pillar enum to `quantum`** in all five schemas that declare it —
   frontier, news, questions, forecast, item. The content files keep the field;
   nothing else changes.
4. **Repillar the three records** named in section 1.
5. **Delete the galaxy picker** from the board header. A selector with one
   option is furniture that does nothing.
6. **Decide the schema `$id`s.** They currently read
   `https://horizonqltd.com/schema/frontier/v1`, a domain this project will not
   use. A `$id` never has to resolve, but a URL that will never exist is exactly
   the sort of quiet untruth this board exists to avoid. Change to the project's
   own published URL.
7. Run the gates. `check-order`, `check-exports`, `validate`, `provenance`,
   `derive`, `budget` all pass or the phase is not done.

**What it actually cost, and the two traps.** Three `pillar:` lines changed
value and no record was deleted. `content/items/` had to be exempted — it
describes other published projects and its domains are facts about them rather
than categories this board offers, so narrowing it made eight true records
invalid. And `enable-compilers.md` names *Horizon Quantum Computing*, a real
company, which a blind find-and-replace would have renamed.

An agent had already written `pillar: cyber` into a new item before the
narrowing landed, and the build refused it without saying what *was* allowed.
Validation messages now name the permitted values, how far over a length limit
a field is, and which unknown field was rejected.

### Phase B — Learn, rebuilt — **DONE, 0.57.0**

Unchanged from the previous plan, and still the only visible defect on a shipped
page. The current Learn tab is the twelve standing questions plus a glossary —
board state and a dictionary, neither of which teaches anything.

The prototype ran an **eight-step explainer with working demonstrations**: tap a
number to factor it, bounce a point around an elliptic curve, compare key sizes.
Rebuild as that sequence: *why you should care → RSA, the multiplication
trapdoor → ECC, billiards on a curve → managing today's keys → the quantum
problem → the replacements, FIPS 203/204/205 → who is steering → the practice
cycle that never ends.*

Two things this board can do that the prototype could not:

1. **Each step cites live items**, so the lesson improves when an agent improves
   the item — the same argument that made `BoardFigure` take an id rather than a
   string.
2. **Each step can say what is still unsettled**, drawing on the standing
   questions rather than reprinting them.

The twelve questions move out of Learn. They already have a window on the
Frontier view and belong there.

**Shipped as eight steps with two working demonstrations** — factor 3,233 by
hand, and bounce a point around an elliptic curve. Every step names the board
items its claims rest on and renders them live with evidence level and source.
Where a step touches something unsettled it shows the standing question and its
state rather than teaching past it.

**The third demonstration is deliberately absent.** A key-size comparison is the
obvious one for the FIPS step, and the board holds the standard numbers and
publication dates but not the byte counts. A sourcer job is queued; the demo
gets built when the board can cite it.

### Phase C — Threats and Readiness — **NEXT** *(the original Phases 4 and 5)*

The last two unbuilt sections, which finish the Q-Day integration. They were
always cryptography sections rather than general-cyber ones, so dropping the
cyber galaxy does not change them:

- **Threats** — vulnerabilities and attacks bearing on the migration.
  The imported material arrives **quarantined and marked unverified**, as
  decided at the start of the Q-Day work, and is promoted only as an agent
  verifies it against a source.
- **Readiness** — vendor and organisational post-quantum readiness, on the same
  terms. The scores exist elsewhere and carry citations that this board has not
  checked.

Both draw on the assessment content that already drives the Mosca test.

### Phase D — Rename the repository and republish — **LAST**

See section 4. **Last**, because every phase above is easier to verify while the
site is at a URL that already works.

---

## 4. Renaming the repository, step by step

**Read this before touching anything, because there is one consequence that is
easy to miss.**

### What changes, and why it breaks things

The repository is currently named `stuartokin.github.io`. That is a **GitHub
user site**: it is served at the domain root, `https://stuartokin.github.io/`.

Rename it and it becomes a **project site**, served from a subpath:
`https://stuartokin.github.io/quantum-observatory/`. Two consequences follow.

1. **Every asset 404s until Vite's `base` is set.** `vite.config.ts` has no
   `base`, so it defaults to `/`. The built HTML asks for `/assets/index-xxx.js`,
   which under a subpath is the wrong path.
   **Good news:** the content fetcher already builds its URLs from
   `import.meta.env.BASE_URL` (`src/content/store.ts`), so setting `base`
   correctly fixes the JSON fetches at the same time. This is a one-line change,
   not a migration.
2. **`https://stuartokin.github.io/` stops serving anything.** A user site
   exists only while a repository with that exact name exists. Worth creating a
   small landing repo under the old name afterwards, pointing at this project and
   anything else you publish.

### The steps

1. **Choose the repository name.** Lower case, hyphens: `quantum-observatory`.
   It becomes part of the public URL.
2. **Prepare the `base` change but do not push it yet.** In `vite.config.ts`,
   add `base: '/quantum-observatory/'` to the config object.
3. **Rename on GitHub.** Repository → **Settings** → **General** → the
   **Repository name** field at the top → type the new name → **Rename**.
4. **Push the `base` change immediately after.** Between the rename and this
   deploy, the site will load its HTML and fail to load its assets. That window
   is minutes, and is the only downtime in this.
5. **Check Pages settings.** Settings → **Pages**. The source should still read
   **GitHub Actions**. The URL shown will now include the subpath.
6. **Re-run the deploy.** Actions → **Deploy** → **Run workflow**. The existing
   workflow needs no edit; it publishes whatever the build produces.
7. **Verify at the new URL**, hard-refreshed: the Frontier view loads, the
   Q-Day sections load, the JSON in `content-data/` fetches, and a shared
   `#/q-day/plan` link resolves.
8. **Sweep for the old URL** in `README.md`, `content/site.json`, the schema
   `$id`s, and anywhere a document links to the live site.
9. **Recreate a user site**, optionally: a new repository named
   `stuartokin.github.io` containing a single page linking to this project.

### What GitHub does for you, and what it does not

- **Does:** redirects the old repository URL to the new one for the web
  interface and for `git` operations, so an existing clone keeps working. Issues,
  pull requests, stars, watchers, Actions history and workflow secrets all move
  with the repository.
- **Does not:** redirect the old **GitHub Pages** URL. The old address simply
  stops working — this is the reason step 9 exists.
- **Watch for:** the old name becoming claimable by someone else once you release
  it, which is a general GitHub caveat rather than a likely problem here.

If you have a local clone, point it at the new name:

```
git remote set-url origin https://github.com/stuartokin/quantum-observatory.git
```

Not needed for the browser upload workflow, but worth knowing if you ever clone.

---

## 5. What this plan deletes

For the avoidance of doubt, since "remove the Cyber Board" could be read much
more widely than it is meant:

| Removed | Kept |
| --- | --- |
| The `cyber`, `ai`, `materials` and `energy` pillar values | Every content record, all 92 items |
| The galaxy picker in the header | The constellation layer, including `pqc` and `migration` |
| "Horizon Q" as the product name | "Horizon Quantum Computing" where it names a real company |
| The horizonqltd.com schema identifiers | The schemas themselves, unchanged in substance |
| The cyber-merge and private-hosting plans | The Q-Day integration, finished in Phases B and C |

Nothing in `content/` is deleted by this plan. Three `pillar:` lines change
value.

---

## 6. Decisions taken

| Question | Decision |
| --- | --- |
| Name | **Quantum Observatory**; the galaxy view is *Frontier*, the seven sections are *Q-Day* |
| Pillars | **Narrow the enum to `quantum`**, keep the field, lose no data — the crypto material is in the constellations and is untouched |
| Publishing | **Project site** at `stuartokin.github.io/<repo>/`, with `base` set accordingly |

## 7. Open questions

1. **Repository name** — `quantum-observatory` is assumed throughout. Confirm
   before Phase D.
2. **Whether to recreate a user site** at `stuartokin.github.io` after the
   rename. The landing page is written and delivered; it needs the repository
   and a check of which projects it lists.
3. **How far "readiness" goes** in Phase C. Crypto-migration readiness is well
   defined; general cyber readiness is a crowded field of vendor maturity
   models, and the board should not add a sixth unless it can source one.

*Settled since this was written: the schema `$id`s are urns
(`urn:quantum-observatory:frontier:v1`) rather than URLs for a domain that will
not exist.*

---

## 8. Everything else

`BACKLOG.md` holds what is not in a phase: the corrections surface, patents as a
leading indicator, the key-size demonstration, guidance text for the technical
and auditor questionnaires, and the engineering debt. It also records what has
been **closed**, so withdrawn ideas are not proposed again.
