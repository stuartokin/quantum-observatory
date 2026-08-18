**Status: every finding below was fixed in 0.48.11, the same session that
wrote this review, on request.** Left as the record of what was found and
verified before the fix — see `HANDOVER.md`'s "Where the project stands" and
"Patch mode is live" sections for what changed and why, and
`src/releases.ts` (0.48.11) for the reader-facing summary.

# Code review — 18 August 2026

Version at time of review: 0.48.10. Scope: the whole repo (`src/`, `scripts/`,
`agents/`). Every finding below was verified by reading the actual code and,
where practical, reproducing the behaviour (node one-liners, grep across live
content) rather than inferred from a description — per the project's own
standing rule.

---

## High — likely to bite

### 1. `applyFields` can silently corrupt a date field it never meant to touch

`scripts/agent-io.mjs:326-365`

`applyFields` parses the existing front matter with `yaml.load(m[1])` but,
unlike every other YAML entry point in this codebase (`checkStructure` at
`agent-io.mjs:398`, `validate-content.mjs:28`, `check-questions.mjs`), it
never runs the result through `normaliseTypes`. YAML parses an unquoted
`2026-08-01` as a JS `Date`, not a string — this project has already fixed
that exact hazard twice elsewhere.

Patch a single field inside a top-level block that also contains an
*unquoted* date anywhere else, and the whole block re-dumps with the raw
`Date` object still in it — verified: `yaml.dump({review: {date: new
Date('2026-08-01'), note: 'hi'}})` produces `date:
2026-08-01T00:00:00.000Z`, unquoted, wrong format for the schema.
`checkFile`/`checkStructure` doesn't catch this because it re-parses and
re-normalises its *own* in-memory copy to validate — it never checks the
actual bytes `applyFields` produced.

Dormant today only because every date field in `content/frontier/*.md` is
currently quoted by convention (verified — zero unquoted dates across the
whole collection). Nothing in the code enforces that convention on a patch,
and `test-agent-io.mjs` has no test for it.

**Fix:** normalise `data` (or the touched subtree) the same way
`checkStructure` already does, before `yaml.dump` inside `applyFields`.

### 2. The documented zoom floor isn't actually wired up

`src/renderers/board/Board.tsx:1616-1629` vs `:2725` and `:2916`

`fitScale` is computed and commented as the floor that "removes the need to
scroll at all" (matching DESIGN-LOG.md's claim that scrollbars were removed
because zoom-out stops at fit-to-frame). It's only read in a `useMemo`
dependency array (`:2682`); the actual zoom clamps — `onWheel` (`:2725`) and
pinch-zoom (`:2916`) — both hardcode `Math.max(0.5, ...)` instead.
`fitScale`'s own floor is 0.18, so on a fully spread board it can land well
under 0.5 — meaning the reader can't zoom out far enough to see the whole
galaxy, with no scrollbar to reach the rest since that was removed on the
assumption `fitScale` was the real floor.

**Fix:** `Math.max(fitScale, ...)` in both places.

### 3. Headline placement on the timeline ignores month/day precision

`src/renderers/board/timeline.ts:187-190` vs `Board.tsx:1943-1950`

`Board.tsx` computes a fractional year for a headline specifically so it can
be positioned within a year rather than at its start — its own comment says
"the whole point of aligning by month." But `yearFraction` does `new
Date(year, 0, 1)`, and the `Date` constructor truncates a non-integer year
argument: verified `new Date(2026.5, 0, 1).toISOString()` → `2026-01-01...`.
Every headline in the same calendar year renders at exactly the same x
position regardless of month. Silent, purely visual, exactly the class of
bug DESIGN-LOG.md warns about repeatedly.

**Fix:** interpolate between 1 Jan of the year and 1 Jan of the next by the
fractional part, rather than truncating.

---

## Medium

### 4. Draft news items aren't filtered out of the live site
`src/content/newsroom.ts:14` — `allNews` never checks `status ===
'published'`, only excludes archived/rejected, even though `NewsItem.status`
explicitly allows `'draft'` and every other collection loader enforces
published-only. A mid-edit `status: draft` news file would render live.

### 5. `MiniOrbit` bypasses the published-only filter
`src/components/MiniOrbit.tsx:31-37` — imports `allFrontier` (every status)
instead of the canonical `frontier` export, filtering only non-archived. A
draft item can appear lit and clickable in the "most changed constellation"
panel.

### 6. `content/forecasts/` has no schema and no validation gate anywhere
`agent-io.mjs`'s `COLLECTIONS` table points forecasts at a
`content/schema/forecast.schema.json` that doesn't exist on disk, and
`validate-content.mjs`'s own `COLLECTIONS` list never includes
`content/forecasts` either — unlike news/questions, which have dedicated Ajv
gates. `forecast.ts`'s loader does no shape-checking and `Panels.tsx`
destructures `forecast.estimates.{...}` with no guard, so a malformed
`content/forecasts/q-day.md` crashes the whole app to the top-level
ErrorBoundary. No agent currently writes there (checked every
`write_scope`), so dormant — but one hand-edit away from a full outage, and
a landmine (`ENOENT`) if any agent's scope is ever extended to include it.

### 7. `normaliseFile`'s whole-file repair pass runs on patch output too
`scripts/run-agent.mjs:981` pipes patch output through `normaliseFile`
unconditionally, and that function's colon-quoting repair scans and can
rewrite any line in the front matter — not just the blocks `applyFields`
scoped its own re-serialisation to. Currently a no-op given existing
content's quoting conventions, but undermines the "untouched bytes survive"
guarantee patch mode exists to provide, one layer up.

---

## Low — defensive gaps, currently caught by the schema gate

- `tower.ts:137` / `timeline.ts:134` — unrecognised `readiness` silently
  maps to index 0 ("emerging") instead of failing loudly. Schema
  enum-constrains `readiness` today, so low real risk.
- `tower.ts:91` `isSourced` — `.evidence.claim.startsWith(...)` with no null
  guard; `evidence.claim` is schema-required today.
- `frontierTypes.ts:85` — `review?: Review` typed optional in TS, but
  `frontier.schema.json` marks `review` required. Real type/schema drift,
  harmless while the gate runs.
- `agent-io.mjs:245-259` `setPath` — a dotted path addressing into an array
  (`evidence.sources.role`) silently overwrites the array with `{}` before
  the schema rejects it downstream. Relies on the schema catching every
  case rather than failing at the point of the mistake.

## Test coverage gap
`test-agent-io.mjs` has no case for an unquoted date (or other native-typed
scalar) surviving a patch to a field in the same top-level block — the gap
that let finding #1 ship unnoticed.

## Not re-verified, already flagged in HANDOVER.md
`verifier` setting `review.state: agent-merged` when `agent-reviewed` seems
more accurate; `budget.proposals` values probably conservative now patches
are smaller than whole files. Both already recorded there, not re-checked
here.
