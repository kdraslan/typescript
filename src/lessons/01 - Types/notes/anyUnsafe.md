**Calling into `any` is unchecked.**

`flexible.toUpperCase()` compiles because `flexible` is `any`. Here it happens to hold a string, so it works. If it held a `number`, this same line would still compile and then throw at runtime.

That is the trade with `any`: the compiler stops protecting you.
