**A tuple is a fixed-length array typed per position.**

`[number, number]` is exactly two numbers. Position 0 and position 1 each have their own type, and the length is part of the type.

```ts
const p: [number, number] = [3, 4]   // ok
// const q: [number, number] = [3]   // error: needs two
```

Compare with `number[]`, which is any length of the same type.
