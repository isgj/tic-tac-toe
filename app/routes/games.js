import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import DS from 'ember-data';

export default Route.extend(AuthenticatedRouteMixin, {
  actions: {
    error(error) {
      if (error instanceof DS.NotFoundError) {
        // redirect to a list of all games instead
        this.transitionTo('games');
      } else {
        // otherwise let the error bubble
        return true;
      }
    }
  }
});
