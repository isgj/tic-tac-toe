import { Promise } from 'rsvp';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import ENV from 'tic-tac-toe/config/environment';


export default BaseAuthenticator.extend({
  token: null,
  authenticate(email, password) {
    const body = {
      auth: {
        email: email,
        password: password
      }
    };
    return new Promise((resolve, reject) => {
      fetch(`${ENV.host}/auth/login`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((resp) => {
        if (resp.status === 404)
          return reject(['Invalid email or password']);
        else
          return resp.json();
      }).then(data => {
        if (data && data.jwt) {
          resolve({ token: data.jwt });
        }
        if (data && data.errors) return reject(data);
      })
    })
  },
  invalidate() {
    return Promise.resolve();
  },
  restore(data) {
    if (!data.token) return Promise.reject();
    return Promise.resolve(data);
  }
})
