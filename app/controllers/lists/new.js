import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addList: function() {
      var list = this.store.createRecord('list', {
        name: this.get('name'),
      });
      list.save();
      this.transitionToRoute('lists');
      this.setProperties({
        name:''
      });
    }
  }
});
