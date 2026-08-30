import type { Pillar } from './content/types'

/*
 * Pillar is domain vocabulary and lives with the content model. This module
 * decides what each one looks like, not which ones exist.
 *
 * Both files used to declare it, so the two definitions were free to drift
 * apart without anything noticing. Not re-exported here: nothing imported it
 * from this module, and a second door into one room is how the confusion
 * started.
 */

/**
 * A pillar is a real emission line. One pillar, one line: quantum takes the
 * violet mercury line at 435.8 nm, and that is the colour of every mark on the
 * board's canvas.
 *
 * The four retired lines were H-beta 486.1 (materials), O III 500.7 (cyber),
 * Na D 589.0 (AI) and H-alpha 656.3 (energy). **O III is still in the
 * stylesheet as `--line-quantum` and is the product's chrome accent** — the
 * teal in the header, the dock and the Q-Day surface. The token name and the
 * wavelength it refers to have disagreed since the two files were written, and
 * renaming it now would touch every stylesheet for no gain. Chrome teal, data
 * violet, and they are deliberately different so a coloured mark on a chart
 * always means something about the data.
 */
export const PILLAR_SPECTRUM: Record<Pillar, { nm: number; colour: string; line: string }> = {
  quantum: { nm: 435, colour: '#A77BFF', line: 'Hg 435.8' },
}

export const PILLAR_ORDER: Pillar[] = ['quantum']
