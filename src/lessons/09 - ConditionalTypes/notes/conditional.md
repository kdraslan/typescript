**`T extends U ? X : Y` is an `if` for types.**

If `T` is assignable to `U`, the type is `X`, otherwise `Y`. `IsString<string>` resolves to `'yes'`; `IsString<number>` resolves to `'no'`.

The `const stringCase: IsString<string> = 'yes'` below only compiles because the conditional really did resolve to `'yes'`. Change the value to `'no'` and it is an error.
