const { withModuleFederation } = require('@nrwl/angular/module-federation');
const moduleFederationConfig = require('./module-federation.config');
const { addDefineEnvPlugin } = require('../../webpack.custom-config');

module.exports = async (config, context) => {
  const fromModuleFederation = await withModuleFederation({
    ...moduleFederationConfig,
    /*
     * Remote overrides for production.
     * Each entry is a pair of an unique name and the URL where it is deployed.
     *
     * e.g.
     * remotes: [
     *   ['app1', 'https://app1.example.com'],
     *   ['app2', 'https://app2.example.com'],
     * ]
     */
  });

  config = fromModuleFederation(config, context);

  // update config here...
  addDefineEnvPlugin(config, context);

  return config;
};
