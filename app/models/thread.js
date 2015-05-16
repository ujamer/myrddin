import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  location: DS.attr('string'),
  startPage: DS.attr('number'),
  endPage: DS.attr('number'),
  doc: DS.belongsTo('document'),
  posts: DS.hasMany('post',{embedded: 'always'}),

  firstPost: function () {
  	return this.get('posts').objectAt(0);
  }.property('posts'),

  restPosts: function () {
  	return this.get('posts').filter(function (item) {
  		return !item.get('isHead');
  	});
  }.property('posts'),

  lastPost: function () {
  	return this.get('posts').get('lastObject');
  }.property('posts'),
});
