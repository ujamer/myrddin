import DS from 'ember-data';

export default DS.Model.extend({
  docs: DS.belongsTo('document'),
  start: DS.attr('number'),
  tag: DS.belongsTo('tag'),
  user: DS.belongsTo('user'),
  isDefault: DS.attr('boolean')
});
