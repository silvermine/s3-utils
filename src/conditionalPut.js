'use strict';

var Q = require('q'),
    _ = require('underscore'),
    AWS = require('aws-sdk'),
    s3 = new AWS.S3(),
    getter = require('./getFileBody');

/**
 * Gets a file from S3 (using ./getFileBody.js) using the params that are
 * passed in, compares the value of the file that's on S3 already to the "body"
 * that you want to put on S3. If they are the same, returns false, indicating
 * that no put was done. If the existing file does not exist or differs, calls
 * putObject and returns the promise from the putObject call.
 *
 * NOTE: uses the params value for both the get and put object operations.
 * Extends the params to add a Body value for the put operation if a put is
 * needed.
 *
 * @param object params the parameters used by getObject and extended for
 * putObject
 * @param string body the string to write to S3 for this file
 * @return mixed the putObject response if the file was written, false
 * otherwise
 */
module.exports = function conditionalPut(params, body) {
   return getter(params)
      .then(function(existing) {
         if (existing instanceof Buffer && (typeof body) === 'string') {
            existing = existing.toString();
         }

         if (_.isEqual(existing, body)) {
            return false;
         }

         return Q.ninvoke(s3, 'putObject', _.extend({}, params, { Body: body }));
      });
};
