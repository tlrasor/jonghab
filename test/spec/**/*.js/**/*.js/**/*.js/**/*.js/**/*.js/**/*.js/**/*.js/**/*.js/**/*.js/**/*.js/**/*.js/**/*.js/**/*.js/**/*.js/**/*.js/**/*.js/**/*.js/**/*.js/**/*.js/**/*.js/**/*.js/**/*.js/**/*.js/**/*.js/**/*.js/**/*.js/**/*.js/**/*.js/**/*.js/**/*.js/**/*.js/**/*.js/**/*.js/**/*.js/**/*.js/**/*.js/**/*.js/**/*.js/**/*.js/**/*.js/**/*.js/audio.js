(function () {
  'use strict';
  var assert = require('assert');

  describe('AudioStuffIsLoaded', function () {
    describe('Functions can be called', function () {
      it('this should be called and false', function () {
          assert.equal(doWhat(), false)
      });
    });
  });
})();
