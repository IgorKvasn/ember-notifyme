import Ember from 'ember';
import layout from '../templates/components/notification-panel';

export default Ember.Component.extend({

  classNames: ['notification-panel'],

  notificationService: Ember.inject.service('notification-service'),
  messages: Ember.computed.alias('notificationService.messages'),

  layout,


});
