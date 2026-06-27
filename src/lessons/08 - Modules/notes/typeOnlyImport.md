**`import type` brings in a type and nothing else.**

`import type { Vector }` imports only type information. It is guaranteed to vanish in the compiled JavaScript, so it can never cause a runtime import or a circular-dependency surprise.

Use it whenever you import something purely to annotate with it. You can also inline it: `import { magnitude, type Vector } from '...'`.
