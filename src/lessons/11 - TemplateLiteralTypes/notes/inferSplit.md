**`infer` inside a template parses the string.**

`T extends \`/${infer Section}/${infer Id}\`` splits a path type at the slashes, capturing each piece. `RouteParts<'/users/42'>` becomes the tuple `['users', '42']`.

This is type-level string parsing: the compiler matches the literal against the pattern and hands you the captured segments, all at compile time.
