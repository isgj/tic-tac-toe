import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | game-guest', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the email', async function (assert) {
    this.set('inputValue', { guest: { email: 'email' } });

    await render(hbs`{{game-guest inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'email', 'should render the email');
  });

  test('it renders Noone', async function (assert) {
    this.set('inputValue', {});

    await render(hbs`{{game-guest inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Noone', 'should render Noone');
  });
});
