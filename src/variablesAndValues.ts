/** Variable Declarations & Inference */

let temperature = 6 // ✓ Type is inferred here.

// temperature = "warm" // ✕ Type checking fails.
const humidity = 79 // ✓ Literal type is set.

/** A type is a set of allowed values */

temperature = 23 // ✓ Can be reassigned.
temperature = humidity // ✓ Type checking.
// humidity = temperature // ✕ Fails since `number` is not of type `79`

/** An extensive thinking of types as sets */

let newTemperature = 19; // ✓ newTemperature's type is { all numbers }
let newHumidity = 79 as const // ✓ newHumidity's type is { 79 }
newTemperature = 23 // ✓ Is each member in { 23 } also in { all numbers }?
newTemperature = newHumidity // ✓ Is each member in { 79 } also in { all numbers }?
// newHumidity = newTemperature // ✕ Is each member in { all numbers } also in { 79 }?
newHumidity = 79 // ✓ Is each member in { 79 } also in { 79 }
// newHumidity = 78 // ✕ Is each member in { 78 } also in { 79 }

/** Implicit `any` and type annotations */

export const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500

let startTime = new Date()
let endTime // ✓ endTime's type is `any`

setTimeout(() => {
    endTime = 0
    endTime = new Date()
}, RANDOM_WAIT_TIME)


export const ANOTHER_RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500

let anotherStartTime = new Date()
let anotherEndTime: Date // ✓ endTime's type is `Date`

setTimeout(() => {
  // anotherEndTime = 0 // ✕ Now this fails as types do not match.
  anotherEndTime = new Date()
}, RANDOM_WAIT_TIME)

/** Type casting */

let someDate = new Date("Jan 1, 2012")
let someOtherDate = someDate // ✓ someOtherDate's type is `Date`
let yetAnotherDate = someDate as any // ✓ yetAnotherDate's type is `any`

const yetAnotherHumidity = 79 as number; // ✓ Is 79 a number? If so, this is safe!

let yetAgainAnotherDate = "oops" as any as Date // ✕ TypeScript thinks this is a `Date` now, but it's really a `string`!
// yetAgainAnotherDate.toISOString() // ✕ What do you think will happen when we run this? → TypeError: enoughWithDates.toISOString is not a function

// let enoughWithDates = "oops" as Date // ✕ What will happen? → Conversion of type 'string' to type 'Date' may be a mistake

// ✕ Function arguments and return values


/** Function arguments and return values */

function add(a, b) { return a + b } // ✕ Both have implicit `any` types and what will they return?
function anotherAdd(a: number, b: string): string { return a + b }
function yetAnotherAdd(a: number, b: number) {
  if (Math.random() > 0.5) {
    return a + b
  }
}

const result = add(3, "4")
const anotherResult = anotherAdd(3, "4")
const yetAnotherResult = yetAnotherAdd(3, 4)

yetAnotherResult.toExponential(); // May or may not give error as return type of the function is `number | undefined` now. Declare the type!

console.log(result) // This actually prints `34` now.

const promise = new Promise(result) // Silent error! → TypeError: Promise resolver 34 is not a function → Because of inferred `any` type!
// const anotherPromise = new Promise(anotherResult) // Now the silent error disappears!
