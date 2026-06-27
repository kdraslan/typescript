**Methods get typed parameters and returns like any function.**

`deposit(amount: number): void` is the public way to change the private `_balance`. Outside code cannot touch the field directly, so all changes go through this one checked entry point.

`void` means the method returns nothing useful; it is called for its effect.
