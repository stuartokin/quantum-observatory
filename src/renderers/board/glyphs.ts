import type { Glyph } from './tower'

/**
 * Celestial glyph drawing. Canvas paths, so the same forms can be rendered on
 * the board and in the actor legend without two implementations drifting apart.
 *
 * Each is drawn centred on (x, y) at radius r.
 */
export function drawGlyph(
  g: CanvasRenderingContext2D,
  glyph: Glyph,
  x: number,
  y: number,
  r: number,
  filled: boolean,
) {
  const stroke = () => (filled ? g.fill() : g.stroke())

  switch (glyph) {
    case 'star': {
      g.beginPath()
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 5
        const rad = i % 2 === 0 ? r * 1.25 : r * 0.5
        const px = x + Math.cos(a) * rad
        const py = y + Math.sin(a) * rad
        i === 0 ? g.moveTo(px, py) : g.lineTo(px, py)
      }
      g.closePath()
      stroke()
      break
    }

    case 'ringed': {
      g.beginPath()
      g.arc(x, y, r * 0.72, 0, Math.PI * 2)
      stroke()
      g.beginPath()
      g.ellipse(x, y, r * 1.5, r * 0.42, -0.42, 0, Math.PI * 2)
      g.stroke()
      break
    }

    case 'binary': {
      g.beginPath()
      g.arc(x - r * 0.6, y, r * 0.62, 0, Math.PI * 2)
      stroke()
      g.beginPath()
      g.arc(x + r * 0.72, y - r * 0.3, r * 0.38, 0, Math.PI * 2)
      stroke()
      break
    }

    case 'nova': {
      g.beginPath()
      g.arc(x, y, r * 0.42, 0, Math.PI * 2)
      stroke()
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4
        g.beginPath()
        g.moveTo(x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7)
        g.lineTo(x + Math.cos(a) * r * 1.45, y + Math.sin(a) * r * 1.45)
        g.stroke()
      }
      break
    }

    case 'crescent': {
      g.beginPath()
      g.arc(x, y, r, -0.9, 2.3)
      g.arc(x + r * 0.55, y - r * 0.2, r * 0.92, 2.0, -0.7, true)
      g.closePath()
      stroke()
      break
    }

    case 'cluster': {
      const pts: [number, number][] = [
        [0, -r * 0.85],
        [-r * 0.85, r * 0.55],
        [r * 0.85, r * 0.55],
      ]
      for (const [dx, dy] of pts) {
        g.beginPath()
        g.arc(x + dx, y + dy, r * 0.46, 0, Math.PI * 2)
        stroke()
      }
      break
    }

    case 'comet': {
      g.beginPath()
      g.arc(x + r * 0.35, y - r * 0.2, r * 0.6, 0, Math.PI * 2)
      stroke()
      g.beginPath()
      g.moveTo(x - r * 0.1, y + r * 0.15)
      g.lineTo(x - r * 1.6, y + r * 1.1)
      g.stroke()
      g.beginPath()
      g.moveTo(x - r * 0.35, y - r * 0.1)
      g.lineTo(x - r * 1.7, y + r * 0.3)
      g.stroke()
      break
    }

    case 'pulsar': {
      g.beginPath()
      g.arc(x, y, r * 0.4, 0, Math.PI * 2)
      stroke()
      for (const m of [0.85, 1.35]) {
        g.beginPath()
        g.arc(x, y, r * m, 0, Math.PI * 2)
        g.stroke()
      }
      break
    }
  }
}
