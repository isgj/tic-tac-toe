import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  session: service(),
  logged: computed('session.token', function () {
    return this.get('session.token');
  }),
  actions: {
    logOut() {
      this.get('session').logout();
      this.transitionToRoute('login');
    }
  }
});
