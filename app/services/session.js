import Service from '@ember/service';

const TOKEN_KEY = '_token';

export default Service.extend({
  init() {
    this._super();
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && token.length) this.set('token', token)
  },
  token: null,
  login(token) {
    this.set('token', token);
    localStorage.setItem(TOKEN_KEY, token)
  },
  logout() {
    this.set('token', null);
    localStorage.setItem(TOKEN_KEY, '');
  }
});
