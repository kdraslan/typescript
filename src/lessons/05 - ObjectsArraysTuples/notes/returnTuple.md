**Returning a tuple returns several typed values at once.**

`minMax` returns `[min: number, max: number]`. The caller destructures it positionally:

```ts
const [min, max] = minMax(scores)
```

This is exactly how React's `useState` returns `[value, setValue]`. A tuple is the right tool when order matters and the pieces have different types.
