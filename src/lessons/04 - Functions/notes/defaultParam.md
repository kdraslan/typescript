**A default value makes a parameter optional and infers its type.**

`greeting = 'Hello'` means callers may omit it, and its type is inferred as `string` from the default. No `?` and no annotation needed.

A parameter with a default behaves like an optional one but is never `undefined` inside the function: the default has already filled it in.
