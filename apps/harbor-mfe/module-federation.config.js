// Nx config file: see https://nx.dev/module-federation/micro-frontend-architecture#micro-frontend-architecture
const baseConfig = require('../../module-federation.config');

module.exports = {
  ...baseConfig,
  name: 'harbor-mfe',
  exposes: {
    './Module': 'apps/harbor-mfe/src/app/remote-entry/entry.module.ts',
  },
};
