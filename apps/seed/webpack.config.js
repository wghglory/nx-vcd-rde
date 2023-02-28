const { withModuleFederation } = require('@nrwl/angular/module-federation');
const moduleFederationConfig = require('./module-federation.config');
const { addDefineEnvPlugin, addIstanbulLoader } = require('../../webpack.custom-config');

module.exports = async (config, context) => {
  const fromModuleFederation = await withModuleFederation({
    ...moduleFederationConfig,
  });

  config = fromModuleFederation(config, context);

  // update config here...
  addIstanbulLoader(config);

  addDefineEnvPlugin(config, context);
  // config = { ...config, plugins: [...config.plugins, new webpack.DefinePlugin(getClientEnvironment(context.configuration))] };

  return config;
};
