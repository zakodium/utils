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

// Technical symbol for `OpaqueType`
declare const opaqueRoot: unique symbol;

/**
 * A way to improve type-safety by ensuring values with generic types (like primitives)
 * have a meaningfull type name related to business logic.
 *
 * To avoid type casting across a project,
 * each declared OpaqueType should have a sibling method to cast `T` to the declared OpaqueType.
 * `buildAsOpaque` is a typesafe helper to generate this casting method.
 *
 * Bonus point, It becomes easy to locate the boundaries between the outside and the inside of a domain
 * by searching the usage of this method.
 * @example
 * ```ts
 * export type NumberId = OpaqueType<number, 'NumberId'>;
 * export const numberId = buildAsOpaque<NumberId>();
 *
 * export type MarkdownString = OpaqueType<string, 'MarkdownString'>;
 * export const markdownString = buildAsOpaque<MarkdownString>();
 *
 * interface Post {
 *  id: NumberId;
 *  title: string;
 *  body: MarkdownString;
 * }
 * declare function findPost(id: NumberId): Post | null;
 *
 * function handleAPICall(params: {postId: number}) {
 *  const postId = numberId(params.postId);
 *
 *  return findPost(postId);
 * }
 * ```
 */
export type OpaqueType<T, K extends string> = T & {
  readonly [opaqueRoot]: K;
};

type OpaqueTypeBase<Opaque extends OpaqueType<unknown, string>> =
  Opaque extends OpaqueType<infer Base, string> ? Base : never;

type OpaqueTypeCastGenerator<Opaque extends OpaqueType<unknown, string>> = (
  value: OpaqueTypeBase<Opaque>,
) => Opaque;

/**
 * @example
 * ```ts
 * export type NumberId = OpaqueType<number, 'NumberId'>;
 * export const numberId = buildAsOpaque<NumberId>();
 * ```
 */
export function buildAsOpaque<
  Opaque extends OpaqueType<unknown, string>,
>(): OpaqueTypeCastGenerator<Opaque> {
  return (value) => value as Opaque;
}
