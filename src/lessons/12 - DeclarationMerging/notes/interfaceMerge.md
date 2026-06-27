**Interfaces with the same name merge.**

Declaring `interface Box` twice does not error or overwrite; TypeScript combines the members. So `Box` ends up with both `width` and `height`, and a value must supply both.

This "openness" is unique to interfaces. A `type` alias with a duplicate name is a "Duplicate identifier" error instead.
