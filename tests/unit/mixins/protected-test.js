import EmberObject from '@ember/object';
import ProtectedMixin from 'tic-tac-toe/mixins/protected';
import { module, test } from 'qunit';

module('Unit | Mixin | protected', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ProtectedObject = EmberObject.extend(ProtectedMixin);
    let subject = ProtectedObject.create();
    assert.ok(subject);
  });
});
