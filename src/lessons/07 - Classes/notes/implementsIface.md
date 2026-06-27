**`implements` checks a class against an interface.**

`class BankAccount implements Account` makes the compiler verify the class has everything `Account` requires: `owner`, `balance`, and a `deposit` method, with matching types.

`implements` only checks; it adds nothing. Leave it off and the class still works, you just lose the guarantee that it stays in sync with the contract.
