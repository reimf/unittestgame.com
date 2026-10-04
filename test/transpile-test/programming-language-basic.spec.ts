import { test, expect } from '@playwright/test'
import { spawnSync } from 'child_process'
import { mkdtempSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { Levels } from '../../src/levels.js'
import { English } from '../../src/conversation-language-en.js'
import { FixedPicker } from '../../src/picker.js'
import { Basic } from '../../src/programming-language-basic.js'
import { MapStore } from '../../src/store.js'

const basic = new Basic()
const levels = new Levels(new English(), basic, new FixedPicker(), new MapStore()).all()
const dotnetVersion = spawnSync('dotnet', ['--version'], { encoding: 'utf8' })
const dotnetAvailable = dotnetVersion.error === undefined
const targetFramework = dotnetAvailable ? `net${dotnetVersion.stdout.split('.')[0]}.0` : ''

// the transpiled code is valid Visual Basic, so all candidates of a level are compiled as modules of one dotnet project
test.describe('transpile to BASIC', () => {
    for (const level of levels) {
        test(`every transpiled ${level.description()} candidate behaves like its JavaScript original`, () => {
            test.skip(!dotnetAvailable, 'dotnet is not installed')
            test.setTimeout(1_200_000)
            const unitTests = [...level.minimalUnitTests, ...level.hints]
            const basicModules = level.candidates.map((candidate, index) => {
                const basicCode = basic.transpile(candidate.nonEmptyLines.join('\n'))
                const basicAsserts = unitTests.map(unitTest => {
                    const assertion = basic.transpile(unitTest.toTextWithResult(candidate.execute(unitTest.argumentList)))
                    return `If Not (${assertion}) Then Throw New System.Exception("Candidate${index}: ${assertion.replace(/"/g, '""')}")`
                })
                return [
                    `Module Candidate${index}`,
                        basicCode,
                        'Sub Check()',
                            ...basicAsserts,
                        'End Sub',
                    'End Module',
                ].join('\n')
            })
            const basicProgram = [
                ...basicModules,
                'Module Program',
                    'Sub Main()',
                        ...level.candidates.map((_, index) => `Candidate${index}.Check()`),
                    'End Sub',
                'End Module',
            ].join('\n')
            const basicProject = [
                '<Project Sdk="Microsoft.NET.Sdk">',
                    '<PropertyGroup>',
                        '<OutputType>Exe</OutputType>',
                        `<TargetFramework>${targetFramework}</TargetFramework>`,
                        '<NoWarn>BC42353</NoWarn>',
                    '</PropertyGroup>',
                '</Project>',
            ].join('\n')
            const folder = mkdtempSync(join(tmpdir(), 'unittestgame-basic-'))
            writeFileSync(join(folder, 'Program.vb'), basicProgram)
            writeFileSync(join(folder, 'candidates.vbproj'), basicProject)
            const result = spawnSync('dotnet', ['run', '--project', folder], { encoding: 'utf8', maxBuffer: 100_000_000 })
            expect(result.status, (result.stdout + '\n' + result.stderr).slice(0, 5000)).toBe(0)
        })
    }
})
