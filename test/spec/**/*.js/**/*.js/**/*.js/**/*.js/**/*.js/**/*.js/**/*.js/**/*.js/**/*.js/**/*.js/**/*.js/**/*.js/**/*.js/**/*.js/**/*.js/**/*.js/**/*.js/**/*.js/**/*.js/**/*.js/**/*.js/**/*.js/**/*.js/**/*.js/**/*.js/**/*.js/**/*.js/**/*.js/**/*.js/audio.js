// (function () {
//   'use strict';

//   describe('AudioStuffIsLoaded', function () {
//     describe('Functions can be called', function () {
//       it('this should be called and false', function () {
//           assert.equal(doWhat(), false)
//       });
//     });
//   });
// })();
suite('Array', function() {

  suite('#indexOf()', function() {
    test('should return -1 when not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

