import Ember from 'ember';
import layout from '../templates/components/notification-message';
import configuration from '../configuration';

export default Ember.Component.extend({
  classNames: ['notification-message'],
  notificationService: Ember.inject.service('notification-service'),

  layout,

  message: null,
  animationDurationCss: null,

  removeMe: false,
  closeIconHTML: null,
  messageIcon: null,

  didInsertElement(){
    this._super(...arguments);

    Ember.run.next(() => {
        this.startCountDown();

        let message = this.get('message');
        let timeout = message.get('timeout');
      
        let sticky = message.get('sticky');
        if (!sticky){
          let animationDurationCss = `animation-duration: ${timeout}ms; -webkit-animation-duration: ${timeout}ms;`;
          this.set('animationDurationCss', new Ember.Handlebars.SafeString(animationDurationCss));
        }

        let messageIconSafe = new Ember.Handlebars.SafeString(configuration.getMessageIcon(this.get('message.type')));
        this.set('messageIcon', messageIconSafe);

        this.set('closeIconHTML', configuration.getCloseIconHTML());
    });
  },

  removeMeObserver: Ember.observer('message.removeMe', function(){
    if (this.get('message.removeMe')===true){
      this.animateRemoval(()=>{
        this.get('notificationService').removeMessageFromList(this.get('message'));
      });
    }
  }),

  mouseEnter() {
    if (!this.get('message.sticky')){
      this.stopCountdown();
      this.get('notificationService').pauseMessageTimeout(this.get('message'));
    }
  },

  mouseLeave() {
    if (!this.get('message.sticky')){
      this.startCountDown();
      this.get('notificationService').startMessageTimer(this.get('message'));
    }
  },

  animateRemoval(onAnimationDone){
    Ember.$(this.element)
    .velocity({ scale: 1.05 }, { duration:200 })
   .velocity({ scale: 0 }, { duration:500, complete: onAnimationDone})  ;
  },

  stopCountdown(){
    this.set('cssAnimationPlayProperty', 'paused');
  },

  startCountDown(){
    this.set('cssAnimationPlayProperty', 'running');
  },

  actions:{

   messageClicked(){
     let message = this.get('message');
     message.get('onClick')(message);
   },

   messageClosed(){
     let message = this.get('message');

     this.get('notificationService').removeMessage(message);
     message.get('onClose')(message);
    }
  }
});
