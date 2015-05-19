import Ember from 'ember';

export default Ember.Component.extend({
	startPage: null,
	endPage: null,
	postsPerPage: null,
	index: null,
	postLength: null,
	isPreivew: false,
	currentPage: function() {
		var postLength = this.get('postLength');
		if (postLength === 0 ) {
			return 1;
		}
		var index = this.get('index');
		var startPage = this.get('startPage');
		var firstPostOffset = startPage === 1 ? 1 : 0;
		return Math.floor((index+firstPostOffset) / this.get('postsPerPage') + +startPage);
	}.property('index','startPage','postsPerPage'),

	showPageHeader: function() {
		var postLength = this.get('postLength');
		if (postLength === 0) {
			return false;
		}

		var index = this.get('index');
		if (index === 0) {
			return true;
		}

		var startPage = this.get('startPage');
		var postPerPage = this.get('postsPerPage');

		if (startPage === 1) {
			if ((index+1) % postPerPage === 0) {
				//console.log('current index:'+index+": "+(index+1) % postPerPage);
				return true;
			}
		} else {
			if ((index) % postPerPage === 0) {
				//console.log('current index:'+index+": "+ (index) % postPerPage);
				return true;
			}
		}
		return false;
	}.property('index','startPage','postLength','postsPerPage'),
});
