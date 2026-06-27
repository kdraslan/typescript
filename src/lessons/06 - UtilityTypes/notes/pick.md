**`Pick<T, Keys>` keeps only the named properties.**

`Pick<Todo, 'id' | 'title'>` is `{ id: number; title: string }`, handy for a list view that needs just a couple of fields.

`Pick` and `Omit` are two sides of the same coin: name what you want, or name what you do not.
