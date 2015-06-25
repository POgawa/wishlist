import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("about");
  this.route("list", {path: 'list/:list_id'});
  this.resource("lists", function() {
    this.route("new");
  });
  this.resource("new-books", {path: 'new-book/:search_term'})

});

export default Router;
