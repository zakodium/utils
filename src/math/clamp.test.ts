import { expect, test } from 'vitest';

import { clamp } from './clamp.ts';

test('returns the value unchanged when within bounds', () => {
  expect(clamp(5, 0, 10)).toBe(5);
});

test('clamps to min when value is below min', () => {
  expect(clamp(-3, 0, 10)).toBe(0);
});

test('clamps to max when value is above max', () => {
  expect(clamp(15, 0, 10)).toBe(10);
});

test('returns value equal to min unchanged', () => {
  expect(clamp(0, 0, 10)).toBe(0);
});

test('returns value equal to max unchanged', () => {
  expect(clamp(10, 0, 10)).toBe(10);
});

test('defaults min to -Infinity when not provided', () => {
  expect(clamp(-1e10, undefined, 10)).toBe(-1e10);
});

test('defaults max to Infinity when not provided', () => {
  expect(clamp(1e10, 0, undefined)).toBe(1e10);
});

test('returns the value unchanged when no bounds are provided', () => {
  expect(clamp(42, undefined, undefined)).toBe(42);
});

test('handles min greater than max by favoring max (Math.min applied last)', () => {
  expect(clamp(5, 10, 0)).toBe(0);
});

test('handles NaN by propagating NaN', () => {
  expect(clamp(Number.NaN, 0, 10)).toBeNaN();
});
