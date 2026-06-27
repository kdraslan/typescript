<p align="center">
  <img alt="TypeScript" src="assets/typescript.svg" width="84">
</p>

<h1 align="center">TypeScript</h1>

<p align="center">Coding exercises and tutorials to build a solid TypeScript foundation.</p>

<p align="center">Following the course at <a href="https://www.typescript-training.com">typescript-training.com</a>.</p>

---

## What this is

A personal learning repo for working through TypeScript fundamentals, exercise by exercise, alongside
the linked course. Companion to the [React training repo](https://github.com/kdraslan/react): React
first (in plain JS), then TypeScript on top here.

## Getting started

Prerequisites: Node.js and Yarn (Berry). Dependencies use Yarn Plug'n'Play (`.pnp.cjs`), so there is
no `node_modules` folder.

```sh
yarn install
```

Type-check the source with the TypeScript compiler:

```sh
yarn tsc --noEmit
```

> Build / dev / lint / test scripts will be added to `package.json` as the project grows.

## Project structure

- `src/` — TypeScript source files (exercises and notes).
- `tsconfig.json` — compiler configuration.
- `package.json` · `yarn.lock` · `.pnp.cjs` — Yarn Berry (Plug'n'Play) dependency management.
- `.editorconfig` · `.gitattributes` · `.gitignore` — editor and Git hygiene.
