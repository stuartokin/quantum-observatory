# Changelog

`horizonqltd.com` — Phase 0.

Versions are bumped in `package.json` whenever a file changes. Quote the
version when reporting a problem so we both know which build we're discussing.

---

## 0.1.4 — 2 August 2026

**Fixed — build gate: budget measured the wrong number**

- `scripts/check-budget.mjs` now measures **gzipped** bytes, not raw. Gzipped
  is what a visitor actually downloads; raw byte counts mislead.
- Budgets restated in gzipped terms: entry 60 KB, world 320 KB, CSS 15 KB.
- First green build. Measured: entry 20.3 KB (34%), world 274.5 KB (86%),
  CSS 1.9 KB (13%).

The limit was not raised to make the failure go away — the measurement was
wrong. The world chunk still has a real ceiling that will catch regressions.

## 0.1.3 — 2 August 2026

**Fixed — content validation failed on every file**

- `scripts/validate-content.mjs`: YAML parses an unquoted `2026-05-14` as a
  Date, not a string, so every date field failed the schema. Now normalised
  recursively to `YYYY-MM-DD` before validating.
- `scripts/validate-content.mjs`: IDs were collected *after* schema validation
  and skipped on failure, so one bad file made every connection in the repo
  look broken. Split into three passes — parse and collect IDs first, then
  schema, then connections.
- `src/content/loader.ts`: same Date bug at runtime. Would have thrown on
  `.localeCompare()` when sorting by date. Same normalisation applied.

Normalising in code rather than demanding quoted dates is deliberate: agents
will write YAML both ways, and a gate that fails on formatting rather than
substance is one you end up switching off.

## 0.1.2 — 2 August 2026

**Fixed — workflows could not run**

- `npm ci` and `cache: npm` both require `package-lock.json`, which does not
  exist because the repo was uploaded without ever running `npm install`.
  Switched to `npm install`, dropped the cache directive.
- Node pinned 20 → 22. Node 20 is deprecated on GitHub Actions runners.
- Applies to both `.github/workflows/ci.yml` and `deploy.yml`.

## 0.1.1 — 2 August 2026

**Changed — setup friction**

- `stuartokin` substituted for the username placeholder throughout.
- Removed `public/CNAME`. GitHub creates it automatically when the custom
  domain is saved, and having it present early breaks testing on the
  `github.io` URL.
- Added `SETUP.md` — full walkthrough marked laptop or phone per step.

## 0.1.0 — 2 August 2026

**Phase 0 scaffold**

- Vite + React 18 + TypeScript, react-three-fiber and drei.
- Content graph: JSON Schema, Markdown front matter, no coordinates in content.
- World interface with the abstract-property mapping. Orbital world complete;
  landscape mapping written with a stub scene to prove the abstraction.
- Document renderer — permanent, protected from agents.
- Spectral index signature component; emission-line palette.
- Capability detection: input class, measured quality tier, fold posture.
- Three CI gates: schema, performance budget, agent write scope.
- Deploy workflow to GitHub Pages.

---

## Known gaps

- No `package-lock.json`. Builds resolve dependencies fresh each time. Run
  `npm install` locally once and commit the lockfile when convenient.
- Article bodies not rendered — titles and summaries only. Phase 1.
- No routing. One page, two renderers. Phase 1.
- Landscape scene is a deliberate stub. Phase 5.
- Version is not yet displayed on the site itself.
