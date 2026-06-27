**Spreading a `Partial` patch over a full object.**

`{ ...todo, ...patch }` starts from a complete `Todo` and overwrites only the fields present in `patch`. Because `patch` is `Partial<Todo>`, the result is still a complete, valid `Todo`.

The types guarantee you cannot patch in a field that does not exist or has the wrong type.
