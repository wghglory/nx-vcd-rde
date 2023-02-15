const webpack = require('webpack');

function getClientEnvironment(configuration) {
  // Grab NODE_ENV and NX_* environment variables and prepare them to be
  // injected into the application via DefinePlugin in webpack configuration.
  const NX_APP = /^NX_/i;

  const raw = Object.keys(process.env)
    .filter(key => NX_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || configuration,
      },
    );

  // Stringify all values so we can feed into webpack DefinePlugin
  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}

module.exports = (config, options, context) => {
  // context: { project: 'seed', target: 'serve', configuration: 'development' }
  if (context.configuration !== 'production') {
    // order matters, put it the first
    config.module.rules.unshift({
      test: /\.(js|ts)$/,
      // loader: 'istanbul-instrumenter-loader', // not working for new standalone components
      // loader: '@ephesoft/webpack.istanbul.loader',
      // loader: '@jsdevtools/coverage-istanbul-loader',
      // https://github.com/JS-DevTools/coverage-istanbul-loader/pull/12#issuecomment-1407514333
      loader: 'webpack-plugin-istanbul/loader',
      // options: { esModules: true },
      // enforce: 'post',
      include: [
        require('path').join(__dirname, './src'),
        require('path').join(__dirname, '../..', 'libs/core'),
        require('path').join(__dirname, '../..', 'libs/feature'),
        require('path').join(__dirname, '../..', 'libs/shared'),
        require('path').join(__dirname, '../..', 'libs/provider'),
        require('path').join(__dirname, '../..', 'libs/tenant'),
      ],
      exclude: [/\.(e2e|spec)\.ts$/, /node_modules/, /(ngfactory|ngstyle)\.js/, /reports/, /tools/, /vapt/, /dist/],
    });
  }

  config.plugins.push(new webpack.DefinePlugin(getClientEnvironment(context.configuration)));
  return config;
};
