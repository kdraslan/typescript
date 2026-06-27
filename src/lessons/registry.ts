import type { ComponentType } from 'react'

// Each lesson is a folder ("01 - Types") holding one demo component file plus a notes/ folder of
// markdown files. Vite scans all three globs at build time, so adding a folder is enough, no wiring.

// The shape every lesson file must export. Demo files are checked against this, so a typo in `meta`
// is a compile error, not a runtime surprise. (That is the course's whole pitch, applied to itself.)
export interface LessonMeta {
  section: string
  title: string
  summary: string
}

interface LessonModule {
  meta: LessonMeta
  default: ComponentType                                       // the demo component, default-exported
}

export interface Lesson extends LessonMeta {
  id: string
  Component: ComponentType
  source: string                                              // raw demo text, shown beside the result
  notes: Record<string, string>                              // { noteName: markdown } for the hover tooltips
}

const modules = import.meta.glob<LessonModule>('./*/*.tsx', { eager: true })                           // the demo module
const sources = import.meta.glob<string>('./*/*.tsx', { eager: true, query: '?raw', import: 'default' }) // its source as text
const noteFiles = import.meta.glob<string>('./*/notes/*.md', { eager: true, query: '?raw', import: 'default' }) // markdown notes

export const lessons: Lesson[] = Object.keys(modules)
  .sort()                                                     // folder prefixes (01, 02, ...) keep order
  .map((path) => {
    const id = path.split('/')[1]                             // './01 - Types/types.tsx' -> '01 - Types'
    const mod = modules[path]

    const prefix = `./${id}/notes/`                           // collect this lesson's notes, keyed by filename
    const notes: Record<string, string> = {}
    for (const notePath of Object.keys(noteFiles)) {
      if (notePath.startsWith(prefix)) {
        notes[notePath.slice(prefix.length, -'.md'.length)] = noteFiles[notePath] // 'narrowing' -> markdown text
      }
    }

    return {
      id,
      title: mod.meta.title,                                  // each demo exports a `meta` object
      section: mod.meta.section,
      summary: mod.meta.summary,
      Component: mod.default,                                 // each demo default-exports its component
      source: sources[path],                                 // raw demo text, shown beside the result
      notes,                                                  // { noteName: markdown } for the hover tooltips
    }
  })
