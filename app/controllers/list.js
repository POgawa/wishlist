import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['list'],
  actions: {
    submit: function() {
      this.transitionToRoute('book', this.get('search_term'));
    }
  }
});
