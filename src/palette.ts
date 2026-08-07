export type Pillar = 'ai' | 'quantum' | 'materials' | 'energy' | 'cyber'

/**
 * Each pillar is a real emission line, and the five appear in wavelength order
 * wherever they are shown together. Quantum takes the violet line.
 */
export const PILLAR_SPECTRUM: Record<Pillar, { nm: number; colour: string; line: string }> = {
  quantum:   { nm: 435, colour: '#A77BFF', line: 'Hg 435.8' },
  materials: { nm: 486, colour: '#5B8CFF', line: 'H-beta 486.1' },
  cyber:     { nm: 501, colour: '#3DE0C0', line: 'O III 500.7' },
  ai:        { nm: 589, colour: '#FFB020', line: 'Na D 589.0' },
  energy:    { nm: 656, colour: '#FF5A47', line: 'H-alpha 656.3' },
}

export const PILLAR_ORDER: Pillar[] = ['quantum', 'materials', 'cyber', 'ai', 'energy']
