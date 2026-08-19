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
    version: '0.54.3',
    date: '2026-08-19',
    headline: 'A character that could not be spelled stops costing a whole run.',
    agents: [
      'An agent’s reply is JSON, and two things it writes constantly are not valid JSON: a line break inside a quoted note, and a backslash beginning an escape the format does not define. Both are now repaired on the way in. A sourcer run with three searches, seven sourced metrics and two finished patches was thrown away whole for one of them.',
      'It repairs those two and nothing else. No closing of unbalanced braces, no stripping of trailing commas, no salvaging half an array — a malformed shape can mean several things, and picking one silently puts a claim on the board that nobody made. A line break inside a string can only mean itself. That line is where the repair stops, on purpose.',
      'When it still fails, the log now says which of four things happened: no object at all, an object that never closes, one that parses but carries no files, or one that fails to parse — with the error and the sixty characters either side of it. "No parseable JSON object found" was true and told you nothing; a model that answered in prose and a model that wrote a perfect object with a bad character in it need different answers.',
      'A run that fails this way keeps its queue entry, as it always has. Re-running it costs nothing.',
    ],
  },
  {
    version: '0.54.2',
    date: '2026-08-19',
    headline: 'A failed run stops eating the job that would have fixed it.',
    content: [
      'The United States now has dated post-quantum requirements on the board, read from the executive order as published rather than from anyone’s summary of it: key establishment on federal high value assets by the end of 2030, digital signatures a year later. Key exchange goes first because a key agreed today can be recorded today and broken later; a signature cannot be forged in retrospect.',
      'Australia is still missing, and still for the same reason — cyber.gov.au refuses automated fetching. The scout can reach it and has now done the work twice; both times the record was discarded on a character count. The queue entry now says which two fields and what their real limits are.',
    ],
    agents: [
      'A run that has every one of its files rejected now puts its queue entry back. It used to spend it — on the rule that a usable answer spends the entry, which is right for a run that searched properly and found nothing, and wrong for one that searched, found the source, wrote the record and lost it to formatting. Those are not the same run and were being treated as one, which is why three consecutive failures each destroyed the job that would have retried them.',
      'The scout’s brief printed one table of field limits with no collection named above it. They were the frontier item’s limits: `plain` is 1600 characters there and 400 on a milestone. Every table is now headed by the collection it governs, and where the brief and the schema disagree the brief now says the schema wins — it is the thing that actually runs.',
      'Rejection messages say how far over a field is. "Must not have more than 400 characters" reads the same whether a field is 31 characters over or written to twice the limit, so the log could not tell a slip from a misunderstanding. It was a misunderstanding every time.',
    ],
  },
  {
    version: '0.54.1',
    date: '2026-08-19',
    headline: 'The scout was right about the EU, and the runner was quietly rejecting its work.',
    content: [
      'The EU does have a 2035 deadline, and the board now carries it. Section 4.1 of the coordinated implementation roadmap: "By 31.12.2035: The PQC transition for medium-risk use cases has been completed." The previous release said no such date existed — that was read off the Commission’s announcement page rather than the roadmap, and was wrong.',
      'Both existing EU records were rewritten to quote the roadmap rather than the press release, and all three now cite the document itself. The 2030 milestone is high-risk use cases, not "critical infrastructure"; the 2026 one is first steps implemented and national roadmaps established, not "start transitioning". The announcement’s paraphrases were close enough to look right and loose enough to be wrong.',
      'The rule this cost is now written down: an announcement page is not the document, even on a government domain. The board already applied that to trade publications. It had not applied it to regulators.',
    ],
    agents: [
      'Four scout runs failed before any of that was found, and both causes were in the machinery rather than the agent. The runner kept its own private list of which collections use which schema — a list that knew three of them and silently stamped everything else "frontier/v1", so every milestone the scout wrote was failed by a check the runner had caused it to fail. It now reads the constant out of the schema that governs the file, and a test asserts it for every collection.',
      'Milestones were also marked as a collection that may not grow, which is true of the twelve standing questions and was never true of regulatory deadlines. A new deadline — the entire reason the scout was given the scope — would have been rejected as not one of the existing ones.',
      'The scout’s brief now describes what a milestone record actually is: the required fields, the closed lists for jurisdiction, kind and status, that its source is one document rather than a list, and that a date in the past is never marked met by arithmetic. Its file-format example had shown "frontier/v1" three times as though it were universal.',
    ],
  },
  {
    version: '0.54.0',
    date: '2026-08-19',
    headline: 'Every reference is clickable, the Mosca test is back, and Plan learns who else has a deadline.',
    ui: [
      'Any reference on the Q-Day surface now opens a detail panel: the title, the publisher, the identifier, the date it was accessed, the evidence level, whatever note the reviewer left, and a link out to the source itself. Previously a claim carried a source in its data and showed the reader a bare name — the citation existed and was unreachable, which is the worst of both.',
      'The Mosca readiness test is on the Clocks tab, and it is content rather than code. Three questionnaires — executive, technical, auditor — put x (how long migration takes), y (how long data stays sensitive) and z (how long until Q-Day) on the same axis as the derived Q-Day band, and the verdict follows from x + y against z. The z axis is the board’s own derivation, so the test moves when the evidence does.',
      'Each questionnaire states its own weighting in the open. The options score to years, and the mapping from an answer to a number is editorial judgement rather than measurement — so it is printed on the page next to the questions rather than buried in a function.',
      'Plan now shows the EU and NIST alongside NCSC, CNSA 2.0 and the US federal target, as jurisdiction cards with their own sources. Four milestones added: the EU roadmap’s end-2026 start and end-2030 high-risk deadline, and NIST’s 2030 deprecation and 2035 disallowal of RSA and ECC.',
      'The EU "2035 full transition" figure the research prototype asserted was queued as a question rather than imported, because the Commission’s announcement of its roadmap sets only end-2026 and end-2030. See 0.54.1 — the announcement was the wrong document to have read.',
      'Australia is missing on purpose, not by oversight. The ASD deadline is real and cyber.gov.au refuses automated fetching, so it is first in the queue for a human-assisted pass rather than transcribed from memory.',
      'Escape inside a source panel closes the panel, not the whole Q-Day surface. Both listen on the document and the later listener wins, which is exactly backwards from what a reader expects.',
    ],
    content: [
      'A new `content/assessment/` collection holds the questionnaires and the maturity levels — four files, schema-validated like everything else. The Mosca test was the one part of the research prototype that was pure application code; putting it in content means an agent can improve a question, and the weighting can be argued with in a pull request instead of a refactor.',
      'Milestones gained a `review` block, so an imported deadline carries the same review state as every other record and an unverified one is visibly unverified.',
    ],
    agents: [
      '`agents/_queue.md` is rewritten as nine scouting jobs drawn from a pass over the research prototype: the EU 2035 claim, the ASD deadline, EO 14412 and OMB M-26-15, FIPS 206 and HQC and SP 800-57 Rev 6, a newsroom measurement backfill, the Gidney–Ekerå and Häner requirement points, earlier GRI survey editions and Mosca 2015, decoder and magic-state metrics, and a circuit-depth item.',
      'Scout may now write to `content/questions/` and `content/milestones/` as well as the frontier inbox. A regulatory deadline is a scouting result, and routing it through a human retype was the only reason it was not.',
    ],
  },
  {
    version: '0.53.0',
    date: '2026-08-19',
    headline: 'The Observatory learns the research prototype\u2019s manners.',
    ui: [
      'Every figure now explains itself. A card shows the number, and one tap opens plain terms, what the evidence actually claims, its evidence level, whether a human has reviewed it, and the source \u2014 the pattern the research prototype uses on every card, which turns out to be this board\u2019s evidence model almost exactly. The difference is that the prototype hand-writes that prose and this reads it off the item, so a card cannot drift from the board and improves when an agent improves the item.',
      'Sections fold, and each carries an (i) holding how it was worked out. On a page with six analyses, being able to shut four is the difference between a reference and a wall \u2014 and the working belongs next to the result rather than in a footnote nobody reaches.',
      'Charts are interactive. Hovering or tabbing to any mark gives a real panel with the figure, the date and the paper behind it, positioned against the chart so it travels when the page scrolls. An SVG title tag is a tooltip only in the sense that it eventually appears, in the operating system\u2019s styling, and on a touchscreen not at all.',
      'Plan became a chart. Every regulator\u2019s deadlines run as a track against the derived Q-Day band, with a "now" line through it \u2014 because the question a reader actually has is whether the migration finishes before the thing it defends against arrives, and that is a question about two intervals rather than a list of dates.',
      'The Q-Day band on that chart is derived, not drawn. It comes from the same expert elicitation the Trends page uses, so when the evidence moves the band moves and the deadlines stay where their regulators put them.',
      'Filter chips on Trends, so a reader can take one cryptographic target out and see the other on its own. Turning a series off never repaints the survivors \u2014 colour follows the entity, not its rank.',
      'The twelve standing questions became a numbered accordion, which suits them because the board already numbers, orders and maintains them. Four still read unknown, and that remains the most useful thing on the page.',
      'A "key takeaway" under each chart, stated as a claim you can disagree with rather than woven into the caption as though it were the data.',
      'The header carries the Horizon Q wordmark and links back to the board. The two surfaces are one product and the header should say so.',
    ],
    agents: [
      'Nothing changed about how content is written or validated. This release is presentation \u2014 but presentation that reads more of what agents already produce: the plain field, the evidence claim, the level, the review state and the source now all appear on the surface instead of only the number.',
      'Stack still has no completion percentages. The bars are a log-scale position between one qubit and the published requirement \u2014 the axis this problem lives on, since every estimate has moved by orders of magnitude \u2014 with no figure printed on them, the multiple as the headline, and nothing summed.',
    ],
  },
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
]
