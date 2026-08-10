import { useEffect, useRef } from 'react'
import { drawGlyph, type Glyph } from '../renderers/board/glyphs'

/** A single glyph at legend size. Shared by the board and the Help panel. */
export function GlyphMark({ glyph, colour }: { glyph: Glyph; colour: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = 20 * dpr
    c.height = 20 * dpr
    const g = c.getContext('2d')!
    g.setTransform(dpr, 0, 0, dpr, 0, 0)
    g.lineWidth = 1.1
    drawGlyph(g, glyph, 10, 10, 5, colour)
  }, [glyph, colour])
  return <canvas ref={ref} style={{ width: 20, height: 20, flex: '0 0 auto' }} aria-hidden="true" />
}
