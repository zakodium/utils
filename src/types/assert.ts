/**
 * Basic assertion with (a possible lazy) message.
 * Pay attention, it will throw an error if the value is falsy, even for 0, false, and empty strings.
 * If these cases are not desired, use `assertDefined` or `assertDefinedNotNull` instead.
 * @param value
 * @param message
 */
export function assert(
  value: unknown,
  message: string | (() => string) = `value ${String(value)} is falsy`,
): asserts value {
  if (!value) {
    const finalMessage = typeof message === 'function' ? message() : message;
    throw new Error(finalMessage);
  }
}

/**
 * Asserts that the given value is unreachable.
 * Whenever possible, use ts-pattern instead.
 * @param value
 * @example switch-case
 * ```ts
 * type MyEnum = 'a' | 'b' | 'c';
 * const myEnum: MyEnum = 'a';
 *
 * switch (myEnum) {
 *  case 'a':
 *  case 'b':
 *  case 'c':
 *    break;
 *  default:
 *    assertUnreachable(myEnum);
 * }
 * ```
 */
export function assertUnreachable(value: never): never {
  throw new Error(`unreachable: ${String(value)}`);
}

/**
 * Ensures that the given value is not undefined.
 * Useful to validate that value gotten from an array or record object is defined.
 * Pay attention, it will throw an error only if the value is undefined.
 * null will not throw an error. If you need it to throw an error for null, use `assertDefinedNotNull` instead.
 * @param value
 * @example get map item previously set
 * ```ts
 * const map = new Map<string, number>();
 * map.set('foo', 20);
 * map.set('bar', 22);
 * const foo = map.get('foo');
 * const bar = map.get('bar');
 * assertDefined(foo);
 * assertDefined(bar);
 * console.log(`Answer to the Ultimate Question of Life, the Universe, and Everything is ${foo + bar}`);
 * ```
 */
export function assertDefined<T>(
  value: T,
): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    throw new Error(`unexpected undefined value`);
  }
}

/**
 * Ensures that the given value is not null or undefined.
 * @param value
 * @example React Ref
 * ```ts
 * function Component() {
 *  const ref = useRef<HTMLSpanElement>(null);
 *  function onClick() {
 *    const span = ref.current;
 *    assertDefinedNotNull(span);
 *    span.textContent = 'Hello world!';
 *  }
 *
 *  return (
 *    <div>
 *      <button onClick={onClick}>Click me</button>
 *      <span ref={ref}></span>
 *    </div>
 *  )
 * }
 *
 * ```
 */
export function assertDefinedNotNull<T>(
  value: T,
): asserts value is Exclude<T, null | undefined> {
  // catch null and undefined
  if (value == null) {
    throw new Error(`unexpected ${String(value)} value`);
  }
}
