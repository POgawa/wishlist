import Ember from 'ember';


export default Ember.Route.extend({
 model: function(params) {
   var url = 'https://www.googleapis.com/books/v1/volumes?q=' + params.search_term;
   return Ember.$.getJSON(url).then(function(responseJSON) {
     var books = [];
       debugger;
     responseJSON.items.forEach(function(book) {
       books.push(book);
     });

     return books;
   });
  }
});
