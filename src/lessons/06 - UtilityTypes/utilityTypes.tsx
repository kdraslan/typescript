import type { LessonMeta } from '../registry.ts'

export const meta: LessonMeta = {
  section: '3 · Type System Tools',
  title: 'Utility Types',
  summary: 'Built-in generic types that transform one type into another: Partial, Pick, Omit, Record, ReturnType and friends. Derive types instead of repeating them.',
}

interface Todo {
  id: number
  title: string
  done: boolean
  notes?: string
}

type TodoDraft = Omit<Todo, 'id' | 'done'> // omit
type TodoPatch = Partial<Todo> // partial
type TodoPreview = Pick<Todo, 'id' | 'title'> // pick
type PriorityBoard = Record<'low' | 'high', Todo[]> // record

let nextId = 1
function makeTodo(draft: TodoDraft): Todo {
  return { id: nextId++, done: false, ...draft }
}

function applyPatch(todo: Todo, patch: TodoPatch): Todo { // patchFn
  return { ...todo, ...patch }
}

type MakeArgs = Parameters<typeof makeTodo> // parameters
type Made = ReturnType<typeof makeTodo> // returnType

const sample = makeTodo({ title: 'Learn generics', notes: 'then utility types' })
const patched = applyPatch(sample, { done: true, title: 'Learned generics' })
const preview: TodoPreview = { id: sample.id, title: sample.title }
const board: PriorityBoard = { low: [sample], high: [patched] }

export default function Demo() {
  const _args: MakeArgs = [{ title: 'x' }]
  const _made: Made = sample

  return (
    <div>
      <h4>Omit&lt;Todo, 'id' | 'done'&gt; as a draft</h4>
      <div className="rows">
        <div className="row"><span className="k">makeTodo(draft).id</span><span className="v">{sample.id}</span></div>
        <div className="row"><span className="k">.title</span><span className="v">{sample.title}</span></div>
        <div className="row"><span className="k">.done</span><span className="v">{String(sample.done)}</span></div>
      </div>

      <h4>Partial&lt;Todo&gt; as a patch</h4>
      <div className="rows">
        <div className="row"><span className="k">applyPatch(todo, &#123;done, title&#125;)</span><span className="v">{patched.title} · done={String(patched.done)}</span></div>
      </div>

      <h4>Pick &amp; Record</h4>
      <div className="rows">
        <div className="row"><span className="k">Pick preview</span><span className="v">#{preview.id} {preview.title}</span></div>
        <div className="row"><span className="k">Record board keys</span><span className="v">[{Object.keys(board).join(', ')}]</span></div>
        <div className="row"><span className="k">board.high count</span><span className="v">{board.high.length}</span></div>
      </div>

      <p className="hint">Change <span className="t">Todo</span> once and every derived type updates with it.</p>
    </div>
  )
}
