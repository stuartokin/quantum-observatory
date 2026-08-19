export interface Release {
  version: string
  date: string
  /** One line on what it was for. */
  headline: string
  ui?: string[]
  content?: string[]
  agents?: string[]
}

/**
 * The last ten releases.
 *
 * Update this in the same commit as the change it describes. It fell nine
 * versions behind once, and reconstructing it afterwards is guesswork about
 * what mattered rather than a record of it.
 *
 * Written by hand, deliberately. A changelog generated from commit messages
 * records what was touched; this records what changed for someone using the
 * thing, which is a different question and the only one worth answering here.
 *
 * Content figures are counted live from the board rather than written down —
 * see the Help panel. A number typed into a changelog is wrong within a week.
 */
export const RELEASES: Release[] = [
  {
    version: '0.52.0',
    date: '2026-08-19',
    headline: 'Five of the seven sections are live, and the board grew a memory.',
    ui: [
      'Plan: every regulatory deadline is now a content file with the source that set it \u2014 NCSC 2028/2031/2035, the CNSA 2.0 timetable, the US federal target, and the day the first three standards were published. They were application constants for one release; a deadline the board asserts and cannot cite is the same failure as an unsourced item.',
      'A deadline in the past is never marked met by arithmetic. The board records whether it was actually discharged, because a date passing and an obligation being met are different facts.',
      'Stack: what a cryptographically relevant machine still needs, component by component \u2014 and deliberately without percentages. The prototype scored each part and summed them to "15% of the way there". Those numbers were editorial: the remaining work is not linear in qubit count, and 96 logical qubits against 835 is not 11% of anything defensible. What the board can say honestly is the multiple \u2014 8.9\u00d7 more logical qubits, 58\u00d7 more physical \u2014 and where the literature publishes no target, the row says so.',
      'Learn: the vocabulary, each term linked to the item that carries the actual evidence, alongside the twelve standing questions with the state an agent last recorded. Four of them read unknown, which is a real answer and more use than a confident guess.',
      'The definitions stay in code rather than becoming content. They make no claim that could be right or wrong against evidence, and giving them a schema would put definitions in the same place as claims.',
    ],
    agents: [
      'News items can now carry structured measurements \u2014 the figure an event reported, with the platform and the qualifier that make it comparable. This is the board\u2019s first memory: a frontier item holds the current best value and overwrites its own history, but a news item is dated by when the thing happened and is never revised.',
      'Seven measurements seeded across six events, every one a figure the board had already verified elsewhere, so it is transcription rather than new research. The newsroom fills the rest as it works.',
      'Modality and qualifier are mandatory for anything plotted, and the gate refuses a count without them. Caltech\u2019s 6,100 trapped atoms and QuEra\u2019s 448 operated below threshold are not the same measurement \u2014 grouped naively they show capability falling by an order of magnitude.',
      'A doubling time is only computed from three points sharing one qualifier and showing growth. Nothing clears that yet, and each series says which condition it failed rather than drawing a line through whatever is there.',
      'Twenty-one derivation self-tests, up from sixteen. The new ones cover the traps this design invites: mixed qualifiers, mixed platforms, and a declining series that would otherwise produce a negative doubling time.',
    ],
  },
  {
    version: '0.51.0',
    date: '2026-08-19',
    headline: 'The Q-Day estimate stops being asserted and starts being derived.',
    ui: [
      'Trends is live, and everything on it is computed from the board\u2019s own items when the page loads \u2014 no figure is typed into the source. It reports what it refuses as well as what it uses: a model that quietly drops the data it cannot read looks more complete than it is.',
      'The headline finding is one the board already held and nobody had drawn: the requirement is falling faster than any hardware is rising toward it. Physical qubits to factor RSA-2048 went from under a million to under a hundred thousand in eight months \u2014 a full order of magnitude, from algorithmic improvement alone.',
      'Two charts, one per kind of qubit, never both on one axis: physical and logical are three orders of magnitude apart and putting them on one scale would invite a comparison that is not valid. Each cryptographic target gets its own line, because successive estimates of RSA-2048 are a trend and an RSA figure joined to an ECC figure is not.',
      'Capability is drawn as dated marks and never as a line. The board records today\u2019s best figures, not their history, so a capability trend would be a line through points that share one date. The vertical distance from a mark to the requirement is the gap, and that gap is quoted from the most favourable reading on both sides and labelled as such.',
      'Chart colours were validated rather than chosen. The interface amber and teal sit outside the lightness band a categorical mark wants against this ground, so the marks use a stepped-down pair that passes lightness, chroma, colour-blind separation and contrast against the actual surface. Chrome keeps the bright accents.',
      'The impact ledger shows what has been pushing the estimate and which way, from the Q-Day impact score each item already carries. The net is a direction, not a number of years \u2014 it answers the question a countdown cannot: what would have to change for this to move.',
    ],
    agents: [
      'The derivation reproduces the asserted range exactly. Anchored on the expert survey the board holds, the evidence-derived window is 2036\u20132041 against an asserted 2036\u20132041 \u2014 so the number a human set is confirmed by the only evidence that maps to calendar years, rather than replaced by it.',
      'It does not compute a crossing point, and that is the finding rather than a shortfall. There is no capability time series to fit, and the only way to get a forward capability curve is a vendor roadmap \u2014 which the board\u2019s own precedent has always scored zero. The missing data and the standing rule point the same way.',
      'Where the derived window and the asserted forecast disagree, the build writes a proposal for the weekly issue and changes nothing. Moving the forecast stays a human decision: one axis at a time, a two-year cap, evidence required.',
      'A metric is dated by the paper its note names, not by when the board last checked it. Dating from evidence.verified would collapse every figure onto the week an agent last ran and destroy the whole signal. A figure whose note names no source the item carries is refused rather than dated from the item.',
      'Sixteen self-tests over fixtures, each one a mistake this made on the way to working: 2.4 times read as a count of qubits; the single most relevant capability figure on the board thrown away because its name contained the word error; an annealer\u2019s five thousand qubits counted as progress toward breaking RSA.',
      'The forecast\u2019s change log recorded a baseline of 2036-2041 while its estimates have always read earliest 2034. The outermost axis was omitted from the record rather than changed after it. Corrected \u2014 a metadata fix, no number a reader sees has moved. It became visible because the Observatory started rendering the log beside the countdown.',
    ],
  },
  {
    version: '0.50.0',
    date: '2026-08-19',
    headline: 'Q-Day becomes a place you can go, and a link you can send.',
    ui: [
      'Clicking Q-Day in the header now opens the Q-Day Observatory — a full-screen surface with its own sections — rather than a small window on the board. The board unmounts while it is open, which costs the window layout but avoids running a canvas animation loop behind an opaque overlay for as long as somebody reads.',
      'The first route this site has ever had. Each section has an address (#/q-day/trends), so a page can be reloaded, bookmarked or sent to somebody. Hash routing rather than real paths, because GitHub Pages serves static files: /q-day/trends would 404 on a refresh, and the usual workaround turns every genuinely mistyped URL into a silent success. Escape, or the Board button, returns you.',
      'Two designs, one product. The observatory keeps the board’s ground, type, hairlines and monospace labels; what carries over from the research prototype is the thing that made it legible at a glance — amber is the threat, teal is the defence. That opposition is the actual subject of the section. Defence is bound to the board’s existing O III emission line rather than introducing a second, near-identical teal.',
      'Clocks: a countdown to the estimated Q-Day, a countdown to the NCSC 2035 deadline, and the headroom between them. Where the two effectively coincide it says "none" rather than rounding to "+0.0 yr" beside a note claiming Q-Day falls after the deadline — true by one second, and reading as a rendering fault rather than as the finding it is.',
      'The Mosca test: if the time your data must stay secret plus the time migration takes exceeds the time before Q-Day, you are already exposed. Both inputs are the reader’s to assert — the board has no way to know either, and defaulting them from evidence would be inventing a number.',
      'The three scenarios are read from content/forecasts/q-day.md rather than written into the source. Moving the estimate is now a content change an agent can propose and a person can veto, and the site cannot show a number the repo disagrees with.',
      '"Why this date?" carries the provenance: whether a human set the figure, when one last looked, the full change history, and — stated plainly — that the number is asserted rather than derived. The headline figure of the whole section cannot be the one number on this board that does not say where it came from.',
      'The six sections not yet built are visible and say what they are waiting on, rather than being hidden. A reader who can see that Threats is coming, and that the board holds no CVE records to fill it, knows more than one shown a tab bar with a single item.',
    ],
    agents: [
      'Nothing changed about how an agent writes content. The Q-Day surface reads the same forecast file the header always did.',
      'The performance budget learned that a lazily-loaded section brings its own stylesheet, and that stylesheet is not fetched at first paint. Counting it as entry CSS made the before-first-paint figure pessimistic the moment Q-Day arrived — the same misfiled-bucket mistake this script has now made three times, and the third one it has been taught to stop making.',
    ],
  },
  {
    version: '0.49.0',
    date: '2026-08-19',
    headline: 'The board is fetched, not bundled — 110 KB less before anything appears.',
    ui: [
      'Content no longer arrives as part of the application. Every visitor used to download the whole board as JavaScript before a single body could be drawn: 188.8 KB gzipped of frontier items and 106.1 KB of headlines, parsed and executed as code. They are now emitted as JSON and fetched, which is what AGENT-PLAN.md and DESIGN-LOG.md both said to do when content outgrew bundling — and specifically said to do instead of raising the ceiling.',
      'Before first paint: 374.8 KB gzipped became 264.6 KB. Of what remains, 183.2 KB is data rather than code, so the engine never has to treat it as a program.',
      'The project’s own documents — the design log, the operating notes, the agent plan, the source register — were being downloaded by everyone, because they shared a chunk with the board and a chunk containing anything statically imported is fetched eagerly. That is 50 KB now charged only to readers who open Help, which is the only place they are ever shown.',
      'Markdown bodies stopped being shipped. Nothing on the site renders one — the changelog has recorded "article bodies not rendered, titles and summaries only" since the first release — but they were bundled anyway, because a bundler cannot discard a property nobody reads off an object it has to build. When bodies are wanted, the answer is to fetch one when a reader opens that item, not to put ninety in front of first paint.',
      'Code and content are now cached separately. A Monday agent run no longer invalidates the application for every reader, and a code deploy no longer re-sends unchanged research. Previously any change to either re-hashed both.',
    ],
    agents: [
      'Nothing about how an agent writes content changed. The same markdown, the same schemas, the same gates — only where the parsed result is delivered.',
      'The performance budget now measures what a visitor actually waits for, split into code, documents, board data and headlines, and it reports the before-first-paint total as one figure. The new ceilings were measured from this build rather than estimated, and they are deliberately tight enough to fail when the Q-Day datasets arrive: that failure is the point, and the first answer to it is deferring headlines out of the initial fetch rather than moving a number.',
    ],
  },
  {
    version: '0.48.11',
    date: '2026-08-18',
    headline: 'A full review of the codebase, and the zoom floor finally means what it says.',
    ui: [
      'Zooming out on the galaxy hit a hardcoded floor of 0.5 rather than the fit-to-frame value the board already computes for exactly this purpose. On a fully spread board that value can sit well under 0.5, so part of it could end up permanently off-screen with nothing to reach it — the wheel and pinch handlers now clamp to the real floor.',
      "A headline's position on the timeline was computed to the month and then thrown away: yearFraction took a fractional year but built its date with `new Date(year, 0, 1)`, which truncates a non-integer year argument to 1 January. Every headline in the same calendar year rendered stacked at the same point regardless of which month it happened. Fixed by interpolating between the year's start and the next year's start.",
      'Draft items could render live in two places: the news loader excluded archived and rejected items but never checked for `published`, and the "most changed constellation" panel queried every status rather than the published-only set the rest of the board reads from.',
      'An unrecognised readiness value silently drew as "emerging" with nothing to say so happened. Now warns once rather than misplacing an item quietly.',
    ],
    agents: [
      'A patch touching one field of a block that also held an unquoted date could silently rewrite that date as an ISO timestamp instead of leaving it as the plain string the schema expects — applyFields never normalised the types YAML hands back, unlike every other parser in this pipeline. Fixed, and covered by a regression test.',
      'Patch output was still being run through the whole-file colon-quoting repair pass built for a model\'s from-scratch text, which could requote a scalar in a block the patch never touched — undermining, one layer up, the "untouched bytes survive" guarantee the patch mechanism exists to provide. Patch output now skips that pass.',
      "content/forecasts/ had no schema and no validation gate anywhere, and the loader destructured `estimates` with no guard — a malformed hand-edit to the Q-Day file would have crashed the whole app to the error screen. Added content/schema/forecast.schema.json, wired it into validate-content.mjs, and the loader now skips a malformed forecast rather than crashing.",
      'A dotted path addressing into an array — `evidence.sources.role`, which was never supported — silently overwrote the whole array with `{}` while building the path. Refused now, with a clear reason, instead of destroying it.',
      "The review field's TypeScript type had drifted from the schema (optional in code, required by the schema) and isSourced read evidence.claim with no guard. Both fixed so a bypassed gate fails safe rather than surprising.",
    ],
  },
  {
    version: '0.48.0',
    date: '2026-08-18',
    headline: 'Click a label to hone, and the board settles rather than appears.',
    ui: [
      'Clicking a supergroup name, a readiness band or a year on the axis shows only that. Clicking again clears it. It means "only this" rather than "hide this" — one gesture instead of unticking eight boxes — and the Filters panel carries the same controls, so the panel and the board never describe different states.',
      'Honing narrows what the checkbox filters already allow and never reveals something they have hidden. Honing on a year excludes undated items, unlike the year checkboxes which keep them: there the reader is trimming a range, here they are asking for one year specifically.',
      'Items that moved readiness in the last four months now travel from the band they left, slowly enough to follow. Items added in the last six weeks fade up in place — no travel, because they did not come from anywhere and inventing a journey would misdescribe what happened. Everything else is simply drawn where it belongs.',
      'A demotion drags a faint trail back to where the item was. The axis runs emerging at the top to mainstream at the bottom, so progress descends and a rising body has been corrected downward — the board saying it was wrong, which should not look like an advance.',
      'Five nebula columns drift behind the starfield, one per supergroup, tracking their own lanes. They survived two invisible versions: the first keyed colour to the wrong index, the second created its gradient outside the transform it drew in, so the gradient centre landed at twice the offset and every fill drew the transparent end.',
      'The provenance banner is a badge you can open. Four lines of caveat above a two-line title buried the thing a reader came for; the badge carries the state and clicking it carries the reasoning. It closes again when a different item is opened.',
      'Dates read as 27 July 2026 rather than 2026-07-27, and an estimate says "about" rather than carrying a tilde. ISO stays in the front matter, where machines sort by it.',
      'Help opens with what the board is and what it is not — including the two caveats: it is a derivative of the literature rather than a replacement, and its coverage is a judgement made by agents against rules a person wrote.',
    ],
  },
  {
    version: '0.47.0',
    date: '2026-08-16',
    headline: 'A queue between deciding what to research and doing it.',
    agents: [
      'The steward reads the open issues and writes focus instructions into agents/_queue.md; the agents drain them one per run. Nothing runs in the pass that proposes it — there is always a committed file a person can read and delete from before anything executes.',
      'One instruction per run, deliberately. Several drained into one pass would be several runs of work in a single summary, and the summary is how anybody judges whether the work was good.',
      'An entry that fails twice is dropped; one older than 21 days is dropped rather than run. Duplicates are matched on the arXiv id or DOI they name, not on their titles, after the same job was queued twice under three different phrasings.',
      'Agents are told which jobs they can actually do. Scout sees the board index and not item contents, so it cannot edit an existing item — asked to attach a source it will confirm the source, decline to invent a file it cannot read, and escalate. Six runs were spent that way before the routing was written down.',
      'A run that reaches a conclusion but not its JSON now has the tail of its reasoning, and any identifiers it mentioned, written to the issue. The queue entry is spent either way; the finding should not be.',
    ],
  },
  {
    version: '0.46.0',
    date: '2026-08-13',
    headline: 'Undated is now a last resort, and the questions have an overview.',
    ui: [
      'An item whose source carries no date is no longer dumped in the undated gutter. The board falls back through what it knows — the readiness change, then when the evidence was checked, then when the item arrived — and marks the position as estimated with a dashed whisker and a note saying which rung it used. FN-DSA sat undated while its own claim said the draft was submitted in August 2025.',
      'The detail panel shows the resolved date with a tilde and a dashed border when it is an estimate. An estimate labelled as one is more useful than a blank; an estimate presented as fact is worse than either.',
      'Every build now reports how many items have sources but no source date, because that is a real gap in the data rather than a cosmetic one.',
      'The twelve questions gain an Overview: all twelve as cells, showing state and when each answer last changed, with the derived ones marked as counted. Click through to read one properly.',
      'What Changed says why it picked that constellation. A panel a reader cannot account for is one they stop trusting.',
      'The two-year timeline view is gone, and Headlines opens narrower and left-aligned instead of full width beneath everything else.',
    ],
  },
  {
    version: '0.45.0',
    date: '2026-08-12',
    headline: 'The key becomes a window, and the timeline stops moving its own axis.',
    ui: [
      'The key is a window of its own — moveable, closeable, shared by every plot. Asking for it from a second view brings the existing one forward rather than opening another: there is one visual grammar, so there is one key. Drawn on the canvas it was clipped by whichever frame owned it, and could appear twice.',
      'The last-two-years view is now a camera position rather than a filter. Removing items changed the axis range under them, so a body sat at a different year depending on the window and zooming out could not recover the years that had been removed. Every item is always present; the view starts framed on the recent end.',
      'The year toggle is labelled with what is showing rather than what the click will do. The other way round reads as a description of the current state, and sent a reader looking for a broken filter.',
      'A constellation opens in its own window instead of taking over the galaxy, which is the thing a reader navigates from.',
      'Un-docking a window puts it back inside the viewport. A frame keeps its last position while docked, and that position may since have moved off screen — opening something and not finding it reads as the click having failed.',
    ],
  },
  {
    version: '0.44.0',
    date: '2026-08-12',
    headline: 'The board shows less, and hides nothing.',
    ui: [
      'Three levels of detail driven by zoom. At the widest, five supergroups — Computing, Cryptography, Communications, Sensing, Applications — and about a dozen items drawn prominently. Zooming in splits the lanes into the nine constellations; zooming further shows everything.',
      'Cryptography exists as a group because PQC and migration are neither computing nor applications. They are the response to the threat, and folding them into either misdescribes them.',
      'Nothing is hidden at any level. A demoted item is a small dim dot — still there, still hoverable, still clickable, still counted. A reader who cannot see something is told it does not exist; one who sees it small is told it is there and quiet.',
      'Links appear only when zoomed in and only between prominent bodies. Sixty hairlines behind sixty dots is texture rather than information.',
      'Zoom never changes what is on the board, only how much of it is emphasised. Bringing back something a reader filtered out would be lying about what they asked for.',
    ],
  },
]
