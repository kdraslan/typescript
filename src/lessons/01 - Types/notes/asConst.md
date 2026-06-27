**`as const` freezes the value into its narrowest type.**

`79 as const` has type `79`. On objects and arrays it makes every field `readonly` and every member a literal:

```ts
const point = { x: 1, y: 2 } as const  // { readonly x: 1; readonly y: 2 }
const tabs = ['home', 'about'] as const // readonly ["home", "about"]
```

Great for fixed config and for deriving union types from data.
