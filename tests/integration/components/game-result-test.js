import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import { computed } from '@ember/object';

const Me = Service.extend({
  data: computed(function () {
    return { sub: 1, email: 'user1' };
  })
})
module('Integration | Component | game-result', function (hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    this.owner.register('service:me', Me);
  })

  test('it shows your turn', async function (assert) {
    this.set('game', {
      host: { id: 1, email: 'user1' },
      guest: { id: 2, email: 'user2' },
      next_player: 1,
    })
    await render(hbs`<GameResult @game={{game}}/>`);

    assert.ok(this.element.textContent.trim().includes('Your turn'), 'shold show is your turn');
  });

  test('it shows waiting for other player', async function (assert) {
    this.set('game', {
      host: { id: 1, email: 'user1' },
      guest: { id: 2, email: 'user2' },
      next_player: 2,
    })
    await render(hbs`<GameResult @game={{game}}/>`);

    assert.ok(this.element.textContent.trim().includes('Waiting user2'), 'should wait for other user');
  });

  test('it shows finished result', async function (assert) {
    this.set('game', {
      host: { id: 1, email: 'user1' },
      guest: { id: 2, email: 'user2' },
      next_player: 2,
      finished: true
    })
    await render(hbs`<GameResult @game={{game}}/>`);

    assert.ok(this.element.textContent.trim().includes('Finished'), 'should show game is finished');
    assert.ok(this.element.textContent.trim().includes('Result:'), 'should show the result');
  });
});
