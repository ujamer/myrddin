import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var store = this.store;
    return store.find('document',params.doc_id);
  },

  afterModel: function(doc) {
    this.replaceWith('documents.view', doc);
  }
});
