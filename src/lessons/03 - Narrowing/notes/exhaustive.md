**The `default` proves every case is handled.**

By the `default` branch, all known shapes have been handled, so `shape` has type `never`. Passing it to `assertNever` (which only accepts `never`) compiles.

Add a new shape and forget a `case`, and `shape` is no longer `never` here, so the call becomes a compile error. The compiler now reminds you to handle it.
