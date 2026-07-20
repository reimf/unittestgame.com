import { fileURLToPath } from 'url'
import { defineConfig, devices } from '@playwright/test'
import { defineCoverageReporterConfig } from '@bgotink/playwright-coverage'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
    testDir: 'test',
    testMatch: '**/*.spec.ts',
    testIgnore: '**/transpile-test/**',
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
        command: `"${process.execPath}" node_modules/http-server/bin/http-server -p 3000`,
        url: 'http://localhost:3000',
        reuseExistingServer: true,
    },
    reporter: [
        ['list'],
        [
            '@bgotink/playwright-coverage',
            defineCoverageReporterConfig({
                sourceRoot: `${rootDir}src`,
                resultDir: `${rootDir}playwright-coverage`,
                reports: [
                    ['html'],
                    ['text-summary'],
                    ['json-summary'],
                ],
            }),
        ],
    ],
})
