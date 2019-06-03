import Route from '@ember/routing/route';
import DS from 'ember-data';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { UnauthorizedError } = DS;

export default Route.extend(ApplicationRouteMixin, {
  actions: {
    error(error) {
      if (error instanceof UnauthorizedError) {
        // go to the sign in route
        this.transitionTo('login');
        return;
      }

    }
  }
});
