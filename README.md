<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/typescript-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/typescript-light.svg">
    <img alt="TypeScript" src="assets/typescript-dark.svg" width="84">
  </picture>
</p>

<h1 align="center">TypeScript Training</h1>

<p align="center">A hands-on TypeScript course that runs as a live app, built lesson by lesson.</p>

<p align="center">Following the curriculum at <a href="https://www.typescript-training.com">typescript-training.com</a> plus the fundamentals.</p>

---

## What this is

A self-contained course for learning TypeScript. It runs as a small app: pick a lesson in the
sidebar and you get the **live result** next to its **source**, side by side. Hover any source line
for a markdown explanation of the type concept on that line.

Companion to the [React training repo](https://github.com/kdraslan/react): React first (in plain
JavaScript), then TypeScript here. The app shell is itself written in TypeScript, so the tool is a
worked example of its own subject.

## Getting started

```bash
npm install
npm run dev
```

Open the printed URL (defaults to http://localhost:5173).

Other scripts:

```bash
npm run build      # type-check (tsc) then bundle with Vite
npm run typecheck  # type-check only
npm run preview    # serve the production build
```

## Using the app

- **Sidebar** — pick a lesson. Lessons are grouped by section.
- **Live result** (left tile) — the lesson's code, run. Types erase at runtime, so type-only topics
  print their resolved types as compiler-verified values.
- **Source** (right tile) — the lesson's code. **Hover any line** to highlight it and read a
  markdown explanation in a tooltip.
- **Divider** — drag it to resize the two tiles.
- **Theme toggle** — top-right, switches light / dark (remembered across reloads).

## How it works

- Each lesson is a folder under `src/lessons/`, e.g. `01 - Types/`, auto-discovered by
  `src/lessons/registry.ts`.
- The one demo file `01 - Types/types.tsx` exports `meta` (title/section/summary) and a default demo
  component.
- `01 - Types/notes/*.md` are the explanations. Code references a note by name with a terse comment
  (`// inference`), and hovering that line renders `notes/inference.md` as markdown in a tooltip.
- Adding a lesson = adding a folder. Nothing else to wire up.
- `src/App.tsx` is the shell (sidebar + panels), itself a small typed React app.

Naming: lesson folders are `NN - PascalCaseLabel` with spaces (acronyms kept caps). The single demo
`.tsx` and the note files are camelCase (`types.tsx`, `inference.md`).

## Curriculum

**1 · Fundamentals** — Types & Inference · Interfaces & Type Aliases · Unions & Narrowing

**2 · Functions & Objects** — Functions & Generics · Objects, Arrays & Tuples

**3 · Type System Tools** — Utility Types · Classes & Access Modifiers · Modules & Declaration Files

**4 · Advanced Types** — Conditional Types · Mapped Types · Template Literal Types · Declaration Merging

## Tech

Vite · TypeScript (`strict`) · React 18 · `highlight.js` (syntax highlighting) · `marked` (markdown
notes). React is only the UI harness for the app; the subject being taught is TypeScript.
