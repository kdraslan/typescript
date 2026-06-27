**TypeScript is structural, not nominal.**

Types match by *shape*, not by name. Any object with the right properties is a `User`, even if it was never declared as one:

```ts
function greet(u: User) {}
greet({ id: 1, name: 'K', createdAt: 0 })  // ok, shape fits
```

This is "duck typing", checked at compile time. It is why two unrelated types with identical shapes are interchangeable.
