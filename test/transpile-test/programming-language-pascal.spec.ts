import { test, expect } from '@playwright/test'
import { spawnSync } from 'child_process'
import { createHash } from 'crypto'
import { mkdtempSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { Levels } from '../../src/levels.js'
import { English } from '../../src/conversation-language-en.js'
import { FixedPicker } from '../../src/picker.js'
import { Pascal } from '../../src/programming-language-pascal.js'
import { MapStore } from '../../src/store.js'

const pascal = new Pascal()
const levels = new Levels(new English(), pascal, new FixedPicker(), new MapStore()).all()
const fpcAvailable = spawnSync('fpc', ['-iV']).error === undefined
const temporaryFolder = fpcAvailable ? mkdtempSync(join(tmpdir(), 'unittestgame-pascal-')) : ''

test.describe('transpile to Pascal', () => {
    for (const level of levels) {
        test(`every transpiled ${level.description()} candidate behaves like its JavaScript original`, () => {
            test.skip(!fpcAvailable, 'fpc is not installed')
            test.setTimeout(1_200_000)
            const unitTests = [...level.minimalUnitTests, ...level.hints]
            for (const candidate of level.candidates) {
                const pascalCode = pascal.transpile(candidate.nonEmptyLines.join('\n'))
                const pascalAsserts = unitTests.map(unitTest => {
                    const assertion = pascal.transpile(unitTest.toTextWithResult(candidate.execute(unitTest.argumentList)))
                    return `assert(${assertion});`
                })
                const pascalProgram = [
                    '{$mode objfpc}{$H+}{$assertions on}',
                    'program candidate;',
                    pascalCode,
                    'begin',
                        ...pascalAsserts,
                    'end.',
                ].join('\n')
                const hash = createHash('sha256').update(pascalProgram).digest('hex').slice(0, 16)
                const file = join(temporaryFolder, `candidate_${hash}.pas`)
                const executable = join(temporaryFolder, `candidate_${hash}`)
                writeFileSync(file, pascalProgram)
                const compilation = spawnSync('fpc', [`-o${executable}`, file], { encoding: 'utf8' })
                expect(compilation.status, pascalProgram + '\n' + compilation.stdout).toBe(0)
                const result = spawnSync(executable, { encoding: 'utf8' })
                expect(result.status, pascalProgram + '\n' + result.stderr).toBe(0)
            }
        })
    }
})
