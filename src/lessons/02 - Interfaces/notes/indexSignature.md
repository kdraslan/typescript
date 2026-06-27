**An index signature types open-ended keys.**

`[subject: string]: number` says "any string key maps to a number". Use it when you do not know the keys ahead of time, like a dictionary.

```ts
interface ScoreBook { [subject: string]: number }
const s: ScoreBook = { math: 90, cs: 95 }  // any subject is allowed
```

For a *known* fixed set of keys, prefer `Record<Key, Value>` or explicit fields.
