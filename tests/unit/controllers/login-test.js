import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | login', function (hooks) {
  setupTest(hooks);


  test('it should not submit on error', function (assert) {
    let controller = this.owner.lookup('controller:login');
    controller.set('session', {
      authenticate() {
        assert.notOk(true, 'should not come here');
      }
    })
    assert.ok(controller.get('passwordError'), 'should error on empty password');
    assert.ok(controller.get('emailError'), 'should error on empty email');
    controller.send('login');
  });

  test('it should submit with the right values', function (assert) {
    let controller = this.owner.lookup('controller:login');
    controller.set('session', {
      authenticate(action, email, password) {
        assert.ok(true, 'should submit');
        assert.equal(email, 'email@email.com', 'should submit the right email');
        assert.equal(password, '123456', 'should submit the right password');
        return Promise.resolve();
      }
    })
    controller.set('email', 'email@email.com');
    controller.set('password', '123456');
    assert.notOk(controller.get('passwordError'), 'should have no password error');
    assert.notOk(controller.get('emailError'), 'should have no email error');
    controller.send('login');
  });
});
