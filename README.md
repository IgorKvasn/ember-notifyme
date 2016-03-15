# Ember-notifyme

Simple addon that adds ability to show popup notifications.

DEMO: [http://igorkvasn.github.io/ember-notifyme/](http://igorkvasn.github.io/ember-notifyme/)

### Features
- countdown (notification message will disappear after certain timeout) + countdown progress bar
- onClick and onClose callbacks
- animations (VelocityJS)
- full customization of icons (by default *FontAwesome* is supported, but *any* HTML element can be used instead - e.g. Glyphicons, IcoMoon,...)
- supports HTML content

## Installation

 `ember install ember-notifyme`

## Usage

Add this component anywhere into your hbs file (eg. _application.hbs_)
```
{{notification-panel}}
```

To trigger a notification message you can either:
```
this.notifications.addMessage({
  message: "My message"
  //other options here
});
```

or use convenience methods `success`, `info` or `error`:
```
this.notifications.info("My info message", options);
```
Note: by default, FontAwesome must be included in your project - to use different icon set, see [Global Configuration](https://github.com/IgorKvasn/ember-notifyme/blob/master/README.md#global-configuration) section below for a configuration hints

### List of available options:

| Option        | Description           | Default value  |
| ------------- |-------------| -----|
| type      | type of message; possible values: 'info', 'error', 'success'; CSS class of the same name will be added to notification message to allow styling | 'info' |
| message      | text of a message      |    |
| timeout | time before notification disappears      |    based on notification type (errors have no timeout, otherwise 8000 milis) |
| sticky | if true, notification will not disappear      |    based on notification type (errors are sticky=true) |
| htmlContent | enabled/disables HTML content in message (Warning: be sure to properly escape `message` if this option is set to `true`)    |   false |
| onClose | callback triggered when user clicks on X button to close the notification    |    |
| onClick | callback triggered when user clicks on the notification    |    |

### Global configuration

Some options can be globally configured so you do not have to set the same options over and over. Additionally icons can be configured as well.
In `config/environment.js` you can configure globals such as (every entry is optional, eg. if you do not specify success timeout, default will be used):
```
ENV['ember-notifyme']={
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
}
```

## Addon Development

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
