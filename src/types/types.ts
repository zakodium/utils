/**
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Nullish
 */
export type Nullish = null | undefined;

/**
 * - NaN is falsy, but it does not have a literal type in TypeScript.
 * - `0`, `-0` TypeScript type literal is the same.
 * - `HTMLAllCollection` (typeof `document.all`) is ignored from this type for lib portability.
 *   It is deprecated. If you use it, you should know it is falsy.
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 */
export type Falsy = Nullish | false | 0 | '';

/**
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Primitive
 * @see PropertyKey
 */
export type Primitive = PropertyKey | boolean | bigint | Nullish;
export type JSONPrimitive = Exclude<Primitive, symbol | bigint>;
export type JSONValue =
  | JSONPrimitive
  | JSONValue[]
  | { [key: string]: JSONValue };

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

/**
 * Like Nullable<Optional<T>>
 * @see Nullable
 * @see Optional
 */
export type Maybe<T> = T | Nullish;
export type Mandatory<T> = Exclude<T, Nullish>;

/**
 * @see https://www.totaltypescript.com/concepts/the-prettify-helper
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
export type PrettifyDeep<T> = {
  [K in keyof T]: PrettifyDeep<T[K]>;
} & {};

/**
 * Make all properties in T mutable.
 * It is the opposite of `Readonly<T>`.
 * @see Readonly
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Make all properties in T required and non-nullish.
 * It is like `Required<T>` but with non-nullish values.
 * @see Required
 * @see Mandatory
 */
export type RequiredMandatory<T> = {
  [P in keyof T]-?: Mandatory<T[P]>;
};

/**
 * Pick properties from T and make them required.
 * Other properties are kept as is.
 * @see Required
 * @see Pick
 */
export type RequiredPick<T, K extends keyof T> = {
  [Pick in K]-?: T[Pick];
} & {
  [Omit in Exclude<keyof T, K>]: T[Omit];
};

/**
 * Pick properties from T and make them partial.
 * Other properties are kept as is.
 * @see Partial
 * @see Pick
 */
export type PartialPick<T, K extends keyof T> = {
  [Pick in K]?: T[Pick];
} & {
  [Omit in Exclude<keyof T, K>]: T[Omit];
};
