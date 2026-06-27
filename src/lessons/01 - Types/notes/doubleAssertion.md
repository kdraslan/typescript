**A type assertion is you overruling the compiler.**

`'6' as unknown as number` tells TypeScript "trust me, this is a `number`". It is, at runtime, still the string `'6'`.

The compiler refuses a direct `'6' as number` because the types do not overlap. Going through `unknown` first launders it. The lesson: an assertion changes the *type*, never the *value*. Use sparingly.
