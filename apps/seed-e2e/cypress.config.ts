import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'twdu2f', // for cypress cloud
  e2e: nxE2EPreset(__dirname),
  reporter: '../../node_modules/mochawesome',
  reporterOptions: {
    reportDir: '../../reports/mochawesome-report',
    overwrite: false,
    html: false,
    json: true,
  },
});
