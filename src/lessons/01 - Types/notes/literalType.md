**`const` infers the literal, not the wide type.**

`const humidity = 79` has type `79`, not `number`. A `const` can never be reassigned, so its type is the single exact value.

Think of a type as a *set of allowed values*. `79` is the set `{ 79 }`; `number` is the set of all numbers.
