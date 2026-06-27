**`-?` and `-readonly` strip modifiers off.**

A mapped type can also *remove* modifiers with a minus sign. `[K in keyof OptionalUser]-?` makes every optional property required again, which is exactly `Required<T>`.

Likewise `-readonly` produces a mutable copy. So mapping can both add and take away `?` and `readonly`.
