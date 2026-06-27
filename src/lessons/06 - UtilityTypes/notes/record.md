**`Record<Keys, Value>` builds an object type from keys and a value type.**

`Record<'low' | 'high', Todo[]>` is `{ low: Todo[]; high: Todo[] }`. The keys come from a union, the value type is shared.

It is the typed way to describe a lookup/map object. With a literal-union key, every key is required and checked.
