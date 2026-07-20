import { describe, expect, expectTypeOf, it } from 'vitest';

import {
  assert as internalAssert,
  assertDefined,
  assertDefinedNotNull,
  assertIn,
  assertNotNullish,
  assertUnreachable,
} from './assert.ts';
import type { Nullish } from './types.ts';

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

describe('assert implicit', () => {
  it('should assert object properties', () => {
    interface Foo {
      foo: string;
      bar?: number | Nullish;
      baz?: string | Nullish;
    }

    const fooOptional: Foo = {
      foo: 'foo',
    };

    const fooRequired: Foo = {
      foo: 'foo',
      bar: 1,
      baz: 'baz',
    };

    internalAssert(fooRequired.bar && fooRequired.baz);

    expectTypeOf(fooRequired.bar).toEqualTypeOf<number>();
    expectTypeOf(fooRequired.baz).toEqualTypeOf<string>();

    expect(() =>
      internalAssert(
        fooOptional.bar && fooOptional.baz,
        'bar and baz should be defined',
      ),
    ).toThrow('bar and baz should be defined');
  });

  it('should assert discriminated union', () => {
    type Foo = { type: 'foo'; foo: string } | { type: 'bar'; bar: number };

    const foo: Foo = { type: 'foo', foo: 'foo' };
    const bar: Foo = { type: 'bar', bar: 1 };

    internalAssert(foo.type === 'foo');
    internalAssert(bar.type === 'bar');

    expectTypeOf(foo).toEqualTypeOf<{ type: 'foo'; foo: string }>();
    expectTypeOf(bar).toEqualTypeOf<{ type: 'bar'; bar: number }>();
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

describe('assertNotNullish', () => {
  const record: Record<string, string | null> = {
    foo: 'bar',
    empty: '',
    null: null,
  };

  it('should assertNotNullish foo', () => {
    const foo = record.foo;
    assertNotNullish(foo);

    expectTypeOf(foo).toEqualTypeOf<string>();
  });

  it('should assertNotNullish empty', () => {
    const empty = record.empty;
    assertNotNullish(empty);

    expectTypeOf(empty).toEqualTypeOf<string>();
  });

  it('should assertNotNullish throw on null', () => {
    const value = record.null;

    expect(() => assertNotNullish(value)).toThrow('unexpected null value');
  });

  it('should assertDefinedNotNull throw on null', () => {
    const value = record.null;

    // eslint-disable-next-line @typescript-eslint/no-deprecated
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

type Unit = 'ppm' | 'hz' | 'pt' | 's';
const fidUnits = ['pt', 's'] as const satisfies Unit[];
const ftUnits = ['pt', 'ppm', 'hz'] as const satisfies Unit[];

function getFidUnit(unit: (typeof fidUnits)[number]): Unit {
  return unit;
}

function getFtUnit(unit: (typeof ftUnits)[number]): Unit {
  return unit;
}

describe('should assertIn', () => {
  it('fid', () => {
    const fidUnit = getFidUnit('pt');
    assertIn(fidUnit, fidUnits);

    expectTypeOf(fidUnit).toEqualTypeOf<'pt' | 's'>();

    expect(() => assertIn('hz', fidUnits)).toThrow(
      `Value hz is not in [${fidUnits.join(',')}]`,
    );
  });

  it('ft', () => {
    const ftUnit = getFtUnit('pt');
    assertIn(ftUnit, ftUnits);

    expectTypeOf(ftUnit).toEqualTypeOf<'pt' | 'ppm' | 'hz'>();

    expect(() => assertIn('s', ftUnits)).toThrow(
      `Value s is not in [${ftUnits.join(',')}]`,
    );
  });
});
