**A union is "one of these".**

`string | number` means the value is a `string` or a `number`. You can only use what *both* members have in common until you narrow.

```ts
function f(id: string | number) {
  id.toFixed(0)  // error: string has no toFixed
}
```

The set of values is the union of the two sets, but the set of *safe operations* is their intersection.
