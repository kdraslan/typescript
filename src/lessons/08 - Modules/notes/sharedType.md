**Types travel between modules like values do.**

`Vector` is declared in `mathKit.ts` and used here as `const a: Vector`. Export a type once and every module can annotate with it, so the shape stays defined in a single place.

This is how a codebase keeps one source of truth for its data shapes.
