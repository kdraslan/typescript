**`Omit<T, Keys>` removes properties.**

`Omit<Todo, 'id' | 'done'>` is `Todo` without `id` and `done`, perfect for a "draft" you hand to a factory that fills those in.

```ts
type TodoDraft = Omit<Todo, 'id' | 'done'>  // { title; notes? }
```

Its mirror is `Pick`, which keeps instead of removes.
