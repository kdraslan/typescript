**`?` marks a property as optional.**

`email?: string` means the field may be present or absent. Its type becomes `string | undefined`, so you must handle the missing case before using it.

```ts
user.email.trim()        // error: might be undefined
user.email?.trim()       // ok: optional chaining
```
