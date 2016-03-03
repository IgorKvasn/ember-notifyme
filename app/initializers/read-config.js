import env from '../config/environment';
import configuration from 'ember-notifyme/configuration';

export function initialize(/* application */) {
  const config = env['ember-notifyme'] || {};
  configuration.load(config);
}

export default {
  name: 'read-config',
  initialize
};
