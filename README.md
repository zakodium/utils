# @zakodium/utils

[![NPM version](https://img.shields.io/npm/v/@zakodium/utils.svg)](https://www.npmjs.com/package/@zakodium/utils)
[![npm download](https://img.shields.io/npm/dm/@zakodium/utils.svg)](https://www.npmjs.com/package/@zakodium/utils)
[![test coverage](https://img.shields.io/codecov/c/github/zakodium/utils.svg)](https://app.codecov.io/gh/zakodium/utils)
[![license](https://img.shields.io/github/license/zakodium/utils.svg)](https://github.com/zakodium/utils/blob/main/LICENSE)

Small utilities by zakodium for zakodium.

## Installation

```console
npm install @zakodium/utils
```

## Usage

```js
import { assertNotNullish } from '@zakodium/utils';

const value: object | string | number | boolean | null | undefined = JSON.parse(someJsonString);

assertNotNullish(value); // throws if value is null or undefined

value;
// value type is object | string | number | boolean
```

## List of utilities

- [API Reference](https://zakodium.github.io/utils/)

## Features that could be added later

- Iterable helpers like `map`, `filter` and so on.
  Could be useful when IteratorHelpers is not available. Or add some more niche helpers like `chunkify`.
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
- functional helpers like `pipe` and so on.
  Could be useful until the pipe operator is not available.
  https://github.com/tc39/proposal-pipeline-operator

## TypeScript types

[Total TypeScript](https://www.totaltypescript.com/) from [Matt Pocock](https://github.com/mattpocock)
is a great inspiration for type utilities exported by this package.

## License

[MIT](./LICENSE)
