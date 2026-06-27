**`as const` turns an array literal into a readonly tuple.**

Without it, `['ok', 200]` infers `(string | number)[]`, a mutable array. With `as const` it becomes `readonly ['ok', 200]`: fixed length, exact literal types per slot.

This is the usual way to get a precise tuple type out of a plain literal.
