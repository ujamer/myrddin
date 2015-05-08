import DS from 'ember-data';

export default DS.Model.extend({
  settings: Ember.inject.service(),
  title: DS.attr('string'),
  author: DS.belongsTo('user'),
  threads: DS.hasMany('thread'),
  postsPerPage: DS.attr('number')
});
