import { test, expect } from '@playwright/test'
import { spawnSync } from 'child_process'
import { createHash } from 'crypto'
import { mkdtempSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { Game } from '../../src/game.js'
import { English } from '../../src/conversation-language-en.js'
import { FixedPicker } from '../../src/picker.js'
import { Java } from '../../src/programming-language-java.js'
import { MapStore } from '../../src/store.js'

const java = new Java()
const levels = new Game(new English(), java, new FixedPicker(), new MapStore()).levels()
const javaAvailable = spawnSync('java', ['--version']).error === undefined
const temporaryFolder = javaAvailable ? mkdtempSync(join(tmpdir(), 'unittestgame-java-')) : ''

test.describe('transpile to Java', () => {
    for (const level of levels) {
        test(`every transpiled ${level.description()} candidate behaves like its JavaScript original`, () => {
            test.skip(!javaAvailable, 'java is not installed')
            test.setTimeout(1_200_000)
            const unitTests = [...level.minimalUnitTests, ...level.hints]
            for (const candidate of level.candidates) {
                const javaCode = java.transpile(candidate.nonEmptyLines.join('\n'), level.parameters, level.unit)
                const javaAsserts = unitTests.map(unitTest => {
                    const assertion = java.transpile(unitTest.toTextWithResult(candidate.execute(unitTest.argumentList)), level.parameters, level.unit)
                    return `assert ${assertion};`
                })
                const javaProgram = [
                    javaCode.replace(/^((?:import [\w.]+;\n)*)/, '$1class Candidate {\n'),
                        'public static void main(String[] args) {',
                            ...javaAsserts,
                        '}',
                    '}',
                ].join('\n')
                const hash = createHash('sha256').update(javaProgram).digest('hex').slice(0, 16)
                const file = join(temporaryFolder, `candidate-${hash}.java`)
                writeFileSync(file, javaProgram)
                const result = spawnSync('java', ['-ea', file], { encoding: 'utf8' })
                expect(result.status, javaProgram + '\n' + result.stderr).toBe(0)
            }
        })
    }
})
