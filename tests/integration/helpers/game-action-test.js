import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | game-action', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders your turn', async function (assert) {
    this.set('inputValue', [
      { next_player: 1 },
      { sub: 1 }
    ]);

    await render(hbs`{{game-action inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Your turn');
  });
});
