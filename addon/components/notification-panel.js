import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from '../templates/components/notification-panel';

export default Component.extend({
  classNames: ['notification-panel'],

  notificationService: service('notification-service'),
  messages: alias('notificationService.messages'),

  layout,
});
