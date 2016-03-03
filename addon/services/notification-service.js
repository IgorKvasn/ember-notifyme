import Ember from 'ember';
import NotificationMessage from '../objects/notification-message';
import configuration from '../configuration';

export default Ember.Service.extend({

  messages: Ember.A([]),

  addMessage(options){

    let timeout = options.timeout;
    if (Ember.isNone(timeout)){
      timeout = configuration.getDefaultTimeout(options.type);
    }

    let sticky = options.sticky;
    if (timeout < 0 ){
      sticky = true;
    }

    let messageObject = NotificationMessage.create({
           message: options.message,
           type: options.type || 'info',
           timeout: timeout,
           sticky, //todo
           onClick: options.onClick || Ember.K,
           onClose: options.onClose || Ember.K,
       });

    this.get('messages').addObject(messageObject);

    if (!this.get('message.sticky')){
      this.startMessageTimer(messageObject);
    }
  },

  removeMessageFromList(message){
     this.get('messages').removeObject(message);
  },

  removeMessage(message){
      message.set('removeMe', true);
  },

  clearAll(){
    this.get('messages').clear();
  },

  startMessageTimer(message){
    if (message.get('sticky')){
      return;
    }
    message.set('startTimeoutTime', Date.now());

    let timer = Ember.run.later(this, () => {
        this.removeMessage(message);
    }, message.get('timeout'));

    message.set('closeTimer', timer);
  },

  pauseMessageTimeout(message){
    if (message.get('sticky')){
      return;
    }

    Ember.run.cancel(message.get('closeTimer'));

    let remainingTimeout = message.get('timeout') - (Date.now() - message.get('startTimeoutTime'));
    message.set('timeout', remainingTimeout);
  }



});
