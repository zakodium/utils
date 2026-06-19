import { expect, test } from 'vitest';

import { noop } from './noop.ts';

test('noop should always returns undefined', () => {
  expect(noop()).toBeUndefined();

  // @ts-expect-error check if add truthy arguments continue to return undefined
  expect(noop({})).toBeUndefined();
});
