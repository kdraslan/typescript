**`extends` inherits fields and methods.**

`SavingsAccount` gets everything from `BankAccount`, then adds `addYearlyInterest`. Inside it, `this.applyRate(...)` reaches the `protected` member from the parent.

A `SavingsAccount` is usable anywhere a `BankAccount` is expected (it is a subtype). If a subclass needs to run its own constructor logic, it must call `super(...)` first.
