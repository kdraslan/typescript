**A type alias names *any* type, not just objects.**

`type` can name a union, a primitive, a tuple, a function, anything:

```ts
type Role = 'admin' | 'member' | 'guest'
type Id = string | number
type Pair = [number, number]
```

An interface can only describe an object/function shape. That extra reach is the main reason to pick `type`.
