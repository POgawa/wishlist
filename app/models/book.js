import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  selected: DS.attr('boolean'),
  // isbn10: DS.attr('integer'),
  // isbn13: DS.attr('integer'),
  list: DS.belongsTo('list', {async: true})
});
