/**
 * Conditional type casting. You are responsible for ensuring that the condition implies the type casting.
 * @param value
 * @param condition
 * @example Spectrum
 * ```ts
 * interface BaseSpectrum {
 *  dimension: number;
 * }
 * interface Spectrum1D extends BaseSpectrum {
 *  foo: number;
 * }
 * interface Spectrum2D extends BaseSpectrum {
 *  bar: number;
 * }
 *
 * const spectrum: Spectrum = {...null};
 *
 * if (is<Spectrum1D>(spectrum, spectrum.dimension === 1)) {
 *  // spectrum is Spectrum1D
 *  void spectrum.foo;
 * }
 * else if (is<Spectrum2D>(spectrum, spectrum.dimension === 2)) {
 *  // spectrum is Spectrum2D
 *  void spectrum.bar;
 * }
 * ```
 * @example Build spectrum check helper
 * Hide type checks with noisy syntax in dedicated helpers.
 *
 * ```ts
 * function isSpectrum1D(spectrum: Spectrum) {
 *   return is<Spectrum1D>(spectrum, spectrum.dimension === 1);
 * }
 *
 * function isSpectrum2D(spectrum: Spectrum) {
 *   return is<Spectrum2D>(spectrum, spectrum.dimension === 1);
 * }
 * ```
 */
// The purpose of this method is to cast the value to Output.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function is<Output>(
  value: unknown,
  condition: boolean,
): value is Output {
  void value;
  return condition;
}

/**
 * Casts the value to the Output type.
 * This kind of helpers should be avoided whenever it is possible. It is roughly equivalent to `as unknown as Output` cast. There is not checks.
 * Use it when you are sure that the value is of the Output type, but for some reason TypeScript is not able to infer it,
 * and for optimization purpose you want to avoid the redundant checks.
 * @param value
 * @example Valid use-case, runner with de-corelated checks from run method.
 *
 * ```ts
 * interface Operator<Value> {
 *  id: string;
 *  isApplicable: (value: Value) => boolean;
 *  apply: (value: Value) => void;
 * }
 *
 * interface Operation {
 *  uid: string;
 *  operatorId: string;
 * }
 *
 * const operators = new Map<string, Operator<unknown>>([
 *  [
 *    'add',
 *    {
 *      id: 'add',
 *      isApplicable: isSpectrum1D,
 *      apply: (spectrum: Spectrum) => {
 *        cast<Spectrum1D>();
 *        spectrum.foo += 1;
 *      },
 *    },
 *  ]
 * ]);
 *
 * function run(value: unknown, operations: Operation[]) {
 *  for (const operation of operations) {
 *    const operator = operators.get(operation.operatorId);
 *    assertDefined(operator);
 *    assert(operator.isApplicable(value));
 *    operator.apply(value);
 *  }
 * }
 * ```
 */
// The purpose of this method is to cast the value to Output.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function cast<Output>(value: unknown): asserts value is Output {
  void value;
}
