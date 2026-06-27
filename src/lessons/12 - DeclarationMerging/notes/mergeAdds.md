**The second declaration contributes more members.**

This block adds `height` to the same `Box`. Order does not matter; the result is the union of all members from every declaration of that name.

The merge happens at the type level only. The most common real-world use is the next example down: augmenting a type from a library you cannot edit.
