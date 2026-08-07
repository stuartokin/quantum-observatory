import type { Glyph } from './tower'

/**
 * Bodies, not symbols.
 *
 * Each actor gets a class of world rather than an outline shape. Size carries
 * importance, a radial gradient gives the body volume and a consistent light
 * from the upper left, and the decoration (ring, moons, corona) identifies who
 * demonstrated it.
 *
 * Unsourced items are drawn as ghosts — a dashed limb with no fill, so they
 * read as "known about" rather than "asserted".
 */

function sphere(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  colour: string,
  lit: number,
) {
  const grad = g.createRadialGradient(x - r * 0.38, y - r * 0.4, r * 0.08, x, y, r)
  grad.addColorStop(0, mix(colour, '#FFFFFF', 0.55 * lit))
  grad.addColorStop(0.55, colour)
  grad.addColorStop(1, mix(colour, '#05070C', 0.62))
  g.fillStyle = grad
  g.beginPath()
  g.arc(x, y, r, 0, Math.PI * 2)
  g.fill()
}

/**
 * Accepts hex, shorthand hex or rgb(). The first version parsed hex only, and
 * mixed colours were being fed back into it — which produced rgb(NaN,NaN,NaN),
 * threw inside addColorStop, and killed the whole render loop at the first
 * body. Everything drawn after nodes simply vanished.
 */
function parse(c: string): [number, number, number] {
  if (c.startsWith('#')) {
    const h = c.length === 4 ? c.slice(1).split('').map((x) => x + x).join('') : c.slice(1)
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number]
  }
  const m = c.match(/-?\d+(\.\d+)?/g)
  return (m ? m.slice(0, 3).map(Number) : [255, 255, 255]) as [number, number, number]
}

function mix(a: string, b: string, t: number) {
  const [r1, g1, b1] = parse(a)
  const [r2, g2, b2] = parse(b)
  const c = (x: number, y: number) =>
    Math.max(0, Math.min(255, Math.round(x + (y - x) * t)))
  return `rgb(${c(r1, r2)},${c(g1, g2)},${c(b1, b2)})`
}

export function drawBody(
  g: CanvasRenderingContext2D,
  glyph: Glyph,
  x: number,
  y: number,
  r: number,
  colour: string,
  sourced: boolean,
) {
  g.save()

  if (!sourced) {
    // A cold, unlit world. Solid so it reads as a body, muted and small so it
    // never competes with sourced work. Dashed outlines at this size read as
    // dirt on the screen, not as evidence status.
    sphere(g, x, y, r * 0.68, mix(colour, '#4A5468', 0.6), 0.35)
    g.restore()
    return
  }

  switch (glyph) {
    case 'star': {
      // A small sun with a corona.
      const halo = g.createRadialGradient(x, y, r * 0.3, x, y, r * 2.4)
      halo.addColorStop(0, colour)
      halo.addColorStop(1, 'rgba(0,0,0,0)')
      g.globalAlpha *= 0.35
      g.fillStyle = halo
      g.beginPath()
      g.arc(x, y, r * 2.4, 0, Math.PI * 2)
      g.fill()
      g.globalAlpha /= 0.35
      sphere(g, x, y, r * 0.95, mix(colour, '#FFFFFF', 0.35), 1)
      break
    }

    case 'ringed': {
      sphere(g, x, y, r, colour, 1)
      g.strokeStyle = mix(colour, '#FFFFFF', 0.4)
      g.lineWidth = Math.max(1, r * 0.18)
      g.beginPath()
      g.ellipse(x, y, r * 1.85, r * 0.52, -0.42, 0, Math.PI * 2)
      g.stroke()
      break
    }

    case 'binary': {
      sphere(g, x - r * 0.5, y + r * 0.1, r * 0.82, colour, 1)
      sphere(g, x + r * 0.72, y - r * 0.42, r * 0.46, mix(colour, '#FFFFFF', 0.25), 1)
      break
    }

    case 'nova': {
      sphere(g, x, y, r * 0.8, mix(colour, '#FFFFFF', 0.2), 1)
      g.strokeStyle = colour
      g.lineWidth = 1
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 + 0.3
        g.globalAlpha *= 0.7
        g.beginPath()
        g.moveTo(x + Math.cos(a) * r * 1.15, y + Math.sin(a) * r * 1.15)
        g.lineTo(x + Math.cos(a) * r * 2.1, y + Math.sin(a) * r * 2.1)
        g.stroke()
        g.globalAlpha /= 0.7
      }
      break
    }

    case 'crescent': {
      sphere(g, x, y, r, colour, 0.4)
      g.globalCompositeOperation = 'destination-out'
      g.beginPath()
      g.arc(x + r * 0.62, y - r * 0.22, r * 0.92, 0, Math.PI * 2)
      g.fill()
      g.globalCompositeOperation = 'source-over'
      break
    }

    case 'cluster': {
      sphere(g, x, y + r * 0.15, r * 0.72, colour, 1)
      sphere(g, x - r * 0.95, y - r * 0.6, r * 0.36, mix(colour, '#FFFFFF', 0.2), 1)
      sphere(g, x + r * 0.9, y - r * 0.5, r * 0.3, mix(colour, '#FFFFFF', 0.2), 1)
      break
    }

    case 'comet': {
      const tail = g.createLinearGradient(x - r * 2.6, y + r * 1.7, x, y)
      tail.addColorStop(0, 'rgba(0,0,0,0)')
      tail.addColorStop(1, colour)
      g.strokeStyle = tail
      g.lineWidth = Math.max(1.2, r * 0.5)
      g.lineCap = 'round'
      g.beginPath()
      g.moveTo(x - r * 2.6, y + r * 1.7)
      g.lineTo(x, y)
      g.stroke()
      sphere(g, x, y, r * 0.72, mix(colour, '#FFFFFF', 0.3), 1)
      break
    }

    case 'pulsar': {
      sphere(g, x, y, r * 0.62, mix(colour, '#FFFFFF', 0.45), 1)
      g.strokeStyle = colour
      g.lineWidth = 1
      for (const m of [1.25, 1.85]) {
        g.globalAlpha *= 0.55
        g.beginPath()
        g.arc(x, y, r * m, 0, Math.PI * 2)
        g.stroke()
        g.globalAlpha /= 0.55
      }
      break
    }
  }

  g.restore()
}

/** Small outline version, for legends where a filled body would be too heavy. */
export function drawGlyph(
  g: CanvasRenderingContext2D,
  glyph: Glyph,
  x: number,
  y: number,
  r: number,
  colour: string,
) {
  drawBody(g, glyph, x, y, r, colour, true)
}
