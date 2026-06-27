**Return types are inferred too.**

`area` has no return annotation, but `w * h` is `number`, so the function's return type is `number`.

Parameters cannot be inferred (there is nothing to read them from), so those you must annotate. A good habit on exported functions: annotate the return type as well, so an accidental change shows up at the function, not at its callers.
