import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  location: DS.attr('string'),
  startPage: DS.attr('number',{
    defaultValue: 1
  }),
  endPage: DS.attr('number',{
    defaultValue: 1
  }),
  doc: DS.belongsTo('document'),
  posts: DS.hasMany('post',{
    embedded: 'always',
    inverse: 'thread'
  }),

  firstPost: DS.belongsTo('headpost',{
    embedded: 'always'
  }),

  lastPost: Ember.computed('posts', 'firstPost', {
    get() {
      var replies = this.get('posts');
      if (replies.length === 0) {
        return this.get('firstPost');
      } else {
        return replies.get('lastObject');
      }
    }
  }),
});
