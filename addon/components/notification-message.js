import $ from 'cash-dom';
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

export const MESSAGE_ID_ATTRIBUTE_NAME = 'data-embernotifyme-message-id';

export default Component.extend({
	classNames: ['notification-message'],
	classNameBindings: ['message.type'],
	attributeBindings: ['messageId:' + MESSAGE_ID_ATTRIBUTE_NAME],

	layout,

	message: null,
	animationDurationCss: null,
	cssAnimationPlayProperty: null,

	removeMe: false,
	closeIconHTML: null,
	messageIcon: null,
	clickable: alias('message.onClick'),



	_handleMouseEnterFn: null,
	_handleMouseLeaveFn: null,

	didInsertElement() {
		this._super(...arguments);


		this.set('messageId', `${this.message.id}-${this.message.timestamp}`);

		this.set('_handleMouseEnterFn', this.handleMouseEnter.bind(this));
		this.set('_handleMouseLeaveFn', this.handleMouseLeave.bind(this));

		this.element.addEventListener('mouseenter', this.get('_handleMouseEnterFn'));
		this.element.addEventListener('mouseleave', this.get('_handleMouseLeaveFn'));

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

	willDestroyElement() {
		this._super(...arguments);

		this.element.removeEventListener('mouseenter', this.get('_handleMouseEnterFn'));
		this.element.removeEventListener('mouseleave', this.get('_handleMouseLeaveFn'));

	},

	removeMeObserver: observer('message.removeMe', function() {
		if (this.get('message.removeMe') === true) {
			this.animateRemoval(() => {
				this.notifications.removeMessageFromList(this.get('message'));
			});
		}
	}),

	handleMouseEnter() {
		if (!this.get('message.sticky')) {
			this.stopCountdown();
			this.notifications.pauseMessageTimeout(this.get('message'));
		}
	},

	handleMouseLeave() {
		if (!this.get('message.sticky')) {
			this.startCountdown();
			this.notifications.startMessageTimer(this.get('message'));
		}
	},

	animateRemoval(onAnimationDone) {
		velocity(this.element, {
			scale: 1.05
		}, {
			duration: 200
		});

		velocity(this.element, {
			scale: 0
		}, {
			duration: 500,
			complete: onAnimationDone
		});
	},

	stopCountdown() {
		velocity($(this.element).find(".countdown")[0], "stop", true);
	},

	startCountdown() {
		if (this.get('message.sticky') === true) {
			return;
		}
		schedule('afterRender', this, function() {
			let $element = $(this.element);
			velocity($element.find(".countdown")[0], {
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
