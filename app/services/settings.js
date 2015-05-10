import Ember from 'ember';

export default Ember.Service.extend({
  enabled: false,
  showPanel: true,
  showOutput: true,
  postsPerPageSelections: ['10','15','20','25']
});
