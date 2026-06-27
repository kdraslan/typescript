**A type can describe a function.**

`(value: number) => string` is the type of any function taking a `number` and returning a `string`. Annotate a variable with it and the implementation's parameters get their types for free:

```ts
const money: Formatter = (v) => `$${v.toFixed(2)}`  // v is number, no annotation needed
```

This is *contextual typing*: the variable's type flows into the arrow function.
