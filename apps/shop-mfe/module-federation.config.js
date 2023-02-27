// Nx config file: see https://nx.dev/module-federation/micro-frontend-architecture#micro-frontend-architecture
const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'shop-mfe',
  exposes: {
    './Module': 'apps/shop-mfe/src/app/remote-entry/entry.module.ts',
  },
};
