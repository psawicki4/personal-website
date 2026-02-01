import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'cypress',
      bundler: 'vite',
      webServerCommands: {
        default: 'npm run start',
        production: 'npm run start -- --configuration=production',
      },
    }),
    baseUrl: 'http://localhost:4200',
    video: false,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 120000,
    responseTimeout: 120000,
    requestTimeout: 30000,
  },
});
