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
  {
    version: '0.33.0',
    date: '2026-08-10',
    headline: 'A news collection, kept separate from the board.',
    ui: [
      'Headlines are a distinct content type that points at the board rather than being part of it. A stream of announcements allowed to move a readiness map is what the map exists to resist.',
      'Every item carries a validation block saying what was actually checked, and the research behind it where that could be traced.',
    ],
  },
  {
    version: '0.29.0',
    date: '2026-08-10',
    headline: 'Bodies become lit worlds.',
    ui: [
      'Glyphs rewritten as spheres with a single light source across the whole board — a base gradient toward the light, a terminator, and a rim light on the shadowed limb. Consistent lighting is most of what separates a field of spheres from a field of discs.',
      'Rings draw in two halves so the planet sits between them; a comet tail points away from the light as a real one points away from the sun.',
      'Constellation names moved into a reserved band with its own backing, and item labels are excluded from it. Staggering onto two rows was never going to hold while labels could print into the same region.',
    ],
  },
  {
    version: '0.25.0',
    date: '2026-08-09',
    headline: 'Precedents, so a question answered once is not asked again.',
    agents: [
      'agents/_decisions.md holds every settled question and is read by all five agents before anything escalates. Vendor documents are E2 whatever their legal status; reviews cap at E3; downward corrections need no permission.',
      'That last rule was an over-restriction of mine: corrections to human-reviewed items were escalating even when the agent had already reached the right answer.',
    ],
  },
  {
    version: '0.23.0',
    date: '2026-08-09',
    headline: 'Help becomes the record.',
    ui: [
      'Eleven collapsible sections with expand all. The design log, operating guide, agent plan, source register and all agent prompts render from source rather than from copies, so they cannot drift.',
      'A decision record derived from the board itself: every readiness change, downward correction and veto, tagged with who settled it.',
      'Content statistics counted live rather than written into a changelog, where a number is wrong within a week.',
    ],
  },
]
