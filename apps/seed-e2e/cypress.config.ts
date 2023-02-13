/* eslint-disable @typescript-eslint/no-var-requires */
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'twdu2f', // for cypress cloud
  e2e: {
    ...nxE2EPreset(__dirname),
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  reporter: '../../node_modules/cypress-mochawesome-reporter',
});
