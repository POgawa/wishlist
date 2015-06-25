import Ember from 'ember';


export default Ember.Route.extend({

 model: function(params) {
  var url = "http://api.nytimes.com/svc/books/v3/reviews.jsonp?&title=Gone+Girl&api-key=c363ad3621152b90af3c0c27af352ebd:1:9297318";
   return Ember.$.ajax({
     url: url,
     type: 'GET',
     dataType: 'jsonp',
     jsonpCallback: 'callback',
    //  jsonp: 'json_callback',
     success: function (data) {
        console.log(data);
    }
   }).then(function(responseJSON) {
     var books = [];
     responseJSON.results.forEach(function(book) {
       books.push(book);

     });
     return books;
   });
  }
});
