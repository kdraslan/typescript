import { Children, Fragment, useRef, useState, type PointerEvent, type ReactNode } from 'react'

// A row of panels separated by draggable dividers, ported from the React training app.
// Each panel has a flex weight, and dragging a gutter shifts weight between its two neighbours.

const DEFAULT_MIN = 260 // Fallback minimum panel width in px.

interface ResizableGridProps {
  children: ReactNode
  minWidths?: number[]
  initialWeights?: number[]
}

export default function ResizableGrid({ children, minWidths = [], initialWeights }: ResizableGridProps) {
  const panels = Children.toArray(children)                    // normalise children (array/holes) into a clean array
  const containerRef = useRef<HTMLDivElement>(null)           // .current is the DOM node, typed as the element or null
  const [weights, setWeights] = useState<number[]>(
    () => panels.map((_, i) => initialWeights?.[i] ?? 1),     // lazy init: a weight per panel, runs once
  )
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null) // which gutter is active, null when idle

  const minOf = (i: number) => minWidths[i] ?? DEFAULT_MIN

  const startDrag = (i: number, e: PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return                                           // guard narrows el from `... | null` to the element
    e.preventDefault()                                        // stop the press starting a text selection

    const totalWeight = weights.reduce((a, b) => a + b, 0)
    const width = el.clientWidth
    const startX = e.clientX
    const startA = weights[i]                                 // capture both neighbours' weights at drag start
    const startB = weights[i + 1]
    const minWa = (minOf(i) / width) * totalWeight            // convert px minimums into weight minimums
    const minWb = (minOf(i + 1) / width) * totalWeight

    setDraggingIndex(i)
    document.body.style.userSelect = 'none'                   // no text selection mid-drag
    document.body.style.cursor = 'col-resize'                 // keep the resize cursor even off the gutter

    const onMove = (ev: globalThis.PointerEvent) => {
      const deltaW = ((ev.clientX - startX) / width) * totalWeight
      let a = startA + deltaW
      let b = startB - deltaW
      if (a < minWa) { b -= minWa - a; a = minWa }            // clamp to mins, pushing the slack to the sibling
      if (b < minWb) { a -= minWb - b; b = minWb }
      setWeights((prev) => {
        const next = [...prev]                                // copy, then set: never mutate state in place
        next[i] = a
        next[i + 1] = b
        return next
      })
    }

    const onUp = () => {
      setDraggingIndex(null)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
      window.removeEventListener('pointermove', onMove)       // clean up listeners
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <div ref={containerRef} className="rg-grid">
      {panels.map((panel, i) => (
        <Fragment key={i}>
          {/* flexGrow is the only truly dynamic style, so it lives inline; the rest is in CSS. */}
          <div className="rg-column" style={{ flexGrow: weights[i], minWidth: minOf(i) }}>
            {panel}
          </div>

          {i < panels.length - 1 && (                          // a gutter between panels, not after the last one
            <div
              className={draggingIndex === i ? 'rg-gutter dragging' : 'rg-gutter'}
              onPointerDown={(e) => startDrag(i, e)}
            >
              <span className="rg-line" />                      {/* top half of the divider line */}
              <span className="rg-dots"><i /><i /><i /></span>
              <span className="rg-line" />                      {/* bottom half */}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}
