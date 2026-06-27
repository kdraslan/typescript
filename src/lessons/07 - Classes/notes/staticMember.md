**`static` belongs to the class, not the instance.**

`BankAccount.bankName` is read off the class itself. Every instance shares it, and you access it without `new`.

Use statics for things that are not tied to one object: constants, factory methods, counters shared across instances.
