// import Ember from 'ember';
//
// export default Ember.Controller.extend({
//   needs: ['list'],
//   actions: {
//     addBook: function() {
//       var book = this.store.createRecord('book', {
//
//         // Pseudo code what I want to do
//         var bookName = book.parse('title')
//         var bookAuthor = book.parse('author')
//
//
//         title: this.set('title'),
//         author: this.set('author'),
//         list: this.get('controllers.list.model')
//       });
//
//
//       var list = this.get('controllers.list.model');
//       book.save().then(function() {
//         list.get('books').pushObject(book);
//         list.save();
//       });
//
//
//       this.transitionToRoute('lists');
//
//     }
//   }
// });
