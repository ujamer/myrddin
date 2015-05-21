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

      if (ga) {
        ga('send', {
          'hitType': 'event',
          'eventCategory': 'button',
          'eventAction': 'click',
          'eventLabel': 'create interlude',
        });
      }

      this.transitionTo('documents.view', doc);
    },

    deleteDoc: function(id) {
      var store = this.store;
      var _this = this;
      // Since we do not have a backend to do the heavy lifting in cleaning up the records
      // we must clean up the unwanted records ourselves.

      // cleanup all properties of .
      store.find('document', id).then(function (doc) {

        var cleanupUserInPost = function(post) {

          var target = 'posts';
          if (post.get('isHead') === true) {
            target = 'threads';
          }
          //console.log('cleaning up after user in posts');
          var user = post.get('user');
          if (user !== null) {
            user.get(target).removeObject(post);
            user.save();
          }
          post.destroyRecord();
          return true;
        };

        var cleanupPosts = function(thread) {
          //console.log('cleaning up after posts');
          // clean up Posts, then delete thread.
          cleanupUserInPost(thread.get('firstPost'));
          var posts = thread.get('posts');
          posts = posts.toArray();
          posts.forEach(cleanupUserInPost);

          thread.destroyRecord();
        };

        var cleanupThreads = function() {
          //console.log('cleaning up after threads');
          // cleanup all the child threads
          var threads = doc.get('threads');
          threads = threads.toArray();
          threads.forEach(cleanupPosts);
        };

        var finalCleanup = function () {
          doc.destroyRecord();
          _this.transitionTo('documents');
        };

        var user = doc.get('user');
        //console.log('cleaning up after user in the doc');
        // clean up doc persepective user
        if (user !==null) {
          user.get('docs').removeObject(doc);
          user.save();
        }
        cleanupThreads();
        finalCleanup();
      });
    }
  }
});
