import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    var store = this.store;

    store.find('headpost');
    store.find('post');
    store.find('thread');

    controller.set('model', model);
  },
});
