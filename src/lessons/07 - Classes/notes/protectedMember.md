**`protected` is private, plus subclasses.**

`applyRate` cannot be called from outside, but a subclass *can* call it. That is the difference from `private`, which not even subclasses can reach.

Use `protected` for building blocks meant to be reused by classes that extend you, but not by general callers.
