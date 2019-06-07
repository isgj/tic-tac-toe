import { Factory, trait } from 'ember-cli-mirage';

export default Factory.extend({
  winner: null,
  next_player: 1,
  state: 'X,-,-,O,-,-,-,-,-',
  finished: false,
  withHost: trait({
    host: {
      id: 1,
      email: 'user1'
    }
  }),
  withGuest: trait({
    guest: {
      id: 2,
      email: 'user2'
    }
  })
});
