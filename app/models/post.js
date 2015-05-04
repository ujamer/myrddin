import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  author: DS.belongsTo('user'),
  postedOn: DS.attr('date'),
  content: DS.attr('string')
});
