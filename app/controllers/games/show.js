import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { throttle } from '@ember/runloop';

export default Controller.extend({
  session: service(),
  me: service(),
  gameSpots: computed('model.state', function () {
    return this.get('model.state').split(',');
  }),
  gameFinished: computed('model.winner', function () {
    return this.get('model.winner');
  }),
  play(index) {
    const { me, model, gameSpots } = this.getProperties('me', 'model', 'gameSpots');
    if (me.data.sub != model.next_player || gameSpots[index] !== '-' || model.finished) return;
    model.set('spot', index);
    model.save().then(game => {
      this.set('model', game);
    })
  },
  updateGame() {
    throttle(this, this.update, 1500)
  },
  update() {
    this.store.findRecord('game', this.model.id).then(game => {
      this.set('model', game);
    })
  }
});
