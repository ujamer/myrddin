import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  docs: DS.hasMany('document'),
  posts: DS.hasMany('post'),
  threads: DS.hasMany('headpost'),
  tags: DS.hasMany('tag')
});
