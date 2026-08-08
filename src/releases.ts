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
 * Written by hand, deliberately. A changelog generated from commit messages
 * records what was touched; this records what changed for someone using the
 * thing, which is a different question and the only one worth answering here.
 *
 * Content figures are counted live from the board rather than written down —
 * see the Help panel. A number typed into a changelog is wrong within a week.
 */
export const RELEASES: Release[] = [
  {
    version: '0.22.1',
    date: '2026-08-08',
    headline: 'A source register, and a hard limit on what reaches you.',
    agents: [
      'Shared source register at agents/_sources.md — six tiers, from arXiv and the journals through standards bodies to discovery indexes that are never citable. Read into every agent at run time, so one file governs all four.',
      'Major vendors reinstated. An earlier instruction told Scout not to lead with IBM, Google, Microsoft, Quantinuum or IonQ — which would have had it skipping Willow in Nature and the qLDPC memory in Nature. The source type sets the evidence level, never the author.',
      'Replaced by a coverage requirement instead: at least half of each run must come from outside those five.',
      'The reviewer may escalate at most three items per run. Enforced in the runner, not only asked for — if more qualify it ranks them and reports how many it suppressed.',
    ],
  },
  {
    version: '0.22.0',
    date: '2026-08-08',
    headline: 'A fourth agent, to keep the review queue off your desk.',
    agents: [
      'Reviewer agent: opens the sources behind published items and checks the claim against them, the evidence level against the source type, and the readiness against the evidence.',
      'It may correct downward on its own judgement and never upward. Anything that would make the board more confident is escalated instead.',
      'New provenance state agent-reviewed — "checked by a machine, not read by a person". It still counts toward the unreviewed figure, because it is not review.',
      'All prompts seeded with verified sources, including Gidney arXiv:2505.15917 — RSA-2048 in under a million noisy qubits, against 20 million in 2019.',
    ],
  },
  {
    version: '0.21.0',
    date: '2026-08-08',
    headline: 'Filters gathered into one place.',
    ui: [
      'Actors folded into the filters window as a fifth section, multi-select with its own All and None, each shown with its glyph.',
      'Every filter group now has independent All and None. Clearing constellations no longer clears readiness and years with it.',
      'The timeline key moved to a real button over the plot. The canvas-drawn version could not be inspected and twice could not be found.',
    ],
  },
  {
    version: '0.20.0',
    date: '2026-08-08',
    headline: 'Colour by constellation, and a filter for time.',
    ui: [
      'Nine hues across a narrow arc from blue-violet to magenta, with alternating lightness so neighbouring lanes differ in two dimensions. Importance is carried by size and brightness, never hue.',
      'Year filter, so removing time frees the board.',
      'Timeline marks scale by evidence level and priority — discrete fields that actually spread, rather than a blended score where everything lands above 0.7.',
      'Both views zoom out to a fit-to-frame floor. No scrollbars.',
    ],
  },
  {
    version: '0.19.0',
    date: '2026-08-08',
    headline: 'The board becomes a workspace.',
    ui: [
      'Galaxy and timeline live in a frame that moves, resizes and minimises. Zoom and pinch still work inside it.',
      'Three frames on a wide screen: galaxy dominant, What changed and News beside it.',
      'What changed is a live rotating miniature of whichever constellation moved most. Click to open it full size.',
      'News derived from the board itself rather than authored separately, so it cannot drift out of step with what the board shows.',
      'Q-Day in three places: the header, a caption on the galaxy, and a shaded band across the actual years on the timeline.',
      'Constellation orbits drift slowly when idle. A body you drag eases back into its orbit over about eight seconds.',
    ],
  },
  {
    version: '0.18.0',
    date: '2026-08-08',
    headline: 'Reviewing made possible in one click.',
    agents: [
      'Review workflow: mark items reviewed, or veto them with a reason, from the Actions tab. Confirming keeps the agent provenance rather than erasing it; vetoing archives rather than deletes.',
      'Applications added as a ninth constellation. It had been named in the agent prompts but never existed on the board.',
      'Constellation constrained to nine known values — a typo used to place an item in the wrong lane silently.',
    ],
  },
  {
    version: '0.17.0',
    date: '2026-08-08',
    headline: 'Provenance made visible.',
    ui: [
      'Unreviewed items carry a dashed amber ring on the board and the timeline. The panel label alone was not enough for someone scanning.',
      'Review debt in the header: how many entries nobody has read, and how long since anyone did.',
      'Q-Day impact and its reasoning shown on the item.',
    ],
    agents: [
      'A fourth CI gate: every item must declare whether a human has read it, an agent may never claim that it did, and neither may touch anything naming Ofgem, a live consultation or a regulatory position.',
    ],
  },
  {
    version: '0.16.0',
    date: '2026-08-08',
    headline: 'A third agent, for depth rather than breadth.',
    agents: [
      'Sourcer: attaches primary sources to items already on the board. Run by hand as a campaign, not on a schedule.',
      'Told explicitly that failing to find a source is a result worth reporting — a weak citation on a significant item is worse than an honest gap.',
    ],
  },
  {
    version: '0.15.0',
    date: '2026-08-08',
    headline: 'Publish first, veto after.',
    agents: [
      'Agents merge and publish without waiting for review. With five galaxies, review-before-merge is about three hours a week, and a queue you stop reading is worse than no agents.',
      'Every item declares its provenance, and an agent cannot write the state that means a person read it.',
    ],
  },
  {
    version: '0.14.0',
    date: '2026-08-08',
    headline: 'The agent layer.',
    agents: [
      'Scout and Verifier, a generic runner, and evidence levels E0–E5 replacing a single confidence field.',
      'Priority P0–P4 set by one test: if this were true and it scaled, what assumption would have to change?',
    ],
  },
]
