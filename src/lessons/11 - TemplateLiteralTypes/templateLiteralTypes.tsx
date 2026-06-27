import type { LessonMeta } from '../registry.ts'

export const meta: LessonMeta = {
  section: '4 · Advanced Types',
  title: 'Template Literal Types',
  summary: 'String literal types you build with backticks. Interpolate unions to generate every combination, reshape case with the intrinsic helpers, even parse strings with infer.',
}

type Lang = 'en' | 'de'
type Region = 'US' | 'GB'
type Locale = `${Lang}-${Region}` // templateUnion

type DomEvent = 'click' | 'hover'
type Handler = `on${Capitalize<DomEvent>}` // capitalize

type Loud = Uppercase<'ready'> // intrinsic

type Greeting = `Hello, ${string}!` // patternType

type RouteParts<T> = T extends `/${infer Section}/${infer Id}` ? [Section, Id] : never // inferSplit

const locale: Locale = 'en-GB'
const handler: Handler = 'onClick'
const loud: Loud = 'READY'
const greeting: Greeting = 'Hello, Kadir!'
const parts: RouteParts<'/users/42'> = ['users', '42']

export default function Demo() {
  return (
    <div>
      <h4>Interpolating unions multiplies them out</h4>
      <div className="rows">
        <div className="row"><span className="k">`${'{Lang}'}-${'{Region}'}`</span><span className="v"><span className="tag">'en-US' | 'en-GB' | 'de-US' | 'de-GB'</span></span></div>
        <div className="row"><span className="k">a valid Locale</span><span className="v">{locale}</span></div>
      </div>

      <h4>Reshaping strings</h4>
      <div className="rows">
        <div className="row"><span className="k">`on${'{Capitalize<DomEvent>}'}`</span><span className="v"><span className="tag">'onClick' | 'onHover'</span> → {handler}</span></div>
        <div className="row"><span className="k">Uppercase&lt;'ready'&gt;</span><span className="v"><span className="tag">'READY'</span> → {loud}</span></div>
        <div className="row"><span className="k">`Hello, ${'{string}'}!`</span><span className="v">{greeting}</span></div>
      </div>

      <h4>Parsing a string with infer</h4>
      <div className="rows">
        <div className="row"><span className="k">RouteParts&lt;'/users/42'&gt;</span><span className="v"><span className="tag">[Section, Id]</span> → [{parts[0]}, {parts[1]}]</span></div>
      </div>
    </div>
  )
}
