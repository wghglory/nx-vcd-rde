// Nx config file: see https://nx.dev/module-federation/micro-frontend-architecture#micro-frontend-architecture
const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'seed',
  // https://nx.dev/recipes/module-federation/dynamic-module-federation-with-angular#creating-a-new-dynamic-host-application
  // remotes are not required due to dynamic module federation
  remotes: [],
};
