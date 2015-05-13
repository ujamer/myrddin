import Ember from 'ember';

export default Ember.Component.extend({
	user: null, // target user from template

	actions: {
		removeTagFromUser: function(userID, tag) {
			this.sendAction('removeTagFromUser', userID, tag);
		}
	}
});
