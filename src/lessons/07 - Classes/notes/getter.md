**A getter exposes a value as a read-only property.**

`get balance()` is accessed like a field (`acct.balance`, no parentheses) but runs code. With no matching `set`, the property is read-only from outside, which is how this class satisfies `readonly balance` on the interface.

Getters are the clean way to expose derived or guarded state while keeping the backing field private.
