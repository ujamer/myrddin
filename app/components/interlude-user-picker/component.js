import Ember from 'ember';

export default Ember.Component.extend({
  availableUsers: null,
  givenUser: null,
  queryValue: '',

  escapedChars: [40, 38, 13],
  inFocus: false,
  focusIndex: -1,
  focusUser:null,
  selectedUser: null,

  preset: function() {
    this.setCurrentUser();
    this.set('guid',Ember.guidFor(this));

    var handler = "click."+Ember.guidFor(this);
    var _this = this;
    // handle click outside
    this.$(window).bind(handler, function(event) {
      //console.log(handler+": "+Ember.$(event.target).closest(_this.$()).length);
      if (Ember.$(event.target).closest(_this.$()).length === 0 && _this.get('inFocus')) {
        _this.send('focusOut');
      }
    });
  }.on('didInsertElement'),

  reset: function() {
    var handler = "click."+Ember.guidFor(this);
    this.$(window).unbind(handler);
  }.on('willDestroyElement'),

  setCurrentUser: function() {
    //console.log('updating current user');
    var givenUser = this.get('givenUser');
    if (givenUser !== null) {
      this.set('selectedUser',givenUser);
      this.set('focusUser',givenUser);
      this.set('queryValue',givenUser.get('name'));
    } else {
      this.set('queryValue','');
      this.set('selectedUser',null);
    }
  }.observes('givenUser'),

  sortedSet: function() {
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['name'],
      sortAscending: true,
      content: this.get('availableUsers')
    });
  }.property('availableUsers'),

  filteredSet: function() {
    var query = this.get('queryValue') || '';

    //console.log('recalculating: '+query);
    if (query === '' || query.length < 2) {
      return this.get('sortedSet').filter(function() {return true;});
    } else  {
      // only reset focusIndex when the length of the filteredSet changes
      this.set("focusIndex", -1);
      return this.get('sortedSet').filter(function(item) {
        var tags = item.get('tags').filter(function(tag) {
          return tag.get('name').toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
        return item.get('name').toLowerCase().indexOf(query.toLowerCase()) > -1 || tags.length > 0;
      });
    }
  }.property('sortedSet.@each','queryValue'),

  keyUp: function(event) {
    if(event.keyCode === 27) {
        this.send('focusOut');
    }
  },


  keyDown: function(event) {
    //console.log('keydown event firing'+ event);
    if (this.get('inFocus')) {
      if (event.keyCode === 40) {
        // pressed down button
        this.highlight("down");
      } else if (event.keyCode === 38) {
        // pressed up button
        this.highlight("up");
      } else if (event.keyCode === 9 || event.keyCode === 13) {
        // pressed the escape key or enter key

        var curOptions = this.get("filteredSet");
        // should we create new user?
        if (curOptions.length === 0 && this.get('queryValue') !== '') {
          this.send('createUser');
        } else if (this.get('focusUser') != null) {
          this.send('selectItem', this.get('focusUser'));
        }
      }
    }
  },

  highlight: function(direction) {
    var newFocusIndex = -1;

    var curOptions = this.get("filteredSet");
    var curFocusIndex = curOptions.indexOf(this.get('focusUser'));
    if(direction === "down"){
      newFocusIndex = curFocusIndex + 1;
    }else if( curFocusIndex > 0){
      newFocusIndex = curFocusIndex - 1;
    }

    if(newFocusIndex < curOptions.length && newFocusIndex >= 0) {
      if(curFocusIndex > -1) {
        var currentResult = curOptions.objectAt(curFocusIndex);
        currentResult.set("highlight", false);
      }

      //console.log(curFocusIndex+" => "+ newFocusIndex);
      curFocusIndex = newFocusIndex;
      if(curFocusIndex > -1){
        var nextResult = curOptions.objectAt(curFocusIndex);
        nextResult.set("highlight", true);
        this.set("focusUser", nextResult);


        var targetElement = this.$("#"+this.get('guid')+"_u"+nextResult.get('id'));
        var scrollElement = this.$(".dropdown-menu.user-dropdown");
        scrollElement.stop().animate({
          scrollTop: scrollElement.scrollTop() + targetElement.position().top
        }, 200);
      }
    }
  },

  actions: {
    focusIn: function() {
      this.set("inFocus", true);
    },

    focusOut: function() {
      //console.log("focusing out from pick user input");

      this.set("inFocus", false);
      this.$(".ember-text-field").blur();

      var curUser = this.get('selectedUser');
      if (this.get('queryValue') === '' && curUser !== null) {
        this.set('queryValue', curUser.get('name'));
      }
    },

    selectItem: function(user) {
      this.set('queryValue', user.get('name'));
      this.set('selectedUser', user);
      this.sendAction('selectUser', this.get('param'), user);
      this.send('focusOut');
    },

    clearSelected: function() {
      this.set('queryValue','');
      this.$(".ember-text-field").focus();
      this.send('focusIn');
    },

    createUser: function() {
      this.sendAction('createUser', this.get('param'), this.get('queryValue'));
      this.send('focusOut');
    }
  }
});
