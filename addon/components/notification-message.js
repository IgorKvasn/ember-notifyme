import $ from 'jquery';
import {
  observer
} from '@ember/object';
import {
  isEmpty
} from '@ember/utils';
import {
  htmlSafe
} from '@ember/template';
import {
  next,
  schedule
} from '@ember/runloop';
import {
  alias
} from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/notification-message';
import configuration from '../configuration';
import velocity from 'velocity-animate';

export default Component.extend({
  classNames: ['notification-message'],
  classNameBindings: ['message.type'],

  layout,

  message: null,
  animationDurationCss: null,
  cssAnimationPlayProperty: null,

  removeMe: false,
  closeIconHTML: null,
  messageIcon: null,
  clickable: alias('message.onClick'),

  didInsertElement() {
    this._super(...arguments);

    next(() => {

      if (this.get('isDestroyed') || this.get('isDestroying')) {
        return;
      }

      this.startCountdown();

      let message = this.get('message');
      let timeout = message.get('timeout');

      let sticky = message.get('sticky');
      if (!sticky) {
        let animationDurationCss = `animation-duration: ${timeout}ms; -webkit-animation-duration: ${timeout}ms;`;
        this.set('animationDurationCss', htmlSafe(animationDurationCss));
      }

      let messageIconSafe = message.get('icon');
      if (isEmpty(messageIconSafe)) {
        messageIconSafe = configuration.getMessageIcon(this.get('message.type'));
      }
      messageIconSafe = htmlSafe(messageIconSafe);
      this.set('messageIcon', messageIconSafe);

      this.set('closeIconHTML', configuration.getCloseIconHTML());

      if (message.get('htmlContent')) {
        message.set('message', htmlSafe(message.get('message')));
      }

    });
  },

  removeMeObserver: observer('message.removeMe', function() {
    if (this.get('message.removeMe') === true) {
      this.animateRemoval(() => {
        this.notifications.removeMessageFromList(this.get('message'));
      });
    }
  }),

  mouseEnter() {
    if (!this.get('message.sticky')) {
      this.stopCountdown();
      this.notifications.pauseMessageTimeout(this.get('message'));
    }
  },

  mouseLeave() {
    if (!this.get('message.sticky')) {
      this.startCountdown();
      this.notifications.startMessageTimer(this.get('message'));
    }
  },

  animateRemoval(onAnimationDone) {
    $(this.element)
      .velocity({
        scale: 1.05
      }, {
        duration: 200
      })
      .velocity({
        scale: 0
      }, {
        duration: 500,
        complete: onAnimationDone
      });
  },

  stopCountdown() {
    let $element = $(this.element);
    $element.find(".countdown").velocity("stop", true);
  },

  startCountdown() {

    schedule('afterRender', this, function() {
      let $element = $(this.element);
      $element.find(".countdown").velocity({
        width: $element.width()
      }, {
        duration: this.get('message.timeout'),
        easing: "linear"
      });
    });
  },

  actions: {

    messageClicked() {
      let message = this.get('message');
      let onClick = message.get('onClick');
      onClick(message);

      if (message.get('closeOnClick') === true) {
        this.notifications.removeMessage(message);
      }
    },

    messageClosed() {
      let message = this.get('message');
      let onClose = message.get('onClose');
      onClose(message);
      this.notifications.removeMessage(message);
    }

  }
});
