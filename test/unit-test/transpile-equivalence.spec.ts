import { test, expect } from '@playwright/test'
import { spawnSync } from 'child_process'
import { Game } from '../../src/game.js'
import { Locale } from '../../src/locale.js'
import { FixedPicker } from '../../src/picker.js'
import { Python } from '../../src/programming-language.js'
import { MapStore } from '../../src/store.js'

const python = new Python()
const levels = new Game(new Locale('en'), python, new FixedPicker(), new MapStore()).levels()
const pythonAvailable = spawnSync('python3', ['--version']).error === undefined

test.describe('Python transpile', () => {
    for (const level of levels) {
        test(`every transpiled ${level.description()} candidate behaves like its JavaScript original`, () => {
            test.skip(!pythonAvailable, 'python3 is not installed')
            test.setTimeout(120_000)
            const unitTests = [...level.minimalUnitTests, ...level.hints]
            for (const candidate of level.candidates) {
                const javascriptCode = candidate.nonEmptyLines.join('\n')
                const javascriptAsserts = unitTests.map(unitTest => 'assert ' + unitTest.toTextWithResult(candidate.execute(unitTest.argumentList)))
                const javascriptProgram = javascriptCode + '\n' + javascriptAsserts.join('\n') + '\n'
                const pythonProgram = python.transpile(javascriptProgram)
                const result = spawnSync('python3', ['-c', pythonProgram], { encoding: 'utf8' })
                expect(result.status, pythonProgram + '\n' + result.stderr).toBe(0)
            }
        })
    }
})
