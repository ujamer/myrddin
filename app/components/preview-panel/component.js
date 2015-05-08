import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: ['showPanel:preview-panel-show'],
	showOutput: null,
	showPanel: null,

	actions: {
		toggleToOutput: function() {
			this.sendAction('selectOutput');
		},

		toggleToPreview: function() {
			this.sendAction('selectPreview');
		}
	}
});
