import { useCallback, useState, type ReactNode } from 'react'

/**
 * A HOVER LAYER FOR SVG CHARTS.
 *
 * An SVG `<title>` is a tooltip in the sense that it eventually appears, after
 * a delay, in the operating system's styling, out of reach of the page — and
 * on a touchscreen not at all. Charts on this surface carry real detail behind
 * each mark (which paper, which date, which qualifier), so they get a real
 * layer.
 *
 * Positioned against the figure rather than the viewport, so it travels with
 * the chart when the page scrolls, and flipped to the left when it would
 * otherwise run off the right-hand edge.
 */
export interface TipState {
  x: number
  y: number
  content: ReactNode
}

export function useTooltip() {
  const [tip, setTip] = useState<TipState | null>(null)

  /** Pass the SVG element's own bounding box so coordinates land in CSS
   *  pixels rather than viewBox units — the two differ whenever the chart is
   *  responsive, which is always. */
  const show = useCallback((e: React.MouseEvent | React.FocusEvent, content: ReactNode) => {
    const host = (e.currentTarget as SVGElement).ownerSVGElement ?? (e.currentTarget as SVGElement)
    const box = host.getBoundingClientRect()
    const point =
      'clientX' in e
        ? { x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY }
        : (() => {
            const r = (e.currentTarget as SVGElement).getBoundingClientRect()
            return { x: r.left + r.width / 2, y: r.top }
          })()
    setTip({ x: point.x - box.left, y: point.y - box.top, content })
  }, [])

  const hide = useCallback(() => setTip(null), [])

  return { tip, show, hide }
}

export function ChartTooltip({ tip, width }: { tip: TipState | null; width?: number }) {
  if (!tip) return null
  // Flip left when close to the right edge, so the panel stays on the chart.
  const flip = typeof width === 'number' && tip.x > width * 0.6
  return (
    <div
      className="qd-tip"
      style={{
        left: tip.x,
        top: tip.y,
        transform: `translate(${flip ? 'calc(-100% - 14px)' : '14px'}, -50%)`,
      }}
      role="status"
    >
      {tip.content}
    </div>
  )
}
