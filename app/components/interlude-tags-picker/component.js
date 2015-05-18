import Ember from 'ember';

export default Ember.Component.extend({
  availableTags: null,
  givenTags: null,
  queryValue: '',

  escapedChars: [40, 38, 13],
  inFocus: false,
  focusIndex: -1,
  focusTag:null,

  preset: function() {
    this.set('guid',Ember.guidFor(this));
    
    var handler = "click."+Ember.guidFor(this);
    var _this = this;
    // handle click outside
    this.$(window).bind(handler, function(event) {
      //console.log(Ember.$(event.target).closest(_this.$()).length);
      if (Ember.$(event.target).closest(_this.$()).length === 0 && _this.get('inFocus')) {
        _this.send('focusOut');
      }
    });
  }.on('didInsertElement'),

  reset: function() {
    var handler = "click."+Ember.guidFor(this);
    this.$(window).unbind(handler);
    this.set('givenTags', null);
  }.on('willDestroyElement'),

  sortedSet: function() {
    var givenTags = this.get('givenTags');
    var storedTags = this.get('availableTags');

    var prefilter = [];
    if (givenTags == null || storedTags == null) {
      prefilter = storedTags;
    } else {
      prefilter =  storedTags.filter(function(item) {
        return !givenTags.contains(item);
      });
    }

    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['name'],
      sortAscending: true,
      content: prefilter
    });
  }.property('availableTags', 'givenTags'),

  filteredSet: function() {
    var query = this.get('queryValue') || '';

    //console.log('recalculating: '+query);
    if (query === '' || query.length < 2) {
      return this.get('sortedSet').filter(function() {return true;});
    } else {
      // only reset focusIndex when the length of the filteredSet changes
      this.set("focusIndex", -1);
      return this.get('sortedSet').filter(function(item) {
        //console.log(item.get('name')+", "+inGiven);
        return item.get('name').toLowerCase().indexOf(query.toLowerCase()) > -1;
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
          this.send('createTag');
        } else if (this.get('focusTag') != null) {
          this.send('selectItem', this.get('focusTag'));
        }
      }
    }
  },

  highlight: function(direction) {
    var newFocusIndex = -1;

    var curOptions = this.get("filteredSet");
    var curFocusIndex = curOptions.indexOf(this.get('focusTag'));
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
        this.set("focusTag", nextResult);

        var targetElement = this.$("#"+this.get('guid')+"_t"+nextResult.get('id'));
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
      this.set('queryValue','');
      this.$(".ember-text-field").blur();
      this.set("inFocus", false);
    },

    selectItem: function(tag) {
      this.sendAction('selectTag', this.get('param'), tag);
      this.send('focusOut');
    },

    clearSelected: function() {
      this.set('queryValue','');
      this.$(".ember-text-field").focus();
      this.send('focusIn');
    },

    createTag: function() {
      this.sendAction('createTag', this.get('param'), this.get('queryValue'));
      this.send('focusOut');
    }
  }
});
