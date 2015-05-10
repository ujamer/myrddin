import Ember from 'ember';

export default Ember.Component.extend({
  selections: null,
  selected: null,
  selectedParsed: function() {
    var source = this.get('selected');

    return source.toString();
  }.property('selected'),

  onSelectedDidChange: function() {
    var selected = this.get('selectedParsed');

    this.sendAction('action', this.get('param'), selected);
  }.observes('selectedParsed'),

  didInsertElement: function() {
    this.$('.selectpicker').selectpicker({
      width: '100%'
    });
  }
});
