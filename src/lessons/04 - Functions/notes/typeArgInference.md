**You rarely write the type argument.**

`first([10, 20, 30])` infers `T = number` from the argument, so you do not type `first<number>([...])`. The compiler reads it from the call.

Write the type argument explicitly only when there is nothing to infer from, or when you want to force a wider type than the value suggests.
