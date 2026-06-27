**The return type is expressed in `T`.**

`items[0]` might be out of bounds, so the return type is `T | undefined`. Whatever `T` turns out to be for a given call, the return type tracks it.

Call with `number[]` and you get back `number | undefined`; call with `string[]` and you get `string | undefined`. One signature, exact result each time.
