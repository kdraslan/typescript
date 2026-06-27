import type { LessonMeta } from '../registry.ts'
import magnitude, { add, PI } from './mathKit.ts' // imports
import type { Vector } from './mathKit.ts' // typeOnlyImport

export const meta: LessonMeta = {
  section: '3 · Type System Tools',
  title: 'Modules & Declaration Files',
  summary: 'Each file is a module: what it exports is its public surface. Types cross module boundaries like values, and .d.ts files describe code that has no types of its own.',
}

const a: Vector = { x: 3, y: 4 } // sharedType
const b: Vector = { x: 1, y: 2 }

const sum = add(a, b) // namedExport
const mag = magnitude(a) // defaultExport

const parsed = JSON.parse('{"x":1,"y":2}') as Vector // declarationFiles

export default function Demo() {
  return (
    <div>
      <h4>Imported from ./mathKit.ts</h4>
      <div className="rows">
        <div className="row"><span className="k">PI (named)</span><span className="v">{PI}</span></div>
        <div className="row"><span className="k">add(a, b) (named)</span><span className="v">{`{ x: ${sum.x}, y: ${sum.y} }`}</span></div>
        <div className="row"><span className="k">magnitude(a) (default)</span><span className="v">{mag}</span></div>
      </div>

      <h4>A type that crossed the module boundary</h4>
      <div className="rows">
        <div className="row"><span className="k">a: Vector</span><span className="v">{`{ x: ${a.x}, y: ${a.y} }`}</span></div>
        <div className="row"><span className="k">JSON.parse(...) as Vector</span><span className="v">{`{ x: ${parsed.x}, y: ${parsed.y} }`}</span></div>
      </div>

      <p className="hint">Nothing in <span className="t">mathKit.ts</span> is visible here unless it was <span className="t">export</span>ed.</p>
    </div>
  )
}
