**A namespace can hold real, exported values.**

`namespace describe { export const prefix = 'Shape:' }` creates an actual runtime object whose `prefix` is merged onto the function above.

Namespaces predate ES modules and are rarely used for new code (prefer modules), but they remain the mechanism behind function/class merging and some library typings.
