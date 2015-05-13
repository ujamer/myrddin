import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  thread: DS.belongsTo('thread'),
  postedOn: DS.attr('string'),
  content: DS.attr('string'),
  isHead: DS.attr('boolean')
});
