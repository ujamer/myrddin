import Ember from 'ember';

export default Ember.Route.extend({
  settings: Ember.inject.service(),

  beforeModel: function() {
    this.get('settings').set('enabled',true);
  },

  model: function(params) {
    var store = this.store;
    var curRouter = this.router;

    return store.find('document', params.doc_id).then(function(doc){
      var expectedSlug = doc.get('title').dasherize();
      var givenSlug = params.doc_slug;
      //console.log('given doc title is: '+givenSlug+', while wanted title is:'+expectedSlug);
      if (expectedSlug !== givenSlug) {
        curRouter.replaceWith('documents.view', doc);
      }

      return doc;
    });
  },

  serialize: function(doc) {
    return { 
      doc_slug: doc.get('title').dasherize(),
      doc_id: doc.get('id')
    };
  },

  actions: {
    deleteDoc: function(id) {
      var store = this.store;
      var route = this;
      store.find('document', id).then(function (doc) {
        doc.destroyRecord();
        route.transitionTo('documents');
      });
    },

    renameDoc: function(id) {
      var store = this.store;
      store.find('document', id).then( function(doc) {
        doc.save();
      });
    },

    selectOutput: function() {
      this.get('settings').set('showOutput',true);
    },

    selectPreview: function() {
      this.get('settings').set('showOutput',false);
    }
  }

});
