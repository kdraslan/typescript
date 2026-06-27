**`as` rewrites the keys themselves.**

`[K in keyof User as \`is${Capitalize<K>}\`]` renames each key while mapping: `id` becomes `isId`, `name` becomes `isName`. The `as` clause sets the new key, here built with a template literal type (the next lesson).

Map a key to `never` in the `as` clause and it is dropped entirely, which is one way to filter keys out.
