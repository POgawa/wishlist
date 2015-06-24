import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addList: function() {
      var list = this.store.createRecord('list', {
        title: this.get('title'),
      });
      list.save();
      this.transitionToRoute('lists');
      this.setProperties({
        title:''
      });
    }
  }
});
