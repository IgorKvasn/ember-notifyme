import Ember from 'ember';

export default Ember.Controller.extend({

  message: "Hello world!",
  timeout: 3000,
  sticky: false,
  htmlContent: false,
  messageType: 'success',
  closeOnClick: true,
  customType: null,
  customIcon: null,
  id: null,
  exceptIds: null,

  actions: {

    removeAll() {
      let exceptIds = this.get('exceptIds');

      if (Ember.isPresent(exceptIds)) {
        exceptIds = exceptIds.split(',').map((s) => {
          return s.trim()
        });
      }

      this.notifications.removeAll(exceptIds);
    },

    addMessage() {
      let type = this.get('messageType');
      if (type === 'custom') {
        type = this.get('customType');
      }
      this.notifications.addMessage({
        id: this.get('id'),
        type,
        message: this.get('message'),
        timeout: this.get('timeout'),
        sticky: this.get('sticky'),
        htmlContent: this.get('htmlContent'),
        closeOnClick: this.get('closeOnClick'),
        icon: this.get('customIcon'),
        onClose() {
          alert('closed');
        },
        onClick() {
          alert('clicked');
        },
        onCloseTimeout() {
          alert('message closed on timeout');
        },
      });
    }
  }
});
