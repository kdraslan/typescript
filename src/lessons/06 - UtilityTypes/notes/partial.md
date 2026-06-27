**`Partial<T>` makes every property optional.**

`Partial<Todo>` is `Todo` with every field marked `?`. Ideal for an update/patch object where the caller sends only the fields that changed.

```ts
function applyPatch(t: Todo, patch: Partial<Todo>) {
  return { ...t, ...patch }
}
```

The opposite is `Required<T>`, which strips every `?` off.
