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
  {
    version: '0.41.0',
    date: '2026-08-11',
    headline: 'A record of what changed in the content, not just the code.',
    ui: [
      'Help gains "What changed in the data": every addition, sourcing, readiness move, machine check, confirmation and veto, grouped by day, most recent ten days. Derived from the content itself, so it cannot drift from what the board holds.',
      'The header statistics show when the site was last built. Front matter records dates but not times, so a change is dated to the day and the build time answers the other half of the freshness question.',
      'A new topic now appears in Journals. It only recorded an item once evidence was attached, so Scout adding three topics produced nothing at all — and the first anyone knew of them was seeing unfamiliar bodies on the board.',
      'The toolbar can no longer be dragged into a shape that is not a toolbar, and Reset puts it back where it started along with the frames.',
    ],
  },
  {
    version: '0.40.0',
    date: '2026-08-11',
    headline: 'The key explains both halves of the grammar, in both views.',
    ui: [
      'The key is available on the galaxy as well as the timeline, behind the same button. It had been drawn only on the timeline, so shape — what kind of organisation is behind a result — went undocumented on the view most people look at first.',
      'Hover a body and the key names the organisation in brackets beside its type. This existed but only inside the timeline key, which was closed by default and therefore invisible.',
      'A filter for the kind of organisation: university, national laboratory, standards body, company, consortium. An item with no actor recorded is never hidden by it — the filter asks who did the work, and silence is not an answer to disagree with.',
    ],
  },
  {
    version: '0.39.0',
    date: '2026-08-10',
    headline: 'Shape says what kind of organisation, not which one.',
    ui: [
      'Glyphs now carry organisation type — university, national laboratory, standards body, company, consortium — rather than a hash of the name. Eight shapes derived from spelling told a reader nothing; the kind of organisation behind a result is what actually bears on its weight, and the evidence rules already say so.',
      'Hover a body and the timeline key names the organisation in brackets beside its type, so the specific identity is still one glance away.',
      'The detail panel scrolls back to the top when you open a different item. Reading halfway down one entry and clicking another used to open the new one in the middle of itself.',
      'A comment written in the wrong form inside a JSX tag would have failed the build; found by a scan that now runs over every component.',
      'The board had been importing glyphFor from two different modules, and using the older one — so the new rules changed nothing on screen. tower.ts had a complete parallel glyph vocabulary: its own shape list, its own type, its own lookup. All three now come from one place.',
      'Two new build gates for faults type checking cannot see: no symbol exported from two modules, and no const used above its declaration. Both were written after making the mistake rather than before, which is the honest order.',
    ],
  },
  {
    version: '0.38.0',
    date: '2026-08-10',
    headline: 'Headlines on the timeline, and one organisation gets one shape.',
    ui: [
      'Headline satellites appear on the timeline at their own date, not beside the item they bear on — so several announcements about one development read as a sequence rather than a stack. A faint thread links each back to its item once there is room to draw one.',
      'The timeline key now documents the shapes as well as the colours. Half the visual grammar had gone unexplained.',
      'ETH Zürich, ETH Zurich and ETHZ were three organisations wearing three shapes. Actor names are normalised — diacritics, punctuation, legal suffixes and common aliases — before the shape is chosen.',
    ],
  },
  {
    version: '0.37.0',
    date: '2026-08-10',
    headline: 'The newsroom stops repeating itself, and starts finding things.',
    agents: [
      'The newsroom had never been shown its own back catalogue, so every run started from nothing and had no way to avoid duplication. It now gets every published headline with its date and subject, and a coverage-by-month table showing where the gaps are.',
      'Two duplicate gates: same source and similar wording fails the build; similar wording with different sources warns, because companion papers exist and failing on a guess trains people to ignore the check.',
      'Dates must record when something happened, never when it was found. One paper reached the board twice because the two runs dated it differently.',
      'A backfill method rather than a search: read one month of an aggregator archive and follow each item to its primary source, then sweep the journal tables of contents for the same month. One month per run — a year in one run produces eight items and the impression that eight is all there was.',
    ],
    ui: [
      'Headlines became a window rather than a strip: moveable, resizable, minimisable, switching between a rolling ticker and an archive grouped by year and month. Dragging it taller or shorter switches the view.',
      'Panel titles are clickable where there is something to say — the headline counts, their span, how many are verified and how many trace back to research.',
    ],
  },
  {
    version: '0.36.0',
    date: '2026-08-10',
    headline: 'Applications, and honest caveats.',
    agents: [
      'The newsroom now hunts deliberately for applications — named organisations using quantum systems for real problems, pilots, investment behind a specific application, sensing deployed in the field.',
      'It may publish an early-stage claim but never as a result. A funding round is evidence that investors believe something, which is a different fact from the technology working, and the item must say which it is.',
    ],
  },
  {
    version: '0.34.0',
    date: '2026-08-10',
    headline: 'The browser stops downloading a YAML parser.',
    ui: [
      'Content is parsed at build time by a Vite plugin. front-matter and js-yaml are gone from the bundle; the only runtime dependencies left are React and React DOM.',
      'The performance budget came down from 106 KB to 88, then learned to measure the entry chunk separately from code loaded on demand — it had been counting a code split as growth, which punished exactly the change it asked for.',
    ],
  },
]
