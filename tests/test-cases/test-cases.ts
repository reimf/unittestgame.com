import * as fs from 'fs'
import * as path from 'path'
import { FakeUseCase } from '../mocks/fake-use-case'
import { UnitTest } from '../../src/unit-test.js'

type TestCase = {
    years: number[],
    unitTests: UnitTest[],
    simplestCoveredCandidate: string,
    simplestPassingCandidatesMutationTesting: string[],
    simplestPassingCandidatesTestDrivenDevelopment: string[],
    numberOfUnitTestsStillNeeded: number,
}

export class TestCases {
    public readonly useCase = new FakeUseCase()
    public readonly all: TestCase[]

    public constructor() {
        const unitTestMap = new Map<number, UnitTest>(
            [2024, 2025, 2200, 2300, 2400].map(year => {
                const unitTest = new UnitTest(this.useCase.parameters, [year], this.useCase.unit, this.useCase.perfectCandidate.execute([year]))
                return [year, unitTest]
            })
        )
        const pathname = path.resolve(__dirname, 'test-cases.json')
        const text = fs.readFileSync(pathname, 'utf8')
        this.all = JSON.parse(text) as TestCase[]
        for (const testCase of this.all)
            testCase.unitTests = testCase.years.map(year => unitTestMap.get(year)!)
    }
}
