# Silvermine S3 Utilities

[![Build Status](https://travis-ci.org/silvermine/s3-utils.svg?branch=master)](https://travis-ci.org/silvermine/s3-utils)
[![Coverage Status](https://coveralls.io/repos/github/silvermine/s3-utils/badge.svg?branch=master)](https://coveralls.io/github/silvermine/s3-utils?branch=master)
[![Dependency Status](https://david-dm.org/silvermine/s3-utils.svg)](https://david-dm.org/silvermine/s3-utils)
[![Dev Dependency Status](https://david-dm.org/silvermine/s3-utils/dev-status.svg)](https://david-dm.org/silvermine/s3-utils#info=devDependencies&view=table)


## What is it?

This is a collection of utility functions that may be useful if you are working
with AWS S3, and especially if you prefer promises over callbacks.


## How do I use it?

The code is primarily a set of autonomous functions that you can import and use
in your code. They are all well-tested, small, and stable. Here's an example of
how you would use them:

```js
var conditionalPut = require('silvermine-s3-utils/conditionalPut');

return conditionalPut({ Bucket: 'foo', Key: 'bar' }, 'some-value');
```


## How do I contribute?

We genuinely appreciate external contributions. See [our extensive
documentation](https://github.com/silvermine/silvermine-info#contributing) on
how to contribute.


## License

This software is released under the MIT license. See [the license
file](LICENSE) for more details.
