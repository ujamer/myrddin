import Ember from 'ember';

export default Ember.Component.extend({
  settings: Ember.inject.service(),

  actions: {
    togglePreviewVisible: function() {
      this.get('settings').set('showPanel',!this.get('settings').showPanel);
    }
  }
});
