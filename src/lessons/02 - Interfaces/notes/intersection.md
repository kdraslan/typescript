**`A & B` combines two shapes into one.**

A `Member` is everything in `User` *and* a `role`. The value must satisfy both.

Intersection (`&`) is how type aliases "extend": it is the alias equivalent of an interface's `extends` keyword.

```ts
interface Member extends User { role: Role }  // same result
```
