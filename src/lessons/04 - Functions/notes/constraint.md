**`extends` constrains what a type parameter may be.**

`K extends keyof T` means `K` must be one of `T`'s own keys. So `pluck(user, 'name')` is fine, but `pluck(user, 'nope')` is a compile error.

`keyof T` is the union of `T`'s keys. Here that is `'id' | 'name' | 'admin'`. Constraints let a generic require capabilities (a key, a `length`, a method) while still staying generic.
