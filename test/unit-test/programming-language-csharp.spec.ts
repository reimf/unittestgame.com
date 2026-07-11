import { test, expect } from '@playwright/test'
import { spawnSync } from 'child_process'
import { createHash } from 'crypto'
import { mkdtempSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { Game } from '../../src/game.js'
import { Locale } from '../../src/locale.js'
import { FixedPicker } from '../../src/picker.js'
import { Csharp } from '../../src/programming-language-csharp.js'
import { MapStore } from '../../src/store.js'

const csharp = new Csharp()
const levels = new Game(new Locale('en'), csharp, new FixedPicker(), new MapStore()).levels()
const dotnetAvailable = spawnSync('dotnet', ['--version']).error === undefined
const temporaryFolder = dotnetAvailable ? mkdtempSync(join(tmpdir(), 'unittestgame-csharp-')) : ''

test.describe('transpile to C#', () => {
    for (const level of levels) {
        test(`every transpiled ${level.description()} candidate behaves like its JavaScript original`, () => {
            test.skip(!dotnetAvailable, 'dotnet is not installed')
            test.setTimeout(1_200_000)
            const unitTests = [...level.minimalUnitTests, ...level.hints]
            for (const candidate of level.candidates) {
                const csharpCode = csharp.transpile(candidate.nonEmptyLines.join('\n'), level.parameters, level.unit)   
                const csharpAsserts = unitTests.map(unitTest => {
                    const assertion = csharp.transpile(unitTest.toTextWithResult(candidate.execute(unitTest.argumentList)), level.parameters, level.unit)
                    return `if (!(${assertion})) { System.Console.Error.WriteLine(${JSON.stringify(assertion)}); System.Environment.Exit(1); }`
                })
                const csharpProgram = [
                    csharpCode.replace(/^(using System\.Text\.RegularExpressions;\n)?/, '$1System.Globalization.CultureInfo.DefaultThreadCurrentCulture = System.Globalization.CultureInfo.InvariantCulture;\n'),
                    ...csharpAsserts,
                ].join('\n')
                const hash = createHash('sha256').update(csharpProgram).digest('hex').slice(0, 16)
                const file = join(temporaryFolder, `candidate-${hash}.cs`)
                writeFileSync(file, csharpProgram)
                const result = spawnSync('dotnet', ['run', file], { encoding: 'utf8' })
                expect(result.status, csharpProgram + '\n' + result.stderr).toBe(0)
            }
        })
    }
})
