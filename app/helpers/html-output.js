import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(text) {
  if (text) {
    return new Ember.Handlebars.SafeString(text.replace(/\n/g, '<br>'));
  } else {
    return "";
  }
});