import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addMessage() {
      this.notifications.addMessage({
        message: 'hello',
        onClose(){
          alert('closed');
        },
        onClick(){
          alert('clicked');
        }
      });
    },

    addSuccessMessage() {
      this.notifications.addMessage({
        type:'success',
        message: 'I am success',
        onClose(){
          alert('closed');
        },
        onClick(){
          alert('clicked');
        }
      });
    },

    addInfoMessage() {
      this.notifications.addMessage({
        type:'info',
        message: 'I am info',
        onClose(){
          alert('closed');
        },
        onClick(){
          alert('clicked');
        }
      });
    },

    addStickyMessage() {
      this.notifications.addMessage({
        message: 'I am sticky',
        sticky: true,
        timeout: 3000,
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
