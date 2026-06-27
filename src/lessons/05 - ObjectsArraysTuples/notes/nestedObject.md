**Object types nest to any depth.**

The annotation mirrors the value's shape, including the inner `meta: { version: number }`. Access a field that is not in the type, or with the wrong type, and it is a compile error.

For anything reused, pull the shape into an `interface` or `type` instead of writing it inline.
