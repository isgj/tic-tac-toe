import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'tic-tac-toe/config/environment';

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
      const body = {
        auth: {
          email: this.get('email'),
          password: this.get('password')
        }
      };
      fetch(`${ENV.host}/auth/login`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((resp) => {
        if (resp.status === 404)
          return this.set('errors', ['Invalid email or password']);
        else
          return resp.json();
      }).then(data => {
        if (data.jwt) {
          this.get('session').login(data.jwt);
          const prevTransition = this.get('previousTransition');
          if (prevTransition) {
            this.set('previousTransition', null);
            prevTransition.retry();
          } else {
            this.transitionToRoute('games');
          }
        }
        if (data.errors) return Promise.reject(data);
      }).catch((reason) => {
        let errors = [];
        if (reason.errors && reason.errors.email) {
          errors = [...reason.errors.email.map(e => `Email: ${e}`)];
        }
        if (reason.errors && reason.errors.password) {
          errors = [...errors, ...reason.errors.password.map(e => `Password: ${e}`)];
        }
        if (errors.length) this.set('errors', errors);
        else this.set('errors', ['Error from the server']);
        this.toggleProperty('login');
      })
    }
  }
});
