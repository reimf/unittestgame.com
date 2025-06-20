import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
    testMatch: /.*\.spec\.ts/,
    testDir: './tests',
    use: {
        baseURL: 'http://localhost:3000',
        testIdAttribute: 'id',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: Object.assign({}, devices['Desktop Chrome']),
        },
    ],
    webServer: {
        command: 'npx http-server -p 3000',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
    },
});
