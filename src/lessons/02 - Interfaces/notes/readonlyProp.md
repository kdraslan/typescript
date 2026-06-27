**`readonly` blocks reassignment after creation.**

`createdAt` can be set when the object is built, but `member.createdAt = ...` afterwards is a compile error.

It is a compile-time guard only. Nothing stops mutation at runtime, but your code will never be the thing that does it.
