import Ember from 'ember';

export default Ember.Component.extend({
  title: null,
  inFocus: false,
  resetWidth: function(padding) {
    padding = typeof padding !== "undefined" ? padding : 5;

    // resize function
    var curID = Ember.guidFor(this);
    var fakeText = this.get('title') !== null ? this.get('title') : "";
    this.$().after('<p id="fake_'+curID+'" style="display:inline;position:absolute;top:-999px;">'+fakeText.htmlSafe()+'</p>');
    var newWidth= Ember.$('#fake_'+curID).width()+2+padding;
    //console.log(Ember.$('#fake_'+curID).html());

    Ember.$('#fake_'+curID).remove();
    this.$('input[type=text]').css('width',newWidth > 50 ? newWidth : 50);
  }.on('didInsertElement'),

  resetOnChange: function() {
    this.resetWidth(10);
  }.observes('title'),

  keyDown: function(event) {
    if (this.get('inFocus')) {
      if (event.keyCode === 9 || event.keyCode === 13) {
        // pressed the escape key or enter key
        this.$(".ember-text-field").blur();
        this.send('updateTitle');
      }
    }
  },

  actions: {
    focusIn: function() {
      this.set('inFocus', true);
    },

    updateTitle: function() {

      this.set('inFocus', false);
      this.resetWidth();
      this.sendAction('action', this.get('param'));
    },

    updateSize: function() {
      //console.log('key pressed!');
      this.resetWidth(25);
    }
  }
});
