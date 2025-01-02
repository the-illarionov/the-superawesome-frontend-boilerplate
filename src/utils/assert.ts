export function assert(condition: any, msg?: string): asserts condition {
  if (!condition)
    throw new Error(`Assertion failed! ${msg}`)
}
