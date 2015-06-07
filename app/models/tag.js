import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  users: DS.hasMany('user'),
  userTags: DS.hasMany('usertag'),
  colorizer: Ember.inject.service('hash-colorizer'),
  color: function () {
    var idString = this.get('id');
    var tagCol = this.get('colorizer').colorScheme(idString);

    return Ember.String.htmlSafe(tagCol);
  }.property('id'),
});
