import { create } from 'zustand'
import type { Pillar } from '../content/types'
import type { InputClass, QualityTier } from '../worlds/types'
import { defaultWorld } from '../worlds'

type Renderer = 'board' | 'document' | 'world'

interface SiteState {
  renderer: Renderer
  world: string
  pillars: Pillar[]          // empty = all
  selected: string | null
  input: InputClass
  tier: QualityTier['name']
  reducedMotion: boolean

  setRenderer: (r: Renderer) => void
  setWorld: (id: string) => void
  togglePillar: (p: Pillar) => void
  select: (id: string | null) => void
  setInput: (i: InputClass) => void
  setTier: (t: QualityTier['name']) => void
}

/**
 * The board is the default. It is Canvas 2D, so it costs kilobytes, not the
 * 280KB of a 3D engine. The worlds stay opt-in and lazy.
 */
export const useSite = create<SiteState>((set) => ({
  renderer: 'board',
  world: defaultWorld,
  pillars: [],
  selected: null,
  input: 'pointer',
  tier: 'medium',
  reducedMotion:
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  setRenderer: (renderer) => set({ renderer }),
  setWorld: (world) => set({ world }),
  togglePillar: (p) =>
    set((s) => ({
      pillars: s.pillars.includes(p) ? s.pillars.filter((x) => x !== p) : [...s.pillars, p],
    })),
  select: (selected) => set({ selected }),
  setInput: (input) => set({ input }),
  setTier: (tier) => set({ tier }),
}))
