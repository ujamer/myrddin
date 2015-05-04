import Ember from 'ember';
import payload from './fixturePayload';

export default Ember.Route.extend({
  model: function() {
    var store = this.store;

    store.pushPayload(store, payload);
    
    return store.find('document');
  },
});
