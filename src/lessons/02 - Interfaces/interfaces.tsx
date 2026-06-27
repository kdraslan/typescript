import type { LessonMeta } from '../registry.ts'

export const meta: LessonMeta = {
  section: '1 · Fundamentals',
  title: 'Interfaces & Type Aliases',
  summary: 'Two ways to name the shape of a value: an interface or a type alias. They overlap heavily; the differences are small but worth knowing.',
}

interface User { // interfaceDecl
  id: number
  name: string
  email?: string // optional
  readonly createdAt: number // readonlyProp
}

type Role = 'admin' | 'member' | 'guest' // typeAlias

type Member = User & { role: Role } // intersection

interface ScoreBook { // indexSignature
  [subject: string]: number
}

type Formatter = (value: number) => string // functionType

const member: Member = {
  id: 1,
  name: 'Kadir',
  createdAt: Date.now(),
  role: 'admin',
}

const scores: ScoreBook = { math: 90, cs: 95 }

const money: Formatter = (v) => `$${v.toFixed(2)}` // structural

export default function Demo() {
  return (
    <div>
      <h4>A Member (User &amp; {'{ role }'})</h4>
      <div className="rows">
        <div className="row"><span className="k">id</span><span className="v">{member.id}</span></div>
        <div className="row"><span className="k">name</span><span className="v">{member.name}</span></div>
        <div className="row"><span className="k">email?</span><span className="v">{member.email ?? '(omitted, optional)'}</span></div>
        <div className="row"><span className="k">role</span><span className="v"><span className="tag">{member.role}</span></span></div>
      </div>

      <h4>Index signature: any string key &rarr; number</h4>
      <div className="rows">
        {Object.entries(scores).map(([k, v]) => (
          <div className="row" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
        ))}
      </div>

      <h4>A function type in action</h4>
      <div className="rows">
        <div className="row"><span className="k">money(42)</span><span className="v">{money(42)}</span></div>
      </div>
    </div>
  )
}
