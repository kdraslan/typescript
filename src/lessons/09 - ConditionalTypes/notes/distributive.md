**Conditional types distribute over unions.**

When the checked type is a union, the conditional runs on *each member* and the results are unioned back together. That is exactly how `Exclude` works:

```ts
type Exclude<T, U> = T extends U ? never : T
// Exclude<'admin'|'editor'|'guest', 'guest'>
//   -> ('admin' extends 'guest'? never:'admin') | ... 
//   -> 'admin' | 'editor'
```

The `'guest'` member becomes `never` and drops out of the union.
