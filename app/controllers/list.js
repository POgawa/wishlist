import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
      delete: function() {
      if(confirm("Do you want to delete this list?")) {
        this.get('model').destroyRecord();
        this.transitionToRoute('lists');
      };
      this.transitionToRoute('lists');
      }
  }
});
