import type { LessonMeta } from '../registry.ts'

export const meta: LessonMeta = {
  section: '2 · Functions & Objects',
  title: 'Functions & Generics',
  summary: 'Typed parameters and returns, then generics: functions that keep a relationship between their input and output types instead of throwing it away.',
}

function sum(...nums: number[]): number { // restParams
  return nums.reduce((a, b) => a + b, 0)
}

function greet(name: string, greeting = 'Hello'): string { // defaultParam
  return `${greeting}, ${name}`
}

function first<T>(items: T[]): T | undefined { // generic
  return items[0] // genericReturn
}

function pluck<T, K extends keyof T>(obj: T, key: K): T[K] { // constraint
  return obj[key] // indexedAccess
}

const user = { id: 1, name: 'Kadir', admin: true }

export default function Demo() {
  const firstNum = first([10, 20, 30]) // typeArgInference
  const firstWord = first(['alpha', 'beta'])
  const name = pluck(user, 'name')
  const admin = pluck(user, 'admin')

  return (
    <div>
      <h4>Typed parameters</h4>
      <div className="rows">
        <div className="row"><span className="k">sum(1, 2, 3, 4)</span><span className="v">{sum(1, 2, 3, 4)}</span></div>
        <div className="row"><span className="k">greet('Kadir')</span><span className="v">{greet('Kadir')}</span></div>
        <div className="row"><span className="k">greet('Kadir', 'Hi')</span><span className="v">{greet('Kadir', 'Hi')}</span></div>
      </div>

      <h4>Generic first&lt;T&gt;: type follows the input</h4>
      <div className="rows">
        <div className="row"><span className="k">first([10, 20, 30])</span><span className="v"><span className="tag">number</span> → {firstNum}</span></div>
        <div className="row"><span className="k">first(['alpha', 'beta'])</span><span className="v"><span className="tag">string</span> → {firstWord}</span></div>
      </div>

      <h4>pluck(obj, key): only real keys, exact value type</h4>
      <div className="rows">
        <div className="row"><span className="k">pluck(user, 'name')</span><span className="v"><span className="tag">string</span> → {name}</span></div>
        <div className="row"><span className="k">pluck(user, 'admin')</span><span className="v"><span className="tag">boolean</span> → {String(admin)}</span></div>
      </div>
    </div>
  )
}
