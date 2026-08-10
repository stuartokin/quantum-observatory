export type Glyph =
  | 'star'
  | 'ringed'
  | 'binary'
  | 'nova'
  | 'crescent'
  | 'cluster'
  | 'comet'
  | 'pulsar'

export const GLYPHS: Glyph[] = [
  'star',
  'ringed',
  'binary',
  'nova',
  'crescent',
  'cluster',
  'comet',
  'pulsar',
]

/** Stable across runs, so an organisation keeps its shape. */
export function glyphFor(actor: string): Glyph {
  let h = 2166136261
  for (let i = 0; i < actor.length; i++) {
    h ^= actor.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return GLYPHS[(h >>> 0) % GLYPHS.length]
}

/**
 * Lighting.
 *
 * Every body is lit from the upper left, at a fixed angle across the whole
 * board. A consistent light source is most of what separates a field of
 * spheres from a field of discs — the eye reads depth from shading long before
 * it reads anything else, and inconsistent lighting reads as flatness however
 * carefully each individual body is drawn.
 */
const LIGHT_X = -0.34
const LIGHT_Y = -0.38

function hslParts(colour: string): { h: number; s: number; l: number } | null {
  const m = colour.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/)
  return m ? { h: +m[1], s: +m[2], l: +m[3] } : null
}

/** Shift a colour's lightness while keeping its hue, whatever notation it uses. */
function shade(colour: string, dl: number, alpha = 1): string {
  const p = hslParts(colour)
  if (p) {
    const l = Math.max(2, Math.min(97, p.l + dl))
    return `hsl(${p.h} ${p.s}% ${l}% / ${alpha})`
  }
  return colour
}

/**
 * A lit sphere.
 *
 * Three layers: a base gradient offset toward the light, a terminator that
 * darkens the far limb, and a narrow rim light on the shadowed edge. The rim
 * is the detail that makes it read as a sphere in front of something rather
 * than a circle drawn on it — real bodies catch light from the surrounding
 * field, and without it the dark edge dissolves into the background.
 */
function sphere(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  colour: string,
  lit: boolean,
) {
  const lx = x + r * LIGHT_X
  const ly = y + r * LIGHT_Y

  const body = g.createRadialGradient(lx, ly, r * 0.05, x, y, r)
  if (lit) {
    body.addColorStop(0, shade(colour, 22))
    body.addColorStop(0.45, colour)
    body.addColorStop(1, shade(colour, -26))
  } else {
    body.addColorStop(0, shade(colour, 8))
    body.addColorStop(0.5, shade(colour, -6))
    body.addColorStop(1, shade(colour, -22))
  }
  g.fillStyle = body
  g.beginPath()
  g.arc(x, y, r, 0, Math.PI * 2)
  g.fill()

  if (r < 2.2) return

  // Terminator — the shadowed side, offset away from the light.
  const term = g.createRadialGradient(
    x - r * LIGHT_X * 1.5,
    y - r * LIGHT_Y * 1.5,
    r * 0.2,
    x,
    y,
    r * 1.05,
  )
  term.addColorStop(0, 'rgba(4,7,14,0.42)')
  term.addColorStop(1, 'rgba(4,7,14,0)')
  g.fillStyle = term
  g.beginPath()
  g.arc(x, y, r, 0, Math.PI * 2)
  g.fill()

  // Rim light along the shadowed limb.
  g.save()
  g.beginPath()
  g.arc(x, y, r, 0, Math.PI * 2)
  g.clip()
  g.globalAlpha = lit ? 0.5 : 0.28
  g.strokeStyle = shade(colour, 30)
  g.lineWidth = Math.max(0.7, r * 0.16)
  g.beginPath()
  g.arc(x - r * LIGHT_X * 0.22, y - r * LIGHT_Y * 0.22, r * 0.96, 0, Math.PI * 2)
  g.stroke()
  g.restore()

  // A small specular highlight, only where there is room for it to read.
  if (r > 4 && lit) {
    const spec = g.createRadialGradient(lx, ly, 0, lx, ly, r * 0.42)
    spec.addColorStop(0, 'rgba(255,255,255,0.34)')
    spec.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = spec
    g.beginPath()
    g.arc(lx, ly, r * 0.42, 0, Math.PI * 2)
    g.fill()
  }
}

/** A ring, drawn in two halves so the body sits between them. */
function ring(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  colour: string,
  behind: boolean,
) {
  const rx = r * 2.05
  const ry = r * 0.62
  const tilt = -0.32

  g.save()
  g.translate(x, y)
  g.rotate(tilt)
  g.globalAlpha = behind ? 0.42 : 0.85
  g.strokeStyle = shade(colour, behind ? -6 : 16)
  g.lineWidth = Math.max(0.8, r * 0.17)
  g.beginPath()
  g.ellipse(0, 0, rx, ry, 0, behind ? Math.PI : 0, behind ? Math.PI * 2 : Math.PI)
  g.stroke()

  // An inner strand, so the ring reads as a band rather than a wire.
  if (r > 3.5) {
    g.globalAlpha = behind ? 0.2 : 0.4
    g.lineWidth = Math.max(0.5, r * 0.07)
    g.beginPath()
    g.ellipse(0, 0, rx * 0.82, ry * 0.8, 0, behind ? Math.PI : 0, behind ? Math.PI * 2 : Math.PI)
    g.stroke()
  }
  g.restore()
  g.globalAlpha = 1
}

/**
 * Draw a body.
 *
 * `lit` distinguishes a sourced item from an unsourced one: a sourced body is
 * a lit world, an unsourced one is cold and unlit. That difference has to
 * survive at four pixels, which is why it is carried by shading rather than by
 * any added mark.
 */
export function drawBody(
  g: CanvasRenderingContext2D,
  glyph: Glyph,
  x: number,
  y: number,
  r: number,
  colour: string,
  lit: boolean,
) {
  const a = g.globalAlpha

  switch (glyph) {
    case 'ringed': {
      ring(g, x, y, r, colour, true)
      g.globalAlpha = a
      sphere(g, x, y, r, colour, lit)
      g.globalAlpha = a
      ring(g, x, y, r, colour, false)
      break
    }

    case 'binary': {
      // A pair, the companion smaller and further from the light.
      sphere(g, x + r * 0.52, y + r * 0.3, r * 0.58, colour, lit)
      g.globalAlpha = a
      sphere(g, x - r * 0.34, y - r * 0.2, r * 0.82, colour, lit)
      break
    }

    case 'nova': {
      // Rays first, so the body sits on top of them.
      g.save()
      g.translate(x, y)
      g.globalAlpha = a * (lit ? 0.55 : 0.3)
      g.strokeStyle = shade(colour, 18)
      g.lineWidth = Math.max(0.6, r * 0.13)
      g.lineCap = 'round'
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2 + 0.2
        const inner = r * 1.15
        const outer = r * (i % 2 === 0 ? 2.1 : 1.6)
        g.beginPath()
        g.moveTo(Math.cos(ang) * inner, Math.sin(ang) * inner)
        g.lineTo(Math.cos(ang) * outer, Math.sin(ang) * outer)
        g.stroke()
      }
      g.restore()
      g.globalAlpha = a
      sphere(g, x, y, r * 0.86, colour, lit)
      break
    }

    case 'crescent': {
      // A sphere with a bite taken from the lit side, so it reads as phase
      // rather than as a shape.
      sphere(g, x, y, r, colour, lit)
      g.save()
      g.globalCompositeOperation = 'destination-out'
      g.beginPath()
      g.arc(x + r * 0.52, y - r * 0.3, r * 0.92, 0, Math.PI * 2)
      g.fill()
      g.restore()
      g.globalAlpha = a * 0.7
      g.strokeStyle = shade(colour, 26)
      g.lineWidth = Math.max(0.6, r * 0.1)
      g.beginPath()
      g.arc(x, y, r, 0, Math.PI * 2)
      g.stroke()
      break
    }

    case 'cluster': {
      const pts: [number, number, number][] = [
        [-0.55, -0.32, 0.46],
        [0.5, -0.12, 0.4],
        [-0.06, 0.5, 0.52],
        [0.24, -0.6, 0.3],
      ]
      for (const [dx, dy, s] of pts) {
        g.globalAlpha = a
        sphere(g, x + dx * r * 1.2, y + dy * r * 1.2, r * s, colour, lit)
      }
      break
    }

    case 'comet': {
      // The tail points away from the light, as a real one points away from
      // the sun.
      const tx = -LIGHT_X
      const ty = -LIGHT_Y
      const tail = g.createLinearGradient(x, y, x + tx * r * 4.4, y + ty * r * 4.4)
      tail.addColorStop(0, shade(colour, 10, lit ? 0.5 : 0.24))
      tail.addColorStop(1, shade(colour, 0, 0))
      g.fillStyle = tail
      g.beginPath()
      g.moveTo(x - ty * r * 0.72, y + tx * r * 0.72)
      g.lineTo(x + tx * r * 4.4, y + ty * r * 4.4)
      g.lineTo(x + ty * r * 0.72, y - tx * r * 0.72)
      g.closePath()
      g.fill()
      g.globalAlpha = a
      sphere(g, x, y, r * 0.82, colour, lit)
      break
    }

    case 'pulsar': {
      // Two beams and a tight core.
      g.save()
      g.translate(x, y)
      g.rotate(-0.5)
      for (const dir of [-1, 1]) {
        const beam = g.createLinearGradient(0, 0, 0, dir * r * 3.2)
        beam.addColorStop(0, shade(colour, 20, lit ? 0.42 : 0.2))
        beam.addColorStop(1, shade(colour, 0, 0))
        g.fillStyle = beam
        g.beginPath()
        g.moveTo(-r * 0.3, 0)
        g.lineTo(0, dir * r * 3.2)
        g.lineTo(r * 0.3, 0)
        g.closePath()
        g.fill()
      }
      g.restore()
      g.globalAlpha = a
      sphere(g, x, y, r * 0.7, colour, lit)
      break
    }

    default:
      sphere(g, x, y, r, colour, lit)
  }

  g.globalAlpha = a
}

/** The same shapes, flat and small, for legends and keys. */
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
