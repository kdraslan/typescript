**`Parameters<F>` extracts a function's argument types as a tuple.**

`Parameters<typeof makeTodo>` is `[draft: TodoDraft]`. `typeof makeTodo` grabs the function's *type*; `Parameters` reads the argument list off it.

Useful for wrappers that must accept exactly the same arguments as another function without restating them.
