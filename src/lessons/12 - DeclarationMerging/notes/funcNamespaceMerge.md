**A function and a namespace of the same name merge.**

`describe` is a callable function, and because a `namespace describe` follows it, `describe` also carries the namespace's exports as properties. So `describe.prefix` is valid both for the type checker and at runtime.

This is how you attach static helpers or metadata to a function, the way `React.Children` hangs off the `React` value.
