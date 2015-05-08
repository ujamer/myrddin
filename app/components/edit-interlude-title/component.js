import Ember from 'ember';

export default Ember.Component.extend({
  title: null,
  resetWidth: function(padding) {
    padding = typeof padding != "undefined" ? padding : 5;

    // resize function
    var curID = Ember.guidFor(this);
    this.$().after('<p id="fake_'+curID+'" style="display:inline;position:absolute;top:-999px;">'+this.title.htmlSafe()+'</p>');
    var newWidth= Ember.$('#fake_'+curID).width()+2+padding;
    //console.log(Ember.$('#fake_'+curID).html());

    Ember.$('#fake_'+curID).remove();
    this.$('input[type=text]').css('width',newWidth > 50 ? newWidth : 50);
  }.on('didInsertElement'),

  actions: {
    updateTitle: function() {
      this.resetWidth();
      this.sendAction('action', this.get('param'));
    },

    updateSize: function() {
      //console.log('key pressed!');
      this.resetWidth(25);
    }
  }
});
