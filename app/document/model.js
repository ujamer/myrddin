import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  user: DS.belongsTo('user'),
  userTags: DS.hasMany('usertag'),
  threads: DS.hasMany('thread',{embedded: 'always'}),
  postsPerPage: DS.attr('number')
});
