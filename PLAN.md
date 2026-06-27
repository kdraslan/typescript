# TypeScript Training, build plan (handoff)

Goal: build a TypeScript training course as a runnable app, reusing the skeleton of the **React
training app** at `../react` (github kdraslan/react). Same UX: sidebar of lessons, live result beside
the source, hover any source line for a markdown note, resizable split divider, light/dark theme.
Only the lesson content changes (TypeScript instead of React).

This is a handoff from the chat that built the React app. Read it, confirm the open decisions with
the user, then build. The new chat needs read access to `../react` to copy the skeleton, so open it
with the `Personal` parent folder available (not scoped to `typescript` alone).

## The plan, in one line

Bring the skeleton from the React repo, copy the application, remove the React stuff, and create the
TypeScript stuff here.

## Conventions to keep (carried from the React repo)

- One folder per lesson: `NN - PascalCaseLabel` (spaces, acronyms caps), e.g. `01 - Types`, `02 - Interfaces`.
- One demo file per lesson, camelCase: `types.tsx`, `interfaces.tsx`. Exports `meta` (section/title/summary) plus a default demo component.
- Explanations live as markdown in `<lesson>/notes/<camelCase>.md`. The demo code stays clean and references a note by a terse comment (`// narrowing` or `{/* narrowing */}`); the app renders that note as a hover tooltip. Each note: bold headline plus a short, plain explanation.
- camelCase everywhere except the lesson folder labels.
- Comments beside code, brief. No em dashes.
- The registry auto-discovers lessons via `import.meta.glob`. Adding a lesson = adding a folder.
- Do NOT auto-commit. Make changes, leave them in the working tree; the user commits.

## Quality bar (what "complete" means)

The user holds lessons to a high standard, set after the React course's lesson 03 (which they called
"complete and proper"). Match it:

- Make demos **interactive**: let the user trigger and *see* the subtle or gotcha behavior live, not just the happy path.
- Pair right-vs-wrong so the contrast is visible (something that looks like it should work but doesn't, next to the correct version).
- Notes explain the **why / mechanism** in a few clear sentences, with an analogy to the learner's prior knowledge where it helps. Not one-liners.
- Cover the traps a learner would actually hit. A lesson is done when the common mistakes are demonstrated and explained, not just the API shown.
- **Explain new terms** in plain words the first time they appear. Never name-drop jargon and assume the reader already knows it.

## Step 1, copy the skeleton from `../react`

Bring over the app infrastructure only (not the lessons):

- `index.html`, `vite.config.js`, `.gitignore`
- `src/main.jsx`, `src/App.jsx`, `src/styles.css`
- `src/components/ResizableGrid.jsx`, `src/components/CodeBlock.jsx`, `src/components/ThemeToggle.jsx`
- `src/lessons/registry.js`
- `assets/` logos: this repo already has `assets/typescript.svg`, use that instead of the React one.

Dependencies to mirror from `../react/package.json`: `react`, `react-dom`, `vite`,
`@vitejs/plugin-react`, `highlight.js`, `marked`. React here is purely the UI harness for the app, it
is not a subject being taught.

Tooling note: this repo currently uses Yarn Berry (PnP) plus `tsc`, with no app yet. Decide with the
user whether to keep Yarn or switch to npm to match the React repo. Either works with Vite.

## Step 2, convert to TypeScript and remove the React content

- Rename the copied shell to TypeScript: `main.tsx`, `App.tsx`, `ResizableGrid.tsx`, `CodeBlock.tsx`, `ThemeToggle.tsx`, `registry.ts`. Add types as you go (the app itself being TypeScript is fitting for a TS course, and a nice self-demonstration).
- Add/adjust `tsconfig.json` for a Vite React + TS app (`jsx: "react-jsx"`, `moduleResolution: "bundler"`, `strict: true`). A tsconfig already exists here, adapt or replace it.
- Do NOT copy the React lessons (`01 - JSX`, `02 - ComponentsAndProps`, `03 - State`, `04 - Events`). Those teach React; this course teaches TypeScript.
- Swap branding: React logo and README framing become TypeScript. The README and `assets/typescript.svg` already exist here.

## Step 3, decide what a "live result" is for a TS lesson

The React app's left panel renders a live React component. TypeScript is a compile-time type system,
so confirm the demo model with the user. Options:

- Run the lesson's code and show its console output / returned values in the panel. Types erase at
  runtime, but the runtime behavior plus the typed source plus the hover notes teach the concept.
- For type-only topics (generics, narrowing, utility types), show worked type results as text, or
  intentionally show what the compiler would reject.

Recommended: keep a `Demo` component per lesson that renders some concrete output, and let the hover
notes carry the type explanations. Confirm before building lessons.

## Step 4, build the curriculum (suggested, confirm with user)

Following typescript-training.com plus fundamentals:

1. Types & inference
2. Interfaces & type aliases
3. Unions & narrowing
4. Functions & generics
5. Objects, arrays, tuples
6. Utility types (`Partial`, `Pick`, `Record`, ...)
7. Classes & access modifiers
8. Modules & declaration files

Then advanced: conditional types, mapped types, template literal types, declaration merging.

Confirm scope and order with the user before writing lessons.
