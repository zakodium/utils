import { expect, expectTypeOf, test } from 'vitest';

// Ensure it is exported from the index
import type { OpaqueType } from '../index.ts';
import { buildAsOpaque } from '../index.ts';

test('classic scenario', () => {
  type NumberId = OpaqueType<number, 'NumberId'>;
  const numberId = buildAsOpaque<NumberId>();

  const value = 0;
  const valueAsOpaque = numberId(value);

  expect(value).toBe(valueAsOpaque);

  expectTypeOf(value).toEqualTypeOf(0);
  expectTypeOf(value).not.toEqualTypeOf(valueAsOpaque);
  expectTypeOf(valueAsOpaque).not.toEqualTypeOf(value);
  expectTypeOf(valueAsOpaque).toEqualTypeOf<NumberId>();
});

test('ensure generated helper disallow values with wrong base type', () => {
  type NumberId = OpaqueType<number, 'NumberId'>;
  const numberId = buildAsOpaque<NumberId>();

  // @ts-expect-error Ensure generated helper generate a TypeScript compilation error when bind wrong type parameter
  const invalidTypedValue = numberId('invalid type value');

  // runtime can't catch this kind of invalid usage and the helper return the value as-is
  expect(invalidTypedValue).toBe('invalid type value');

  expectTypeOf(invalidTypedValue).toEqualTypeOf<NumberId>();
  expectTypeOf(invalidTypedValue).not.toEqualTypeOf<string>();
});

test('opaque compatible with base type', () => {
  type NumberId = OpaqueType<number, 'NumberId'>;
  const numberId = buildAsOpaque<NumberId>();

  const opaqueValue = numberId(0);
  const reOpaqueValue = numberId(opaqueValue);

  expectTypeOf(opaqueValue).toEqualTypeOf<NumberId>();
  expectTypeOf(reOpaqueValue).toEqualTypeOf<NumberId>();
  expectTypeOf(opaqueValue).toBeNumber();
  expectTypeOf(reOpaqueValue).toBeNumber();

  expect(reOpaqueValue).toBe(opaqueValue);
  expect(opaqueValue).toBe(0);
});
