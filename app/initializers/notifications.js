import NotificationService from 'ember-notifyme/services/notification-service';

export default {
    name: 'ember-notifyme',

    initialize(application) {
        application.register('notification:message-service', NotificationService);

        ['controller', 'component', 'route', 'router', 'service'].forEach(injectionTarget => {
            application.inject(injectionTarget, 'notifications', 'notification:message-service');
        });
    }
};
