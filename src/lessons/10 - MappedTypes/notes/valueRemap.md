**The value type can be anything, not just `T[K]`.**

`{ [K in keyof User]: string }` keeps the keys but makes every value a `string`. You are free to transform the value type as you map.

Combine this with a conditional type and you can rewrite values per key, for example "make every function property return a Promise".
