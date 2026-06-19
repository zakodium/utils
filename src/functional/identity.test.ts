import { expect, test } from 'vitest';

import { identity } from './identity.ts';

test('should return undefined', () => {
  expect(identity(undefined)).toBeUndefined();
});

test('should return null', () => {
  expect(identity(null)).toBeNull();
});

test('should return 0', () => {
  expect(identity(0)).toBe(0);
});

test('should return false', () => {
  expect(identity(false)).toBe(false);
});

test('should return string', () => {
  expect(identity('foo')).toBe('foo');
});

test('should return object as-is', () => {
  const object = {};

  expect(identity(object)).toBe(object);
});
