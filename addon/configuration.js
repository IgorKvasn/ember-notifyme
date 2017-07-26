import Ember from 'ember';

let CONFIG_PROPERTIES = {
  closeIconHTML: '<i class="fa fa-times"></i>',
  messages:{
    success: {
      timeout: 8000,
      icon: '<span class="fa-stack fa-sm"><i class="fa fa-circle-thin fa-stack-2x"></i>  <i class="fa fa-check fa-stack-1x"></i></span>'
    },
    error: {
      timeout: 8000,
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

  CONFIG_PROPERTIES= deepMerge(config, CONFIG_PROPERTIES);
  },

  getConfig(){
    return CONFIG_PROPERTIES;
  },

  getCloseIconHTML(){
    let closeIconHTML = CONFIG_PROPERTIES['closeIconHTML'] || '<i class="fa fa-times-circle-o"></i>';
    return Ember.String.htmlSafe(closeIconHTML);
  },

  getMessageIcon(messageType){
    if (Ember.isNone(CONFIG_PROPERTIES['messages'][messageType])){
      return null;
    }
    let iconHTML = CONFIG_PROPERTIES['messages'][messageType]['icon'];
    return Ember.String.htmlSafe(iconHTML);
  },

  getDefaultSettingForProperty(messageType, propertyName){
    if (Ember.isNone(CONFIG_PROPERTIES['messages'][messageType])){
      return null;
    }
    return CONFIG_PROPERTIES['messages'][messageType][propertyName];
  }
};
