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

// Parse source into lines, each tagged with a note name or ''. A standalone comment above a block names
// every code line below it until a blank line, the next standalone comment, or a line with its own
// trailing comment. A trailing comment names just its own line.
function parseLines(source: string): DisplayLine[] {
  const out: DisplayLine[] = []
  let block = ''                                          // active note from a standalone comment above
  for (const raw of source.replace(/\n$/, '').split('\n')) {
    const trimmed = raw.trim()
    if (trimmed === '') { out.push({ code: raw, note: '' }); block = ''; continue }                 // blank ends a block

    if (trimmed.startsWith('//')) { block = trimmed.replace(/^\/+\s*/, ''); continue }               // // noteName
    const blockOnly = trimmed.match(/^\{\/\*\s*(.*?)\s*\*\/\}$/)
    if (blockOnly) { block = blockOnly[1]; continue }                                                 // {/* noteName */}

    let code = raw
    let trailing: string | null = null
    const b = raw.match(/\s*\{\/\*\s*(.*?)\s*\*\/\}\s*$/)                                              // trailing {/* */}
    if (b) { trailing = b[1]; code = raw.slice(0, b.index) }
    else {
      const i = lineCommentIndex(raw)                                                                 // trailing //
      if (i !== -1) { trailing = raw.slice(i + 2).trim(); code = raw.slice(0, i).replace(/\s+$/, '') }
    }

    if (trailing) { out.push({ code, note: trailing }); block = '' }                                  // single-line note, ends the block
    else { out.push({ code, note: block }) }                                                          // inherit the block note
  }
  return out
}

type Block = { line: string } | { group: number; note: string; lines: string[] }

// Highlight each line, then fold runs of consecutive lines that share a note into one block.
function groupBlocks(source: string): Block[] {
  const lines = parseLines(source).map((l) => ({
    note: l.note,
    html: l.code ? hljs.highlight(l.code, { language: 'typescript' }).value : '&nbsp;',
  }))
  const blocks: Block[] = []
  let group = -1
  let current: { group: number; note: string; lines: string[] } | null = null
  for (const l of lines) {
    if (l.note && current && current.note === l.note) { current.lines.push(l.html); continue }
    if (l.note) { group += 1; current = { group, note: l.note, lines: [l.html] }; blocks.push(current); continue }
    current = null
    blocks.push({ line: l.html })                         // a plain, non-hoverable line
  }
  return blocks
}

interface Tip {
  html: string
  top: number
  bottom: number
  left: number
}

interface CodeBlockProps {
  code: string
  notes?: Record<string, string>
}

export default function CodeBlock({ code, notes = {} }: CodeBlockProps) {
  // Parsing + highlighting is real work, so memoise it: only redo when `code` changes.
  const blocks = useMemo(() => groupBlocks(code), [code])

  const [tip, setTip] = useState<Tip | null>(null)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const [active, setActive] = useState(-1)                // which group is highlighted right now
  const tipRef = useRef<HTMLDivElement>(null)
  useEffect(() => { setTip(null); setActive(-1) }, [code]) // clear when we switch lessons

  const show = (e: MouseEvent<HTMLDivElement>, group: number, markdown: string) => {
    const r = e.currentTarget.getBoundingClientRect()     // the whole group's box in the viewport
    setActive(group)
    setTip({ html: marked.parse(markdown) as string, top: r.top, bottom: r.bottom, left: r.left })
    setPos(null)
  }
  const hide = () => { setActive(-1); setTip(null) }

  // Place the tooltip below the group or above it, keeping whichever sits more inside the viewport.
  useLayoutEffect(() => {
    const el = tipRef.current
    if (!tip || !el) return
    const gap = 6
    const { offsetHeight: h, offsetWidth: w } = el
    const vh = window.innerHeight
    const vw = window.innerWidth
    const visibleRatio = (top: number) => Math.max(0, Math.min(top + h, vh) - Math.max(top, 0)) / h // fraction on screen
    const below = tip.bottom + gap
    const above = tip.top - gap - h
    const top = visibleRatio(below) >= visibleRatio(above) ? below : above                           // prefer below on a tie
    setPos({ top, left: Math.max(8, Math.min(tip.left, vw - w - 8)) })                               // also clamp horizontally
  }, [tip])

  return (
    <div className="code hljs">
      {blocks.map((b, i) => {
        if ('line' in b) {                                // a plain line, not part of any note
          return <div key={i} className="code-line" dangerouslySetInnerHTML={{ __html: b.line }} />
        }
        const markdown = notes[b.note]                    // resolve the named note (missing -> not hoverable)
        const base = markdown ? 'code-group has-note' : 'code-group'
        return (
          <div
            key={i}
            className={b.group === active ? `${base} active` : base}
            onMouseEnter={markdown ? (e) => show(e, b.group, markdown) : undefined}
            onMouseLeave={markdown ? hide : undefined}
          >
            {b.lines.map((html, li) => (
              <div key={li} className="code-line" dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </div>
        )
      })}

      {tip && createPortal(                               // portal: the tooltip lives on <body>, immune to panel clipping
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
