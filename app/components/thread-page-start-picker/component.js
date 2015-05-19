import Ember from 'ember';

export default Ember.Component.extend({

	startPage: null,

	watchChange: function () {
		this.send('focusOut');
	}.observes('startPage'),

	actions: {
		focusOut: function() {
			this.sendAction('onChange', this.get('thread'), this.get('startPage'))
		}
	}
});
