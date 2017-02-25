'use strict';

var Q = require('q'),
    AWS = require('aws-sdk'),
    s3 = new AWS.S3();

/**
 * Returns false if a file did not exist, otherwise returns the string or
 * buffer of the "Body" field of the getObject response.
 *
 * @param object params the parameters to pass to getObject
 * @return mixed the Body of the getObject response, or false if the file did
 * not exist
 */
module.exports = function getExistingFileBody(params) {
   return Q.ninvoke(s3, 'getObject', params)
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
