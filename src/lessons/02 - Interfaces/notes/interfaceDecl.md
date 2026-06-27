**An interface names the shape of an object.**

It is a contract: any value typed `User` must have these properties with these types. Interfaces only describe shapes, they produce no runtime code.

```ts
interface User { id: number; name: string }
```

Interfaces are *open*: declaring `interface User` twice merges the members. Type aliases cannot do that.
