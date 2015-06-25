import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  isbn: DS.attr('number'),
  list: DS.belongsTo('list', {async: true})
});
