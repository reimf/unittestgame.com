import { test, expect } from '@playwright/test'
import { spawnSync } from 'child_process'
import { Levels } from '../../src/levels.js'
import { English } from '../../src/conversation-language-en.js'
import { FixedPicker } from '../../src/picker.js'
import { Ruby } from '../../src/programming-language-ruby.js'
import { MapStore } from '../../src/store.js'

const ruby = new Ruby()
const levels = new Levels(new English(), ruby, new FixedPicker(), new MapStore()).all()
const rubyAvailable = spawnSync('ruby', ['--version']).error === undefined

test.describe('transpile to Ruby', () => {
    for (const level of levels) {
        test(`every transpiled ${level.description()} candidate behaves like its JavaScript original`, () => {
            test.skip(!rubyAvailable, 'ruby is not installed')
            test.setTimeout(120_000)
            const unitTests = [...level.minimalUnitTests, ...level.hints]
            for (const candidate of level.candidates) {
                const rubyCode = ruby.transpile(candidate.nonEmptyLines.join('\n'))
                const rubyAsserts = unitTests.map(unitTest => {
                    const assertion = ruby.transpile(unitTest.toTextWithResult(candidate.execute(unitTest.argumentList)))
                    return `raise unless ${assertion}`
                })
                const rubyProgram = [rubyCode, ...rubyAsserts, ''].join('\n')
                const result = spawnSync('ruby', ['-e', rubyProgram], { encoding: 'utf8' })
                expect(result.status, rubyProgram + '\n' + result.stderr).toBe(0)
            }
        })
    }
})
