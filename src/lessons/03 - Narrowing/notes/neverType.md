**`never` is the type with no values.**

Nothing is assignable to `never` (except `never` itself), which is exactly why the exhaustiveness trick works: a value can only reach `assertNever` if you have a case you forgot to handle.

`never` is also the return type of a function that never returns normally, like one that always throws.
