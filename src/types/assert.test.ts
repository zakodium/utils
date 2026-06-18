import { describe, expect, expectTypeOf, it } from 'vitest';

import {
  assert as internalAssert,
  assertDefined,
  assertDefinedNotNull,
  assertUnreachable,
} from './assert.ts';

type Value = object | boolean | null | undefined;

function getValue(value: Value): Value {
  return value;
}

describe('assert', () => {
  it('should assert', () => {
    const a = getValue({});
    internalAssert(a);

    expectTypeOf(a).toEqualTypeOf<object | true>();
  });

  it('should assert throw default message', () => {
    const a = getValue(null);

    expect(() => internalAssert(a)).toThrow('value null is falsy');
  });

  it('should assert throw custom message', () => {
    const a = getValue(null);

    expect(() => internalAssert(a, 'a must be defined')).toThrow(
      'a must be defined',
    );
  });

  it('should assert throw custom lazy message', () => {
    const a = getValue(null);

    expect(() =>
      internalAssert(a, () => `a (${JSON.stringify(a)}) must be truthy`),
    ).toThrow('a (null) must be truthy');
  });

  it('should assert throw on falsy', () => {
    const falsies = [undefined, null, false, '', 0];

    for (const value of falsies) {
      expect(() => internalAssert(value, 'Should not be falsy')).toThrow(
        'Should not be falsy',
      );
    }
  });
});

describe('assertDefined', () => {
  const map = new Map<string, string>([
    ['foo', 'bar'],
    ['empty', ''],
  ]);

  it('should assertDefined foo', () => {
    const foo = map.get('foo');
    assertDefined(foo);

    expectTypeOf(foo).toEqualTypeOf<string>();
  });

  it('should assertDefined empty', () => {
    const empty = map.get('empty');
    assertDefined(empty);

    expectTypeOf(empty).toEqualTypeOf<string>();
  });

  it('should assertDefined throw on bar', () => {
    const bar = map.get('bar');

    expect(() => assertDefined(bar)).toThrow('unexpected undefined value');
  });
});

describe('assertDefinedNotNull', () => {
  const record: Record<string, string | null> = {
    foo: 'bar',
    empty: '',
    null: null,
  };

  it('should assertDefinedNotNull foo', () => {
    const foo = record.foo;
    assertDefinedNotNull(foo);

    expectTypeOf(foo).toEqualTypeOf<string>();
  });

  it('should assertDefinedNotNull empty', () => {
    const empty = record.empty;
    assertDefinedNotNull(empty);

    expectTypeOf(empty).toEqualTypeOf<string>();
  });

  it('should assertDefinedNotNull throw on null', () => {
    const value = record.null;

    expect(() => assertDefinedNotNull(value)).toThrow('unexpected null value');
  });
});

type MyEnum = 'a' | 'b' | 'c';
function getMyEnumValue(value: MyEnum): MyEnum {
  return value;
}

describe('assertUnreachable', () => {
  it('valid value switch-case', () => {
    const value = getMyEnumValue('a');

    switch (value) {
      case 'a':
        expectTypeOf(value).toEqualTypeOf<'a'>();

        break;
      case 'b':
      case 'c':
        expectTypeOf(value).toEqualTypeOf<'b' | 'c'>();

        break;
      default:
        assertUnreachable(value);
    }
  });

  it('invalid value switch-case', () => {
    // @ts-expect-error put invalid value to ensure assertUnreachable throws
    const value = getMyEnumValue('z');

    expect(() => {
      switch (value) {
        case 'a':
        case 'b':
        case 'c':
          break;
        default:
          assertUnreachable(value);
      }
    }).toThrow('unreachable: z');
  });
});
