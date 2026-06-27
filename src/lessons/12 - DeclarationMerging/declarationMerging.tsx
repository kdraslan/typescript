import type { LessonMeta } from '../registry.ts'

export const meta: LessonMeta = {
  section: '4 · Advanced Types',
  title: 'Declaration Merging',
  summary: 'Two declarations with the same name can combine: interfaces merge their members, a function merges with a namespace, and you can augment types you do not own.',
}

interface Box { // interfaceMerge
  width: number
}
interface Box { // mergeAdds
  height: number
}

const box: Box = { width: 4, height: 3 }

function describe(name: string): string { // funcNamespaceMerge
  return `${describe.prefix} ${name} (${box.width}x${box.height})`
}
namespace describe { // namespaceValue
  export const prefix = 'Shape:'
}

declare global {
  interface Window {
    appVersion: string // globalAugment
  }
}

window.appVersion = '1.0.0'

export default function Demo() {
  return (
    <div>
      <h4>Two `interface Box` declarations merged</h4>
      <div className="rows">
        <div className="row"><span className="k">box.width (from #1)</span><span className="v">{box.width}</span></div>
        <div className="row"><span className="k">box.height (from #2)</span><span className="v">{box.height}</span></div>
      </div>

      <h4>Function merged with a namespace</h4>
      <div className="rows">
        <div className="row"><span className="k">describe.prefix</span><span className="v">{describe.prefix}</span></div>
        <div className="row"><span className="k">describe('Box')</span><span className="v">{describe('Box')}</span></div>
      </div>

      <h4>Augmenting the global `Window`</h4>
      <div className="rows">
        <div className="row"><span className="k">window.appVersion</span><span className="v">{window.appVersion}</span></div>
      </div>
    </div>
  )
}
