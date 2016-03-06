import Ember from 'ember';

const CONFIG_PROPERTIES = {
  closeIconHTML: '<i class="fa fa-times"></i>',
  messages:{
    success: {
      timeout: 3000,
      icon: '<span class="fa-stack fa-sm"><i class="fa fa-circle-thin fa-stack-2x"></i>  <i class="fa fa-check fa-stack-1x"></i></span>'
    },
    error: {
      sticky: true,
      icon: '<span class="fa-stack fa-sm"><i class="fa fa-circle-thin fa-stack-2x"></i>  <i class="fa fa-exclamation fa-stack-1x"></i></span>'
    },
    info: {
      timeout: 8000,
      icon: '<span class="fa-stack fa-sm"><i class="fa fa-circle-thin fa-stack-2x"></i>  <i class="fa fa-info fa-stack-1x"></i></span>'
    },
  }
};

export default {
  load(config) {
    let hasOwnProperty = ({}).hasOwnProperty;
    for (let property in config) {
      if (hasOwnProperty.call(config, property)) {

        CONFIG_PROPERTIES[property] = config[property];
      }
    }
  },

  getConfig(){
    return CONFIG_PROPERTIES;
  },

  getCloseIconHTML(){
    let closeIconHTML = CONFIG_PROPERTIES['closeIconHTML'] || '<i class="fa fa-times-circle-o"></i>';
    return new Ember.Handlebars.SafeString(closeIconHTML);
  },

  getMessageIcon(messageType){
    let iconHTML = CONFIG_PROPERTIES['messages'][messageType]['icon'];
    return new Ember.Handlebars.SafeString(iconHTML);
  },

  getDefaultSettingForProperty(messageType, propertyName){
    return CONFIG_PROPERTIES['messages'][messageType][propertyName];
  }
};
