import type { LessonMeta } from '../registry.ts'

export const meta: LessonMeta = {
  section: '4 · Advanced Types',
  title: 'Mapped Types',
  summary: 'Build a new object type by walking the keys of an existing one. This is the machinery behind Partial, Readonly, Record and most of the utility types.',
}

interface User {
  id: number
  name: string
  admin: boolean
}

type ReadonlyUser = { readonly [K in keyof User]: User[K] } // mapped
type OptionalUser = { [K in keyof User]?: User[K] } // optionalModifier
type RequiredUser = { [K in keyof OptionalUser]-?: OptionalUser[K] } // removeModifiers
type Stringified = { [K in keyof User]: string } // valueRemap
type Flags = { [K in keyof User as `is${Capitalize<string & K>}`]: boolean } // keyRemap

const readonlyUser: ReadonlyUser = { id: 1, name: 'Kadir', admin: true }
const draft: OptionalUser = { name: 'just a name' }
const complete: RequiredUser = { id: 2, name: 'Full', admin: false }
const asStrings: Stringified = { id: '1', name: 'Kadir', admin: 'true' }
const flags: Flags = { isId: true, isName: true, isAdmin: false }

export default function Demo() {
  return (
    <div>
      <h4>Map over keyof User</h4>
      <div className="rows">
        <div className="row"><span className="k">readonly [K in keyof User]</span><span className="v"><span className="tag">Readonly&lt;User&gt;</span></span></div>
        <div className="row"><span className="k">[K in keyof User]?</span><span className="v"><span className="tag">Partial&lt;User&gt;</span> → {`{ name: '${draft.name}' }`}</span></div>
        <div className="row"><span className="k">[K in keyof ...]-?</span><span className="v"><span className="tag">Required&lt;User&gt;</span> → id={complete.id}</span></div>
      </div>

      <h4>Remap the value type</h4>
      <div className="rows">
        <div className="row"><span className="k">[K in keyof User]: string</span><span className="v">{`{ id: '${asStrings.id}', admin: '${asStrings.admin}' }`}</span></div>
      </div>

      <h4>Remap the keys with `as`</h4>
      <div className="rows">
        {Object.entries(flags).map(([k, v]) => (
          <div className="row" key={k}><span className="k">{k}</span><span className="v">{String(v)}</span></div>
        ))}
      </div>
    </div>
  )
}
