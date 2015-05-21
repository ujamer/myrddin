import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(str) {

  console.log(str);
  return "#000";
});
