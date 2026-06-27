**`readonly T[]` is an array you cannot mutate.**

The mutating methods (`push`, `pop`, `splice`, index assignment) are removed from the type. Reading, `map`, `filter`, `slice` still work.

It is the array version of `readonly` fields: a compile-time promise that this code will not change the array it was handed.
