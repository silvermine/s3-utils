'use strict';

var _ = require('underscore'),
    Q = require('q'),
    sinon = require('sinon'),
    expect = require('expect.js'),
    rewire = require('rewire'),
    conditionalPut = rewire('../conditionalPut');

describe('conditionalPut', function() {
   var s3 = { putObject: _.noop },
       getExistingStub, putStub, revert;

   beforeEach(function() {
      getExistingStub = sinon.stub();
      putStub = sinon.stub(s3, 'putObject');

      revert = conditionalPut.__set__({
         s3: s3,
         getter: getExistingStub,
      });
   });

   afterEach(function() {
      revert();
      putStub.restore();
   });

   it('does not write when the existing values are the same', function() {
      getExistingStub.returns(Q.delay('some-value-that-matches', 3));

      return conditionalPut({ foo: 1 }, 'some-value-that-matches')
         .then(function(resp) {
            sinon.assert.notCalled(s3.putObject);
            sinon.assert.calledOnce(getExistingStub);
            sinon.assert.calledWith(getExistingStub, { foo: 1 });
            expect(resp).to.be(false);
         });
   });

   it('does write when the existing values are different', function() {
      var passedInParams = { foo: 1 };

      getExistingStub.returns(Q.delay(new Buffer('some-old-value-that-we-read'), 3));
      putStub.callsArgWithAsync(1, null, 'fantabulous');

      return conditionalPut(passedInParams, 'some-new-value-to-write')
         .then(function(putObjectResponse) {
            sinon.assert.calledOnce(s3.putObject);
            sinon.assert.calledWith(s3.putObject, { foo: 1, Body: 'some-new-value-to-write' });
            sinon.assert.calledOnce(getExistingStub);
            sinon.assert.calledWith(getExistingStub, { foo: 1 });

            // in at least one test we need to make sure that our passed-in params
            // are not modified in the function:
            expect(passedInParams.Body).to.be(undefined);
            expect(passedInParams).to.eql({ foo: 1 });

            expect(putObjectResponse).to.eql('fantabulous');
         });
   });

   it('does write when no file exists', function() {
      getExistingStub.returns(Q.delay(false, 3));
      putStub.callsArgWithAsync(1, null, 'fantabulous');

      return conditionalPut({ foo: 1 }, 'some-new-value-to-write')
         .then(function(putObjectResponse) {
            sinon.assert.calledOnce(s3.putObject);
            sinon.assert.calledWith(s3.putObject, { foo: 1, Body: 'some-new-value-to-write' });
            sinon.assert.calledOnce(getExistingStub);
            sinon.assert.calledWith(getExistingStub, { foo: 1 });

            expect(putObjectResponse).to.eql('fantabulous');
         });
   });

});
