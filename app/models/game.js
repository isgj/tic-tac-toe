import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  state: DS.attr('string'),
  winner: DS.attr('number'),
  next_player: DS.attr('number'),
  host: DS.attr(),
  guest: DS.attr()
});
