import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  state: DS.attr('string'),
  winner: DS.attr('number'),
  next_player: DS.attr('number'),
  finished: DS.attr('boolean'),
  host: DS.attr(),
  guest: DS.attr()
});
