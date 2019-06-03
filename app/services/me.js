import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Service.extend({
  session: service(),
  data: computed('session.data.authenticated.token', function () {
    try {
      return JSON.parse(atob(this.get('session.data.authenticated.token').split('.')[1]))
    } catch (e) {
      return {}
    }
  })
});
