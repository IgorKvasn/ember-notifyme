/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-notifyme',

  included: function(app) {
    this._super.included(app);

    app.import('vendor/ember-notifyme/velocity.min.js');
    app.import('vendor/ember-notifyme/velocity-promise-shim.js');
  }
};
