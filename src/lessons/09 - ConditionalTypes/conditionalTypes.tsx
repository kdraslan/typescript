import type { LessonMeta } from '../registry.ts'

export const meta: LessonMeta = {
  section: '4 · Advanced Types',
  title: 'Conditional Types',
  summary: 'Types that branch: `T extends U ? X : Y`. With `infer` they can also pull a type out of another type. The values below are each annotated with a conditional type, so the compiler proves the branch.',
}

type IsString<T> = T extends string ? 'yes' : 'no' // conditional
type ElementType<T> = T extends (infer U)[] ? U : T // infer

type Role = 'admin' | 'editor' | 'guest'
type Privileged = Exclude<Role, 'guest'> // distributive
type Defined = NonNullable<string | null | undefined> // nonNullable
type Resolved = Awaited<Promise<number>> // awaited

const stringCase: IsString<string> = 'yes'
const numberCase: IsString<number> = 'no'

const fromArray: ElementType<number[]> = 42
const fromScalar: ElementType<boolean> = true

const role: Privileged = 'admin'
const defined: Defined = 'present'
const resolved: Resolved = 7

export default function Demo() {
  return (
    <div>
      <h4>T extends string ? 'yes' : 'no'</h4>
      <div className="rows">
        <div className="row"><span className="k">IsString&lt;string&gt;</span><span className="v"><span className="tag">'yes'</span> → {stringCase}</span></div>
        <div className="row"><span className="k">IsString&lt;number&gt;</span><span className="v"><span className="tag">'no'</span> → {numberCase}</span></div>
      </div>

      <h4>infer pulls the element type out</h4>
      <div className="rows">
        <div className="row"><span className="k">ElementType&lt;number[]&gt;</span><span className="v"><span className="tag">number</span> → {fromArray}</span></div>
        <div className="row"><span className="k">ElementType&lt;boolean&gt;</span><span className="v"><span className="tag">boolean</span> → {String(fromScalar)}</span></div>
      </div>

      <h4>Built-in conditional types</h4>
      <div className="rows">
        <div className="row"><span className="k">Exclude&lt;Role, 'guest'&gt;</span><span className="v"><span className="tag">'admin' | 'editor'</span> → {role}</span></div>
        <div className="row"><span className="k">NonNullable&lt;string | null&gt;</span><span className="v"><span className="tag">string</span> → {defined}</span></div>
        <div className="row"><span className="k">Awaited&lt;Promise&lt;number&gt;&gt;</span><span className="v"><span className="tag">number</span> → {resolved}</span></div>
      </div>
    </div>
  )
}
