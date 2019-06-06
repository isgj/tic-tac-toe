import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  loading: false,
  errors: null,
  me: service(),
  myGames: computed('model',
    function () {
      const models = this.get('model');
      const me = this.get('me.data');
      return models.filter(game => {
        return game.host.id === me.sub || (game.guest && game.guest.id === me.sub);
      })
    }),
  newGames: computed('model',
    function () {
      const models = this.get('model');
      const me = this.get('me.data');
      return models.filter(game => {
        return game.host.id !== me.sub && !game.guest;
      })
    }),
  partecipate(game) {
    const gameModel = this.store.peekRecord('game', game.id)
    gameModel.save()
      .then((game) => {
        this.transitionToRoute('games.show', game.id);
      })
      .catch(error => {
        this.set('errors', error)
      })
  },
  goTo(game) {
    this.transitionToRoute('games.show', game);
  },
  newGame() {
    this.toggleProperty('loading');
    const me = this.get('me.data');
    const game = this.store.createRecord('game', { host: me });
    game.save().then(resp => {
      switch (resp.status) {
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
