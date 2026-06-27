**Inference: no annotation needed.**

From `= 6`, TypeScript infers the type `number`. You did not write `: number`, it read the value.

Most of your code can stay annotation-free. Annotate only where inference cannot reach (empty `let`, function parameters, public API boundaries).
