import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession, invalidateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import Service from '@ember/service';
import { computed } from '@ember/object';


const MeService = Service.extend({
  data: computed(function () {
    return { sub: 1, email: 'user1' };
  })
})

module('Acceptance | list games', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    await authenticateSession({
      token: `token.token.token`
    })
    this.owner.register('service:me', MeService);
  })

  test('should redirect to login if not auth', async function (assert) {
    invalidateSession();
    await visit('/');

    assert.equal(currentURL(), '/login');
  });

  test('should show games as home page', async function (assert) {

    await visit('/');
    assert.equal(currentURL(), '/games', 'should redirect to /games');
  });

  test('should list games the user partecipates', async function (assert) {
    this.server.createList('game', 3, 'withHost');
    await visit('/games');

    assert.ok(this.element.querySelector('h2').textContent.trim().includes('(3)'), 'header should include the number');
    assert.equal(this.element.querySelector('table tbody').children.length, 3, 'should have 3 children');
  })

  test('should list games the user can partecipate', async function (assert) {
    this.server.createList('game', 4, 'withHost', { host: { id: 2 } });
    await visit('/games');

    assert.ok(this.element.querySelectorAll('h2')[1].textContent.trim().includes('(4)'), 'header should include the number');
    assert.equal(this.element.querySelectorAll('table tbody')[1].children.length, 4, 'should have 4 children');
  })

  test('should navigate to game route when clicked the id', async function (assert) {
    this.server.createList('game', 3, 'withHost');
    await visit('/games');
    await click('table tbody tr a');

    assert.equal(currentURL(), '/games/1', 'should navigate to games.show');
    assert.ok(this.element.querySelector('h2').textContent.trim().includes('number 1'), 'should show the right game');
  })
});
