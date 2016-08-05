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
(function() {
suite('Audio', function() {

  suite('#doWhat()', function() {
    test('doWhat is false', function() {
      assert.equal(doWhat(), false);
    });
  });
});
})();

