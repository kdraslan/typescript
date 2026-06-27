**Build handler names with `Capitalize`.**

`` `on${Capitalize<DomEvent>}` `` turns `'click' | 'hover'` into `'onClick' | 'onHover'`. This is the trick libraries use to type event-prop names from a list of events.

`Capitalize` only changes the first letter; it is one of the four intrinsic case helpers.
