**`let` widens to the general type.**

`let temperature = 6` infers `number`, not `6`, because a `let` is meant to be reassigned. So `temperature = 23` is fine.

```ts
let t = 6        // number
t = 23           // ok
const c = 6      // 6
// c = 23        // error: c is exactly 6
```
