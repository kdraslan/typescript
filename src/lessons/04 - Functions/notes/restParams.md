**Rest parameters collect the extras into a typed array.**

`...nums: number[]` gathers every argument into an array of numbers, so `sum(1, 2, 3, 4)` is valid and `sum(1, 'two')` is not.

A rest parameter must be last, and there can be only one.
