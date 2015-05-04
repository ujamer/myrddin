import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  documents: DS.hasMany('document'),
  threads: DS.hasMany('thread'),
  posts: DS.hasMany('post'),
  tags: DS.hasMany('tag')
});
