**Destructuring carries the types through.**

`[x1, y1]: [number, number]` pulls the two elements out as typed locals. `x1` and `y1` are `number`, no extra annotation.

The annotation goes on the *pattern* as a whole, not on each name. The same works for object parameters: `({ id, name }: User)`.
