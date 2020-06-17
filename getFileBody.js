'use strict';

var Q = require('q'),
    _ = require('underscore'),
    AWS = require('aws-sdk'),
    s3 = new AWS.S3(),
    RETAINED_KEYS;

RETAINED_KEYS = [
   'Bucket',
   'Key',
   'IfMatch',
   'IfModifiedSince',
   'IfNoneMatch',
   'IfUnmodifiedSince',
   'PartNumber',
   'Range',
   'RequestPayer',
   'ResponseCacheControl',
   'ResponseContentDisposition',
   'ResponseContentEncoding',
   'ResponseContentLanguage',
   'ResponseContentType',
   'ResponseExpires',
   'SSECustomerAlgorithm',
   'SSECustomerKey',
   'SSECustomerKeyMD5',
   'VersionId',
];

/**
 * Returns false if a file did not exist, otherwise returns the string or
 * buffer of the "Body" field of the getObject response.
 *
 * @param object params the parameters to pass to getObject
 * @return mixed the Body of the getObject response, or false if the file did
 * not exist
 */
module.exports = function getExistingFileBody(params) {
   return Q.ninvoke(s3, 'getObject', _.pick(params, RETAINED_KEYS))
      .then(function(resp) {
         return resp.Body;
      })
      .catch(function(err) {
         if (err.statusCode === 404) {
            return false;
         }

         throw err;
      });
};
