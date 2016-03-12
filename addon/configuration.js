import Ember from 'ember';

let CONFIG_PROPERTIES = {
  closeIconHTML: '<i class="fa fa-times"></i>',
  messages:{
    success: {
      timeout: 8000,
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

function deepMerge(target, source) {
    for (var prop in source){
        if (prop in target){
          deepMerge(target[prop], source[prop]);
        } else {
          target[prop] = source[prop];
        }
    }
    return target;
}

export default {
  load(config) {

  CONFIG_PROPERTIES= deepMerge(CONFIG_PROPERTIES, config);
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
