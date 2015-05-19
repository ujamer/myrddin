import Ember from 'ember';

export default Ember.Component.extend({
	startPage: null,
	endPage: null,
	postsPerPage: null,
	index: null,
	postLength: null,
	isPreivew: false,
	showPageFooter: function() {
		var postLength = this.get('postLength');
		if (postLength === 0) {
			return false;
		}
		var index = this.get('index');
		var startPage = this.get('startPage');
		var postPerPage = this.get('postsPerPage');
		var firstPostOffset = startPage == 1 ? 1 : 0;
		var currentPage = Math.floor((index+firstPostOffset) / this.get('postsPerPage') + +startPage);

		if (startPage == 1) {
			if ((index+2) % postPerPage === 0) {
				return true;
			}
		} else {
			if ((index+1) % postPerPage === 0) {
				return true;
			}
		}

		if (index === (postLength-1)) {
			return true;
		}
		return false;
	}.property('index','startPage','postLength','postsPerPage'),

	pageString: function() {
		if (!this.get('showPageFooter')) {
			return "";
		}

		var postLength = this.get('postLength');
		if (postLength === 0) {
			return "";
		}
		var index = this.get('index');
		var isOutput = this.get('isOutput');
		var endPage = this.get('endPage');
		var startPage = this.get('startPage');
		var postPerPage = this.get('postsPerPage');
		var firstPostOffset = startPage == 1 ? 1 : 0;
		var currentPage = Math.floor((index+firstPostOffset) / this.get('postsPerPage') + +startPage);
		var displayString = "";

		// assemble first part of the string
		if (+currentPage - 1 > 5) {
			if (isOutput) {
				displayString += "[u]1[/u],[u]2[/u],[u]3[/u] ... [u]"+(currentPage-2)+"[/u], [u]"+(currentPage-1)+"[/u], "+currentPage;
			} else {
				displayString += "<u>1</u>,<u>2</u>,<u>3</u> ... <u>"+(currentPage-2)+"</u>, <u>"+(currentPage-1)+"</u>, "+currentPage;
			}
		} else {
			if (isOutput) {
				for (var i=1; i<currentPage; i++) {
					displayString += "[u]"+i+"[/u], "
				}
				displayString += currentPage;
			} else {
				for (var i=1; i<currentPage; i++) {
					displayString += "<u>"+i+"</u>, "
				}
				displayString += currentPage;
			}
		}

		//assemble second part of the string
		if (+endPage - +currentPage > 5) {
			if (isOutput) {
				displayString += ", [u]"+(currentPage+1)+"[/u], [u]"+(currentPage+2)+"[/u] ... [u]"+(endPage-2)+"[/u], [u]"+(endPage-1)+"[/u], [u]"+endPage+"[/u]"
			} else {
				displayString += ", <u>"+(currentPage+1)+"</u>, <u>"+(currentPage+2)+"</u> ... <u>"+(endPage-2)+"</u>, <u>"+(endPage-1)+"</u>, <u>"+endPage+"</u>"
			}
		} else if (currentPage+1 < endPage) {
			if (isOutput) {
				for (var i=currentPage+1; i<=endPage; i++) {
					displayString += ", [u]"+i+"[/u]";
				}
			} else {
				for (var i=currentPage+1; i<=endPage; i++) {
					displayString += ", <u>"+i+"</u>";
				}
			}
		}

		return displayString;
	}.property('showPageFooter', 'endPage'),
});
