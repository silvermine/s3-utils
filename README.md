# Silvermine S3 Utilities

[![NPM Version][npm-version]][npm-version-url]
[![License][license-badge]](./LICENSE)
[![Build Status][build-status]][build-status-url]
[![Coverage Status][coverage-status]][coverage-status-url]

## What is it?

This is a collection of utility functions that may be useful if you are working
with AWS S3, and especially if you prefer promises over callbacks.

## How do I use it?

The code is primarily a set of autonomous functions that you can import and use
in your code. They are all well-tested, small, and stable. Here's an example of
how you would use them:

```js
var conditionalPut = require('@silvermine/s3-utils/conditionalPut');

return conditionalPut({ Bucket: 'foo', Key: 'bar' }, 'some-value');
```

## How do I contribute?

We genuinely appreciate external contributions. See [our extensive
documentation][contributing-url] on
how to contribute.

## License

This software is released under the MIT license. See [the license
file](./LICENSE) for more details.

[npm-version]: https://img.shields.io/npm/v/@silvermine/s3-utils.svg
[npm-version-url]: https://www.npmjs.com/package/@silvermine/s3-utils
[license-badge]: https://img.shields.io/github/license/silvermine/s3-utils.svg
[build-status]: https://github.com/silvermine/s3-utils/actions/workflows/ci.yml/badge.svg
[build-status-url]: https://travis-ci.org/silvermine/s3-utils.svg?branch=master
[coverage-status]: https://coveralls.io/repos/github/silvermine/s3-utils/badge.svg?branch=master
[coverage-status-url]: https://coveralls.io/github/silvermine/s3-utils?branch=master
[contributing-url]: https://github.com/silvermine/silvermine-info#contributing
