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
    version: '0.59.0',
    date: '2026-08-20',
    headline: 'The build stops caring where it is served from.',
    ui: [
      'Nothing visible changed. This release makes the site work at any address, which is what the repository rename needs.',
    ],
    agents: [
      'The build path is relative rather than absolute. Moving from a GitHub user site to a project site changes the URL from the domain root to a subdirectory, and the obvious fix — hard-coding the new subpath — is wrong at the old address and right at the new one, so the rename and the deploy could not both happen at once. Whichever went first, the site would serve its HTML and fail to find a single asset until the other caught up.',
      'A relative path is correct at both, so the rename needs no coordination and can be undone without a second deploy. It also removes a coupling: the build no longer contains the repository’s name, so renaming again or moving to a custom domain later needs no config change. Verified by serving the same build at a root and at a subpath and checking the board, the Q-Day sections, deep links and every content fetch at each.',
      'The setup guide was rewritten. It described a user site with a custom domain at a company address, neither of which applies, and a document that confidently describes a configuration you do not have is worse than none.',
    ],
  },
  {
    version: '0.58.0',
    date: '2026-08-20',
    headline: 'The last two sections arrive — and not as the imports they were planned to be.',
    ui: [
      'Threats answers the question the descope actually left: which cryptography a quantum computer breaks, which it merely weakens, and which it does not touch. Three tiers, because the difference between them is the most misunderstood thing in this subject. Shor does not weaken RSA and elliptic curves, it solves them, and no key length helps. Grover halves the exponent against symmetric ciphers, which is a real reduction and is answered by using longer keys — it is why CNSA 2.0 specifies AES-256 rather than abandoning symmetric cryptography.',
      'The most useful thing that page does is say what is not threatened. A reader who leaves believing everything is doomed will make worse decisions than one who knows which half to worry about, and hash functions and adequately sized symmetric keys are in the clear.',
      'It also states plainly that the replacements are unbroken rather than proven. A standard is a decision, not a proof; cryptanalysis of the lattice schemes is less than a decade old; and the board already holds a candidate withdrawn after a weakness was found. The third evaluation round exists as insurance and the page says so.',
      'Readiness reads the board as a ladder. Every capability the migration depends on, weakest rung first, with its evidence level. Of thirteen, seven are still at the two weakest rungs — which is a more useful statement than any score out of ten. The algorithms being finished was never going to be the constraint; discovery, crypto-agility, hardware roots of trust and supplier readiness are where the years go, and all of them sit below the standards on that ladder.',
      'Both sections end by saying what they do not hold. No vulnerability records, no exploitation data, no vendor readiness scores.',
    ],
    content: [
      'Both were planned as quarantined imports from the research prototype, marked unverified. Neither is. That plan was written when a cyber galaxy was in scope and Threats was going to carry vulnerability data — with the project narrowed to quantum, the board turns out to answer the question already, from items that carry sources and evidence levels.',
      'Vendor readiness scores were dropped on their merits rather than for scope. Such a score is a judgement about a company’s internal state, it goes stale within a quarter, and the published ones are largely assembled from marketing material. Putting a table of them on a board that asks every other claim to carry a checkable source would undercut the argument exactly where it matters most.',
    ],
    agents: [
      'The performance budget stops charging readers for bytes they never receive. Deferred chunks are alternatives — you open Q-Day, or Help, or the news archive — so summing them was the wrong measure, and adding a second lazy feature moved the number even when nothing existing grew. It is now judged on the largest single chunk, which is what the unluckiest reader actually pays, with the total still printed. Q-Day is 29 KB of a 40 KB ceiling; the sum that used to be measured was 58 of 60.',
    ],
  },
  {
    version: '0.57.1',
    date: '2026-08-20',
    headline: 'Learn stops being a status report and starts teaching.',
    ui: [
      'Eight steps, in order: what cryptography is holding up, RSA and the multiplication trapdoor, elliptic curves and why they fall first, managing the keys you already have, the quantum problem, the replacements, who sets the dates, and why the work does not end when the migration does. A reader who knows nothing can now get from the first to the last without leaving the page.',
      'What was here before was the twelve standing questions and a glossary. Both are useful and neither teaches: the questions are the board reporting on its own state, and a dictionary is something you consult once you already know what you are looking for. Somebody arriving to learn was handed a status report.',
      'Factoring is a thing you do rather than a thing you read. 3,233 is two primes multiplied together; tap numbers until you find them, and the page then points out that an RSA-2048 key is a 617-digit number and nothing about the method changes — only the size of the search.',
      'The elliptic curve bounces. Press it and watch P, 2P, 3P land nowhere near each other, which is the whole reason the reverse question is hard. It is drawn over ordinary numbers so it can be seen at all, and the page says so rather than letting the simplification pass as the real thing.',
      'Every step names the board items its claims rest on, with the evidence level and the source, so a lesson cannot say more than the board can stand behind — and improves when an agent improves an item. A step citing something that has left the board says so in orange rather than failing quietly.',
      'Where a step touches something genuinely unsettled it shows the board’s standing question and its current state instead of teaching past it. The quantum-problem step ends on "does anything alter the likely timing of Q-Day", which the board records as moving.',
      'The twelve questions move to the Frontier view, where they have a window of their own. They appear on Learn only against the step that raises them.',
    ],
    agents: [
      'Three near-duplicate milestones landed in one batch — the ASD 2030 cessation, the FIPS 140-2 Historical date and the OMB 2035 migration, each written twice under different ids with near-identical text. That is the retry behaviour from 0.54.2 doing exactly what it was built to do and having a side effect nobody planned: a job that failed *after* finding its answer runs again and writes the same finding under a new filename.',
      'The runner now warns rather than refusing. A new milestone sharing a jurisdiction and date with an existing one is written, then named in the run log and under its own heading in the pull request. It does not reject, because three United States deadlines genuinely fall on 31 December 2030 — CNSA 2.0 networking, EO 14412 key establishment and NIST deprecation — and anything refusing on a date clash would be wrong more often than right. Telling one obligation from another is a judgement about meaning, and the same rule holds here as for the trim pass: an automatic decision must not touch meaning.',
    ],
    content: [
      'The key-size comparison the research prototype had is deliberately absent. It is the obvious third demonstration, and the board holds the standard numbers and publication dates for FIPS 203, 204 and 205 but not the byte counts. Writing them from memory would have put unsourced figures on a page whose whole argument is that it does not do that. A sourcer job reads them out of the standards, and the demonstration gets built when the board can cite them.',
    ],
  },
  {
    version: '0.56.1',
    date: '2026-08-20',
    headline: 'Horizon Q becomes the Quantum Observatory, and stops offering four domains it never had.',
    ui: [
      'The product is the Quantum Observatory. The galaxy view is Frontier and the seven-section surface is Q-Day — which demotes "Observatory" from the Q-Day surface to the whole product, where it belongs now that Q-Day is one part of a board also covering architectures, error correction, enabling technology, sensing and communications.',
      'The galaxy picker is gone. It offered quantum, cyber, AI, materials and energy; four of those never held a single item and the fifth held one that was mis-filed. A selector with one real option is furniture that does nothing, and four disabled options are a promise the board was never going to keep.',
      'The constellation layer is untouched. Architectures, error correction, algorithms, enabling, PQC, migration, communications, sensing and applications are where the structure actually lives, and nothing about them changes.',
    ],
    content: [
      'Nothing was deleted. Three records carried `pillar: cyber` and all three are post-quantum cryptography — the NIST IR 8610 additional signature candidates, the NIST PIV dual-stack drafts, and HAWK’s withdrawal after AI found a lattice weakness in sixty hours. They were mis-filed; they are now quantum. Three field edits, no rewriting.',
      'The cryptography material is unaffected, because it never lived in the pillar. It is in the constellations — six items in PQC, eight in migration — plus fifteen regulatory milestones and the whole Q-Day surface, which is a cryptography surface end to end.',
      'The pillar field survives the narrowing rather than being stripped from ninety-two files. Every record still states its domain, and a second could be added without a migration.',
      'One schema was deliberately *not* narrowed. `content/items/` describes other published projects — a cyber incident globe, an AI vulnerability guide, an energy tracker — and their domains are facts about those projects rather than categories this board offers. Narrowing it would have made eight true records invalid.',
    ],
    agents: [
      'The scout and verifier briefs carry the new name, and scout no longer refers to "the quantum galaxy" now that there is only one. No brief ever offered the retired domains as options, so the narrowed schema — which every agent is shown in full — is what keeps them right from here.',
      'Validation failures now say what would have been acceptable. "Must be equal to one of the allowed values" is true and useless; it now adds "(allowed: quantum)". A field over its limit says how far over, and an unknown field is named rather than merely counted. This surfaced the moment the pillar narrowed: an agent had already written the retired value into a new item, and the build said only that it was wrong.',
      'Schema identifiers stop pretending to be URLs. They read `urn:quantum-observatory:frontier:v1` rather than naming a domain this project will not use — nothing ever resolved them, and a link that will never work is exactly the sort of quiet untruth this board exists to avoid.',
    ],
  },
  {
    version: '0.55.0',
    date: '2026-08-19',
    headline: 'Two surfaces stop pretending to be two sites.',
    ui: [
      'The board and the Observatory now share a header. Wordmark on the left, what you are looking at beside it, three dots on the right — the same element in the same position on both. What differs between them is only what sits in the middle: the board has its galaxy picker and statistics, the Observatory has its standfirst. Those are context. Everything else was furniture that moved, and furniture that moves is the loudest way two pages say "different site".',
      'One dock, on both. The Observatory’s tab bar was a fixed strip; it is now the board’s dock, which means it drags, collapses when you click its grip, resizes from the corner, and drops its labels for icons when the window is narrow. It had none of that.',
      'The leading slot is always the other surface, with a rule after it. "Q-Day" opens the board’s dock and "← Board" opens the Observatory’s, in the same place, so wherever you are the way out is where you left it. The floating back button in the corner is gone.',
      'The two docks hold different kinds of thing and do not need a legend for it. A board item shows presence — open a window and it leaves the dock, because a window on screen is already its own control. An Observatory item shows selection — always there, one lit. Both read as "bring this forward", which is one idea.',
      'Sections are real links now rather than buttons, so middle-click, open-in-new-tab and copy-link-address work. Two sections side by side in two browser tabs is a thing this board is for.',
      'Help, statistics and reset the layout live behind the three dots on both surfaces. On the board Help still opens the window you already had — moveable, resizable, parked beside the galaxy while you read — rather than a second panel that would have to be kept in step with it. The menu is an entry point, not an owner.',
      'Chrome is teal on both surfaces now instead of following the galaxy’s colour. The per-constellation accent still drives every mark on the canvas, so colour on a chart continues to mean something while nothing about the furniture shifts when you change galaxy.',
    ],
    content: [
      'The Mosca test’s weights are dials rather than printed numbers. The board states a default and why, and the honest answer to "why 1.4 and not 1.2?" is that nothing here evidences either — it is editorial ordering with a decimal place on top. Defending that would have been worse than handing it over, and the result moves as you move it.',
      'A weight you have changed is marked, and gets a reset back to the board’s figure. Nothing is written back: the file is the board’s position, the session is yours.',
      'Each executive question carries what the national guidance actually says about it, folded shut, with links out — NCSC’s timelines, the CISA/NSA/NIST factsheet, the NCCoE practice guide, the EU roadmap, NIST IR 8547. Stated as their position rather than this board’s advice: the board maps how close things are to being real and does not tell anyone how to run a migration. The technical and auditor sets are next.',
    ],
  },
  {
    version: '0.54.5',
    date: '2026-08-19',
    headline: 'Counting characters becomes the machine’s job, where it always belonged.',
    agents: [
      'An agent cannot count characters. Three releases were spent trying to teach it the limits — a table per collection, then the numbers computed from the schemas and put directly in front of it, then a line saying the computed table wins — and the next run wrote 713 characters into a 600-character field. That is not a comprehension failure and no better wording fixes it.',
      'So where a file fails on length and nothing else, the model is now asked once to shorten exactly those fields, and the result is validated by the same schema as everything else. The research survives instead of being thrown away over a sentence that ran long.',
      'It may only remove. The instruction is to cut words and never add a fact, a number, a date or a source; wording quoted from the source is protected and the agent’s own explanation is what gets cut. A shortened claim that no longer matches its source would be worse than a rejected file, and that is the risk this is built around.',
      'It runs only on a pure length failure. A bad value, a missing field or an unknown key is rejected exactly as before — those need judgement about what something means, and an automatic edit must not touch meaning.',
      'Anything it shortens is declared: named in the run log and under its own heading in the pull request, so a reviewer knows which prose is the agent’s first choice and which is the agent’s, cut down. The reply is also refused more often than accepted — a field nobody complained about is never carried through, and a file half-shortened is still rejected.',
    ],
  },
  {
    version: '0.54.4',
    date: '2026-08-19',
    headline: 'The limits an agent is told are now the limits that are enforced.',
    agents: [
      'Three runs have been destroyed by an agent being given a field limit its schema did not agree with, and each time the fix was to hand-edit a table in a brief — the same mistake with a longer fuse. The limits are now computed from the schemas at run time, walked into nested objects and array items, and put in front of every agent next to the schema itself. No brief restates one; the two that did have had them removed.',
      'The newsroom had never been told about measurements at all. The field was added to the schema eight releases ago and its brief never gained a word about it, so the agent worked from raw JSON and wrote a 94-character qualifier against a limit of 60. It now has a section on what the block is for and, more usefully, why the one field that keeps failing is short.',
      'That field, `qualifier`, is a grouping key rather than a description. Two measurements are only compared when their qualifiers match exactly, so a long one describing the apparatus is unique to its own record and groups with nothing — which defeats the only reason it exists. Caltech’s 6,100 atoms trapped in a tweezer array and QuEra’s 448 operated below threshold are not the same measurement, and saying so is the whole job.',
      'The rule left behind: a schema change is not finished until every agent that writes that collection has been told what changed. The write scope, the stamping, the growth rule and the brief are four separate things.',
    ],
  },
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
]
