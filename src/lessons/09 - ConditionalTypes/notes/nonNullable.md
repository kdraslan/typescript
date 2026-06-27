**`NonNullable<T>` strips `null` and `undefined`.**

It is a conditional type in the standard library: `T extends null | undefined ? never : T`, distributed over the union. `NonNullable<string | null | undefined>` is just `string`.

Pair it with `Exclude` and `Extract` (`Extract<T, U>` keeps only the members assignable to `U`); the three are the everyday union-filtering tools.
