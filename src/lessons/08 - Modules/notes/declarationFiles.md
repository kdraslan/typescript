**`.d.ts` files are types with no implementation.**

`JSON.parse` returns `any`, and the editor still knows about `JSON` at all, because TypeScript ships declaration files (`lib.*.d.ts`) describing the runtime.

A `.d.ts` holds only type information for code whose implementation lives elsewhere: the browser APIs, Node, or a plain-JavaScript npm package. For published packages these usually arrive as `@types/...` or bundled alongside the library. You write your own when you need to type JavaScript that has none.
