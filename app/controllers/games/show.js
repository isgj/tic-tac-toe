import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { throttle } from '@ember/runloop';
import ENV from 'tic-tac-toe/config/environment';

export default Controller.extend({
  game: null,
  session: service(),
  loading: false,
  me: computed('session.user', function () {
    return this.get('session').user;
  }),
  gameSpots: computed('model', function () {
    return this.get('model').state.split(',');
  }),
  gameFinished: computed('model', function () {
    return this.get('model').winner;
  }),
  play(index) {
    const { me, model, gameSpots, loading } = this.getProperties('me', 'model', 'gameSpots', 'loading');
    if (loading || me.sub != model.next_player || gameSpots[index] !== '-' || model.finished) return;
    this.toggleProperty('loading');
    fetch(`${ENV.host}/api/v1/games/${model.id}?spot=${index}`, {
      method: 'PATCH',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.get('session').token}`
      },
    }).then(resp => {
      this.toggleProperty('loading')
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
        case 422:
          this.set('errors', ['Bad data was sent']);
          break;
        default:
          return resp.json();
      }
    }).then(data => {
      this.set('model', data.game);
    });
  },
  updateGame() {
    throttle(this, this.update, 1500)
  },
  update() {
    fetch(`${ENV.host}/api/v1/games/${this.model.id}`, {
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
      this.set('model', data.game)
    })
  }
});
