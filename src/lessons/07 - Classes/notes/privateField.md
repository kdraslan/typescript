**`private` hides a member outside the class.**

`_balance` is reachable inside `BankAccount` but `acct._balance` from outside is a compile error.

This `private` is enforced by the compiler only; at runtime the field is still there. For *real* runtime privacy use the JavaScript `#name` syntax: `#balance`, which is truly inaccessible from outside.
