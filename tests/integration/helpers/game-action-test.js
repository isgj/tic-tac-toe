import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | game-action', function (hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    this.set('host', { id: 1, email: 'user1' });
    this.set('guest', { email: 'user2' });
    this.set('next_player', 1);
    this.set('me', { sub: 1, email: 'user1' });
  })

  test('it renders your turn', async function (assert) {

    await render(hbs`{{game-action host guest next_player me}}`);

    assert.equal(this.element.textContent.trim(), 'Your turn', 'should render your turn');
  });

  test('it renders waiting new user', async function (assert) {
    this.set('next_player', null);
    this.set('guest', null);
    await render(hbs`{{game-action host guest next_player me}}`);

    assert.equal(this.element.textContent.trim(), 'Waiting for a new player', 'should render waiting');
  });

  test('it renders waiting other user', async function (assert) {
    this.set('next_player', 2);
    await render(hbs`{{game-action host guest next_player me}}`);

    assert.equal(this.element.textContent.trim(), 'Waiting user2', 'should render waiting user2');
  });
});
