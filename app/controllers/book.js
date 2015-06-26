import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ['list'],
  actions: {

    //
    // addBook: function() {

    //   this.get('model').forEach(function(book) {
    //     if (book.selected === true) {
    //       var book = this.store.createRecord('book', {
    //         isbn10: this.get('isbn10'),
    //         isbn13: this.get('isbn13'),
    //         title: this.get('title'),
    //         author: this.get('authors'),
    //         list: this.get('controllers.list.model')
    //       });
    //       var list = this.get('controllers.list.model');
    //       book.save().then(function() {
    //         list.get('books').pushObject(book);
    //         list.save();
    //       });
    //
    //
    //       this.transitionToRoute('lists');
    //
    //
    //     }
    //   })
    // }
    addBook2: function(book) {
      var book = this.store.createRecord('book', {
        // isbn10: this.get('isbn10'),
        // isbn13: this.get('isbn13'),
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors.toString(),
        list: this.get('controllers.list.model')
      });

      var list = this.get('controllers.list.model');
      book.save().then(function() {
        list.get('books').pushObject(book);
        list.save();
      });


      this.transitionToRoute('lists');

    }
  }
});
