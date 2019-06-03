import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  email: '',
  password: '',
  errors: null,
  session: service(),
  passwordError: computed('password', function () {
    return this.get('password').length < 6;
  }),
  emailError: computed('email', function () {
    return !/[^@\s]+@[^@\s]+/.test(this.get('email'));
  }),
  login: false,
  actions: {
    login() {
      if (this.get('emailError') || this.get('passwordError')) {
        return;
      }
      this.set('login', true);
      const email = this.get('email');
      const password = this.get('password');
      this.get('session').authenticate('authenticator:token', email, password)
        .catch((reason) => {
          this.set('errors', reason.error || reason);
          this.set('login', false);
        });
    }
  }
});
