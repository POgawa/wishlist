import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['list'],
  actions: {
    submit: function() {
      this.transitionToRoute('book', this.get('search_term'));
    },
    delete: function() {
      if(confirm("Do you want to delete this list?")) {
        this.get('model').destroyRecord();
        this.transitionToRoute('lists');
      }
    }
  }
});
