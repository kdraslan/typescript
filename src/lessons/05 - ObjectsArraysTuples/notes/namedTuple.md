**Tuple elements can carry labels.**

`[x: number, y: number]` behaves exactly like `[number, number]` at runtime, but the labels show up in editor hints and signatures, so callers see `x` and `y` instead of `0` and `1`.

Labels are documentation for humans and tooling; they do not change the type.
