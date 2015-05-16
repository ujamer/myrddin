import Ember from 'ember';

export default Ember.Component.extend({
  inFocus: false,

  location: null,
  thread: null,

  keyDown: function(event) {
    if (this.get('inFocus')) {
      if (event.keyCode === 9 || event.keyCode === 13) {
        // pressed the escape key or enter key
        this.$(".ember-text-field").blur();
      }
    }
  },

  actions: {
    focusIn: function() {
      this.set('inFocus', true);
    },

    addSeparator: function() {
      this.set('location',this.get('location')+" ► ");
      this.send('saveChange');
      this.$(".ember-text-field").focus();
    },

    saveChange: function() {
      this.sendAction('saveChange', this.get('thread'), this.get('location'));
    }
  }
});
