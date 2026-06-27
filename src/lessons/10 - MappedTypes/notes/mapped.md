**A mapped type walks the keys of another type.**

`{ [K in keyof User]: User[K] }` visits each key `K` of `User` and rebuilds the same shape. Add `readonly` in front and you get a read-only copy: this is literally how `Readonly<T>` is defined.

`keyof User` gives the union of keys; `K in ...` iterates it; `User[K]` looks up each value type. That triple is the whole pattern.
