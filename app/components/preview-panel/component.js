import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: ['showPanel:preview-panel-show'],
	showPanel: null,
});
