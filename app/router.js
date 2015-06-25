import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("about");

  this.resource("lists", {path: '/'}, function() {
    this.route("new");
  });
  this.resource("list", {path: "list/:list_id"}, function() {
    this.resource("book", {path: 'book/:search_term'});
  });
});

export default Router;
