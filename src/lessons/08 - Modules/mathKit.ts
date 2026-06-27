// A companion module for the Modules lesson. The demo imports from it.
// It is a plain .ts file, so the lesson registry (which only scans *.tsx) does not treat it as a lesson.

export interface Vector {
  x: number
  y: number
}

export const PI = 3.14159 // a named export

export function add(a: Vector, b: Vector): Vector { // a named export
  return { x: a.x + b.x, y: a.y + b.y }
}

export default function magnitude(v: Vector): number { // the default export
  return Math.hypot(v.x, v.y)
}
