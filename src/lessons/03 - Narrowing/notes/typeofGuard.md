**`typeof` narrows inside the branch.**

Inside `if (typeof id === 'string')`, the compiler treats `id` as a `string`. So `id.toUpperCase()` is allowed there and nowhere else.

`typeof` works for the primitive checks: `'string'`, `'number'`, `'boolean'`, `'bigint'`, `'symbol'`, `'undefined'`, `'object'`, `'function'`.
