**`infer` captures a type from inside a pattern.**

`T extends (infer U)[] ? U : T` says "if `T` is an array of something, call that something `U` and return it". So `ElementType<number[]>` is `number`.

`infer` is how you reach inside another type and pull a piece out: the element of an array, the return of a function, the resolved value of a promise.
