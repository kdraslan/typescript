**Default export: one per module, named at the import.**

`magnitude` is the default export of `mathKit.ts`. A module can have at most one default, and the importer chooses the local name.

Handy for "the one main thing" a file provides (a React component, a class). The trade-off versus named exports is weaker rename tooling, since the name is decided per import.
