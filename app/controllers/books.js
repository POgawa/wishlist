// import Ember from 'ember';
//
// export default Ember.Controller.extend({
//   actions: {
//
//
//     save: function() {
//       var book = this.store.createRecord('book', {
//
//         isbn10: this.get('isbn10'),
//         isbn13: this.get('isbn13'),
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
//
//   }
//
// });
