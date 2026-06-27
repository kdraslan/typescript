**A parameter property declares and assigns a field in one line.**

Putting a modifier (`public`, `private`, `readonly`) on a constructor parameter tells TypeScript to also create that field and assign it. `public readonly owner: string` replaces all of:

```ts
readonly owner: string
constructor(owner: string) { this.owner = owner }
```

It is the most common way to wire up class fields with no boilerplate.
