import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  me: service(),
  result: computed('game.winner', function () {
    if (!this.game.winner) return 'Tie';
    const player = this.game.winner === this.game.host.id ? this.game.host : this.game.guest;
    if (this.get('me.data').sub == player.id) return 'You won';
    return `${player.email} won`;
  }),
  host: computed(function () {
    if (this.get('me.data').sub == this.game.host.id) return 'You';
    return this.game.host.email;
  }),
  guest: computed('game.guest', function () {
    if (this.get('me.data').sub == this.game.guest.id) return 'You';
    return this.game.guest.email;
  })
});
