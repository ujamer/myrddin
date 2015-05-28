import DS from 'ember-data';

export default DS.Model.extend({
  docs: DS.hasMany('document'),
  tag: DS.belongsTo('tag'),
  user: DS.belongsTo('user'),
  start: DS.attr('string'),
  isDefault: DS.attr('boolean')
});
