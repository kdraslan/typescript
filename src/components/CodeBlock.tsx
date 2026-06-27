import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'                  // renders the tooltip into <body> so overflow never clips it
import { marked } from 'marked'                           // tiny markdown -> HTML, so note files render rich
import hljs from 'highlight.js/lib/core'                  // core only (lean), then register just the language we need
import typescript from 'highlight.js/lib/languages/typescript'

hljs.registerLanguage('typescript', typescript)          // the TS grammar also handles the TSX tags in demos
// Token colours are defined in styles.css against theme variables, so highlighting follows the light/dark theme.

// Index of a `//` that begins a real comment (skips strings and the // in https://), else -1.
function lineCommentIndex(s: string): number {
  let inStr: string | null = null
  for (let i = 0; i < s.length - 1; i++) {
    const c = s[i]
    if (inStr) { if (c === inStr && s[i - 1] !== '\\') inStr = null; continue }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue }
    if (c === '/' && s[i + 1] === '/' && s[i - 1] !== ':') return i
  }
  return -1
}

interface DisplayLine {
  code: string
  note: string
}

// Parse source into display lines. A comment is a NOTE NAME, not prose: a trailing reference, or the
// standalone comment line above a statement, names the markdown note to show on hover.
function parseLines(source: string): DisplayLine[] {
  const out: DisplayLine[] = []
  let pending: string[] = []                              // a standalone note name waiting for the next code line

  for (const raw of source.replace(/\n$/, '').split('\n')) {
    const trimmed = raw.trim()

    if (trimmed.startsWith('//')) { pending.push(trimmed.replace(/^\/+\s*/, '')); continue }        // // noteName
    const blockOnly = trimmed.match(/^\{\/\*\s*(.*?)\s*\*\/\}$/)
    if (blockOnly) { pending.push(blockOnly[1]); continue }                                          // {/* noteName */}

    let code = raw
    let ref: string | null = null
    const block = raw.match(/\s*\{\/\*\s*(.*?)\s*\*\/\}\s*$/)                                         // trailing {/* */}
    if (block) { ref = block[1]; code = raw.slice(0, block.index) }
    else {
      const i = lineCommentIndex(raw)                                                                // trailing //
      if (i !== -1) { ref = raw.slice(i + 2).trim(); code = raw.slice(0, i).replace(/\s+$/, '') }
    }

    const refs = [...pending, ref].filter(Boolean) as string[]
    out.push({ code, note: refs[refs.length - 1] ?? '' })  // a trailing ref wins over a standalone one
    pending = []
  }
  return out
}

interface Tip {
  html: string
  lineTop: number
  lineBottom: number
  left: number
}

interface CodeBlockProps {
  code: string
  notes?: Record<string, string>
}

export default function CodeBlock({ code, notes = {} }: CodeBlockProps) {
  // Parsing + highlighting is real work, so memoise it: only redo when `code` changes,
  // not when a parent re-renders or when the tooltip moves.
  const lines = useMemo(
    () => parseLines(code).map((l) => ({
      ...l,
      html: l.code ? hljs.highlight(l.code, { language: 'typescript' }).value : '&nbsp;',
    })),
    [code],
  )

  const [tip, setTip] = useState<Tip | null>(null)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null) // resolved spot, set after we measure
  const tipRef = useRef<HTMLDivElement>(null)
  useEffect(() => setTip(null), [code])                   // clear it when we switch lessons

  const show = (e: MouseEvent<HTMLDivElement>, markdown: string) => {
    const r = e.currentTarget.getBoundingClientRect()     // the hovered line's box in the viewport
    setTip({ html: marked.parse(markdown) as string, lineTop: r.top, lineBottom: r.bottom, left: r.left })
    setPos(null)                                          // hide until we've measured and chosen a side
  }

  // Once the tooltip has rendered we know its size. Place it below the line and above it, then keep
  // whichever sits more inside the viewport. useLayoutEffect runs before paint, so no visible flicker.
  useLayoutEffect(() => {
    const el = tipRef.current
    if (!tip || !el) return
    const gap = 6
    const { offsetHeight: h, offsetWidth: w } = el
    const vh = window.innerHeight
    const vw = window.innerWidth
    const visibleRatio = (top: number) => Math.max(0, Math.min(top + h, vh) - Math.max(top, 0)) / h // fraction on screen
    const below = tip.lineBottom + gap
    const above = tip.lineTop - gap - h
    const top = visibleRatio(below) >= visibleRatio(above) ? below : above                          // prefer below on a tie
    setPos({ top, left: Math.max(8, Math.min(tip.left, vw - w - 8)) })                              // also clamp horizontally
  }, [tip])

  return (
    <div className="code hljs">
      {lines.map((l, i) => {
        const markdown = l.note ? notes[l.note] : null    // resolve the named note's markdown (missing -> not hoverable)
        return (
          <div
            key={i}
            className={markdown ? 'code-line has-note' : 'code-line'}
            onMouseEnter={markdown ? (e) => show(e, markdown) : undefined}
            onMouseLeave={markdown ? () => setTip(null) : undefined}
            dangerouslySetInnerHTML={{ __html: l.html }}  // trusted (our own source), so injecting HTML is safe here
          />
        )
      })}

      {tip && createPortal(                               // portal: the tooltip lives on <body>, immune to panel clipping
        // rendered hidden (but measurable) until useLayoutEffect picks a side, then shown at the chosen spot
        <div
          ref={tipRef}
          className="code-tip"
          style={pos ? { left: pos.left, top: pos.top } : { left: 0, top: 0, visibility: 'hidden' }}
          dangerouslySetInnerHTML={{ __html: tip.html }}  // rendered markdown from the note file
        />,
        document.body,
      )}
    </div>
  )
}
