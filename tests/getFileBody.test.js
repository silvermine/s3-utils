'use strict';

var _ = require('underscore'),
    sinon = require('sinon'),
    expect = require('expect.js'),
    rewire = require('rewire'),
    getFileBody = rewire('../getFileBody');

describe('getFileBody', function() {
   var s3 = { getObject: _.noop },
       getStub, revert;

   beforeEach(function() {
      getStub = sinon.stub(s3, 'getObject');

      revert = getFileBody.__set__({
         s3: s3,
      });
   });

   afterEach(function() {
      revert();
      getStub.restore();
   });

   it('returns false for non-existent files', function() {
      getStub.callsArgWithAsync(1, { errorMessage: 'foo', statusCode: 404 });

      return getFileBody({ Bucket: 'foo', Key: 'bar' })
         .then(function(data) {
            sinon.assert.calledOnce(s3.getObject);
            sinon.assert.calledWith(s3.getObject, { Bucket: 'foo', Key: 'bar' });
            expect(data).to.be(false);
         });
   });

   it('rejects the promise if there is a non-404 error', function() {
      var expectedErr = { statusCode: 403, message: 'access denied' },
          wasRejected = false;

      getStub.callsArgWithAsync(1, expectedErr);

      return getFileBody({ Bucket: 'foo', Key: 'bar' })
         .catch(function(err) {
            expect(err).to.eql(expectedErr);
            wasRejected = true;
         })
         .then(function() {
            if (!wasRejected) {
               expect().fail('expected promise to be rejected');
            }
         });
   });

   it('returns body of getObject call', function() {
      var body = new Buffer('this is my body');

      getStub.callsArgWithAsync(1, null, { Body: body });

      return getFileBody({ Bucket: 'foo', Key: 'bar' })
         .then(function(data) {
            sinon.assert.calledOnce(s3.getObject);
            sinon.assert.calledWith(s3.getObject, { Bucket: 'foo', Key: 'bar' });

            expect(data).to.eql(body);
         });
   });

});
