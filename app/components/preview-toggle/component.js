import Ember from 'ember';

export default Ember.Component.extend({
  settings: Ember.inject.service(),
  showOutput: function () {
    return this.get('settings').get('showOutput');
  }.property('settings.showOutput'),
  actions: {
    togglePreviewVisible: function() {
      this.get('settings').set('showPanel', !this.get('settings').showPanel);
    },

    toggleToOutput: function() {
      this.get('settings').set('showOutput', true);
		},

		toggleToPreview: function() {
      this.get('settings').set('showOutput', false);
		},

    selectAllText: function() {
      var outEl = Ember.$('#interludeTextContent').get(0);
      if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(outEl);
        selection.removeAllRanges();
        selection.addRange(range);
      } else if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(outEl);
        range.select();
      }
    }
  }
});
