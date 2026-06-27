**`T[K]` is the type of that property.**

The return type `T[K]` is an *indexed access type*: the type you get by looking up key `K` on `T`.

So `pluck(user, 'name')` returns `string` and `pluck(user, 'admin')` returns `boolean`, from the same function. The value type is never widened to a union of all fields.
