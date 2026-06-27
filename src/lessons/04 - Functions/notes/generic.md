**A generic is a type parameter.**

`<T>` is a placeholder filled in per call. `first` works on an array of *anything* while still relating the element type to the return type.

Without generics you would choose between `any[]` (loses the type) or one function per element type (repetition). `T` gives you one function that stays type-safe for every element type.
