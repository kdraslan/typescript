**Interpolating unions produces every combination.**

`` `${Lang}-${Region}` `` with `Lang = 'en' | 'de'` and `Region = 'US' | 'GB'` expands to all four strings: `'en-US' | 'en-GB' | 'de-US' | 'de-GB'`.

Each interpolated union multiplies the result, so this is a compact way to describe a whole family of allowed strings.
