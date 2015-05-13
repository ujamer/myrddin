import Ember from 'ember';

export default Ember.Route.extend({
  settings: Ember.inject.service(),

  beforeModel: function() {
    this.get('settings').set('enabled',false);
  },

  model: function() {
    var store = this.store;
    
    return store.find('document');
  },

  actions: {
    deleteDoc: function(id) {
      console.log(id);

      return true;
    }
  }
});
