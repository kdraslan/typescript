**Four built-in helpers reshape string case.**

`Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize` are *intrinsic* types: implemented inside the compiler, not in TypeScript itself. `Uppercase<'ready'>` is `'READY'`.

They operate purely on the type level, useful for normalising keys and names without any runtime code.
