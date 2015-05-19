import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'span',
	originalPoster: null,
	currentPoster: null,
	isOriginalPoster: Ember.computed('originalPoster','currentPoster', {
		get() {
			var originalPoster = this.get('originalPoster');
			var currentPoster = this.get('currentPoster');

			if (originalPoster === null || originalPoster === undefined) {
				return false;
			}

			if (currentPoster === null || currentPoster === undefined) {
				return false;
			}

			if (originalPoster === currentPoster) {
				return true;
			}
			return false;
		}
	})
});
