import { useEffect, useState } from 'react'
import { lessons, type Lesson } from './lessons/registry.ts'  // every file in src/lessons becomes a lesson
import ResizableGrid from './components/ResizableGrid.tsx'    // the draggable split, ported from the React app
import CodeBlock from './components/CodeBlock.tsx'            // highlighted source with hover-note tooltips
import ThemeToggle from './components/ThemeToggle.tsx'        // fixed top-right light/dark switch

type Theme = 'dark' | 'light'                                 // a union type: the value is exactly one of these two

// The training shell is itself a small React + TypeScript app. The subject (types) shows up
// throughout: union types for the theme, a typed lesson registry, typed component props.

export default function App() {
  const [activeId, setActiveId] = useState<string>(lessons[0].id)
  const active = lessons.find((l) => l.id === activeId) ?? lessons[0] // find() can return undefined, so we fall back

  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme | null) ?? 'dark',  // narrow the string from storage to our union
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme           // sets <html data-theme>, which swaps the CSS variables
    localStorage.setItem('theme', theme)
  }, [theme])

  // Group lessons under their section heading for the sidebar, keeping file order.
  // Record<K, V> is the type of an object used as a map: section name -> its lessons.
  const sections = lessons.reduce<Record<string, Lesson[]>>((acc, lesson) => {
    ;(acc[lesson.section] ??= []).push(lesson)
    return acc
  }, {})

  return (
    <div className="app">
      <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />

      <aside className="sidebar">
        <h1>TypeScript Training</h1>
        {Object.entries(sections).map(([section, items]) => (
          <div key={section} className="nav-section">
            <h2>{section}</h2>
            {items.map((lesson) => (
              <button
                key={lesson.id}
                className={lesson.id === activeId ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveId(lesson.id)}
              >
                {lesson.title}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <main className="content">
        <header className="lesson-header">
          <h3>{active.title}</h3>
          <p className="summary">{active.summary}</p>
        </header>

        {/* Two panels with a draggable divider. They are passed as children so they keep a stable
            element identity: dragging updates ResizableGrid's own state, and React skips re-rendering
            these subtrees (the demo and the highlighter) because their elements didn't change. */}
        <ResizableGrid minWidths={[300, 300]} initialWeights={[1, 1]}>
          <section className="panel">
            <span className="panel-label">Live result</span>
            <div className="demo">
              <active.Component />                            {/* render the lesson's exported demo component */}
            </div>
          </section>

          <section className="panel">
            <span className="panel-label">Source · hover a line for its explanation</span>
            <CodeBlock code={active.source} notes={active.notes} />
          </section>
        </ResizableGrid>
      </main>
    </div>
  )
}
