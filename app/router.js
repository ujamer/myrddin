import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('documents', {path:'/'}, function() {
    //this.route('viewNoSlug')
    this.route('view', {path: ':doc_id/:doc_slug'});
    this.route('view-no-slug', {path: ':doc_id'});
    this.route('settings', {path:'settings/'});
  });
});

export default Router;
