import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['list'],
  actions: {
    addBook: function() {
      var book = this.store.createRecord('book', {
        title: this.get('title'),
        author: this.get('author'),
        list: this.get('controllers.list.model')
      });


      var list = this.get('controllers.list.model');
      book.save().then(function() {
        list.get('books').pushObject(book);
        list.save();
      });



      this.setProperties({
        title:'',
        author:''
      });
      this.transitionToRoute('lists');

    }
  }
});
