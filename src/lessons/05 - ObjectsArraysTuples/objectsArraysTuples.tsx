import type { LessonMeta } from '../registry.ts'

export const meta: LessonMeta = {
  section: '2 · Functions & Objects',
  title: 'Objects, Arrays & Tuples',
  summary: 'Structured types: nested object shapes, homogeneous arrays, and tuples, the fixed-length, position-typed cousin of the array.',
}

const config: { name: string; tags: string[]; meta: { version: number } } = { // nestedObject
  name: 'training-app',
  tags: ['typescript', 'vite'],
  meta: { version: 1 },
}

const scores: number[] = [90, 85, 95] // array
const frozen: readonly string[] = ['locked', 'in'] // readonlyArray

const point: [number, number] = [3, 4] // tuple
const labeled: [x: number, y: number] = [10, 20] // namedTuple

function minMax(nums: number[]): [min: number, max: number] { // returnTuple
  return [Math.min(...nums), Math.max(...nums)]
}

function distance([x1, y1]: [number, number], [x2, y2]: [number, number]): number { // destructure
  return Math.hypot(x2 - x1, y2 - y1)
}

const status = ['ok', 200] as const // tupleAsConst

export default function Demo() {
  const [min, max] = minMax(scores)

  return (
    <div>
      <h4>Nested object</h4>
      <div className="rows">
        <div className="row"><span className="k">config.name</span><span className="v">{config.name}</span></div>
        <div className="row"><span className="k">config.tags</span><span className="v">[{config.tags.join(', ')}]</span></div>
        <div className="row"><span className="k">config.meta.version</span><span className="v">{config.meta.version}</span></div>
      </div>

      <h4>Array &rarr; tuple result</h4>
      <div className="rows">
        <div className="row"><span className="k">scores</span><span className="v">[{scores.join(', ')}]</span></div>
        <div className="row"><span className="k">minMax(scores)</span><span className="v">[{min}, {max}]</span></div>
      </div>

      <h4>Tuples as coordinates</h4>
      <div className="rows">
        <div className="row"><span className="k">point</span><span className="v">[{point.join(', ')}]</span></div>
        <div className="row"><span className="k">labeled</span><span className="v">[{labeled.join(', ')}]</span></div>
        <div className="row"><span className="k">distance(point, labeled)</span><span className="v">{distance(point, labeled).toFixed(2)}</span></div>
        <div className="row"><span className="k">status (as const)</span><span className="v"><span className="tag">readonly ['ok', 200]</span></span></div>
      </div>
    </div>
  )
}
