import { test, expect } from '@playwright/test'
import { spawnSync } from 'child_process'
import { createHash } from 'crypto'
import { existsSync, mkdtempSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { Game } from '../../src/game.js'
import { English } from '../../src/conversation-language-en.js'
import { FixedPicker } from '../../src/picker.js'
import { TypeScript } from '../../src/programming-language-typescript.js'
import { MapStore } from '../../src/store.js'

const typescript = new TypeScript()
const levels = new Game(new English(), typescript, new FixedPicker(), new MapStore()).levels()
const tsc = join(process.cwd(), 'node_modules', '.bin', 'tsc')
const tscAvailable = existsSync(tsc)
const temporaryFolder = tscAvailable ? mkdtempSync(join(tmpdir(), 'unittestgame-typescript-')) : ''

test.describe('transpile to TypeScript', () => {
    for (const level of levels) {
        test(`every transpiled ${level.description()} candidate behaves like its JavaScript original`, () => {
            test.skip(!tscAvailable, 'tsc is not installed')
            test.setTimeout(1_200_000)
            const unitTests = [...level.minimalUnitTests, ...level.hints]
            for (const candidate of level.candidates) {
                const typescriptCode = typescript.transpile(candidate.nonEmptyLines.join('\n'))
                const typescriptAsserts = unitTests.map(unitTest => {
                    const assertion = typescript.transpile(unitTest.toTextWithResult(candidate.execute(unitTest.argumentList)))
                    return `if (!(${assertion})) throw new Error(${JSON.stringify(assertion)})`
                })
                const typescriptProgram = [typescriptCode, ...typescriptAsserts, ''].join('\n')
                const hash = createHash('sha256').update(typescriptProgram).digest('hex').slice(0, 16)
                const file = join(temporaryFolder, `candidate-${hash}.ts`)
                writeFileSync(file, typescriptProgram)
                const compileResult = spawnSync(tsc, ['--ignoreConfig', '--strict', '--target', 'es2022', '--module', 'commonjs', '--noEmitOnError', '--outDir', temporaryFolder, file], { encoding: 'utf8' })
                expect(compileResult.status, typescriptProgram + '\n' + compileResult.stdout + compileResult.stderr).toBe(0)
                const runResult = spawnSync('node', [file.replace(/\.ts$/, '.js')], { encoding: 'utf8' })
                expect(runResult.status, typescriptProgram + '\n' + runResult.stderr).toBe(0)
            }
        })
    }
})
