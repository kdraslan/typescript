**Named exports: many per module, imported by name.**

`add` is one of several named exports from `mathKit.ts`. A module can have any number of them, and you pick the ones you need by their exact names.

Named exports are the default choice: they are explicit, rename-safe in tooling, and tree-shakeable (unused ones get dropped from the bundle).
