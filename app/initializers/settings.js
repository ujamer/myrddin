

export function initialize(container, application) {
  application.inject('route', 'settings', 'service:settings');
}

export default {
  name: 'settings',
  initialize: initialize
};
