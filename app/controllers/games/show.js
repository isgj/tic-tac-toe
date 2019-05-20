import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'tic-tac-toe/config/environment';

export default Controller.extend({
  game: null,
  session: service(),
  loading: false,
  me: computed('session.user', function () {
    return this.get('session').user;
  }),
  gameState: computed('model', 'game', function () {
    if (this.get('game')) return this.get('game');
    return this.get('model');
  }),
  gameSpots: computed('gameState', function () {
    return this.get('gameState').state.split(',');
  }),
  gameFinished: computed('gameState', function () {
    return this.get('gameState').winner;
  }),
  play(index) {
    const { me, gameState, gameSpots, loading } = this.getProperties('me', 'gameState', 'gameSpots', 'loading');
    if (loading || me.sub !== gameState.next_player || gameSpots[index] !== '-') return;
    this.toggleProperty('loading');
    fetch(`${ENV.host}/api/v1/games/${gameState.id}?spot=${index}`, {
      method: 'PATCH',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.get('session').token}`
      },
    }).then(resp => {
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
          return resp.json();
      }
    }).then(data => {
      this.set('game', data.game);
    })
  }
});
