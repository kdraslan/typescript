**`ReturnType<F>` extracts what a function returns.**

`ReturnType<typeof makeTodo>` is `Todo`. Derive it instead of writing `Todo` again, and it stays correct even if the function's return changes.

`Parameters` and `ReturnType` are how you build types *from* existing functions, so a refactor of the function updates the derived types automatically.
