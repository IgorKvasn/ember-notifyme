import Ember from 'ember';
import layout from '../templates/components/notification-message';
import configuration from '../configuration';

export default Ember.Component.extend({
  classNames: ['notification-message'],

  layout,

  message: null,
  animationDurationCss: null,
  cssAnimationPlayProperty: null,

  removeMe: false,
  closeIconHTML: null,
  messageIcon: null,
  clickable: Ember.computed.alias('message.onClick'),

  didInsertElement(){
    this._super(...arguments);

    Ember.run.next(() => {
        this.startCountdown();

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

        if (message.get('htmlContent')){
          message.set('message', new Ember.Handlebars.SafeString(message.get('message')));
        }

        Ember.$(this.element).addClass(this.get('message.type'));

    });
  },

  removeMeObserver: Ember.observer('message.removeMe', function(){
    if (this.get('message.removeMe')===true){
      this.animateRemoval(()=>{
        this.notifications.removeMessageFromList(this.get('message'));
      });
    }
  }),

  mouseEnter() {
    if (!this.get('message.sticky')){
      this.stopCountdown();
        this.notifications.pauseMessageTimeout(this.get('message'));
    }
  },

  mouseLeave() {
    if (!this.get('message.sticky')){
      this.startCountdown();
        this.notifications.startMessageTimer(this.get('message'));
    }
  },

  animateRemoval(onAnimationDone){
    Ember.$(this.element)
    .velocity({ scale: 1.05 }, { duration:200 })
   .velocity({ scale: 0 }, { duration:500, complete: onAnimationDone});
  },

  stopCountdown(){
      let $element = Ember.$(this.element);
      $element.find(".countdown").velocity("stop", true);
  },

  startCountdown(){

    Ember.run.schedule('afterRender', this, function() {
      let $element = Ember.$(this.element);
      $element.find(".countdown").velocity({
          width: $element.width()
        },
        {
          duration: this.get('message.timeout'),
          easing: "linear"
        });
 });
  },

  actions:{

   messageClicked(){
     let message = this.get('message');
     let onClick =  message.get('onClick');
     if (Ember.isPresent(onClick)){
       onClick(message);
     }
   },

   messageClosed(){
     let message = this.get('message');
     let onClose =  message.get('onClose');
     if (Ember.isPresent(onClose)){
       onClose(message);
     }
       this.notifications.removeMessage(message);
    }

  }
});
