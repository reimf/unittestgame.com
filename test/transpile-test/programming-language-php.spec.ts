import { test, expect } from '@playwright/test'
import { spawnSync } from 'child_process'
import { createHash } from 'crypto'
import { mkdtempSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { Game } from '../../src/game.js'
import { Locale } from '../../src/locale.js'
import { FixedPicker } from '../../src/picker.js'
import { Php } from '../../src/programming-language-php.js'
import { MapStore } from '../../src/store.js'

const php = new Php()
const levels = new Game(new Locale('en'), php, new FixedPicker(), new MapStore()).levels()
const phpAvailable = spawnSync('php', ['--version']).error === undefined
const temporaryFolder = phpAvailable ? mkdtempSync(join(tmpdir(), 'unittestgame-php-')) : ''

test.describe('transpile to PHP', () => {
    for (const level of levels) {
        test(`every transpiled ${level.description()} candidate behaves like its JavaScript original`, () => {
            test.skip(!phpAvailable, 'php is not installed')
            test.setTimeout(120_000)
            const unitTests = [...level.minimalUnitTests, ...level.hints]
            for (const candidate of level.candidates) {
                const phpCode = php.transpile(candidate.nonEmptyLines.join('\n'), level.parameters, level.unit)
                const phpAsserts = unitTests.map(unitTest => {
                    const assertion = php.transpile(unitTest.toTextWithResult(candidate.execute(unitTest.argumentList)), level.parameters, level.unit)
                    return `assert(${assertion});`
                })
                const phpProgram = ['<?php', phpCode, ...phpAsserts, '?>'].join('\n')
                const hash = createHash('sha256').update(phpProgram).digest('hex').slice(0, 16)
                const file = join(temporaryFolder, `candidate-${hash}.php`)
                writeFileSync(file, phpProgram)
                const result = spawnSync('php', ['-d', 'zend.assertions=1', '-d', 'assert.exception=1', '-d', 'display_errors=stderr', file], { encoding: 'utf8' })
                expect(result.status, phpProgram + '\n' + result.stderr).toBe(0)
            }
        })
    }
})
