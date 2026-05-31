import { defineConfig, devices } from '@playwright/test'
import { defineCoverageReporterConfig } from '@bgotink/playwright-coverage'

export default defineConfig({
    testDir: 'test',
    testMatch: '**/*.spec.ts',

    use: {
        baseURL: 'http://localhost:3000',
        testIdAttribute: 'id',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    webServer: {
        command: 'npx http-server -p 3000',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
    },

    reporter: [
        ['list'],
        [
            '@bgotink/playwright-coverage',
            defineCoverageReporterConfig({
                sourceRoot: 'src',
                exclude: ['temporary-storage.ts'],
                resultDir: '../results/e2e-coverage',
                reports: [
                    ['html'],
                    ['text-summary'],
                ],
            }),
        ],
    ],
})
