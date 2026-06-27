**Truthiness narrows away `null` and `undefined`.**

`if (!name) return ...` removes `null` (and `''`) from the picture. After that early return, `name` is a plain `string`.

Guarding the empty/missing case first and returning is the cleanest way to reach code that can assume a real value.
