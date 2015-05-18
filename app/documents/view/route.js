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

      // fix url if needed
      var expectedSlug = doc.get('title').dasherize();
      var givenSlug = params.doc_slug;
      //console.log('given doc title is: '+givenSlug+', while wanted title is:'+expectedSlug);
      if (expectedSlug !== givenSlug) {
        curRouter.replaceWith('documents.view', doc);
      }

      return doc;
    });
  },

  setupController: function(controller, model) {
    var store = this.store;

    store.find('user').then(function(users) {
      model.set('allUsers',users);
    });

    store.find('tag').then(function(tags) {
      model.set('allTags',tags);
    });

    model.set('settings', Ember.inject.service('settings'));
    controller.set('model', model);
  },

  serialize: function(doc) {
    return { 
      doc_slug: doc.get('title').dasherize(),
      doc_id: doc.get('id')
    };
  },

  actions: {
    deleteDoc: function() {
      
      return true;
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
    },

    setUserPerspective: function(id, user) {
      var store = this.store;
      //console.log("Setting User Perspective");
      store.find('document',id).then(function(doc) {
        var originalUser = doc.get('user');

        if (originalUser === null) {
          user.get('docs').pushObject(doc);
          user.save().then(function() {
            doc.set('user', user);
            doc.save();
          });
        } else {
          originalUser.get('docs').removeObject(doc);
          originalUser.save().then(function() {
            user.get('docs').pushObject(doc);
            user.save().then(function() {
              doc.set('user', user);
              doc.save();
            });
          });
        }
      });
    },

    createUser: function(id, nameString) {
      var _this = this;
      var store = this.store;

      var user = store.createRecord('user', {
        name: nameString
      });

      user.save().then(function () {
        _this.send('setUserPerspective',id, user);
      });
    },

    addTagToUser: function(id, tag) {
      var store=this.store;

      store.find('user', id).then(function(user) {

        user.get('tags').pushObject(tag).save();
      });
    },

    createTag: function(id, tagString) {
      var store= this.store;

      var tag = store.createRecord('tag', {
        name: tagString
      });
      
      store.find('user', id).then(function(user) {
        tag.save();
        var tags = user.get('tags');
        tags.pushObject(tag).save();
        tags.save();
      });
    },

    removeTagFromUser: function(id, tag) {
      var store=this.store;

      store.find('user', id).then(function(user) {
        var tags = user.get('tags');
        var users = tag.get('users');

        tags.removeObject(tag);
        users.removeObject(user);
        user.save();
        tag.save();
      });
    },

    changePostsPerPage: function(id, count) {
      var store = this.store;
      store.find('document',id).then(function(doc) {
        doc.set('postsPerPage', count);
        doc.save();
      });
    },

    createThread: function(doc) {

      var store = this.store;
      var thread = store.createRecord('thread', {
        name:'A New Thread',
        location: ''
      });

      thread.save().then(function(thread) {

        var post = store.createRecord('headpost', {
          isHead: true,
          thread: thread,
          postedOn: "01 01 2011",
        });

        post.save().then(function(post) {
          thread.set('firstPost', post);
          thread.set('doc',doc);

          doc.get('threads').pushObject(thread);
          doc.save();
          thread.save();
          post.save();

        });
      });
    },

    deleteThread: function(threadID) {
      var store = this.store;
      var doc = this.currentModel ;

      var cleanupUserInPost = function(post) {
          console.log('cleaning up after user in posts');

          var target = 'posts';
          if (post.get('isHead') === true) {
            target = 'threads';
          }

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

      var threads = doc.get('threads');
      store.find('thread',threadID).then( function(thread) {
        // remove the inverse from the records.
        threads.removeObject(thread);
        doc.save().then( function () {
          //then destroy the record now that it's unneeded.
          cleanupPosts(thread);
        });
      });
    },

    renameThread: function(threadID) {
      var store = this.store;
      store.find('thread',threadID).then(function(thread) {
        //thread.set('name', count);
        thread.save();
      });
    },

    saveThreadLocation: function(thread, locationString) {
      console.log('saving thread location.');
      thread.set('location',locationString);
      thread.save();
    },

    createPost: function(thread) {
      var store = this.store;

      var date = "01 01 2011";
      var lastPost = thread.get('lastPost');
      if (lastPost !== undefined && lastPost !== null) {
        date = lastPost.get('postedOn');
      }

      var post = store.createRecord('post', {
        thread: thread,
        postedOn: date
      });

      post.save().then(function() {
        thread.get('posts').pushObject(post);
        thread.save();
      });
    },

    deletePost: function(post) {
      //console.log('cleaning up after user in posts');
      var user = post.get('user');

      if (user !== null) {
        user.get('posts').removeObject(post);
        user.save();
      }

      var thread = post.get('thread');

      if(thread !== null) {
        thread.get('posts').removeObject(post);
        thread.save();
      }
      
      post.destroyRecord();
    },

    setPostUser: function(post, user) {
      console.log("Setting Post User");

      var target = 'posts';
      if (post.get('isHead') === true) {
        target = 'threads';
      }

      var originalUser = post.get('user');

      if (originalUser === null) {
        user.get(target).pushObject(post);
        user.save().then(function() {
          post.set('user', user);
          post.save();
        });
      } else {
        originalUser.get(target).removeObject(post);
        originalUser.save().then(function() {
          user.get(target).pushObject(post);
          user.save().then(function() {
            post.set('user', user);
            post.save();
          });
        });
      }
    },

    setPostDate: function(target, dateString) {
      target.set('postedOn', dateString);
      target.save();
    },

    createPostUser: function(post, nameString) {
      var _this = this;
      var store = this.store;

      var user = store.createRecord('user', {
        name: nameString
      });

      user.save().then(function () {
        _this.send('setPostUser',post, user);
      });
    },

    reorderItems(source, newOrder) {
      var oldOrder = source.get('posts');
      var sourceIndex = -1;
      var targetIndex = -1;
      var removedFirst = false;
      var foundFirstChange = false;
      var foundObj = null;
      var writeChanges = false;

      for (var i=0; i<oldOrder.length; i++) {
        var oldObj = oldOrder.objectAt(i);
        var newObj = newOrder.objectAt(i);
        //console.log(oldObj.get('id')+", "+newObj.get('id'));
        if (oldObj !== newObj && !foundFirstChange) {
          // the objects are not the same. Find out if the original was moved 
          // from this index, or another object was moved to this index.
          foundFirstChange = true;
          if (i+1 < oldOrder.length && oldOrder.objectAt(i+1) === newObj) {
            // object was moved from this index
            removedFirst = true;
            sourceIndex = i;
            foundObj = oldObj;
          } else {
            // object was moved to this index
            targetIndex = i;
            foundObj = newObj;
          }
        }

        if (foundFirstChange) {
          // check if current index contains the displaced object.
          if (removedFirst && foundObj === newObj) {
            targetIndex = i;
            writeChanges = true;
            break;
          } else if (!removedFirst && foundObj === oldObj) {
            sourceIndex = i;
            writeChanges = true;
            break;
          }
        }
      }

      // only modify the original array at the changed indexes
      if (writeChanges) {
        oldOrder.removeAt(sourceIndex);
        oldOrder.insertAt(targetIndex,foundObj);
        source.save();
      }
    }
  }

});
