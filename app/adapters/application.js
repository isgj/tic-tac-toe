import DS from 'ember-data';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'tic-tac-toe/config/environment';

export default DS.RESTAdapter.extend({
  host: ENV.host,
  namespace: '/api/v1',
  session: service(),
  headers: computed(function () {
    return {
      'Authorization': `Bearer ${this.get('session.token')}`
    }
  })
});
