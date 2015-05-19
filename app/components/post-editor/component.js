import Ember from 'ember';

export default Ember.Component.extend({
	postContent: null,
	actions: {
		setPostContent: function () {
			console.log('triggered');
			this.sendAction('onChange', this.get('post'), this.get('postContent'));
		}
	}
});
