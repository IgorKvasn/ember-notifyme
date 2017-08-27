import Ember from 'ember';

export default Ember.Controller.extend({

message: "Hello world!",
timeout: 3000,
sticky: false,
htmlContent:false,
messageType:'success',
closeOnClick: true,
customType: null,
customIcon: null,

  actions: {

    removeAll(){
      this.notifications.removeAll();
    },

    addMessage() {
      let type = this.get('messageType');
      if (type === 'custom'){
        type = this.get('customType');
      }
      this.notifications.addMessage({
        type,
        message: this.get('message'),
        timeout: this.get('timeout'),
        sticky: this.get('sticky'),
        htmlContent: this.get('htmlContent'),
        closeOnClick: this.get('closeOnClick'),
        icon: this.get('customIcon'),
        onClose(){
          alert('closed');
        },
        onClick(){
          alert('clicked');
        },
        onCloseTimeout(){
          alert('message closed on timeout');
        },
      });
    }
}
});
