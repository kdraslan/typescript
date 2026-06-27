**Switching on the tag narrows the whole object.**

In `case 'circle':`, the compiler knows `shape` is the `Circle` member, so `shape.radius` is available and `shape.width` is not.

One check on the discriminant narrows every other field at once. No type assertions, no guards per property.
