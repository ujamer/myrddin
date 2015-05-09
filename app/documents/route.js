import Ember from 'ember';
import payload from './fixturePayload';

export default Ember.Route.extend({

  model: function() {
    var store = this.store;

    store.pushPayload(store, payload);

    return store.find('document');
  },

  actions: {
    createDoc: function() {
      var store = this.store;

      var doc = store.createRecord('document', {
        title: "A New Interlude!",
        postsPerPage: 10
      });

      doc.save();

      this.transitionTo('documents.view', doc);
    }
  }
});
