import Ember from 'ember';

export default Ember.Component.extend({

	endPage: null,
	adjustedMin: function () {
		var startPage = this.get('startPage');
		var postsPerPage = this.get('postsPerPage');
		var totalPosts = this.get('numPosts');

		if (startPage === 1) {
			return Math.floor((totalPosts+1) / postsPerPage) + +startPage;
		} else {
			return Math.floor(totalPosts / postsPerPage) + +startPage;
		}
	}.property('startPage'),
	watchChange: function () {
		this.send('focusOut');
	}.observes('endPage'),

	actions: {
		focusOut: function() {
			this.sendAction('onChange', this.get('thread'), this.get('endPage'))
		}
	}
});
