**Module augmentation extends types you do not own.**

`declare global { interface Window { appVersion: string } }` merges a new property into the built-in `Window` interface, so `window.appVersion` type-checks across the whole app.

The same technique inside `declare module 'some-lib'` adds types to a third-party package. It is interface merging aimed at a declaration that lives somewhere else: the global scope, or another module.
