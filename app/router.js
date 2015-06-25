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
    this.resource("books", {path: 'books/:search_term'});
  });
  this.resource("book", {path: "book/:book_title"});
});

export default Router;
