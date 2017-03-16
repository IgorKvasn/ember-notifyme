import Ember from 'ember';


export default Ember.Object.extend({
  message: null,
  type: null,
  timeout: 0,
  sticky: false,
  onClick(){},
  onClose(){},

  //internal
  closeTimer: null,
  startTimeoutTime: null,


});
