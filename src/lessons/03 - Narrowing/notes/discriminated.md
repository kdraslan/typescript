**A discriminated union shares a literal tag.**

Each member has a `kind` field set to a unique string literal. That shared, literal-typed field is the *discriminant*.

```ts
type Circle = { kind: 'circle'; radius: number }
type Rect   = { kind: 'rect';   width: number; height: number }
type Shape  = Circle | Rect
```

It is the single most useful pattern in TypeScript for modelling "a value that is one of several well-defined cases".
