import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("about");
  this.resource("lists", function() {
    this.route("new");
  });
  this.resource("list", {path: "list/:list_id"}, function() {
    this.route("new-book");
  });
});

export default Router;
