import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'tic-tac-toe/config/environment';

export default Controller.extend({
  session: service(),
  loading: false,
  errors: null,
  me: computed('session.user', function () {
    return this.get('session').user;
  }),
  myGames: computed('model', 'loading',
    function () {
      const models = this.get('model');
      const me = this.get('me');
      return models.filter(game => {
        return game.host.id === me.sub || (game.guest && game.guest.id === me.sub);
      })
    }),
  newGames: computed('model',
    function () {
      const models = this.get('model');
      const me = this.get('me');
      return models.filter(game => {
        return game.host.id !== me.sub && !game.guest;
      })
    }),
  partecipate(game) {
    this.toggleProperty('loading');
    fetch(`${ENV.host}/api/v1/games/${game.id}/partecipate`, {
      method: 'PATCH',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.get('session').token}`
      }
    }).then(resp => {
      const me = this.get('me');
      switch (resp.status) {
        case 401:
          this.transitionToRoute('login');
          break;
        case 404:
          this.set('errors', ['Game not avaible']);
          break;
        case 500:
          this.set('errors', ['Server error']);
          break;
        default:
          game.set('guest', me);
          game.set('next_player', me.sub);
          this.transitionToRoute('games.show', game.id);
      }
    }).catch(error => this.set('errors', error));
    this.toggleProperty('loading');
  },
  goTo(game) {
    this.transitionToRoute('games.show', game);
  },
  newGame() {
    this.toggleProperty('loading');
    const me = this.get('me');
    const game = this.store.createRecord('game', { host: me });
    game.save().then(resp => {
      switch (resp.status) {
        case 401:
          this.transitionToRoute('login');
          break;
        case 500:
          this.set('errors', ['Server error']);
          break;
        default:
          this.transitionToRoute('games.show', game.id)
      }
      this.toggleProperty('loading')
    }).catch(() => {
      this.toggleProperty('loading');
      this.set('errors', ['Couldn\'t create game']);
    })
  }
});
