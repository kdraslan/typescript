import type { LessonMeta } from '../registry.ts'

export const meta: LessonMeta = {
  section: '1 · Fundamentals',
  title: 'Types & Inference',
  summary: 'Every value has a static type. Usually TypeScript infers it from the value; when it cannot, you annotate it yourself.',
}

let temperature = 6 // inference
const humidity = 79 // literalType

temperature = 23 // widening
const exact = 79 as const // asConst

let label: string // annotation
label = 'warm'

let flexible: any = 'warm' // anyEscape
const shouty = flexible.toUpperCase() // anyUnsafe

const forced = '6' as unknown as number // doubleAssertion

function area(w: number, h: number) {
  return w * h // returnInference
}

export default function Demo() {
  const rows: Array<[expr: string, type: string, value: string]> = [
    ['let temperature = 6', 'number', String(temperature)],
    ['const humidity = 79', '79', String(humidity)],
    ['const exact = 79 as const', '79', String(exact)],
    ['let label: string', 'string', label],
    ['flexible.toUpperCase()', 'any', shouty],
    ['area(4, 3)', 'number', String(area(4, 3))],
    ["'6' as unknown as number", 'number', `${forced} (really a string!)`],
  ]

  return (
    <div>
      <h4>Inferred type · runtime value</h4>
      <div className="rows">
        {rows.map(([expr, type, value]) => (
          <div className="row" key={expr}>
            <span className="k">{expr}</span>
            <span className="v"><span className="tag">{type}</span> → {value}</span>
          </div>
        ))}
      </div>
      <p className="hint">The types are gone at runtime. They only protected you while editing and compiling.</p>
    </div>
  )
}
