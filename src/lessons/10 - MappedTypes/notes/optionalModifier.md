**Add `?` while mapping to make every key optional.**

`{ [K in keyof User]?: User[K] }` copies the shape and marks each property optional. That is the definition of `Partial<User>`.

The modifiers `readonly` and `?` can be added during the map, which is why so many utility types are one-line mapped types.
