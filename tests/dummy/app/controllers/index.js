import Ember from 'ember';

export default Ember.Controller.extend({

message: "Hello world!",
timeout: 3000,
sticky: false,
htmlContent:false,
messageType:'success',

  actions: {
    removeAll(){
      this.notifications.removeAll();
    },

    addMessage() {
      this.notifications.addMessage({
        type:this.get('messageType'),
        message: this.get('message'),
        timeout: this.get('timeout'),
        sticky: this.get('sticky'),
        htmlContent: this.get('htmlContent'),
        onClose(){
          alert('closed');
        },
        onClick(){
          alert('clicked');
        }
      });
    }
}
});
