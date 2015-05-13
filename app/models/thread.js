import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  location: DS.attr('string'),
  startPage: DS.attr('number'),
  endPage: DS.attr('number'),
  doc: DS.belongsTo('document'),
  posts: DS.hasMany('post',{embedded: 'always'}),
});
