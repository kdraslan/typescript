**One import line, two kinds of export.**

`import magnitude, { add, PI } from './mathKit.ts'` brings in the *default* export (named whatever you like, here `magnitude`) and the *named* exports `add` and `PI` (names must match).

A module's exports are its entire public surface. Anything not exported is private to that file.
