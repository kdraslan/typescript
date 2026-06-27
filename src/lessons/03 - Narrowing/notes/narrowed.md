**After the `if`, the other case remains.**

The `if` returned for the `string` case, so by this line the only possibility left is `number`. The compiler knows, so `id.toFixed(0)` is safe with no further check.

This is *control-flow analysis*: TypeScript follows your `return`s, `throw`s, and branches to track what each variable can still be.
