/**
 * Creates a promise that resolves after some time.
 * @param n Number of milliseconds before promise resolves
 */
function timeout(n: number) {
  return new Promise((res) => setTimeout(res, n))
}

/**
 * Adds two numbers.
 * @param a First number
 * @param b Second number
 */
export async function addNumbers(a: number, b: number) {
  await timeout(500)
  return a + b
}

class Foo {
  static #bar = 3
  static getValue() {
    return Foo.#bar
  }
}

(async () => {
  console.log(await addNumbers(Foo.getValue(), 4))
})()
