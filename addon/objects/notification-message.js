import EmberObject from '@ember/object';


export default EmberObject.extend({
  message: null,
  type: null,
  timeout: 0,
  sticky: false,
  onClick(){},
  onClose(){},
  icon: null,

  //internal
  closeTimer: null,
  startTimeoutTime: null,


});
