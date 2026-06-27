**Interpolating `string` makes a pattern, not a finite set.**

`` `Hello, ${string}!` `` matches *any* string that starts with `Hello, ` and ends with `!`. It is not a fixed union; it is a shape.

So `'Hello, Kadir!'` fits but `'Hi'` does not. This is how you type things like `` `#${string}` `` for hex colours or `` `${number}px` `` for CSS lengths.
