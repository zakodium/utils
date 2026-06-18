import { describe, expect, expectTypeOf, it } from 'vitest';

import { cast, is } from '../index.ts';

interface BaseEntity {
  type: string;
}

interface EntityFoo extends BaseEntity {
  foo: string;
}

interface EntityBar extends BaseEntity {
  bar: string;
}

type Entity = EntityFoo | EntityBar;

function getEntity(entity: Entity): Entity {
  return entity;
}

describe('is', () => {
  it('foo', () => {
    const entity = getEntity({ type: 'foo', foo: 'bar' });

    expect(is<EntityFoo>(entity, entity.type === 'foo')).toBe(true);

    // check type inside if
    // eslint-disable-next-line vitest/no-conditional-in-test
    if (is<EntityFoo>(entity, entity.type === 'foo')) {
      expectTypeOf(entity).toEqualTypeOf<EntityFoo>();

      // eslint-disable-next-line vitest/no-conditional-expect
      expect(entity.foo).toBe('bar');
    }
  });

  it('bar', () => {
    const entity = getEntity({ type: 'bar', bar: 'foo' });

    expect(is<EntityBar>(entity, entity.type === 'bar')).toBe(true);

    // check type inside if
    // eslint-disable-next-line vitest/no-conditional-in-test
    if (is<EntityBar>(entity, entity.type === 'bar')) {
      expectTypeOf(entity).toEqualTypeOf<EntityBar>();

      // eslint-disable-next-line vitest/no-conditional-expect
      expect(entity.bar).toBe('foo');
    }
  });
});

describe('cast', () => {
  it('should cast to foo', () => {
    const entity = getEntity({ type: 'foo', foo: 'bar' });
    cast<EntityFoo>(entity);

    expectTypeOf(entity).toEqualTypeOf<EntityFoo>();
  });

  it('should cast to bar', () => {
    const entity = getEntity({ type: 'bar', bar: 'foo' });
    cast<EntityBar>(entity);

    expectTypeOf(entity).toEqualTypeOf<EntityBar>();
  });
});
