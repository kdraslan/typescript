**`any` switches type-checking off.**

A value typed `any` accepts anything and allows anything. It is an escape hatch back to plain JavaScript.

Useful while migrating code, dangerous as a habit: every `any` is a hole where bugs walk straight through the compiler. Prefer `unknown` when you truly do not know the type yet.
