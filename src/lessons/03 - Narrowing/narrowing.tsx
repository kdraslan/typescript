import type { LessonMeta } from '../registry.ts'

export const meta: LessonMeta = {
  section: '1 · Fundamentals',
  title: 'Unions & Narrowing',
  summary: 'A union says a value is one of several types. Narrowing is how you prove to the compiler which one it is right now, so you can use it safely.',
}

type Id = string | number // union

function format(id: Id): string {
  if (typeof id === 'string') { // typeofGuard
    return id.toUpperCase()
  }
  return id.toFixed(0) // narrowed
}

function greet(name: string | null): string {
  if (!name) return 'Hello, stranger' // truthiness
  return `Hello, ${name}`
}

type Circle = { kind: 'circle'; radius: number }
type Rect = { kind: 'rect'; width: number; height: number }
type Shape = Circle | Rect // discriminated

function area(shape: Shape): number {
  switch (shape.kind) { // discriminant
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'rect':
      return shape.width * shape.height
    default:
      return assertNever(shape) // exhaustive
  }
}

function assertNever(value: never): never { // neverType
  throw new Error(`Unhandled shape: ${JSON.stringify(value)}`)
}

const shapes: Shape[] = [
  { kind: 'circle', radius: 2 },
  { kind: 'rect', width: 3, height: 4 },
]

export default function Demo() {
  return (
    <div>
      <h4>Narrowing a string | number</h4>
      <div className="rows">
        <div className="row"><span className="k">format('abc')</span><span className="v">{format('abc')}</span></div>
        <div className="row"><span className="k">format(42)</span><span className="v">{format(42)}</span></div>
        <div className="row"><span className="k">greet(null)</span><span className="v">{greet(null)}</span></div>
        <div className="row"><span className="k">greet('Kadir')</span><span className="v">{greet('Kadir')}</span></div>
      </div>

      <h4>Discriminated union &rarr; area</h4>
      <div className="rows">
        {shapes.map((s) => (
          <div className="row" key={s.kind}>
            <span className="k"><span className="tag">{s.kind}</span></span>
            <span className="v">{area(s).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <p className="hint">Add a third shape and the <span className="t">never</span> guard makes the unhandled case a compile error.</p>
    </div>
  )
}
