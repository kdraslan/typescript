**`Awaited<T>` is what you get after `await`.**

`Awaited<Promise<number>>` is `number`. It unwraps a promise, and even unwraps nested promises, mirroring how `await` behaves at runtime.

It is built from `infer` under the hood, and it is the type behind `ReturnType` of an `async` function once you await the result.
