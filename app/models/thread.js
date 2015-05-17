import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  location: DS.attr('string'),
  startPage: DS.attr('number'),
  endPage: DS.attr('number'),
  doc: DS.belongsTo('document'),
  posts: DS.hasMany('post',{
    embedded: 'always',
    inverse: 'thread'
  }),

  firstPost: DS.belongsTo('headpost',{
    embedded: 'always'
  }),

  lastPost: Ember.computed(function () {

  }),
});
